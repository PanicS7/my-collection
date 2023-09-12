import { useAuth } from "../hooks/useAuth";
import useFirestore from "../hooks/useFirestore";

const ImageGallery = () => {
  const { docs: images, isLoading } = useFirestore("images");
  const { user } = useAuth();

  if (isLoading) {
    return (
      <div className="text-center mt-10">
        <progress className="progress w-56"></progress>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-3 justify-center gap-3 my-10">
      {images.map((image) => {
        if (user.email === image.email) {
          return (
            <div className="bg-red-500 rounded-xl">
              <div class="p-3">
                <div class="mb-2 flex flex-col items-center justify-between">
                  <p class="block font-sans text-white font-medium leading-relaxed text-blue-gray-900 antialiased">
                    {image.category}
                  </p>
                  <p class="block font-sans text-white font-medium leading-relaxed text-blue-gray-900 antialiased">
                    {image.title}
                  </p>
                </div>
              </div>
              <div class="relative h-96 overflow-hidden bg-white bg-clip-border text-gray-700">
                <img
                  src={image.imageUrl}
                  alt={image.title}
                  class="h-full w-full object-cover"
                />
              </div>
            </div>
          );
        }
      })}
    </div>
  );
};

export default ImageGallery;
