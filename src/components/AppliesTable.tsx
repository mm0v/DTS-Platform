import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  type ColumnDef,
  flexRender,
} from "@tanstack/react-table";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { ViewIcon, ArrowUpRightIcon, TrashIcon } from "../components/SVG/Admin";

type Company = {
  id: number;
  name: string;
  status: "Tamamlandı" | "Tamamlanmadı" | "İcrada";
  number: string;
  sector: string;
  date: string;
};

const data: Company[] = Array.from({ length: 100 }, (_, i) => ({
  id: i + 1,
  name: "Lorem Ipsum",
  status: i % 3 === 0 ? "Tamamlandı" : i % 3 === 1 ? "İcrada" : "Tamamlanmadı",
  number: "#12345",
  sector: "Tikinti",
  date: "13.08.2025 - 14:30",
}));

const columns: ColumnDef<Company>[] = [
  {
    accessorKey: "id",
    header: "#",
    cell: (info) => info.getValue(),
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
  },
  {
    accessorKey: "number",
    header: "Müraciət nömrəsi",
  },
  {
    accessorKey: "sector",
    header: "Sektor",
  },
  {
    accessorKey: "date",
    header: "Müraciət tarixi",
  },
  {
    id: "actions",
    header: () => <span className="text-center block"></span>,
    cell: () => (
      <div className="flex gap-2 justify-center">
        <button className="p-2.5 rounded-lg border border-[#CED4DA] bg-white hover:bg-gray-100 transition cursor-pointer">
          <ViewIcon />
        </button>
        <button className="p-2.5 rounded-lg border border-[#CED4DA] bg-white hover:bg-gray-100 transition cursor-pointer">
          <ArrowUpRightIcon />
        </button>
        <button className="p-2.5 rounded-lg border border-[#CED4DA] bg-white hover:bg-gray-100 transition cursor-pointer">
          <TrashIcon />
        </button>
      </div>
    ),
  },
];

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

function DataTable() {
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
              {headerGroup.headers.map((header, index) => (
                <th
                  key={header.id}
                  className={`px-6 py-2.5 font-medium! ${
                    index === 0 ? "text-center" : "text-left"
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
                  }`}
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
