"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Wrench } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Background gradient similar to the main site */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 120% 80% at 30% 70%, rgba(15, 15, 45, 0.4) 0%, transparent 70%),
            radial-gradient(ellipse 100% 60% at 70% 30%, rgba(25, 25, 80, 0.3) 0%, transparent 60%),
            linear-gradient(180deg, #000000 0%, #0a0a1a 50%, #000000 100%)
          `,
        }}
      />

      {/* Navigation */}
      <motion.nav
        className="relative z-10 flex justify-between items-center px-8 py-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Link
          href="/"
          className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
        >
          <ArrowLeft size={20} />
          <span className="text-sm">Back to Galaxy</span>
        </Link>
      </motion.nav>

      {/* Main Content - Work in Progress */}
      <div className="relative z-10 flex items-center justify-center min-h-[80vh]">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <motion.div
            className="mb-8"
            animate={{
              rotate: [0, 360],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <Wrench size={48} className="text-gray-400 mx-auto" />
          </motion.div>

          <h1 className="text-4xl font-light text-white mb-4 tracking-tight">
            Currently Working On It
          </h1>

          <p className="text-gray-400 text-lg mb-8">
            Building something amazing for this space...
          </p>

          <motion.div
            className="text-sm text-gray-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            Check back soon! ✨
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
