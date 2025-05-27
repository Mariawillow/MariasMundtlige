const EventForm = () => {
  return (
    <div>
      <form>
        <label className="text-sm font-medium">Eventnavn</label>
        <input type="text" value={eventName} onChange={(e) => setEventName(e.target.value)} className="w-full border rounded px-3 py-2" />
      </form>

      <form>
        <label className="text-sm font-medium">Beskrivelse</label>
        <textarea value={eventDescription} onChange={(e) => setEventDescription(e.target.value)} className="w-full border rounded px-3 py-2" rows={4} />
      </form>

      <label>Vælg værker</label>
      <p>
        For valgte lokation kan du maks vælge <span className="font-bold">{location?.maxArtworks}</span> værker
      </p>

      {/* Artwork selection info */}
      <p className="mt-8">
        <span className="font-bold">
          {selectedArtworks.length}/{location?.maxArtworks}
        </span>{" "}
        værker valgt
      </p>
    </div>
  );
};
export default EventForm;
