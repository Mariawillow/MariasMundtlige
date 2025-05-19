"use server";

import { getDates } from "@/api/localhost";
import DatePicker from "./DatePicker";

export default async function DatePickerServer() {
  const dates = await getDates();

  return <DatePicker dates={dates} />;
}
