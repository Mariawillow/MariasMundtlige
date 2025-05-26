"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

const cartStore = create(
  persist(
    (set, get) => ({
      items: [],

      addItem: (item) => {
        const { items } = get();

        // Find samlet antal billetter for dette eventId i kurven
        const totalQuantityForEvent = items.filter((i) => i.eventId === item.eventId).reduce((sum, i) => sum + i.quantity, 0);

        if (totalQuantityForEvent >= item.remainingTickets) {
          alert("Der er ikke flere billetter tilgængelige for dette event.");
          return;
        }

        // Find det specifikke item i kurven
        const existingItem = items.find((i) => i.id === item.id && i.eventId === item.eventId);
        if (existingItem) {
          set({
            items: items.map((i) => (i.id === item.id && i.eventId === item.eventId ? { ...i, quantity: i.quantity + 1 } : i)),
          });
        } else {
          set({
            items: [...items, { ...item, quantity: 1 }],
          });
        }
      },

      updateItemQuantity: (id, eventId, newQuantity) => {
        const { items } = get();

        // Find den aktuelle item
        const itemToUpdate = items.find((item) => item.id === id && item.eventId === eventId);
        if (!itemToUpdate) return;

        // Samlet antal billetter for event uden denne item
        const totalQuantityExcludingCurrent = items.filter((i) => i.eventId === eventId && !(i.id === id)).reduce((sum, i) => sum + i.quantity, 0);

        // Hvis den nye ønskede quantity overstiger remainingTickets, bloker
        if (totalQuantityExcludingCurrent + newQuantity > itemToUpdate.remainingTickets) {
          alert("Der er ikke flere billetter tilgængelige for dette event.");
          return;
        }

        // Opdater eller fjern item hvis quantity 0
        if (newQuantity === 0) {
          set({
            items: items.filter((item) => !(item.id === id && item.eventId === eventId)),
          });
        } else {
          set({
            items: items.map((item) => (item.id === id && item.eventId === eventId ? { ...item, quantity: newQuantity } : item)),
          });
        }
      },

      // Tilføj clearCart funktion:
      clearCart: () => set({ items: [] }),
    }),
    { name: "storage" }
  )
);

export default cartStore;
