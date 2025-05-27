"use client";

import { MapMarker, useKakaoLoader } from "react-kakao-maps-sdk";
import { Map } from "react-kakao-maps-sdk";
import styles from "./page.module.css";
import { useEffect, useRef, useState, useMemo } from "react";
import Script from "next/script";
import { useRouter } from "next/navigation";
import { authFetch } from "../util/authFetch";
import useRegionCode from "../store/useRegionCode";

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

interface AddressAndId {
  id: number;
  address: string;
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

const MarkerList = ({
  geocoder,
}: {
  geocoder: kakao.maps.services.Geocoder;
}) => {
  const { code } = useRegionCode();
  const [position, setPosition] = useState<RecommnedPosition>(
    code === "4413133000" ? samplePostion : []
  );
  const router = useRouter();

  useEffect(() => {
    // geocoder가 준비되면 한 번만 실행
    if (!geocoder) return;

    const handleGeocode = async (items: AddressAndId[]) => {
      const positions: Marker[] = [];
      for (const { address, id } of items) {
        const result = await new Promise<Marker | null>((resolve) => {
          geocoder.addressSearch(address, (res, status) => {
            if (status === kakao.maps.services.Status.OK && res[0]) {
              const { x, y } = res[0];
              resolve({
                id,
                position: { lat: parseFloat(y), lng: parseFloat(x) },
              });
            } else {
              resolve(null);
            }
          });
        });
        if (result) {
          positions.push(result);
          console.log(positions.map((pos) => pos.id));
        }
      }
      setPosition((prev) => [...positions, ...prev]);
    };

    const getList = async () => {
      try {
        const allList = await Promise.all(
          Array.from({ length: 20 }, (_, i) =>
            authFetch({
              url: `/api/house-board/create?page=${i}&addrCode=${code}`,
            })
          )
        );
        const responses = await Promise.all(
          allList.map((r) => {
            if (!r.ok) throw new Error("Network response was not ok");
            return r.json();
          })
        );
        const addressAndIds = responses.flatMap((res) =>
          res.content.map((item: any) => ({
            id: item.pid,
            address: item.address,
          }))
        );
        await handleGeocode(addressAndIds);
      } catch (error) {
        console.error("Error fetching or processing data:", error);
      }
    };

    getList();
  }, []); // geocoder가 준비된 후에만 실행

  return (
    <>
      {position.map((item) => (
        <MapMarker
          position={item.position}
          key={item.id}
          onClick={() => router.push(`/houseDetail/${item.id}`)}
        />
      ))}
    </>
  );
};

export default function KakaoMap() {
  useKakaoLoader({
    appkey: process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY as string,
    libraries: ["services", "clusterer", "drawing"],
  });

  const mapRef = useRef<kakao.maps.Map>(null);

  // geocoder 인스턴스를 useMemo로 한 번만 생성
  const geocoder =
    typeof kakao !== "undefined" ? new kakao.maps.services.Geocoder() : null;

  return (
    <div className={styles.container}>
      <Script
        src="https://oapi.map.naver.com/openapi/v3/maps.js?ncpClientId=YOUR_CLIENT_ID&submodules=geocoder"
        strategy="afterInteractive"
      />
      <Map
        style={{
          width: "100%",
          height: "100%",
        }}
        center={center}
        level={4}
        ref={mapRef}
      >
        {geocoder && <MarkerList geocoder={geocoder} />}
      </Map>
    </div>
  );
}
