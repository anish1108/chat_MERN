import { useState, useRef } from 'react';
import { Camera, Upload, User, X } from 'lucide-react';

export default function Profile_Update() {
  const [avatarUrl, setAvatarUrl] = useState('https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face');
  const [isHovering, setIsHovering] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadStatus, setUploadStatus] = useState('');
  const fileInputRef = useRef(null);

  // Handle file selection
  const handleFileSelect = (file) => {
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setUploadStatus('Please select an image file');
      setTimeout(() => setUploadStatus(''), 3000);
      return;
    }

    // Validate file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      setUploadStatus('File size must be less than 5MB');
      setTimeout(() => setUploadStatus(''), 3000);
      return;
    }

    // Create preview URL
    const reader = new FileReader();
    reader.onload = (e) => {
      setAvatarUrl(e.target.result);
      setUploadStatus('Profile photo updated successfully!');
      setTimeout(() => setUploadStatus(''), 3000);
    };
    reader.readAsDataURL(file);
  };

  // Handle file input change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    handleFileSelect(file);
  };

  // Handle drag and drop
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    handleFileSelect(file);
  };

  // Trigger file input
  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  // Remove avatar
  const removeAvatar = () => {
    setAvatarUrl('');
    setUploadStatus('Profile photo removed');
    setTimeout(() => setUploadStatus(''), 3000);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-2xl shadow-lg border border-gray-100 relative">
      {/* Close Button */}
      <button
        onClick={() => console.log('Close clicked')}
        className="absolute top-4 right-4 w-8 h-8 bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-800 rounded-full flex items-center justify-center transition-all duration-200 group"
      >
        <X className="w-4 h-4 group-hover:scale-110 transition-transform" />
      </button>

      {/* Header */}
      <div className="text-center mb-6 pr-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Profile Photo</h2>
        <p className="text-gray-600">Upload or change your profile picture</p>
      </div>

      {/* Avatar Section */}
      <div className="flex flex-col items-center mb-6">
        <div 
          className={`relative group transition-all duration-300 ${isDragging ? 'scale-105' : ''}`}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          {/* Avatar Container */}
          <div className={`relative w-32 h-32 rounded-full overflow-hidden border-4 transition-all duration-300 ${
            isDragging ? 'border-blue-400 border-dashed' : 'border-white shadow-lg'
          }`}>
            {avatarUrl ? (
              <img 
                src={avatarUrl} 
                alt="Profile" 
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                <User className="w-12 h-12 text-gray-400" />
              </div>
            )}
            
            {/* Hover Overlay */}
            <div className={`absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center transition-opacity duration-300 ${
              isHovering || isDragging ? 'opacity-100' : 'opacity-0'
            }`}>
              <Camera className="w-8 h-8 text-white" />
            </div>
          </div>

          {/* Remove Button */}
          {avatarUrl && (
            <button
              onClick={removeAvatar}
              className={`absolute -top-2 -right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-red-600 transition-all duration-200 ${
                isHovering ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
              }`}
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Status Message */}
        {uploadStatus && (
          <div className={`mt-4 px-4 py-2 rounded-lg text-sm font-medium ${
            uploadStatus.includes('successfully') || uploadStatus.includes('removed')
              ? 'bg-green-100 text-green-700'
              : 'bg-red-100 text-red-700'
          }`}>
            {uploadStatus}
          </div>
        )}
      </div>

      {/* Upload Options */}
      <div className="space-y-4">
        {/* Upload Button */}
        <button
          onClick={triggerFileInput}
          className="w-full bg-blue-500 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-600 transition-colors flex items-center justify-center space-x-2"
        >
          <Upload className="w-5 h-5" />
          <span>Choose Photo</span>
        </button>

        {/* Drag and Drop Area */}
        <div 
          className={`w-full p-8 border-2 border-dashed rounded-lg text-center transition-all duration-300 cursor-pointer ${
            isDragging 
              ? 'border-blue-400 bg-blue-50' 
              : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={triggerFileInput}
        >
          <div className="space-y-2">
            <Upload className={`w-8 h-8 mx-auto transition-colors ${
              isDragging ? 'text-blue-500' : 'text-gray-400'
            }`} />
            <p className={`text-sm font-medium transition-colors ${
              isDragging ? 'text-blue-600' : 'text-gray-600'
            }`}>
              {isDragging ? 'Drop your image here' : 'Drag & drop an image here'}
            </p>
            <p className="text-xs text-gray-500">
              or click to browse files
            </p>
          </div>
        </div>

        {/* File Guidelines */}
        <div className="text-center text-xs text-gray-500 space-y-1">
          <p>Supported formats: JPEG, PNG, GIF, WebP</p>
          <p>Maximum file size: 5MB</p>
          <p>Recommended: Square images (1:1 ratio)</p>
        </div>
      </div>

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
}