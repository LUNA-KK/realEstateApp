import styles from "./page.module.css";

export default function ChatbotLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className={styles.title}>챗봇</div>
      {children}
    </>
  );
}
