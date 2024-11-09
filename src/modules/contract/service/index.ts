import axiosInstance from "../../second_api";
import { ParamsType } from "../../types";
import { CategoryDataType } from "../types";

// ===================  GET CATEGORY  ========================
export const getCategory = async (params: ParamsType) => {
    const response = await axiosInstance.get("/contract/list", {
        params
    })
    return response?.data?.all_contracts    
}
// =======================  CREATE  ===========================
export const createContract = async (data: FormData) => {
    const response = await axiosInstance.post("/contract/create", data, {
        headers: {
            'Content-Type': 'multipart/form-data', 
        }
    });
    return response?.data;
};

// ======================  UPDATE  ==========================
export const updateContract = async (data: CategoryDataType) => {
    const { id, ...updateData } = data;  
    const response = await axiosInstance.patch(`/contract/update/${id}`, updateData);  
    return response?.data;
};

// ======================  DELETE  ==========================
export const deleteContract = async (id: string | number) => {
    const response = await axiosInstance.delete(`/contract/delete/${id}`);
    console.log(response.data)
    return response?.data;
};
