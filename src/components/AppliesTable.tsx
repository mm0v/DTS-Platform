import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  type ColumnDef,
  flexRender,
} from "@tanstack/react-table";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { ViewIcon, ArrowUpRightIcon, TrashIcon } from "../components/SVG/Admin";
import { useNavigate } from "react-router-dom";

type Company = {
  id: number;
  name: string;
  status: string;
  sector: string;
  date: string;
};

function Pagination({ table }: { table: any }) {
  const pageCount = table.getPageCount();
  const currentPage = table.getState().pagination.pageIndex;

  const pages = Array.from({ length: pageCount }, (_, i) => i);

  return (
    <div className="flex items-center justify-between mt-4 font-ibm-plex-sans">
      <div className="flex gap-2">
        {/* Prev button */}
        <button
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          className="p-2.5 rounded-lg border border-[#CED4DA] bg-white hover:bg-gray-100 transition cursor-pointer disabled:text-[#ADB5BD] disabled:cursor-not-allowed disabled:bg-[#E9ECEF]"
        >
          <ChevronLeft />
        </button>

        {/* Page numbers */}
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => table.setPageIndex(page)}
            className={`p-2.5 rounded-lg border bg-white hover:bg-gray-100 transition cursor-pointer font-medium tracking-widest ${
              page === currentPage
                ? " text-[#0057FC] border-[#0057FC]"
                : " text-[#343A40] border-[#CED4DA]"
            }`}
          >
            <div className="min-w-5">{page + 1}</div>
          </button>
        ))}

        {/* Next button */}
        <button
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          className="p-2.5 rounded-lg border border-[#CED4DA] bg-white hover:bg-gray-100 transition cursor-pointer disabled:text-[#ADB5BD] disabled:cursor-not-allowed disabled:bg-[#E9ECEF]"
        >
          <ChevronRight />
        </button>
        <div className="flex items-center gap-2 ml-4">
          <select
            value={table.getState().pagination.pageSize}
            onChange={(e) => table.setPageSize(Number(e.target.value))}
            className="h-full rounded-lg border border-[#CED4DA] bg-white hover:bg-gray-100 px-2 py-1 transition cursor-pointer font-plus-jakarta"
          >
            {[10, 20, 30].map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
          <span>/ Səhifə</span>
        </div>
      </div>
    </div>
  );
}

type DataTableProps = {
  data: Company[];
  handleOpenModal: () => void;
  setLastId: (id: number) => void;
};

function DataTable({ data, handleOpenModal, setLastId }: DataTableProps) {
  const navigate = useNavigate();

  const columns: ColumnDef<Company>[] = [
    {
      header: "#",
      cell: (row) => row.row.index + 1,
      enableHiding: true,
    },
    {
      accessorKey: "name",
      header: "Şirkətin adı",
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ getValue }) => {
        const value = getValue() as string;
        const color =
          value === "Tamamlandı"
            ? "bg-green-500"
            : value === "İcrada"
            ? "bg-gray-500"
            : "bg-red-500";
        return (
          <div className="flex items-center gap-2">
            <span
              className={`w-3 h-3 rounded-full box-border border border-[#DEE2E6]  ${color}`}
            />
            {value}
          </div>
        );
      },
      meta: { className: "hidden md:table-cell" },
    },
    {
      accessorKey: "id",
      header: "Müraciət nömrəsi",
      cell: ({ getValue }) => `#${getValue()}`,
    },
    {
      accessorKey: "sector",
      header: "Sektor",
    },
    {
      accessorKey: "date",
      header: "Müraciət tarixi",
      meta: { className: "hidden lg:table-cell" },
    },
    {
      id: "actions",
      header: () => <span className="text-center block"></span>,
      cell: ({ cell }) => (
        <div className="flex gap-2 justify-center">
          <button
            title="View"
            className="p-2.5 rounded-lg border border-[#CED4DA] bg-white hover:bg-gray-100 transition cursor-pointer"
            onClick={() => {
              navigate(`/admin/applies/info/${cell.row.original.id}`);
            }}
          >
            <ViewIcon />
          </button>
          <button
            title="Edit"
            className="p-2.5 rounded-lg border border-[#CED4DA] bg-white hover:bg-gray-100 transition cursor-pointer"
          >
            <ArrowUpRightIcon />
          </button>
          <button
            title="Delete"
            onClick={() => {
              setLastId(cell.row.original.id);
              handleOpenModal();
            }}
            className="p-2.5 rounded-lg border border-[#CED4DA] bg-white hover:bg-gray-100 transition cursor-pointer"
          >
            <TrashIcon />
          </button>
        </div>
      ),
    },
  ];
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="p-4 w-full bg-white rounded-[8px] overflow-x-auto">
      <table className="w-full text-left p-4 border-collapse ">
        <thead className="text-[#6C757D] text-xs leading-5 whitespace-nowrap font-ibm-plex-sans">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr className="divide-x divide-[#E9ECEF]" key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className={`px-6 py-2.5 font-medium ${
                    (header.column.columnDef as any).meta?.className ?? ""
                  }`}
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="font-plus-jakarta divide-y divide-[#E9ECEF] text-[#323232]">
          {table.getRowModel().rows.map((row) => (
            <tr
              key={row.id}
              className="hover:bg-gray-50 odd:bg-[#F8F9FA] transition divide-x divide-[#E9ECEF]"
            >
              {row.getVisibleCells().map((cell, index) => (
                <td
                  key={cell.id}
                  className={`px-6 py-2 text-[14px] ${
                    index === 0 ? "text-center" : "text-left"
                  } ${(cell.column.columnDef as any).meta?.className ?? ""}`}
                >
                  <div
                    className={`min-h-10 flex items-center ${
                      index === 0 ? "justify-center" : ""
                    }`}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <Pagination table={table} />
    </div>
  );
}

export default DataTable;
