"use client";

import { z } from "zod";
import DynamicForm from "./DynamicForm";
import { IFormField } from "@/app/types";
import { createEntity, updateEntity } from "@/app/actions/actions";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { useCart } from "@/app/utils/CartProvider";
import CartItem from "../CartItem";
import MaxWidthWrapper from "../defaults/MaxWidthWrapper";

const orderValidation = {
  firstName: z.string().min(1, "مطلوب إدخال الاسم الأول"),
  lastName: z.string().min(1, "مطلوب إدخال اسم العائلة"),
  email: z.string().email("البريد الإلكتروني غير صحيح"),
  address: z.string().min(1, "مطلوب إدخال العنوان"),
  phone: z.string().min(10, "رقم الهاتف غير صحيح"),
};

export function OrderForm({ defaultValues }: { defaultValues?: any }) {
  const { toast } = useToast();
  const router = useRouter();
  const { items, total, clearCart } = useCart();

  const orderFields: IFormField[] = [
    {
      name: "firstName",
      label: "الاسم الأول",
      type: "text",
      validation: orderValidation.firstName,
      placeholder: "أدخل الاسم الأول",
      component: "input",
    },
    {
      name: "lastName",
      label: "اسم العائلة",
      type: "text",
      validation: orderValidation.lastName,
      placeholder: "أدخل اسم العائلة",
      component: "input",
    },
    {
      name: "email",
      label: "البريد الإلكتروني",
      type: "email",
      validation: orderValidation.email,
      placeholder: "أدخل البريد الإلكتروني",
      component: "input",
    },
    {
      name: "phone",
      label: "رقم الهاتف",
      type: "tel",
      validation: orderValidation.phone,
      placeholder: "أدخل رقم الهاتف",
      component: "input",
    },
    {
      name: "address",
      label: "العنوان",
      component: "textarea",
      validation: orderValidation.address,
      placeholder: "أدخل العنوان بالتفصيل",
    },
  ];

  const onSubmit = async (values: any) => {
    const orderData = {
      ...values,
      items: items.map((item) => ({
        product: item.product._id,
        quantity: item.quantity,
        price: item.price,
      })),
      total,
    };

    const res = defaultValues
      ? await updateEntity("order", defaultValues._id, orderData)
      : await createEntity("order", orderData);

    if (res.success) {
      !defaultValues && clearCart();
      toast({
        title: "تم إرسال الطلب بنجاح",
        description: "سنتواصل معك قريباً لتأكيد الطلب",
      });
      !defaultValues && router.push("/thank-you");
    }

    return res;
  };

  if (items.length === 0 && !defaultValues) {
    return <div className="text-center p-8 text-lg">السلة فارغة</div>;
  }

  return (
    <div className="grid  w-full grid-cols-1 md:grid-cols-2 gap-6">
      <div className={` ${defaultValues && " col-span-full"} order-2 md:order-1`}>
        <div>
          <>
            <h4 className=" text-base font-semibold my-3">تفاصيل الطلب</h4>
          </>
          <div>
            <DynamicForm defaultValues={defaultValues} fields={orderFields} onSubmit={onSubmit} />
          </div>
        </div>
      </div>

      {!defaultValues && (
        <div className="order-1 md:order-2">
          <div>
            <>
              <h4 className=" text-base font-semibold my-3">ملخص السلة</h4>
            </>
            <div>
              <div className="space-y-4">
                {items.map((item, i) => (
                  <CartItem item={item} key={i} />
                ))}
                <div className="flex justify-between items-center pt-4 font-bold">
                  <div>الإجمالي</div>
                  <div>{total} ج.م</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
