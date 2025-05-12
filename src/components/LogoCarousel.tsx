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

    // Logo data
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

    // Create a bigger array for infinite scrolling - using multiple clones for seamless looping
    const clonedLogos: Logo[] = [...logos, ...logos, ...logos, ...logos, ...logos];

    // Check if device is mobile
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

    // Auto scroll animation with 2-second intervals - true loop effect
    useEffect(() => {
        const carousel = carouselRef.current;
        if (!carousel || !autoScroll) return;

        // Calculate logo width based on viewport
        const logoWidth = isMobile ? carousel.clientWidth / 3 : carousel.clientWidth / 5;
        const singleLogoSetWidth = logos.length * logoWidth;

        // Set initial starting point if needed
        if (currentPosition === 0) {
            // Start at the first clone set (skip original set)
            carousel.scrollLeft = singleLogoSetWidth;
            setCurrentPosition(singleLogoSetWidth);
        }

        const moveCarousel = () => {
            if (!carousel || !autoScroll) return;

            let newPosition = carousel.scrollLeft + logoWidth;

            // Create infinite loop effect
            // If we reached near the end clones, jump back to the equivalent position in the first clone set
            if (newPosition > singleLogoSetWidth * 3) {
                // Jump to the equivalent position in the first clone set without animation
                carousel.style.scrollBehavior = 'auto';
                newPosition = singleLogoSetWidth + (newPosition % singleLogoSetWidth);
                carousel.scrollLeft = newPosition;
                setTimeout(() => {
                    if (carousel) carousel.style.scrollBehavior = 'smooth';
                }, 10);
            } else {
                // Normal smooth scroll
                carousel.scrollTo({
                    left: newPosition,
                    behavior: 'smooth'
                });
            }

            setCurrentPosition(newPosition);
        };

        // Set interval for movement - exactly 2 seconds
        const scrollInterval = setInterval(moveCarousel, 2000);

        return () => {
            clearInterval(scrollInterval);
        };
    }, [autoScroll, logos.length, isMobile, currentPosition]);

    // Handle interaction start
    const handleInteractionStart = (e: React.MouseEvent | React.TouchEvent): void => {
        setAutoScroll(false);
        setIsDragging(true);

        const carousel = carouselRef.current;
        if (!carousel) return;

        // Get starting position
        const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
        setStartX(clientX);
        setScrollLeft(carousel.scrollLeft);
    };

    // Handle dragging
    const handleDrag = (e: React.MouseEvent | React.TouchEvent): void => {
        if (!isDragging) return;
        e.preventDefault();

        const carousel = carouselRef.current;
        if (!carousel) return;

        // Get current position and calculate movement
        const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
        const distance = clientX - startX;
        carousel.scrollLeft = scrollLeft - distance;
        setCurrentPosition(carousel.scrollLeft);
    };

    // Handle interaction end
    const handleInteractionEnd = (): void => {
        setIsDragging(false);

        // Handle loop correction
        const carousel = carouselRef.current;
        if (carousel) {
            const logoWidth = isMobile ? carousel.clientWidth / 3 : carousel.clientWidth / 5;
            const singleLogoSetWidth = logos.length * logoWidth;

            // Create infinite loop effect
            if (carousel.scrollLeft < singleLogoSetWidth) {
                // If scrolled before the first clone set, move to equivalent position in middle
                carousel.style.scrollBehavior = 'auto';
                carousel.scrollLeft = singleLogoSetWidth * 2 - (singleLogoSetWidth - carousel.scrollLeft);
                setCurrentPosition(carousel.scrollLeft);
            } else if (carousel.scrollLeft > singleLogoSetWidth * 3) {
                // If scrolled past the third clone set, move to equivalent position in second
                carousel.style.scrollBehavior = 'auto';
                carousel.scrollLeft = singleLogoSetWidth + (carousel.scrollLeft % singleLogoSetWidth);
                setCurrentPosition(carousel.scrollLeft);
            }

            setTimeout(() => {
                if (carousel) carousel.style.scrollBehavior = 'smooth';
            }, 10);
        }

        // Resume auto-scroll after pause
        setTimeout(() => setAutoScroll(true), 4000);
    };

    // Handle wheel events
    const handleWheel = (): void => {
        setAutoScroll(false);
        const carousel = carouselRef.current;
        if (carousel) {
            setCurrentPosition(carousel.scrollLeft);
        }

        // Resume auto-scroll after pause
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
                                    className="transform hover:scale-110 transition-transform duration-300 flex justify-center"
                                    onClick={(e) => isDragging && e.preventDefault()}
                                >
                                    <img
                                        src={logo.src}
                                        alt={logo.alt}
                                        className="h-12 sm:h-16 md:h-20 p-1 md:p-2 object-contain filter hover:brightness-105"
                                        draggable="false"
                                    />
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