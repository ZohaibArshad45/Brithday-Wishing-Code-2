"use client";
import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import TypingText from "@/components/TypingText";
import AnimatedButton from "@/components/AnimatedButton";
import TrailEffect from "@/components/ConfettiBackground";
import { Heart, Sparkles, Star, Globe, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  const [cakeCut, setCakeCut] = useState(false);
  const [showBalloons, setShowBalloons] = useState(true);
  const [currentName, setCurrentName] = useState(0);
  const [scaleFactor, setScaleFactor] = useState(1);
  const containerRef = useRef(null);
  const names = ["My happiness", "Meri dost", "My whole world"];

  // Handle window resize for scaling
  useEffect(() => {
    const updateScale = () => {
      const container = containerRef.current;
      if (!container) return;

      const containerHeight = container.clientHeight;
      const windowHeight = window.innerHeight;

      // Only scale down if content exceeds viewport
      if (containerHeight > windowHeight * 0.9) {
        const scale = (windowHeight * 0.9) / containerHeight;
        setScaleFactor(Math.min(scale, 1));
      } else {
        setScaleFactor(1);
      }
    };

    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentName((prev) => (prev + 1) % names.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleCakeClick = () => {
    setCakeCut(true);
    setTimeout(() => setCakeCut(false), 2500);
  };

  const balloonColors = [
    "bg-blue-400",
    "bg-sky-400",
    "bg-cyan-400",
    "bg-indigo-400",
    "bg-pink-400",
    "bg-purple-400",
    "bg-teal-400",
  ];

  return (
    <div className="relative h-screen w-full overflow-hidden bg-gradient-to-br from-blue-950 via-indigo-900 to-sky-900 text-white">
      {/* Animated Blue Gradient Background */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            "radial-gradient(circle at 20% 50%, rgba(56, 189, 248, 0.15) 0%, transparent 50%)",
            "radial-gradient(circle at 80% 20%, rgba(59, 130, 246, 0.15) 0%, transparent 50%)",
            "radial-gradient(circle at 40% 80%, rgba(37, 99, 235, 0.15) 0%, transparent 50%)",
            "radial-gradient(circle at 20% 50%, rgba(56, 189, 248, 0.15) 0%, transparent 50%)",
          ],
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      {/* Floating Balloons - Fixed */}
      {showBalloons && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className={`absolute ${
                balloonColors[i % balloonColors.length]
              } rounded-full`}
              style={{
                left: `${Math.random() * 100}%`,
                top: "110%",
                width: `${20 + Math.random() * 20}px`,
                height: `${25 + Math.random() * 15}px`,
              }}
              animate={{
                y: ["110%", "-10%"],
                x: [0, Math.random() * 20 - 10, 0],
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: 8 + Math.random() * 4,
                repeat: Infinity,
                delay: i * 0.5,
                ease: "easeInOut",
              }}
            >
              {/* Balloon string */}
              <div className="absolute top-full left-1/2 -translate-x-1/2 w-px h-12 bg-gradient-to-b from-gray-300/50 to-transparent" />
            </motion.div>
          ))}
        </div>
      )}

      {/* Main Content Container with dynamic scaling */}
      <div
        ref={containerRef}
        style={{
          transform: `scale(${scaleFactor})`,
          transformOrigin: "center center",
        }}
        className="relative z-10 w-full h-full flex flex-col items-center justify-between px-4 py-6"
      >
        {/* Header Section - Reduced spacing */}
        <div className="text-center space-y-2 mt-2">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-center gap-2"
          >
            <Heart className="w-5 h-5 text-pink-300 animate-pulse" />
            <span className="text-base text-blue-200 font-medium">
              A Special Birthday Wish
            </span>
            <Heart className="w-5 h-5 text-pink-300 animate-pulse" />
          </motion.div>

          <TypingText
            text="Happy Birthday To"
            className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-sky-300 via-blue-200 to-cyan-300 bg-clip-text text-transparent"
          />

          {/* Animated Name Display */}
          <motion.div
            key={currentName}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.2 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <div className="text-3xl md:text-6xl font-extrabold bg-gradient-to-r from-cyan-200 via-sky-200 to-blue-200 bg-clip-text text-transparent px-4 py-1">
              {names[currentName]}
            </div>
            <motion.div
              className="absolute -top-1 -right-1"
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            >
              <Star className="w-4 h-4 text-yellow-300 fill-yellow-300" />
            </motion.div>
            <motion.div
              className="absolute -bottom-1 -left-1"
              animate={{ rotate: -360 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            >
              <Globe className="w-4 h-4 text-cyan-300" />
            </motion.div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-sm text-blue-100 font-light italic"
          >
            You mean everything to me 🌟
          </motion.p>
        </div>

        {/* Cake Section - Compact version */}
        <motion.div
          onClick={handleCakeClick}
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.02 }}
          className="relative cursor-pointer group"
        >
          {/* Glow effect */}
          <motion.div
            className="absolute -inset-2 bg-blue-400/20 rounded-full blur-md"
            animate={{ opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 2, repeat: Infinity }}
          />

          <motion.div
            className="relative w-32 h-32"
            animate={{ rotate: [0, 1.5, -1.5, 0] }}
            transition={{ duration: 6, repeat: Infinity }}
          >
            {/* Cake Plate */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-28 h-1.5 bg-gradient-to-r from-blue-300 to-sky-300 rounded-full opacity-80" />

            {/* Cake Base */}
            <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-24 h-16 bg-gradient-to-b from-blue-400 to-indigo-700 rounded-xl shadow-lg border border-blue-300/30" />

            {/* Middle Layer */}
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-20 h-8 bg-gradient-to-b from-sky-300 to-blue-500 rounded-lg border border-blue-200/30" />

            {/* Top Layer */}
            <div className="absolute bottom-18 left-1/2 -translate-x-1/2 w-16 h-6 bg-gradient-to-b from-cyan-200 to-blue-400 rounded-md border border-cyan-100/30" />

            {/* Blue Candles */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 flex space-x-3">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="relative"
                  animate={{ y: [0, -3, 0] }}
                  transition={{ duration: 1.2 + i * 0.2, repeat: Infinity }}
                >
                  <div className="w-2 h-8 bg-gradient-to-b from-blue-100 via-blue-300 to-blue-600 rounded-t-sm" />
                  <motion.div
                    className="absolute -top-1 left-1/2 -translate-x-1/2 w-3 h-3 bg-gradient-to-b from-yellow-300 to-orange-400 rounded-full"
                    animate={{
                      scale: [1, 1.1, 1],
                      opacity: [0.8, 1, 0.8],
                    }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Click Instruction */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            transition={{ delay: 0.8 }}
            className="text-center mt-2 text-blue-200 text-xs font-medium"
          >
            Click the cake! 🎂
          </motion.p>
        </motion.div>

        {/* Birthday Wish Message - Compact */}
        {cakeCut && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="text-center p-3 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 backdrop-blur-sm rounded-xl border border-blue-300/30 shadow-md max-w-xs mx-auto"
          >
            <p className="text-sm font-medium text-blue-100">
              Happy Birthday {names[currentName]}! 💙
            </p>
          </motion.div>
        )}

        {/* Heartfelt Message - Compact */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="text-center max-w-md px-4"
        >
          <div className="relative p-4 bg-gradient-to-b from-blue-900/30 to-indigo-900/30 backdrop-blur-sm rounded-2xl border border-blue-400/20 shadow-lg">
            <motion.div
              className="absolute -top-2 -left-2"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="w-4 h-4 text-cyan-300" />
            </motion.div>
            <p className="text-sm md:text-base text-blue-50 leading-relaxed font-light">
              "To the one who brings joy to my days, light to my world, and love
              to my heart. 💫"
            </p>
          </div>
        </motion.div>

        {/* Action Buttons - Compact with Next Page Button */}
        <div className="flex flex-col items-center gap-3 mb-4">
          {/* Next Page Button */}
          {/* <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="w-full max-w-xs"
          >
            <Link href="/message" className="block">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full px-6 py-3 text-sm font-semibold rounded-xl bg-gradient-to-r from-blue-600 via-cyan-500 to-sky-600 hover:from-blue-700 hover:via-cyan-600 hover:to-sky-700 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 group"
              >
                <span>Go to Next Page</span>
                <motion.span
                  animate={{ x: [0, 3, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowRight className="w-4 h-4" />
                </motion.span>
              </motion.button>
            </Link>
          </motion.div> */}

          {/* Surprise Button */}
          <AnimatedButton
            href="/surprise"
            className="px-6 py-2 text-sm font-semibold rounded-xl bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-600 hover:from-pink-600 hover:via-purple-600 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl"
          >
            <span className="flex items-center gap-2">
              🎁 Discover Surprise
            </span>
          </AnimatedButton>

          {/* Balloons Toggle Button */}
          {/* <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowBalloons(!showBalloons)}
            className="px-4 py-2 text-sm font-medium rounded-xl bg-gradient-to-r from-indigo-500/30 to-blue-500/30 backdrop-blur-sm border border-blue-400/30 hover:border-blue-300/50 transition-all flex items-center gap-2"
          >
            {showBalloons ? "🎈 Hide Balloons" : "🎈 Show Balloons"}
          </motion.button> */}
        </div>

        {/* Footer Note - Minimal */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-xs text-blue-300/60 text-center mb-2"
        >
          Made with 💙
        </motion.p>
      </div>

      {/* Confetti Effect */}
      <TrailEffect />
    </div>
  );
}
