import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './TravelRecordDetail.css';

const groupPhotosByDate = (photos) => {
  const grouped = {};
  photos.forEach((photo) => {
    const date = photo.takenDate.split(' ')[0]; // "YYYY-MM-DD"
    if (!grouped[date]) {
      grouped[date] = [];
    }
    grouped[date].push(photo);
  });

  // 날짜 오름차순 정렬
  const sorted = {};
  Object.keys(grouped)
    .sort((a, b) => new Date(a) - new Date(b))  // 오름차순 정렬
    .forEach((key) => {
      sorted[key] = grouped[key];
    });

  return sorted;
};

const TravelRecordDetail = () => {
  const { id } = useParams();
  const [record, setRecord] = useState(null);
  const [groupedPhotos, setGroupedPhotos] = useState({});

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/records/${id}`, {
          withCredentials: true,
        });
        setRecord(response.data);
        const grouped = groupPhotosByDate(response.data.photos);
        setGroupedPhotos(grouped);
      } catch (error) {
        console.error('기록 상세 조회 실패:', error);
      }
    };

    fetchDetail();
  }, [id]);

  return record ? (
    <div className="record-detail-container">
      <h2>{record.title}</h2>
      <p>{record.startDate.split(' ')[0]} ~ {record.endDate.split(' ')[0]}</p>

      {Object.entries(groupedPhotos).map(([date, photos], index) => (
        <div key={date} className="daily-section">
          <h3>{index + 1}일차 - {date}</h3>
          <div className="photo-grid">
            {photos.map((photo, idx) => (
              <img
                key={idx}
                src={`http://localhost:8080/images/${photo.filePath}`}
                alt={`photo-${idx}`}
                className="detail-photo"
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  ) : (
    <p>기록을 불러오는 중입니다...</p>
  );
};

export default TravelRecordDetail;
