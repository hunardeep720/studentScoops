import React from 'react';
import Link from 'next/link';
import { AiOutlineHome, AiOutlineTeam, AiOutlineShop, AiOutlineSetting } from 'react-icons/ai';
import { FiMenu } from "react-icons/fi";

export const SaitStaffNav = ({ isCollapsed, setIsCollapsed, onTabClick }) => { // Pass onTabClick as a prop

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  // Define an array of tab objects for clarity (optional)
  const tabs = [
    { name: 'home', icon: <AiOutlineHome className="h-6 w-6 min-w-6" /> },
    { name: 'student', icon: <AiOutlineTeam className="h-6 w-6 min-w-6" /> },
    { name: 'restaurant', icon: <AiOutlineShop className="h-6 w-6 min-w-6" /> },
    { name: 'setting', icon: <AiOutlineSetting className="h-6 w-6 min-w-6" /> },
  ];

  const handleClick = (tabName) => {
    onTabClick(tabName); // Call the passed-in onTabClick function with the clicked tab name
  };

  return (
    <nav className={`bg-primary text-black-600 h-full fixed p-6 ${isCollapsed ? 'w-21' : 'w-65'} transition-width duration-300 ease-in-out z-10`}>
      <div className="mb-6 flex justify-between items-center">
        <Link href="#" className={`flex items-center gap-2 text-lg font-semibold ${isCollapsed ? 'hidden' : 'block'}`} prefetch={false}>
          <span>Student Scoops</span>
        </Link>
        <button className="flex items-center gap-2 hover:bg-gray-300 rounded-md p-2 ml-1" onClick={toggleSidebar}>
          <FiMenu className="h-6 w-6 min-w-6" />
        </button>
      </div>
      <div className="space-y-4">
        {tabs.map((tab) => ( // Use map to iterate through tabs array
          <button
            key={tab.name} // Add a key for each button
            className="flex items-center gap-2 hover:bg-gray-300 rounded-md px-3 py-2"
            onClick={() => handleClick(tab.name)} // Call handleClick with tab name
          >
            {tab.icon}
            <span className={`${isCollapsed ? 'hidden' : 'block'}`}>{tab.name}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};

export default SaitStaffNav;
