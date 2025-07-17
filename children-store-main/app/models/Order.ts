import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    items: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
        quantity: { type: Number, required: true, min: 1 },
        price: { type: Number, required: true, min: 0 },
      },
    ],
    total: { type: Number, required: true, min: 0 },
    status: {
      type: String,
      enum: ["pending", "processing", "shipped", "delivered"],
      default: "pending",
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed"],
      default: "pending",
    },
  },
  { timestamps: true }
);
orderSchema.pre("save", async function (next) {
  const order = this;
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    for (const item of order.items) {
      const product = await mongoose.model("Product").findById(item.product);
      if (!product) {
        throw new Error(`Product ${item.product} not found`);
      }

      if (product.stock < item.quantity) {
        throw new Error(`Insufficient stock for product ${product.title}`);
      }

      product.stock -= item.quantity;
      await product.save({ session });
    }

    await session.commitTransaction();
    next();
  } catch (error) {
    await session.abortTransaction();

    //@ts-ignore
    next(error);
  } finally {
    session.endSession();
  }
});
const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);

export default Order;
