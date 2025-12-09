import React, { useState, useEffect } from "react";
import AddSponsorModal from "./AddSponsorModal";
import Editicon from "../../assets/edit.svg";
import Deleteicon from "../../assets/delete.svg";
import Helpicon from "../../assets/help.svg";
import { useSponsorContext } from "../../contexts/SponsorContext";

const Tab4 = () => {
  const {
    sponsors,
    loadingSponsors,
    addSponsor,
    deleteSponsorById,
    fetchSponsors,
  } = useSponsorContext();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteSponsorData, setDeleteSponsorData] = useState(null);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [allBrands, setAllBrands] = useState([]);

  useEffect(() => {
    fetchSponsors(); // ✅ Fetch sponsors on mount
  }, []);

  const columns = [
    { header: "Sponsor ID", accessor: "sponsorId" },
    { header: "Sponsor Name", accessor: "name" },
    { header: "Tier", accessor: "tier" },
    { header: "Website URL", accessor: "websiteUrl" },
    { header: "Associated Brand", accessor: "associatedBrands" },
    { header: "Status", accessor: "status" },
  ];

  const handleEdit = (sponsor) => {
    console.log("Edit clicked for sponsor:", sponsor);
    // TODO: Add edit functionality if needed
  };

  const handleOpenDeleteModal = (sponsor) => {
    setDeleteSponsorData(sponsor);
    setIsDeleteModalVisible(true);
  };

  const handleDeleteConfirm = async () => {
    if (!deleteSponsorData) return;
    setActionLoading(true);
    const res = await deleteSponsorById(deleteSponsorData._id);
    if (res.success) {
      alert("Sponsor deleted successfully!");
      setDeleteSponsorData(null);
      setIsDeleteModalVisible(false);
    } else {
      alert("Error deleting sponsor: " + res.message);
    }
    setActionLoading(false);
  };

  const handleDeleteCancel = () => {
    setDeleteSponsorData(null);
    setIsDeleteModalVisible(false);
  };

  const handleAddSponsorClick = () => {
    setIsModalOpen(true);
  };

  const handleSaveSponsor = async (newSponsor) => {
    setActionLoading(true);

    const associatedBrandIds = newSponsor.associatedBrands
      .map((brandName) => {
        const brand = allBrands.find((b) => b.name === brandName);
        return brand ? brand._id : null;
      })
      .filter((id) => id !== null);

    const payload = {
      name: newSponsor.name || "Unknown",
      tier: newSponsor.tier || "Gold",
      websiteUrl: newSponsor.website,
      associatedBrands: associatedBrandIds,
      status: newSponsor.status ? "Active" : "Inactive",
    };

    const res = await addSponsor(payload);
    if (res.success) {
      alert("Sponsor added successfully!");
      setIsModalOpen(false);
    } else {
      alert("Failed to add sponsor: " + res.message);
    }
    setActionLoading(false);
  };

  if (loadingSponsors) {
    return <div className="text-center text-xl p-8">Loading sponsors...</div>;
  }

  return (
    <div className="space-y-4 relative">
      <div className="flex justify-between items-center mb-6">
        <div className="text-2xl md:text-3xl font-semibold text-[#645200]">
          List of Sponsors
        </div>
        <div
          onClick={handleAddSponsorClick}
          className="px-4 py-2 md:px-6 md:py-3 font-semibold bg-gradient-to-b from-[#FFE074] to-[#E3B512] text-white text-[16px] md:text-xl rounded cursor-pointer hover:bg-gradient-to-b hover:from-[#E3B512] hover:to-[#FFE074] hover:border-[#786A08] transition-all duration-200 ease-in-out"
        >
          Add Sponsor
        </div>
      </div>

      <InlineTable
        columns={columns}
        data={sponsors.map((s) => ({
          ...s,
          associatedBrands: Array.isArray(s.associatedBrands)
            ? s.associatedBrands.join(", ")
            : s.associatedBrands,
          sponsorId: s.sponsorId || s._id,
          id: s._id,
        }))}
        onEdit={handleEdit}
        onDelete={handleOpenDeleteModal}
        enablePagination={true}
        rowsPerPage={4}
        hasStatusColumn={true}
        hasSerialNumberColumn={false}
      />

      <AddSponsorModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveSponsor}
        loading={actionLoading}
      />

      {isDeleteModalVisible && (
        <div className="flex justify-center items-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-opacity-50 rounded-lg w-full max-w-lg z-10">
          <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-[350px]">
            <div className="flex justify-center mb-4">
              <img src={Helpicon} alt="Delete Confirmation" className="w-16 h-16" />
            </div>
            <h3 className="text-xl font-semibold text-center">Are You Sure?</h3>
            <p className="text-center text-gray-600 mt-2">
              You won’t be able to revert this!
            </p>
            <div className="flex justify-center gap-5 mt-6">
              <button
                onClick={handleDeleteConfirm}
                disabled={actionLoading}
                className="px-6 flex justify-center items-center py-2 bg-[#E30505] text-white rounded-sm text-bold text-[17px] cursor-pointer w-full max-w-[136px]"
              >
                Delete
              </button>
              <button
                onClick={handleDeleteCancel}
                disabled={actionLoading}
                className="px-6 py-2 flex justify-center items-center bg-[#FDD43E] text-white rounded-sm text-bold text-[17px] cursor-pointer w-full max-w-[136px]"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
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
        </table>
      </div>

      {shouldPaginate && (
        <div className="flex justify-center gap-5 mt-6">
          <button
            disabled={currentPage === 1}
            onClick={handlePrev}
            className="px-4 py-2 bg-[#E3B512] text-white rounded"
          >
            Prev
          </button>
          {[...Array(totalPages).keys()].map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page + 1)}
              className={`px-4 py-2 rounded ${
                currentPage === page + 1 ? "bg-[#FDD43E]" : "bg-[#E3B512]"
              } text-white`}
            >
              {page + 1}
            </button>
          ))}
          <button
            disabled={currentPage === totalPages}
            onClick={handleNext}
            className="px-4 py-2 bg-[#E3B512] text-white rounded"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Tab4;
