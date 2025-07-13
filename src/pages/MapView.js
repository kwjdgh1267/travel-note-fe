import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';

const MapView = () => {
  const mapRef = useRef(null);
  const [records, setRecords] = useState([]);

  useEffect(() => {
    const loadKakaoMap = () => {
      if (window.kakao && window.kakao.maps) {
        window.kakao.maps.load(initMap);
      } else {
        const script = document.createElement('script');
        script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=9f96100d750d13516eb74513f26aa6e2&autoload=false`;
        script.async = true;
        script.onload = () => window.kakao.maps.load(initMap);
        document.head.appendChild(script);
      }
    };

    loadKakaoMap();
  }, []);

  const initMap = async () => {
    try {
      const res = await axios.get('http://localhost:8080/records', {
        withCredentials: true,
      });
      setRecords(res.data);

      const mapContainer = mapRef.current;
      const options = {
        center: new window.kakao.maps.LatLng(36.5, 127.5),
        level: 13,
      };
      const map = new window.kakao.maps.Map(mapContainer, options);

      res.data.forEach((record) => {
        if (record.latitude && record.longitude) {
          const marker = new window.kakao.maps.Marker({
            map,
            position: new window.kakao.maps.LatLng(record.latitude, record.longitude),
          });

          const infowindow = new window.kakao.maps.InfoWindow({
            content: `
              <div style="width:150px;padding:6px 0;text-align:center">
                <strong>${record.title}</strong><br/>
                <img src="http://localhost:8080/images/${record.thumbnailPath}" width="100" /><br/>
                ${record.startDate} ~ ${record.endDate}
              </div>
            `,
          });

          window.kakao.maps.event.addListener(marker, 'click', () => {
            infowindow.open(map, marker);
          });
        }
      });
    } catch (err) {
      console.error('지도 데이터 로딩 실패:', err);
    }
  };

  return (
    <div style={{ width: '100%', height: '90vh' }}>
      <div ref={mapRef} style={{ width: '100%', height: '100%' }} />
    </div>
  );
};

export default MapView;
