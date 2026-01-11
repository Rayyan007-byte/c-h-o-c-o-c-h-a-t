import React from "react";

const Table = ({ heading, columns, rows }) => {

  return (
    <div className="min-h-screen px-4 flex justify-center">
      <div className="bg-gray-800 w-full max-w-7xl p-6 shadow-xl rounded-2xl">
        <h2 className="text-center text-2xl md:text-3xl font-semibold uppercase text-gray-200 mb-6">
          {heading}
        </h2>
        <div className="overflow-x-auto rounded-lg">
          <table className="table-fixed border-collapse">
            <thead>
              <tr className="bg-gray-900 text-gray-200">
                {columns &&
                  columns.map((col) => (
                    <th
                      key={col.field}
                      className="px-4 py-3 font-semibold uppercase"
                      style={{ width: `${col.w}px` }}
                    >
                      {col.headerName}
                    </th>
                  ))}
              </tr>
            </thead>
            <tbody>
              {rows &&
                rows.map((row) => (
                  <tr
                    key={row.id}
                    className="border-b border-gray-700 hover:bg-gray-700 transition"
                  >
                   
                    {columns.map((col) => (
                      
                      <td key={col.field} className="px-4 py-3 text-gray-300">
                        {col.field === "avatar" ? (
                          <img
                            src={
                              Array.isArray(row.avatar)
                                ? row.avatar[0]
                                : row.avatar
                            }
                            alt=""
                            className="w-8 h-8 rounded-full"
                          />
                        ) : (
                          row[col.field]
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Table;
