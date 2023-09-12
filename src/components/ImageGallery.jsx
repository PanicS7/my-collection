import { useAuth } from "../hooks/useAuth";
import useFirestore from "../hooks/useFirestore";

const ImageGallery = () => {
  const { docs: images, isLoading } = useFirestore("images");
  const { user } = useAuth()

  if (isLoading) {
    return (
      <div className="text-center mt-10">
        <progress className="progress w-56"></progress>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-3 justify-center gap-3 mt-10">
      {images.map((image) => {
        if(user.email === image.email) {
          return (
            <div className="card w-full bg-base-100 shadow-xl bg-red-800" key={image.imageUrl}>
              <div className="card-body items-center max-h-[5rem] flex justify-center">
                <h2 className="card-title text-white">Title: {image.title}</h2>
                <p className="text-white">Category: {image.category}</p>
              </div>
              <figure className="max-h-[11rem]">
                <img
                  src={image.imageUrl}
                  alt={image.title}
                />
              </figure>
            </div>
            )
          }
        }
      )}
    </div>
  );
};

export default ImageGallery;
