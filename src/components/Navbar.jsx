import React, { useEffect, useRef, useState } from 'react'
import Button from './Button';
import { TiLocationArrow } from 'react-icons/ti';
import { useWindowScroll } from 'react-use';
import gsap from 'gsap';
import { Link, useNavigate, useLocation } from 'react-router-dom'


const navItems = [
    { name: "Home", path: "/" },
    { name: "Features", path: "#features" },
    { name: "Login", path: "/login" },
    { name: "Signup", path: "/signup" },
    { name: "About", path: "#about" },
    { name: "Contact", path: "#contact" }
];

const Navbar = () => {
    const [isAudioPlaying, setIsAudioPlaying] = useState(false);
    const [isIndicatorActive, setIsIndicatorActive] = useState(false);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [isNavVisible, setIsNavVisible] = useState(true);

    const { y: currentScrollY } = useWindowScroll();
    const navContainerRef = useRef(null);
    const audioIndicatorRef = useRef(null);

    const navigate = useNavigate();
    const location = useLocation();

    const toggleAudioIndicator = () => {
        setIsAudioPlaying((prev) => !prev);
        setIsIndicatorActive((prev) => !prev);
    }

    useEffect(() => {
        if (isAudioPlaying) {
            audioIndicatorRef.current?.play();
        } else {
            audioIndicatorRef.current?.pause();
        }
    }, [isAudioPlaying]);

    useEffect(() => {
        const startAudio = async () => {
            try {
                const audio = audioIndicatorRef.current;

                if (audio) {
                    audio.muted = true;
                    await audio.play();
                    audio.muted = false;

                    setIsAudioPlaying(true);
                    setIsIndicatorActive(true);
                }
            } catch (error) {
                console.log("Autoplay blocked:", error);
            }
        };

        startAudio();
    }, []);

    useEffect(() => {
        if (currentScrollY === 0) {
            navContainerRef.current?.classList.remove("floating-nav");
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setIsNavVisible(true);
        } else if (currentScrollY > lastScrollY) {
            navContainerRef.current?.classList.add("floating-nav");
            setIsNavVisible(false);
        } else if (currentScrollY < lastScrollY) {
            navContainerRef.current?.classList.add("floating-nav");
            setIsNavVisible(true);
        }
        setLastScrollY(currentScrollY);
    }, [currentScrollY, lastScrollY]);

    useEffect(() => {
        gsap.to(navContainerRef.current, {
            y: isNavVisible ? 0 : -100,
            opacity: isNavVisible ? 1 : 0,
            duration: 0.2,
        });
    }, [isNavVisible]);

    // ⭐ MOST IMPORTANT FIX – HASH NAVIGATION LOGIC
    const handleNavClick = (path) => {
        if (path.startsWith("#")) {
            // If already on home page
            if (location.pathname === "/") {
                const id = path.replace("#", "");
                document.getElementById(id)?.scrollIntoView({
                    behavior: "smooth",
                });
            } else {
                // Navigate to home first then scroll
                navigate("/");
                setTimeout(() => {
                    const id = path.replace("#", "");
                    document.getElementById(id)?.scrollIntoView({
                        behavior: "smooth",
                    });
                }, 300);
            }
        } else {
            navigate(path);
        }
    };

    return (
        <div
            ref={navContainerRef}
            className='fixed inset-x-0 top-4 z-50 h-16 border-none transition-all duration-700 sm:inset-x-6'
        >
            <header className='absolute top-1/2 w-full -translate-y-1/2'>
                <nav className='flex size-full items-center justify-between p-4'>
                    <div className='flex items-center gap-7'>
                        <img src="/img/logo.png" alt='logo' className='w-10' />

                        <Button
                            id="product-button"
                            title="Products"
                            rightIcon={<TiLocationArrow />}
                            onClick={() => navigate("/features")}
                            containerClass="bg-primary-50 md:flex hidden items-center justify-center gap-1"
                        />
                    </div>

                    <div className='flex h-full items-center'>
                        <div className='hidden md:block'>
                            {navItems.map((item) => (
                                <span
                                    key={item.name}
                                    onClick={() => handleNavClick(item.path)}
                                    className="nav-hover-btn cursor-pointer"
                                >
                                    {item.name}
                                </span>
                            ))}
                        </div>

                        <button
                            onClick={toggleAudioIndicator}
                            className='ml-10 flex items-center space-x-0.5 cursor-pointer'
                        >
                            <audio
                                ref={audioIndicatorRef}
                                className='hidden'
                                src='/audio/loop.mp3'
                                loop
                            />

                            {[1, 2, 3, 4, 5].map((bar) => (
                                <div
                                    key={bar}
                                    className={`indicator-line ${isIndicatorActive ? 'active' : ""}`}
                                    style={{ animationDelay: `${bar * 0.1}s` }}
                                />
                            ))}
                        </button>
                    </div>
                </nav>
            </header>
        </div>
    );
}

export default Navbar;