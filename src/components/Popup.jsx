const Popup = ({ onClose, message }) => {
  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-xs flex items-center justify-center z-50">
      <div className="bg-[#bab0bc] p-10 text-center border-7 border-[#C4FF00] max-w-md mx-4 rounded-lg">
        <p className="text-lg mb-6">{message}</p>
        <button onClick={onClose} className="bg-[#C4FF00] px-4 py-2 rounded text-black font-semibold hover:cursor-pointer">
          Luk
        </button>
      </div>
    </div>
  );
};

export default Popup;
