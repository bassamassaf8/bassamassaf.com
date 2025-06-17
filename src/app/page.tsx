"use client";

import { motion, useScroll } from "framer-motion";
import { useRef } from "react";
import {
  Github,
  Mail,
  ExternalLink,
  Download,
  Linkedin,
  MapPin,
  Calendar,
  Award,
  Users,
  Code2,
  Database,
  Wrench,
  BookOpen,
  Trophy,
} from "lucide-react";
import Link from "next/link";

export default function Home() {
  const { scrollYProgress } = useScroll();
  const containerRef = useRef<HTMLDivElement>(null);

  // Hardcoded star positions for SSR safety
  const starPositions = [
    { left: 10, top: 20, size: 48, blur: 12, opacity: 0.25 },
    { left: 30, top: 60, size: 40, blur: 16, opacity: 0.18 },
    { left: 70, top: 15, size: 56, blur: 18, opacity: 0.22 },
    { left: 80, top: 50, size: 36, blur: 10, opacity: 0.2 },
    { left: 55, top: 80, size: 44, blur: 14, opacity: 0.19 },
    { left: 20, top: 75, size: 38, blur: 12, opacity: 0.21 },
    { left: 60, top: 35, size: 52, blur: 20, opacity: 0.23 },
    { left: 85, top: 25, size: 34, blur: 10, opacity: 0.17 },
    { left: 40, top: 10, size: 50, blur: 16, opacity: 0.24 },
    { left: 15, top: 50, size: 42, blur: 13, opacity: 0.2 },
  ];

  return (
    <div
      className="min-h-screen bg-black text-white relative overflow-hidden"
      ref={containerRef}
    >
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
        {/* SSR-safe, glowy floating stars */}
        {starPositions.map((pos, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${pos.left}%`,
              top: `${pos.top}%`,
              width: pos.size,
              height: pos.size,
              opacity: pos.opacity,
              background:
                "radial-gradient(circle, #fff 0%, #b3b8ff 60%, transparent 100%)",
              filter: `blur(${pos.blur}px)`,
            }}
            animate={{
              opacity: [pos.opacity, pos.opacity + 0.2, pos.opacity],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 4 + (i % 3),
              repeat: Infinity,
              delay: (i % 10) * 0.3,
            }}
          />
        ))}
      </div>

      {/* Top navigation */}
      <nav className="absolute top-0 right-0 p-6 z-20 flex gap-6 text-gray-400 text-sm">
        <Link href="/blog" className="hover:text-white transition">
          Blog
        </Link>
        <a
          href="https://www.linkedin.com/in/bassam-assaf-b2611b33b/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-white transition"
        >
          LinkedIn
        </a>
        <a
          href="https://github.com/bassamassaf8"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-white transition"
        >
          GitHub
        </a>
        <a
          href="/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-white transition"
        >
          Resumé
        </a>
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center text-center px-4 relative z-10">
        <motion.p
          className="uppercase tracking-widest text-xs text-gray-500 mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          Developer, Entrepreneur, Student
        </motion.p>
        <motion.h1
          className="text-5xl sm:text-7xl font-light text-[#B3B8FF] mb-6"
          style={{ letterSpacing: "-0.03em" }}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          Hey, I&apos;m Bassam
        </motion.h1>
        <motion.p
          className="text-lg sm:text-2xl text-gray-400 mb-8 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          Building impactful AI-powered web applications with modern
          technologies
        </motion.p>
        <motion.div
          className="flex gap-4"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <Link
            href="/projects"
            className="px-6 py-3 bg-[#B3B8FF] text-black rounded-full hover:bg-[#9ca3ff] transition-all duration-300 font-medium"
          >
            View My Work
          </Link>
          <a
            href="#contact"
            className="px-6 py-3 border border-[#B3B8FF]/30 text-[#B3B8FF] rounded-full hover:bg-[#B3B8FF]/10 transition-all duration-300"
          >
            Get In Touch
          </a>
        </motion.div>
      </section>

      {/* About Me Section */}
      <section
        className="max-w-4xl mx-auto px-4 py-24 relative z-10"
        id="about"
      >
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <div>
            <motion.h2
              className="text-3xl font-semibold text-[#B3B8FF] mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              About Me
            </motion.h2>
            <motion.p
              className="text-gray-300 text-lg mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              I&apos;m a passionate self-taught developer and entrepreneur from
              Dubai who fell in love with coding through solving everyday
              problems. I specialize in creating web applications with a focus
              on AI integration, user experience, and scalable architectures.
            </motion.p>
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex items-center gap-2">
                <MapPin size={16} className="text-[#B3B8FF]" />
                <span>Dubai, UAE</span>
              </div>
              <div className="flex items-center gap-2">
                <Code2 size={16} className="text-[#B3B8FF]" />
                <span>Jiu-Jitsu White Belt</span>
              </div>
              <div className="flex items-center gap-2">
                <Users size={16} className="text-[#B3B8FF]" />
                <span>Certified Hooper</span>
              </div>
            </motion.div>
          </div>
          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <div className="w-64 h-64 mx-auto bg-gradient-to-br from-[#B3B8FF]/20 to-[#B3B8FF]/5 rounded-2xl flex items-center justify-center">
              <div className="text-gray-400 text-lg">Photo Coming Soon</div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Skills & Tech Stack */}
      <section className="max-w-6xl mx-auto px-4 py-24 relative z-10">
        <motion.h2
          className="text-3xl font-semibold text-[#B3B8FF] mb-12 text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          Skills & Tech Stack
        </motion.h2>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <motion.div
            className="bg-white/5 rounded-xl p-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <Code2 size={20} className="text-[#B3B8FF]" />
              <h3 className="text-xl font-semibold">Languages</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {["TypeScript", "JavaScript", "Python", "HTML", "CSS", "SQL"].map(
                (skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 bg-white/10 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                )
              )}
            </div>
          </motion.div>
          <motion.div
            className="bg-white/5 rounded-xl p-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <Database size={20} className="text-[#B3B8FF]" />
              <h3 className="text-xl font-semibold">Frameworks</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {[
                "Next.js",
                "React",
                "FastAPI",
                "TailwindCSS",
                "Framer Motion",
                "Prisma",
              ].map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 bg-white/10 rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
          <motion.div
            className="bg-white/5 rounded-xl p-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <Wrench size={20} className="text-[#B3B8FF]" />
              <h3 className="text-xl font-semibold">Tools</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {["Supabase", "Vercel", "OpenAI", "Git", "Docker", "Redis"].map(
                (skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 bg-white/10 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                )
              )}
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Featured Projects Preview */}
      <section className="max-w-6xl mx-auto px-4 py-24 relative z-10">
        <motion.h2
          className="text-3xl font-semibold text-[#B3B8FF] mb-12 text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          Featured Projects
        </motion.h2>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          {[
            {
              name: "Paradigm",
              description: "AI video analysis platform",
              tech: ["Next.js", "OpenAI", "FastAPI"],
              status: "In Development",
            },
            {
              name: "ExamVault",
              description: "AI-powered study platform",
              tech: ["Next.js", "Supabase", "OpenAI"],
              status: "Live",
            },
            {
              name: "DXB Hoops",
              description: "Basketball community platform",
              tech: ["Next.js", "Prisma", "Vercel"],
              status: "Live • 100+ athletes",
            },
          ].map((project, index) => (
            <motion.div
              key={index}
              className="bg-white/5 rounded-xl p-6 hover:bg-white/10 transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 + index * 0.1 }}
            >
              <h3 className="text-xl font-semibold text-white mb-2">
                {project.name}
              </h3>
              <p className="text-gray-300 mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-1 bg-[#B3B8FF]/20 text-[#B3B8FF] rounded text-xs"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <p className="text-sm text-gray-400">{project.status}</p>
            </motion.div>
          ))}
        </motion.div>
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#B3B8FF]/10 hover:bg-[#B3B8FF]/20 text-[#B3B8FF] rounded-full transition-all duration-300"
          >
            <span>View All Projects</span>
            <ExternalLink size={16} />
          </Link>
        </motion.div>
      </section>

      {/* Education */}
      <section className="max-w-4xl mx-auto px-4 py-24 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          <h2 className="text-3xl font-semibold text-[#B3B8FF] mb-8 text-center">
            Education
          </h2>
          <motion.div
            className="bg-white/5 rounded-xl p-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center gap-2 mb-6 justify-center">
              <BookOpen size={24} className="text-[#B3B8FF]" />
              <h3 className="text-2xl font-semibold">A Levels</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-center">
              <motion.div
                className="bg-white/5 rounded-lg p-4"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <div className="text-lg font-medium text-white">
                  Pure Mathematics
                </div>
              </motion.div>
              <motion.div
                className="bg-white/5 rounded-lg p-4"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                <div className="text-lg font-medium text-white">
                  Further Pure Mathematics
                </div>
              </motion.div>
              <motion.div
                className="bg-white/5 rounded-lg p-4"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
              >
                <div className="text-lg font-medium text-white">
                  Computer Science
                </div>
              </motion.div>
              <motion.div
                className="bg-white/5 rounded-lg p-4"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
              >
                <div className="text-lg font-medium text-white">Physics</div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Contact Section */}
      <section
        className="max-w-4xl mx-auto px-4 py-24 relative z-10"
        id="contact"
      >
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          <motion.h2
            className="text-3xl font-semibold text-[#B3B8FF] mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Let&apos;s Build Something Amazing
          </motion.h2>
          <motion.p
            className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            I&apos;m always excited to work on new projects and collaborate with
            talented people. Let&apos;s discuss how we can bring your ideas to
            life.
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <a
              href="mailto:bassam@example.com"
              className="flex items-center gap-2 px-6 py-3 bg-[#B3B8FF] text-black rounded-full hover:bg-[#9ca3ff] transition-all duration-300 font-medium"
            >
              <Mail size={16} />
              <span>Send Email</span>
            </a>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 border border-[#B3B8FF]/30 text-[#B3B8FF] rounded-full hover:bg-[#B3B8FF]/10 transition-all duration-300"
            >
              <Download size={16} />
              <span>Working on this</span>
            </a>
          </motion.div>
          <motion.div
            className="flex items-center justify-center gap-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            <a
              href="https://github.com/bassamassaf8"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-[#B3B8FF] transition-colors"
            >
              <Github size={24} />
            </a>
            <a
              href="https://www.linkedin.com/in/bassam-assaf-b2611b33b/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-[#B3B8FF] transition-colors"
            >
              <Linkedin size={24} />
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8 relative z-10">
        <motion.div
          className="max-w-4xl mx-auto px-4 text-center text-gray-400 text-sm"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          <p>
            &copy; 2025 Bassam Assaf. Built with Next.js, TypeScript, and Framer
            Motion.
          </p>
          <p className="mt-2">Updated January 2025</p>
        </motion.div>
      </footer>
    </div>
  );
}
