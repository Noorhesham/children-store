import Product from "@/app/models/Product";
import Order from "@/app/models/Order";
import Category from "../models/Category";
export type ModelProps = "product" | "order" | "category";

const models: Record<ModelProps, any> = {
  Product,
  Order,
  Category,
};
export type CascadeDeleteFunction = (id: string) => Promise<void>;

export default models;
