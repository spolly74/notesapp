// src/components/common/LoadingSpinner.js
export const LoadingSpinner = () => (
    <div className="flex justify-center items-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
    </div>
  );

  // src/components/common/ErrorAlert.js
  export const ErrorAlert = ({ message }) => (
    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
      <span className="block sm:inline">{message}</span>
    </div>
  );

  // src/components/common/Button.js
  export const Button = ({
    children,
    onClick,
    variant = 'primary',
    disabled = false,
    type = 'button'
  }) => {
    const baseStyles = "px-4 py-2 rounded font-semibold focus:outline-none focus:ring-2";
    const variants = {
      primary: "bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-300",
      secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-200",
      danger: "bg-red-500 text-white hover:bg-red-600 focus:ring-red-300"
    };

    return (
      <button
        type={type}
        onClick={onClick}
        disabled={disabled}
        className={`${baseStyles} ${variants[variant]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        {children}
      </button>
    );
  };
