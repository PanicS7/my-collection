import { useState } from "react";
import useStorage from "../hooks/useStorage";

const UploadForm = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const { startUpload, progress } = useStorage()
  const [selectedValue, setSelectedValue] = useState("")
  const [title, setTitle] = useState("")

  const handleFileChange = (e) => {
    if(e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0])
      setSelectedValue(e.target.value)
    }
  }

  const handleTitleChange = (e) => {
    setTitle(e.target.value)
  }

  const handleUpload = (e) => {
    e.preventDefault()

    if(selectedFile && title) {
      startUpload(selectedFile, title)
    }

    setSelectedFile(null)
    setSelectedValue("")
    setTitle("")
  }

  return (
    <div className="text-center mt-10">
      <form
        onSubmit={handleUpload}
        className="flex items-center flex-col gap-8"
      >
        <input
          type="text"
          value={title}
          placeholder="Enter title"
          onChange={handleTitleChange}
          required
          className="input input-bordered w-full max-w-xs"
        />
        <input
          type="file"
          onChange={handleFileChange}
          value={selectedValue}
          required
          className="file-input file-input-bordered w-full max-w-xs"
        />
        { progress === 100 && 
        <div className="alert alert-success">
          <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          <span>Successfully uploaded to database</span>
        </div> 
        }
        <button
          type="submit"
          className="btn"
          disabled={!selectedFile}
        >
          <span className={`${Boolean(progress) && 'loading'}`}></span>
          Upload
        </button>
      </form>
    </div>
  );
};

export default UploadForm;
