"use client";

import React from "react";
import FarmerProfileDetails from "./FarmerProfileDetails";
import FarmerPaymentDetails from "./FarmerPaymentDetails";

const FarmerProfileForm = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-10 bg-white dark:bg-black text-black dark:text-white rounded shadow">
      <FarmerProfileDetails />
      <FarmerPaymentDetails />
    </div>
  );
};

export default FarmerProfileForm;
