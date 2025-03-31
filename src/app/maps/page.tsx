"use client";

import { MapMarker, useKakaoLoader } from "react-kakao-maps-sdk";
import { Map } from "react-kakao-maps-sdk";
import styles from "./page.module.css";
import { useRef, useState } from "react";
import Button from "@/components/Button";
import { useRouter } from "next/navigation";

const center = {
  lat: 36.763,
  lng: 127.282,
};

interface Position {
  lat: number;
  lng: number;
}

interface Marker {
  id: number;
  position: Position;
}

const test = {
  lat: 36.7688,
  lng: 127.2835,
};

const samplePostion = [
  {
    id: 1,
    position: {
      lat: 36.766,
      lng: 127.2845,
    },
  },
  {
    id: 2,
    position: {
      lat: 36.7655,
      lng: 127.2855,
    },
  },
  {
    id: 3,
    position: {
      lat: 36.7688,
      lng: 127.2835,
    },
  },
];

type RecommnedPosition = Marker[];

export default function KakaoMap() {
  useKakaoLoader({
    appkey: process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY as string,
    libraries: ["services", "clusterer", "drawing"],
  });
  const mapRef = useRef<kakao.maps.Map>(null);
  const [position, setPosition] = useState<RecommnedPosition>(samplePostion);
  const router = useRouter();

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
        {position.map((item) => (
          <MapMarker
            position={item.position}
            key={item.id}
            onClick={() => router.push(`/houseDetail/${item.id}`)}
          />
        ))}
      </Map>
    </div>
  );
}
