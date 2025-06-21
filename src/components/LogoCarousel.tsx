import { useEffect, useRef, useState } from "react";

interface Logo {
    id: number;
    src: string;
    alt: string;
    href: string;
}

const LogoCarousel = () => {
    const carouselRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState<boolean>(false);
    const [startX, setStartX] = useState<number>(0);
    const [scrollLeft, setScrollLeft] = useState<number>(0);
    const [autoScroll, setAutoScroll] = useState<boolean>(true);
    const [isMobile, setIsMobile] = useState<boolean>(false);
    const [currentPosition, setCurrentPosition] = useState<number>(0);

    const logos: Logo[] = [
        {
            id: 1,
            src: "/img/Logo/iqtisadiyyat.svg",
            alt: "four_center_logo",
            href: "https://www.economy.gov.az"
        },
        {
            id: 2,
            src: "/img/Logo/4sim.png",
            alt: "iqtisadiyyat_center_logo",
            href: "https://4sim.gov.az/az"
        },
        {
            id: 3,
            src: "/img/Logo/metak.svg",
            alt: "sim_center_logo",
            href: "https://www.metak.az/"
        },
        {
            id: 4,
            src: "/img/Logo/azerfloat.svg",
            alt: "four_center_logo",
            href: "https://azerfloat.az/"
        },
        {
            id: 5,
            src: "/img/Logo/stp.svg",
            alt: "iqtisadiyyat_center_logo",
            href: "https://www.stp.az/"
        },
    ];

    const clonedLogos: Logo[] = [...logos, ...logos, ...logos, ...logos, ...logos]; // ???

    useEffect(() => {
        const checkIsMobile = (): void => {
            setIsMobile(window.innerWidth < 768);
        };

        checkIsMobile();
        window.addEventListener('resize', checkIsMobile);

        return () => {
            window.removeEventListener('resize', checkIsMobile);
        };
    }, []);

    useEffect(() => {
        const carousel = carouselRef.current;
        if (!carousel || !autoScroll) return;

        const logoWidth = isMobile ? carousel.clientWidth / 3 : carousel.clientWidth / 5;
        const singleLogoSetWidth = logos.length * logoWidth;

        if (currentPosition === 0) {
            carousel.scrollLeft = singleLogoSetWidth;
            setCurrentPosition(singleLogoSetWidth);
        }

        const moveCarousel = () => {
            if (!carousel || !autoScroll) return;

            let newPosition = carousel.scrollLeft + logoWidth;

            if (newPosition > singleLogoSetWidth * 3) {
                carousel.style.scrollBehavior = 'auto';
                newPosition = singleLogoSetWidth + (newPosition % singleLogoSetWidth);
                carousel.scrollLeft = newPosition;
                setTimeout(() => {
                    if (carousel) carousel.style.scrollBehavior = 'smooth';
                }, 10);
            } else {
                carousel.scrollTo({
                    left: newPosition,
                    behavior: 'smooth'
                });
            }

            setCurrentPosition(newPosition);
        };

        const scrollInterval = setInterval(moveCarousel, 2000);

        return () => {
            clearInterval(scrollInterval);
        };
    }, [autoScroll, logos.length, isMobile, currentPosition]);

    const handleInteractionStart = (e: React.MouseEvent | React.TouchEvent): void => {
        setAutoScroll(false);
        setIsDragging(true);

        const carousel = carouselRef.current;
        if (!carousel) return;

        const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
        setStartX(clientX);
        setScrollLeft(carousel.scrollLeft);
    };

    const handleDrag = (e: React.MouseEvent | React.TouchEvent): void => {
        if (!isDragging) return;
        e.preventDefault();

        const carousel = carouselRef.current;
        if (!carousel) return;

        const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
        const distance = clientX - startX;
        carousel.scrollLeft = scrollLeft - distance;
        setCurrentPosition(carousel.scrollLeft);
    };

    const handleInteractionEnd = (): void => {
        setIsDragging(false);

        const carousel = carouselRef.current;
        if (carousel) {
            const logoWidth = isMobile ? carousel.clientWidth / 3 : carousel.clientWidth / 5;
            const singleLogoSetWidth = logos.length * logoWidth;

            if (carousel.scrollLeft < singleLogoSetWidth) {
                carousel.style.scrollBehavior = 'auto';
                carousel.scrollLeft = singleLogoSetWidth * 2 - (singleLogoSetWidth - carousel.scrollLeft);
                setCurrentPosition(carousel.scrollLeft);
            } else if (carousel.scrollLeft > singleLogoSetWidth * 3) {
                carousel.style.scrollBehavior = 'auto';
                carousel.scrollLeft = singleLogoSetWidth + (carousel.scrollLeft % singleLogoSetWidth);
                setCurrentPosition(carousel.scrollLeft);
            }

            setTimeout(() => {
                if (carousel) carousel.style.scrollBehavior = 'smooth';
            }, 10);
        }

        setTimeout(() => setAutoScroll(true), 4000);
    };

    const handleWheel = (): void => {
        setAutoScroll(false);
        const carousel = carouselRef.current;
        if (carousel) {
            setCurrentPosition(carousel.scrollLeft);
        }

        setTimeout(() => setAutoScroll(true), 4000);
    };

    return (
        <div className="w-full py-8 md:py-12 rounded-xl overflow-hidden">
            <div className="w-full mx-auto">
                <div className="relative w-full">
                    <div
                        ref={carouselRef}
                        className="flex overflow-x-scroll scrollbar-hide py-4 md:py-6 w-full"
                        style={{
                            scrollbarWidth: 'none',
                            msOverflowStyle: 'none',
                            scrollBehavior: isDragging ? 'auto' : 'smooth',
                            cursor: isDragging ? 'grabbing' : 'grab'
                        }}
                        onMouseDown={handleInteractionStart}
                        onMouseMove={handleDrag}
                        onMouseUp={handleInteractionEnd}
                        onMouseLeave={handleInteractionEnd}
                        onTouchStart={handleInteractionStart}
                        onTouchMove={handleDrag}
                        onTouchEnd={handleInteractionEnd}
                        onWheel={handleWheel}
                    >
                        {clonedLogos.map((logo, index) => (
                            <div
                                key={`${logo.id}-${index}`}
                                className={`flex-shrink-0 px-2 md:px-4 flex justify-center items-center
                                ${isMobile ? 'w-1/3 sm:w-1/4' : 'w-1/5'}`}
                            >
                                <a
                                    href={logo.href}
                                    target="_blank"
                                    rel="noreferrer noopener"
                                    className="transform hover:scale-110 transition-transform duration-300 flex justify-center items-center w-full h-full"
                                    onClick={(e) => isDragging && e.preventDefault()}
                                >
                                    <div className="w-full h-16 md:h-20 flex items-center justify-center">
                                        <img
                                            src={logo.src}
                                            alt={logo.alt}
                                            className="max-h-full max-w-full object-contain filter hover:brightness-105"
                                            style={{ width: 'auto', height: '100%' }}
                                            draggable="false"
                                            onError={(e) => {
                                                const target = e.target as HTMLImageElement;
                                                target.onerror = null;
                                                console.error(`Failed to load image: ${logo.src}`);
                                            }}
                                        />
                                    </div>
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LogoCarousel;