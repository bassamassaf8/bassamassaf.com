"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Home, Calendar, Clock, Coffee, Users } from "lucide-react";
import Link from "next/link";

export default function BlogPage() {
  const [loading, setLoading] = useState(true);
  const [funnyMessage, setFunnyMessage] = useState("");

  const funnyMessages = [
    "Working on my first blog post...",
    "Hugging sweaty people in jiu-jitsu...",
    "Trying to explain why I love rolling around on mats...",
    "Debating whether to write about code or chokes...",
    "Currently stuck in someone's guard... I mean, writer's block...",
    "Practicing my submissions... I mean, blog submissions...",
    "Learning the art of tapping out... to my keyboard...",
  ];

  useEffect(() => {
    // Pick a random funny message
    setFunnyMessage(
      funnyMessages[Math.floor(Math.random() * funnyMessages.length)]
    );

    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <motion.div
            className="w-16 h-16 border-4 border-[#B3B8FF] border-t-transparent rounded-full mx-auto mb-6"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <motion.p
            className="text-lg text-gray-300 max-w-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {funnyMessage}
          </motion.p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="p-6 border-b border-white/10">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <Link
            href="/"
            className="flex items-center gap-2 text-gray-400 hover:text-white transition"
          >
            <Home size={20} />
            <span>Back to Portfolio</span>
          </Link>
          <div className="flex gap-6 text-gray-400 text-sm">
            <Link href="/" className="hover:text-white transition">
              Home
            </Link>
            <Link href="/projects" className="hover:text-white transition">
              Projects
            </Link>
            <Link href="/blog" className="text-[#B3B8FF]">
              Blog
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-4xl mx-auto px-6 py-24">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-light text-[#B3B8FF] mb-6">Blog</h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Thoughts on code, jiu-jitsu, and the occasional existential crisis
            about semicolons
          </p>
        </motion.div>

        {/* Coming Soon Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white/5 rounded-2xl p-8 text-center max-w-2xl mx-auto"
        >
          <div className="text-6xl mb-6">🚧</div>
          <h2 className="text-2xl font-semibold text-white mb-4">
            Under Construction
          </h2>
          <p className="text-gray-300 mb-6 leading-relaxed">
            Currently torn between writing about my latest React discoveries or
            explaining why getting submitted in jiu-jitsu is actually a learning
            experience (and definitely not just getting my ass kicked).
          </p>

          {/* Fake Blog Post Previews */}
          <div className="space-y-4 mt-8">
            <div className="bg-white/5 rounded-lg p-4 text-left">
              <div className="flex items-center gap-2 text-sm text-gray-400 mb-2">
                <Calendar size={14} />
                <span>Coming Soon</span>
              </div>
              <h3 className="text-lg font-medium text-white mb-2">
                "Why I Chose Next.js (And Why My Back Hurts From Jiu-Jitsu)"
              </h3>
              <p className="text-gray-400 text-sm">
                A deep dive into modern web development and why rolling around
                on mats is surprisingly similar to debugging...
              </p>
            </div>

            <div className="bg-white/5 rounded-lg p-4 text-left">
              <div className="flex items-center gap-2 text-sm text-gray-400 mb-2">
                <Clock size={14} />
                <span>In Progress</span>
              </div>
              <h3 className="text-lg font-medium text-white mb-2">
                "Building DXB Hoops: From Idea to 100+ Athletes"
              </h3>
              <p className="text-gray-400 text-sm">
                The story behind Dubai's basketball community platform and the
                lessons learned along the way...
              </p>
            </div>

            <div className="bg-white/5 rounded-lg p-4 text-left">
              <div className="flex items-center gap-2 text-sm text-gray-400 mb-2">
                <Coffee size={14} />
                <span>Brewing</span>
              </div>
              <h3 className="text-lg font-medium text-white mb-2">
                "TypeScript vs JavaScript: Like Gi vs No-Gi"
              </h3>
              <p className="text-gray-400 text-sm">
                Comparing programming paradigms through the lens of martial arts
                because why not...
              </p>
            </div>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-center mt-12"
        >
          <p className="text-gray-400 mb-4">
            Want to be notified when I actually write something?
          </p>
          <div className="flex items-center justify-center gap-4">
            <a
              href="https://www.linkedin.com/in/bassam-assaf-b2611b33b/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-[#B3B8FF]/10 hover:bg-[#B3B8FF]/20 text-[#B3B8FF] rounded-full transition-all duration-300"
            >
              <Users size={16} />
              <span>Follow on LinkedIn</span>
            </a>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8 mt-24">
        <div className="max-w-4xl mx-auto px-6 text-center text-gray-400 text-sm">
          <p>&copy; 2025 Bassam Assaf. Blog coming soon (I promise).</p>
        </div>
      </footer>
    </div>
  );
}
