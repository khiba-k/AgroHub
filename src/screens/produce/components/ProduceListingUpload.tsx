import { Label } from '@/components/ui/label'
import { Upload } from 'lucide-react'
import React, { ChangeEvent, useState } from 'react'

const ProduceFormListingUpload = (
  {imageUrls, setImageUrls}: {
  imageUrls: string[]
  setImageUrls: React.Dispatch<React.SetStateAction<string[]>>
} 
) => {
  const imageInputRef = React.useRef<HTMLInputElement>(null)
  
  const [isPending, setIsPending] = useState(false)

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files)
      // Limit to 5 images total
      const remainingSlots = 5 - imageUrls.length
      const filesToAdd = filesArray.slice(0, remainingSlots)
      const newImageUrls = filesToAdd.map((file) => URL.createObjectURL(file))
      setImageUrls([...imageUrls, ...newImageUrls])
    }
  }

  const removeImage = (indexToRemove: number) => {
    // Clean up the object URL to prevent memory leaks
    URL.revokeObjectURL(imageUrls[indexToRemove])
    // Remove the image from the array
    setImageUrls(imageUrls.filter((_, index) => index !== indexToRemove))
  }

  return (
    <>
      <div>
        {imageUrls.length > 0 ? (
          <div className="space-y-4">
            <Label>Images ({imageUrls.length})</Label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {imageUrls.map((url, index) => (
                <div key={url} className="relative overflow-hidden rounded-lg">
                  <img
                    src={url}
                    width={200}
                    height={200}
                    alt={`img-${index}`}
                    className="w-full h-48 object-cover"
                  />
                  
                  {/* Dashed border overlay covering the uploaded image */}
                  <div className="absolute inset-0 border-2 border-dashed border-gray-400 bg-white bg-opacity-20 flex items-center justify-center">
                    <button
                      onClick={() => removeImage(index)}
                      className="bg-red-500 text-white rounded-full w-10 h-10 flex items-center justify-center text-xl font-bold hover:bg-red-600 transition-colors shadow-lg"
                      title="Remove image"
                    >
                      ×
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Add more images with overlay - only show if less than 5 images */}
            {imageUrls.length < 5 && (
              <div 
                className="relative border-2 border-dashed border-gray-600 rounded-md h-32 cursor-pointer overflow-hidden"
                onClick={() => imageInputRef.current?.click()}
              >
                {/* Dark semi-transparent overlay covering */}
                <div className="absolute inset-0 bg-black bg-opacity-70 flex flex-col items-center justify-center text-white">
                  <Upload className="h-8 w-8 mb-2" />
                  <p className="text-sm">Add more images ({imageUrls.length}/5)</p>
                </div>
              </div>
            )}
            
            {/* Show message when limit reached */}
            {imageUrls.length >= 5 && (
              <div className="text-center p-4 bg-green-50 border border-green-200 rounded-md">
                <p className="text-green-700 font-medium">✓ Maximum images uploaded (5/5)</p>
                <p className="text-green-600 text-sm">You can still remove and replace images if needed</p>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-2">
            <Label>Images</Label>
            <div 
              className="relative border-2 border-dashed border-gray-600 rounded-md h-48 cursor-pointer overflow-hidden"
              onClick={() => imageInputRef.current?.click()}
            >
              {/* Dark semi-transparent overlay covering the entire upload area */}
              <div className="absolute inset-0 bg-black bg-opacity-70 flex flex-col items-center justify-center text-white">
                <Upload className="h-12 w-12 mb-4" />
                <p className="text-lg mb-2 text-center px-4">
                  Drag & drop images here or click to browse
                </p>
                <p className="text-sm opacity-80 text-center px-4">
                  PNG, JPG or WEBP, up to 5 images (max 5MB each)
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      <input
        type="file"
        hidden
        multiple
        accept="image/*"
        ref={imageInputRef}
        onChange={handleImageChange}
        disabled={isPending}
      />
    </>
  )
}

export default ProduceFormListingUpload