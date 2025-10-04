import React from 'react';
import styled from 'styled-components';

const SavedScheduleCard = ({ schedule, onClick, onDelete }) => {
  return (
    <Card>
      <CardImage
        src={schedule.image}
        alt={schedule.title}
        onClick={onClick}
        style={{ cursor: 'pointer' }}
        onError={(e) => {
          e.target.src = 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop';
        }}
      />
      <CardInfo onClick={onClick} style={{ cursor: 'pointer' }}>
        <CardTitle>{schedule.title}</CardTitle>
        <CardMeta>{schedule.region} • {schedule.date}</CardMeta>
        {schedule.author && (
          <AuthorInfo>
            <AuthorAvatar>
              <img
                src={schedule.author.profileImage}
                alt={schedule.author.name}
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face';
                }}
              />
            </AuthorAvatar>
            <AuthorName>{schedule.author.name}</AuthorName>
          </AuthorInfo>
        )}
      </CardInfo>
      <DeleteButton
        onClick={(e) => {
          e.stopPropagation();
          onDelete();
        }}
        title="관심 일정에서 삭제"
      >
        삭제
      </DeleteButton>
    </Card>
  );
};

const Card = styled.div`
  display: flex;
  gap: 16px;
  padding: 16px;
  background: #f8f9fa;
  border-radius: 12px;
  margin-bottom: 12px;
  border: 1px solid #e9ecef;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;

  &:hover {
    background: white;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`;

const CardImage = styled.img`
  width: 80px;
  height: 60px;
  border-radius: 8px;
  object-fit: cover;
`;

const CardInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const CardTitle = styled.h4`
  font-size: 16px;
  font-weight: 600;
  color: #2c3e50;
  margin: 0 0 4px 0;
`;

const CardMeta = styled.p`
  font-size: 14px;
  color: #6c757d;
  margin: 0;
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
  width: 20px;
  height: 20px;
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

const DeleteButton = styled.button`
  position: absolute;
  top: 12px;
  right: 12px;
  background: #dc3545;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 4px 8px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(220, 53, 69, 0.3);

  ${Card}:hover & {
    opacity: 1;
  }

  &:hover {
    background: #c82333;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(220, 53, 69, 0.4);
  }

  &:active {
    transform: translateY(0);
  }
`;

export default SavedScheduleCard;
