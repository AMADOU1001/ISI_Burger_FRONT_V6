import React from "react";
interface ButtonProps {
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary" | "danger" | "success";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  onClick?: () => void;
  disabled?: boolean;
}
const Button: React.FC<ButtonProps> = ({
  children,
  type = "button",
  variant = "primary",
  size = "md",
  fullWidth = false,
  onClick,
  disabled = false
}) => {
  const baseClasses = "font-medium rounded-lg focus:ring-4 focus:outline-none transition-all duration-300";
  const variantClasses = {
    primary: "bg-orange-500 hover:bg-orange-600 text-white focus:ring-orange-300",
    secondary: "bg-gray-200 hover:bg-gray-300 text-gray-800 focus:ring-gray-200",
    danger: "bg-red-500 hover:bg-red-600 text-white focus:ring-red-300",
    success: "bg-green-500 hover:bg-green-600 text-white focus:ring-green-300"
  };
  const sizeClasses = {
    sm: "py-1 px-3 text-sm",
    md: "py-2 px-4 text-base",
    lg: "py-3 px-6 text-lg"
  };
  const widthClass = fullWidth ? "w-full" : "";
  const disabledClass = disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer";
  return <button type={type} className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${widthClass} ${disabledClass}`} onClick={onClick} disabled={disabled}>
      {children}
    </button>;
};
export default Button;