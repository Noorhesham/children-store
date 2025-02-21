import { Button } from "@/components/ui/button";
import MaxWidthWrapper from "@/app/components/defaults/MaxWidthWrapper";
import { DataTable } from "@/app/components/DataTable";

import connect from "../utils/clientPromise";
import Product from "../models/Product";
import { deleteEntity } from "../actions/actions";
import { productColumns } from "./products/columns";
import ModelCustom from "../components/ModelCustom";
import { ProductForm } from "../components/forms/ProductForm";

export const dynamic = "force-dynamic";

const Page = async ({ searchParams }: { searchParams: { page?: string } }) => {
  await connect();

  const currentPage = parseInt(searchParams.page || "1", 10);
  const limit = 10;

  const data = await Product.find({})
    .limit(limit)
    .skip((currentPage - 1) * limit)
    .populate("category")
    .lean();
  const dataObj = JSON.parse(JSON.stringify(data));
  const totalCount = (await Product.countDocuments({}).lean()) as number;
  const totalPages = Math.ceil(totalCount / limit);
  console.log(data);
  return (
    <MaxWidthWrapper className="flex px-4 flex-col mt-5">
      <div className="flex items-center gap-2">
        <ModelCustom title="" btn={<Button className="self-end">اضافة منتج</Button>} content={<ProductForm />} />
      </div>
      <DataTable
        handleDeleteAll={deleteEntity}
        columns={productColumns}
        data={dataObj}
        entity="Product"
        page={currentPage}
        totalPages={totalPages}
      />
    </MaxWidthWrapper>
  );
};

export default Page;
