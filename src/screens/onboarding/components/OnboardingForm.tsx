'use client';
import React, { useState } from 'react';
import { InputField } from './InputField';
import { SelectField } from './SelectField';

export const OnboardingForm: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    farmName: '',
    farmSize: '',
    cropType: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form Submitted:', formData);
    // TODO: Send data to API
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-6 bg-black rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Farmer Onboarding</h2>
      <InputField label="Full Name" name="fullName" value={formData.fullName} onChange={handleChange} required />
      <InputField label="Email" name="email" value={formData.email} onChange={handleChange} type="email" required />
      <InputField label="Phone Number" name="phone" value={formData.phone} onChange={handleChange} type="tel" required />
      <InputField label="Farm Name" name="farmName" value={formData.farmName} onChange={handleChange} required />
      <InputField label="Farm Size (in acres)" name="farmSize" value={formData.farmSize} onChange={handleChange} type="number" required />
      <SelectField
        label="Services"
        name="cropType"
        value={formData.cropType}
        onChange={handleChange}
        options={['Poultry Farming', 'Crop Farming', 'Rice', 'Vegetables', 'Fruits']}
        required
      />
      <button type="submit" className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
        Submit
      </button>
    </form>
  );
};
