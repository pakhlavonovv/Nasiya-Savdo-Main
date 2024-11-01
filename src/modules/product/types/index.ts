export interface CategoryDataType {
    id: string | number;
    name: string;
    model: string,
    made_in: string,
    color:string,
    date_of_creation: string | number 
    image_url: string
  }

export interface StyleType {
    color?: string
    fontSize?: string
}

export type Category = any

