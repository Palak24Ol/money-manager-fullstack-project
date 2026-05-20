import { X } from "lucide-react";

const Modal = ({ isOpen, onClose, children, title }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-black/40 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-lg mx-4 max-h-[90vh]">
        <div
          className="bg-white rounded-3xl shadow-2xl overflow-hidden"
          style={{ border: "1.5px solid rgba(0,0,0,0.06)" }}
        >
          {/* Header */}
          <div
            className="flex items-center justify-between px-6 py-5 border-b"
            style={{ borderColor: "#F7F2EB" }}
          >
            <h3 className="text-lg font-extrabold" style={{ color: "#1A2332" }}>
              {title}
            </h3>
            <button
              onClick={onClose}
              className="w-9 h-9 flex items-center justify-center rounded-xl transition-colors"
              style={{ background: "#F7F2EB", color: "#6B7280" }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "#FDEEF1"; e.currentTarget.style.color = "#F05D73"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "#F7F2EB"; e.currentTarget.style.color = "#6B7280"; }}
            >
              <X size={16} />
            </button>
          </div>

          {/* Body */}
          <div className="px-6 py-5 overflow-y-auto max-h-[70vh]">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;