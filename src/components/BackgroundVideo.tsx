const BackgroundVideo = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full -z-10">
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src="/img/Navbar/bg-header.mp4" type="video/mp4" />
        Your browser does not support the video tag. 
        {/* localization */}
      </video>

      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-70"></div>
    </div>
  );
};

export default BackgroundVideo;
