"use client";
import Header from "@/components/Header";
import MakeEventStepOne from "@/components/(dashboard)/MakeEventStepOne";

const NewEvent = () => {
  return (
    <div>
      <Header />
      <h1 className="text-center">Opret Event</h1>
      <MakeEventStepOne />
    </div>
  );
};

export default NewEvent;
