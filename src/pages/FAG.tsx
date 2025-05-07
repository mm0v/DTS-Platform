import AccordionExpandDefault from "../components/AccordionSimpleMui"

const FAG = () => {
  return (
    <div>
      <div className="mt-24">
        <div className="video-background">
          <video className="absolute w-full h-full object-cover" autoPlay loop muted>
            <source src="img/Navbar/bg-header.mp4" type="video/mp4" />
          </video>
        </div>

        <div className="text-center">
          <h1 className="text-4xl font-semibold text-white pb-20 mb-10">Tez-tez verilən suallar</h1>
        </div>

        <div style={{
          background: 'linear-gradient(to top, rgba(255, 255, 255, 1), rgba(52, 96, 220, .99)'
        }}>

          <div className="video-background">
            <video className="absolute w-full h-full object-cover" autoPlay loop muted>
              <source src="img/Navbar/bg-header.mp4" type="video/mp4" />
            </video>
          </div>

          <div className="max-w-2xl mx-auto pt-10 pb-10">
            <AccordionExpandDefault />
          </div>
        </div>

      </div>
    </div>
  );
};

export default FAG;