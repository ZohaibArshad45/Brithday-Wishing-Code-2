"use client";
import React, { useState, useEffect } from "react";

export default function TrailEffect() {
  const [trail, setTrail] = useState([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const emojiSets = {
    birthday: ["🎂", "🎈", "🎁", "✨", "🌟", "💫", "🎉", "🥳", "🎊", "💝"],
    nature: ["🌸", "🌺", "🌼", "🦋", "🐦", "🌿", "💐", "🌙", "⭐", "☁️"],
    magic: ["🔮", "💎", "🌠", "⚡", "💖", "💫", "✨", "🌟", "🕯️", "🎇"],
    love: ["💕", "💖", "💗", "💓", "💞", "💘", "❤️", "🧡", "💛", "💚"],
  };

  const [currentSet, setCurrentSet] = useState("birthday");
  const trailLength = 15;

  useEffect(() => {
    let animationFrameId;
    let lastTime = 0;
    const throttleDelay = 16; // ~60fps

    const handleMove = (e) => {
      const currentTime = Date.now();

      if (currentTime - lastTime >= throttleDelay) {
        setMousePosition({ x: e.clientX, y: e.clientY });

        const newPoint = {
          x: e.clientX,
          y: e.clientY,
          id: Date.now() + Math.random(),
          rotation: Math.random() * 360,
          scale: 0.8 + Math.random() * 0.4,
          emojiSet: currentSet,
        };

        setTrail((prev) => {
          const updated = [...prev, newPoint];
          if (updated.length > trailLength) updated.shift();
          return updated;
        });

        lastTime = currentTime;
      }
    };

    // Auto-cycle through emoji sets
    const cycleInterval = setInterval(() => {
      const sets = Object.keys(emojiSets);
      const currentIndex = sets.indexOf(currentSet);
      const nextIndex = (currentIndex + 1) % sets.length;
      setCurrentSet(sets[nextIndex]);
    }, 4000);

    window.addEventListener("mousemove", handleMove);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      clearInterval(cycleInterval);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [currentSet]);

  // Calculate smooth trail with physics
  const getTrailStyle = (index, total) => {
    const progress = index / total;
    const reverseIndex = total - index - 1;

    // Smooth size decay
    const sizeScale = 0.3 + (1 - progress) * 0.7;

    // Opacity decay with curve
    const opacity = Math.pow(1 - progress, 1.5);

    // Color variation based on position
    const hue = (progress * 60 + 280) % 360; // Purple to pink spectrum

    // Smooth delay for wave effect
    const delay = reverseIndex * 0.03;

    return {
      opacity,
      transform: `translate(-50%, -50%) scale(${sizeScale})`,
      filter: `hue-rotate(${hue}deg) brightness(1.2)`,
      animationDelay: `${delay}s`,
      zIndex: reverseIndex,
    };
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {/* Mouse highlight effect */}
      <div
        className="absolute w-8 h-8 bg-gradient-to-r from-pink-400/20 to-purple-400/20 rounded-full blur-xl transition-all duration-150 ease-out"
        style={{
          left: mousePosition.x - 16,
          top: mousePosition.y - 16,
        }}
      />

      {/* Enhanced trail with smooth animations */}
      {trail.map((point, index, array) => {
        const emojiList = emojiSets[point.emojiSet || currentSet];
        const emojiIndex = Math.floor(
          (index / array.length) * emojiList.length
        );
        const emoji = emojiList[emojiIndex % emojiList.length];

        return (
          <div
            key={point.id}
            className="absolute animate-float-trail"
            style={{
              left: point.x,
              top: point.y,
              ...getTrailStyle(index, array.length),
            }}
          >
            <div className="relative">
              {/* Glow effect */}
              <div
                className="absolute inset-0 animate-pulse-glow"
                style={{
                  filter: "blur(8px)",
                  opacity: 0.6,
                  transform: "scale(1.3)",
                }}
              >
                {emoji}
              </div>

              {/* Main emoji */}
              <div
                className="relative transform transition-all duration-200"
                style={{
                  transform: `rotate(${point.rotation}deg) scale(${point.scale})`,
                }}
              >
                {emoji}
              </div>
            </div>
          </div>
        );
      })}

      {/* Floating background particles */}
      <div className="absolute inset-0">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute text-2xl opacity-10 animate-float-slow"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${15 + Math.random() * 10}s`,
            }}
          >
            {emojiSets.birthday[i % emojiSets.birthday.length]}
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes float-trail {
          0% {
            transform: translate(-50%, -50%) scale(0.8) rotate(0deg);
            opacity: 0;
          }
          20% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1.1) rotate(5deg);
          }
          80% {
            opacity: 0.8;
            transform: translate(-50%, -50%) scale(0.9) rotate(-3deg);
          }
          100% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.6) rotate(0deg);
          }
        }

        @keyframes pulse-glow {
          0%,
          100% {
            opacity: 0.4;
            transform: scale(1.3);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.5);
          }
        }

        @keyframes float-slow {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          33% {
            transform: translateY(-20px) rotate(120deg);
          }
          66% {
            transform: translateY(10px) rotate(240deg);
          }
        }

        .animate-float-trail {
          animation: float-trail 0.8s ease-out forwards;
        }

        .animate-pulse-glow {
          animation: pulse-glow 1.5s ease-in-out infinite;
        }

        .animate-float-slow {
          animation: float-slow 20s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
