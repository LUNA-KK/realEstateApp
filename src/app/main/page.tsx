import Button from "@/components/Button";
import Image from "next/image";
import Recommend from "./recommend";

export default function Main() {
  return (
    <div>
      <Button>
        <Image src="/marker-main.svg" alt="marker 1" width={20} height={20} />
        지도로 보기
      </Button>
      <Recommend />
    </div>
  );
}
