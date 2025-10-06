import React from "react";

const Button = ({ onBuy, label = "Buy Now" }) => {
    const handleClick = async () => {
        await onBuy?.();
    }

    return (
        <button
            onClick={handleClick}
            className={`px-6 py-2 rounded-xl text-white font-semibold shadow-md transition-colors duration-200 bg-blue-600 hover:bg-blue-700`}>
            {label}
        </button>
    );
};

export default Button;
