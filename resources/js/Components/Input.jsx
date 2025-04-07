const Input = ({
    label,
    name,
    type = "text",
    placeholder = "",
    minlength = "",
    error,
    value,
    onChange,
    className,
}) => {
    return (
        <div>
            <label htmlFor={name} className="block text-sm/6 font-medium ">
                {label}
            </label>
            <div className="mt-2">
                <input
                    id={name}
                    name={name}
                    className={`input ${className}`}
                    type={type}
                    value={value}
                    required
                    placeholder={placeholder}
                    minLength={minlength}
                    onChange={onChange}
                />
                {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
            </div>
        </div>
    );
};

export default Input;
