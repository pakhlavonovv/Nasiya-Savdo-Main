    import { useMutation, useQueryClient } from "@tanstack/react-query";
    import { createContract, deleteContract } from "../service";
    import { CategoryDataType } from "../types";

    export function useCreateContract () {
        const queryClient = useQueryClient()
        return useMutation({
            mutationFn: (data:CategoryDataType) => createContract(data),
            onSuccess: (response)=>{
                alert(response)
                queryClient.invalidateQueries({queryKey: ['category']})
            },
           onError: (error)=> {
            alert(error?.message)
                queryClient.invalidateQueries({queryKey: ['category']})
           }
           
        })
    }
    
    // export const useUpdateContract = () => {
    //     return useMutation((data: CategoryDataType) => updateContract(data));
    // };

    export function useDeleteCategory(){
        const queryClient = useQueryClient() 
        return useMutation({
            mutationFn: (id: string | number) => deleteContract(id),
            onSuccess: ()=>{
                queryClient.invalidateQueries({queryKey: ['category']})
            },
            onError: (error)=>{
                alert(error?.message)
                queryClient.invalidateQueries({queryKey: ['category']})
            }
        })
    }