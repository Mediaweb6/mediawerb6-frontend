import React, { useState } from "react";
import { FaPhoneAlt, FaWhatsapp, FaComments } from "react-icons/fa";

const FloatingContact: React.FC = () => {
  const [open, setOpen] = useState(false);

  const phoneNumber = "+918807202037"; // 👉 replace with your real phone number
  const contactName = "Media Web 6 Services"; // 👉 replace with your company name

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Toggle Button */}
      <button
        onClick={() => setOpen(!open)}
        className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-4 rounded-full shadow-lg hover:scale-110 transition-all"
      >
        <FaComments size={24} />
      </button>

      {/* Contact Options */}
      {open && (
        <div className="bg-white shadow-2xl rounded-2xl mt-3 p-4 w-56 text-center border border-gray-200 animate-slide-up">
          <h3 className="font-semibold text-lg text-gray-800 mb-2">Get in Touch</h3>
          <p className="text-sm text-gray-600 mb-3">{contactName}</p>

          {/* Call */}
          <a
            href={`tel:${phoneNumber}`}
            className="flex items-center justify-center gap-2 bg-green-500 text-white py-2 px-4 rounded-xl mb-2 hover:bg-green-600 transition-all"
          >
            <FaPhoneAlt /> Call Us
          </a>

          {/* WhatsApp */}
          <a
            href={`https://wa.me/${phoneNumber.replace("+", "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 bg-[#25D366] text-white py-2 px-4 rounded-xl hover:bg-[#1ebe5d] transition-all"
          >
            <FaWhatsapp /> WhatsApp
          </a>

          <p className="text-xs text-gray-500 mt-3">{phoneNumber}</p>
        </div>
      )}
    </div>
  );
};

export default FloatingContact;
