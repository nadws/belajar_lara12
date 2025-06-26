import { SVGAttributes } from 'react';

export default function AppLogoIcon(props: SVGAttributes<SVGElement>) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200" fill="black" {...props}>
            {/* Kubus miring */}
            <path d="M20,40 L100,10 L180,40 L180,160 L100,190 L20,160 Z" fill="black" />
            <path d="M100,10 L100,190" stroke="white" strokeWidth="3" />
            <path d="M20,40 L100,70 L180,40" fill="none" stroke="white" strokeWidth="3" />

            {/* Huruf C */}
            <text x="100" y="130" textAnchor="middle" fontSize="90" fontFamily="Georgia, serif" fill="white">
                C
            </text>
        </svg>
    );
}
