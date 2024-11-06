import axiosInstance from "../../second_api";
import { ParamsType } from "../../types";
import { CategoryDataType } from "../types";

// ===================  GET CATEGORY  ========================
export const getCategory = async (params: ParamsType) => {
    const response = await axiosInstance.get("/exchange/list", {
        params
    })
    return response?.data?.all_exchanges   
}
// =======================  CREATE  ===========================
export const createContract = async (data: CategoryDataType) => {
    const response = await axiosInstance.post("/contract/create", data);
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
