import React, { useState, useEffect } from 'react';
import AddUserModal from './AddUserModal';
import Editicon from '../../assets/edit.svg';
import Deleteicon from '../../assets/delete.svg';
import Helpicon from '../../assets/help.svg';
import { useUserContext } from '../../contexts/UserContext'; // Adjust path as per your folder structure

const Tab5 = () => {
  const { users, fetchUsers, loadingUsers, userError, deleteUserById } = useUserContext();
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [deleteUserData, setDeleteUserData] = useState(null); // 👈 store user to delete
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false); // 👈 modal visibility

  // Sync local data with context users
  useEffect(() => {
    if (users && users.length) {
      const formattedUsers = users.map((user, idx) => ({
        id: user._id || idx + 1,
        _id: user._id,
        name: user.name || `${user.firstName || ''} ${user.lastName || ''}`.trim(),
        email: user.email || '',
        rewards: user.rewards || Math.floor(Math.random() * 1000),
        status: user.status || 'Inactive',
      }));
      setData(formattedUsers);
    }
  }, [users]);

  const columns = [
    { header: 'Name', accessor: 'name' },
    { header: 'Email', accessor: 'email' },
    { header: 'Rewards', accessor: 'rewards' },
    { header: 'Status', accessor: 'status' },
  ];

  const handleEdit = (index) => {
    console.log('Edit clicked for index: ', index);
  };

  const handleOpenDeleteModal = (user) => {
    setDeleteUserData(user);
    setIsDeleteModalVisible(true);
  };

  const handleDeleteConfirm = async () => {
    if (!deleteUserData || !deleteUserData._id) return;

    const res = await deleteUserById(deleteUserData._id);
    if (res.success) {
      fetchUsers(); // re-fetch after deletion
    } else {
      alert("Error: " + res.message);
    }

    setIsDeleteModalVisible(false);
    setDeleteUserData(null);
  };

  const handleDeleteCancel = () => {
    setIsDeleteModalVisible(false);
    setDeleteUserData(null);
  };

  const handleAddUser = () => {
    setIsModalOpen(true);
  };

  const handleSaveUser = (formData) => {
    const newUser = {
      userId: `User${Math.floor(Math.random() * 10000)}`,
      name: `${formData.firstName} ${formData.lastName}`.trim(),
      email: formData.email,
      rewards: Math.floor(Math.random() * 1000),
      status: Math.random() > 0.5 ? 'Active' : 'Inactive',
      id: data.length ? Math.max(...data.map(u => u.id)) + 1 : 1,
    };
    setData([...data, newUser]);
    setIsModalOpen(false);
  };

  if (loadingUsers) {
    return <div>Loading users...</div>;
  }

  if (userError) {
    return <div className="text-red-600">Error: {userError}</div>;
  }

  return (
    <div className="space-y-4 relative">
      <div className="flex justify-between items-center mb-6">
        <div className="text-2xl md:text-3xl font-semibold text-[#645200]">User</div>
        <div
          onClick={handleAddUser}
          className="px-4 py-2 md:px-6 md:py-3 font-semibold bg-gradient-to-b from-[#FFE074] to-[#E3B512] text-white text-[16px] md:text-xl rounded cursor-pointer hover:bg-gradient-to-b hover:from-[#E3B512] hover:to-[#FFE074] hover:border-[#786A08] transition-all duration-200 ease-in-out"
        >
          Add User
        </div>
      </div>

      <div className="overflow-x-auto rounded-[11px] shadow-md">
        <InlineTable
          columns={columns}
          data={data}
          onEdit={handleEdit}
          onDelete={handleOpenDeleteModal}
          enablePagination={true}
          rowsPerPage={4}
          hasStatusColumn={true}
          hasSerialNumberColumn={true}
        />
      </div>

      <AddUserModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveUser}
      />

      {isDeleteModalVisible && (
        <div className="flex justify-center items-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-opacity-50 rounded-lg w-full max-w-lg z-10">
          <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-[350px]">
            <div className="flex justify-center mb-4">
              <img src={Helpicon} alt="Delete Confirmation" className="w-16 h-16" />
            </div>
            <h3 className="text-xl font-semibold text-center">Are You Sure?</h3>
            <p className="text-center text-gray-600 mt-2">You won’t be able to revert this!</p>
            <div className="flex justify-center gap-5 mt-6">
              <div
                onClick={handleDeleteConfirm}
                className="px-6 flex justify-center items-center py-2 bg-[#E30505] text-white rounded-sm text-bold text-[17px] cursor-pointer w-full max-w-[136px]"
              >
                Delete
              </div>
              <div
                onClick={handleDeleteCancel}
                className="px-6 py-2 flex justify-center items-center bg-[#FDD43E] text-white rounded-sm text-bold text-[17px] cursor-pointer w-full max-w-[136px]"
              >
                Cancel
              </div>
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
              {hasSerialNumberColumn && (
                <th className="px-4 py-[28px] text-center text-[#645200] text-2xl font-medium">
                  Sr. No.
                </th>
              )}
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
                <td colSpan={columns.length + (hasSerialNumberColumn ? 2 : 1)} className="text-center py-6 text-[#645200]">
                  No data available.
                </td>
              </tr>
            ) : (
              paginatedData.map((row, rowIndex) => {
                const actualIndex = (currentPage - 1) * rowsPerPage + rowIndex;
                const isEvenRow = actualIndex % 2 === 0;
                const bgColor = isEvenRow ? '#FFFBEF' : '#F9EFCA';

                return (
                  <tr key={rowIndex} style={{ backgroundColor: bgColor }} className="text-[#645200] text-xl font-medium text-center hover:bg-[#FFFBEF]">
                    {hasSerialNumberColumn && (
                      <td className="px-4 py-[28px]">{actualIndex + 1}</td>
                    )}
                    {columns.map((col, colIndex) => (
                      <td key={colIndex} className="px-4 py-[28px] text-xl">
                        {col.accessor === 'status' && hasStatusColumn ? (
                          <span
                            style={{
                              backgroundColor: row[col.accessor] === 'Active' ? '#F9EFCA' : '#FFFBEF',
                              padding: '5px 10px',
                              borderRadius: '5px',
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
                      <td className="px-4 py-[28px] space-x-4 flex justify-center items-center">
                        {onEdit && (
                          <div onClick={() => onEdit(actualIndex)}>
                            <img className="size-6 cursor-pointer" src={Editicon} alt="editicon" />
                          </div>
                        )}
                        {onDelete && (
                          <div onClick={() => onDelete(row)}>
                            <img className="size-6 cursor-pointer" src={Deleteicon} alt="deleteicon" />
                          </div>
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

export default Tab5;
