"use client";

import { useEffect, useState } from "react";
import { getDates, getEvents } from "@/api/events";
import { format, isSameDay, parseISO } from "date-fns";
import { da } from "date-fns/locale";

import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

export default function DatePicker({ date, setDate, location }) {
  const [availableDates, setAvailableDates] = useState([]); //Ledige datoer fra API'et
  const [disabledDates, setDisabledDates] = useState([]); //Optaget datoer ud fra location (API)
  const [open, setOpen] = useState(false);

  //Henter ledige datoer
  useEffect(() => {
    getDates()
      .then((data) => {
        setAvailableDates(data);
      })
      .catch((err) => {
        console.error("Fejl ved hentning af datoer", err);
      });
  }, []);

  useEffect(() => {
    if (!location?.id) return;

    getEvents().then((events) => {
      const booked = events.filter((event) => event.locationId === location.id || event.location?.id === location.id).map((event) => event.date);
      setDisabledDates(booked);
    });
  }, [location]);

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
        <Calendar
          className="bg-neutral-100"
          mode="single"
          selected={date}
          onSelect={handleSelect}
          initialFocus
          defaultMonth={new Date(2025, 4, 1)} // Starter på maj måned - de eneste datoer er i maj.
          disabled={(day) => {
            const isNotAvailable = !availableDates.some((dateStr) => isSameDay(day, parseISO(dateStr)));
            const isBooked = disabledDates.some((bookedStr) => isSameDay(day, parseISO(bookedStr)));
            return isNotAvailable || isBooked;
          }}
        />
      </PopoverContent>
    </Popover>
  );
}
