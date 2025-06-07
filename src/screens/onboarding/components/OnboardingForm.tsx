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
    district: '',
    country: '',
    description: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    console.log('Form Submitted:', formData);
    // TODO: Send data to API
  };

  if (submitted) {
    return (
      <div className="w-screen h-screen flex items-center justify-center bg-black text-white">
        <h2 className="text-3xl font-bold animate-fadeInUp">Thank you! Your information has been submitted.</h2>
      </div>
    );
  }

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center bg-black text-white px-4 overflow-auto">
      <div className="mb-6 text-center animate-fadeInUp">
        <h1 className="text-3xl font-semibold">You're almost there, we just need a few details from you</h1>
      </div>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-4xl p-10 bg-neutral-900 rounded-2xl shadow-2xl"
      >
        <h2 className="text-2xl font-bold mb-6">Farmer Onboarding</h2>

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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField label="District" name="district" value={formData.district} onChange={handleChange} placeholder=" Maseru" required />
          <InputField label="Country" name="country" value={formData.country} onChange={handleChange} placeholder=" Lesotho" required />
        </div>

        <div className="flex flex-col mt-4">
          <label htmlFor="description" className="mb-1 font-medium text-white">Farming Description (max 180 chars)</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            maxLength={180}
            rows={4}
            placeholder="Briefly describe your farming activities..."
            className="p-3 border border-gray-600 bg-black text-white rounded-md"
            required
          />
          <div className="text-sm text-right text-gray-400 mt-1">
            {formData.description.length}/180
          </div>
        </div>

        <button
          type="submit"
          className="mt-6 w-full bg-green-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-green-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
};
