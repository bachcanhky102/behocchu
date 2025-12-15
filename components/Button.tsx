import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'success';
  size?: 'md' | 'lg';
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  ...props 
}) => {
  const baseStyles = "rounded-full font-bold shadow-lg transition-transform hover:scale-105 active:scale-95 border-b-4";
  
  const variants = {
    primary: "bg-blue-500 hover:bg-blue-400 text-white border-blue-700",
    secondary: "bg-white hover:bg-gray-50 text-gray-700 border-gray-300",
    success: "bg-green-500 hover:bg-green-400 text-white border-green-700",
  };

  const sizes = {
    md: "px-6 py-2 text-lg",
    lg: "px-10 py-4 text-2xl",
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
