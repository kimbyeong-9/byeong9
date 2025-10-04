import React from 'react';
import styled from 'styled-components';

const ScheduleCard = ({ schedule, onClick }) => {
  return (
    <Card onClick={onClick}>
      <CardImage src={schedule.image} alt={schedule.title} />
      <CardContent>
        <div>
          <CardTitle>{schedule.title}</CardTitle>
          <CardMeta>
            <CardTag type="region">{schedule.region}</CardTag>
            <CardTag type="date">{schedule.date}</CardTag>
          </CardMeta>
        </div>

        <div>
          {schedule.author && (
            <AuthorInfo>
              <AuthorAvatar>
                <img
                  src={typeof schedule.author === 'string' ?
                    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face" :
                    schedule.author.profileImage
                  }
                  alt={typeof schedule.author === 'string' ? schedule.author : schedule.author.name}
                />
              </AuthorAvatar>
              <AuthorName>
                {typeof schedule.author === 'string' ? schedule.author : schedule.author.name}
              </AuthorName>
            </AuthorInfo>
          )}

          <CardStats>
            <CardStat>
              <EyeIcon />
              <span>{schedule.views || 0}</span>
            </CardStat>
            <CardStat>
              <HeartIcon />
              <span>{schedule.likes || 0}</span>
            </CardStat>
          </CardStats>
        </div>
      </CardContent>
    </Card>
  );
};

const Card = styled.div`
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  cursor: pointer;
  border: 1px solid #e9ecef;
  display: flex;
  flex-direction: column;
  height: 100%;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
  }
`;

const CardImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const CardContent = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: space-between;
`;

const CardTitle = styled.h3`
  font-size: 18px;
  font-weight: 700;
  color: #2c3e50;
  margin: 0 0 10px 0;
  line-height: 1.4;
`;

const CardMeta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 12px;
`;

const CardTag = styled.span`
  background: ${props => {
    switch(props.type) {
      case 'region': return '#e3f2fd';
      case 'date': return '#f3e5f5';
      case 'author': return '#e8f5e8';
      default: return '#f8f9fa';
    }
  }};
  color: ${props => {
    switch(props.type) {
      case 'region': return '#1976d2';
      case 'date': return '#7b1fa2';
      case 'author': return '#2e7d32';
      default: return '#495057';
    }
  }};
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
  white-space: nowrap;
`;

const AuthorInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 10px;
  padding-top: 10px;
  border-top: 1px solid #e9ecef;
`;

const AuthorAvatar = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const AuthorName = styled.span`
  font-size: 12px;
  color: #6c757d;
  font-weight: 500;
`;

const CardStats = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 8px;
  padding-top: 8px;
  border-top: 1px solid #e9ecef;
`;

const CardStat = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  color: #6c757d;

  span:first-child {
    font-size: 14px;
  }
`;

const EyeIcon = styled.span`
  font-size: 14px;
  color: #6c757d;
  font-weight: 500;
  position: relative;
  display: inline-block;
  width: 16px;
  height: 10px;
  background: white;
  border: 1px solid #6c757d;
  border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 8px;
    height: 8px;
    background: #6c757d;
    border-radius: 50%;
  }

  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 4px;
    height: 4px;
    background: white;
    border-radius: 50%;
  }
`;

const HeartIcon = styled.span`
  font-size: 14px;
  color: #e74c3c;
  transition: all 0.3s ease;

  &::before {
    content: '♥';
  }
`;

export default ScheduleCard;
