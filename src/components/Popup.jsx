"use client";

import Image from "next/image";
import { artImageHelper } from "@/lib/firstArtImgHelper";


const Popup = ({
  onClose,
  onConfirm,
  message,
  confirmText = "OK",
  cancelText = "Luk",
  showConfirm = false,
  selectedArtworks = [],
  toggleArtwork,
  tooManyArtworks = false,
}) => {
  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-xs flex items-center justify-center z-50">
      <div className="bg-[#bab0bc] p-10 text-center border-7 border-[#C4FF00] max-w-3xl mx-4 space-y-4">
        <p className="text-lg mb-6">{message}</p>

        {/* Liste over valgte værker som billeder */}
        <div className="flex flex-wrap gap-2 justify-center mb-4">
          {selectedArtworks.map((artwork) => (
            <div key={artwork.object_number} className="flex flex-col items-center">
              <div className="w-24 h-24 relative mb-1">
                <Image
                  src={artImageHelper(artwork)}
                  alt={`Værk ${artwork.object_number}`}
                  fill
                  className="object-cover"
                />

              </div>

              <button
                onClick={() => toggleArtwork(artwork.object_number)}
                className="px-2 py-1 bg-red-200 hover:bg-red-400 transition text-sm"
              >
                Fjern
              </button>
            </div>
          ))}
        </div>

        <div className="flex justify-center gap-4">
          {/* Hvis vi vil vise en Confirm-knap */}
          {showConfirm && (
            <button
              onClick={onConfirm}
              className="bg-red-600 px-4 py-2 text-white font-semibold hover:cursor-pointer"
            >
              {confirmText}
            </button>
          )}

          {/* Cancel / Luk-knap — vises kun hvis IKKE for mange værker */}
          {!tooManyArtworks && (
            <button
              onClick={onClose}
              className="bg-[#C4FF00] px-4 py-2 text-black font-semibold hover:cursor-pointer"
            >
              {cancelText}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Popup;
