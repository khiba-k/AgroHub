'use client';
import React, { useState, useEffect } from 'react';
import { Phone, UserCog } from 'lucide-react';

export const ConsumerOnboardingForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    role: '',
  });

  const [submitted, setSubmitted] = useState(false);

  // Ensure body background is black
  useEffect(() => {
    document.body.classList.add('bg-black');
    return () => {
      document.body.classList.remove('bg-black');
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitted Data:', formData);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="w-screen h-screen flex items-center justify-center bg-black text-white">
        <h1 className="text-2xl font-bold">Thanks! You've submitted the form.</h1>
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
        className="bg-black border border-white/10 p-8 rounded-lg shadow-xl w-full max-w-2xl"
      >
        <h2 className="text-2xl font-semibold mb-6">Register as a Buyer</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block mb-1 font-medium text-white">First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="Enter first name"
              className="w-full px-4 py-2 bg-black border border-white/20 text-white rounded focus:outline-none focus:ring-2 focus:ring-white"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-white">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Enter last name"
              className="w-full px-4 py-2 bg-black border border-white/20 text-white rounded focus:outline-none focus:ring-2 focus:ring-white"
              required
            />
          </div>
        </div>

        <div className="mb-4">
  <label className="block mb-1 font-medium text-white">Phone Number</label>
  <div className="relative">
    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-white w-4 h-4" />
    <input
      type="tel"
      name="phone"
      value={formData.phone}
      onChange={handleChange}
      placeholder="e.g. 712345678"
      className="w-full pl-10 pr-4 py-2 bg-black border border-white/20 text-white rounded focus:outline-none focus:ring-2 focus:ring-white"
      required
    />
  </div>
</div> 

<div className="mb-6">
  <label className="block mb-1 font-medium text-white">Role</label>
  <div className="relative">
    <UserCog className="absolute left-3 top-1/2 -translate-y-1/2 text-white w-4 h-4" />
    <select
      name="role"
      value={formData.role}
      onChange={handleChange}
      className="w-full pl-10 pr-4 py-2 bg-black border border-white/20 text-white rounded focus:outline-none focus:ring-2 focus:ring-white"
      required
    >
      <option value="" disabled>Select a role</option>
      <option value="consumer">Consumer</option>
      <option value="offtaker">Offtaker</option>
      <option value="retailer">Retailer</option>
      <option value="restaurant">Restaurant</option>
    </select>
        </div>
    </div>

        <button
          type="submit"
          className="w-full py-3 bg-white text-black font-bold rounded hover:bg-gray-200 transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
};
