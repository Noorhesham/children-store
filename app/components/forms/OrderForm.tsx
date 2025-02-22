"use client";

import { z } from "zod";
import DynamicForm from "./DynamicForm";
import { IFormField } from "@/app/types";
import { createEntity, updateEntity } from "@/app/actions/actions";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { useCart } from "@/app/utils/CartProvider";
import CartItem from "../CartItem";
import emailjs from "@emailjs/browser";

const orderValidation = {
  firstName: z.string().min(1, "مطلوب إدخال الاسم الأول"),
  lastName: z.string().min(1, "مطلوب إدخال اسم العائلة"),
  email: z.string().email("البريد الإلكتروني غير صحيح"),
  address: z.string().min(1, "مطلوب إدخال العنوان"),
  phone: z.string().min(10, "رقم الهاتف غير صحيح"),
};

export const EMAIL = "noordragon2004@gmail.com";
export const PHONE = "+20 114 583 81 87";
export const ServiceId = "service_kxdhvdb";
export const Template = "template_3i15jgb";
export const PUBLI_KEY = "t8wKaNDqOW71fnrMx"; // ضع مفتاح الـ public هنا

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
    // Build order data (for saving into your database)
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
      ? await updateEntity("Order", defaultValues._id, orderData)
      : await createEntity("Order", orderData);

    if (res.success) {
      if (!defaultValues) clearCart();

      // Generate HTML for order items with product images
      const itemsHtml = items
        .map(
          (item) => `
      <tr style="border-bottom: 1px solid #eee;">
        <td style="padding: 10px; text-align: center;">
          <img src="${item.product.images?.[0].secure_url}" 
               alt="${item.product.title}" 
               style="width: 50px; height: 50px; object-fit: cover; border-radius: 4px;">
        </td>
        <td style="padding: 10px;">${item.product.title}</td>
        <td style="padding: 10px;">${item.quantity}</td>
        <td style="padding: 10px;">${item.price} ج.م</td>
      </tr>
    `
        )
        .join("");

      const emailData = {
        user_name: `${values.firstName} ${values.lastName}`,
        user_email: values.email,
        user_phone: values.phone,
        user_address: values.address,
        order_items: itemsHtml,
        order_total: total,
        website_photo: "YOUR_ACTUAL_LOGO_URL", // Use a real image URL
        company_email: "monaelsayegh558@gmail.com",
        company_phone: PHONE,
      };
      console.log("Email Data:", emailData);

      try {
        // Send email to customer
        await emailjs.send(
          ServiceId,
          "template_3i15jgb",
          {
            ...emailData,
            to_email: values.email,
            message: "Thank you for your order!",
          },
          PUBLI_KEY
        );

        // Send email to admin (using a different EmailJS template)
        await emailjs.send(
          ServiceId,
          "template_xj6xqo6",
          {
            ...emailData,
            to_email: "monaelsayegh558@gmail.com",
            message: "New order received!", // Add any custom message
          },
          PUBLI_KEY
        );

        toast({
          title: "تم إرسال الطلب بنجاح",
          description: "تم إرسال التأكيد إلى بريدك الإلكتروني",
        });

        if (!defaultValues) router.push(`/thank-you?orderId=${res.data._id}`);
      } catch (err) {
        console.error("Email sending failed:", err);
        toast({
          title: "خطأ في الإرسال",
          description: "حدث خطأ أثناء محاولة إرسال التأكيد",
          variant: "destructive",
        });
      }
    }
    return res;
  };

  if (items.length === 0 && !defaultValues) {
    return <div className="text-center p-8 text-lg">السلة فارغة</div>;
  }

  return (
    <div className="grid w-full grid-cols-1 md:grid-cols-2 gap-6">
      <div className={`${defaultValues && "col-span-full"} order-2 md:order-1`}>
        <h4 className="text-base font-semibold my-3">تفاصيل الطلب</h4>
        <DynamicForm defaultValues={defaultValues} fields={orderFields} onSubmit={onSubmit} />
      </div>

      {!defaultValues && (
        <div className="order-1 md:order-2">
          <h4 className="text-base font-semibold my-3">ملخص السلة</h4>
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
      )}
    </div>
  );
}
