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

    // Logo data
    const logos: Logo[] = [
        {
            id: 1,
            src: "/img/Logo/iqtisadiyyat.svg",
            alt: "four_center_logo",
            href: ""
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
            href: "https://4sim.gov.az/az"
        },
        {
            id: 4,
            src: "/img/Logo/azerfloat.svg",
            alt: "four_center_logo",
            href: "https://www.economy.gov.az"
        },
        {
            id: 5,
            src: "/img/Logo/stp.svg",
            alt: "iqtisadiyyat_center_logo",
            href: "https://4sim.gov.az/az"
        },
       
    ];

    // Create a bigger array for infinite scrolling
    const clonedLogos = [...logos, ...logos, ...logos, ...logos,...logos];

    // Auto scroll animation
    useEffect(() => {
        const carousel = carouselRef.current;
        if (!carousel || !autoScroll) return;

        let animationId: number;
        let position = carousel.scrollLeft;
        const speed = 0.7;
        const fullScrollWidth = logos.length * 460; // Approximate width of each logo item

        // Core animation
        const scroll = () => {
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
    }, [autoScroll, logos.length]);

    // Handle interaction start
    const handleInteractionStart = (e: React.MouseEvent | React.TouchEvent) => {
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
    const handleDrag = (e: React.MouseEvent | React.TouchEvent) => {
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
    const handleInteractionEnd = () => {
        setIsDragging(false);

        // Handle loop correction
        const carousel = carouselRef.current;
        if (carousel) {
            const totalWidth = logos.length * 160;

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
    const handleWheel = () => {
        setAutoScroll(false);

        // Resume auto-scroll after pause
        clearTimeout(window.setTimeout(() => { }, 0)); // Clear any pending timeouts
        setTimeout(() => setAutoScroll(true), 4000);
    };

    return (
        <div className="py-12  rounded-xl overflow-hidden">
            <div className="max-w-7xl mx-auto px-1">
                <div className="relative">
                    <div
                        ref={carouselRef}
                        className="flex overflow-x-scroll scrollbar-hide py-6"
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
                                className="flex-shrink-0 w-1/6 px-4 flex justify-center items-center"
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
                                        className="h-20 p-2 object-contain filter hover:brightness-105"
                                        draggable="false"
                                    />
                                </a>
                            </div>
                        ))}
                    </div>

                    {/* Add subtle gradient overlays to suggest continued content */}
                    {/* <div className="absolute left-0 top-0 h-full w-16 bg-gradient-to-r from-gray-50 to-transparent pointer-events-none"></div>
                    <div className="absolute right-0 top-0 h-full w-16 bg-gradient-to-l from-gray-50 to-transparent pointer-events-none"></div> */}
                </div>
            </div>
        </div>
    );
};

export default LogoCarousel;