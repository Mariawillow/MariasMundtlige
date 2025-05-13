"use client"

import * as React from "react"
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu"

export const DropdownMenu = DropdownMenuPrimitive.Root

export const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger

export function DropdownMenuContent({ className = "", sideOffset = 4, ...props }) {
  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content
        sideOffset={sideOffset}
        className={`bg-white text-[var(--textcolor)] shadow-md border border-black rounded p-[var(--space-xs)] z-50 min-w-[8rem] ${className}`}
        {...props}
      />
    </DropdownMenuPrimitive.Portal>
  )
}

export function DropdownMenuLabel({ className = "", ...props }) {
  return (
    <DropdownMenuPrimitive.Label
      className={`text-sm font-semibold px-[var(--space-xs)] py-[var(--space-2xs)] ${className}`}
      {...props}
    />
  )
}

export function DropdownMenuSeparator({ className = "", ...props }) {
  return (
    <DropdownMenuPrimitive.Separator
      className={`my-[var(--space-xs)] h-px bg-gray-300 ${className}`}
      {...props}
    />
  )
}

export function DropdownMenuItem({ className = "", ...props }) {
  return (
    <DropdownMenuPrimitive.Item
      className={`cursor-pointer px-[var(--space-xs)] py-[var(--space-2xs)] hover:bg-gray-100 rounded text-sm ${className}`}
      {...props}
    />
  )
}
