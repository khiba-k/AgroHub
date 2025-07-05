"use client"

import * as React from "react"

import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
// import { Calendar } from "lucide-react"
import { DayPicker } from "react-day-picker"
import "react-day-picker/dist/style.css"

type CaptionLayout = "dropdown" | "dropdown-months" | "dropdown-years";

export default function CalendarComponent() {
  const [dropdown, setDropdown] = React.useState<CaptionLayout>("dropdown");
  const [date, setDate] = React.useState<Date | undefined>(
    new Date(2025, 5, 12)
  );

  return (
    <div className="flex flex-col gap-4">
      <DayPicker
        mode="single"
        defaultMonth={date}
        selected={date}
        onSelect={setDate}
        captionLayout={dropdown as any}
        className="rounded-lg border shadow-sm"
      />
      <Label htmlFor="dropdown" className="px-1">
        Dropdown
      </Label>
      <Select
        value={dropdown}
        onValueChange={(value) =>
          setDropdown(
            value as CaptionLayout
          )
        }
      >
        <SelectTrigger
          id="dropdown"
          className="bg-background w-full"
        >
          <SelectValue placeholder="Dropdown" />
        </SelectTrigger>
        <SelectContent align="center">
          <SelectItem value="dropdown">Month and Year</SelectItem>
          <SelectItem value="dropdown-months">Month Only</SelectItem>
          <SelectItem value="dropdown-years">Year Only</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
