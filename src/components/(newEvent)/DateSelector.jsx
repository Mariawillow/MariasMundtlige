"use client";

import DatePicker from "@/components/(newEvent)/DatePicker";

export default function DateSelector({ date, setDate, location }) {
  return (
    <div className="flex flex-col">
      <label className="text-sm font-medium">Dato *</label>
      <DatePicker date={date} setDate={setDate} location={location} />
    </div>
  );
}
