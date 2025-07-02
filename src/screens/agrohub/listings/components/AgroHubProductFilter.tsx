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
  setSelectedProduceId,
  selectedProduce,
  setSelectedProduce,
  selectedType,
  setSelectedType
}: {
  selectedCategory: string | undefined
  setSelectedCategory: (value: string | undefined) => void
  setSelectedProduceId: (value: string | undefined) => void
  selectedProduce: string | undefined
  setSelectedProduce: (value: string | undefined) => void
  selectedType: string | undefined
  setSelectedType: (value: string | undefined) => void
}) => {
  const { getSuggestions, produceMap } = useProduceStore()

  const categories = getSuggestions()
  const produceNames = selectedCategory ? getSuggestions(selectedCategory) : []
  const types = selectedCategory && selectedProduce
    ? getSuggestions(selectedCategory, selectedProduce)
    : []

  const filteredCategories = categories.filter(cat => cat && cat.trim() !== '')
  const filteredProduceNames = produceNames.filter(name => name && name.trim() !== '')
  const filteredTypes = types.filter(type => type && type.trim() !== '')

  useEffect(() => {
    if (!selectedCategory && filteredCategories.length > 0) {
      setSelectedCategory(filteredCategories[0])
    }
  }, [filteredCategories, selectedCategory, setSelectedCategory])

  useEffect(() => {
    if (selectedCategory && !selectedProduce && filteredProduceNames.length > 0) {
      setSelectedProduce(filteredProduceNames[0])
    }
  }, [selectedCategory, filteredProduceNames, selectedProduce, setSelectedProduce])

  useEffect(() => {
    if (selectedCategory && selectedProduce && !selectedType && filteredTypes.length > 0) {
      setSelectedType(filteredTypes[0])
    }
  }, [selectedCategory, selectedProduce, filteredTypes, selectedType, setSelectedType])

  useEffect(() => {
    const id = selectedCategory && selectedProduce && selectedType
      ? produceMap?.[capitalize(selectedCategory)]?.[capitalize(selectedProduce)]?.[capitalize(selectedType)]?.id
      : undefined

    setSelectedProduceId(id)
  }, [selectedCategory, selectedProduce, selectedType, produceMap, setSelectedProduceId])

  return (
    <div>
      <div className="flex flex-wrap gap-4 mb-8">
        <Select
          value={selectedCategory || undefined}
          onValueChange={(value) => {
            setSelectedCategory(value)
            setSelectedProduce(undefined)
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
