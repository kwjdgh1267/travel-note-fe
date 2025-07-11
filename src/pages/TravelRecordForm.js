import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const TravelRecordForm = () => {
  const [title, setTitle] = useState('');
  const [photos, setPhotos] = useState([]);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setPhotos(Array.from(e.target.files));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || photos.length === 0) {
      alert("제목과 사진을 모두 입력해주세요.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    photos.forEach((file) => {
      formData.append("photos", file);
    });

    try {
      await axios.post("/records/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        },
        withCredentials: true
      });

      alert("여행 기록이 추가되었습니다.");
      navigate("/main");
    } catch (err) {
      console.error(err);
      alert("업로드 실패");
    }
  };

  return (
    <div style={{ padding: '20px', paddingBottom: '80px' }}>
      <h2>여행 기록 추가</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>여행 제목:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
          />
        </div>
        <div>
          <label>여행 사진 첨부:</label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileChange}
            style={{ marginBottom: '10px' }}
          />
        </div>
        <button type="submit" style={{ padding: '10px 20px' }}>
          여행 기록 추가하기
        </button>
      </form>
    </div>
  );
};

export default TravelRecordForm;
