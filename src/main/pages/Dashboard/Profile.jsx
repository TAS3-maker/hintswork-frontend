import React, { useState, useEffect } from 'react';
import avatarImage from '../../assets/profile.png';
import Editicon from '../../assets/edit.svg';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css'; 

const Profile = () => {
  const initialInfo = {
    name: 'Hi Mike',
    email: 'mike123@gmail.com',
    avatar: avatarImage,
    phone: '+1 9873356789',
    firstName: 'Mike',
  };

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(initialInfo);
  const [originalData, setOriginalData] = useState(initialInfo);

  
  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      name: `Hi ${prev.firstName}`,
    }));
  }, [formData.firstName]);

  const handleEditClick = () => setIsEditing(true);

  const handleSave = () => {
    setOriginalData(formData); 
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData(originalData); 
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="profile-page p-0 md:p-6 w-full h-full overflow-y-auto mb-11">

      <h1 className="!text-3xl md:!text-5xl text-[#786A08] font-semibold mb-11">My Profile</h1>

     
      <div className="profile-info flex flex-col justify-center gap-4 items-center mb-8 w-full max-w-[480px] mx-auto rounded-[12px] border-2 border-[#FEDC63] bg-[#FFFBED] py-7 sm:py-[59px]">
        <img
          src={formData.avatar}
          alt="Profile"
          className="w-14 h-14 sm:w-24 sm:h-24 rounded-full"
        />
        <div>
          <p className="text-2xl text-[#6C5D00] font-semibold">{formData.name}</p>
        </div>
      </div>

     
      <div className="personal-info w-full max-w-[1090px] mx-auto border-2 border-[#FEDC63] rounded-[13px] bg-[#FFFBED] p-6 sm:pt-[48px] sm:pl-[39px] sm:pr-[30px] sm:pb-[63px]">

        <div className="flex justify-between items-center mb-5 sm:mb-10">
          <p className="text-3xl text-[#786A08] font-semibold">My Personal Information</p>

          {!isEditing && (
            <div
              onClick={handleEditClick}
              className="flex gap-1 sm:gap-2.5 h-[40px] sm:h-[53px] items-center px-0 w-[130px] justify-center sm:px-6 rounded-sm shadow-md bg-gradient-to-b from-[#FFE074] to-[#E3B512] cursor-pointer"
            >
              <p className='font-bold text-[20px] sm:text-[22.93px] text-[#786A08]'>Edit</p>
              <img className='size-[20px] sm:size-6' src={Editicon} alt='editicon' />
            </div>
          )}
        </div>

        
        <div className="flex gap-4 mb-5 sm:mb-8">
          <div className="w-1/2 flex flex-col gap-3 sm:gap-7">
            <p className="text-2xl sm:text-3xl font-medium text-[#9B8F36]">First Name</p>
            {isEditing ? (
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="text-[22px] sm:text-[26px] font-medium text-[#604E00] bg-[#fffbed] px-2 py-[2px] rounded border border-[#9B8F36 ] focus:outline-none"
              />
            ) : (
              <p className="text-[22px] sm:text-[26px] font-medium text-[#604E00]">{formData.firstName}</p>
            )}
          </div>
        </div>

       
        <div className="flex flex-wrap gap-5 sm:gap-10 justify-start">
         
          <div>
            <p className="text-2xl sm:text-3xl text-[#9B8F36] font-medium mb-[10px] sm:mb-5">Email</p>
            {isEditing ? (
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="text-[22px] sm:text-[26px] font-medium text-[#604E00] bg-[#fffbed] px-2 py-[2px] rounded border border-[#9B8F36 ] focus:outline-none"
              />
            ) : (
              <p className="text-[22px] sm:text-[26px] font-medium text-[#604E00]">{formData.email}</p>
            )}
          </div>

          <div>
            <p className="text-2xl sm:text-3xl text-[#9B8F36] font-medium mb-[10px] sm:mb-5">Phone Number</p>
            {isEditing ? (
              <PhoneInput
                country={'us'} // default country
                value={formData.phone}
                onChange={(phone) => setFormData(prev => ({ ...prev, phone }))}
                inputStyle={{
                  width: '100%',
                  fontSize: '22px',
                  fontWeight: '500',
                  backgroundColor: '#fffbed',
                  border: '1px solid #9B8F36',
                  borderRadius: '6px',
                  padding: '8px 12px',
                  color: '#604E00',
                }}
                buttonStyle={{
                  backgroundColor: '#fffbed',
                  borderRight: '1px solid #9B8F36',
                }}
                dropdownStyle={{ backgroundColor: '#fffbed' }}
              />
            ) : (
              <p className="text-[22px] sm:text-[26px] font-medium text-[#604E00]">
                {formData.phone}
              </p>
            )}
          </div>
        </div>

       
        {isEditing && (
          <div className="flex justify-start gap-4 mt-10">
             <div
              onClick={handleSave}
              className="px-6 py-2 text-lg font-semibold text-[#786A08] bg-gradient-to-b from-[#FFE074] to-[#E3B512] rounded cursor-pointer"
            >
              Save
            </div>
            <div
              onClick={handleCancel}
              className="px-6 py-2 text-lg font-semibold text-[#786A08] bg-gradient-to-b from-[#FFE074] to-[#E3B512] rounded cursor-pointer"
            >
              Cancel
            </div>
           
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
