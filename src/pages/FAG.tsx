import AccordionExpandDefault from "../components/AccordionSimpleMui"

const FAG = () => {
  return (
    <div style={{ background: "linear-gradient(180deg, rgba(35, 42, 96, 0.90) -4.83%, rgba(0, 0, 0, 0.00) 102.71%)" }}>
      <div className="video-background">


        <video className="absolute w-full h-full object-cover" autoPlay loop muted>
          <source src="img/Navbar/bg-header.mp4" type="video/mp4" />
        </video>

      </div>
      <div className="max-w-2xl mx-auto pt-10 pb-10">
        <AccordionExpandDefault />
      </div>
    </div>
  )
}

export default FAG