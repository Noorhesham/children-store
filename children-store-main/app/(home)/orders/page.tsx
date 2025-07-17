import MaxWidthWrapper from "@/app/components/defaults/MaxWidthWrapper";
import { OrderForm } from "@/app/components/forms/OrderForm";

export default function OrderPage() {
  return (
    <MaxWidthWrapper className="container flex flex-col items-start">
      <h1 className="text-3xl font-bold text-center mb-8">إتمام الطلب</h1>
      <OrderForm />
    </MaxWidthWrapper>
  );
}
