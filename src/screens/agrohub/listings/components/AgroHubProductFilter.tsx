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
    let id: string | undefined

    if (selectedCategory && selectedProduce) {
      const cat = capitalize(selectedCategory)
      const prod = capitalize(selectedProduce)

      const produceEntry = produceMap?.[cat]?.[prod]

      if (produceEntry) {
        if (selectedType) {
          const type = capitalize(selectedType)
          id = produceEntry?.[type]?.id
        }

        // fallback if ID is still undefined
        if (!id) {
          // if the whole entry IS an item (has id)
          if ('id' in produceEntry && typeof produceEntry.id === 'string') {
            id = produceEntry.id
          }
          // OR if there's an empty-string key for no-type produce
          else if (produceEntry?.['']?.id) {
            id = produceEntry[''].id
          }
          // OR pick first type if any left
          else {
            const firstKey = Object.keys(produceEntry)[0]
            id = produceEntry[firstKey]?.id
          }
        }
      }
    }

    if (!id) {
      console.warn(
        "⚠️ No ID found for:",
        selectedCategory,
        selectedProduce,
        selectedType
      )
    }

    console.log("Setting selected produce ID:", id)
    setSelectedProduceId(id)
  }, [selectedCategory, selectedProduce, selectedType, produceMap, setSelectedProduceId])

  return (
    <div>
      <div className="flex flex-wrap gap-4 mb-8">
        <Select
          value={selectedCategory || ""}
          onValueChange={(value) => {
            // reset()
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
          value={selectedProduce || ""}
          onValueChange={(value) => {
            // reset()
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
            value={selectedType || ""}
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
