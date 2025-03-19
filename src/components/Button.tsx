import styles from "./Button.module.css";

interface ButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  classname?: string;
}

export default function Button({ onClick, children, classname }: ButtonProps) {
  return (
    <button className={classname ? classname : styles.button} onClick={onClick}>
      {children}
    </button>
  );
}
