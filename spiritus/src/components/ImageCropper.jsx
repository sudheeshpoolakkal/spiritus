// src/components/ImageCropper.jsx
import React, { useState, useCallback } from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

const ImageCropper = ({ src, onCropComplete }) => {
    const [crop, setCrop] = useState({ aspect: 1, unit: '%', width: 50, x: 25, y: 25 });

  const [imageRef, setImageRef] = useState(null);

  const onImageLoaded = useCallback((img) => {
    setImageRef(img);
  }, []);

  const onCropChange = (newCrop) => {
    setCrop(newCrop);
  };

  const onCropCompleteInternal = (crop) => {
    if (imageRef && crop.width && crop.height) {
      const canvas = document.createElement('canvas');
      const scaleX = imageRef.naturalWidth / imageRef.width;
      const scaleY = imageRef.naturalHeight / imageRef.height;
      canvas.width = crop.width;
      canvas.height = crop.height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(
        imageRef,
        crop.x * scaleX,
        crop.y * scaleY,
        crop.width * scaleX,
        crop.height * scaleY,
        0,
        0,
        crop.width,
        crop.height
      );
      const base64Image = canvas.toDataURL('image/jpeg');
      onCropComplete(base64Image);
    }
  };

  return (
    <div>
      <ReactCrop
        src={src}
        crop={crop}
        onImageLoaded={onImageLoaded}
        onChange={onCropChange}
        onComplete={onCropCompleteInternal}
      />
    </div>
  );
};

export default ImageCropper;
