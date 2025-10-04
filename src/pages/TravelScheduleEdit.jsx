import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import Navigation from '../components/Navigation';
import ImageUploader from '../components/ImageUploader';
import LocationSearchModal from '../components/LocationSearchModal';
import ConfirmModal from '../components/ConfirmModal';
import DayPlaceList from '../components/DayPlaceList';
import OptionButtonGroup from '../components/OptionButtonGroup';

const TravelScheduleEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  // 현재 로그인된 사용자 정보 가져오기
  const getCurrentUser = () => {
    try {
      const loginData = localStorage.getItem('loginData') || sessionStorage.getItem('loginData');
      return loginData ? JSON.parse(loginData) : null;
    } catch (error) {
      console.error('사용자 정보 가져오기 오류:', error);
      return null;
    }
  };

  // 폼 상태
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    region: '',
    transportation: [],
    companions: '',
    accommodation: '',
    representativeImage: '',
  });

  // 장소 검색 관련 상태
  const [showLocationSearch, setShowLocationSearch] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [targetDay, setTargetDay] = useState(1);

  // 선택된 장소들 관리 (일차별)
  const [dailyPlaces, setDailyPlaces] = useState({
    1: [] // 1일차부터 시작
  });

  // 현재 활성화된 일차 수
  const [activeDays, setActiveDays] = useState(1);

  // 날짜 정보
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  // 기존 데이터 로드
  useEffect(() => {
    const loadScheduleData = () => {
      try {
        const savedSchedules = JSON.parse(localStorage.getItem('userSchedules') || '[]');
        const scheduleToEdit = savedSchedules.find(schedule => schedule.id === id);

        if (scheduleToEdit) {
          setFormData({
            title: scheduleToEdit.title || '',
            description: scheduleToEdit.description || '',
            region: scheduleToEdit.region || '',
            transportation: scheduleToEdit.transportation || [],
            companions: scheduleToEdit.companions || '',
            accommodation: scheduleToEdit.accommodation || '',
            representativeImage: scheduleToEdit.image || '',
          });

          setStartDate(scheduleToEdit.startDate || '');
          setEndDate(scheduleToEdit.endDate || '');
          setActiveDays(scheduleToEdit.totalDays || 1);
          setDailyPlaces(scheduleToEdit.places || { 1: [] });
        }
      } catch (error) {
        console.error('일정 데이터 로드 실패:', error);
      }
    };

    if (id) {
      loadScheduleData();
    }
  }, [id]);

  // 추천 장소 데이터
  const recommendedPlaces = [
    { id: 1, name: '경복궁', region: '서울', category: '역사', rating: 4.5, image: 'https://picsum.photos/300/200?random=1' },
    { id: 2, name: 'N서울타워', region: '서울', category: '야경', rating: 4.3, image: 'https://picsum.photos/300/200?random=2' },
    { id: 3, name: '홍대입구', region: '서울', category: '데이트', rating: 4.2, image: 'https://picsum.photos/300/200?random=3' },
    { id: 4, name: '해운대해수욕장', region: '부산', category: '휴양지', rating: 4.6, image: 'https://picsum.photos/300/200?random=4' },
    { id: 5, name: '감천문화마을', region: '부산', category: '체험', rating: 4.4, image: 'https://picsum.photos/300/200?random=5' },
    { id: 6, name: '제주올레길', region: '제주', category: '자연', rating: 4.7, image: 'https://picsum.photos/300/200?random=6' },
    { id: 7, name: '성산일출봉', region: '제주', category: '자연', rating: 4.8, image: 'https://picsum.photos/300/200?random=7' },
    { id: 8, name: '명동교자', region: '서울', category: '음식점', rating: 4.1, image: 'https://picsum.photos/300/200?random=8' },
    { id: 9, name: '스타벅스 압구정점', region: '서울', category: '카페', rating: 4.0, image: 'https://picsum.photos/300/200?random=9' },
    { id: 10, name: '롯데월드', region: '서울', category: '키즈', rating: 4.5, image: 'https://picsum.photos/300/200?random=10' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // 이미지 업로드/삭제 핸들러
  const handleImageUpload = (imageUrl) => {
    setFormData(prev => ({ ...prev, representativeImage: imageUrl }));
  };

  const handleImageRemove = () => {
    setFormData(prev => ({ ...prev, representativeImage: '' }));
  };

  const addLocation = (day = 1) => {
    setTargetDay(day);
    setShowLocationSearch(true);
  };

  // 장소 선택 핸들러
  const handlePlaceSelect = (place) => {
    setSelectedPlace(place);
    setShowConfirmModal(true);
    setShowLocationSearch(false);
  };

  // 기존 장소 카드 클릭 시 재선택
  const handleExistingPlaceClick = (day) => {
    setTargetDay(day);
    setShowLocationSearch(true);
  };

  // 장소 추가 확정
  const confirmAddPlace = () => {
    if (!selectedPlace) return;

    setDailyPlaces(prev => ({
      ...prev,
      [targetDay]: [...(prev[targetDay] || []), { ...selectedPlace, addedAt: Date.now() }]
    }));

    setShowConfirmModal(false);
    setSelectedPlace(null);
  };

  // 일차 추가 함수
  const addDay = () => {
    const newDay = activeDays + 1;
    setActiveDays(newDay);
    setDailyPlaces(prev => ({
      ...prev,
      [newDay]: []
    }));
  };

  // 일차 제거 함수
  const removeDay = (day) => {
    if (day === 1 || activeDays <= 1) return;

    const newDailyPlaces = { ...dailyPlaces };
    delete newDailyPlaces[day];

    const reorderedPlaces = {};
    let newDayCounter = 1;

    for (let i = 1; i <= activeDays; i++) {
      if (i !== day && newDailyPlaces[i]) {
        reorderedPlaces[newDayCounter] = newDailyPlaces[i];
        newDayCounter++;
      }
    }

    setDailyPlaces(reorderedPlaces);
    setActiveDays(activeDays - 1);
  };

  const handleSubmit = () => {
    // 검증 로직
    if (!formData.title.trim()) {
      alert('여행 제목을 입력해주세요.');
      return;
    }

    if (!formData.description.trim()) {
      alert('여행 설명을 입력해주세요.');
      return;
    }

    if (!formData.region) {
      alert('여행 지역을 선택해주세요.');
      return;
    }

    if (formData.transportation.length === 0) {
      alert('교통수단을 최소 1개 이상 선택해주세요.');
      return;
    }

    if (!formData.accommodation.trim()) {
      alert('숙박 정보를 입력해주세요.');
      return;
    }

    if (!formData.companions.trim()) {
      alert('동행인 정보를 입력해주세요.');
      return;
    }

    const hasPlaces = Object.values(dailyPlaces).some(places => places.length > 0);
    if (!hasPlaces) {
      alert('여행 일정에 최소 1개 이상의 장소를 추가해주세요.');
      return;
    }

    try {
      // 기존 일정 목록 가져오기
      const existingSchedules = JSON.parse(localStorage.getItem('userSchedules') || '[]');

      // 수정된 일정 데이터 생성
      const updatedSchedule = {
        id: id,
        title: formData.title,
        region: formData.region,
        transportation: formData.transportation,
        companions: formData.companions,
        accommodation: formData.accommodation,
        startDate: startDate,
        endDate: endDate,
        date: `${startDate} ~ ${endDate}`,
        duration: `${activeDays}박 ${activeDays + 1}일`,
        places: dailyPlaces,
        totalDays: activeDays,
        author: {
          name: getCurrentUser()?.user?.name || '여행자',
          profileImage: getCurrentUser()?.user?.profileImage || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face'
        },
        image: formData.representativeImage || Object.values(dailyPlaces).flat()[0]?.image || 'https://picsum.photos/300/200?random=1',
        description: formData.description,
        updatedAt: new Date().toISOString(),
        tags: [formData.region, ...formData.transportation],
        views: 1,
        likes: 0
      };

      // 기존 일정 업데이트
      const updatedSchedules = existingSchedules.map(schedule =>
        schedule.id === id ? updatedSchedule : schedule
      );

      // localStorage에 저장
      localStorage.setItem('userSchedules', JSON.stringify(updatedSchedules));

      alert('일정이 성공적으로 수정되었습니다!');
      navigate(-1); // 이전 페이지로 돌아가기
    } catch (error) {
      console.error('일정 수정 오류:', error);
      alert('일정 수정 중 오류가 발생했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <DirectScheduleCreatePage>
      <Navigation />

      <CreateContainer>
        <PageHeader>
          <BackButton onClick={() => navigate(-1)}>
            ←
          </BackButton>
          <PageTitle>여행 일정 수정</PageTitle>
          {startDate && endDate && (
            <DateInfo>
              {startDate} ~ {endDate}
            </DateInfo>
          )}
        </PageHeader>

        <FormSection>
          <SectionTitle>기본 정보</SectionTitle>

          <FormGroup>
            <Label>제목</Label>
            <Input
              type="text"
              placeholder="여행 제목을 입력하세요"
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
            />
          </FormGroup>

          <FormGroup>
            <Label>여행 설명</Label>
            <TextArea
              placeholder="여행에 대한 설명을 입력하세요"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              rows={3}
            />
          </FormGroup>

          <FormGroup>
            <Label>같이 간 사람</Label>
            <Input
              type="text"
              placeholder="동행인을 입력하세요 (예: 친구 2명, 가족 4명)"
              value={formData.companions}
              onChange={(e) => handleInputChange('companions', e.target.value)}
            />
          </FormGroup>

          <FormGroup>
            <Label>대표사진</Label>
            <ImageUploader
              imageUrl={formData.representativeImage}
              onUpload={handleImageUpload}
              onRemove={handleImageRemove}
            />
          </FormGroup>
        </FormSection>

        <FormSection>
          <SectionTitle>여행 정보</SectionTitle>

          <FormGroup>
            <Label>지역</Label>
            <OptionButtonGroup
              options={['서울', '부산', '제주', '경기', '강원', '전라', '충청', '경상', '인천']}
              selectedValue={formData.region}
              onSelect={(value) => handleInputChange('region', value)}
            />
          </FormGroup>

          <FormGroup>
            <Label>교통편 (복수 선택 가능)</Label>
            <OptionButtonGroup
              options={['자동차', '기차', '버스', '비행기', '배', '도보', '자전거']}
              selectedValue={formData.transportation}
              onSelect={(value) => handleInputChange('transportation', value)}
              multiSelect
            />
          </FormGroup>

          <FormGroup>
            <Label>숙소 종류</Label>
            <OptionButtonGroup
              options={['호텔', '펜션', '리조트', '게스트하우스', '민박', '캠핑', '에어비앤비']}
              selectedValue={formData.accommodation}
              onSelect={(value) => handleInputChange('accommodation', value)}
            />
          </FormGroup>
        </FormSection>

        <LocationsSection>
          <SectionTitle>방문 장소</SectionTitle>

          {Array.from({ length: activeDays }, (_, index) => {
            const day = index + 1;
            const dayPlaceList = dailyPlaces[day] || [];

            return (
              <DaySection key={day}>
                <DayHeader>
                  <DayTitle>{day}일차</DayTitle>
                  {activeDays > 1 && (
                    <RemoveDayButton
                      onClick={() => removeDay(day)}
                      disabled={day === 1}
                    >
                      삭제
                    </RemoveDayButton>
                  )}
                </DayHeader>

                <DayPlaceList
                  places={dayPlaceList}
                  onPlaceClick={() => handleExistingPlaceClick(day)}
                />

                <DayAddButton onClick={() => addLocation(day)}>
                  장소 추가 +
                </DayAddButton>
              </DaySection>
            );
          })}

          <AddDayButton onClick={addDay}>
            <AddDayIcon>+</AddDayIcon>
            {activeDays + 1}일차 추가
          </AddDayButton>
        </LocationsSection>

        <SubmitButton onClick={handleSubmit}>
          일정 수정하기
        </SubmitButton>
      </CreateContainer>

      <LocationSearchModal
        isOpen={showLocationSearch}
        onClose={() => setShowLocationSearch(false)}
        onSelectPlace={handlePlaceSelect}
        recommendedPlaces={recommendedPlaces}
      />

      <ConfirmModal
        isOpen={showConfirmModal && selectedPlace}
        title="장소 추가"
        message={selectedPlace ? `<strong>${selectedPlace.name}</strong>을(를)<br />일정에 추가하시겠습니까?` : ''}
        onConfirm={confirmAddPlace}
        onCancel={() => setShowConfirmModal(false)}
      />
    </DirectScheduleCreatePage>
  );
};



const DirectScheduleCreatePage = styled.div`
  min-height: 100vh;
  background: #f8f9fa;
  padding-top: 70px;
  padding-bottom: 20px;

  @media (max-width: 1024px) {
    padding-bottom: 100px;
  }
`;

const CreateContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 40px 20px;
`;

const PageHeader = styled.div`
  text-align: center;
  margin-bottom: 40px;
  position: relative;
`;

const BackButton = styled.button`
  position: absolute;
  left: 0;
  top: -10px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  border-radius: 12px;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  color: white;
  font-size: 20px;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(102, 126, 234, 0.5);
  }
`;

const PageTitle = styled.h1`
  font-size: 32px;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 10px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const DateInfo = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 15px 25px;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 30px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(102, 126, 234, 0.5);
  }

  &:active {
    transform: translateY(0);
  }
`;

const FormSection = styled.div`
  background: white;
  border-radius: 20px;
  padding: 30px;
  margin-bottom: 25px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  border: 1px solid #f0f0f0;
`;

const SectionTitle = styled.h3`
  font-size: 20px;
  font-weight: 700;
  color: #2c3e50;
  margin: 0 0 20px 0;
  padding-bottom: 10px;
  border-bottom: 2px solid #f8f9fa;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const Label = styled.label`
  display: block;
  font-size: 16px;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 8px;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 15px;
  border: 2px solid #e9ecef;
  border-radius: 12px;
  font-size: 16px;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 12px 15px;
  border: 2px solid #e9ecef;
  border-radius: 12px;
  font-size: 16px;
  transition: all 0.3s ease;
  resize: vertical;
  min-height: 80px;
  font-family: inherit;

  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }
