import MaxWidthWrapper from "@/app/components/defaults/MaxWidthWrapper";
import { DataTable } from "@/app/components/DataTable";

import connect from "@/app/utils/clientPromise";
import { deleteEntity } from "@/app/actions/actions";
import order from "@/app/models/order";
import { orderColumns } from "./columns";

export const dynamic = "force-dynamic";

const Page = async () => {
  await connect();

  const data = await order.find({}).lean();
  const dataObj = JSON.parse(JSON.stringify(data));
  return (
    <MaxWidthWrapper className="flex px-4 flex-col mt-5">
      <DataTable handleDeleteAll={deleteEntity} columns={orderColumns} data={dataObj} entity="Order" page={1} />
    </MaxWidthWrapper>
  );
};

export default Page;
