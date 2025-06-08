import React from "react";

type Column<T> = {
  label: string;
  accessor: keyof T;
  render?: (row: T) => React.ReactNode;
};

type DataTableProps<T> = {
  columns: Column<T>[];
  data: T[];
};

export default function DataTable<T extends { id: string }>({
  columns,
  data
}: DataTableProps<T>) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-blue-900 bg-[#0a174e] rounded text-white">
        <thead>
          <tr>
            {columns.map((col) => (
              <th
                key={String(col.accessor)}
                className="px-4 py-2 border-b font-semibold text-left bg-[#132257] text-yellow-400"
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr
              key={row.id}
              className={idx % 2 === 0 ? "bg-[#0a174e]" : "bg-[#132257]"}
            >
              {columns.map((col) => (
                <td
                  key={String(col.accessor)}
                  className="px-4 py-2 border-b text-white"
                >
                  {col.render
                    ? col.render(row)
                    : (row[col.accessor] as React.ReactNode)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
