'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { onboardingFarmSchema, OnboardingFarmType } from '@/screens/onboarding/utils/onboardingFarmValidation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { Controller, useForm } from 'react-hook-form';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { Loader2 } from 'lucide-react';
import { submitFarmData } from '../utils/onboardingFarmSubmitHandler';

export const OnboardingFarmForm: React.FC = () => {
  const [conflictError, setConflictError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
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

  const description = watch('description');

  const onSubmit = async (data: OnboardingFarmType) => {
    setLoading(true);
    try {
      const payload = { ...data, contactNumber2: data.contactNumber2 || null };
      const result = await submitFarmData(payload);

      if (result === true) {
        router.push('/dashboard');
      } else if (result === 'conflict_error') {
        setConflictError('Farm name already exists or your account is already associated with a farm.');
      } else {
        router.push('/error');
      }
    } catch {
      router.push('/error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-black px-4 py-8 text-white">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-xl bg-black border border-white/10 rounded-xl shadow-lg p-6 md:p-8 space-y-6"
      >
        <div className="text-center">
          <h1 className="text-2xl md:text-3xl font-semibold mb-2">You're almost there</h1>
          <p className="text-gray-400">We just need a few details from you</p>
        </div>

        <h2 className="text-xl font-bold">Farmer Onboarding</h2>

        {conflictError && (
          <div className="bg-red-500 text-white p-4 rounded-md">
            <p>{conflictError}</p>
          </div>
        )}

        {/* Farm Name */}
        <div>
          <Label>Farm Name</Label>
          <Input {...register('name')} />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
        </div>

        {/* Description */}
        <div>
          <Label>Farm Description</Label>
          <Textarea
            {...register('description')}
            rows={4}
            placeholder="Briefly describe your farming activities..."
            className="bg-black text-white border border-gray-600"
          />
          <div className="text-sm text-right text-gray-400 mt-1">{description?.length || 0}/180</div>
          {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
        </div>

        {/* Location */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label>District</Label>
            <Input {...register('district')} placeholder="Maseru" />
            {errors.district && <p className="text-red-500 text-sm mt-1">{errors.district.message}</p>}
          </div>
          <div>
            <Label>Country</Label>
            <Input {...register('country')} placeholder="Lesotho" />
            {errors.country && <p className="text-red-500 text-sm mt-1">{errors.country.message}</p>}
          </div>
        </div>

        {/* Contacts */}
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
                    containerClass="!bg-black"
                    inputClass="!bg-black !text-white !w-full !pl-12 !border !border-gray-600 !rounded-md !p-3"
                    buttonClass="!bg-black !border-r !border-gray-600"
                  />
                  {errors.contactNumber1 && (
                    <p className="text-red-500 text-sm mt-1">{errors.contactNumber1.message}</p>
                  )}
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
                    containerClass="!bg-black"
                    inputClass="!bg-black !text-white !w-full !pl-12 !border !border-gray-600 !rounded-md !p-3"
                    buttonClass="!bg-black !border-r !border-gray-600"
                  />
                  {errors.contactNumber2 && (
                    <p className="text-red-500 text-sm mt-1">{errors.contactNumber2.message}</p>
                  )}
                </>
              )}
            />
          </div>
        </div>

        <Button
          type="submit"
          disabled={loading}
          className="w-full bg-white text-black font-semibold py-3 rounded-md hover:bg-gray-300 transition flex items-center justify-center gap-2"
        >
          {loading ? <Loader2 className="h-5 w-5 animate-spin" />  : 'Submit'}
        </Button>
      </form>
    </div>
  );
};
