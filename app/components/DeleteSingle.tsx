"use client";

import React, { useTransition } from "react";

import { useRouter } from "next/navigation";
import { Button, buttonVariants } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { deleteEntity } from "@/app/actions/actions";
import { DialogClose } from "@/components/ui/dialog";
import { ModelProps } from "@/app/constant";
import { useToast } from "@/hooks/use-toast";
import ModelCustom from "./ModelCustom";

const DeleteSingle = ({ data, entity }: { data: any; entity: ModelProps }) => {
  console.log(data);
  const clsoeref = React.useRef<HTMLDialogElement>(null);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const { toast } = useToast();
  const handleDelete = (id: string) => {
    startTransition(async () => {
      const res = await deleteEntity(entity, id);
      if (res.success) {
        toast({
          title: "Success",
          description: "Operation completed successfully",
        });
        router.refresh();
      } else
        toast({
          title: "Error",
          description: res.error,
        });
    });
    clsoeref.current && clsoeref.current?.close();
  };

  return (
    <ModelCustom
      title={"مسح " + data.title || data.name || ""}
      btn={<div className={`${buttonVariants({ variant: "destructive" })} cursor-pointer w-full`}>حذف</div>}
      content={
        <div className="w-full flex items-center gap-5 flex-col">
          <p>هل انت متأكد انك تريد مسح هذا المنتج ؟</p>
          <div className="w-full flex items-center gap-4 max-w-lg mx-auto">
            <DialogClose ref={clsoeref} className={`${buttonVariants({ variant: "outline" })} w-full`}>
              الغاء{" "}
            </DialogClose>
            <Button
              variant="destructive"
              className="w-full"
              onClick={() => handleDelete(data._id)}
              disabled={isPending}
            >
              تأكيد الحذف
            </Button>
          </div>
        </div>
      }
    />
  );
};

export default DeleteSingle;
