"use client"

import React, { useState } from 'react'
// Make sure this import path is correct based on your tsconfig.json setup
import { Farmer, Produce } from "../../utils/types" // Using the alias you set up for root-level utils
import { Card, CardContent } from '@/components/ui/card'
import {
  Dialog,
  DialogTrigger,
  DialogContent
} from "@/components/ui/dialog"

// Import ChevronLeft and ChevronRight icons for navigation
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface AgroHubProductCardProps {
  produceItem: Produce;
  farmer: Farmer;
}

const AgroHubProductCard: React.FC<AgroHubProductCardProps> = ({ produceItem, farmer }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0); // State for current image

  if (!produceItem || !farmer) {
    return null;
  }

  const images = produceItem.images || []; // Ensure images is an array, default to empty
  const hasMultipleImages = images.length > 1;

  // Functions to navigate images
  const goToPreviousImage = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent dialog from opening when clicking arrows
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToNextImage = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent dialog from opening when clicking arrows
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <Card
          key={produceItem.id}
          className="border-gray-200 hover:border-black transition-all duration-300 cursor-pointer transform hover:scale-105 hover:shadow-xl"
        >
          <CardContent className="p-0">
            <div className="relative"> {/* Parent for absolute positioning, including slider controls */}
              <DialogTrigger asChild>
                {/* Image display - uses currentImageIndex */}
                <img
                  src={images.length > 0 ? images[currentImageIndex] : "/fallback.jpg"}
                  alt={produceItem.name || "Produce Image"}
                  className="w-full h-48 object-cover rounded-t-lg cursor-pointer"
                />
              </DialogTrigger>

              {/* Category tag - Positioned absolutely on the image */}
              <span className={`absolute top-2 left-2  text-white text-s font-semibold px-2 py-1 rounded-full capitalize`}>
                {produceItem.category}
              </span>

              {/* Navigation buttons for slider (only if multiple images) */}
              {hasMultipleImages && (
                <>
                  <button
                    onClick={goToPreviousImage}
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-1 rounded-full hover:bg-opacity-75 focus:outline-none"
                    aria-label="Previous image"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    onClick={goToNextImage}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-1 rounded-full hover:bg-opacity-75 focus:outline-none"
                    aria-label="Next image"
                  >
                    <ChevronRight size={20} />
                  </button>
                </>
              )}

              {/* Optional: Image indicator dots (only if multiple images) */}
              {hasMultipleImages && (
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-1">
                  {images.map((_, index) => (
                    <span
                      key={index}
                      className={`block w-2 h-2 rounded-full ${
                        index === currentImageIndex ? 'bg-white' : 'bg-gray-400'
                      }`}
                    ></span>
                  ))}
                </div>
              )}
            </div>

            <div className="p-4">
              <h3 className="text-xl font-bold mb-2">{produceItem.name}</h3>
              <div className="space-y-1 text-sm">
                <p><span className="font-medium">Farmer:</span> {farmer.name}</p>
                <p><span className="font-medium">Location:</span> {farmer.location}</p>
                <p className="text-gray-600 bg-gray-100 px-3 py-1 rounded-md">
                  <span className="font-medium">Quantity Available:</span> {produceItem.quantityAvailable}kg
                </p>
                {/* Price display removed */}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Enlarged Image Modal - show current image in modal */}
        <DialogContent className="max-w-3xl p-0 bg-transparent border-none shadow-none">
          <img
            src={images.length > 0 ? images[currentImageIndex] : "/fallback.jpg"} // Display current image in modal
            alt={produceItem.name || "Full Size Produce"}
            className="w-full h-auto rounded-lg"
          />
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default AgroHubProductCard;