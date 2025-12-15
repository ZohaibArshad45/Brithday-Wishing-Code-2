"use client";
import Link from "next/link";
import { motion } from "framer-motion";

export default function AnimatedButton({ href, children, className = "" }) {
  return (
    <Link href={href}>
      <motion.button
        className={`px-8 py-4 text-lg font-semibold text-white rounded-full shadow-2xl ${className}`}
        whileHover={{
          scale: 1.05,
          boxShadow: "0 20px 40px rgba(236, 72, 153, 0.4)",
        }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {children}
      </motion.button>
    </Link>
  );
}