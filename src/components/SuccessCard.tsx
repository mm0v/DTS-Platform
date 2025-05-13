import React from "react";

interface SuccessCardProps {
    cardNumber: number;
    content: string;
    isExpanded: boolean;
    onExpand: (cardNumber: number) => void;
    isMobile: boolean;
}

const SuccessCard: React.FC<SuccessCardProps> = ({
    cardNumber,
    content,
    isExpanded,
    onExpand,
    isMobile
}) => {
    return (
        <div
            onMouseEnter={() => !isMobile && onExpand(cardNumber)}
            onMouseLeave={() => !isMobile && onExpand(cardNumber)}
            className={`bg-white rounded-lg p-6 m-4 shadow-[2px_2px_12px_0px_#2323234D] border-[1px] border-[#D0D0D0] flex flex-col transition-all duration-300 ease-in-out overflow-hidden ${isExpanded ? "max-h-[1000px]" : "max-h-[260px]"
                }`}
        >
            <div className="flex flex-col items-center justify-center text-center">
                <div className="h-[100px] flex items-center justify-center">
                    {/* Card logo/image placeholder */}
                </div>
                <div className="mt-6 relative">
                    <p
                        className={`font-normal text-16 text-[#323232] text-center transition-all duration-300 ease-in-out ${isExpanded ? "max-h-full whitespace-normal line-clamp-none" : "max-h-[6.8em] overflow-hidden line-clamp-4"
                            }`}
                    >
                        {content}
                    </p>
                    {isMobile && (
                        <button
                            onClick={(e) => {
                                e.stopPropagation(); // Prevent other event handlers from firing
                                onExpand(cardNumber);
                            }}
                            className="mt-2 text-blue-600 font-medium"
                        >
                            {isExpanded ? "Show less" : "Read more"}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SuccessCard;