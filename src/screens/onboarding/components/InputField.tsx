import React from 'react';
import { IconType } from 'react-icons';

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
  icon?: IconType;
  subtext?: string; // Add this prop
}

export const InputField: React.FC<InputFieldProps> = ({ label, name, icon: Icon, subtext, ...rest }) => {
  return (
    <div className="flex flex-col mb-4">
      <label htmlFor={name} className="mb-1 font-medium text-white">{label}</label>

      {/* Subtext goes directly under the label */}
      {subtext && <span className="text-sm text-gray-400 mb-1">{subtext}</span>}

      <div className="relative">
        {Icon && <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />}
        <input
  id={name}
  name={name}
  className={`w-full p-3 rounded-md border border-gray-700 bg-[#1c1c1c] text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white hover:ring-white ${Icon ? 'pl-10' : ''}`}
  {...rest}
/>

       
      </div>
    </div>
  );
};
