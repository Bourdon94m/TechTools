import React, { useState, useRef, useEffect } from "react";
import { Bell, X } from "lucide-react";

const NotificationButton = ({ notifications = [] }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <button
        className="relative p-2 text-gray-600 transition-all duration-300 ease-in-out transform hover:scale-110 focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Bell
          size={24}
          className={`transition-all duration-300 ${
            isOpen ? "text-blue-500 animate-wiggle" : ""
          }`}
        />
        {notifications.length > 0 && (
          <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-500 rounded-full">
            {notifications.length}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl z-50 overflow-hidden transition-all duration-300 ease-in-out transform origin-top-right">
          <div className="p-4 bg-gray-100 flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-700">
              Notifications
            </h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <X size={20} />
            </button>
          </div>
          <ul className="divide-y divide-gray-200 max-h-80 overflow-y-auto">
            {notifications.length > 0 ? (
              notifications.map((notification, index) => (
                <li
                  key={index}
                  className="p-4 hover:bg-gray-50 transition-colors duration-150 ease-in-out"
                >
                  <p className="text-sm text-gray-600">
                    {notification.message}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    {notification.time}
                  </p>
                </li>
              ))
            ) : (
              <li className="p-4 text-center text-gray-500">
                Aucune nouvelle notification
              </li>
            )}
          </ul>
          {notifications.length > 0 && (
            <div className="p-4 bg-gray-100">
              <button className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-150 ease-in-out">
                Marquer tout comme lu
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationButton;
