import React from "react";

interface InputComponentProps {
  type: string;
  name: string;
  placeholder?: string;
  svgIcon: JSX.Element;
  className?: string; // Propriété optionnelle pour la classe personnalisée
}

const InputComponent: React.FC<InputComponentProps> = ({ type, name, placeholder, svgIcon,className }) => {
  return (
    <div className={`flex shadow-sm rounded-lg ${className ? className : ''}`}>
      <input
        className="py-1 px-8 py-4 w-full font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
        name={name}
        type={type}
        placeholder={placeholder}
      />
      <button
        className="py-1 rounded-e-lg text-white bg-green-300 flex justify-center items-center w-10 h-15"
      >
        {svgIcon}
      </button>
    </div>
  );
};

export default InputComponent;
