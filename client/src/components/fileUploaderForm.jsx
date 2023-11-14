import React, { useState } from "react";
// import { createDirectory } from "./handlers";
// import { drive } from "handlers";

const FileUploadForm = () => {
  const [shootName, setShootName] = useState("");
  const [fileType, setFileType] = useState("image");
  const [category, setCategory] = useState("edited");
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

  const handleSubmit = (e) => {
    e.preventDefault();

    // Add your form submission logic here
    console.log("Shoot Name:", shootName);
    // CreateDirectory(shootName);
    // createDirectory(shootName);
    console.log("File Type:", fileType);
    console.log("Category:", category);
    console.log("Selected File:", selectedFile.name);

    // Reset form fields if needed
    setShootName("");
    setFileType("image");
    setCategory("edited");
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };
  return (
    <div className='max-w-md mx-auto p-4 bg-gray-100 rounded-md mt-8'>
      <form onSubmit={handleSubmit}>
        <label className='block text-lg font-semibold mb-2'>Shoot Name</label>
        <input
          type='text'
          value={shootName}
          onChange={handleShootNameChange}
          className='mb-4 p-2 w-full border rounded-md'
          required
        />

        <label className='block text-lg font-semibold mb-2'>File Type</label>
        <select
          value={fileType}
          onChange={handleFileTypeChange}
          className='mb-4 p-2 w-full border rounded-md'
        >
          <option value='image'>Image</option>
          <option value='video'>Video</option>
        </select>

        <label className='block text-lg font-semibold mb-2'>Category</label>
        <select
          value={category}
          onChange={handleCategoryChange}
          className='mb-4 p-2 w-full border rounded-md'
        >
          <option value='edited'>Edited</option>
          <option value='raw'>Raw</option>
        </select>
        <label className='block text-lg font-semibold mb-2'>Upload File</label>
        <input
          type='file'
          accept='image/*,video/*'
          onChange={handleFileChange}
          className='mb-4'
        />
        {selectedFile && (
          <div className='text-green-500 font-medium mb-4'>
            Selected File: {selectedFile.name}
          </div>
        )}
        <button
          type='submit'
          className='bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600'
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default FileUploadForm;
