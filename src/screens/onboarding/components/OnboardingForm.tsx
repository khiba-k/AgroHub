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
    console.log('Form Submitted:', formData);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="w-screen h-screen flex items-center justify-center bg-black text-white">
        <h2 className="text-3xl font-semibold animate-fadeInUp">
          🎉 Thank you for registering! We’ll be in touch soon.
        </h2>
      </div>
    );
  }

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center bg-black text-white px-4">
      <div className="mb-6 text-center animate-fadeInUp">
        <h1 className="text-3xl font-semibold">You're almost there, we just need a few details from you</h1>
      </div>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-4xl p-10 bg-black-900 rounded-2xl shadow-2xl overflow-auto"
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
        <InputField label="District" name="district" value={formData.district} onChange={handleChange} placeholder="e.g., Maseru" required />
        <InputField label="Country" name="country" value={formData.country} onChange={handleChange} placeholder="e.g., Lesotho" required />

        <div className="flex flex-col mb-4">
          <label htmlFor="description" className="mb-1 font-medium">Farming Description</label>
          <textarea
            id="description"
            name="description"
            rows={4}
            value={formData.description}
            onChange={handleChange}
            placeholder="Tell us a bit about your farming practices..."
            className="p-2 border border-gray-300 rounded-md text-black"
            required
          />
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
