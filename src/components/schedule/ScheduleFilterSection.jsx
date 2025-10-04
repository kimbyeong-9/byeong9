import React from 'react';
import styled from 'styled-components';

const ScheduleFilterSection = ({
  searchTerm,
  onSearchChange,
  selectedRegion,
  onRegionChange,
  sortBy,
  onSortChange
}) => {
  const regions = ['all', '서울', '부산', '제주', '경기', '강원', '전라', '충청', '경상', '인천'];

  return (
    <FilterSection>
      <FilterTitle>맞춤 검색</FilterTitle>

      <FilterGroup style={{ marginBottom: '20px' }}>
        <FilterLabel>검색</FilterLabel>
        <SearchInput
          type="text"
          placeholder="제목, 지역, 작성자로 검색..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </FilterGroup>

      <FilterGroup>
        <FilterLabel>지역</FilterLabel>
        <FilterTags>
          {regions.map(region => (
            <FilterTag
              key={region}
              $active={selectedRegion === region}
              onClick={() => onRegionChange(region)}
            >
              {region === 'all' ? '전체' : region}
            </FilterTag>
          ))}
        </FilterTags>
      </FilterGroup>

      <FilterGroup>
        <FilterLabel>정렬</FilterLabel>
        <FilterTags>
          <FilterTag
            $active={sortBy === 'latest'}
            onClick={() => onSortChange('latest')}
          >
            최신순
          </FilterTag>
          <FilterTag
            $active={sortBy === 'popular'}
            onClick={() => onSortChange('popular')}
          >
            인기순
          </FilterTag>
        </FilterTags>
      </FilterGroup>
    </FilterSection>
  );
};

const FilterSection = styled.div`
  background: white;
  border-radius: 12px;
  padding: 25px;
  margin-bottom: 30px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border: 1px solid #e9ecef;
`;

const FilterTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #2c3e50;
  margin: 0 0 20px 0;
`;

const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 20px;
`;

const FilterLabel = styled.label`
  font-size: 14px;
  font-weight: 600;
  color: #495057;
`;

const SearchInput = styled.input`
  padding: 10px 12px;
  border: 2px solid #e9ecef;
  border-radius: 8px;
  font-size: 14px;
  color: #495057;
  background: white;
  transition: all 0.3s ease;
  width: 100%;

  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }

  &::placeholder {
    color: #6c757d;
  }
`;

const FilterTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 8px;
`;

const FilterTag = styled.button`
  padding: 6px 12px;
  border: 2px solid ${props => props.$active ? '#667eea' : '#e9ecef'};
  background: ${props => props.$active ? '#667eea' : 'white'};
  color: ${props => props.$active ? 'white' : '#495057'};
  border-radius: 20px;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;

  &:hover {
    border-color: #667eea;
    background: ${props => props.$active ? '#5a6fd8' : '#f8f9fa'};
  }
`;

export default ScheduleFilterSection;
