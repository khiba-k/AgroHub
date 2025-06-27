import { Label } from '@/components/ui/label'
import { Upload } from 'lucide-react'
import React, { ChangeEvent, useState } from 'react'

const ProduceFormListingUpload = () => {
  const imageInputRef = React.useRef<HTMLInputElement>(null)
  const [imageUrls, setImageUrls] = useState<string[]>([])
  const [isPending, setIsPending] = useState(false)
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => { 
    if (e.target.files) {
      const filesArray = Array.from(e.target.files)
      const newImageUrls = filesArray.map((file) => URL.createObjectURL(file))
      setImageUrls([...imageUrls, ...newImageUrls]) 
    }
  };

  return (
    <>
    <div>
      { imageUrls.length > 0 ? (
        <div>
          {imageUrls.map((url, index) => (
            <img
              key={url}
              src={url}
              width={300}
              height={300}
              alt={`img-${index}`}
            />
          ))}
        </div>
      ) : (
        <div>
          <Label>
            Images
          </Label>
              <div className="border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center">
                <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground mb-1">
                  Drag & drop images here or click to browse
                  </p>
                    <p className="text-xs text-muted-foreground">
                    PNG, JPG or WEBP, up to 5 images (max 5MB each)
                      </p>
                    </div>
      </div>
      )}
    </div>
      
    <input
      type="file"
      hidden
      multiple
      ref={imageInputRef}
      onChange={handleImageChange}
      disabled={isPending} />
      <button
        className="bg-white border border-gray-600 py-2 w-40 rounded-lg"
        onClick={() => imageInputRef.current?.click()}
        disabled={isPending}
      >
        Upload Button
      </button>

      </>

  )
}

export default ProduceFormListingUpload
