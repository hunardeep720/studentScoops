import React from 'react';
import { FaUsers, FaShoppingCart, FaChartLine } from 'react-icons/fa';

const Card = ({ title, value, icon, change, changeType , text}) => {
  const iconClasses = "w-10 h-10 ml-4";
  const changeClasses2 = changeType === 'increase' ? 'bg-green-500' : 'bg-red-500';

  return (
    <div className="flex flex-col bg-white rounded-lg shadow p-4 m-2">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-medium">{title}</h3>
        <span className={` ml-2 text-sm text-white ${changeClasses2} rounded-lg py-1 px-1 `}>
          {changeType === 'increase' ? '↑' : '↓'} {change}%
        </span>
      </div>
      <div className="flex justify-between items-center mt-2 ">
        <h2 className="text-2xl font-bold">{value}</h2>
        <div className={iconClasses}>{icon}</div>
      </div>
      <div>
        <span className="text-sm text-gray-500 flex mt-2">{text}</span>
      </div>
    </div>
  );
};

export default Card;
