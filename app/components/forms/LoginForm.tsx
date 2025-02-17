// app/login/page.tsx
"use client";

import { z } from "zod";
import { FormField } from "@/types";
import { fetchData } from "@/app/actions/Server";
import MaxWidthWrapper from "../defaults/MaxWidthWrapper";
import Image from "next/image";
import DynamicForm from "./DynamicForm";
import { useAuth } from "@/app/context/AuthProvider";
import cookies from "js-cookie";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
const loginFormFields: FormField[] = [
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
  const { setAuth } = useAuth();
  const handleLogin = async (values: any) => {
    const res = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });
    console.log(res);
    if (res?.ok) router.push("/dashboard/category");
    if (res?.error) setServerError(res.error);
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
    </div>
  );
}
