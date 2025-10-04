import React, { useState } from 'react';
import styled from 'styled-components';

const LocationSearchModal = ({
  isOpen,
  onClose,
  onSelectPlace,
  recommendedPlaces
}) => {
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [selectedRegion, setSelectedRegion] = useState('전체');
  const [searchQuery, setSearchQuery] = useState('');

  if (!isOpen) return null;

  const getFilteredPlaces = () => {
    return recommendedPlaces.filter(place => {
      const matchesRegion = selectedRegion === '전체' || place.region === selectedRegion;
      const matchesCategory = selectedCategory === '전체' || place.category === selectedCategory;
      const matchesSearch = !searchQuery || place.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesRegion && matchesCategory && matchesSearch;
    });
  };

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <ModalTitle>장소 검색</ModalTitle>
          <CloseButton onClick={onClose}>×</CloseButton>
        </ModalHeader>

        <SearchContent>
          <SearchBox>
            <SearchInput
              type="text"
              placeholder="장소명을 검색하세요 (예: 경복궁, N서울타워)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </SearchBox>

          <RegionSection>
            <RegionTitle>지역</RegionTitle>
            <RegionButtons>
              {['전체', '서울', '부산', '제주', '경기', '강원', '전라', '충청', '경상', '인천'].map(region => (
                <RegionButton
                  key={region}
                  $active={selectedRegion === region}
                  onClick={() => setSelectedRegion(region)}
                >
                  {region}
                </RegionButton>
              ))}
            </RegionButtons>
          </RegionSection>

          <CategorySection>
            <CategoryTitle>카테고리</CategoryTitle>
            <CategoryButtons>
              {['전체', '음식점', '카페', '키즈', '휴양지', '자연', '체험', '전시', '레포츠', '축제공연', '역사', '숙박', '야경', '데이트'].map(category => (
                <CategoryButton
                  key={category}
                  $active={selectedCategory === category}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </CategoryButton>
              ))}
            </CategoryButtons>
          </CategorySection>

          <SearchResults>
            {getFilteredPlaces().length > 0 ? (
              getFilteredPlaces().map(place => (
                <PlaceCard key={place.id} onClick={() => onSelectPlace(place)}>
                  <PlaceImage src={place.image} alt={place.name} />
                  <PlaceInfo>
                    <PlaceName>{place.name}</PlaceName>
                    <PlaceRating>⭐ {place.rating}</PlaceRating>
                  </PlaceInfo>
                  <PlaceMeta>
                    <PlaceRegion>{place.region}</PlaceRegion>
                    <PlaceCategory>{place.category}</PlaceCategory>
                  </PlaceMeta>
                </PlaceCard>
              ))
            ) : (
              <EmptyResults>
                선택한 조건에 맞는 장소가 없습니다.<br />
                다른 지역이나 카테고리를 선택해보세요.
              </EmptyResults>
            )}
          </SearchResults>
        </SearchContent>
      </ModalContainer>
    </ModalOverlay>
  );
};

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
`;

const ModalContainer = styled.div`
  background: white;
  border-radius: 20px;
  width: 90%;
  max-width: 800px;
  height: 80vh;
  display: flex;
  flex-direction: column;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  animation: modalSlideIn 0.3s ease-out;

  @keyframes modalSlideIn {
    from {
      opacity: 0;
      transform: translateY(30px) scale(0.95);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }
`;

const ModalHeader = styled.div`
  padding: 20px 30px;
  border-bottom: 2px solid #f8f9fa;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ModalTitle = styled.h2`
  font-size: 24px;
  font-weight: 700;
  color: #2c3e50;
  margin: 0;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  color: #6c757d;
  cursor: pointer;
  padding: 5px;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;

  &:hover {
    background: #f8f9fa;
    color: #2c3e50;
  }
`;

const SearchContent = styled.div`
  flex: 1;
  padding: 30px;
  overflow-y: auto;
`;

const SearchBox = styled.div`
  margin-bottom: 30px;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 15px 20px;
  border: 2px solid #e9ecef;
  border-radius: 12px;
  font-size: 16px;
  margin-bottom: 20px;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }
`;

const RegionSection = styled.div`
  margin-bottom: 20px;
`;

const RegionTitle = styled.h4`
  font-size: 16px;
  font-weight: 600;
  color: #2c3e50;
  margin: 0 0 10px 0;
`;

const RegionButtons = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 20px;
`;

const RegionButton = styled.button`
  background: ${props => props.$active ? 'linear-gradient(135deg, #28a745 0%, #20c997 100%)' : 'white'};
  color: ${props => props.$active ? 'white' : '#28a745'};
  border: 2px solid #28a745;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: ${props => props.$active ? 'linear-gradient(135deg, #28a745 0%, #20c997 100%)' : '#f0fff4'};
  }
`;

const CategorySection = styled.div`
  margin-bottom: 30px;
`;

const CategoryTitle = styled.h4`
  font-size: 18px;
  font-weight: 600;
  color: #2c3e50;
  margin: 0 0 15px 0;
`;

const CategoryButtons = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const CategoryButton = styled.button`
  background: ${props => props.$active ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : 'white'};
  color: ${props => props.$active ? 'white' : '#667eea'};
  border: 2px solid #667eea;
  padding: 10px 20px;
  border-radius: 25px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: ${props => props.$active ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : '#f8f9ff'};
  }
`;

const SearchResults = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  min-height: 200px;
`;

const EmptyResults = styled.div`
  grid-column: 1 / -1;
  background: #f8f9fa;
  border-radius: 12px;
  padding: 40px 20px;
  text-align: center;
  color: #6c757d;
  font-size: 16px;
`;

const PlaceCard = styled.div`
  background: white;
  border-radius: 15px;
  padding: 20px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  cursor: pointer;
  border: 2px solid transparent;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
    border-color: #667eea;
  }
`;

const PlaceImage = styled.img`
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 10px;
  margin-bottom: 15px;
`;

const PlaceInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 10px;
`;

const PlaceName = styled.h4`
  font-size: 18px;
  font-weight: 700;
  color: #2c3e50;
  margin: 0;
  flex: 1;
`;

const PlaceRating = styled.div`
  background: linear-gradient(135deg, #ffd700 0%, #ffb700 100%);
  color: white;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
  margin-left: 10px;
`;

const PlaceMeta = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;
`;

const PlaceRegion = styled.span`
  background: #e8f4f8;
  color: #0c5460;
  padding: 4px 12px;
  border-radius: 15px;
  font-size: 12px;
  font-weight: 600;
`;

const PlaceCategory = styled.span`
  background: #f8e8ff;
  color: #6f42c1;
  padding: 4px 12px;
  border-radius: 15px;
  font-size: 12px;
  font-weight: 600;
`;

export default LocationSearchModal;
