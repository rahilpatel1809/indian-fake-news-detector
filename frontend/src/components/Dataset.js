import { useState, useEffect } from "react";
import Papa from "papaparse";

export default function Dataset() {
  const [dataset, setDataset] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  const [expandedRows, setExpandedRows] = useState({});
  const toggleRow = (index) => {
    setExpandedRows((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  useEffect(() => {
    fetch("/news_dataset.csv")
      .then((res) => res.text())
      .then((csvText) => {
        Papa.parse(csvText, {
          header: true,
          skipEmptyLines: true,
          complete: (results) => setDataset(results.data),
        });
      });
  }, []);

  const totalPages = Math.ceil(dataset.length / rowsPerPage);
  const start = (currentPage - 1) * rowsPerPage;
  const end = start + rowsPerPage;
  const currentRows = dataset.slice(start, end);

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(to right, #4f46e5, #8b5cf6)",
        padding: "1rem",
      }}
    >
      {}
      <div
        style={{
          background: "#fff",
          padding: "2rem",
          borderRadius: "1rem",
          boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
          maxWidth: "800px", 
          width: "100%",
          textAlign: "left",
        }}
      >
        {}
        <h2 className="text-2xl mb-4 font-semibold">Dataset Viewer</h2>
        <table className="w-full table-auto border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-4 py-2 text-left">Headline</th> {/* Align left for better readability */}
              <th className="border px-4 py-2">Label</th>
            </tr>
          </thead>
          <tbody>
            {currentRows.map((row, index) => {
              const globalIndex = (currentPage - 1) * rowsPerPage + index;
              const isExpanded = expandedRows[globalIndex];
              const displayText =
                isExpanded || !row.headline
                  ? row.headline
                  : `${row.headline.slice(0, 60)}${
                      row.headline.length > 60 ? "..." : ""
                    }`;

              return (
                <tr
                  key={globalIndex}
                  onClick={() => toggleRow(globalIndex)}
                  className="hover:bg-gray-100 cursor-pointer"
                >
                  <td className="border px-4 py-2 text-left">{displayText}</td> {/* Align left */}
                  <td className="border px-4 py-2">{row.label}</td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <div className="mt-4 flex justify-center space-x-4">
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 bg-blue-500 text-white rounded disabled:bg-gray-300"
          >
            Prev
          </button>
          <span className="px-3 py-1">
            {currentPage} / {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 bg-blue-500 text-white rounded disabled:bg-gray-300"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}