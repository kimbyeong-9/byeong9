import React from 'react';
import styled from 'styled-components';

const OptionButtonGroup = ({ options, selectedValue, onSelect, multiSelect = false }) => {
  const handleClick = (option) => {
    if (multiSelect) {
      // 배열로 관리
      if (selectedValue.includes(option)) {
        onSelect(selectedValue.filter(item => item !== option));
      } else {
        onSelect([...selectedValue, option]);
      }
    } else {
      // 단일 선택
      onSelect(option);
    }
  };

  const isActive = (option) => {
    if (multiSelect) {
      return selectedValue.includes(option);
    }
    return selectedValue === option;
  };

  return (
    <ButtonGroup>
      {options.map(option => (
        <OptionButton
          key={option}
          $active={isActive(option)}
          onClick={() => handleClick(option)}
        >
          {option}
        </OptionButton>
      ))}
    </ButtonGroup>
  );
};

const ButtonGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;

  @media (max-width: 768px) {
    flex-wrap: nowrap;
    overflow-x: auto;
    padding: 5px 0;

    &::-webkit-scrollbar {
      display: none;
    }
    -ms-overflow-style: none;
    scrollbar-width: none;

    & > * {
      flex-shrink: 0;
    }
  }
`;

const OptionButton = styled.button`
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

export default OptionButtonGroup;
