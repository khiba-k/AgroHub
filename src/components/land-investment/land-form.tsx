"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useForm } from "react-hook-form";
import { useTranslation } from "@/lib/i18n";

interface FormValues {
  title: string;
  location: string;
  size: number;
  price: number;
  soilType: string;
  waterAccess: boolean;
  description: string;
  investmentType: string;
  currency: string;
  contactInfo: string;
}

interface LandFormProps {
  initialData?: any;
}

export function LandForm({ initialData }: LandFormProps) {
  const { t } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const defaultValues: Partial<FormValues> = {
    title: initialData?.title || "",
    location: initialData?.location || "Maseru, Lesotho",
    size: initialData?.size || 0,
    price: initialData?.price || 0,
    soilType: initialData?.soilType || "",
    waterAccess: initialData?.waterAccess || false,
    description: initialData?.description || "",
    investmentType: initialData?.investmentType || "Full Purchase",
    currency: initialData?.currency || "USD",
    contactInfo: initialData?.owner?.contact || "",
  };

  const form = useForm<FormValues>({
    defaultValues,
  });

  function onSubmit(values: FormValues) {
    setIsSubmitting(true);
    // In a real app, this would send the data to your backend
    console.log(values);
    setTimeout(() => {
      setIsSubmitting(false);
      // Close the dialog or show success message
      alert(t("landInvestment.listingSubmittedSuccess"));
    }, 1000);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("landInvestment.title")}</FormLabel>
              <FormControl>
                <Input
                  placeholder={t("landInvestment.titlePlaceholder")}
                  {...field}
                />
              </FormControl>
              <FormDescription>
                {t("landInvestment.titleDescription")}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("landInvestment.location")}</FormLabel>
                <FormControl>
                  <Input placeholder="Maseru, Lesotho" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="size"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("landInvestment.sizeHectares")}</FormLabel>
                <FormControl>
                  <Input type="number" min="0" step="0.1" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("landInvestment.price")}</FormLabel>
                <FormControl>
                  <Input type="number" min="0" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="currency"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("landInvestment.currency")}</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue
                        placeholder={t("landInvestment.selectCurrency")}
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="USD">USD ($)</SelectItem>
                    <SelectItem value="LSL">LSL (M)</SelectItem>
                    <SelectItem value="ZAR">ZAR (R)</SelectItem>
                    <SelectItem value="KES">KES (KSh)</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="investmentType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("landInvestment.investmentType")}</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue
                        placeholder={t("landInvestment.selectType")}
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Full Purchase">
                      {t("landInvestment.fullPurchase")}
                    </SelectItem>
                    <SelectItem value="Lease (5 years)">
                      {t("landInvestment.lease5Years")}
                    </SelectItem>
                    <SelectItem value="Lease (10 years)">
                      {t("landInvestment.lease10Years")}
                    </SelectItem>
                    <SelectItem value="Partnership">
                      {t("landInvestment.partnership")}
                    </SelectItem>
                    <SelectItem value="Joint Venture">
                      {t("landInvestment.jointVenture")}
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="soilType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("landInvestment.soilType")}</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue
                        placeholder={t("landInvestment.selectSoilType")}
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Loamy">
                      {t("landInvestment.loamy")}
                    </SelectItem>
                    <SelectItem value="Sandy">
                      {t("landInvestment.sandy")}
                    </SelectItem>
                    <SelectItem value="Clay">
                      {t("landInvestment.clay")}
                    </SelectItem>
                    <SelectItem value="Sandy Loam">
                      {t("landInvestment.sandyLoam")}
                    </SelectItem>
                    <SelectItem value="Clay Loam">
                      {t("landInvestment.clayLoam")}
                    </SelectItem>
                    <SelectItem value="Silt Loam">
                      {t("landInvestment.siltLoam")}
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="waterAccess"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 mt-6">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>{t("landInvestment.waterAccess")}</FormLabel>
                  <FormDescription>
                    {t("landInvestment.waterAccessDescription")}
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("landInvestment.description")}</FormLabel>
              <FormControl>
                <Textarea
                  placeholder={t("landInvestment.descriptionPlaceholder")}
                  className="min-h-[120px]"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                {t("landInvestment.descriptionHelp")}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="contactInfo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("landInvestment.contactInformation")}</FormLabel>
              <FormControl>
                <Input placeholder="+266 5555 1234" {...field} />
              </FormControl>
              <FormDescription>
                {t("landInvestment.contactDescription")}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting
            ? t("landInvestment.submitting")
            : initialData
              ? t("landInvestment.updateListing")
              : t("landInvestment.submitListing")}
        </Button>
      </form>
    </Form>
  );
}
