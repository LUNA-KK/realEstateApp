import BottomNavigation from "@/components/UI/BottomNavigation/BottomNavigation";
import styles from "./layout.module.css";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.container}>
      {children}
      <BottomNavigation />
    </div>
  );
}
