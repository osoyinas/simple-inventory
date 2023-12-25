interface ArrowProps {
    width?: number;
    height?: number;
    color?: string;
}

export  const LeftArrow = ({width = 100, height = 100, color= "#000000"}: ArrowProps)=> (
    <svg xmlns="http://www.w3.org/2000/svg" width={`${width}px`} height={`${height}px`} viewBox="0 0 24 24" fill="none" transform="rotate(180)">

        <g id="SVGRepo_bgCarrier" strokeWidth="0"/>

        <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"/>

        <g id="SVGRepo_iconCarrier"> <path d="M6 12H18M18 12L13 7M18 12L13 17" stroke={color} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/> </g>

    </svg>
)

export const RightArrow = ({width=100, height=100, color= "#000000"}: ArrowProps)=> (
    <svg xmlns="http://www.w3.org/2000/svg" width={`${width}px`} height={`${height}px`} viewBox="0 0 24 24" fill="none">
        <path d="M6 12H18M18 12L13 7M18 12L13 17" stroke={color} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
)