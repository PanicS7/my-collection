import { useAuth } from "../hooks/useAuth";
import useFirestore from "../hooks/useFirestore";

const ImageGallery = () => {
  const { docs: images, isLoading, itemCount } = useFirestore("images");
  const { user } = useAuth();

  if (isLoading) {
    return (
      <div className="text-center mt-10">
        <progress className="progress w-56"></progress>
      </div>
    );
  }

  return (
    <div>
      <div className="stats shadow">
        <div className="stat">
          <div className="stat-title">Total Items Count</div>
          <div className="stat-value">{itemCount}</div>
        </div>
      </div>
      <div className="grid md:grid-cols-3 justify-center gap-3 my-10">
        {images.map((image) => {
          if (user.email === image.email) {
            return (
              <div className="bg-red-500 rounded-xl" key={image.imageUrl}>
                <div className="p-3">
                  <div className="mb-2 flex flex-col items-center justify-between">
                    <p className="block font-sans text-white font-medium leading-relaxed text-blue-gray-900 antialiased">
                      {image.category}
                    </p>
                    <p className="block font-sans text-white font-medium leading-relaxed text-blue-gray-900 antialiased">
                      {image.title}
                    </p>
                  </div>
                </div>
                <div className="relative h-96 overflow-hidden bg-white bg-clip-border text-gray-700">
                  <img
                    src={image.imageUrl}
                    alt={image.title}
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
};

export default ImageGallery;
