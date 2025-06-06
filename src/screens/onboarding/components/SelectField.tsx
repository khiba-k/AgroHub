import React from 'react';

interface SelectFieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: string[];
  required?: boolean;
}

export const SelectField: React.FC<SelectFieldProps> = ({
  label, name, value, onChange, options, required = false
}) => (
  <div className="mb-4">
    <label className="block text-sm font-medium mb-1" htmlFor={name}>{label}</label>
    <select
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      className="w-full border p-2 rounded"
    >
      <option value="">Select an option</option>
      {options.map(opt => (
        <option key={opt} value={opt}>{opt}</option>
      ))}
    </select>
  </div>
);
