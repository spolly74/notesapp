// src/components/common/Button.js
import React from 'react';

export const Button = ({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  size = 'medium',
  disabled = false,
  className = '',
  fullWidth = false,
  icon = null,
}) => {
  // Base styles
  const baseStyles = "inline-flex items-center justify-center font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-200";

  // Size variations
  const sizes = {
    small: 'px-3 py-1.5 text-sm',
    medium: 'px-4 py-2 text-base',
    large: 'px-6 py-3 text-lg'
  };

  // Variant styles
  const variants = {
    primary: `bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500
              disabled:bg-blue-300`,
    secondary: `bg-gray-200 text-gray-700 hover:bg-gray-300 focus:ring-gray-500
                disabled:bg-gray-100 disabled:text-gray-400`,
    danger: `bg-red-600 text-white hover:bg-red-700 focus:ring-red-500
             disabled:bg-red-300`,
    outline: `border border-gray-300 bg-white text-gray-700 hover:bg-gray-50
              focus:ring-blue-500 disabled:bg-gray-50 disabled:text-gray-400`
  };

  // Combine classes
  const buttonClasses = `
    ${baseStyles}
    ${sizes[size]}
    ${variants[variant]}
    ${fullWidth ? 'w-full' : ''}
    ${className}
  `;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={buttonClasses}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </button>
  );
};

// Optional: Create preset button variations
export const IconButton = ({
  icon,
  onClick,
  variant = 'outline',
  size = 'medium',
  disabled = false,
  className = ''
}) => {
  return (
    <Button
      onClick={onClick}
      variant={variant}
      size={size}
      disabled={disabled}
      className={`p-2 ${className}`}
    >
      {icon}
    </Button>
  );
};

// Usage Examples:
/*
  <Button>Default Button</Button>
  <Button variant="secondary">Secondary Button</Button>
  <Button variant="danger">Danger Button</Button>
  <Button size="small">Small Button</Button>
  <Button size="large">Large Button</Button>
  <Button fullWidth>Full Width Button</Button>
  <Button
    icon={<svg className="w-4 h-4" viewBox="0 0 24 24">...</svg>}
  >
    Button with Icon
  </Button>
  <IconButton
    icon={<svg className="w-4 h-4" viewBox="0 0 24 24">...</svg>}
  />
*/
