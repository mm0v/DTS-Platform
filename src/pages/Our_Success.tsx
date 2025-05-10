import { useState } from "react";
import BackgroundVideo from "../components/BackgroundVideo";
import { useLanguage } from "../context/LanguageContext";

const Our_Success = () => {
  const [expanded1, setExpanded1] = useState(false);
  const [expanded2, setExpanded2] = useState(false);
  const [expanded3, setExpanded3] = useState(false);

  const { language, pagesTranslations } = useLanguage();
  const page = pagesTranslations.success;

  return (
    <div className="mt-24">

      <BackgroundVideo />

      {/* <div className="video-background">
        <video
          className="absolute w-full h-full object-cover"
          autoPlay
          loop
          muted
        >
          <source src="img/Navbar/bg-header.mp4" type="video/mp4" />
        </video>
      </div> */}

      <div className="text-center">
        <h1 className="text-2xl md:text-5xl font-semibold text-[#FAFAFA] pb-20 mb-10 leading-[36px] md:leading-[48px]">
          {page.pageTitle[language]}
        </h1>
      </div>

      <div className="bg-[#FAFAFA] pt-10 pb-10 ">
        <div className="text-center mb-6">
          <h1 className="mb-2 font-medium text-[24px] md:text-[36px] leading-[32px] md:leading-[40px] text-[#323232]">
            {page.storiesTitle[language]}
          </h1>
          <p className=" max-w-5xl p-2 mx-auto mt-4 text-[16px] md:text-[18px] leading-[140%] md:leading-[120%] text-[#323232]">
            {page.description[language]}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto">
          {/* Card 1 */}
          <div
            className={`bg-white rounded-lg p-6 m-4 shadow-[2px_2px_12px_0px_#2323234D] border-[1px] border-[#D0D0D0] flex flex-col transition-all duration-300 ease-in-out overflow-hidden ${expanded1 ? "max-h-[1000px]" : "max-h-[260px]"
              }`}
          >
            <div className="flex flex-col items-center justify-center text-center">
              <div className="h-[100px] flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="269"
                  height="102"
                  viewBox="0 0 269 102"
                  fill="none"
                >
                  <g clip-path="url(#clip0_937_374)">
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M32.3738 63.0184L35.1129 69.6319L37.7652 76H26.9824L29.6347 69.6319L32.3738 63.0184Z"
                      fill="#ED1C24"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M20.004 29.4233C21.9746 24.6748 29.1136 25.0429 30.9851 29.4233L32.4104 32.7485C32.869 31.6564 33.3275 30.5521 33.7861 29.4233C35.7568 24.6748 42.8957 25.0552 44.7796 29.4233L64.7464 76.0491H54.5337L39.2767 40.5399L37.5167 44.6748C42.0653 55.3129 46.1925 65.3865 50.7535 76H40.7516C37.9629 69.5092 35.1495 63.092 32.3856 56.6748C29.6217 63.1288 26.7711 69.5215 23.9701 76.0368H13.9681C18.5167 65.3865 22.7059 55.3742 27.2669 44.7362L25.4697 40.5399L10.2499 76H0C4.52382 65.4478 15.381 40.5767 20.004 29.3742V29.4233Z"
                      fill="#939598"
                    />
                    <path
                      d="M69.1094 76V34.4417H81.8009L89.4108 62.8098L96.9464 34.4417H109.663V76H101.792V43.2883L93.4513 76H85.2836L76.9796 43.2883V76H69.1094ZM118.091 76V34.4417H149.212V41.4724H126.556V50.6871H147.626V57.681H126.556V68.9448H149.968V75.9509L118.091 76ZM166.65 76V41.4724H154.194V34.4417H187.559V41.4724H175.165V76H166.65ZM226.538 76H217.317L213.599 66.5644H196.867L193.409 76H184.411L200.784 34.4417H209.757L226.563 76H226.538ZM210.934 59.5583L205.146 44.135L199.47 59.5583H210.934ZM231.149 76V34.4417H239.626V52.8466L256.743 34.4417H268.145L252.343 50.6258L268.951 76H258.044L246.505 56.4908L239.626 63.4478V76H231.149Z"
                      fill="#ED1C24"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_937_374">
                      <rect
                        width="269"
                        height="50"
                        fill="white"
                        transform="translate(0 26)"
                      />
                    </clipPath>
                  </defs>
                </svg>
              </div>
              <div className="mt-6">
                <p
                  onClick={() => setExpanded1(!expanded1)}
                  className={`font-normal text-16 text-[#323232] text-center  cursor-pointer transition-all duration-300 ease-in-out ${expanded1
                    ? "max-h-full whitespace-normal line-clamp-none"
                    : "max-h-[6.8em] overflow-hidden line-clamp-4"
                    }`}
                >
                  {page.metak[language]}
                </p>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div
            className={`bg-white rounded-lg p-6 m-4 shadow-[2px_2px_12px_0px_#2323234D] border-[1px] border-[#D0D0D0] flex flex-col transition-all duration-300 ease-in-out overflow-hidden ${expanded2 ? "max-h-[1000px]" : "max-h-[260px]"
              }`}
          >
            {" "}
            <div className="flex flex-col items-center justify-center text-center">
              <div className="h-[100px] flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="269"
                  height="68"
                  viewBox="0 0 269 68"
                  fill="none"
                >
                  <g clipPath="url(#clip0_937_1580)">
                    <mask
                      id="mask0_937_1580"
                      style={{ maskType: "luminance" }}
                      maskUnits="userSpaceOnUse"
                      x="0"
                      y="0"
                      width="269"
                      height="68"
                    >
                      <path
                        d="M269 0.549194H0V67.4507H269V0.549194Z"
                        fill="white"
                      />
                    </mask>
                    <g mask="url(#mask0_937_1580)">
                      <mask
                        id="mask1_937_1580"
                        style={{ maskType: "luminance" }}
                        maskUnits="userSpaceOnUse"
                        x="0"
                        y="-2"
                        width="269"
                        height="68"
                      >
                        <path
                          d="M269 -1.1236H0V65.778H269V-1.1236Z"
                          fill="white"
                        />
                      </mask>
                      <g mask="url(#mask1_937_1580)">
                        <path
                          d="M77.581 28.067C80.5364 28.067 83.0169 29.1113 84.8641 30.9255V28.7266H92.5167V51.4851H84.9696V48.9015H84.8641C83.2281 50.7706 80.6421 52.1448 77.581 52.1448C71.0895 52.1448 66.5508 46.7576 66.5508 40.1059C66.5508 33.4542 71.0895 28.067 77.581 28.067ZM79.8504 45.4382C82.8058 45.4382 84.9696 43.2393 84.9696 40.1059C84.9696 36.9724 82.7003 34.7186 79.8504 34.7186C76.9477 34.7186 74.6783 36.9175 74.6783 40.1059C74.6783 43.2393 76.7365 45.4382 79.8504 45.4382Z"
                          fill="#004876"
                        />
                        <path
                          d="M107.399 45.4937H117.532V51.4857H94.5742L105.552 34.7191H96.4214V28.7271H118.376L107.399 45.4937Z"
                          fill="#004876"
                        />
                        <path
                          d="M126.821 41.2053C126.821 44.7236 129.671 45.878 131.623 45.878C134.104 45.878 135.159 45.3833 137.007 43.3492L142.547 46.2079C140.068 50.4957 136.004 52.1448 131.043 52.1448C124.34 52.1448 118.852 46.7576 118.852 40.1059C118.852 33.4542 124.34 28.067 131.043 28.067C137.798 28.067 142.918 32.1348 142.918 40.1059C142.918 40.4357 142.918 40.9304 142.865 41.1504H126.821V41.2053ZM135.423 36.8626C135.054 34.4436 133.471 33.1793 131.254 33.1793C128.615 33.1793 127.137 34.7736 127.032 36.8626H135.423Z"
                          fill="#004876"
                        />
                        <path
                          d="M144.922 28.7266H152.575V32.0249H152.681C152.681 32.0249 155.108 28.067 159.488 28.067C162.339 28.067 164.344 29.4961 164.344 29.4961L161.125 36.1478C161.125 36.1478 159.7 34.8835 157.166 34.8835C153.208 34.8835 152.628 38.8965 152.628 39.5011V51.4851H144.975V28.7266H144.922Z"
                          fill="#004876"
                        />
                        <path
                          d="M169.147 23.8884C169.2 17.2367 172.314 12.674 177.854 12.674C181.76 12.674 184.188 14.7079 184.188 14.7079L181.496 20.2602C181.496 20.2602 180.441 19.6556 179.227 19.6556C177.275 19.6556 176.852 20.9748 176.852 24.1083V28.726H181.972V34.718H176.799V51.4845H169.147V34.718H165.928V28.726H169.147V23.8884Z"
                          fill="#004876"
                        />
                        <path
                          d="M193.953 13.3342H186.301V51.4851H193.953V13.3342Z"
                          fill="#004876"
                        />
                        <path
                          d="M209.099 28.067C216.434 28.067 222.345 33.0145 222.345 40.1059C222.345 47.0873 216.75 52.1448 209.099 52.1448C201.129 52.1448 195.746 47.1424 195.746 40.1059C195.746 33.0145 201.604 28.067 209.099 28.067ZM209.046 45.4382C212 45.4382 214.165 43.2393 214.165 40.1059C214.165 36.9724 211.896 34.7186 209.046 34.7186C206.142 34.7186 203.873 36.9175 203.873 40.1059C203.873 43.2393 205.932 45.4382 209.046 45.4382Z"
                          fill="#004876"
                        />
                        <path
                          d="M235.066 28.067C238.02 28.067 240.501 29.1113 242.348 30.9255V28.7266H250V51.4851H242.454V48.9015H242.348C240.712 50.7706 238.126 52.1448 235.066 52.1448C228.573 52.1448 224.035 46.7576 224.035 40.1059C224.088 33.4542 228.626 28.067 235.066 28.067ZM237.388 45.4382C240.395 45.4382 242.507 43.2393 242.507 40.1059C242.507 36.9724 240.236 34.7186 237.388 34.7186C234.484 34.7186 232.215 36.9175 232.215 40.1059C232.215 43.2393 234.274 45.4382 237.388 45.4382Z"
                          fill="#004876"
                        />
                        <path
                          d="M255.807 20.2609H263.459V28.7266H268.105V34.7186H263.459V41.92C263.459 44.0639 263.987 45.0535 265.201 45.0535C266.204 45.0535 267.101 44.3388 267.101 44.3388L269.001 50.6607C269.001 50.6607 266.521 52.09 263.408 52.09C257.338 52.09 255.86 47.4174 255.86 43.4043V34.7186H252.641V28.7266H255.86V20.2609H255.807Z"
                          fill="#004876"
                        />
                        <path
                          d="M45.2292 22.9544L44.3847 13.774L0 -1.1236L5.64705 61.9849L19.8967 58.4666L15.8328 13.1143L45.2292 22.9544Z"
                          fill="#004876"
                        />
                        <path
                          d="M55.6258 57.0375L52.8815 25.5382L45.2289 22.9545L47.7094 51.5402L19.8965 58.4667L20.5825 65.7781L55.6258 57.0375Z"
                          fill="#FF671D"
                        />
                      </g>
                    </g>
                  </g>
                  <defs>
                    <clipPath id="clip0_937_1580">
                      <rect
                        width="269"
                        height="66.9016"
                        fill="white"
                        transform="translate(0 0.549194)"
                      />
                    </clipPath>
                  </defs>
                </svg>
              </div>
              <div className="mt-6">
                <p
                  onClick={() => setExpanded2(!expanded2)}
                  className={`font-normal text-16 text-[#323232] text-center  cursor-pointer transition-all duration-300 ease-in-out ${expanded2
                    ? "max-h-full whitespace-normal line-clamp-none"
                    : "max-h-[6.8em] overflow-hidden line-clamp-4"
                    }`}
                >
                  {" "}
                  {page.azerfloat[language]}
                </p>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div
            className={`bg-white rounded-lg p-6 m-4 shadow-[2px_2px_12px_0px_#2323234D] border-[1px] border-[#D0D0D0] flex flex-col transition-all duration-300 ease-in-out overflow-hidden ${expanded3 ? "max-h-[1000px]" : "max-h-[260px]"
              }`}
          >
            {" "}
            <div className="flex flex-col items-center justify-center text-center">
              <div className="h-[100px] flex items-center justify-center">
                <img src="/img/Success/logo_stp.png" alt="logo_stp" />
              </div>
              <div className="mt-6">
                <p
                  onClick={() => setExpanded3(!expanded3)}
                  className={`font-normal text-16 text-[#323232] text-center  cursor-pointer transition-all duration-300 ease-in-out ${expanded3
                    ? "max-h-full whitespace-normal line-clamp-none"
                    : "max-h-[6.8em] overflow-hidden line-clamp-4"
                    }`}
                >
                  {" "}
                  {page.stp[language]}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-10 px-4 ">
          <div className="w-full max-w-[700px] aspect-video ">
            <iframe
              className="w-full h-full rounded-lg  shadow-[2px_2px_12px_0px_#2323234D] border-[1px] border-[#D0D0D0]"
              src="https://www.youtube.com/embed/FkhjfqtLiGc"
              title="YouTube video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Our_Success;
