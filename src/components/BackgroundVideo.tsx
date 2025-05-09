const BackgroundVideo = () => {
  return (
    <video
      className="fixed top-0 left-0 w-full h-full object-cover -z-10"
      autoPlay
      muted
      loop
      playsInline // crucial for iPhones
    >
      <source src="/img/Navbar/bg-header.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
};

export default BackgroundVideo;
