const UploadForm = () => {
  return (
    <div className="text-center mt-10">
      <form className="flex items-center flex-col gap-8">
        <input type="text" placeholder="Enter title" className="input input-bordered w-full max-w-xs" />
        <input type="file" className="file-input file-input-bordered w-full max-w-xs" />
        <button className="btn">Upload</button>
      </form>
    </div>
  )
}

export default UploadForm