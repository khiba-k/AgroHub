// File: ProduceStepTwo.tsx

import ProduceFormListingUpload from "./ProduceListingUpload";

export function ProduceStepTwo({
  description,
  setDescription,
  files,
  setFiles,
  previewUrls,
  setPreviewUrls,
  isActiveListing,
  showImageWarning,
}: any) {
  return (
    <div className="space-y-6">
      <div>
        <label htmlFor="description" className="block font-medium mb-1">
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border border-gray-300 rounded-md p-2"
          rows={5}
        />
      </div>

      {showImageWarning && (
        <div className="text-red-600">
          Please upload at least one image for your listing.
        </div>)}
      <ProduceFormListingUpload
        files={files}
        setFiles={setFiles}
        previewUrls={previewUrls}
        setPreviewUrls={setPreviewUrls}
      />
    </div>
  );
}