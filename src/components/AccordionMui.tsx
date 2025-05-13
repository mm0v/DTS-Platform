import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import "../App.css";
import { useLanguage } from "../context/LanguageContext";

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
              expandIcon={<img src="/img/Comp_Prior/formkit_down.svg" className="w-8 h-4 object-contain" />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <Typography
                component="span"
                sx={{ width: "100%", flexShrink: 0 }}
              >
                <div className="flex items-center">
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="54"
                      height="54"
                      viewBox="0 0 54 54"
                      fill="none"
                    >
                      <path
                        d="M14.172 27V23.1319C14.172 22.3282 14.573 21.6767 15.0675 21.6767H16.4296C16.9242 21.6767 17.3251 22.3282 17.3251 23.1319V27M1.1543 41.799H2.63199C3.47201 41.799 4.30292 42.0815 5.07251 42.6285L6.29456 43.4972C7.30842 44.2179 8.47315 44.1083 9.42905 43.2022C10.362 42.3177 11.4954 42.191 12.4941 42.8592L13.294 43.3947C14.4874 44.193 15.8293 44.1692 17.0117 43.3285L17.5392 42.9537C18.563 42.2257 19.737 42.3139 20.7151 43.1924C21.7296 44.1034 22.9525 44.1626 23.9984 43.3513L24.4322 43.0149C25.4131 42.2544 26.5621 42.3317 27.5008 43.2214C28.4397 44.1115 29.5887 44.1888 30.5696 43.4279L31.1475 42.9799C32.0999 42.2411 33.2158 42.3163 34.1273 43.1805C35.0866 44.0894 36.2678 44.1223 37.2454 43.2669L37.3956 43.1357C38.3579 42.2936 39.5072 42.2323 40.5014 42.9698L41.3636 43.6096C42.235 44.256 43.2476 44.1528 44.0628 43.3348L44.2493 43.1476C45.071 42.3226 46.1107 42.3342 46.9255 43.1766C47.7844 44.0649 48.8881 44.0257 49.7222 43.0769L50.0436 42.7115C50.5657 42.1175 51.1875 41.799 51.8248 41.799H52.8466M1.1543 49.7923H2.63199C3.47201 49.7923 4.30292 50.0748 5.07251 50.6218L6.29456 51.4905C7.30842 52.2112 8.47315 52.1016 9.42905 51.1955C10.362 50.311 11.4954 50.1843 12.4941 50.8525L13.294 51.388C14.4874 52.1863 15.8293 52.1625 17.0117 51.3222L17.5392 50.947C18.563 50.219 19.737 50.3075 20.7151 51.1857C21.7296 52.0967 22.9525 52.1559 23.9984 51.3446L24.4322 51.0082C25.4131 50.2477 26.5621 50.325 27.5008 51.2147C28.4397 52.1048 29.5887 52.1821 30.5696 51.4212L31.1475 50.9732C32.0999 50.2344 33.2158 50.3096 34.1273 51.1738C35.0866 52.0831 36.2678 52.1156 37.2454 51.2602L37.3956 51.129C38.3579 50.2869 39.5072 50.2256 40.5014 50.9631L41.3636 51.6029C42.235 52.2493 43.2476 52.1464 44.0628 51.3281L44.2493 51.1409C45.071 50.3163 46.1107 50.3275 46.9255 51.1699C47.7844 52.0582 48.8881 52.019 49.7222 51.0702L50.0436 50.7048C50.5657 50.1108 51.1875 49.7923 51.8248 49.7923H52.8466M10.2837 42.477L5.93314 31.8728M5.93314 31.8728V29.1422C5.93314 28.3385 6.33408 27.687 6.82865 27.687H46.3097C46.8042 27.687 47.205 28.3385 47.205 29.1422V31.8728M5.93314 31.8728H47.205M47.205 31.8728L43.5989 43.7793M28.2583 27.5939V9.92021H35.5277M35.5277 9.92021V1.36243H43.4845V9.92021M35.5277 9.92021H43.4845M35.5277 9.92021V19.1291V27.5939M43.4845 9.92021V27.5939M43.4849 19.1291H28.3154"
                        stroke="url(#paint0_linear_867_2661)"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <defs>
                        <linearGradient
                          id="paint0_linear_867_2661"
                          x1="-0.856661"
                          y1="49.5757"
                          x2="56.7324"
                          y2="45.6856"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stop-color="#377FD3" />
                          <stop offset="0.1517" stop-color="#4978D6" />
                          <stop offset="0.4551" stop-color="#7866DF" />
                          <stop offset="0.6336" stop-color="#975BE4" />
                          <stop offset="0.6909" stop-color="#9959DF" />
                          <stop offset="0.7542" stop-color="#9F52D2" />
                          <stop offset="0.8206" stop-color="#A946BC" />
                          <stop offset="0.8889" stop-color="#B6369D" />
                          <stop offset="0.9581" stop-color="#C82276" />
                          <stop offset="1" stop-color="#D4145A" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                  <div className="ml-4 text-[20px] md:text-[30px] font-medium text-[#323232]">
                    {page.panel1.title[language]}
                  </div>
                </div>
              </Typography>
              {/* <Typography component="span" sx={{ color: 'text.secondary' }}>
                        I am an accordion
                    </Typography> */}
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
              expandIcon={<img src="/img/Comp_Prior/formkit_down.svg" className="w-8 h-4 object-contain" />}
              aria-controls="panel2bh-content"
              id="panel2bh-header"
            >
              <Typography
                component="span"
                sx={{ width: "100%", flexShrink: 0 }}
              >
                <div className="flex items-center">
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="56"
                      height="56"
                      viewBox="0 0 56 56"
                      fill="none"
                    >
                      <g clip-path="url(#clip0_867_589)">
                        <path
                          d="M34.6929 33.5563C34.6929 35.3316 33.9877 37.0342 32.7323 38.2895C31.477 39.5448 29.7744 40.25 27.9991 40.25C26.2238 40.25 24.5213 39.5448 23.2659 38.2895C22.0106 37.0342 21.3054 35.3316 21.3054 33.5563C21.3054 31.781 22.0106 30.0784 23.2659 28.8231C24.5213 27.5678 26.2238 26.8625 27.9991 26.8625C29.7744 26.8625 31.477 27.5678 32.7323 28.8231C33.9877 30.0784 34.6929 31.781 34.6929 33.5563ZM41.7541 54.0225H14.2441C14.2441 46.4188 20.3954 40.25 27.9991 40.25C35.6029 40.2588 41.7541 46.4188 41.7541 54.0225Z"
                          fill="url(#paint0_linear_867_589)"
                        />
                        <path
                          d="M30.9657 4.94379C30.9657 6.58004 29.6357 7.91004 27.9995 7.91004C26.3632 7.91004 25.0332 6.58004 25.0332 4.94379C25.0332 3.30754 26.3632 1.97754 27.9995 1.97754C29.6357 1.97754 30.9657 3.29879 30.9657 4.94379Z"
                          fill="url(#paint1_linear_867_589)"
                        />
                        <path
                          d="M15.155 8.05875C16.0912 9.3975 15.7675 11.2525 14.4287 12.1887C13.09 13.125 11.235 12.8012 10.2987 11.4625C9.36249 10.1237 9.68624 8.26875 11.025 7.3325C11.3434 7.10779 11.7032 6.94827 12.0835 6.86313C12.4638 6.778 12.8572 6.76891 13.2411 6.83641C13.6249 6.90391 13.9916 7.04666 14.3201 7.25644C14.6486 7.46622 14.9323 7.73889 15.155 8.05875Z"
                          fill="url(#paint2_linear_867_589)"
                        />
                        <path
                          d="M3.98157 19.6788C5.52157 20.2388 6.31782 21.945 5.75782 23.485C5.19782 25.025 3.49157 25.8213 1.95157 25.2613C0.411569 24.7013 -0.384681 22.995 0.175319 21.455C0.445603 20.7156 0.997984 20.1134 1.71143 19.7804C2.42488 19.4475 3.24121 19.4109 3.98157 19.6788Z"
                          fill="url(#paint3_linear_867_589)"
                        />
                        <path
                          d="M45.7106 11.4625C45.4874 11.7816 45.2033 12.0535 44.8748 12.2628C44.5463 12.472 44.1798 12.6145 43.7962 12.6819C43.4126 12.7494 43.0195 12.7405 42.6393 12.6559C42.2592 12.5713 41.8994 12.4125 41.5806 12.1887C41.2615 11.9654 40.9896 11.6814 40.7803 11.3529C40.5711 11.0244 40.4286 10.6579 40.3612 10.2743C40.2937 9.8907 40.3026 9.49757 40.3872 9.1174C40.4718 8.73723 40.6306 8.37747 40.8544 8.05871C41.7906 6.71996 43.6456 6.38746 44.9844 7.33246C46.3231 8.27746 46.6469 10.115 45.7106 11.4625Z"
                          fill="url(#paint4_linear_867_589)"
                        />
                        <path
                          d="M27.9994 11.0687C27.5182 11.0687 27.1244 11.4625 27.1244 11.9437V20.6762C27.1244 21.1575 27.5182 21.5512 27.9994 21.5512C28.4807 21.5512 28.8744 21.1575 28.8744 20.6762V11.9437C28.8744 11.4625 28.4807 11.0687 27.9994 11.0687ZM17.4557 14.9975C17.1757 14.6037 16.6332 14.5075 16.2394 14.7787C15.8457 15.0587 15.7494 15.6012 16.0207 15.995L21.0257 23.1525C21.0911 23.2468 21.1745 23.3272 21.2711 23.3892C21.3676 23.4513 21.4755 23.4937 21.5884 23.514C21.7014 23.5343 21.8173 23.5321 21.9294 23.5076C22.0415 23.4832 22.1477 23.4368 22.2419 23.3712C22.6357 23.0912 22.7319 22.5487 22.4607 22.155L17.4557 14.9975ZM18.0507 27.0287L9.84317 24.045C9.73517 24.0057 9.62049 23.9882 9.50569 23.9933C9.39089 23.9985 9.27824 24.0262 9.17419 24.075C9.07014 24.1238 8.97674 24.1926 8.89935 24.2775C8.82195 24.3625 8.76208 24.4619 8.72317 24.57C8.55692 25.025 8.79317 25.5237 9.24817 25.69L17.4557 28.6737C17.5637 28.713 17.6784 28.7305 17.7931 28.7254C17.9079 28.7202 18.0206 28.6925 18.1246 28.6437C18.2287 28.5949 18.3221 28.5261 18.3995 28.4412C18.4769 28.3562 18.5368 28.2568 18.5757 28.1487C18.6149 28.0407 18.6325 27.926 18.6273 27.8112C18.6222 27.6964 18.5944 27.5838 18.5457 27.4797C18.4969 27.3757 18.4281 27.2823 18.3431 27.2049C18.2582 27.1275 18.1588 27.0676 18.0507 27.0287ZM39.7682 14.7787C39.6744 14.712 39.5682 14.6647 39.4559 14.6396C39.3435 14.6144 39.2273 14.612 39.114 14.6323C39.0008 14.6527 38.8927 14.6955 38.7962 14.7582C38.6996 14.8209 38.6166 14.9023 38.5519 14.9975L33.5382 22.155C33.4715 22.2488 33.4241 22.3549 33.399 22.4673C33.3739 22.5796 33.3714 22.6958 33.3918 22.8091C33.4122 22.9224 33.455 23.0305 33.5177 23.127C33.5804 23.2235 33.6617 23.3066 33.7569 23.3712C33.9057 23.4762 34.0807 23.5287 34.2557 23.5287C34.5357 23.5287 34.8069 23.3975 34.9732 23.1525L39.9869 15.995C40.2582 15.6012 40.1619 15.0587 39.7682 14.7787ZM47.2757 24.5612C47.2368 24.4531 47.1769 24.3537 47.0995 24.2688C47.0221 24.1838 46.9287 24.115 46.8246 24.0662C46.7206 24.0175 46.6079 23.9897 46.4931 23.9846C46.3784 23.9794 46.2637 23.997 46.1557 24.0362L37.9482 27.02C37.4932 27.1862 37.2569 27.685 37.4232 28.14C37.4621 28.2481 37.522 28.3475 37.5993 28.4324C37.6767 28.5174 37.7701 28.5862 37.8742 28.635C37.9782 28.6837 38.0909 28.7115 38.2057 28.7166C38.3205 28.7218 38.4352 28.7042 38.5432 28.665L46.7507 25.6812C47.2057 25.5237 47.4419 25.0162 47.2757 24.5612Z"
                          fill="#C5C5C5"
                        />
                        <path
                          d="M54.048 25.2612C52.508 25.8212 50.8017 25.025 50.2417 23.485C49.6817 21.945 50.478 20.2387 52.018 19.6787C53.558 19.1187 55.2642 19.915 55.8242 21.455C56.3842 22.995 55.588 24.7012 54.048 25.2612Z"
                          fill="url(#paint5_linear_867_589)"
                        />
                      </g>
                      <defs>
                        <linearGradient
                          id="paint0_linear_867_589"
                          x1="13.1739"
                          y1="52.71"
                          x2="43.8241"
                          y2="50.6548"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stop-color="#377FD3" />
                          <stop offset="0.1517" stop-color="#4978D6" />
                          <stop offset="0.4551" stop-color="#7866DF" />
                          <stop offset="0.6336" stop-color="#975BE4" />
                          <stop offset="0.6909" stop-color="#9959DF" />
                          <stop offset="0.7542" stop-color="#9F52D2" />
                          <stop offset="0.8206" stop-color="#A946BC" />
                          <stop offset="0.8889" stop-color="#B6369D" />
                          <stop offset="0.9581" stop-color="#C82276" />
                          <stop offset="1" stop-color="#D4145A" />
                        </linearGradient>
                        <linearGradient
                          id="paint1_linear_867_589"
                          x1="24.8024"
                          y1="7.62335"
                          x2="31.4128"
                          y2="7.18573"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stop-color="#377FD3" />
                          <stop offset="0.1517" stop-color="#4978D6" />
                          <stop offset="0.4551" stop-color="#7866DF" />
                          <stop offset="0.6336" stop-color="#975BE4" />
                          <stop offset="0.6909" stop-color="#9959DF" />
                          <stop offset="0.7542" stop-color="#9F52D2" />
                          <stop offset="0.8206" stop-color="#A946BC" />
                          <stop offset="0.8889" stop-color="#B6369D" />
                          <stop offset="0.9581" stop-color="#C82276" />
                          <stop offset="1" stop-color="#D4145A" />
                        </linearGradient>
                        <linearGradient
                          id="paint2_linear_867_589"
                          x1="9.53312"
                          y1="12.4371"
                          x2="16.1368"
                          y2="12.0004"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stop-color="#377FD3" />
                          <stop offset="0.1517" stop-color="#4978D6" />
                          <stop offset="0.4551" stop-color="#7866DF" />
                          <stop offset="0.6336" stop-color="#975BE4" />
                          <stop offset="0.6909" stop-color="#9959DF" />
                          <stop offset="0.7542" stop-color="#9F52D2" />
                          <stop offset="0.8206" stop-color="#A946BC" />
                          <stop offset="0.8889" stop-color="#B6369D" />
                          <stop offset="0.9581" stop-color="#C82276" />
                          <stop offset="1" stop-color="#D4145A" />
                        </linearGradient>
                        <linearGradient
                          id="paint3_linear_867_589"
                          x1="-0.235024"
                          y1="25.1535"
                          x2="6.3848"
                          y2="24.7151"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stop-color="#377FD3" />
                          <stop offset="0.1517" stop-color="#4978D6" />
                          <stop offset="0.4551" stop-color="#7866DF" />
                          <stop offset="0.6336" stop-color="#975BE4" />
                          <stop offset="0.6909" stop-color="#9959DF" />
                          <stop offset="0.7542" stop-color="#9F52D2" />
                          <stop offset="0.8206" stop-color="#A946BC" />
                          <stop offset="0.8889" stop-color="#B6369D" />
                          <stop offset="0.9581" stop-color="#C82276" />
                          <stop offset="1" stop-color="#D4145A" />
                        </linearGradient>
                        <linearGradient
                          id="paint4_linear_867_589"
                          x1="40.0857"
                          y1="12.44"
                          x2="46.6926"
                          y2="12.0029"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stop-color="#377FD3" />
                          <stop offset="0.1517" stop-color="#4978D6" />
                          <stop offset="0.4551" stop-color="#7866DF" />
                          <stop offset="0.6336" stop-color="#975BE4" />
                          <stop offset="0.6909" stop-color="#9959DF" />
                          <stop offset="0.7542" stop-color="#9F52D2" />
                          <stop offset="0.8206" stop-color="#A946BC" />
                          <stop offset="0.8889" stop-color="#B6369D" />
                          <stop offset="0.9581" stop-color="#C82276" />
                          <stop offset="1" stop-color="#D4145A" />
                        </linearGradient>
                        <linearGradient
                          id="paint5_linear_867_589"
                          x1="49.8314"
                          y1="25.1534"
                          x2="56.4512"
                          y2="24.7151"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stop-color="#377FD3" />
                          <stop offset="0.1517" stop-color="#4978D6" />
                          <stop offset="0.4551" stop-color="#7866DF" />
                          <stop offset="0.6336" stop-color="#975BE4" />
                          <stop offset="0.6909" stop-color="#9959DF" />
                          <stop offset="0.7542" stop-color="#9F52D2" />
                          <stop offset="0.8206" stop-color="#A946BC" />
                          <stop offset="0.8889" stop-color="#B6369D" />
                          <stop offset="0.9581" stop-color="#C82276" />
                          <stop offset="1" stop-color="#D4145A" />
                        </linearGradient>
                        <clipPath id="clip0_867_589">
                          <rect width="56" height="56" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </div>
                  <div className="ml-4 text-[20px] md:text-[30px] font-medium text-[#323232]">
                    {page.panel2.title[language]}
                  </div>
                </div>
              </Typography>
              {/* <Typography component="span" sx={{ color: 'text.secondary' }}>
                        You are currently not an owner
                    </Typography> */}
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
              expandIcon={<img src="/img/Comp_Prior/formkit_down.svg" className="w-8 h-4 object-contain" />}
              aria-controls="panel3bh-content"
              id="panel3bh-header"
            >
              <Typography
                component="span"
                sx={{ width: "100%", flexShrink: 0 }}
              >
                <div className="flex items-center">
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="57"
                      height="56"
                      viewBox="0 0 57 56"
                      fill="none"
                    >
                      <path
                        d="M11.1395 16.24H23.4595C26.7635 16.24 29.5635 13.832 30.0675 10.64H30.1795C33.8755 10.64 36.8995 7.61605 36.8995 3.92005C36.8995 3.30405 36.3955 2.80005 35.7795 2.80005H23.4595C20.1555 2.80005 17.3555 5.20805 16.8515 8.40005H16.7395C13.0435 8.40005 10.0195 11.424 10.0195 15.12C10.0195 15.736 10.5235 16.24 11.1395 16.24ZM23.4595 5.04005H34.5475C34.0435 6.94405 32.3075 8.40005 30.1795 8.40005H19.0915C19.5955 6.49605 21.3875 5.04005 23.4595 5.04005ZM16.7395 10.64H27.8275C27.3235 12.6 25.5875 14 23.4595 14H12.3715C12.8755 12.04 14.6675 10.64 16.7395 10.64ZM33.6515 18.48H33.5395C29.8435 18.48 26.8195 21.504 26.8195 25.2C26.8195 25.816 27.3235 26.32 27.9395 26.32H40.2595C43.5635 26.32 46.3635 23.912 46.8675 20.72H46.9795C50.6755 20.72 53.6995 17.696 53.6995 14C53.6995 13.384 53.1955 12.88 52.5795 12.88H40.2595C36.9555 12.88 34.1555 15.288 33.6515 18.48ZM40.2595 24.08H29.1715C29.6755 22.12 31.4115 20.72 33.5395 20.72H44.6275C44.1235 22.68 42.3315 24.08 40.2595 24.08ZM40.2595 15.12H51.3475C50.8435 17.08 49.1075 18.48 46.9795 18.48H35.8915C36.4515 16.52 38.1875 15.12 40.2595 15.12Z"
                        fill="url(#paint0_linear_867_1385)"
                      />
                      <path
                        d="M52.5808 50.96H38.9728L36.0608 32.536C35.7808 30.912 34.3808 29.68 32.7568 29.68H28.7248C27.0448 29.68 25.6448 30.856 25.4208 32.536L24.3568 39.368L22.5648 22.624C22.3968 20.888 20.9408 19.6 19.2048 19.6H12.0368C10.3008 19.6 8.90078 20.888 8.67678 22.624L5.65278 50.96H4.42078C3.80478 50.96 3.30078 51.464 3.30078 52.08C3.30078 52.696 3.80478 53.2 4.42078 53.2H52.5808C53.1968 53.2 53.7008 52.696 53.7008 52.08C53.7008 51.464 53.1968 50.96 52.5808 50.96ZM10.9168 22.848C10.9728 22.288 11.4768 21.84 12.0368 21.84H19.2048C19.7648 21.84 20.2688 22.288 20.3248 22.848L20.5488 25.2H10.6928L10.9168 22.848ZM10.4128 27.44H20.7728L21.1088 30.8H10.0768L10.4128 27.44ZM7.89278 50.96L9.79678 33.04H21.3888L23.2928 50.96H7.89278ZM27.6048 32.872C27.7168 32.312 28.1648 31.92 28.7248 31.92H32.7568C33.3168 31.92 33.7648 32.312 33.8768 32.872L34.2688 35.28H27.2688L27.6048 32.872ZM26.8768 37.52H34.5488L35.1088 40.88H26.3728L26.8768 37.52ZM25.5888 50.96L25.2528 47.88L25.9808 43.12H35.4448L36.6768 50.96H25.5888Z"
                        fill="url(#paint1_linear_867_1385)"
                      />
                      <defs>
                        <linearGradient
                          id="paint0_linear_867_1385"
                          x1="8.32027"
                          y1="25.1834"
                          x2="56.4771"
                          y2="19.2628"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stop-color="#377FD3" />
                          <stop offset="0.1517" stop-color="#4978D6" />
                          <stop offset="0.4551" stop-color="#7866DF" />
                          <stop offset="0.6336" stop-color="#975BE4" />
                          <stop offset="0.6909" stop-color="#9959DF" />
                          <stop offset="0.7542" stop-color="#9F52D2" />
                          <stop offset="0.8206" stop-color="#A946BC" />
                          <stop offset="0.8889" stop-color="#B6369D" />
                          <stop offset="0.9581" stop-color="#C82276" />
                          <stop offset="1" stop-color="#D4145A" />
                        </linearGradient>
                        <linearGradient
                          id="paint1_linear_867_1385"
                          x1="1.3401"
                          y1="51.5762"
                          x2="57.1948"
                          y2="46.0298"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stop-color="#377FD3" />
                          <stop offset="0.1517" stop-color="#4978D6" />
                          <stop offset="0.4551" stop-color="#7866DF" />
                          <stop offset="0.6336" stop-color="#975BE4" />
                          <stop offset="0.6909" stop-color="#9959DF" />
                          <stop offset="0.7542" stop-color="#9F52D2" />
                          <stop offset="0.8206" stop-color="#A946BC" />
                          <stop offset="0.8889" stop-color="#B6369D" />
                          <stop offset="0.9581" stop-color="#C82276" />
                          <stop offset="1" stop-color="#D4145A" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                  <div className="ml-4 text-[20px] md:text-[30px] font-medium text-[#323232]">
                    {page.panel3.title[language]}
                  </div>
                </div>
              </Typography>
              {/* <Typography component="span" sx={{ color: 'text.secondary' }}>
                        Filtering has been entirely disabled for whole web server
                    </Typography> */}
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
