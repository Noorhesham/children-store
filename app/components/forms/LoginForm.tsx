// app/login/page.tsx
"use client";

import { z } from "zod";
import MaxWidthWrapper from "../defaults/MaxWidthWrapper";
import Image from "next/image";
import DynamicForm from "./DynamicForm";
import { IFormField } from "@/app/types";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
const loginFormFields: IFormField[] = [
  {
    name: "email",
    label: "Email Address",
    component: "input",
    type: "email",
    validation: z.string().email("Invalid email address"),
    placeholder: "Enter your email",
    props: { autoComplete: "email" },
  },
  {
    name: "password",
    label: "Password",
    component: "input",
    type: "password",
    validation: z.string().min(6, "Password must be at least 6 characters"),
    placeholder: "Enter your password",
    props: { autoComplete: "current-password", password: true },
  },
];

export default function LoginPage() {
  const router = useRouter();
  const handleLogin = async (data: any) => {
    const res = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });
    console.log(res);
    if (res?.ok)  router.push("/dashboard");
    return res;
  };

  return (
    <div className="flex h-[60vh] relative justify-center max-auto w-full items-center">
      <MaxWidthWrapper className="flex w-full gap-10">
        <div className="flex self-center w-full flex-col gap-4">
          <DynamicForm
            fields={loginFormFields}
            onSubmit={handleLogin}
            submitButtonText="Sign In"
            className="space-y-4"
          />
          {/* Additional content */}
        </div>
        <div className="relative w-full h-[80vh] hidden bg-muted md:block">
          <Image fill src="/winter.jpg" alt="Image" className="absolute inset-0 h-full w-full object-cover" />
        </div>
      </MaxWidthWrapper>
    </div> //jen1pkkey8
    //public_lMFAR9cVVvCyAGwYUTBsJEK229w=
    //
  );
}
