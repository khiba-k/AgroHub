"use client"

import React, { useEffect } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { useProduceStore } from '@/lib/store/useProductStore'

const capitalize = (str: string) =>
  str
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')

const AgroHubProductFilter = ({
  selectedCategory,
  setSelectedCategory,
  selectedProduce,
  setSelectedProduce,
  selectedType,
  setSelectedType
}: {
  selectedCategory: string | undefined
  setSelectedCategory: (value: string | undefined) => void
  selectedProduce: string | undefined
  setSelectedProduce: (value: string | undefined) => void
  selectedType: string | undefined,
  setSelectedType: (value: string | undefined) => void
}) => {
  const { getSuggestions } = useProduceStore()

  const categories = getSuggestions()
  const produceNames = selectedCategory
    ? getSuggestions(selectedCategory)
    : []
  const types = selectedCategory && selectedProduce
    ? getSuggestions(selectedCategory, selectedProduce)
    : []
  
  // Filter out any empty strings to prevent the error
  const filteredCategories = categories.filter(cat => cat && cat.trim() !== '')
  const filteredProduceNames = produceNames.filter(name => name && name.trim() !== '')
  const filteredTypes = types.filter(type => type && type.trim() !== '')

  // Auto-select first category if none selected
  useEffect(() => {
    if (!selectedCategory && filteredCategories.length > 0) {
      setSelectedCategory(filteredCategories[0])
    }
  }, [filteredCategories, selectedCategory, setSelectedCategory])

  // Auto-select first produce if none selected
  useEffect(() => {
    if (selectedCategory && !selectedProduce && filteredProduceNames.length > 0) {
      setSelectedProduce(filteredProduceNames[0])
    }
  }, [selectedCategory, filteredProduceNames, selectedProduce, setSelectedProduce])

  // Auto-select first type if none selected
  useEffect(() => {
    if (selectedCategory && selectedProduce && !selectedType && filteredTypes.length > 0) {
      setSelectedType(filteredTypes[0])
    }
  }, [selectedCategory, selectedProduce, filteredTypes, selectedType, setSelectedType])

  return (
    <div>
      <div className="flex flex-wrap gap-4 mb-8">
        {/* Category Select */}
        <Select
          value={selectedCategory || undefined}
          onValueChange={(value) => {
            setSelectedCategory(value)
            setSelectedProduce(undefined) // Changed from empty string to undefined
            setSelectedType(undefined)
          }}
        >
          <SelectTrigger className="w-48 border-gray-300">
            <SelectValue placeholder="Choose Category" />
          </SelectTrigger>
          <SelectContent className="border-gray-300">
            {filteredCategories.map(category => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Produce Name Select */}
        <Select
          value={selectedProduce || undefined}
          onValueChange={(value) => {
            setSelectedProduce(value)
            setSelectedType(undefined)
          }}
        >
          <SelectTrigger className="w-48 border-gray-300">
            <SelectValue placeholder="Choose Produce" />
          </SelectTrigger>
          <SelectContent className="border-gray-300">
            {filteredProduceNames.map(name => (
              <SelectItem key={name} value={name}>
                {name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Type Select */}
        {filteredTypes.length > 0 && (
          <Select
            value={selectedType}
            onValueChange={setSelectedType}
          >
            <SelectTrigger className="w-48 border-gray-300">
              <SelectValue placeholder="Choose Type" />
            </SelectTrigger>
            <SelectContent className="border-gray-300">
              {filteredTypes.map(type => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </div>
    </div>
  )
}

export default AgroHubProductFilter