`;


const LocationsSection = styled.div`
  background: white;
  border-radius: 20px;
  padding: 30px;
  margin-bottom: 25px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
`;

const DaySection = styled.div`
  background: white;
  border-radius: 20px;
  padding: 25px;
  margin-bottom: 20px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  border: 1px solid #f0f0f0;
`;

const DayTitle = styled.h4`
  font-size: 20px;
  font-weight: 700;
  color: #2c3e50;
  margin: 0 0 20px 0;
  padding-bottom: 10px;
  border-bottom: 2px solid #f8f9fa;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const DayHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const RemoveDayButton = styled.button`
  background: #dc3545;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 6px 12px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #c82333;
  }

  &:disabled {
    background: #6c757d;
    cursor: not-allowed;
  }
`;


const DayAddButton = styled.button`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 12px;
  padding: 12px 20px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(102, 126, 234, 0.5);
  }
`;

const AddDayButton = styled.button`
  background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
  color: white;
  border: none;
  border-radius: 15px;
  padding: 15px 30px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;
  margin-bottom: 30px;
  box-shadow: 0 4px 15px rgba(40, 167, 69, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(40, 167, 69, 0.6);
  }
`;

const AddDayIcon = styled.span`
  font-size: 20px;
`;

const SubmitButton = styled.button`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 12px;
  padding: 15px 40px;
  font-size: 18px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;
  margin-top: 30px;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(102, 126, 234, 0.6);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;


export default TravelScheduleEdit;