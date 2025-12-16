"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import {
  Heart,
  Sparkles,
  Star,
  Music,
  Gift,
  Crown,
  Zap,
  Rocket,
  Rainbow,
  Moon,
  Sun,
  Cloud,
  HeartPulse,
  Palette,
  Infinity,
  Orbit,
  Waves,
  Flower2,
  Bird,
  Gem,
  Lightbulb,
  Sparkle,
  PartyPopper,
  CircleDot,
  Target,
  Film,
  Volume2,
  Home,
} from "lucide-react";
import Link from "next/link";
import Confetti from "react-confetti";

export default function UltraSurprisePage() {
  const [stage, setStage] = useState(0);
  const [showFireworks, setShowFireworks] = useState(true);
  const [showNebula, setShowNebula] = useState(true);
  const [textRevealed, setTextRevealed] = useState([]);
  const [activeWish, setActiveWish] = useState(0);
  const [particleMode, setParticleMode] = useState("stars");
  const containerRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  const cosmicMessages = [
    {
      id: 1,
      text: "🎉 YOU ARE AMAZING! 🎉",
      icon: <Sparkle size={32} />,
      color: "from-cyan-400 to-blue-500",
      glow: "#00e5ff",
    },
    {
      id: 2,
      text: "✨ MY FAVORITE PERSON ✨",
      icon: <Heart size={32} fill="red" />,
      color: "from-pink-500 to-rose-600",
      glow: "#ff0080",
    },
    {
      id: 3,
      text: "🌟 SUPERSTAR OF MY LIFE 🌟",
      icon: <Star size={32} fill="gold" />,
      color: "from-yellow-400 to-orange-500",
      glow: "#ffcc00",
    },
    {
      id: 4,
      text: "💖 SOURCE OF HAPPINESS 💖",
      icon: <HeartPulse size={32} />,
      color: "from-purple-500 to-violet-600",
      glow: "#aa00ff",
    },
    {
      id: 5,
      text: "🌈 DREAM MAKER 🌈",
      icon: <Rainbow size={32} />,
      color: "from-green-400 to-emerald-500",
      glow: "#00ff88",
    },
    {
      id: 6,
      text: "🎁 BEST GIFT EVER 🎁",
      icon: <Gift size={32} />,
      color: "from-indigo-500 to-blue-600",
      glow: "#3366ff",
    },
    {
      id: 7,
      text: "🎶 MY FAVORITE SONG 🎶",
      icon: <Music size={32} />,
      color: "from-teal-400 to-cyan-500",
      glow: "#00ccff",
    },
    {
      id: 8,
      text: "🎂 HAPPY BIRTHDAY MY LOVE! 🎂",
      icon: <Crown size={32} fill="gold" />,
      color: "from-amber-400 to-orange-500",
      glow: "#ff6600",
    },
  ];

  const cosmicWishes = [
    { text: "💫 May every day be magical!", icon: <Sparkles size={24} /> },
    {
      text: "❤️ Endless love coming your way!",
      icon: <Heart size={24} fill="red" />,
    },
    {
      text: "🌟 Shine brighter than stars!",
      icon: <Star size={24} fill="gold" />,
    },
    { text: "🎁 Universe has gifts for you!", icon: <Gift size={24} /> },
    { text: "🌈 Rainbows after every rain!", icon: <Rainbow size={24} /> },
    { text: "✨ Dreams turning into reality!", icon: <Lightbulb size={24} /> },
    { text: "🎉 Party never ends for you!", icon: <PartyPopper size={24} /> },
    { text: "🔥 Live life to the fullest!", icon: <Zap size={24} /> },
  ];

  useEffect(() => {
    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight,
    });

    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const revealSequence = async () => {
      for (let i = 0; i < cosmicMessages.length; i++) {
        await new Promise((resolve) => setTimeout(resolve, 1500));
        setTextRevealed((prev) => [...prev, cosmicMessages[i].id]);

        if (i === 2) setStage(1);
        if (i === 5) setStage(2);
        if (i === cosmicMessages.length - 1) {
          setShowFireworks(true);
          setStage(3);
        }
      }
    };

    const timer = setTimeout(() => {
      revealSequence();
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (stage >= 2) {
      const wishInterval = setInterval(() => {
        setActiveWish((prev) => (prev + 1) % cosmicWishes.length);
      }, 2000);
      return () => clearInterval(wishInterval);
    }
  }, [stage]);

  const ParticleField = ({ type = "stars" }) => {
    const particleCount = type === "stars" ? 200 : 150;

    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: particleCount }).map((_, i) => {
          const size =
            type === "stars" ? Math.random() * 8 + 4 : Math.random() * 15 + 8;

          const color =
            type === "stars"
              ? `hsl(${Math.random() * 60 + 200}, 100%, 80%)`
              : `hsl(${Math.random() * 360}, 100%, 65%)`;

          return (
            <motion.div
              key={`${type}-${i}`}
              className="absolute rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: size,
                height: size,
                backgroundColor: color,
                boxShadow: `0 0 ${size * 3}px ${color}`,
              }}
              animate={{
                y: [0, -100, 0],
                x: [0, Math.sin(i) * 50, 0],
                opacity: [0.5, 1, 0.5],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: Math.random() * 15 + 10,
                repeat: Infinity,
                delay: i * 0.1,
                ease: "easeInOut",
              }}
            />
          );
        })}
      </div>
    );
  };

  const TimelineProgress = () => (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-2xl px-4">
      <div className="flex items-center justify-between relative">
        {cosmicMessages.map((_, i) => (
          <motion.div
            key={i}
            className={`w-6 h-6 rounded-full z-10 flex items-center justify-center ${
              i <= stage
                ? "bg-gradient-to-r from-cyan-400 to-purple-500"
                : "bg-white/40"
            }`}
            animate={{
              scale: i === stage ? [1, 1.8, 1] : 1,
              boxShadow:
                i === stage
                  ? `0 0 40px ${cosmicMessages[i]?.glow || "#ff0080"}`
                  : i <= stage
                  ? `0 0 20px ${cosmicMessages[i]?.glow || "#00e5ff"}`
                  : "none",
            }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            {i <= stage && (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              >
                <CircleDot className="w-3 h-3 text-white" />
              </motion.div>
            )}
          </motion.div>
        ))}
        <div className="absolute top-1/2 left-0 w-full h-2 bg-gradient-to-r from-cyan-500/50 via-purple-500/50 to-pink-500/50 rounded-full" />
        <motion.div
          className="absolute top-1/2 left-0 h-2 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-full"
          initial={{ width: "0%" }}
          animate={{ width: `${(stage / 3) * 100}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>
    </div>
  );

  const OrbitalSystem = () => (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      {[1, 2, 3].map((orbit) => (
        <motion.div
          key={orbit}
          className="absolute border-2 border-white/30 rounded-full"
          style={{
            width: orbit * 300,
            height: orbit * 300,
          }}
          animate={{ rotate: 360 }}
          transition={{
            duration: orbit * 30,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {[...Array(orbit * 6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-4 h-4 rounded-full bg-gradient-to-r from-cyan-400 to-purple-400 shadow-lg"
              style={{
                left: `${Math.cos((i / (orbit * 6)) * Math.PI * 2) * 100}%`,
                top: `${Math.sin((i / (orbit * 6)) * Math.PI * 2) * 100}%`,
                boxShadow: "0 0 15px currentColor",
              }}
              animate={{
                scale: [1, 2, 1],
                rotate: [0, 360],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.1,
              }}
            />
          ))}
        </motion.div>
      ))}
    </div>
  );

  const HeartsEffect = () => (
    <div className="absolute inset-0 pointer-events-none">
      {[...Array(25)].map((_, i) => (
        <motion.div
          key={`heart-${i}`}
          className="absolute text-pink-400"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            filter: `drop-shadow(0 0 20px pink)`,
          }}
          animate={{
            y: [0, -200, 0],
            x: [0, Math.sin(i) * 100, 0],
            rotate: [0, 720],
            scale: [0, 1.5, 0],
          }}
          transition={{
            duration: Math.random() * 15 + 10,
            repeat: Infinity,
            delay: i * 0.5,
          }}
        >
          <Heart className="w-12 h-12" fill="currentColor" />
        </motion.div>
      ))}
    </div>
  );

  return (
    <div className="relative min-h-screen w-screen h-screen overflow-hidden bg-gradient-to-br from-black via-purple-950 to-blue-950">
      <div className="absolute inset-0">
        <ParticleField type="stars" />
        {showNebula && <ParticleField type="nebula" />}
        <OrbitalSystem />

        {[...Array(4)].map((_, i) => (
          <motion.div
            key={`orb-${i}`}
            className="absolute rounded-full blur-3xl"
            style={{
              width: 400 + i * 150,
              height: 400 + i * 150,
              background: `radial-gradient(circle, ${
                i % 3 === 0
                  ? "rgba(0, 229, 255, 0.4)"
                  : i % 3 === 1
                  ? "rgba(168, 85, 247, 0.4)"
                  : "rgba(236, 72, 153, 0.4)"
              }, transparent 60%)`,
              left: `${20 + i * 15}%`,
              top: `${10 + i * 10}%`,
            }}
            animate={{
              x: [0, 150, 0],
              y: [0, 100, 0],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: 20 + i * 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1, type: "spring" }}
        className="fixed bottom-8 right-8 z-50 w-96 h-72 rounded-3xl overflow-hidden shadow-2xl border-4 border-cyan-400/50"
        style={{
          boxShadow:
            "0 0 60px rgba(0, 229, 255, 0.7), inset 0 0 40px rgba(255, 255, 255, 0.3)",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/30 to-purple-500/30 backdrop-blur-sm" />
        <iframe
          src="https://www.youtube.com/embed/XU9LM5KM6Rs?autoplay=1&loop=1&playlist=XU9LM5KM6Rs&controls=0&modestbranding=1&rel=0"
          title="Birthday Celebration"
          className="w-full h-full relative z-10"
          allow="autoplay"
        />
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-cyan-500 to-purple-500 text-white text-lg font-bold px-6 py-2 rounded-full whitespace-nowrap flex items-center gap-3 border-2 border-white/30">
          <Film className="w-5 h-5" />
          🐼 BIRTHDAY PANDA LIVE! 🎂
          <Film className="w-5 h-5" />
        </div>
      </motion.div>

      <TimelineProgress />

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-32">
        <div className="relative w-full max-w-5xl min-h-[500px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            {cosmicMessages.map(
              (msg) =>
                textRevealed.includes(msg.id) && (
                  <motion.div
                    key={msg.id}
                    initial={{
                      scale: 0,
                      opacity: 0,
                    }}
                    animate={{
                      scale: 1,
                      opacity: 1,
                    }}
                    exit={{
                      scale: 1.5,
                      opacity: 0,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 200,
                      damping: 20,
                    }}
                    className="absolute"
                  >
                    <motion.div
                      className={`text-4xl md:text-5xl font-extrabold px-12 py-10 rounded-3xl ${msg.color} text-white border-4 border-white/30`}
                      style={{
                        boxShadow: `0 0 80px ${msg.glow}`,
                      }}
                      animate={{
                        scale: [1, 1.08, 1],
                        rotate: [-2, 2, -2],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                      }}
                    >
                      <div className="flex items-center gap-6">
                        <motion.div
                          animate={{
                            rotate: 360,
                            scale: [1, 1.2, 1],
                          }}
                          transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                        >
                          {msg.icon}
                        </motion.div>
                        <span className="bg-gradient-to-r from-white to-white/90 bg-clip-text text-transparent">
                          {msg.text}
                        </span>
                        <motion.div
                          animate={{
                            rotate: -360,
                            scale: [1, 1.2, 1],
                          }}
                          transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                        >
                          {msg.icon}
                        </motion.div>
                      </div>
                    </motion.div>
                  </motion.div>
                )
            )}
          </AnimatePresence>
        </div>

        {stage >= 2 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-24 w-full max-w-3xl"
          >
            <div className="relative h-40">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeWish}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.2 }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <div className="text-center p-8 rounded-3xl backdrop-blur-xl bg-gradient-to-r from-white/10 to-white/5 border-2 border-white/20 shadow-2xl">
                    <div className="flex items-center justify-center gap-4 mb-4">
                      <motion.div
                        animate={{
                          rotate: 360,
                          scale: [1, 1.3, 1],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      >
                        {cosmicWishes[activeWish].icon}
                      </motion.div>
                      <p className="text-2xl font-bold text-white">
                        {cosmicWishes[activeWish].text}
                      </p>
                    </div>
                    <motion.div
                      className="h-1 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full"
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 2 }}
                    />
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        )}

        {stage >= 3 && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, type: "spring" }}
            className="mt-16 flex flex-col items-center gap-8"
          >
            <div className="flex gap-6">
              {[
                { mode: "stars", label: "⭐ STARS", color: "cyan" },
                { mode: "nebula", label: "🌌 NEBULA", color: "purple" },
                { mode: "hearts", label: "❤️ HEARTS", color: "pink" },
              ].map((item) => (
                <motion.button
                  key={item.mode}
                  whileHover={{
                    scale: 1.15,
                    y: -8,
                  }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setParticleMode(item.mode)}
                  className={`px-6 py-3 rounded-2xl text-lg font-bold backdrop-blur-md border-2 ${
                    particleMode === item.mode
                      ? `bg-gradient-to-r from-${item.color}-500/40 to-${item.color}-600/40 border-${item.color}-400`
                      : "bg-white/10 border-white/20"
                  }`}
                  style={{
                    boxShadow:
                      particleMode === item.mode
                        ? `0 0 40px var(--tw-${item.color})`
                        : "none",
                  }}
                >
                  {item.label}
                </motion.button>
              ))}
            </div>

            <motion.button
              whileHover={{
                scale: 1.2,
              }}
              whileTap={{ scale: 0.9 }}
              onClick={() => {
                setShowFireworks(true);
                setParticleMode("hearts");
              }}
              className="group relative px-12 py-6 rounded-3xl overflow-hidden"
              style={{
                boxShadow: "0 0 80px rgba(255,0,128,0.8)",
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 animate-pulse" />
              <div className="absolute inset-1 bg-gradient-to-r from-cyan-600 via-purple-600 to-pink-600 rounded-3xl" />
              <div className="relative flex items-center gap-4 text-2xl font-extrabold">
                <motion.div
                  animate={{
                    rotate: 360,
                    y: [0, -10, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <Rocket className="w-8 h-8" />
                </motion.div>
                🎊 LAUNCH CELEBRATION! 🎊
                <motion.div
                  animate={{
                    rotate: -360,
                    y: [0, 10, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <Zap className="w-8 h-8" />
                </motion.div>
              </div>
            </motion.button>
          </motion.div>
        )}

        {particleMode === "hearts" && <HeartsEffect />}
      </div>

      {showFireworks && (
        <Confetti
          width={dimensions.width}
          height={dimensions.height}
          recycle={true}
          numberOfPieces={300}
          colors={["#00e5ff", "#ff00ff", "#ffcc00", "#00ffaa", "#ff3366"]}
          gravity={0.1}
        />
      )}

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2 }}
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50"
      >
        <div className="bg-gradient-to-r from-cyan-500/30 to-purple-500/30 backdrop-blur-xl px-8 py-4 rounded-2xl border-2 border-white/30 shadow-2xl">
          <p className="text-lg font-bold text-white flex items-center gap-3">
            <Volume2 className="w-6 h-6 animate-pulse" />
            🔊 PANDA IS SINGING FOR YOU! TURN UP VOLUME! 🎶
            <Volume2 className="w-6 h-6 animate-pulse" />
          </p>
        </div>
      </motion.div>

      <Link href="/" className="fixed top-6 left-6 z-50">
        <motion.button
          whileHover={{ scale: 1.1, x: -5 }}
          className="px-6 py-3 rounded-2xl bg-gradient-to-r from-cyan-500/20 to-purple-500/20 backdrop-blur-md border-2 border-white/20 text-white font-bold flex items-center gap-2"
        >
          <Home className="w-5 h-5" />
          Back to Home
        </motion.button>
      </Link>
    </div>
  );
}
