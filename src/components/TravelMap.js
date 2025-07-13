// src/components/TravelMap.js
import React, { useEffect, useRef } from 'react';

const TravelMap = ({ photos }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    if (!window.kakao || !window.kakao.maps) return;

    const center = photos.length > 0
      ? new window.kakao.maps.LatLng(photos[0].latitude, photos[0].longitude)
      : new window.kakao.maps.LatLng(37.5665, 126.9780); // 서울 기본 좌표

    const map = new window.kakao.maps.Map(mapRef.current, {
      center,
      level: 5,
    });

    photos.forEach((photo) => {
      const position = new window.kakao.maps.LatLng(photo.latitude, photo.longitude);

      const marker = new window.kakao.maps.Marker({
        position,
        map,
      });

      const content = `
        <div style="padding:5px;">
          <strong>${photo.takenDate.split(' ')[0]}</strong><br/>
          <img src="http://localhost:8080/images/${photo.filePath}" style="width:80px; height:80px; object-fit:cover;"/>
        </div>
      `;

      const infowindow = new window.kakao.maps.InfoWindow({ content });

      window.kakao.maps.event.addListener(marker, 'click', () => {
        infowindow.open(map, marker);
      });
    });
  }, [photos]);

  return (
    <div>
      <h3>여행 지도</h3>
      <div
        ref={mapRef}
        style={{ width: '100%', height: '400px', borderRadius: '12px', marginBottom: '20px' }}
      />
    </div>
  );
};

export default TravelMap;
