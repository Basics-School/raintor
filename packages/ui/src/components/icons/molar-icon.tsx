import React from 'react';

interface MolarIconProps {
    width?: number;
    height?: number;
    className?: string;
}

export const MolarIcon: React.FC<MolarIconProps> = ({
    width = 99,
    height = 99,
    className
}) => {
    return (
        <svg
            width={width}
            height={height}
            viewBox="0 0 99 99"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            <ellipse
                cx="49.5"
                cy="49.5024"
                rx="48.5"
                ry="15"
                stroke="white"
                strokeWidth="2"
            />
            <ellipse
                cx="49.5001"
                cy="49.5024"
                rx="48.5"
                ry="15"
                transform="rotate(-60 49.5001 49.5024)"
                stroke="white"
                strokeWidth="2"
            />
            <ellipse
                cx="49.4999"
                cy="49.5022"
                rx="48.5"
                ry="15"
                transform="rotate(60 49.4999 49.5022)"
                stroke="white"
                strokeWidth="2"
            />
            <circle
                cx="50"
                cy="50"
                r="7"
                fill="#C5FF41"
            />
        </svg>
    );
};
