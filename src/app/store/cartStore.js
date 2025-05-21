"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

// const cartStore = create(
//   persist(
//     (set) => ({
//       items: [
        
            // {
            //   id: "1",
            //   name: "Voksne",
            //   price: 170,
            //   quantity: 0
            // },
            // {
            //   id: "2",
            //   name: "Studerende",
            //   price: 90,
            //   quantity: 0
            // }
        //   ],

          const cartStore = create(
            persist(
              (set, get) => ({
                items: [],
          
                addItem: (item) => {
                  const existingItem = get().items.find((i) => i.id === item.id);
          
                  if (existingItem) {
                    return set({
                      items: get().items.map((i) =>
                        i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
                      ),
                    });
                  } else {
                    return set({
                      items: [...get().items, { ...item, quantity: 1 }],
                    });
                  }
                },
          
                removeItem: (itemToRemove) =>
                  set((state) => ({
                    items: state.items.filter((item) => item.id !== itemToRemove.id),
                  })),
          
                updateItemQuantity: (id, newQuantity) => {
                  const updatedItems = get().items
                    .map((item) =>
                      item.id === id ? { ...item, quantity: newQuantity } : item
                    )
                    .filter((item) => item.quantity > 0); // Fjern items med 0 igen
          
                  set({ items: updatedItems });
                },
              }),
              { name: "storage" }
            )
          );

//       //Tilføjelse af item
//       addItem: (item) =>
//         set((state) => {
//           // Tjekker om produktet allerede er i arrayet (kurven)
//           const existingItem = state.items.find((i) => i.id === item.id);

//           if (existingItem) {
//             // Hvis produktet findes, opdateres antallet i arrayet (kurven)
//             return {
//               items: state.items.map((i) => (i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i)),
//             };
//           } else {
//             // Hvis produktet ikke findes, tilføj det til arrayet (kurven)
//             return {
//               items: state.items.concat({ ...item, quantity: 0 }),
//             };
//           }
//         }),

//       //Fjernelse af item
//       removeItem: (itemToRemove) =>
//         // Filtrer elementer i listen og fjern det som matcher, og laver et nyt array uden dét
//         set((state) => ({
//           items: state.items.filter((item) => item.id !== itemToRemove.id),
//         })),

//       updateItemQuantity: (id, newQuantity) =>
//         // Gennemgår alle elementer i listen
//         // Hvis et elements id matcher det givne id, opdateres dets quantity ellers returneres elementet uændret
//         set((state) => ({
//           items: state.items.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)),
//         })),
//     }),
//     { name: "storage" }
//   )
// );

export default cartStore;
