import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const Input = ({ label, value, onChange, placeholder, type, isSelect, options }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="mb-4">
      <label
        className="block text-xs font-bold mb-1.5"
        style={{ color: "#374151" }}
      >
        {label}
      </label>
      <div className="relative">
        {isSelect ? (
          <select
            className="input-box"
            value={value}
            onChange={(e) => onChange(e)}
            style={{ appearance: "none" }}
          >
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        ) : (
          <input
            className="input-box"
            type={type === "password" ? (showPassword ? "text" : "password") : type}
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange(e)}
            style={{ paddingRight: type === "password" ? "44px" : "16px" }}
          />
        )}
        {type === "password" && (
          <span
            className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
            style={{ color: "#9CA3AF" }}
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
          </span>
        )}
      </div>
    </div>
  );
};

export default Input;