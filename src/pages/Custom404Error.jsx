import image from "../components/image";

const Custom404Error = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <img src={image.errorImage} alt="error image" />
    </div>
  );
};

export default Custom404Error;
