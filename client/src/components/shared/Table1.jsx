import React from "react";

const Table = ({ columns = [], rows = [], heading }) => {
  return (
    <div className="min-h-screen px-4 flex items-center justify-center">

      <div className="w-full max-w-7xl bg-gray-800 rounded-2xl shadow-xl p-6">

        {/* Heading */}
        <h2 className="text-center text-2xl md:text-3xl font-semibold uppercase text-gray-200 mb-6">
          {heading}
        </h2>

        {/* Table Wrapper */}
        <div className="overflow-x-auto rounded-lg">

          <table className="min-w-full border-collapse">

            {/* TABLE HEAD */}
            <thead>
              <tr className="bg-gray-900 text-gray-200">
                {columns.map((col) => (
                  <th
                    key={col.field}
                    className="px-4 py-3 text-left text-sm font-semibold uppercase tracking-wider"
                  >
                    {col.headerName}
                  </th>
                ))}
              </tr>
            </thead>

            {/* TABLE BODY */}
            <tbody>
              {rows.length === 0 ? (
                <tr>
                  <td
                    colSpan={columns.length}
                    className="text-center py-6 text-gray-400"
                  >
                    No Data Found
                  </td>
                </tr>
              ) : (
                rows.map((row, index) => (
                  <tr
                    key={row.id || index}
                    className="border-b border-gray-700 hover:bg-gray-700 transition"
                  >
                    {columns.map((col) => (
                      <td
                        key={col.field}
                        className="px-4 py-3 text-sm text-gray-300"
                      >
                        {row[col.field]}
                      </td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>

          </table>
        </div>
      </div>
    </div>
  );
};

export default Table;
