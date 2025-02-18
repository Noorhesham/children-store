import product from "@/app/models/product";
import order from "@/app/models/order";
import category from "../models/category";
export type ModelProps = "product" | "order" | "category";

const models: Record<ModelProps, any> = {
  product,
  order,
  category,
};
export type CascadeDeleteFunction = (id: string) => Promise<void>;

export default models;
