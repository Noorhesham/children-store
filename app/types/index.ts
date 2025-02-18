import { ZodTypeAny } from "zod";

// types/index.ts
export interface IProduct {
  _id: string;
  title: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  images: {
    secure_url: string;
    public_id: string;
  }[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ICategory {
  _id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IOrderItem {
  product: string | IProduct;
  quantity: number;
  price: number;
}
export type IFormField = {
  name: string;
  label?: string;
  description?: string;
  component: "input" | "select" | "checkbox" | "textarea" | "switch" | "photo" | "array";
  type?: string;
  options?: Array<{ value: string; label: string }>;
  validation?: ZodTypeAny;
  placeholder?: string;
  className?: string;
  props?: Record<string, any>;
  password?: boolean;
};
export interface DynamicFormProps {
  fields: IFormField[];
  onSubmit: (values: any) => Promise<void>;
  defaultValues?: Record<string, any>;
  submitButtonText?: string;
  className?: string;
  children?: React.ReactNode;
  fieldArrays?: any[];
}
export interface IOrder {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  phone: string;
  items: IOrderItem[];
  total: number;
  status: "pending" | "processing" | "shipped" | "delivered";
  paymentStatus: "pending" | "paid" | "failed";
  createdAt: Date;
  updatedAt: Date;
}
