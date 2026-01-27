import { Calendar } from "@/components/ui/calendar"

const CalendarDropdown = () => {
  return (
    <Calendar
      mode="single"
      captionLayout="dropdown"
      className="rounded-lg border overflow-hidden"
    />
  )
}

export default CalendarDropdown;