import React, { useState } from 'react';

const FileUploadForm = () => {
  const [shootName, setShootName] = useState('');
  const [fileType, setFileType] = useState('image');
  const [category, setCategory] = useState('edited');
  const [selectedFile, setSelectedFile] = useState(null);

  const handleShootNameChange = (e) => {
    setShootName(e.target.value);
  };

  const handleFileTypeChange = (e) => {
    setFileType(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your form submission logic here
    console.log('Form submitted:', {
      shootName,
      fileType,
      category,
      selectedFile,
    });
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-gray-100 rounded-md mt-8">
      <form onSubmit={handleSubmit}>
        <label className="block text-lg font-semibold mb-2">Shoot Name</label>
        <input
          type="text"
          value={shootName}
          onChange={handleShootNameChange}
          className="mb-4 w-full p-2 border border-gray-300 rounded-md"
        />

        <label className="block text-lg font-semibold mb-2">File Type</label>
        <select
          value={fileType}
          onChange={handleFileTypeChange}
          className="mb-4 w-full p-2 border border-gray-300 rounded-md"
        >
          <option value="image">Image</option>
          <option value="video">Video</option>
        </select>

        <label className="block text-lg font-semibold mb-2">Category</label>
        <select
          value={category}
          onChange={handleCategoryChange}
          className="mb-4 w-full p-2 border border-gray-300 rounded-md"
        >
          <option value="edited">Edited</option>
          <option value="raw">Raw</option>
        </select>

        <label className="block text-lg font-semibold mb-2">
          Upload File
        </label>
        <input
          type={fileType}
          accept={`${fileType}/*`}
          onChange={handleFileChange}
          className="mb-4"
        />

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default FileUploadForm;
