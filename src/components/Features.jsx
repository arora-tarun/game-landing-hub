import { useState, useRef } from "react";
import { TiLocationArrow } from "react-icons/ti";

export const BentoTilt = ({ children, className = "" }) => {
    const [transformStyle, setTransformStyle] = useState("");
    const itemRef = useRef(null);

    const handleMouseMove = (event) => {
        if (!itemRef.current) return;

        const { left, top, width, height } =
            itemRef.current.getBoundingClientRect();

        const relativeX = (event.clientX - left) / width;
        const relativeY = (event.clientY - top) / height;

        const tiltX = (relativeY - 0.5) * 10;
        const tiltY = (relativeX - 0.5) * -10;

        const newTransform = `perspective(700px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(.98, .98, .98)`;
        setTransformStyle(newTransform);
    };

    const handleMouseLeave = () => {
        setTransformStyle("");
    };

    return (
        <div
            ref={itemRef}
            className={`transition-transform duration-300 ${className}`}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ transform: transformStyle }}
        >
            {children}
        </div>
    );
};

export const BentoCard = ({ src, title, description, isComingSoon }) => {
    const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
    const [hoverOpacity, setHoverOpacity] = useState(0);
    const hoverButtonRef = useRef(null);

    const handleMouseMove = (event) => {
        if (!hoverButtonRef.current) return;
        const rect = hoverButtonRef.current.getBoundingClientRect();

        setCursorPosition({
            x: event.clientX - rect.left,
            y: event.clientY - rect.top,
        });
    };

    const handleMouseEnter = () => setHoverOpacity(1);
    const handleMouseLeave = () => setHoverOpacity(0);

    return (
        <div className="relative h-full w-full overflow-hidden rounded-xl">
            <video
                src={src}
                loop
                muted
                autoPlay
                playsInline
                className="absolute inset-0 h-full w-full object-cover object-center"
            />

            <div className="relative z-10 flex h-full flex-col justify-between p-6 text-blue-50 bg-black/20">
                <div>
                    <h1 className="bento-title special-font">
                        {title}
                    </h1>

                    {description && (
                        <p className="mt-4 max-w-md text-sm md:text-base opacity-80">
                            {description}
                        </p>
                    )}
                </div>

                {isComingSoon && (
                    <div
                        ref={hoverButtonRef}
                        onMouseMove={handleMouseMove}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        className="border-hsla relative flex w-fit cursor-pointer items-center gap-1 overflow-hidden rounded-full bg-black px-5 py-2 text-xs uppercase text-white/20"
                    >
                        {/* Radial gradient hover effect */}
                        <div
                            className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
                            style={{
                                opacity: hoverOpacity,
                                background: `radial-gradient(100px circle at ${cursorPosition.x}px ${cursorPosition.y}px, #656fe288, #00000026)`,
                            }}
                        />
                        <TiLocationArrow className="relative z-20" />
                        <p className="relative z-20">coming soon</p>
                    </div>
                )}
            </div>
        </div>
    );
};

const Features = () => {
    return (
        <section className="bg-black pb-40">
            <div className="container mx-auto px-4 md:px-10">
                <div className="py-24 md:py-32">
                    <p className="text-lg text-blue-50">
                        Into the Metagame Layer
                    </p>

                    <p className="mt-3 max-w-lg text-base text-blue-50 opacity-60">
                        Immerse yourself in a rich and ever-expanding universe where a vibrant
                        array of products converge into an interconnected overlay experience
                        on your world.
                    </p>
                </div>

                {/* Main Big Feature Card */}
                <BentoTilt className="border-hsla relative mb-8 h-[60vh] md:h-[70vh] w-full overflow-hidden rounded-md">
                    <BentoCard
                        src="videos/feature-1.mp4"
                        title={
                            <>
                                Aveng<b>e</b>r
                            </>
                        }
                        description="A cross-platform metagame app, turning your activities across Web2 and Web3 games into a rewarding adventure."
                        isComingSoon
                    />
                </BentoTilt>

                {/* Responsive Grid */}
                <div className="grid w-full grid-cols-1 md:grid-cols-2 gap-8">

                    {/* ZIGMA - Tall card spanning 2 rows */}
                    <BentoTilt className="relative h-[50vh] md:h-[90vh] w-full overflow-hidden rounded-xl md:row-span-2">
                        <BentoCard
                            src="videos/feature-2.mp4"
                            title={<>cha<b>m</b>er</>}
                            description="None of this a win is a win nonsense. We should win big and look good doing it"
                            isComingSoon
                        />
                    </BentoTilt>

                    {/* NEXUS - Top Right */}
                    <BentoTilt className="relative h-[45vh] md:h-[42vh] w-full overflow-hidden rounded-xl">
                        <BentoCard
                            src="videos/feature-3.mp4"
                            title={<>s<b>p</b>idy</>}
                            description="A gamified social hub, adding a new dimension of play to social interaction for Web3 communities."
                            isComingSoon
                        />
                    </BentoTilt>

                    {/* AZUL - BELOW NEXUS */}
                    <BentoTilt className="relative h-[45vh] md:h-[42vh] w-full overflow-hidden rounded-xl">
                        <BentoCard
                            src="videos/feature-4.mp4"
                            title={<>wing<b>ma</b>n</>}
                            description="Sana Sana help help"
                            isComingSoon
                        />
                    </BentoTilt>

                    {/* BOTTOM ROW STARTS HERE */}

                    {/* MORE COMING SOON - Bottom Left */}
                    <BentoTilt className="bento-tilt_2 h-[45vh]">
                        <div className="flex size-full flex-col justify-between bg-violet-300 p-5">
                            <h1 className="bento-title special-font max-w-64 text-black">
                                M<b>o</b>re co<b>m</b>ing s<b>o</b>on.
                            </h1>

                            <TiLocationArrow className="m-5 scale-[5] self-end" />
                        </div>
                    </BentoTilt>

                    <BentoTilt className="bento-tilt_2">
                        <video
                            src="videos/feature-5.mp4"
                            loop
                            muted
                            autoPlay
                            className="size-full object-cover object-center"
                        />
                    </BentoTilt>

                </div>
            </div>
        </section>
    );
};

export default Features;