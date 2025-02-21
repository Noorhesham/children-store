import product from "@/app/models/Product";
import order from "@/app/models/Order";
import category from "../models/Category.ts";
export type ModelProps = "product" | "order" | "category";

const models: Record<ModelProps, any> = {
  product,
  order,
  category,
};
export type CascadeDeleteFunction = (id: string) => Promise<void>;

export default models;
