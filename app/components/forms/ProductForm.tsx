// components/forms/ProductForm.tsx
"use client";

import { z } from "zod";
import DynamicForm from "./DynamicForm";
import { useGetEntity } from "@/app/queries";
import { createEntity, updateEntity } from "@/app/actions/actions";
import { IFormField } from "@/app/types";

const productValidation = {
  title: z.string().min(1, "مطلوب إدخال العنوان"),
  description: z.string().min(1, "مطلوب إدخال الوصف"),
  price: z.union([z.string(), z.number().min(1, "مطلوب إدخال السعر")]),
  stock: z.union([z.string(), z.number().min(1, "مطلوب إدخال الكمية")]),
  category: z.string().min(1, "مطلوب اختيار الفئة"),
  images: z
    .array(
      z.object({
        secure_url: z.string(),
      })
    )
    .nonempty("مطلوب إضافة صورة واحدة على الأقل"),
};

export function ProductForm({ defaultValues }: { defaultValues?: any }) {
  const { data: categories, isLoading } = useGetEntity({
    entityName: "category",
    key: "category",
  });

  // إصلاح مشكلة التحديد التلقائي
  const processedDefaults = defaultValues
    ? {
        ...defaultValues,
        category: defaultValues.category?._id || defaultValues.category,
      }
    : undefined;

  const onSubmit = async (values: any) => {
    const res = defaultValues
      ? await updateEntity("product", defaultValues._id, values)
      : await createEntity("product", values);
    return res;
  };

  const productFields: IFormField[] = [
    {
      name: "title",
      label: "عنوان المنتج",
      type: "text",
      validation: productValidation.title,
      placeholder: "أدخل عنوان المنتج",
      component: "input",
    },
    {
      name: "description",
      label: "الوصف",
      component: "textarea",
      validation: productValidation.description,
      placeholder: "أدخل وصف المنتج",
    },
    {
      name: "price",
      label: "السعر",
      type: "number",
      validation: productValidation.price,
      placeholder: "أدخل السعر",
      props: { step: "0.01" },
      component: "input",
    },
    {
      name: "stock",
      label: "الكمية المتاحة",
      type: "number",
      validation: productValidation.stock,
      placeholder: "أدخل الكمية",
      component: "input",
    },
    {
      name: "category",
      label: "الفئة",
      component: "select",
      validation: productValidation.category,
      options: isLoading
        ? []
        : categories?.data?.data.map((p: any) => ({
            value: p._id.toString(), // تحويل ObjectId إلى string
            name: p.name,
          })) || [],
      placeholder: "اختر الفئة",
    },
    {
      name: "images",
      label: "صور المنتج",
      component: "photo",
      validation: productValidation.images,
    },
  ];

  return (
    <DynamicForm
      fields={productFields}
      onSubmit={onSubmit}
      defaultValues={processedDefaults} //الجة استخدام القيم المع
      submitButtonText="حفظ المنتج"
    />
  );
}
