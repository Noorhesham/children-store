import { Button } from "@/components/ui/button";
import MaxWidthWrapper from "@/app/components/defaults/MaxWidthWrapper";
import { DataTable } from "@/app/components/DataTable";

import Category from "@/app/models/Category";
import connect from "@/app/utils/clientPromise";
import ModelCustom from "@/app/components/ModelCustom";
import { deleteEntity } from "@/app/actions/actions";
import { categoryColumns } from "./columns";
import CategoryForm from "@/app/components/forms/CategoryForm";

export const dynamic = "force-dynamic";

const Page = async ({ searchParams }: { searchParams: { page?: string } }) => {
  await connect();

  const currentPage = parseInt(searchParams.page || "1", 10);
  const limit = 10;

  const data = await Category.find({})
    .limit(limit)
    .skip((currentPage - 1) * limit)
    .lean();
  const dataObj = JSON.parse(JSON.stringify(data));
  const totalCount = (await Category.countDocuments({}).lean()) as number;
  const totalPages = Math.ceil(totalCount / limit);
  return (
    <MaxWidthWrapper className="flex px-4 flex-col mt-5">
      <div className="flex items-center gap-2">
        <ModelCustom btn={<Button className="self-end">اضافة تصنيف</Button>} content={<CategoryForm />} />
      </div>
      <DataTable
        handleDeleteAll={deleteEntity}
        columns={categoryColumns}
        data={dataObj}
        entity="Category"
        page={currentPage}
        totalPages={totalPages}
      />
    </MaxWidthWrapper>
  );
};

export default Page;
