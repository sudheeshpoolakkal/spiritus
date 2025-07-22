import mentalVideo from '../assets/video/mental.mp4';

const PromoVideo = () => {
  return (
    <div className="w-full flex justify-center items-center p-4">
      <video
        className="rounded-xl shadow-lg max-w-4xl w-full"
        controls
        autoPlay
        muted
        loop
      >
        <source src={mentalVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default PromoVideo;
