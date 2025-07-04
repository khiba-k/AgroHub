import { Label } from '@/components/ui/label'
import imageCompression from 'browser-image-compression'
import { Upload } from 'lucide-react'
import React, { ChangeEvent, useState } from 'react'

const ProduceFormListingUpload = ({
  files,
  setFiles,
  previewUrls,
  setPreviewUrls
}: {
  files: File[]
  setFiles: React.Dispatch<React.SetStateAction<File[]>>
  previewUrls: string[]
  setPreviewUrls: React.Dispatch<React.SetStateAction<string[]>>
}) => {
  const imageInputRef = React.useRef<HTMLInputElement>(null)

  const [isPending, setIsPending] = useState(false)

  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);

      const remainingSlots = 5 - files.length;
      const filesToAdd = filesArray.slice(0, remainingSlots);

      const compressedFiles: File[] = [];

      for (const file of filesToAdd) {
        console.log("Uploading file:", file, "type:", typeof file, "instanceof File?", file instanceof File);
        try {
          const compressed = await imageCompression(file, {
            maxSizeMB: 1,
          });
          compressedFiles.push(compressed);
        } catch (err) {
          console.error("Image compression failed:", err);
          // fallback: add original if compression fails
          compressedFiles.push(file);
        }
      }

      const newPreviews = compressedFiles.map((file) =>
        URL.createObjectURL(file)
      );

      setFiles((prev) => [...prev, ...compressedFiles]);
      setPreviewUrls((prev) => [...prev, ...newPreviews]);
    }
  };
  const removeImage = (indexToRemove: number) => {
    URL.revokeObjectURL(previewUrls[indexToRemove])
    setFiles(files.filter((_, i) => i !== indexToRemove))
    setPreviewUrls(previewUrls.filter((_, i) => i !== indexToRemove))
  }

  return (
    <>
      <div>
        {previewUrls.length > 0 ? (
          <div className="space-y-4">
            <Label>Images ({previewUrls.length})</Label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {previewUrls.map((url, index) => (
                <div key={url} className="relative overflow-hidden rounded-lg">
                  <img
                    src={url}
                    width={200}
                    height={200}
                    alt={`img-${index}`}
                    className="w-full h-48 object-cover"
                  />

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

            {previewUrls.length < 5 && (
              <div
                className="relative border-2 border-dashed border-gray-600 rounded-md h-32 cursor-pointer overflow-hidden"
                onClick={() => imageInputRef.current?.click()}
              >
                <div className="absolute inset-0 bg-black bg-opacity-70 flex flex-col items-center justify-center text-white">
                  <Upload className="h-8 w-8 mb-2" />
                  <p className="text-sm">Add more images ({previewUrls.length}/5)</p>
                </div>
              </div>
            )}

            {previewUrls.length >= 5 && (
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