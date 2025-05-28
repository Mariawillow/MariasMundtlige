const EventForm = ({ eventName, setEventName, eventDescription, setEventDescription, selectedArtworks, location }) => {
  return (
    <div>
      <label className="text-sm font-medium">Eventnavn</label>
      <input
        type="text"
        name="title"  // <-- vigtig, så det submittes i form data
        value={eventName}
        onChange={(e) => setEventName(e.target.value)}
        className="w-full border rounded px-3 py-2"
      />

      <label className="text-sm font-medium mt-4">Beskrivelse</label>
      <textarea
        name="description"  // <-- vigtigt for form submission
        value={eventDescription}
        onChange={(e) => setEventDescription(e.target.value)}
        className="w-full border rounded px-3 py-2"
        rows={4}
      />

      <label className="block mt-6 font-semibold">Vælg værker</label>
      <p>
        For valgte lokation kan du maks vælge <span className="font-bold">{location?.maxArtworks}</span> værker
      </p>

      <p className="mt-2">
        <span className="font-bold">
          {selectedArtworks.length}/{location?.maxArtworks}
        </span>{" "}
        værker valgt
      </p>
    </div>
  );
};
export default EventForm;
