import React from 'react';
import styled from 'styled-components';

const ImageUploader = ({ imageUrl, onUpload, onRemove }) => {
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('파일 크기는 5MB 이하로 선택해주세요.');
        return;
      }

      if (!file.type.startsWith('image/')) {
        alert('이미지 파일만 업로드 가능합니다.');
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        onUpload(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.currentTarget.classList.add('dragover');
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.currentTarget.classList.remove('dragover');
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.currentTarget.classList.remove('dragover');

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      if (file.type.startsWith('image/')) {
        if (file.size > 5 * 1024 * 1024) {
          alert('파일 크기는 5MB 이하로 선택해주세요.');
          return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
          onUpload(e.target.result);
        };
        reader.readAsDataURL(file);
      } else {
        alert('이미지 파일만 업로드 가능합니다.');
      }
    }
  };

  return (
    <ImageUploadSection>
      {!imageUrl ? (
        <ImageUploadBox
          onClick={() => document.getElementById('imageUpload').click()}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <ImageUploadText>대표사진을 업로드하세요</ImageUploadText>
          <ImageUploadSubText>
            클릭하거나 드래그 앤 드롭으로 이미지 업로드 (최대 5MB)
          </ImageUploadSubText>
          <HiddenFileInput
            id="imageUpload"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
          />
        </ImageUploadBox>
      ) : (
        <ImagePreview>
          <PreviewImage src={imageUrl} alt="대표사진 미리보기" />
          <RemoveImageButton onClick={onRemove}>×</RemoveImageButton>
        </ImagePreview>
      )}
    </ImageUploadSection>
  );
};

const ImageUploadSection = styled.div`
  margin-top: 20px;
`;

const ImageUploadBox = styled.div`
  border: 2px dashed #e9ecef;
  border-radius: 12px;
  padding: 30px;
  text-align: center;
  background: #f8f9fa;
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;

  &:hover {
    border-color: #667eea;
    background: #f0f4ff;
  }

  &.dragover {
    border-color: #667eea;
    background: #e8f2ff;
  }
`;

const ImagePreview = styled.div`
  position: relative;
  display: inline-block;
  margin-top: 15px;
`;

const PreviewImage = styled.img`
  max-width: 200px;
  max-height: 200px;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
`;

const RemoveImageButton = styled.button`
  position: absolute;
  top: -8px;
  right: -8px;
  background: #dc3545;
  color: white;
  border: none;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  font-size: 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;

  &:hover {
    background: #c82333;
    transform: scale(1.1);
  }
`;

const ImageUploadText = styled.div`
  font-size: 16px;
  color: #495057;
  margin-bottom: 8px;
  font-weight: 600;
`;

const ImageUploadSubText = styled.div`
  font-size: 14px;
  color: #6c757d;
`;

const HiddenFileInput = styled.input`
  display: none;
`;

export default ImageUploader;
