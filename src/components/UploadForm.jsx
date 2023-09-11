import { useState } from "react";
import useStorage from "../hooks/useStorage";

const UploadForm = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const { startUpload } = useStorage()

  const handleFileChange = (e) => {
    if(e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0])
    }
  }

  const handleUpload = (e) => {
    e.preventDefault()

    if(selectedFile) {
      startUpload(selectedFile)
    }

    setSelectedFile(null)
  }

  return (
    <div className="text-center mt-10">
      <form
        onSubmit={handleUpload}
        className="flex items-center flex-col gap-8"
      >
        <input
          type="text"
          placeholder="Enter title"
          className="input input-bordered w-full max-w-xs"
        />
        <input
          type="file"
          onChange={handleFileChange}
          className="file-input file-input-bordered w-full max-w-xs"
        />
        <button className="btn">Upload</button>
      </form>
    </div>
  );
};

export default UploadForm;
