import axiosInstance from "../../second_api";
import { ParamsType } from "../../types";
import { CategoryDataType } from "../types";

// ===================  GET CATEGORY  ========================
export const getCategory = async (params: ParamsType) => {
    const response = await axiosInstance.get("/product/list", {
        params
    })
    return response?.data
}

// =======================  CREATE  ===========================
export const createCategory = async (data:CategoryDataType) => {
    const response = await axiosInstance.post("/product/create", data)
    return response?.data
}



// ======================  UPDATE  ==========================
export const updateCategory = async (data: CategoryDataType) => {
    const { id, ...updateData } = data;  
    const response = await axiosInstance.patch(`category/update/${id}`, updateData);  
    return response?.data;
};




// ======================  DELETE  ==========================

export const deleteCategory = async (id: string | number) => {
      const response = await axiosInstance.delete(`/product/delete/${id}`);
      return response?.data;
  };
  
  export const uploadFile = async (image_url: File) => {
    const formData = new FormData();
    formData.append("file",image_url);

    const response = await axiosInstance.post("minio/media", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return response?.data;
};
