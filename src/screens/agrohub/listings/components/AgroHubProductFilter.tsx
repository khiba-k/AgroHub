"use client"

import React from 'react'
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
  selectedCategory: string
  setSelectedCategory: (value: string) => void
  selectedProduce: string
  setSelectedProduce: (value: string) => void
  selectedType: string
  setSelectedType: (value: string) => void
}) => {
  const { getSuggestions } = useProduceStore()

  const categories = getSuggestions()
  const produceNames = selectedCategory
    ? getSuggestions(selectedCategory)
    : []
  const types = selectedCategory && selectedProduce
    ? getSuggestions(selectedCategory, selectedProduce)
    : []

  return (
    <div>
      <div className="flex flex-wrap gap-4 mb-8">
        {/* Category Select */}
        <Select
          value={selectedCategory}
          onValueChange={(value) => {
            setSelectedCategory(value)
            setSelectedProduce('')
            setSelectedType('')
          }}
        >
          <SelectTrigger className="w-48 border-gray-300">
            <SelectValue placeholder="Choose Category" />
          </SelectTrigger>
          <SelectContent className="border-gray-300">
            {categories.map(category => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Produce Name Select */}
        <Select
          value={selectedProduce}
          onValueChange={(value) => {
            setSelectedProduce(value)
            setSelectedType('')
          }}
        >
          <SelectTrigger className="w-48 border-gray-300">
            <SelectValue placeholder="Choose Produce" />
          </SelectTrigger>
          <SelectContent className="border-gray-300">
            {produceNames.map(name => (
              <SelectItem key={name} value={name}>
                {name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Type Select */}
        <Select
          value={selectedType}
          onValueChange={setSelectedType}
        >
          <SelectTrigger className="w-48 border-gray-300">
            <SelectValue placeholder="Choose Type" />
          </SelectTrigger>
          <SelectContent className="border-gray-300">
            {types.map(type => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}

export default AgroHubProductFilter
