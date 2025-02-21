import { Button } from "@/components/ui/button";
import MaxWidthWrapper from "@/app/components/defaults/MaxWidthWrapper";
import { DataTable } from "@/app/components/DataTable";

import category from "@/app/models/category";
import connect from "@/app/utils/clientPromise";
import ModelCustom from "@/app/components/ModelCustom";
import { deleteEntity } from "@/app/actions/actions";
import { categoryColumns } from "./columns";
import CategoryForm from "@/app/components/forms/CategoryForm";

export const dynamic = "force-dynamic";

const Page = async () => {
  await connect();

  const data = await category.find({}).lean();
  const dataObj = JSON.parse(JSON.stringify(data));
  return (
    <MaxWidthWrapper className="flex px-4 flex-col mt-5">
      <div className="flex items-center gap-2">
        <ModelCustom btn={<Button className="self-end">اضافة تصنيف</Button>} content={<CategoryForm />} />
      </div>
      <DataTable handleDeleteAll={deleteEntity} columns={categoryColumns} data={dataObj} entity="Category" page={1} />
    </MaxWidthWrapper>
  );
};

export default Page;
