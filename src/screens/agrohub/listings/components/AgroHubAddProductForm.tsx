"use client"

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { produceFormSchema, type ProduceFormData } from '../../utils/produceFromValidation'
import { fetchProduce, submitProduce } from '../../utils/produceRequests'
import { ProduceStoreData, useProduceStore } from '@/lib/store/useProductStore'
import { getProduce } from '@/actions/produce/produceActions'
import { Loader2 } from "lucide-react";

interface AgroHubAddProductFormProps {
    showAddProduct: boolean
    setShowAddProduct: (value: boolean) => void
}

const unitTypes = [
    { value: 'kg', label: 'Kilogram (kg)' },
    { value: 'g', label: 'Gram (g)' },
    { value: 'ton', label: 'Ton' },
    { value: 'piece', label: 'Piece' },
    { value: 'bunch', label: 'Bunch' },
    { value: 'bag', label: 'Bag' },
    { value: 'box', label: 'Box' }
]

const capitalize = (str: string | null | undefined) =>
    (str ?? '')
      .toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

const AgroHubAddProductForm = ({ showAddProduct, setShowAddProduct }: AgroHubAddProductFormProps) => {
    const [categoryOpen, setCategoryOpen] = useState(false)
    const [productNameOpen, setProductNameOpen] = useState(false)

    const { addProduce, getSuggestions, resetProduce, setProduceMap } = useProduceStore()

    const form = useForm<ProduceFormData>({
        resolver: zodResolver(produceFormSchema),
        defaultValues: {
            category: '',
            name: '',
            type: '',
            pricePerUnit: '',
            unitType: ''
        }
    })

    const watchCategory = form.watch('category')
    const watchName = form.watch('name')

    const categorySuggestions = getSuggestions()
    const nameSuggestions = watchCategory ? getSuggestions(watchCategory) : []

    //  Clear product name if not in the new category
    useEffect(() => {
        if (!nameSuggestions.includes(watchName)) {
            form.setValue('name', '')
        }
    }, [watchCategory]);

    useEffect(() => {
        const refreshProduce = async () => {
            try {
                console. log('Refreshing produce data...')
                resetProduce()

                const produceData = await fetchProduce()

                // Transform array into nested object
                const structuredData: ProduceStoreData = {}

                produceData.forEach((item: { id: string; category: string; name: string; type: string; pricePerUnit: string; unitType: string }) => {
                    const category = capitalize(item.category)
                    const name = capitalize(item.name)
                    const type = capitalize(item.type)

                    if (!structuredData[category]) structuredData[category] = {}
                    if (!structuredData[category][name]) structuredData[category][name] = {}

                    structuredData[category][name][type] = {
                        id: item.id,
                        pricePerUnit: item.pricePerUnit,
                        unitType: item.unitType,
                    }
                })

                console.log('Saving structured produce data:', structuredData)

                setProduceMap(structuredData)
            } catch (error) {
                console.error('Failed to refresh produce:', error)
            }
        }

        refreshProduce()
    }, [])

    const onSubmit = async (data: ProduceFormData) => {
        try {
            const formattedData: ProduceFormData = {
                category: capitalize(data.category),
                name: capitalize(data.name),
                type: data.type ? capitalize(data.type) : undefined,
                pricePerUnit: data.pricePerUnit,
                unitType: data.unitType
              }

            const newProduce = await submitProduce(formattedData)

            // newProduce should include the id, e.g. newProduce.id
            addProduce(
                formattedData.category,
                formattedData.name,
                formattedData.type ?? "",
                {
                  id: newProduce.id,
                  pricePerUnit: formattedData.pricePerUnit,
                  unitType: formattedData.unitType,
                }
              )

            setShowAddProduct(false)
            form.reset()
        } catch (error) {
            console.error('Failed to submit product:', error)
        }
    }

    const handleCancel = () => {
        setShowAddProduct(false)
        form.reset()
    }

    const renderSuggestInput = (
        field: any,
        suggestions: string[],
        open: boolean,
        setOpen: (v: boolean) => void,
        placeholder: string
    ) => {
        const [focused, setFocused] = useState(false)

        const filteredSuggestions = suggestions
            .filter(s => s.toLowerCase().includes(field.value.toLowerCase()))
            .slice(0, 5)

        const showSuggestions = focused && filteredSuggestions.length > 0

        return (
            <div className="relative">
                <div className="flex items-center relative">
                    <Button
                        type="button"
                        size="icon"
                        variant="ghost"
                        className="absolute left-0 ml-1 z-10"
                        onClick={() => setOpen(!open)}
                    >
                        ▼
                    </Button>
                    <Input
                        placeholder={placeholder}
                        className="pl-10"
                        value={field.value}
                        onChange={e => field.onChange(e.target.value)}
                        onFocus={() => setFocused(true)}
                        onBlur={() => setTimeout(() => setFocused(false), 100)}
                    />
                </div>

                {showSuggestions && (
                    <div className="absolute  left-0 mt-1 w-full z-50 border border-gray-100 rounded-md shadow-md max-h-48 overflow-y-auto bg-white ">
                        {filteredSuggestions.map(suggestion => (
                            <div
                                key={suggestion}
                                onClick={() => {
                                    field.onChange(suggestion)
                                    setFocused(false)
                                }}
                                className="cursor-pointer px-3 py-1  text-sm"
                            >
                                {suggestion}
                            </div>
                        ))}
                    </div>
                )}

                {open && (
                    <div className="absolute  left-0 mt-1 w-full z-50  border border-gray-100 rounded-md shadow-md max-h-48 overflow-y-auto bg-white text-black ">
                        {suggestions.slice(0, 10).map(suggestion => (
                            <div
                                key={suggestion}
                                onClick={() => {
                                    field.onChange(suggestion)
                                    setOpen(false)
                                }}
                                className="cursor-pointer px-3 py-1 text-sm  index > 0 ?  border-t border-gray-200"
                            >
                                {suggestion}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        )
    }

    return (
        <Dialog open={showAddProduct} onOpenChange={setShowAddProduct}>
            <DialogContent className="border-gray-200 max-w-lg">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold">Add New Produce</DialogTitle>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="category"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Category</FormLabel>
                                    {renderSuggestInput(field, categorySuggestions, categoryOpen, setCategoryOpen, 'Fruits')}
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Product Name</FormLabel>
                                    {renderSuggestInput(field, nameSuggestions, productNameOpen, setProductNameOpen, 'Apples')}
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="type"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Product Type (optional)</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Golden Delicious"
                                            className="border-gray-300"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="unitType"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Unit Type</FormLabel>
                                    <Select onValueChange={field.onChange} value={field.value}>
                                        <FormControl>
                                            <SelectTrigger className="border-gray-300">
                                                <SelectValue placeholder="Select unit type" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {unitTypes.map(unit => (
                                                <SelectItem key={unit.value} value={unit.value}>
                                                    {unit.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="pricePerUnit"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Price per Unit</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="text"
                                            inputMode="decimal"
                                            placeholder="Enter price per unit"
                                            className="border-gray-300 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="flex gap-3">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={handleCancel}
                                className="flex-1"
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                className="flex-1 hover:bg-gray-400 font-semibold"
                                disabled={form.formState.isSubmitting}
                            >
                                 {form.formState.isSubmitting ? (
    <Loader2 className="h-6 w-6 animate-spin text-gray-700" />
  ) : (
    'Save Product'
  )}

                            
                            </Button>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}

export default AgroHubAddProductForm
