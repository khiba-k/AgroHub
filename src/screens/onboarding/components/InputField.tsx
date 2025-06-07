import { ComponentPlaceholderIcon } from '@radix-ui/react-icons';
import React from 'react';

interface InputFieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  required?: boolean;
  placeholder?: string;
}

export const InputField: React.FC<InputFieldProps> = ({
  label, name, value, onChange, type = 'text', required = false, placeholder
}) => (
  <div className="mb-4">
    <label className="block text-sm font-medium mb-1" htmlFor={name}>{label}</label>
    <input
      id={name}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      required={required}
      className="w-full border p-2 rounded"
      placeholder= {placeholder} 
    />
  </div>
);
