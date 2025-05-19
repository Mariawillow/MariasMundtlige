"use client";

import { useState } from "react";
import DatePicker from "./DatePicker";

export default function DateSelector() {
  const [date, setDate] = useState(null);

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium">Dato</label>
      <DatePicker date={date} setDate={setDate} />
    </div>
  );
}
