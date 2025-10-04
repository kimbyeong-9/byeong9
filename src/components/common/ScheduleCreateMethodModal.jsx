import React from 'react';
import styled from 'styled-components';

const ScheduleCreateMethodModal = ({ isOpen, onClose, onDirectCreate, onAICreate }) => {
  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <ModalTitle>일정 작성 방법 선택</ModalTitle>
        <ModalMessage>어떤 방식으로 일정을 작성하시겠습니까?</ModalMessage>

        <OptionsContainer>
          <OptionButton onClick={onDirectCreate}>
            <OptionText>직접일정 작성</OptionText>
          </OptionButton>

          <OptionButton $primary onClick={onAICreate}>
            <OptionText>AI 일정 작성</OptionText>
          </OptionButton>
        </OptionsContainer>

        <CancelButton onClick={onClose}>취소</CancelButton>
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
  padding: 40px 30px 30px 30px;
  text-align: center;
  max-width: 500px;
  width: 100%;
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

const ModalTitle = styled.h3`
  font-size: 24px;
  font-weight: 700;
  color: #2c3e50;
  margin: 0 0 15px 0;
`;

const ModalMessage = styled.p`
  font-size: 16px;
  color: #6c757d;
  margin: 0 0 30px 0;
  line-height: 1.6;
`;

const OptionsContainer = styled.div`
  display: flex;
  gap: 15px;
  justify-content: center;
  margin-bottom: 20px;

  @media (max-width: 480px) {
    flex-direction: column;
  }
`;

const OptionButton = styled.button`
  background: ${props => props.$primary ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : 'white'};
  color: ${props => props.$primary ? 'white' : '#667eea'};
  border: 2px solid #667eea;
  padding: 15px 25px;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 150px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;

  &:hover {
    background: ${props => props.$primary ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : '#667eea'};
    color: white;
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
  }
`;

const OptionText = styled.span`
  font-size: 14px;
`;

const CancelButton = styled.button`
  background: white;
  color: #6c757d;
  border: 2px solid #e9ecef;
  padding: 12px 24px;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #f8f9fa;
    color: #495057;
  }
`;

export default ScheduleCreateMethodModal;
