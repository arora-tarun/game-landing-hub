import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { TiUser, TiLockClosed } from "react-icons/ti";

const videos = [
    "/videos/feature-1.mp4",
    "/videos/feature-2.mp4",
    "/videos/feature-3.mp4",
    "/videos/feature-4.mp4",
    "/videos/feature-5.mp4",
];

const images = [
    "/img/swordman.webp",
    "/img/entrance.webp",
    "/img/gallery-1.webp",
    "/img/gallery-2.webp",
    "/img/gallery-3.webp",
];

const Login = () => {
    const containerRef = useRef(null);
    const titleRef = useRef(null);
    const sliderRef = useRef(null);

    const [currentVideo, setCurrentVideo] = useState(0);

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    useEffect(() => {
        // Title animation
        gsap.from(titleRef.current, {
            y: -30,
            opacity: 1,
            duration: 1,
            ease: "power4.out",
        });

        // Container animation
        gsap.from(containerRef.current, {
            scale: 0.95,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
        });

        // Slider animation
        const slider = sliderRef.current;

        const tween = gsap.to(slider, {
            x: "-50%",
            duration: 12,
            repeat: -1,
            yoyo: true,
            ease: "power1.inOut",
        });

        slider.addEventListener("mouseenter", () => tween.pause());
        slider.addEventListener("mouseleave", () => tween.resume());

    }, []);

    const handleVideoEnd = () => {
        setCurrentVideo((prev) => (prev + 1) % videos.length);
    };

    // 3D rotation on main container
    const handleMouseMove = (e) => {
        const container = containerRef.current;
        const { left, top, width, height } = container.getBoundingClientRect();

        const x = (e.clientX - left) / width - 0.5;
        const y = (e.clientY - top) / height - 0.5;

        gsap.to(container, {
            rotationY: x * 12,
            rotationX: -y * 12,
            transformPerspective: 1400,
            duration: 0.5,
        });
    };

    const handleMouseLeave = () => {
        gsap.to(containerRef.current, {
            rotationY: 0,
            rotationX: 0,
            duration: 0.6,
        });
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log("Login Attempt:", formData);

        // Future me yaha API call aayega

        // Temporary redirect after login
        navigate("/home");
    };

    return (
        <div className="relative h-screen w-full overflow-hidden flex flex-col items-center justify-center">

            {/* BACKGROUND VIDEO */}
            <video
                src={videos[currentVideo]}
                autoPlay
                muted
                playsInline
                onEnded={handleVideoEnd}
                className="absolute inset-0 h-full w-full object-cover"
            />

            <div className="absolute inset-0 bg-black/60"></div>

            {/* TITLE OUTSIDE CONTAINER */}
            <div ref={titleRef} className="relative z-30 text-center mb-6">

                <h1
                    className="text-6xl md:text-8xl font-bold tracking-widest text-white uppercase"
                    style={{
                        textShadow: "0 0 20px rgba(87,36,255,0.8)",
                        fontFamily: "zentry",
                        letterSpacing: "3px",
                    }}
                >
                    Spidy Gaming
                </h1>

                <p className="text-white/70 mt-2 italic text-sm md:text-base">
                    “Enter the Arena. Unlock the Legend Within You.”
                </p>

            </div>

            {/* MAIN CONTAINER */}
            <div
                ref={containerRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="relative z-20 flex items-center justify-between w-[90%] max-w-275 bg-black/80 rounded-2xl p-10 shadow-2xl border border-white/20"
            >

                {/* LEFT - LOGIN FORM */}
                <div className="w-1/2 flex flex-col items-center justify-center pr-6">

                    <div
                        className="bg-black/90 border border-white/20 p-8 rounded-xl shadow-2xl w-full max-w-105"
                        style={{
                            boxShadow: "0 0 25px rgba(87,36,255,0.6)",
                        }}
                    >
                        <div className="flex justify-center mb-4">
                            <img src="/img/spidy.png" className="w-16" alt="logo" />
                        </div>

                        <h2 className="bento-title special-font text-white mb-6 text-center">
                            Player L<b>o</b>gin
                        </h2>

                        <form onSubmit={handleSubmit} className="space-y-4">

                            <div className="relative">
                                <TiUser className="absolute left-3 top-3 text-white/70 text-xl" />
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Enter Email"
                                    className="w-full p-3 pl-10 bg-black/70 border border-white/20 rounded-lg text-white outline-none focus:ring-2 focus:ring-violet-500 transition-all"
                                    required
                                />
                            </div>

                            <div className="relative">
                                <TiLockClosed className="absolute left-3 top-3 text-white/70 text-xl" />
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="Password"
                                    className="w-full p-3 pl-10 bg-black/70 border border-white/20 rounded-lg text-white outline-none focus:ring-2 focus:ring-violet-500 transition-all"
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full py-3 bg-linear-to-r from-violet-600 to-violet-300 text-white font-bold rounded-lg transition hover:scale-105"
                            >
                                ENTER GAME
                            </button>

                        </form>

                        <p className="text-white/70 mt-4 text-center text-sm">
                            Don't have an account?{" "}
                            <span
                                onClick={() => navigate("/signup")}
                                className="text-violet-300 cursor-pointer hover:underline"
                            >
                                Create one here
                            </span>
                        </p>

                    </div>
                </div>

                {/* RIGHT - 3D IMAGE SLIDER */}
                <div className="w-1/2 flex items-center justify-center">

                    <div
                        className="relative w-105 h-95 overflow-hidden rounded-xl border border-white/20"
                        style={{
                            perspective: "1000px",
                        }}
                    >
                        <div
                            ref={sliderRef}
                            className="flex gap-6 absolute h-full items-center"
                        >
                            {images.map((img, index) => (
                                <div
                                    key={index}
                                    className="min-w-75 h-90"
                                    style={{
                                        transform: "rotateY(-12deg)",
                                    }}
                                >
                                    <img
                                        src={img}
                                        alt="slide"
                                        className="w-full h-full object-cover rounded-xl shadow-2xl"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
};

export default Login;