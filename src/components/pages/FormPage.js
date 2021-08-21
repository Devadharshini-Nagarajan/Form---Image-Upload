import React, { useState } from "react";
import { Form, Input, InputNumber, Upload, Button, Table, message } from "antd";

function FormPage() {
  const [formDetails, setFormDetails] = useState({
    lastName: "",
    firstName: "",
    age: "",
    image: "",
    fileList: [],
  });
  const [showTable, setShowTable] = useState(false);

  const onFormValuesChange = (type, e) => {
    let value = type === "age" ? e : e.target.value;
    let newFormDetails = { ...formDetails, [type]: value };
    setFormDetails(newFormDetails);
  };

  const columns = [
    {
      title: "First Name",
      dataIndex: "firstName",
    },
    {
      title: "Last name",
      dataIndex: "lastName",
    },
    {
      title: "Age",
      dataIndex: "age",
    },
    {
      title: "Image",
      dataIndex: "image",
      render(record, image) {
        return getImageUrl(record);
      },
    },
  ];

  const getImageUrl = (record) => {
    let value = record.length !== 0 ? record[0].thumbUrl : "";
    return <img src={value} alt="uploaded" className="img-upload" />;
  };

  const handleUpload = ({ fileList }) => {
    let newFormDetails = {
      ...formDetails,
      fileList: fileList,
      image: fileList,
    };
    setFormDetails(newFormDetails);
  };

  const submitForm = () => {
    let isValid = true;
    Object.entries(formDetails).forEach(([key, value]) => {
      if (!value) isValid = false;
    });
    if (isValid) setShowTable(true);
    else message.error("Please fill all mandatory details");
  };

  return (
    <div>
      <div className="form_page">
        <div className="form_details">
          <Form
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 16 }}
            layout="horizontal"
          >
            <Form.Item label="First Name" name="firstName" required>
              <Input
                value={formDetails.firstname}
                onChange={(e) => onFormValuesChange("firstName", e)}
              />
            </Form.Item>
            <Form.Item label="Last Name" name="lastName" required>
              <Input
                value={formDetails.lastName}
                onChange={(e) => onFormValuesChange("lastName", e)}
              />
            </Form.Item>
            <Form.Item label="Age" name="age" required>
              <InputNumber
                value={formDetails.age}
                onChange={(val) => onFormValuesChange("age", val)}
                style={{ width: "100%" }}
              />
            </Form.Item>
            <Form.Item label="Upload Image" name="upload" required>
              <Upload
                accept=".png"
                multiple={false}
                listType="picture-card"
                fileList={formDetails.fileList}
                onChange={handleUpload}
                beforeUpload={() => false}
              >
                {formDetails.fileList.length === 0 ? "Upload" : ""}
              </Upload>
            </Form.Item>
            <Form.Item style={{ justifyContent: "center" }} required>
              <Button type="primary" block onClick={submitForm}>
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
        {showTable && (
          <div className="form_table">
            <Table
              columns={columns}
              dataSource={[{ ...formDetails, key: 1 }]}
              pagination={false}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default FormPage;
