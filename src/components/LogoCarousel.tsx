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

    // Create a bigger array for infinite scrolling
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

    // Auto scroll animation
    useEffect(() => {
        const carousel = carouselRef.current;
        if (!carousel || !autoScroll) return;

        let animationId: number;
        let position = carousel.scrollLeft;
        const speed = 0.5; // Slightly slower for better visibility

        // Calculate logo width based on viewport
        const logoWidth = isMobile ? 200 : 300;
        const fullScrollWidth = logos.length * logoWidth;

        // Core animation
        const scroll = (): void => {
            if (!carousel || !autoScroll) return;

            position += speed;

            // Reset when we reached the end of first set
            if (position >= fullScrollWidth) {
                position = 0;
                carousel.scrollLeft = 0;
            } else {
                carousel.scrollLeft = position;
            }

            animationId = requestAnimationFrame(scroll);
        };

        animationId = requestAnimationFrame(scroll);

        return () => {
            cancelAnimationFrame(animationId);
        };
    }, [autoScroll, logos.length, isMobile]);

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
    };

    // Handle interaction end
    const handleInteractionEnd = (): void => {
        setIsDragging(false);

        // Handle loop correction
        const carousel = carouselRef.current;
        if (carousel) {
            const logoWidth = isMobile ? 200 : 300;
            const totalWidth = logos.length * logoWidth;

            // If we're past the repeated section, jump back
            if (carousel.scrollLeft >= totalWidth * 2) {
                carousel.style.scrollBehavior = 'auto';
                carousel.scrollLeft = carousel.scrollLeft % totalWidth;
                setTimeout(() => {
                    if (carousel) carousel.style.scrollBehavior = 'smooth';
                }, 10);
            }
        }

        // Resume auto-scroll after pause
        setTimeout(() => setAutoScroll(true), 4000);
    };

    // Handle wheel events
    const handleWheel = (): void => {
        setAutoScroll(false);
        // Clear any pending timeouts with properly typed timeout ID
        const timeoutId = window.setTimeout(() => { }, 0);
        clearTimeout(timeoutId);
        setTimeout(() => setAutoScroll(true), 4000);
    };

    return (
        <div className="py-8 md:py-12 rounded-xl overflow-hidden">
            <div className="max-w-7xl mx-auto px-2 md:px-4">
                <div className="relative">
                    <div
                        ref={carouselRef}
                        className="flex overflow-x-scroll scrollbar-hide py-4 md:py-6"
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