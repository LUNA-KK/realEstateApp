"use client";

import { useKakaoLoader } from "react-kakao-maps-sdk";
import { Map } from "react-kakao-maps-sdk";
import styles from "./page.module.css";

export default function KakaoMap() {
  useKakaoLoader({
    appkey: process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY as string,
    libraries: ["services", "clusterer", "drawing"],
  });

  return (
    <div className={styles.container}>
      <Map
        style={{
          width: "100%",
          height: "100%",
        }}
        center={{
          lat: 37.5665,
          lng: 126.978,
        }}
        level={3}
      />
    </div>
  );
}
