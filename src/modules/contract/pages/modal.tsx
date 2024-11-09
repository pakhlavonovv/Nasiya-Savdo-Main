import { Button, Form, Input, Modal, Upload } from "antd";
import { useForm } from "antd/es/form/Form";
import { useEffect, useState } from "react";
import { CategoryDataType } from "../types";
import { useCreateContract } from "../hooks/mutation";
import { useQueryClient } from "@tanstack/react-query";
import { ModalPropType } from "../../types";
import { uploadFile } from "../../product/service";



const ProductModal = ({ open, handleClose, update }: ModalPropType) => {
  const [form] = useForm();
  const queryClient = useQueryClient();
  const [image_url, setImageUrl] = useState<string | null>(null);


  const { mutate: createMutate } = useCreateContract();
  // const { mutate: updateMutate } = useCreateContract();

  useEffect(() => {
    if (open) {
      if (update) {
        form.setFieldsValue({ name: update.name });
      } else {
        form.resetFields();
      }
    }
  }, [update, open, form]);

  const handleSubmit = (values: CategoryDataType) => {
    const formData = new FormData();
    formData.append("consumer_address", values.consumer_address);
    formData.append("consumer_name", values.consumer_name);
    formData.append("consumer_passport_serial", values.consumer_passport_serial);
    formData.append("consumer_phone_number", values.consumer_phone_number);
    formData.append("duration", values.duration.toString());
    formData.append("passport_image", image_url || "");
 
    createMutate(formData, {
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["category"] });
            handleClose();
        },
        onError: () => {
            handleClose();
        },
    });
 };
 



  const handleFileChange = async (info: any) => {
    const selectedFile = info.file.originFileObj || info.file;
    try {
        const uploadedFileResponse = await uploadFile(selectedFile);
        const uploadedImageUrl = uploadedFileResponse.made_url;
        setImageUrl(uploadedImageUrl);
        alert("File uploaded successfully!");
    } catch (error) {
        alert("File upload failed. Please try again.");
    }
};

  return (
    <Modal
      title={update ? "Edit Contract" : "Add Contract"}
      open={open}
      onCancel={handleClose}
      footer={null}
    >
      <Form layout="vertical" onFinish={handleSubmit} form={form}>
        <Form.Item
          label="Consumer address"
          name="consumer_address"
          rules={[{ required: true, message: "Please enter consumer address" }]}
        >
          <Input placeholder="Enter consumer address" />
        </Form.Item>
        <Form.Item
          label="Consumer name"
          name="consumer_name"
          rules={[{ required: true, message: "Please enter consumer name" }]}
        >
          <Input placeholder="Enter consumer name" />
        </Form.Item>

    <Form.Item
          label="Passport serial"
          name="consumer_passport_serial"
          rules={[{ required: true, message: "Please enter consumer passport serial" }]}
        >
          <Input placeholder="Enter consumer passport serial" />
        </Form.Item>
        <Form.Item
          label="Phone number"
          name="consumer_phone_number"
          rules={[{ required: true, message: "Please enter consumer phone number" }]}
        >
          <Input placeholder="Enter consumer phone number" />
        </Form.Item>
        <Form.Item
          label="Duration"
          name="duration"
          rules={[{ required: true, message: "Please enter duration" }]}
        >
          <Input placeholder="Enter duration" />
        </Form.Item>
        <Form.Item
                              name="passport_image"
                              label="Image"
                              rules={[{ required: true, message: 'Please upload an image' }]}
                          >
                              <Upload
                                  onChange={handleFileChange}
                                  beforeUpload={() => false}
                                  showUploadList={false}
                              >
                                  <Button>Click to Upload</Button>
                              </Upload>
                          </Form.Item>
        <Form.Item>
          <Button className='bg-[#AD8354] text-white' htmlType="submit" block>
            {update ? "Update" : "Create"}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ProductModal;