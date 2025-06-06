"use client";

import DatePicker from "@/components/(newEvent)/DatePicker";

export default function DateSelector({ date, setDate, location }) {
  return (
    <label className="text-sm font-medium flex flex-col">Dato *
      <DatePicker date={date} setDate={setDate} location={location} />
    </label>
  );
}
