//Samler location og pick a date
import DateSelector from "@/components/(newEvent)/DateSelector";
import LocationSelector from "@/components/(newEvent)/LocationSelector";
import ButtonNext from "@/components/(newEvent)/ButtonNext";

export default function EventFilters({ date, setDate, location, setLocation }) {
  return (
    <article>
      <div>
        <DateSelector date={date} setDate={setDate} />
        <LocationSelector location={location} setLocation={setLocation} />
      </div>
      <ButtonNext disabled={!date || !location} /> {/* Denne knap er kun aktiv når både dato og lokation er valgt */}
    </article>
  );
}
