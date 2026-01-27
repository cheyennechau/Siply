"use client"

import * as React from "react"

import { Calendar } from "@/components/ui/calendar"

export function Calendar18() {
  const [date, setDate] = React.useState(
    new Date(2025, 5, 12)
  )

  return (
    <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
      captionLayout="dropdown"
      // className="w-full rounded-lg border overflow-hidden [--cell-size:clamp(2.25rem,calc((100%-1.5rem)/7),3rem)]"
      className="rounded-lg border [--cell-size:--spacing(11)] md:[--cell-size:--spacing(12)]"
      buttonVariant="ghost"
    />
  )
}
