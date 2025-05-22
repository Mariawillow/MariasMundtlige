// components/Popup.js
const Popup = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white p-10 text-center shadow-xl max-w-md w-full border-10 border-[#C4FF00]">
        <h2 className="text-xl font-bold mb-4">Tak for din booking!</h2>
        <p className="mb-6">Vi glæder os til at se dig</p>
        <button
          onClick={onClose}
          className="bg-[#C4FF00] px-4 py-2 rounded text-black font-semibold"
        >
          Luk
        </button>
      </div>
    </div>
  );
};

export default Popup;
