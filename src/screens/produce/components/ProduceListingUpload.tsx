import React, { ChangeEvent, useState } from 'react';
import imageCompression from 'browser-image-compression';
import { Upload } from 'lucide-react';

interface Props {
  files: File[];
  setFiles: React.Dispatch<React.SetStateAction<File[]>>;
  previewUrls: string[];
  setPreviewUrls: React.Dispatch<React.SetStateAction<string[]>>;
  existingImages: { id: string; url: string }[];
  setExistingImages: React.Dispatch<React.SetStateAction<{ id: string; url: string }[]>>;
  removeImageIds: string[]; // ✅ matches hook!
  setRemoveImageIds: React.Dispatch<React.SetStateAction<string[]>>; // ✅ matches hook!
}

const ProduceListingUpload = ({
  files,
  setFiles,
  previewUrls,
  setPreviewUrls,
  existingImages,
  setExistingImages,
  removeImageIds,
  setRemoveImageIds,
}: Props) => {
  const imageInputRef = React.useRef<HTMLInputElement>(null);
  const [isPending, setIsPending] = useState(false);

  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);

      const remainingSlots = 5 - (existingImages.length + files.length);
      if (remainingSlots <= 0) return; // Defensive guard

      const filesToAdd = filesArray.slice(0, remainingSlots);

      const compressedFiles: File[] = [];

      for (const file of filesToAdd) {
        try {
          const compressed = await imageCompression(file, {
            maxSizeMB: 1,
          });
          compressedFiles.push(compressed);
        } catch (err) {
          console.error("Image compression failed:", err);
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
    const totalExisting = existingImages.length;
    const isExisting = indexToRemove < totalExisting;

    if (isExisting) {
      const removed = existingImages[indexToRemove];
      setExistingImages(existingImages.filter((_, i) => i !== indexToRemove));
      setRemoveImageIds((prev) => [...prev, removed.id]);
    } else {
      const previewIndex = indexToRemove - totalExisting;
      URL.revokeObjectURL(previewUrls[previewIndex]);
      setFiles(files.filter((_, i) => i !== previewIndex));
      setPreviewUrls(previewUrls.filter((_, i) => i !== previewIndex));
    }
  };

  const allImages = [...existingImages.map(img => img.url), ...previewUrls];

  return (
    <>
      <div>
        {allImages.length > 0 ? (
          <div className="space-y-4">
            <label>Images ({allImages.length})</label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {allImages.map((url, index) => (
                <div key={`${url}-${index}`} className="relative overflow-hidden rounded-lg">
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

            {allImages.length < 5 && (
              <div
                className="relative border-2 border-dashed border-gray-600 rounded-md h-32 cursor-pointer overflow-hidden"
                onClick={() => imageInputRef.current?.click()}
              >
                <div className="absolute inset-0 bg-black bg-opacity-70 flex flex-col items-center justify-center text-white">
                  <Upload className="h-8 w-8 mb-2" />
                  <p className="text-sm">
                    Add more images ({allImages.length}/5)
                  </p>
                </div>
              </div>
            )}

            {allImages.length >= 5 && (
              <div className="text-center p-4 bg-green-50 border border-green-200 rounded-md">
                <p className="text-green-700 font-medium">
                  ✓ Maximum images uploaded (5/5)
                </p>
                <p className="text-green-600 text-sm">
                  You can still remove and replace images if needed
                </p>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-2">
            <label>Images</label>
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
  );
};

export default ProduceListingUpload;
