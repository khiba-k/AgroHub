'use client';
import React, { useState } from 'react';
import { InputField } from './InputField';
import { SelectField } from './SelectField';
import { FaMapMarkerAlt, FaPhoneAlt } from 'react-icons/fa'; // Icons for location and phone


export const OnboardingForm: React.FC = () => {
  const [formData, setFormData] = useState({
    phone: '',
    phone2:'',
    farmName: '',
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
      <h1 className="text-3xl font-semibold text-white mb-2">You're almost there</h1>
      <p className="text-gray-400 mb-6">We just need a few details from you</p>

      </div>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl p-8 bg-black text-white border border-white/10 rounded-xl shadow-lg"
      >
        <h2 className="text-2xl font-bold mb-6">Farmer Onboarding</h2>

        <h6 className="text-2xl mb-6">Farm Details</h6>
        <div className= "grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputField label="Farm Name" name="farmName" value={formData.farmName} onChange={handleChange} required /><SelectField
          label="Services"
          name="cropType"
          value={formData.cropType}
          onChange={handleChange}
          options={['Poultry Farming', 'Crop Farming', 'Rice', 'Vegetables', 'Fruits']}
          required
        />
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
           
        <h6 className="text-2xl mb-6">Location</h6>
<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  <InputField
    label="District"
    name="district"
    value={formData.district}
    onChange={handleChange}
    placeholder="Maseru"
    required
    icon={FaMapMarkerAlt}
  />
  <InputField
    label="Country"
    name="country"
    value={formData.country}
    onChange={handleChange}
    placeholder="Lesotho"
    required
    icon={FaMapMarkerAlt}
  />
</div>

<h6 className="text-2xl mb-6">Contact Details</h6>
<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
  <InputField
    label="Phone Number 1"
    name="phone"
    value={formData.phone}
    onChange={handleChange}
    type="tel"
    required
    icon={FaPhoneAlt}
  />
  <InputField
    label="Phone Number 2 (optional)"
    name="phone2"
    value={formData.phone2}
    onChange={handleChange}
    type="tel"
    icon={FaPhoneAlt}
  />
</div>

<button
  type="submit"
  className="mt-6 w-full bg-white text-black font-semibold py-3 px-6 rounded-md hover:bg-gray-300 transition"
>
  Submit
</button>
      </form>
    </div>
  );
};
