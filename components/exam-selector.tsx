"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

const exams = [
  { value: "neet", label: "NEET" },
  { value: "jee", label: "JEE" },
  { value: "upsc", label: "UPSC" },
  { value: "gate", label: "GATE" },
  { value: "cat", label: "CAT" },
  { value: "gre", label: "GRE" },
  { value: "custom", label: "Custom" },
]

export function ExamSelector() {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("neet")

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[100px] justify-between"
        >
          {value ? exams.find((exam) => exam.value === value)?.label : "Select exam..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search exam..." />
          <CommandList>
            <CommandEmpty>No exam found.</CommandEmpty>
            <CommandGroup>
              {exams.map((exam) => (
                <CommandItem
                  key={exam.value}
                  value={exam.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue)
                    setOpen(false)
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === exam.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {exam.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}