import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Modal from 'react-modal';
import './TravelRecordDetail.css';

Modal.setAppElement('#root');  // accessibility 설정

const groupPhotosByDate = (photos) => {
  const grouped = {};
  photos.forEach((photo) => {
    const date = photo.takenDate.split(' ')[0];
    if (!grouped[date]) grouped[date] = [];
    grouped[date].push(photo);
  });

  const sorted = {};
  Object.keys(grouped)
    .sort((a, b) => new Date(a) - new Date(b))
    .forEach((key) => {
      sorted[key] = grouped[key];
    });

  return sorted;
};

const TravelRecordDetail = () => {
  const { id } = useParams();
  const [record, setRecord] = useState(null);
  const [groupedPhotos, setGroupedPhotos] = useState({});
  const [memos, setMemos] = useState({});
  const [modalDate, setModalDate] = useState(null);
  const [modalContent, setModalContent] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchDetail = async () => {
      const res = await axios.get(`http://localhost:8080/records/${id}`, { withCredentials: true });
      setRecord(res.data);
      setGroupedPhotos(groupPhotosByDate(res.data.photos));
    };
    const fetchMemos = async () => {
      const res = await axios.get(`http://localhost:8080/records/${id}/memos`, { withCredentials: true });
      const memoMap = {};
      res.data.forEach(m => memoMap[m.date] = m.content);
      setMemos(memoMap);
    };

    fetchDetail();
    fetchMemos();
  }, [id]);

  const openMemoModal = (date) => {
    setModalDate(date);
    setModalContent(memos[date] || '');
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const saveMemo = async () => {
    try {
      await axios.post(
        `http://localhost:8080/records/${id}/memos`,
        { date: modalDate, content: modalContent },
        { withCredentials: true }
      );
      setMemos(prev => ({ ...prev, [modalDate]: modalContent }));
      closeModal();
    } catch (err) {
      console.error('메모 저장 실패:', err);
    }
  };

  return record ? (
    <div className="record-detail-container">
      <h2>{record.title}</h2>
      <p>{record.startDate.split(' ')[0]} ~ {record.endDate.split(' ')[0]}</p>

      {Object.entries(groupedPhotos).map(([date, photos], index) => (
        <div key={date} className="daily-section">
          <h3>{index + 1}일차 - {date}</h3>
          <button className="memo-button" onClick={() => openMemoModal(date)}>
            메모 보기/작성
          </button>
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

      <Modal isOpen={isModalOpen} onRequestClose={closeModal} contentLabel="메모 작성" className="modal" overlayClassName="overlay">
        <h2>{modalDate} 메모</h2>
        <textarea
          rows="5"
          value={modalContent}
          onChange={(e) => setModalContent(e.target.value)}
          placeholder="이 날짜에 대한 메모를 작성하세요"
        />
        <div style={{ marginTop: '10px' }}>
          <button onClick={saveMemo}>저장</button>
          <button onClick={closeModal} style={{ marginLeft: '10px' }}>닫기</button>
        </div>
      </Modal>
    </div>
  ) : (
    <p>기록을 불러오는 중입니다...</p>
  );
};

export default TravelRecordDetail;
