import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import React from 'react'

const AgroHubProductFilter = (
    {
        selectedCategory,
        setSelectedCategory,
        selectedProduce,
        setSelectedProduce,
        selectedType,
        setSelectedType
    }: {
        selectedCategory: string;
        setSelectedCategory: (value: string) => void;
        selectedProduce: string;
        setSelectedProduce: (value: string) => void;
        selectedType: string;
        setSelectedType: (value: string) => void;
    }
) => {
  return (
    <div>
        <div className="flex flex-wrap gap-4 mb-8">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-48 border-gray-300 ">
                  <SelectValue placeholder="Choose Category" />
                </SelectTrigger>
                <SelectContent className=" border-gray-300">
                  <SelectItem value="fruits">Fruits</SelectItem>
                  <SelectItem value="vegetables">Vegetables</SelectItem>
                  <SelectItem value="grains">Grains</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedProduce} onValueChange={setSelectedProduce}>
                <SelectTrigger className="w-48  border-gray-300 ">
                  <SelectValue placeholder="Choose Produce" />
                </SelectTrigger>
                <SelectContent className=" border-gray-300">
                  <SelectItem value="apples">Apples</SelectItem>
                  <SelectItem value="bananas">Bananas</SelectItem>
                  <SelectItem value="oranges">Oranges</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger className="w-48 border-gray-300">
                  <SelectValue placeholder="Choose Type" />
                </SelectTrigger>
                <SelectContent className=" border-gray-300">
                  <SelectItem value="fuji">Fuji</SelectItem>
                  <SelectItem value="gala">Gala</SelectItem>
                  <SelectItem value="red-delicious">Red Delicious</SelectItem>
                </SelectContent>
              </Select>
            </div>
    </div>
  )
}

export default AgroHubProductFilter