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

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form Submitted:', formData);
    setSubmitted(true);
    // TODO: Send data to API
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-black text-white px-4">
      {submitted ? (
        <div className="text-center animate-fadeInUp">
          <h1 className="text-4xl font-bold mb-4">🎉 Thank you!</h1>
          <p className="text-lg">Your information has been successfully submitted.</p>
        </div>
      ) : (
        <div className="w-full max-w-4xl">
          <div className="mb-6 text-center animate-fadeInUp">
            <h1 className="text-3xl font-semibold text-white">
              You're almost there, we just need a few details from you
            </h1>
          </div>

          <form
            onSubmit={handleSubmit}
            className="w-full bg-neutral-900 p-10 rounded-2xl shadow-2xl"
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

            <button
              type="submit"
              className="mt-6 w-full bg-green-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-green-700 transition"
            >
              Submit
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
