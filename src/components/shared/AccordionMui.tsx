import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import "../../App.css";
import { useLanguage } from "../../context/LanguageContext";
import {
  AccordionSvg1,
  AccordionSvg2,
  AccordionSvg3,
} from "../SVG/Accordion";

export default function ControlledAccordions() {
  const [expanded, setExpanded] = React.useState<string | false>(false);
  const { language, componentsTranslations } = useLanguage();
  const page = componentsTranslations.accordionMui;

  const handleChange =
    (panel: string) => (_: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <div className="flex flex-wrap justify-center gap-5 max-w-7xl ">
      <div className=" w-full md:w-1/3 p-2">
        <div className="accordion ">
          <Accordion
            expanded={expanded === "panel1"}
            onChange={handleChange("panel1")}
            sx={{
              borderRadius: "12px",
              border: "1px solid #D0D0D0",
              boxShadow: "2px 2px 12px 0px #2323234D",
            }}
          >
            <AccordionSummary
              expandIcon={
                <img
                  src="/img/Comp_Prior/formkit_down.svg"
                  className="w-8 h-4 object-contain"
                />
              }
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <Typography
                component="span"
                sx={{ width: "100%", flexShrink: 0 }}
              >
                <div className="flex items-center">
                  <div>
                    <AccordionSvg1 />
                  </div>
                  <div className="ml-4 text-[20px] md:text-[30px] font-medium text-[#323232]">
                    {page.panel1.title[language]}
                  </div>
                </div>
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography className="text-center text-[#323232] font-semibold text-[14px] leading-[24px]">
                {page.panel1.content[language]}
              </Typography>
            </AccordionDetails>
          </Accordion>
        </div>
      </div>
      <div className="w-full md:w-1/3 p-2">
        <div className="accordion">
          <Accordion
            expanded={expanded === "panel2"}
            onChange={handleChange("panel2")}
            sx={{
              borderRadius: "12px",
              border: "1px solid #D0D0D0",
              boxShadow: "2px 2px 12px 0px #2323234D",
            }}
          >
            <AccordionSummary
              expandIcon={
                <img
                  src="/img/Comp_Prior/formkit_down.svg"
                  className="w-8 h-4 object-contain"
                />
              }
              aria-controls="panel2bh-content"
              id="panel2bh-header"
            >
              <Typography
                component="span"
                sx={{ width: "100%", flexShrink: 0 }}
              >
                <div className="flex items-center">
                  <div>
                    <AccordionSvg2 />
                  </div>
                  <div className="ml-4 text-[20px] md:text-[30px] font-medium text-[#323232]">
                    {page.panel2.title[language]}
                  </div>
                </div>
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography className="text-center text-[#323232] font-semibold text-[14px] leading-[24px]">
                {page.panel2.content[language]}
              </Typography>
            </AccordionDetails>
          </Accordion>
        </div>
      </div>
      <div className="w-full md:w-1/3 p-2">
        <div className="accordion">
          <Accordion
            expanded={expanded === "panel3"}
            onChange={handleChange("panel3")}
            sx={{
              borderRadius: "12px",
              border: "1px solid #D0D0D0",
              boxShadow: "2px 2px 12px 0px #2323234D",
            }}
          >
            <AccordionSummary
              expandIcon={
                <img
                  src="/img/Comp_Prior/formkit_down.svg"
                  className="w-8 h-4 object-contain"
                />
              }
              aria-controls="panel3bh-content"
              id="panel3bh-header"
            >
              <Typography
                component="span"
                sx={{ width: "100%", flexShrink: 0 }}
              >
                <div className="flex items-center">
                  <div>
                    <AccordionSvg3 />
                  </div>
                  <div className="ml-4 text-[20px] md:text-[30px] font-medium text-[#323232]">
                    {page.panel3.title[language]}
                  </div>
                </div>
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography className="text-center text-[#323232] font-semibold text-[14px] leading-[24px]">
                {page.panel3.content[language]}
              </Typography>
            </AccordionDetails>
          </Accordion>
        </div>
      </div>
    </div>
  );
}
