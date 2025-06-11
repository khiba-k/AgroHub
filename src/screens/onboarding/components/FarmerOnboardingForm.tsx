'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { SelectField } from './SelectField';

export const OnboardingForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors, isSubmitSuccessful },
  } = useForm({
    defaultValues: {
      phone: '',
      phone2: '',
      farmName: '',
      cropType: '',
      district: '',
      country: 'Lesotho',
      description: '',
    },
  });

  const description = watch('description');

  const onSubmit = (data: any) => {
    console.log('Form Submitted:', data);
    // TODO: Send to API
  };

  if (isSubmitSuccessful) {
    return (
      <div className="w-screen h-screen flex items-center justify-center bg-black text-white">
        <h2 className="text-3xl font-bold animate-fadeInUp">Thank you! Your information has been submitted.</h2>
      </div>
    );
  }

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center bg-black text-white px-4 overflow-auto">
      <div className="mb-6 text-center animate-fadeInUp">
        <h1 className="text-3xl font-semibold mb-2">You're almost there</h1>
        <p className="text-gray-400 mb-6">We just need a few details from you</p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-2xl p-6 bg-black text-white border border-white/10 rounded-xl shadow-lg space-y-6"
      >
        <h2 className="text-2xl font-bold">Farmer Onboarding</h2>

        {/* Farm Details */}
        <h6 className="text-xl font-semibold">Farm Details</h6>
            <Label>Farm Name</Label>
            <Input {...register('farmName', { required: true })} />
          
          {/*<SelectField
            label="Services"
            name="cropType"
            control={control}
            options={['Poultry Farming', 'Crop Farming', 'Rice', 'Vegetables', 'Fruits']}
            required
          />*/}
        </div>

        <div className="flex flex-col">
          <Label htmlFor="description">Farming Description (max 180 chars)</Label>
          <Textarea
            {...register('description', { required: true, maxLength: 180 })}
            rows={4}
            placeholder="Briefly describe your farming activities..."
            className="bg-black text-white border border-gray-600"
          />
          <div className="text-sm text-right text-gray-400 mt-1">{description?.length || 0}/180</div>
        </div>

        {/* Location */}
        <h6 className="text-xl font-semibold">Location</h6>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label>District</Label>
            <Input {...register('district', { required: true })} placeholder="Maseru" />
          </div>
          <div>
            <Label>Country</Label>
            <Input {...register('country', { required: true })} placeholder="Lesotho" />
          </div>
        </div>

        {/* Contact Details */}
        <h6 className="text-xl font-semibold">Contact Details</h6>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label>Phone Number 1</Label>
            <Controller
              control={control}
              name="phone"
              rules={{ required: true }}
              render={({ field }) => (
                <PhoneInput
                  {...field}
                  country={'ls'}
                  enableSearch
                  containerClass="!bg-black !text-white"
                  inputClass="!bg-black !text-white !w-full !border !border-gray-600 !rounded-md !p-3"
                  buttonClass="!bg-black !border-r !border-gray-600"
                />
              )}
            />
          </div>
          <div>
            <Label>Phone Number 2 (optional)</Label>
            <Controller
              control={control}
              name="phone2"
              render={({ field }) => (
                <PhoneInput
                  {...field}
                  country={'ls'}
                  enableSearch
                  containerClass="!bg-black !text-white"
                  inputClass="!bg-black !text-white !w-full !border !border-gray-600 !rounded-md !p-3"
                  buttonClass="!bg-black !border-r !border-gray-600"
                />
              )}
            />
          </div>
        </div>

        <Button
          type="submit"
          className="w-full bg-white text-black font-semibold py-3 rounded-md hover:bg-gray-300 transition"
        >
          Submit
        </Button>
      </form>
    </div>
  );
};
