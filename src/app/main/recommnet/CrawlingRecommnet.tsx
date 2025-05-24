import useRegionCode from "@/app/store/useRegionCode";
import { useEffect, useState } from "react";

const CrawlingRecommnet = () => {
  const { code } = useRegionCode();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);

  const getRecomment = async (code: string) => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_PATH}/recomment?addrcode=${code}uid=a1000`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch recommendations");
      }
      const data = await response.json();
      setData(data);
    } catch (error) {
      console.error("Error fetching recommendations:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (code) {
      getRecomment("4413133000");
    } else {
      getRecomment(code);
    }
  }, [code]);

  return <div />;
};

export default CrawlingRecommnet;
