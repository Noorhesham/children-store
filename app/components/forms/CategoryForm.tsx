"use client";
import { createEntity, updateEntity } from "@/app/actions/actions";
import React from "react";
import DynamicForm from "./DynamicForm";
import { z } from "zod";
export const categorySchema = {
  name: z.string().min(1, "Title is required"),
  image: z.array(z.object({ secure_url: z.string() })).nonempty(),
};

const CategoryForm = ({ defaultValues }: { defaultValues?: any }) => {
  const onSubmit = async (values: any) => {
    const image = values.image?.[0];
    const res = defaultValues
      ? await updateEntity("Category", defaultValues._id, { ...values, image })
      : await createEntity("Category", { ...values, image });
    return res;
  };
  return (
    <DynamicForm
      defaultValues={defaultValues}
      onSubmit={onSubmit}
      fields={[
        {
          type: "text",
          name: "name",
          label: "اسم القسم",
          component: "input",
          validation: categorySchema.name,
        },
        {
          name: "image",
          label: "صور القسم",
          component: "photo",
          validation: categorySchema.image,
        },
      ]}
    />
  );
};

export default CategoryForm;
