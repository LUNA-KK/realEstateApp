import TopNavigation from "@/components/UI/TopNavigation/TopNavigation";

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <>
      <TopNavigation />
      {children}
    </>
  );
}
