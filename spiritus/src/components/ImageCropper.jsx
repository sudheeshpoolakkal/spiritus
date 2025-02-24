// src/components/ImageCropper.jsx
import React, { useState, useCallback } from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

const ImageCropper = ({ src, onCropComplete }) => {
  // Initialize crop state with a 1:1 aspect ratio
  const [crop, setCrop] = useState({
    unit: '%',
    width: 50,
    aspect: 1,
    x: 25,
    y: 25,
  });
  const [imageRef, setImageRef] = useState(null);

  // Called when the image loads
  const onImageLoaded = useCallback((img) => {
    setImageRef(img);
  }, []);

  // Update crop state as user adjusts the crop box
  const onCropChange = (newCrop) => {
    setCrop(newCrop);
  };

  // When crop is complete, draw the cropped portion to a canvas and return the base64 string
  const onCropCompleteInternal = (crop) => {
    if (imageRef && crop.width && crop.height) {
      const canvas = document.createElement('canvas');
      // Scale values because the displayed image might be resized
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
