import Link from "next/link";

// components/Popup.js
const Popup = ({ onClose, totalTickets }) => {
  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-xs flex items-center justify-center z-50">
      <div
        className="bg-[#bab0bc] p-40 ml-50 text-center w-full border-t-10 border-l-10 border-b-10 
  border-t-[#C4FF00] border-l-[#C4FF00] border-b-[#C4FF00]
  sm:p-40 sm:ml-50 
  sm:border-t-10 sm:border-l-10 sm:border-b-10 
  sm:border-t-[#C4FF00] sm:border-l-[#C4FF00] sm:border-b-[#C4FF00]
  "
      >
        <h2 className="text-xl font-bold mb-4">Tak for din booking!</h2>
        <p className="mb-6">
          Du har booket {totalTickets} billet{totalTickets !== 1 ? "ter" : ""}. Vi glæder os til at se dig
        </p>

        <Link href="/">
          <button onClick={onClose} className="bg-[#C4FF00] px-4 py-2 rounded text-black font-semibold hover:cursor-pointer">
            Luk
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Popup;
