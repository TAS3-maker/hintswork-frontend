import React, { useState } from 'react';
import ImageIcon from '../../assets/imageicon.svg';
import Editicon from '../../assets/edit.svg';
import HintDetailsPage from './HintDetailsPage';
import AddBrandModal from './AddBrandModal';
import AddHintsModal from './AddHintsModal'; // ✅ IMPORT FORM
import EditBrandModal from './EditBrandModal';

const Tab2 = () => {
  const [cards, setCards] = useState([
    {
      id: 1,
      title: 'Hint Work',
      desc: 'Your Path to Healthier living Starts Here. Revolutionizing...',
      tableData: [{ brand: 'Hint Work', hint: 'Strength train weekly', sponsor: 'Hint Work' }],
    },
    {
      id: 2,
      title: 'Hint Education',
      desc: 'Hint Education is your guide to unlocking knowledge...',
      tableData: [{ brand: 'Coursera', hint: 'Learn AI', sponsor: 'Coursera Org' }],
    },
    {
      id: 3,
      title: 'Hint Finance',
      desc: 'Hint Finance empowers you to take control of your finances...',
      tableData: [{ brand: 'HDFC', hint: 'Invest Smart', sponsor: 'HDFC Bank' }],
    },
    {
      id: 4,
      title: 'Hint Calm',
      desc: 'Hint Calm is your sanctuary for peace and mindfulness...',
      tableData: [],
    },
    {
      id: 5,
      title: 'Hint Health',
      desc: 'Hint Health provides guidance on nutrition...',
      tableData: [],
    },
    {
      id: 6,
      title: 'Hint Diet',
      desc: 'Hint Diet offers personalized nutrition and wellness solutions...',
      tableData: [],
    },
  ]);

  const [selectedCard, setSelectedCard] = useState(null);
  const [tableDataMap, setTableDataMap] = useState(() =>
    cards.reduce((acc, card) => {
      acc[card.id] = card.tableData;
      return acc;
    }, {})
  );

  const [isAddBrandFormVisible, setIsAddBrandFormVisible] = useState(false);
  const [isAddHintModalVisible, setIsAddHintModalVisible] = useState(false); // ✅ ADD MODAL STATE

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  const handleBack = () => {
    setSelectedCard(null);
  };

  const handleAddHint = () => {
    const newHint = {
      brand: 'Hint Work',
      hint: 'New Hint Added',
      sponsor: 'Hint Work',
    };

    setTableDataMap((prev) => ({
      ...prev,
      [selectedCard.id]: [...(prev[selectedCard.id] || []), newHint],
    }));
  };

  const handleEditHint = (index) => {
    const updatedData = prompt('Enter updated hint:');
    if (!updatedData) return;

    const updated = [...tableDataMap[selectedCard.id]];
    updated[index].hint = updatedData;

    setTableDataMap((prev) => ({
      ...prev,
      [selectedCard.id]: updated,
    }));
  };

  const handleDeleteHint = (index) => {
    const updated = [...tableDataMap[selectedCard.id]];
    updated.splice(index, 1);
    setTableDataMap((prev) => ({
      ...prev,
      [selectedCard.id]: updated,
    }));
  };

  const handleAddBrand = (newBrandData) => {
    setCards((prevCards) => [
      ...prevCards,
      {
        id: prevCards.length + 1,
        title: newBrandData.brandName,
        desc: newBrandData.description,
        tableData: [],
      },
    ]);
    setIsAddBrandFormVisible(false);
  };

  const handleFileUpload = (file) => {
    console.log('File uploaded:', file.name);

    // Example logic: Add a dummy hint to selected card after upload
    if (selectedCard) {
      const newHint = {
        brand: selectedCard.title,
        hint: `Hint from ${file.name}`,
        sponsor: selectedCard.title,
      };

      setTableDataMap((prev) => ({
        ...prev,
        [selectedCard.id]: [...(prev[selectedCard.id] || []), newHint],
      }));
    }
  };

  if (selectedCard) {
    return (
      <HintDetailsPage
        title={selectedCard.title}
        onBack={handleBack}
        tableData={tableDataMap[selectedCard.id] || []}
        onAddHint={handleAddHint}
        onEditHint={handleEditHint}
        onDeleteHint={handleDeleteHint}
      />
    );
  }

  return (
    <div className="p-6 space-y-6">
      {isAddBrandFormVisible && (
        <AddBrandModal
          isOpen={isAddBrandFormVisible}
          onClose={() => setIsAddBrandFormVisible(false)}
          onSave={handleAddBrand}
        />
      )}

      {isAddHintModalVisible && (
        <AddHintsModal
          isOpen={isAddHintModalVisible}
          onClose={() => setIsAddHintModalVisible(false)}
          onUpload={handleFileUpload}
        />
      )}

      <div className="flex flex-col lg:flex-row justify-between items-start gap-4 lg:items-center">
        <h2 className="text-3xl sm:text-5xl font-semibold text-[#786A08]">Hints</h2>
        <div className="space-x-0 mt-4 sm:mt-0 flex flex-wrap gap-3 justify-center">
          <button
            onClick={() => setIsAddBrandFormVisible(true)}
            className="px-4 py-2 sm:px-6 sm:py-4 font-semibold bg-gradient-to-b from-[#FFE074] to-[#E3B512] text-[#786A08] rounded hover:border-[#786A08]"
          >
            Add Brand
          </button>
          <button
            onClick={() => setIsAddHintModalVisible(true)} 
            className="px-4 py-2 sm:px-6 sm:py-4 font-semibold bg-gradient-to-b from-[#FFE074] to-[#E3B512] text-[#786A08] rounded hover:border-[#786A08]"
          >
            Add Hint
          </button>
          <button className="px-4 py-2 sm:px-6 sm:py-4 font-semibold bg-gradient-to-b from-[#FFE074] to-[#E3B512] text-[#786A08] rounded hover:border-[#786A08]">
            Upload Spreadsheet
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card) => (
          <div
            key={card.id}
            className="relative bg-[#FFFBEF] p-5 rounded-[8.5px] border-2 border-[#FFE891] shadow-md cursor-pointer hover:shadow-lg transition"
            onClick={() => handleCardClick(card)}
          >
            <div className="flex justify-end text-[#796b0b] hover:text-[#bca719]">
              <img src={Editicon} alt="editicon" />
            </div>

            <div className="flex items-center gap-1">
              <div className="flex flex-col items-center text-[#bca719] w-full max-w-fit">
                <div className="rounded-full bg-[#FEDC63] size-10 flex items-center justify-center mb-2">
                  <img className="size-5" src={ImageIcon} alt="ImageIcon" />
                </div>
                <span className="font-semibold text-xs sm:text-[17px] text-black text-center">
                  {card.title}
                </span>
              </div>
              <div className="text-sm sm:text-base font-medium leading-[21.3px] text-[#706000]">
                {card.desc}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tab2;
