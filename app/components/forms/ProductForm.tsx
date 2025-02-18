// components/forms/ProductForm.tsx
"use client";

import { z } from "zod";
import DynamicForm from "./DynamicForm";
import { IFormField } from "@/app/types";

const productValidation = {
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  price: z.number().min(0, "Price must be positive"),
  stock: z.number().min(0, "Stock must be positive"),
  category: z.string().min(1, "Category is required"),
  images: z
    .array(
      z.object({
        secure_url: z.string(),
        public_id: z.string(),
      })
    )
    .nonempty("At least one image is required"),
};

const productFields: IFormField[] = [
  {
    name: "title",
    label: "Product Title",
    type: "text",
    validation: productValidation.title,
    placeholder: "Enter product title",
    component: "input",
  },
  {
    name: "description",
    label: "Description",
    component: "textarea",
    validation: productValidation.description,
    placeholder: "Enter product description",
  },
  {
    name: "price",
    label: "Price",
    type: "number",
    validation: productValidation.price,
    placeholder: "Enter price",
    props: { step: "0.01" },
    component: "input",
  },
  {
    name: "stock",
    label: "Stock Quantity",
    type: "number",
    validation: productValidation.stock,
    placeholder: "Enter stock quantity",
    component: "input",
  },
  {
    name: "category",
    label: "Category",
    component: "select",
    validation: productValidation.category,
    options: [], // Will be populated dynamically
    placeholder: "Select category",
  },
  {
    name: "images",
    label: "Product Images",
    component: "photo",
    validation: productValidation.images,
  },
];

export function ProductForm({ defaultValues }: { defaultValues?: any }) {
  const onSubmit = async (values: any) => {};
  return (
    <DynamicForm
      fields={productFields}
      onSubmit={onSubmit}
      defaultValues={defaultValues}
      submitButtonText="Save Product"
    />
  );
}
