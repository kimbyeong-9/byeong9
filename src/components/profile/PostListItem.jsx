import React from 'react';
import styled from 'styled-components';

const PostListItem = ({ post, onClick, onEdit, onDelete }) => {
  return (
    <ListItem>
      <ListImage
        src={post.image}
        alt={post.title}
        onClick={onClick}
        style={{ cursor: 'pointer' }}
        onError={(e) => {
          e.target.src = 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop';
        }}
      />
      <ListContent onClick={onClick} style={{ cursor: 'pointer' }}>
        <ListTitle>{post.title}</ListTitle>
        <ListMeta>{post.region} • {post.date || post.duration}</ListMeta>
      </ListContent>
      <ListActions>
        <ListButton
          className="edit"
          onClick={(e) => {
            e.stopPropagation();
            onEdit();
          }}
        >
          수정
        </ListButton>
        <ListButton
          className="delete"
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
        >
          삭제
        </ListButton>
      </ListActions>
    </ListItem>
  );
};

const ListItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  background: #f8f9fa;
  border-radius: 8px;
  border: 1px solid #e9ecef;
  transition: all 0.3s ease;
  cursor: pointer;
  gap: 12px;

  &:hover {
    background: #e9ecef;
    border-color: #667eea;
  }
`;

const ListImage = styled.img`
  width: 60px;
  height: 45px;
  border-radius: 6px;
  object-fit: cover;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  flex-shrink: 0;
`;

const ListContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const ListTitle = styled.h4`
  font-size: 16px;
  font-weight: 600;
  color: #2c3e50;
  margin: 0;
  line-height: 1.3;
`;

const ListMeta = styled.p`
  font-size: 14px;
  color: #6c757d;
  margin: 0;
`;

const ListActions = styled.div`
  display: flex;
  gap: 8px;
  opacity: 0;
  transition: opacity 0.3s ease;

  ${ListItem}:hover & {
    opacity: 1;
  }
`;

const ListButton = styled.button`
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;

  &.edit {
    background: #28a745;
    color: white;
  }

  &.delete {
    background: #dc3545;
    color: white;
  }

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  }
`;

export default PostListItem;
