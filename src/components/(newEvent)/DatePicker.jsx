"use client";

import { useEffect, useState } from "react";
import { getDates } from "@/api/localhost";
import { format, isSameDay, parseISO } from "date-fns";
import { da } from "date-fns/locale";


import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

export default function DatePicker({ date, setDate }) {
  const [availableDates, setAvailableDates] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    getDates()
      .then((data) => {
        setAvailableDates(data);
      })
      .catch((err) => {
        console.error("Fejl ved hentning af datoer", err);
      });
  }, []);

  useEffect(() => { }, [date]);

  const handleSelect = (day) => {
    setDate(day); // sender dato op
    setOpen(false); // lukker popover
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className={cn("w-[280px] justify-start text-left font-normal", !date && "text-muted-foreground")}>
          {date ? format(date, "PPP", { locale: da }) : <span>Vælg dato</span>}
          <CalendarIcon className="ml-auto h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar className="bg-neutral-100 rounded-md" mode="single" selected={date} onSelect={handleSelect} initialFocus disabled={(day) => !availableDates.some((dateStr) => isSameDay(day, parseISO(dateStr)))} />
      </PopoverContent>
    </Popover>
  );
}
