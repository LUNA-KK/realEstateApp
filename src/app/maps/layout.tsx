import TopNavigation from "@/components/UI/TopNavigation/TopNavigation";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <TopNavigation />
      {children}
    </div>
  );
}
