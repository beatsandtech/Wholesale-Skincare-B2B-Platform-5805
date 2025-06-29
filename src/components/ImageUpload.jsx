import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiUpload, FiX, FiImage, FiCamera, FiCheck } = FiIcons;

function ImageUpload({ value, onChange, className = "", acceptedFormats = "image/*" }) {
  const [preview, setPreview] = useState(value || null);
  const [isDragging, setIsDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileSelect = (file) => {
    if (file && file.type.startsWith('image/')) {
      setUploading(true);
      
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target.result;
        setPreview(imageUrl);
        setUploading(false);
        onChange && onChange(imageUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    handleFileSelect(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    handleFileSelect(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleRemove = () => {
    setPreview(null);
    onChange && onChange('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={`relative ${className}`}>
      <input
        ref={fileInputRef}
        type="file"
        accept={acceptedFormats}
        onChange={handleFileChange}
        className="hidden"
      />

      {preview ? (
        <div className="relative group">
          <img
            src={preview}
            alt="Preview"
            className="w-full h-48 object-cover rounded-2xl border border-earth-200 shadow-sm"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-earth-800/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-2xl flex items-end justify-center pb-4">
            <div className="flex space-x-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="button"
                onClick={handleClick}
                className="bg-white/90 backdrop-blur-sm text-earth-700 p-3 rounded-xl hover:bg-white transition-all duration-200 shadow-lg"
              >
                <SafeIcon icon={FiCamera} />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="button"
                onClick={handleRemove}
                className="bg-terracotta-500/90 backdrop-blur-sm text-white p-3 rounded-xl hover:bg-terracotta-600 transition-all duration-200 shadow-lg"
              >
                <SafeIcon icon={FiX} />
              </motion.button>
            </div>
          </div>
        </div>
      ) : (
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleClick}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all duration-300 ${
            isDragging
              ? 'border-forest-400 bg-gradient-to-br from-forest-50 to-sage-50 shadow-lg'
              : 'border-earth-300 hover:border-forest-400 hover:bg-gradient-to-br hover:from-sage-50 hover:to-cream-50 bg-white/50'
          }`}
        >
          <div className="w-16 h-16 bg-gradient-to-br from-earth-200 to-earth-300 rounded-2xl flex items-center justify-center mx-auto mb-4">
            {uploading ? (
              <div className="spinner"></div>
            ) : (
              <SafeIcon icon={FiUpload} className="text-earth-600 text-2xl" />
            )}
          </div>
          
          <p className="text-lg text-earth-700 mb-2 font-medium">
            {uploading ? 'Processing your image...' : isDragging ? 'Drop your image here' : 'Click to upload or drag & drop'}
          </p>
          
          <p className="text-sm text-earth-500">
            PNG, JPG, GIF, SVG up to 5MB
          </p>
          
          <div className="mt-4 flex items-center justify-center space-x-4 text-xs text-earth-400">
            <span className="flex items-center">
              <SafeIcon icon={FiImage} className="mr-1" />
              High Quality
            </span>
            <span>•</span>
            <span>Square Format Preferred</span>
            <span>•</span>
            <span>Transparent Background</span>
          </div>
        </motion.div>
      )}

      {uploading && (
        <div className="absolute inset-0 bg-white/80 backdrop-blur-sm rounded-2xl flex items-center justify-center">
          <div className="text-center">
            <div className="spinner mx-auto mb-2"></div>
            <p className="text-sm text-earth-600">Processing image...</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default ImageUpload;