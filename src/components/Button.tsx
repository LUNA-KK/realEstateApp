import styles from "./Button.module.css";

interface ButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  classname?: string;
  disabled?: boolean;
}

export default function Button({
  onClick,
  children,
  classname,
  disabled = false,
}: ButtonProps) {
  return (
    <button
      className={
        classname ? classname : disabled ? styles.disable : styles.button
      }
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
