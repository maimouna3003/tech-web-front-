import React from "react";

interface ButtonComponentProps {
  textButton: string;
  svgIcon?: JSX.Element;
  className?: string; // Propriété optionnelle pour la classe personnalisée
}

const ButtonComponent: React.FC<ButtonComponentProps> = ({ textButton, svgIcon,className }) => {
  return (
    <button
    className="mt-5 tracking-wide font-semibold bg-green-400 text-white-500 w-full py-4 rounded-lg hover:bg-green-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
    <span className="ml-">
        {textButton}
    </span>
</button>
  );
};

export default ButtonComponent;
