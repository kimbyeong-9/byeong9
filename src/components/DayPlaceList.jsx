import React from 'react';
import styled from 'styled-components';

const DayPlaceList = ({ places, onPlaceClick }) => {
  // 간단한 거리 계산 함수
  const calculateDistance = () => {
    return Math.floor(Math.random() * 20 + 1);
  };

  if (places.length === 0) return null;

  return (
    <PlacesContainer>
      {places.map((place, idx) => (
        <div key={`${place.id}-${place.addedAt}`}>
          <PlaceCard onClick={() => onPlaceClick(idx)}>
            <PlaceImage src={place.image} alt={place.name} />
            <PlaceInfo>
              <PlaceName>{place.name}</PlaceName>
              <PlaceMeta>
                <Badge type="region">{place.region}</Badge>
                <Badge type="category">{place.category}</Badge>
              </PlaceMeta>
            </PlaceInfo>
          </PlaceCard>

          {idx < places.length - 1 && (
            <DistanceIndicator>
              <Arrow>↓</Arrow>
              <DistanceText>{calculateDistance()}km</DistanceText>
            </DistanceIndicator>
          )}
        </div>
      ))}
    </PlacesContainer>
  );
};

const PlacesContainer = styled.div`
  margin-bottom: 20px;
`;

const PlaceCard = styled.div`
  background: #f8f9fa;
  border: 2px solid #e9ecef;
  border-radius: 12px;
  padding: 15px;
  display: flex;
  align-items: center;
  gap: 12px;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    background: #e9ecef;
    border-color: #667eea;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.2);
  }
`;

const PlaceImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 8px;
  object-fit: cover;
  background: #f0f0f0;

  &::before {
    content: '🏞️';
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    font-size: 20px;
    background: #f0f0f0;
  }
`;

const PlaceInfo = styled.div`
  flex: 1;
`;

const PlaceName = styled.h5`
  font-size: 16px;
  font-weight: 600;
  color: #2c3e50;
  margin: 0 0 5px 0;
`;

const PlaceMeta = styled.div`
  display: flex;
  gap: 8px;
`;

const Badge = styled.span`
  background: ${props => props.type === 'region' ? '#e8f4f8' : '#f8e8ff'};
  color: ${props => props.type === 'region' ? '#0c5460' : '#6f42c1'};
  padding: 2px 8px;
  border-radius: 10px;
  font-size: 11px;
  font-weight: 600;
`;

const DistanceIndicator = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 15px 0;
  gap: 15px;
`;

const Arrow = styled.div`
  color: #667eea;
  font-size: 24px;
`;

const DistanceText = styled.div`
  font-size: 14px;
  color: #6c757d;
  font-weight: 500;
`;

export default DayPlaceList;
