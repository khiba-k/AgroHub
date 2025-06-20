'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

import { useState } from 'react'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { onboardingAgrohubSchema } from '../utils/onboardingAgrohubValidation'
import { submitAgrohubData } from '../utils/onboardingAgrohubSubmitHandler'



export default function OnboardingAgrohubForm() {
    const [isLoading, setIsLoading] = useState(false)

    const form = useForm({
    resolver: zodResolver(onboardingAgrohubSchema),
    defaultValues: {
        firstname: '',
        lastname: '',
    },
    })

    const onSubmit = async(values: z.infer<typeof onboardingAgrohubSchema>) => {
    setIsLoading(true)
    const response = await submitAgrohubData(values);
    
    if (response === true) {
        console.log('Data submitted successfully');
        // Handle successful submission, e.g., redirect or show success message}
    }


    }

    return (
        <div className="max-w-md mx-auto mt-10 p-6 rounded-xl shadow-lg bg-white space-y-6">
        <h2 className="text-2xl font-semibold text-center">Enter Your Name</h2>
        <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* Firstname */}
            <FormField
            control={form.control}
            name="firstname"
            render={({ field }) => (
                <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                    <Input placeholder="Mohale" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />

          {/* Lastname */}
            <FormField
            control={form.control}
            name="lastname"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                    <Input placeholder="Malebanye" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />

            <Button type="submit" className="w-full text-lg" disabled={isLoading}>
            {isLoading ? 'Submitting...' : 'Submit'}
            </Button>
        </form>
        </Form>
    </div>
    )
}
