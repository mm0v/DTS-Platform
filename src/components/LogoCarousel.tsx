import { useEffect, useRef, useState } from "react";

interface Logo {
    id: number;
    src: string;
    alt: string;
    href: string;
}

const LogoCarousel: React.FC = () => {
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
            href: ""
        },
        {
            id: 3,
            src: "/img/Logo/metak.svg",
            alt: "sim_center_logo",
            href: ""
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
        }
    ];

    // Create a bigger array for infinite scrolling
    const clonedLogos: Logo[] = [...logos, ...logos, ...logos];

    // Auto scroll animation
    useEffect(() => {
        const carousel = carouselRef.current;
        if (!carousel || !autoScroll) return;

        let animationId: number;
        let position = carousel.scrollLeft;

        // Adjust speed based on screen size
        const speed = window.innerWidth < 768 ? 0.5 : 0.7;

        // Calculate full scroll width dynamically based on item count and container width
        const firstChild = carousel.firstChild as HTMLElement;
        const itemWidth = firstChild?.offsetWidth || 0;
        const fullScrollWidth = logos.length * itemWidth;

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
    }, [autoScroll, logos.length]);

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
            const firstChild = carousel.firstChild as HTMLElement;
            const itemWidth = firstChild?.offsetWidth || 0;
            const totalWidth = logos.length * itemWidth;

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

        // Resume auto-scroll after pause
        clearTimeout(window.setTimeout(() => { }, 0)); // Clear any pending timeouts
        setTimeout(() => setAutoScroll(true), 4000);
    };

    return (
        <div className="w-full py-8 md:py-10 lg:py-12 rounded-xl overflow-hidden">
            <div className="w-full mx-auto px-2 sm:px-4">
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
                                className="flex-shrink-0 w-1/2 xs:w-1/3 sm:w-1/4 md:w-1/5 lg:w-1/6 px-2 sm:px-3 md:px-4 flex justify-center items-center"
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
                                        className="h-12 sm:h-14 md:h-16 lg:h-20 p-1 sm:p-2 object-contain filter hover:brightness-105"
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

// Wrapper component with the responsive container
const ResponsiveLogoSection: React.FC = () => {
    return (
        <div className="mt-12 md:mt-16 lg:mt-20 px-4 md:px-8 lg:px-16">
            <LogoCarousel />
        </div>
    );
};

export default ResponsiveLogoSection;