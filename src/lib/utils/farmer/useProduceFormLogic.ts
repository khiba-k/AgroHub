import { useState, useEffect } from "react";
import { useFarmStore } from "@/lib/store/userStores";
import { fetchProduce } from "@/screens/agrohub/utils/produceRequests";
import {
  createProduceListingSchema,
  updateProduceListingSchema,
} from "@/lib/utils/farmer/FarmListingUtils";
import {
  postProduceListing,
  updateProduceListing,
} from "@/lib/requests/produceListingsRequests";
import { toast } from "@/components/ui/use-toast";
import { useProduceStore } from "@/lib/store/useProductStore";
import { Listing, useProduceListingStore } from "@/lib/store/useProduceListingStore";
import { toaster } from "@/components/ui/toaster";
import { useToastStore } from "@/lib/store/useToastStore";
import { stat } from "fs/promises";


export function useProduceFormLogic(
  initialData: any,
  onClose?: () => void,
  harvestIdToDelete: string | null = null,
  setHarvestIdToDelete: (id: string | null) => void = () => { },
  options?: { step?: number; setStep?: (step: number) => void }
) {

  const { showToast } = useToastStore();
  const farmId = useFarmStore((state) => state.farmId);
  const { produceMap, getSuggestions, setProduceMap, resetProduce } =
    useProduceStore();

  const { updateListing, addListing } = useProduceListingStore();

  const isActiveListing = initialData?.status === "active";
  const isUpdate = !!initialData?.id;

  const [internalStep, setInternalStep] = useState(options?.step || 1);
  const step = options?.step || internalStep;
  const setStep = options?.setStep || setInternalStep;

  const [category, setCategory] = useState(
    initialData?.produce?.category || initialData?.category || ""
  );
  const [produceName, setProduceName] = useState(
    initialData?.produce?.name || initialData?.name || ""
  );
  const [produceType, setProduceType] = useState(
    initialData?.produce?.type || initialData?.type || ""
  );
  const [quantity, setQuantity] = useState(
    initialData?.quantity ? String(initialData.quantity) : ""
  );
  const [unit, setUnit] = useState(
    initialData?.produce?.unitType || initialData?.unit || "kg"
  );
  const [location, setLocation] = useState(initialData?.location || "");
  const [description, setDescription] = useState(
    initialData?.description || ""
  );
  const [status, setStatus] = useState(initialData?.status || "draft");
  const [harvestDate, setHarvestDate] = useState<Date | undefined>(
    initialData?.harvestDate ? new Date(initialData.harvestDate) : undefined
  );
  const [showHarvestDialog, setShowHarvestDialog] = useState(false);

  // ✅ For edit mode: full objects with IDs
  const [existingImages, setExistingImages] = useState<{ id: string; url: string }[]>(
    initialData?.images || []
  );

  // ✅ You don’t need the old 'existingImageUrls' array anymore
  // Use existingImages for both id + url

  const [files, setFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [showImageWarning, setShowImageWarning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  function normalizeListing(raw: any): Listing {
    const hasHarvest = raw.harvestListings && raw.harvestListings.length > 0;

    return {
      id: raw.id,
      location: raw.location,
      description: raw.description,
      quantity: raw.quantity,
      status:
        raw.activeDraftListing?.status ||
        (hasHarvest ? "harvest" : undefined) ||
        raw.status ||
        "draft",
      harvestDate: hasHarvest ? raw.harvestListings[0].harvestDate : raw.harvestDate ?? undefined,
      soldDate: raw.soldDate ?? undefined,
      soldPrice: raw.soldPrice ?? undefined,
      soldQuantity: raw.soldQuantity ?? undefined,
      produce: raw.produce
        ? {
          id: raw.produce.id,
          name: raw.produce.name,
          category: raw.produce.category,
          type: raw.produce.type ?? null,
          unitType: raw.produce.unitType,
          pricePerUnit: raw.produce.pricePerUnit || "0",
        }
        : {
          id: "",
          name: "",
          category: "",
          type: null,
          unitType: "",
          pricePerUnit: "0",
        },
      images: Array.isArray(raw.images)
        ? raw.images.map((img: any) => ({
          id: img.id,
          url: img.url,
        }))
        : [],
    };
  }

  // ✅ Track which IDs the user wants removed
  const [removeImageIds, setRemoveImageIds] = useState<string[]>([]);

  const [editHarvestDate, setEditHarvestDate] = useState(false);

  useEffect(() => {
    const loadProduce = async () => {
      resetProduce();
      const produceData = await fetchProduce();
      const map: Record<string, Record<string, Record<string, any>>> = {};
      produceData.forEach((item: any) => {
        const cat = capitalize(item.category);
        const name = capitalize(item.name);
        const type = capitalize(item.type);

        if (!map[cat]) map[cat] = {};
        if (!map[cat][name]) map[cat][name] = {};

        map[cat][name][type] = item;
      });
      setProduceMap(map);
    };
    loadProduce();
  }, [resetProduce, setProduceMap]);

  useEffect(() => {
  }, [removeImageIds]);

  const categorySuggestions = getSuggestions();
  const nameSuggestions = category ? getSuggestions(category) : [];
  const typeSuggestions =
    category && produceName ? getSuggestions(category, produceName) : [];

  useEffect(() => {
    if (!initialData && !isActiveListing && !nameSuggestions.includes(produceName)) {
      setProduceName("");
      setProduceType("");
    }
  }, [category, nameSuggestions, produceName, initialData, isActiveListing]);

  useEffect(() => {
    if (!initialData && !isActiveListing && !typeSuggestions.includes(produceType)) {
      setProduceType("");
    }
  }, [produceName, typeSuggestions, produceType, initialData, isActiveListing]);

  const capitalize = (str: string | null | undefined) =>
    (str ?? "")
      .toLowerCase()
      .split(" ")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");

  const getProduceId = () => {
    if (!category || !produceName) return undefined; // only these are truly required

    const cat = capitalize(category);
    const name = capitalize(produceName);
    const type = produceType !== undefined ? capitalize(produceType) : "";

    return produceMap?.[cat]?.[name]?.[type]?.id;
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e?.preventDefault) {
      e.preventDefault();
    }

    if (!isUpdate && files.length === 0 && existingImages.length === 0 && status === "active") {
      setShowImageWarning(true);
      return;
    }

    setShowImageWarning(false);

    if (status === "harvest") {
      if ((isUpdate && editHarvestDate) || !harvestDate) {
        setShowHarvestDialog(true);
        setEditHarvestDate(false);
        return;
      }
    }

    setIsSubmitting(true);

    try {
      if (isUpdate) {
        const payload = {
          id: initialData.id,
          location,
          description,
          quantity: quantity ? Number(quantity) : undefined,
          produceId: getProduceId(),
          farmId,
          status,
          harvestDate: harvestDate ? harvestDate.toISOString() : undefined,
          keepImages: existingImages.map(img => img.url),
          removeImageIds: removeImageIds,
        };
        updateProduceListingSchema.parse(payload);

        const formData = new FormData();
        formData.append("payload", JSON.stringify(payload));

        files.forEach((file) => formData.append("images", file));

        const updatedListing = await updateProduceListing(formData);

        if (harvestIdToDelete) {
          // If we have a harvest to delete, call the delete API
          try {
            await fetch(`/api/produce/farmer/update/listing/delete`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ id: harvestIdToDelete }),
            });
            setHarvestIdToDelete(null);
          } catch (err) {
            console.error("Failed to delete harvest:", err);
            return null;
          }
        }

        const normalized = normalizeListing(updatedListing.data);

        updateListing(normalized);
        showToast(true, "Listing updated successfully!")

      } else {
        const payload = {
          location,
          description,
          quantity: Number(quantity),
          produceId: getProduceId(),
          farmId: farmId,
          status,
          harvestDate: harvestDate ? harvestDate.toISOString() : undefined,
        };

        console.log("Creating listing with payload:", payload);
        createProduceListingSchema.parse(payload);

        const formData = new FormData();
        formData.append("location", payload.location!);
        formData.append("description", payload.description!);
        formData.append("quantity", String(payload.quantity));
        formData.append("produceId", payload.produceId!);
        formData.append("farmId", payload.farmId!);
        formData.append("status", payload.status);
        if (harvestDate) {
          formData.append("harvestDate", harvestDate.toISOString());
        }

        files.forEach((file) => formData.append("images", file));

        const newListing = await postProduceListing(formData);


        const normalized = normalizeListing(newListing.data);


        addListing(normalized);

        showToast(true, "Listing created successfully!");
      }

      if (onClose) onClose();

    } catch (err: any) {
      console.error(err);

      if (err.name === "ZodError" && err.errors) {
        const messages = err.errors.map((e: any) => e.message);
        showToast(false, messages.join("\n"));
        return;
      }

      let message = "Failed to create listing";

      try {
        const parsed = JSON.parse(err.message);
        if (parsed?.status === 409) {
          message = status === "harvest"
            ? "You already have a harvest listing for this produce, with the same date & location."
            : "You already have a listing for this produce, with the same location. Please edit the existing one instead.";
        } else if (parsed?.message) {
          message = parsed.message;
        }
      } catch (_) {
        // ignore JSON parse error, keep default
      }

      showToast(false, message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleHarvestDateSubmit = () => {
    if (!harvestDate) {
      alert("Please select a harvest date");
      return;
    }

    // ✅ CLOSE THE DIALOG FIRST
    setShowHarvestDialog(false);

    handleSubmit();
  };

  return {
    step,
    setStep,
    category,
    setCategory,
    produceName,
    setProduceName,
    produceType,
    setProduceType,
    quantity,
    setQuantity,
    unit,
    setUnit,
    location,
    setLocation,
    description,
    setDescription,
    status,
    setStatus,
    produceStatus: status,
    setProduceStatus: setStatus,
    harvestDate,
    setHarvestDate,
    showHarvestDialog,
    setShowHarvestDialog,
    files,
    setFiles,
    previewUrls,
    setPreviewUrls,
    existingImages,         // ✅ Pass the correct array!
    setExistingImages,      // ✅ So uploader can modify
    removeImageIds,         // ✅ Also expose these
    setRemoveImageIds,      // ✅ So uploader can push to it
    showImageWarning,
    isSubmitting,
    handleSubmit,
    handleHarvestDateSubmit,
    initialData,
    produceMap,
    categorySuggestions,
    nameSuggestions,
    typeSuggestions,
    setEditHarvestDate
  };
}
