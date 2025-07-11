import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './TravelRecordList.css';

const TravelRecordList = () => {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const response = await axios.get('http://localhost:8080/records', {
          withCredentials: true,
        });
        setRecords(response.data);
      } catch (error) {
        console.error('여행 기록 불러오기 실패:', error);
      }
    };

    fetchRecords();
  }, []);

  return (
    <div className="record-list-container">
      <h2>내 여행 기록</h2>
      <div className="record-list">
        {records.map((record) => (
          <div className="record-card" key={record.id}>
            <img
              src={`http://localhost:8080/images/${record.thumbnailPath}`}
              alt="thumbnail"
              className="thumbnail"
              onError={(e) => (e.target.style.display = 'none')}
            />
            <div className="record-info">
              <h3>{record.title}</h3>
              <p>{record.startDate.substring(0,10)} ~ {record.endDate.substring(0,10)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TravelRecordList;
