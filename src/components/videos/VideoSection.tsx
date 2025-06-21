const VideoSection = () => {
    return (
        <section className="w-full h-screen overflow-hidden">
            <video
                className="w-full h-full object-contain sm:object-cover"
                src="/video/video-section.mp4"
                autoPlay
                muted
                loop
                playsInline
            />
        </section>
    );
};

export default VideoSection;
