"use client";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import TypingText from "@/components/TypingText";
import AnimatedButton from "@/components/AnimatedButton";
import Link from "next/link";
import TrailEffect from "@/components/ConfettiBackground";
import { Heart, Sparkles, Star, Globe } from "lucide-react";

export default function HomePage() {
  const [cakeCut, setCakeCut] = useState(false);
  const [showStars, setShowStars] = useState(true);
  const [currentName, setCurrentName] = useState(0);
  const names = ["My happiness", "Meri dost", "My whole world"];

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

  return (
    <div className="relative h-screen w-full overflow-hidden bg-gradient-to-br from-blue-950 via-indigo-900 to-sky-900 text-white flex flex-col items-center justify-center">
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

      {/* Floating Animated Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              x: [0, Math.random() * 10 - 5, 0],
              rotate: [0, 360],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          >
            <Sparkles className="w-4 h-4 text-blue-300/40" />
          </motion.div>
        ))}
      </div>

      {/* Animated Stars */}
      {showStars && (
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-blue-200 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 2 + Math.random() * 2,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </div>
      )}

      {/* Main Content Container */}
      <div className="relative z-10 flex flex-col items-center justify-between px-6 h-full w-full max-w-4xl mx-auto py-8">
        {/* Header Section */}
        <div className="text-center space-y-3 mt-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center gap-2"
          >
            <Heart className="w-6 h-6 text-pink-300 animate-pulse" />
            <span className="text-lg text-blue-200 font-medium">
              A Special Birthday Wish
            </span>
            <Heart className="w-6 h-6 text-pink-300 animate-pulse" />
          </motion.div>

          <TypingText
            text="Happy Birthday To"
            className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-sky-300 via-blue-200 to-cyan-300 bg-clip-text text-transparent"
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
            <div className="text-4xl md:text-7xl font-extrabold bg-gradient-to-r from-cyan-200 via-sky-200 to-blue-200 bg-clip-text text-transparent px-6 py-2">
              {names[currentName]}
            </div>
            <motion.div
              className="absolute -top-2 -right-2"
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            >
              <Star className="w-6 h-6 text-yellow-300 fill-yellow-300" />
            </motion.div>
            <motion.div
              className="absolute -bottom-2 -left-2"
              animate={{ rotate: -360 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            >
              <Globe className="w-6 h-6 text-cyan-300" />
            </motion.div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-lg text-blue-100 font-light italic"
          >
            You mean everything to me 🌟
          </motion.p>
        </div>

        {/* Cake Section - Updated with Blue Theme */}
        <motion.div
          onClick={handleCakeClick}
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.05 }}
          className="relative cursor-pointer group"
        >
          {/* Glow effect */}
          <motion.div
            className="absolute -inset-4 bg-blue-400/20 rounded-full blur-xl"
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
          />

          <motion.div
            className="relative w-40 h-40"
            animate={{ rotate: [0, 2, -2, 0] }}
            transition={{ duration: 6, repeat: Infinity }}
          >
            {/* Cake Plate */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-36 h-2 bg-gradient-to-r from-blue-300 to-sky-300 rounded-full opacity-80" />

            {/* Cake Base */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-20 bg-gradient-to-b from-blue-400 to-indigo-700 rounded-2xl shadow-2xl border border-blue-300/30" />

            {/* Middle Layer */}
            <div className="absolute bottom-16 left-1/2 -translate-x-1/2 w-28 h-10 bg-gradient-to-b from-sky-300 to-blue-500 rounded-xl border border-blue-200/30" />

            {/* Top Layer */}
            <div className="absolute bottom-24 left-1/2 -translate-x-1/2 w-24 h-8 bg-gradient-to-b from-cyan-200 to-blue-400 rounded-lg border border-cyan-100/30" />

            {/* Blue Candles */}
            <div className="absolute top-6 left-1/2 -translate-x-1/2 flex space-x-4">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="relative"
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 1.2 + i * 0.2, repeat: Infinity }}
                >
                  <div className="w-3 h-10 bg-gradient-to-b from-blue-100 via-blue-300 to-blue-600 rounded-t-lg" />
                  <motion.div
                    className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-gradient-to-b from-yellow-300 to-orange-400 rounded-full"
                    animate={{
                      scale: [1, 1.2, 1],
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
            transition={{ delay: 1 }}
            className="text-center mt-4 text-blue-200 text-sm font-medium"
          >
            Click the cake for a wish! 🎂
          </motion.p>
        </motion.div>

        {/* Birthday Wish Message */}
        {cakeCut && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="text-center p-4 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 backdrop-blur-sm rounded-2xl border border-blue-300/30 shadow-lg"
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 0.5 }}
              className="text-2xl mb-2"
            >
              🎉✨
            </motion.div>
            <p className="text-lg font-medium text-blue-100">
              Wishing my {names[currentName]} <br />
              the most magical birthday ever! 💙
            </p>
          </motion.div>
        )}

        {/* Heartfelt Message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="text-center max-w-xl"
        >
          <div className="relative p-6 bg-gradient-to-b from-blue-900/30 to-indigo-900/30 backdrop-blur-sm rounded-3xl border border-blue-400/20 shadow-2xl">
            <motion.div
              className="absolute -top-3 -left-3"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="w-6 h-6 text-cyan-300" />
            </motion.div>
            <motion.div
              className="absolute -bottom-3 -right-3"
              animate={{ rotate: -360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="w-6 h-6 text-blue-300" />
            </motion.div>
            <p className="text-lg md:text-xl text-blue-50 leading-relaxed font-light">
              "To the one who brings{" "}
              <span className="font-bold text-cyan-200">joy</span> to my days,{" "}
              <span className="font-bold text-blue-200">light</span> to my
              world, and <span className="font-bold text-sky-200">love</span> to
              my heart. May your birthday be as wonderful as you are! 💫"
            </p>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-5 mb-6">
          <AnimatedButton
            href="/message"
            className="px-8 py-3 text-lg font-semibold rounded-2xl bg-gradient-to-r from-blue-600 via-cyan-500 to-sky-600 hover:from-blue-700 hover:via-cyan-600 hover:to-sky-700 transition-all shadow-xl hover:shadow-2xl hover:scale-105 group"
          >
            <span className="flex items-center gap-2">
              <motion.span
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="inline-block"
              >
                🎁
              </motion.span>
              Discover Your Surprise
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                →
              </motion.span>
            </span>
          </AnimatedButton>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowStars(!showStars)}
            className="px-6 py-3 text-base font-medium rounded-2xl bg-gradient-to-r from-indigo-500/30 to-blue-500/30 backdrop-blur-sm border border-blue-400/30 hover:border-blue-300/50 transition-all"
          >
            {showStars ? "✨ Hide Magic" : "✨ Show Magic"}
          </motion.button>
        </div>

        {/* Footer Note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="text-sm text-blue-300/70 text-center"
        >
          Made with 💙 for someone very special
        </motion.p>
      </div>

      {/* Confetti Effect */}
      <TrailEffect />
    </div>
  );
}
