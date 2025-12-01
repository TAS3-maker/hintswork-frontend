import React, { useState } from "react";
import AddBrandModal from "./AddBrandModal";
import Editicon from "../../assets/edit.svg";
import Deleteicon from "../../assets/delete.svg";
import Helpicon from "../../assets/help.svg";

const Tab3 = () => {
  const [data, setData] = useState([
    { brandName: "Brand 1", description: "This is Brand 1", status: "Active", id: 1 },
    { brandName: "Brand 2", description: "This is Brand 2", status: "Inactive", id: 2 },
    { brandName: "Brand 3", description: "This is Brand 3", status: "Active", id: 3 },
    { brandName: "Brand 4", description: "This is Brand 4", status: "Inactive", id: 4 },
    { brandName: "Brand 5", description: "This is Brand 5", status: "Active", id: 5 },
    { brandName: "Brand 6", description: "This is Brand 6", status: "Inactive", id: 6 },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const columns = [
    { header: "Brand Name", accessor: "brandName" },
    { header: "Description", accessor: "description" },
    { header: "Status", accessor: "status" },
  ];

  const handleEdit = (brand) => {
    console.log("Edit clicked for:", brand);
  };

  const handleDelete = (brand) => {
    setData(data.filter((b) => b.id !== brand.id));
    console.log("Delete clicked for:", brand);
  };

  const handleAddBrand = () => {
    setIsModalOpen(true);
  };

  const handleSaveBrand = (newBrand) => {
    const updatedBrand = {
      brandName: newBrand.brandName,
      description: newBrand.description,
      status: Math.random() > 0.5 ? "Active" : "Inactive",
      id: data.length + 1,
    };
    setData([...data, updatedBrand]);
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-4 relative">
      <div className="flex justify-between items-center mb-6">
        <div className="text-2xl md:text-3xl font-semibold text-[#645200]">
          Brand
        </div>
        <div
          onClick={handleAddBrand}
          className="px-4 py-2 md:px-6 md:py-3 font-semibold bg-gradient-to-b from-[#FFE074] to-[#E3B512] text-white text-[16px] md:text-xl rounded cursor-pointer hover:bg-gradient-to-b hover:from-[#E3B512] hover:to-[#FFE074] hover:border-[#786A08] transition-all duration-200 ease-in-out"
        >
          Add Brand
        </div>
      </div>

      <InlineTable
        columns={columns}
        data={data}
        onEdit={handleEdit}
        onDelete={handleDelete}
        enablePagination={true}
        rowsPerPage={4}
        hasStatusColumn={true}
        hasSerialNumberColumn={false}
      />

      <AddBrandModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveBrand}
      />
    </div>
  );
};


const InlineTable = ({
  columns,
  data,
  onEdit,
  onDelete,
  enablePagination = false,
  paginationThreshold = 4,
  rowsPerPage = 4,
  hasStatusColumn = false,
  hasSerialNumberColumn = false,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const shouldPaginate = enablePagination && data.length > paginationThreshold;
  const totalPages = Math.ceil(data.length / rowsPerPage);

  const paginatedData = shouldPaginate
    ? data.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage)
    : data;

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);
  const handlePrev = () => currentPage > 1 && setCurrentPage(currentPage - 1);
  const handleNext = () => currentPage < totalPages && setCurrentPage(currentPage + 1);

  return (
    <div className="space-y-4 relative">
      <div className="overflow-x-auto rounded-[11px] shadow-md">
        <table className="min-w-full table-auto rounded shadow-md">
          <thead>
            <tr className="bg-[#F8DD8A] text-[#786A08]">
              {columns.map((col, index) => (
                <th
                  key={index}
                  className="px-4 py-[28px] text-center text-[#645200] text-2xl font-medium"
                >
                  {col.header}
                </th>
              ))}
              {(onEdit || onDelete) && (
                <th className="px-4 py-[28px] text-center text-[#645200] text-2xl font-medium">
                  Action
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {paginatedData.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + (hasSerialNumberColumn ? 2 : 1)}
                  className="text-center py-6 text-[#645200]"
                >
                  No data available.
                </td>
              </tr>
            ) : (
              paginatedData.map((row, rowIndex) => {
                const actualIndex = (currentPage - 1) * rowsPerPage + rowIndex;
                const isEvenRow = actualIndex % 2 === 0;
                const bgColor = isEvenRow ? "#FFFBEF" : "#F9EFCA";

                return (
                  <tr
                    key={row.id || rowIndex}
                    style={{ backgroundColor: bgColor }}
                    className="text-[#645200] text-xl font-medium text-center hover:bg-[#FFFBEF]"
                  >
                    {hasSerialNumberColumn && (
                      <td className="px-4 py-[28px]">{actualIndex + 1}</td>
                    )}
                    {columns.map((col, colIndex) => (
                      <td key={colIndex} className="px-4 py-[28px] text-xl">
                        {col.accessor === "status" && hasStatusColumn ? (
                          <span
                            style={{
                              backgroundColor:
                                row[col.accessor] === "Active"
                                  ? "#C6EFD3"
                                  : row[col.accessor] === "Inactive"
                                  ? "#F6C7C7"
                                  : "#FDD43E",
                              borderRadius: "30px",
                              padding: "4px 12px",
                              fontWeight: "600",
                              color:
                                row[col.accessor] === "Active"
                                  ? "#157145"
                                  : row[col.accessor] === "Inactive"
                                  ? "#761111"
                                  : "#333",
                            }}
                          >
                            {row[col.accessor]}
                          </span>
                        ) : (
                          row[col.accessor]
                        )}
                      </td>
                    ))}
                    {(onEdit || onDelete) && (
                      <td className="px-4 py-[28px] flex justify-center gap-4">
                        {onEdit && (
                          <img
                            src={Editicon}
                            alt="Edit"
                            className="cursor-pointer"
                            onClick={() => onEdit(row)}
                          />
                        )}
                        {onDelete && (
                          <img
                            src={Deleteicon}
                            alt="Delete"
                            className="cursor-pointer"
                            onClick={() => onDelete(row)}
                          />
                        )}
                      </td>
                    )}
                  </tr>
                );
              })
            )}
          </tbody>
        

      {shouldPaginate && (
            <tfoot className="bg-[#FFFBEF]">
              <tr>
                <td colSpan={columns.length + (hasSerialNumberColumn ? 2 : 1)}>
                  <div className="flex justify-center items-center space-x-2 mt-5 mb-5 text-[#786A08]">
                    <div
                      onClick={handlePrev}
                      className={`shadow-md px-3 py-1 rounded text-xl ${
                        currentPage === 1 ? 'bg-[#FFFBEF] cursor-not-allowed' : 'bg-[#FFE074] hover:bg-[#E3B512] cursor-pointer'
                      }`}
                    >
                      Prev
                    </div>
                    {[...Array(totalPages)].map((_, i) => (
                      <div
                        key={i}
                        onClick={() => handlePageChange(i + 1)}
                        className={`shadow-md px-4 py-1 rounded text-xl cursor-pointer ${
                          currentPage === i + 1 ? 'bg-[#FFE074] font-semibold' : 'bg-[#FFFBEF] hover:bg-[#E3B512]'
                        }`}
                      >
                        {i + 1}
                      </div>
                    ))}
                    <div
                      onClick={handleNext}
                      className={`shadow-md px-3 py-1 rounded text-xl ${
                        currentPage === totalPages ? 'bg-[#FFFBEF] cursor-not-allowed' : 'bg-[#FFE074] hover:bg-[#E3B512] cursor-pointer'
                      }`}
                    >
                      Next
                    </div>
                  </div>
                </td>
              </tr>
            </tfoot>
          )}
          </table>
      </div>
    </div>
  );
};

export default Tab3;
