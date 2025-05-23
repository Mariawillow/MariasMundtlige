"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

          const cartStore = create(
            persist(
              (set, get) => ({
                items: [],

                addItem: (item) => {
                    const existingItem = get().items.find(
                      (i) => i.id === item.id && i.eventId === item.eventId
                    );
                  
                    if (existingItem) {
                      return set({
                        items: get().items.map((i) =>
                          i.id === item.id && i.eventId === item.eventId
                            ? { ...i, quantity: i.quantity + 1 }
                            : i
                        ),
                      });
                    } else {
                      const newItem = {
                        id: item.id,
                        eventId: item.eventId,
                        name: item.name,
                        price: item.price,
                        eventTitle: item.eventTitle,
                        remainingTickets: item.remainingTickets,
                        bookedTickets: item.bookedTickets,
                        quantity: 1,
                      };
                      return set({
                        items: [...get().items, newItem],
                      });
                    }
                  },
          
                  updateItemQuantity: (id, eventId, newQuantity) => {
                    const updatedItems = get().items
                      .map((item) =>
                        item.id === id && item.eventId === eventId
                          ? { ...item, quantity: newQuantity }
                          : item
                      )
                      .filter((item) => item.quantity > 0);
                  
                    set({ items: updatedItems });
                },
              }),
              { name: "storage" }
            )
          );

export default cartStore;
