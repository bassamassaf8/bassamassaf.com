"use client";

import { motion } from "framer-motion";
import {
  ArrowLeft,
  Download,
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  BookOpen,
  Code2,
  Lightbulb,
  PenTool,
} from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  const currentFocus = [
    {
      icon: <Code2 size={16} />,
      title: "building",
      description: "AI video analysis platform for sales teams",
    },
    {
      icon: <BookOpen size={16} />,
      title: "reading",
      description: "The Lean Startup by Eric Ries",
    },
    {
      icon: <Lightbulb size={16} />,
      title: "studying",
      description: "Advanced computer vision techniques",
    },
    {
      icon: <PenTool size={16} />,
      title: "writing",
      description: "Documentation for open-source tools",
    },
  ];

  const projects = [
    {
      name: "Paradigm",
      role: "Co-founder",
      year: "2024",
      description:
        "AI video analysis platform with sentiment tracking and automated note-taking",
      url: "#",
    },
    {
      name: "ExamVault",
      role: "Co-founder",
      year: "2024",
      description: "AI-powered study platform with 15K+ users and 94% accuracy",
      url: "https://examvault.app",
    },
    {
      name: "DXB Hoops",
      role: "Founder",
      year: "2025",
      description:
        "Basketball community platform connecting 2.5K+ players in Dubai",
      url: "https://dxbhoops.com",
    },
    {
      name: "Time to Copy",
      role: "Founder",
      year: "2024",
      description: "Productivity app for digital content management",
      url: "https://timetocopy.vercel.app",
    },
    {
      name: "Domaindle",
      role: "Founder",
      year: "2024",
      description: "My first project - a hub for daily puzzle games",
      url: "https://domaindle.vercel.app",
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Animated starry background */}
      <div className="fixed inset-0 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 120% 80% at 30% 70%, rgba(15, 15, 45, 0.3) 0%, transparent 70%),
              radial-gradient(ellipse 100% 60% at 70% 30%, rgba(25, 25, 80, 0.2) 0%, transparent 60%),
              linear-gradient(180deg, #000000 0%, #0a0a1a 50%, #000000 100%)
            `,
          }}
        />

        {/* Subtle floating stars */}
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Navigation */}
      <motion.nav
        className="relative z-10 flex justify-between items-center px-6 sm:px-8 py-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Link
          href="/"
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors group"
        >
          <ArrowLeft
            size={16}
            className="group-hover:-translate-x-1 transition-transform"
          />
          <span className="text-sm font-medium">Back to Galaxy</span>
        </Link>
      </motion.nav>

      {/* Main Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 sm:px-8 pb-20">
        {/* Header Section */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h1 className="text-5xl sm:text-6xl font-light text-[#B3B8FF] mb-3 tracking-tight">
            Bassam Assaf
          </h1>
          <p className="text-lg text-gray-400 font-medium mb-8">
            student • builder • developer
          </p>

          <p className="text-xl text-gray-300 leading-relaxed max-w-2xl font-light">
            I build tools that{" "}
            <strong className="text-white font-medium">
              simplify technology
            </strong>{" "}
            and{" "}
            <strong className="text-white font-medium">empower others</strong>.
            Currently focused on{" "}
            <strong className="text-white font-medium">
              AI-powered platforms
            </strong>{" "}
            that solve real problems with{" "}
            <strong className="text-white font-medium">clarity</strong> and{" "}
            <strong className="text-white font-medium">impact</strong>.
          </p>
        </motion.div>

        {/* Quick Access Buttons */}
        <motion.div
          className="flex flex-wrap gap-4 mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <motion.a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 bg-white/5 backdrop-blur-md border border-white/10 rounded-full text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-300"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Download size={16} />
            <span className="font-medium">Resume</span>
          </motion.a>

          <motion.a
            href="https://github.com/bassamassaf8"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 bg-white/5 backdrop-blur-md border border-white/10 rounded-full text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-300"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Github size={16} />
            <span className="font-medium">GitHub</span>
          </motion.a>

          <motion.a
            href="https://www.linkedin.com/in/bassam-assaf-b2611b33b/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 bg-white/5 backdrop-blur-md border border-white/10 rounded-full text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-300"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Linkedin size={16} />
            <span className="font-medium">LinkedIn</span>
          </motion.a>

          <motion.a
            href="mailto:bassamassaf32@gmail.com"
            className="flex items-center gap-2 px-6 py-3 bg-white/5 backdrop-blur-md border border-white/10 rounded-full text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-300"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Mail size={16} />
            <span className="font-medium">Email</span>
          </motion.a>
        </motion.div>

        {/* Current Focus Box */}
        <motion.section
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
            <h2 className="text-lg font-medium text-white mb-6 flex items-center gap-2">
              ⚡ current focus
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {currentFocus.map((item, index) => (
                <motion.div
                  key={index}
                  className="flex items-start gap-3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                >
                  <div className="text-[#B3B8FF] mt-1 flex-shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="text-white font-medium mb-1">
                      {item.title}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Projects Timeline */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
        >
          <h2 className="text-lg font-medium text-white mb-8">Projects</h2>

          <div className="space-y-4">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                className="group bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0 + index * 0.1 }}
                whileHover={{ scale: 1.01 }}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      {project.url !== "#" ? (
                        <Link
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-white font-medium hover:text-[#B3B8FF] transition-colors flex items-center gap-2 group"
                        >
                          {project.name}
                          <ExternalLink
                            size={14}
                            className="opacity-0 group-hover:opacity-100 transition-opacity"
                          />
                        </Link>
                      ) : (
                        <h3 className="text-white font-medium">
                          {project.name}
                        </h3>
                      )}
                      <span className="text-xs text-gray-500 bg-gray-800 px-2 py-1 rounded-full">
                        {project.role}
                      </span>
                    </div>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {project.description}
                    </p>
                  </div>
                  <span className="text-xs text-gray-500 font-mono">
                    {project.year}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Footer spacing */}
        <div className="h-20" />
      </div>
    </div>
  );
}
