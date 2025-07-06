import { useState, useEffect } from "react";
import { useProduceStore } from "@/lib/store/useProductStore";
import { useFarmStore } from "@/lib/store/userStores";
import { fetchProduce } from "@/screens/agrohub/utils/produceRequests";
import { createProduceListingSchema } from "@/lib/utils/farmer/FarmListingUtils";
import { postProduceListing } from "@/lib/requests/produceListingsRequests";
import { z } from "zod";

export function useProduceFormLogic(initialData: any, options?: { step?: number; setStep?: (step: number) => void }) {
  const farmId = useFarmStore((state) => state.farmId);
  const { produceMap, getSuggestions, setProduceMap, resetProduce } = useProduceStore();

  const isActiveListing = initialData?.status === "active";

  // --- Step management ---
  const [internalStep, setInternalStep] = useState(options?.step || 1);
  const step = options?.step || internalStep;
  const setStep = options?.setStep || setInternalStep;

  // --- Form state ---
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
  const [unit, setUnit] = useState(initialData?.unit || "kg");
  const [location, setLocation] = useState(initialData?.location || "");
  const [description, setDescription] = useState(initialData?.description || "");
  const [status, setStatus] = useState(initialData?.status || "draft");
  const [harvestDate, setHarvestDate] = useState<Date | undefined>(
    initialData?.harvestDate ? new Date(initialData.harvestDate) : undefined
  );
  const [showHarvestDialog, setShowHarvestDialog] = useState(false);

  const [files, setFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [showImageWarning, setShowImageWarning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // --- Fetch produce data ---
  useEffect(() => {
    const loadProduce = async () => {
      try {
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
      } catch (e) {
        console.error("Failed to load produce data:", e);
      }
    };
    loadProduce();
  }, [resetProduce, setProduceMap]);

  // --- Suggestions ---
  const categorySuggestions = getSuggestions();
  const nameSuggestions = category ? getSuggestions(category) : [];
  const typeSuggestions =
    category && produceName ? getSuggestions(category, produceName) : [];

  // --- Clear dependent selects if changed ---
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

  // --- Helpers ---
  const capitalize = (str: string | null | undefined) =>
    (str ?? "")
      .toLowerCase()
      .split(" ")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");

  const getProduceId = () => {
    if (!category || !produceName || !produceType) return undefined;
    const cat = capitalize(category);
    const name = capitalize(produceName);
    const type = capitalize(produceType);
    return produceMap?.[cat]?.[name]?.[type]?.id;
  };

  // --- Submit (Updated with improved logic) ---
  const submitForm = async () => {
    setIsSubmitting(true);
    try {
      // ✅ Build the payload WITHOUT images (they'll be handled separately)
      const payload = {
        location,
        description,
        quantity: Number(quantity),
        produceId: getProduceId(),
        farmId: initialData?.farmId || farmId,
        status: status === "to_be_harvested" ? "harvest" : status,
        harvestDate:
          status === "to_be_harvested" || status === "harvest"
            ? harvestDate?.toISOString()
            : undefined,
      };

      // ✅ Validate everything with Zod (without images)
      createProduceListingSchema.parse(payload);

      // ✅ Build the FormData
      const formData = new FormData();
      if (payload.location) formData.append("location", payload.location);
      if (payload.description) formData.append("description", payload.description);
      if (payload.quantity !== undefined) formData.append("quantity", String(payload.quantity));
      if (payload.produceId) formData.append("produceId", payload.produceId);
      if (payload.farmId) formData.append("farmId", payload.farmId);
      formData.append("status", payload.status);
      if (payload.harvestDate) {
        formData.append("harvestDate", payload.harvestDate);
      }

      // ✅ Append actual files (not file names)
      files.forEach(file => {
        formData.append("images", file);
      });

      const response = await postProduceListing(formData);
      console.log("Listing created:", response);
      setShowHarvestDialog(false);
      // optionally reset form or navigate away here
    } catch (err: any) {
      console.error("Error submitting form:", err);
      if (err instanceof z.ZodError) {
        alert(
          "Validation failed: " + err.errors.map(e => e.message).join(", ")
        );
      } else {
        alert(err.message || "Something went wrong. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (files.length === 0) {
      setShowImageWarning(true);
      return;
    }
    setShowImageWarning(false);

    if (status === "to_be_harvested") {
      setShowHarvestDialog(true);
      return;
    }

    submitForm();
  };

  const handleHarvestDateSubmit = () => {
    if (!harvestDate) {
      alert("Please select a harvest date");
      return;
    }
    submitForm();
  };

  return {
    // Step management
    step,
    setStep,
    // Form state
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
    setStatus: setStatus, // This maps to produceStatus in ProduceStepOne
    produceStatus: status, // Add this for backward compatibility
    setProduceStatus: setStatus, // Add this for backward compatibility
    harvestDate,
    setHarvestDate,
    showHarvestDialog,
    setShowHarvestDialog,
    files,
    setFiles,
    previewUrls,
    setPreviewUrls,
    showImageWarning,
    isSubmitting,
    handleSubmit,
    handleHarvestDateSubmit,
    initialData,
    // Add produceMap for ProduceStepOne
    produceMap,
    // Add suggestions for easier access
    categorySuggestions,
    nameSuggestions,
    typeSuggestions,
  };
}