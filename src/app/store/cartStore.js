"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

const cartStore = create(
  persist(
    (set) => ({
      items: [],

      //Tilføjelse af item
      addItem: (item) =>
        set((state) => {
          // Tjekker om produktet allerede er i arrayet (kurven)
          const existingItem = state.items.find((i) => i.id === item.id);

          if (existingItem) {
            // Hvis produktet findes, opdateres antallet i arrayet (kurven)
            return {
              items: state.items.map((i) => (i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i)),
            };
          } else {
            // Hvis produktet ikke findes, tilføj det til arrayet (kurven)
            return {
              items: state.items.concat({ ...item, quantity: 1 }),
            };
          }
        }),

      //Fjernelse af item
      removeItem: (itemToRemove) =>
        // Filtrer elementer i listen og fjern det som matcher, og laver et nyt array uden dét
        set((state) => ({
          items: state.items.filter((item) => item.id !== itemToRemove.id),
        })),

      updateItemQuantity: (id, newQuantity) =>
        // Gennemgår alle elementer i listen
        // Hvis et elements id matcher det givne id, opdateres dets quantity ellers returneres elementet uændret
        set((state) => ({
          items: state.items.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)),
        })),
    }),
    { name: "storage" }
  )
);

export default cartStore;
