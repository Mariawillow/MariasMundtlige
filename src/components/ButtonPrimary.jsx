function ButtonPrimary({ variant = "primary", children }) {
    const baseStyles = "px-4 py-2 rounded text-white font-bold";
    const variants = {
        primary: "bg-blue-500 hover:bg-blue-600",
        secondary: "bg-gray-500 hover:bg-gray-600",
        danger: "bg-red-500 hover:bg-red-600",
    };

    return (
        <a className={`${baseStyles} ${variants[variant]}`}>
            {children}
        </a >
    );
}
export default ButtonPrimary;
