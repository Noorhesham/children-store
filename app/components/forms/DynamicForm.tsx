// components/dynamic-form.tsx
"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z, ZodTypeAny } from "zod";
import { Form, FormField, FormControl, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import FormSelect from "../inputs/FormSelect";
import FormInput from "../inputs/FormInput";
import { PhotoInput } from "../inputs/PhotoInput";
import { useToast } from "../../../hooks/use-toast";
import { DynamicFormProps } from "@/app/types";

export default function DynamicForm({
  fields,
  onSubmit,
  defaultValues = {},
  submitButtonText = "Submit",
  className = "",
  children,
  fieldArrays = [],
}: DynamicFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const formSchema = z
    .object(
      fields.reduce((acc, field) => {
        if (field.validation) {
          acc[field.name] = field.validation;
        }
        return acc;
      }, {} as Record<string, ZodTypeAny>)
    )
    .extend(
      fieldArrays.reduce((acc, fieldName) => {
        acc[fieldName] = z.any();
        return acc;
      }, {} as Record<string, ZodTypeAny>)
    );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });
  console.log(form.formState.errors);
  const isUploading = form.watch("isUploading");

  async function handleFormSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsSubmitting(true);
      setError(null);
      const res = await onSubmit(values);
      console.log(res);
      if (res?.error) throw new Error(res.error);
      toast({
        title: "Success",
        description: "Operation completed successfully",
        variant: "default",
      });
    } catch (err) {
      console.error("Form submission error:", err);
      setError(err?.message || err.error || "An error occurred");

      toast({
        title: "Error",
        description: err?.message | err.error || "Failed to submit form",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleFormSubmit)} className={`space-y-6  w-full ${className}`}>
        {fields.map((field) => {
          switch (field.component) {
            case "select":
              return (
                <FormSelect
                  key={field.name}
                  name={field.name}
                  label={field.label}
                  placeholder={field.placeholder}
                  description={field.description}
                  options={field.options || []}
                  className={field.className}
                  {...field.props}
                />
              );
            case "checkbox":
            case "switch":
              return (
                <FormInput
                  key={field.name}
                  name={field.name}
                  label={field.label}
                  type="checkbox"
                  description={field.description}
                  className={field.className}
                  {...field.props}
                />
              );

            case "textarea":
              return (
                <FormInput
                  key={field.name}
                  name={field.name}
                  label={field.label}
                  area={true}
                  description={field.description}
                  className={field.className}
                  {...field.props}
                />
              );
            case "photo":
              return (
                <FormField
                  key={field.name}
                  control={form.control}
                  name={field.name}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{field.label}</FormLabel>
                      <FormControl>
                        <PhotoInput name={field.name} value={field.value} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              );
            case "array":
              return null;
            default:
              return (
                <FormInput
                  key={field.name}
                  name={field.name}
                  label={field.label}
                  type={field.type || "text"}
                  placeholder={field.placeholder}
                  description={field.description}
                  className={field.className}
                  {...field.props}
                />
              );
          }
        })}
        {children && children(form.control, form.getValues)}{" "}
        {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
        <Button type="submit" className="w-full" disabled={isSubmitting || isUploading}>
          {isSubmitting ? "Processing..." : submitButtonText}
        </Button>
      </form>
    </Form>
  );
}
