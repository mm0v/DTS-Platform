import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  type ColumnDef,
  flexRender,
} from "@tanstack/react-table";
import { Check, ChevronLeft, ChevronRight, Clock } from "lucide-react";
import {
  ViewIcon,
  ArrowUpRightIcon,
  TrashIcon,
  FeedbackIcon,
} from "../components/SVG/Admin";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useTableSettings } from "../pages/admin/Applies";
import { toast } from "react-toastify";

type Expert = {
  id: number;
  name: string;
  surname: string;
  email: string;
  phoneNumber: string;
  imageUrl: string;
  dateOfBirth: string;
};

type Company = {
  id: number;
  name: string;
  status: string;
  sector: string;
  date: string;
  region: string;
  createdDate: string;
  expert: Expert | null;
  feedback: string | null;
};

function Pagination({
  table,
  isDataLoaded,
}: {
  table: any;
  isDataLoaded: boolean;
}) {
  const pageCount = table.getPageCount();
  const currentPage = table.getState().pagination.pageIndex;
  const pageSize = table.getState().pagination.pageSize;
  const [searchParams, setSearchParams] = useSearchParams();

  const pages = Array.from({ length: pageCount }, (_, i) => i);

  // ✅ Sync page & size to URL
  useEffect(() => {
    if (!isDataLoaded) return;
    searchParams.set("page", (currentPage + 1).toString()); // +1 because table uses 0-index
    searchParams.set("size", pageSize.toString());
    setSearchParams(searchParams, { replace: true });
  }, [currentPage, pageSize, searchParams, setSearchParams, isDataLoaded]);

  if (!isDataLoaded) return null;

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
            className={`p-2.5 rounded-lg border bg-white hover:bg-gray-100 transition cursor-pointer font-medium ${
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
            value={pageSize}
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

type ModalType =
  | "confirm"
  | "sendToExpert"
  | "readFeedback"
  | "writeFeedback"
  | null;

type DataTableProps = {
  data: Company[];
  isDataLoaded: boolean;
  isLoading: boolean;
  onOpenModal: (type: ModalType, companyId: number | null) => void;
  role: string;
};

function DataTable({
  data,
  isDataLoaded,
  isLoading,
  onOpenModal,
  role,
}: DataTableProps) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  // ✅ Initialize state from URL (only once)
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  const { tableSettings } = useTableSettings();

  // initialize from URL only once data is ready
  useEffect(() => {
    if (!isDataLoaded || data.length === 0) return;

    const page = Number(searchParams.get("page")) || 1;
    const size = Number(searchParams.get("size")) || 10;

    const maxPage = Math.max(0, Math.ceil(data.length / size) - 1);
    const clamped = Math.min(Math.max(page - 1, 0), maxPage);

    setPageIndex(clamped);
    setPageSize(size);
  }, [isDataLoaded, data.length, searchParams]);

  const renderActionButton = (row: any) => {
    const { status, id, expert } = row.original;

    if (status === "Tamamlandı") {
      return (
        <button
          title="Show Feedback"
          onClick={() => {
            onOpenModal("readFeedback", id);
          }}
          className="p-2.5 rounded-lg border border-[#CED4DA] bg-white hover:bg-gray-100 transition cursor-pointer"
        >
          <Check width="20px" height="20px" />
        </button>
      );
    }

    if (role === "SUPER_ADMIN" || role === "ADMIN") {
      switch (status) {
        case "Tamamlanmadı":
          return (
            <button
              title="Send To An Expert"
              onClick={() => {
                onOpenModal("sendToExpert", id);
              }}
              className="p-2.5 rounded-lg border border-[#CED4DA] bg-white hover:bg-gray-100 transition cursor-pointer"
            >
              <ArrowUpRightIcon />
            </button>
          );

        case "İcrada":
          return (
            <button
              title="Wait..."
              onClick={() => {
                toast.warning(
                  `${expert?.name} ${expert?.surname}-dən cavab gözlənilir.`
                );
              }}
              className="p-2.5 rounded-lg border border-[#CED4DA] bg-white hover:bg-gray-100 transition cursor-pointer"
            >
              <Clock width="20px" height="20px" />
            </button>
          );
      }
    } else {
      if (status === "İcrada") {
        return (
          <button
            title="Write Feedback"
            onClick={() => {
              onOpenModal("writeFeedback", id);
            }}
            className="p-2.5 rounded-lg border border-[#CED4DA] bg-white hover:bg-gray-100 transition cursor-pointer"
          >
            <span className="w-5 flex justify-center">
              <FeedbackIcon />
            </span>
          </button>
        );
      }
    }

    return null;
  };

  const columns: ColumnDef<Company>[] = [
    {
      header: "#",
      cell: (row) => row.row.index + pageIndex * pageSize + 1,
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

          {renderActionButton(cell.row)}

          <button
            title="Delete"
            onClick={() => {
              onOpenModal("confirm", cell.row.original.id);
            }}
            className="p-2.5 rounded-lg border border-[#CED4DA] bg-white hover:bg-gray-100 transition cursor-pointer"
          >
            <TrashIcon />
          </button>
        </div>
      ),
    },
  ];

  const filteredData = data.filter((company) => {
    const regionMatch =
      tableSettings.region.length === 0 ||
      tableSettings.region.some((region) =>
        company.region.toLowerCase().includes(region.toLowerCase())
      );

    const sectorMatch =
      tableSettings.sector.length === 0 ||
      tableSettings.sector.includes(company.sector);

    const statusMatch =
      tableSettings.status.length === 0 ||
      tableSettings.status.includes(company.status);

    const query = tableSettings.searchQuery.toLowerCase();
    const searchMatch =
      query === "" ||
      company.name.toLowerCase().includes(query) ||
      company.status.toLowerCase().includes(query) ||
      company.sector.toLowerCase().includes(query) ||
      company.region.toLowerCase().includes(query) ||
      company.id.toString().includes(query);

    return regionMatch && sectorMatch && searchMatch && statusMatch;
  });

  let sortedData = [...filteredData];

  if (tableSettings.sort === "newest") {
    sortedData.sort(
      (a, b) =>
        new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime()
    );
  } else if (tableSettings.sort === "oldest") {
    sortedData.sort(
      (a, b) =>
        new Date(a.createdDate).getTime() - new Date(b.createdDate).getTime()
    );
  } else if (tableSettings.sort === "name") {
    sortedData.sort((a, b) => a.name.localeCompare(b.name));
  }

  const start = pageIndex * pageSize;
  const end = start + pageSize;
  const paginatedData = sortedData.slice(start, end);

  const table = useReactTable({
    data: paginatedData,
    columns,
    state: { pagination: { pageIndex, pageSize } },
    onPaginationChange: (updater) => {
      if (typeof updater === "function") {
        const newState = updater({ pageIndex, pageSize });
        setPageIndex(newState.pageIndex);
        setPageSize(newState.pageSize);
      } else {
        setPageIndex(updater.pageIndex);
        setPageSize(updater.pageSize);
      }
    },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: true,
    pageCount: Math.ceil(sortedData.length / pageSize), // ✅ add this
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
      {(table.getRowModel().rows.length && !isLoading) === 0 && (
        <p className="w-full text-center mt-4">Məlumat yoxdur</p>
      )}
      {isLoading && <p className="w-full text-center mt-4">Yüklənir...</p>}

      {/* Pagination */}
      <Pagination table={table} isDataLoaded={isDataLoaded} />
    </div>
  );
}

export default DataTable;
