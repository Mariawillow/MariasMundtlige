import { makeNewEvent } from "@/api/events";

// Funktion som håndterer oprettelse og redigering af event
export async function handleEventAction({ mode, onSubmit, user, router, eventInfo, setShowSuccess }) {
  try {
    if (mode === "edit" && onSubmit) {
      await onSubmit(eventInfo); // PATCH – redigering
      setShowSuccess("Ændringer tilføjet");
      setTimeout(() => router.push("/dashboard"), 800);
      setTimeout(() => setShowSuccess(""), 5000);
      return;
    }

    // Opret nyt event
    await makeNewEvent({ ...eventInfo, userId: user?.id });
    setShowSuccess("Eventet blev oprettet!");
    setTimeout(() => router.push("/dashboard"), 800);
    setTimeout(() => setShowSuccess(""), 5000);
  } catch (error) {
    alert("Noget gik galt under oprettelsen/redigeringen af eventet");
  }
}
