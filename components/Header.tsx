import React from "react";

const Header: React.FC = () => {
  return (
    <header className="flex justify-center items-center border p-4 h-16 bg-gray-100">
      <div className="text-xl font-bold">Chat + 
        <span className="text-blue-500 ml-2">{" "} chatbot</span>
      </div>
    </header>
  );
};

export default Header;
