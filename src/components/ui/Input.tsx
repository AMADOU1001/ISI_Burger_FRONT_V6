import React from "react";
interface InputProps {
  type: string;
  id: string;
  name: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  error?: string;
}
const Input: React.FC<InputProps> = ({
  type,
  id,
  name,
  label,
  value,
  onChange,
  placeholder = "",
  required = false,
  error
}) => {
  return <div className="mb-4">
      <label htmlFor={id} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input type={type} id={id} name={name} className={`bg-gray-50 border ${error ? "border-red-500" : "border-gray-300"} text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500`} placeholder={placeholder} value={value} onChange={onChange} required={required} />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>;
};
export default Input;