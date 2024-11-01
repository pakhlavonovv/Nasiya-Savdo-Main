import { useState } from "react";
import { useGetCategory } from "../hooks/queries";
import { Button, Tooltip, Popconfirm, Space } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  ArrowRightOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { Category as CategoryType, CategoryDataType } from "../types";
import { deleteContract } from "../service";
import Loading from "../../../components/loading";
import { ColumnsType } from "antd/es/table";
import { ParamsType } from "../../../modules/types";
import { useQueryClient } from "@tanstack/react-query";
import GlobalTable from "../../../components/table";
import ProductModal from "./modal";
import { useCreateContract, useDeleteCategory } from "../hooks/mutation";

const Contract = () => {
  const [params, setParams] = useState<ParamsType>({
    status: "",
    limit: 3,
    page: 1,
    search: "",
  });

  const [open, setOpen] = useState(false);
  const [updateData, setUpdateData] = useState<CategoryDataType | null>(null);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
const { mutate: createMutate } = useCreateContract();
  const { data, isLoading } = useGetCategory(params);
  const { mutate: deleteMutate } = useDeleteCategory();

  const handleClose = () => {
    setOpen(false);
    setUpdateData(null);
  };

  const handleTableChange = (pagination: {
    current?: number;
    pageSize?: number;
  }) => {
    const { current = 1, pageSize = 10 } = pagination;
    setParams((prev) => ({
      ...prev,
      page: current,
      limit: pageSize,
    }));

    const current_params = new URLSearchParams(window.location.search);
    current_params.set("page", `${current}`);
    current_params.set("limit", `${pageSize}`);
    navigate(`?${current_params.toString()}`);
  };

  if (isLoading) return <Loading />;

  const columns: ColumnsType<CategoryType> = [
    {
      title: "T/R",
      dataIndex: "index",
      render: (_text, _record, index) =>
        index + 1 + (params.page - 1) * params.limit,
    },
    {
      title: "Consumer address",
      dataIndex: "consumer_address",
    },
    {
      title: "Consumer Name",
      dataIndex: "consumer_name",
    },
    {
      title: "Passport Serial",
      dataIndex: "consumer_passport_serial",
    },
    {
      title: "Phone number",
      dataIndex: "phone_number",
    },
    {
      title: "Duration",
      dataIndex: "duration",
    },
    {
      title: "Passport Image",
      dataIndex: "passport_image",
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: CategoryDataType) => (
        <Space>
          <Tooltip title="Edit">
            <Button
              onClick={() => {
                setUpdateData(record);
                setOpen(true);
              }}
              icon={<EditOutlined />}
            />
          </Tooltip>
          <Popconfirm
            title="Are you sure to delete this consumer?"
            onConfirm={() => {
              deleteMutate(record.id); // deleteContract o'rniga deleteMutate
            }}
          >

            <Tooltip title="Delete">
              <Button danger icon={<DeleteOutlined />} />
            </Tooltip>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <>
      <ProductModal
        open={open}
        handleClose={handleClose}
        update={updateData}
      />
      <Button
        onClick={() => {
          setOpen(true);
          setUpdateData(null);
        }}
        className='bg-[#AD8354] text-white mb-2'
      >
        Create Contract
      </Button>
      <GlobalTable
        columns={columns}
        data={data || []}
        pagination={{
          current: params.page,
          pageSize: params.limit,
          total: data?.total || 2,
          showSizeChanger: true,
          pageSizeOptions: ["3", "5", "7", "10", "12"],
        }}
        onChange={handleTableChange}
      />

    </>
  );
};

export default Contract;
