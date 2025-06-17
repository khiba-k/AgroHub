'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { onboardingFarmSchema, OnboardingFarmType } from '@/screens/onboarding/utils/onboardingFarmValidation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { submitFarmData } from '../utils/onboardingFarmSubmitHandler';

export const OnboardingFarmForm: React.FC = () => {
  const [conflictErorr, setConflictError] = React.useState("");
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors, isSubmitSuccessful },
  } = useForm<OnboardingFarmType>({
    resolver: zodResolver(onboardingFarmSchema),
    defaultValues: {
      name: '',
      description: '',
      district: '',
      country: 'Lesotho',
      contactNumber1: '',
      contactNumber2: '',
    },
  });

  const router = useRouter();

  const description = watch('description');

  const onSubmit = async (data: OnboardingFarmType) => {
    try {
      const payload = { ...data, contactNumber2: data.contactNumber2 || null };

      const result = await submitFarmData(payload);
      if (result) {
        router.push('/dashboard');
      } else {
        if (result === 'server_error') {
          router.push('/error');
        }
        if (result === 'conflict_error') {
          setConflictError('Farm name already exists or your account is already associated with a farm.');
        }
      }
    } catch (error) {
      router.push('/error');
    }
  };


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
        {conflictErorr && (
          <div className="bg-red-500 text-white p-4 rounded-md mb-4">
            <p>{conflictErorr}</p>
          </div>
        )}
        <div>
          <Label>Farm Name</Label>
          <Input {...register('name')} className="max-w-72" />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
        </div>

        <div className="flex flex-col">
          <Label htmlFor="description">Farm Description</Label>
          <Textarea
            {...register('description')}
            rows={4}
            placeholder="Briefly describe your farming activities..."
            className="bg-black text-white border border-gray-600 mt-1"
          />
          <div className="text-sm text-right text-gray-400 mt-1">{description?.length || 0}/180</div>
          {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
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
              name="contactNumber1"
              render={({ field }) => (
                <>
                  <PhoneInput
                    {...field}
                    country="ls"
                    enableSearch
                    containerClass="!bg-black !text-white"
                    inputClass="!bg-black !text-white !w-full !pl-12 !border !border-gray-600 !rounded-md !p-3"
                    buttonClass="!bg-black !border-r !border-gray-600"
                  />
                  {errors.contactNumber1 && <p className="text-red-500 text-sm mt-1">{errors.contactNumber1.message}</p>}
                </>
              )}
            />
          </div>
          <div>
            <Label>Phone Number 2 (optional)</Label>
            <Controller
              control={control}
              name="contactNumber2"
              render={({ field }) => (
                <>
                  <PhoneInput
                    {...field}
                    country="ls"
                    enableSearch
                    containerClass="!bg-black !text-white"
                    inputClass="!bg-black !text-white !w-full !pl-12 !border !border-gray-600 !rounded-md !p-3"
                    buttonClass="!bg-black !border-r !border-gray-600"
                  />
                  {errors.contactNumber2 && <p className="text-red-500 text-sm mt-1">{errors.contactNumber2.message}</p>}
                </>
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
    </div >
  );
};
