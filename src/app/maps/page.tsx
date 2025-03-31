"use client";

import { MapMarker, useKakaoLoader } from "react-kakao-maps-sdk";
import { Map } from "react-kakao-maps-sdk";
import styles from "./page.module.css";
import { useRef, useState } from "react";

const center = {
  lat: 36.763,
  lng: 127.282,
};

interface Position {
  lat: number;
  lng: number;
}

type RecommnedPosition = Position[];

export default function KakaoMap() {
  useKakaoLoader({
    appkey: process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY as string,
    libraries: ["services", "clusterer", "drawing"],
  });
  const mapRef = useRef<kakao.maps.Map>(null);
  const [position, setPosition] = useState<RecommnedPosition>([]);

  return (
    <div className={styles.container}>
      <Map
        style={{
          width: "100%",
          height: "100%",
        }}
        center={center}
        level={4}
        ref={mapRef}
      >
        <MapMarker position={center} />
        {position.map((item) => (
          <div>{item.lat}</div>
        ))}
      </Map>
    </div>
  );
}
