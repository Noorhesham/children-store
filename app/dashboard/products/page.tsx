import { Button } from "@/components/ui/button";
import MaxWidthWrapper from "@/app/components/defaults/MaxWidthWrapper";
import { DataTable } from "@/app/components/DataTable";
import Link from "next/link";

import { useSearchParams } from "next/navigation";
import connect from "../utils/clientPromise";
import product from "../models/product";
import { deleteEntity } from "../actions/actions";

export const dynamic = "force-dynamic";

const Page = async ({ searchParams }: { searchParams: { page?: string } }) => {
  await connect();

  const currentPage = parseInt(searchParams.page || "1", 10);
  const limit = 10;

  // Fetch paginated data
  const data = await product
    .find({})
    .limit(limit)
    .skip((currentPage - 1) * limit)
    .populate("category")
    .populate("city")

    .lean();

  const totalCount = (await product.countDocuments({}).lean()) as number;
  const totalPages = Math.ceil(totalCount / limit);
  return (
    <MaxWidthWrapper className="flex px-4 flex-col mt-5">
      <div className="flex items-center gap-2">
        <Button className="self-end">
          <Link href="/dashboard/createCourse">Add Course</Link>
        </Button>
      </div>
      <DataTable
        handleDeleteAll={deleteEntity}
        columns={columns}
        data={data}
        entity="Product"
        page={currentPage}
        totalPages={totalPages}
      />
    </MaxWidthWrapper>
  );
};

export default Page;
