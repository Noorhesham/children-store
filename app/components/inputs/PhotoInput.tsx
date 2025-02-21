// components/PhotoInput.tsx
"use client";

import { useFormContext } from "react-hook-form";
import { useCallback, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { Trash } from "lucide-react";
import { uploadImageToImageKit } from "@/app/utils/helpers";

interface PhotoInputProps {
  name: string;
  value?: Array<{ secure_url: string; publicId: string }>;
}
interface ImageType {
  secure_url: string;
  publicId: string;
}
export const PhotoInput = ({ name, value = [] }: PhotoInputProps) => {
  const { setValue, watch } = useFormContext();
  const [isUploading, setIsUploading] = useState(false);
  const currentImages = watch(name) || [];

  const handleUpload = useCallback(
    async (files: FileList) => {
      try {
        setIsUploading(true);
        setValue("isUploading", true); // إضافة حالة التحميل للنموذج

        const uploadPromises = Array.from(files).map((file) => uploadImageToImageKit(file));

        const results = await Promise.all(uploadPromises);
        const newImages = results.map((res) => ({
          secure_url: res.url,
          publicId: res.fileId,
        }));

        setValue(name, [...currentImages, ...newImages]);
      } catch (error) {
        console.error("Upload failed:", error);
      } finally {
        setIsUploading(false);
        setValue("isUploading", false); // إعادة تعيين حالة التحميل
      }
    },
    [currentImages, name, setValue]
  );

  const handleDelete = (publicId: string) => {
    setValue(
      name,
      currentImages.filter((img: ImageType) => img.publicId !== publicId)
    );
  };

  return (
    <div className="space-y-4">
      <Input
        type="file"
        multiple
        accept="image/*"
        disabled={isUploading}
        onChange={(e) => e.target.files && handleUpload(e.target.files)}
        className="cursor-pointer"
      />

      <div className="grid grid-cols-3 gap-4">
        {currentImages.map((image: ImageType, index: number) => (
          <div key={index} className="relative w-full h-44 group">
            <Image
              src={image.secure_url}
              alt={`Upload ${index + 1}`}
              fill
              className="rounded-lg w-full object-cover aspect-square"
            />
            <Button
              type="button"
              variant="destructive"
              size="sm"
              className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={() => handleDelete(image.publicId)}
              disabled={isUploading} // تعطيل الزر أثناء التحميل
            >
              <Trash className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>

      {isUploading && <p className="text-sm text-muted-foreground">جاري تحميل الصور...</p>}
    </div>
  );
};
