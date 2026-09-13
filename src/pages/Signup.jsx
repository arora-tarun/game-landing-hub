import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { TiUser, TiLockClosed, TiMail } from "react-icons/ti";

const videos = [
  "/videos/feature-1.mp4",
  "/videos/feature-2.mp4",
  "/videos/feature-3.mp4",
  "/videos/feature-4.mp4",
  "/videos/feature-5.mp4",
];

const Signup = () => {
  const containerRef = useRef(null);
  const titleRef = useRef(null);

  const [currentVideo, setCurrentVideo] = useState(0);

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
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

    // Form container animation
    gsap.from(containerRef.current, {
      scale: 0.9,
      opacity: 1,
      duration: 1,
      ease: "power3.out",
    });
  }, []);

  const handleVideoEnd = () => {
    setCurrentVideo((prev) => (prev + 1) % videos.length);
  };

  // 3D rotation on form container
  const handleMouseMove = (e) => {
    const container = containerRef.current;
    const { left, top, width, height } = container.getBoundingClientRect();

    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;

    gsap.to(container, {
      rotationY: x * 10,
      rotationX: -y * 10,
      transformPerspective: 1200,
      duration: 0.4,
    });
  };

  const handleMouseLeave = () => {
    gsap.to(containerRef.current, {
      rotationY: 0,
      rotationX: 0,
      duration: 0.5,
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

    console.log("Signup Data:", formData);

    // Future API call yaha aayega

    // After signup -> redirect to login
    navigate("/login");
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

      {/* TITLE SECTION */}
      <div ref={titleRef} className="relative z-30 text-center mb-6">

        <h1
          className="text-5xl md:text-7xl font-bold tracking-widest text-white uppercase"
          style={{
            textShadow: "0 0 20px rgba(87,36,255,0.8)",
            fontFamily: "zentry",
            letterSpacing: "2px",
          }}
        >
          Welcome to Spidy Gaming
        </h1>

        <p className="text-white/70 mt-4 italic text-sm md:text-base max-w-2xl mx-auto">
          Join the ultimate gaming universe where legends are born.  
          Create your account and step into an immersive world filled with action,  
          adventure and endless possibilities.
        </p>

      </div>

      {/* MAIN SIGNUP FORM CONTAINER */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative z-20 bg-black/90 border border-white/20 p-10 rounded-2xl shadow-2xl w-[150%] max-w-150"
        style={{
          boxShadow: "0 0 25px rgba(87,36,255,0.6)",
        }}
      >

        <div className="flex justify-center mb-4">
          <img src="/img/spidy.png" className="w-18" alt="logo" />
        </div>

        <h2 className="bento-title special-font text-white mb-6 text-center">
          Create Acc<b>o</b>unt
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Username */}
          <div className="relative">
            <TiUser className="absolute left-3 top-3 text-white/70 text-xl" />
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Username"
              className="w-full p-3 pl-10 bg-black/70 border border-white/20 rounded-lg text-white outline-none focus:ring-2 focus:ring-violet-500 transition-all"
              required
            />
          </div>

          {/* Email */}
          <div className="relative">
            <TiMail className="absolute left-3 top-3 text-white/70 text-xl" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email Address"
              className="w-full p-3 pl-10 bg-black/70 border border-white/20 rounded-lg text-white outline-none focus:ring-2 focus:ring-violet-500 transition-all"
              required
            />
          </div>

          {/* Password */}
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
            SIGNUP NOW
          </button>

        </form>

        <p className="text-white/70 mt-4 text-center text-sm">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-violet-300 cursor-pointer hover:underline"
          >
            Login here
          </span>
        </p>

      </div>
    </div>
  );
};

export default Signup;