"use client"

//Samler location, dato og kunstperiode
import DateSelector from "@/components/(newEvent)/DateSelector";
import LocationSelector from "@/components/(newEvent)/LocationSelector";
import PeriodSelector from "@/components/(newEvent)/PeriodSelector";

export default function EventFilters({ date, setDate, location, setLocation, period, setPeriod }) {
  return (
    <article>
      <h3 className="text-center">STEP 1: Praktiske informationer</h3>
      <DateSelector date={date} setDate={setDate} location={location} />
      <LocationSelector location={location} setLocation={setLocation} date={date} />
      <PeriodSelector period={period} setPeriod={setPeriod}></PeriodSelector>
    </article>
  );
}
