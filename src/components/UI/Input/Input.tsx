import styles from "./Input.module.css";

interface InputProps {
  type?: string;
  placeholder?: string;
  value?: string;
  name?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Input({
  type = "text",
  placeholder = "",
  value,
  name,
  onChange,
}: InputProps) {
  return (
    <input
      className={styles.input}
      type={type}
      placeholder={placeholder}
      name={name}
      value={value}
      onChange={onChange}
    />
  );
}
