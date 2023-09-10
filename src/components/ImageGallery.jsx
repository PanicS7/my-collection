const ImageGallery = () => {
  return (
    <div className="grid md:grid-cols-3 justify-center gap-4 mt-10">
      <div className="card w-96 bg-base-100 shadow-xl bg-red-800">
        <div className="card-body items-center">
          <h2 className="card-title text-white">Title</h2>
        </div>
        <figure>
          <img
            src="https://images.unsplash.com/photo-1693824113540-229fee32c238?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80"
            alt="Shoes"
          />
        </figure>
      </div>
    </div>
  );
};

export default ImageGallery;
