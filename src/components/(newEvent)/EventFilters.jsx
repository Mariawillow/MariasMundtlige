//Samler location og pick a date
import DateSelector from "@/components/(newEvent)/DateSelector";
import LocationSelector from "@/components/(newEvent)/LocationSelector";

export default function EventFilters({ date, setDate, location, setLocation }) {
  return (
    <article>
      <DateSelector date={date} setDate={setDate} />
      <LocationSelector location={location} setLocation={setLocation} />
    </article>
  );
}
