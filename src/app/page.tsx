"use client";

import {
  Github,
  Mail,
  ExternalLink,
  Linkedin,
  Sun,
  Moon,
  Download,
} from "lucide-react";
import { useState } from "react";
import NeonMazeBackground from "./components/NeonMazeBackground";

export default function Home() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <div
      className={`min-h-screen relative overflow-hidden transition-colors duration-150 ${
        isDarkMode ? "bg-black text-white" : "bg-white text-gray-900"
      }`}
    >
      <NeonMazeBackground isDark={isDarkMode} />
      {/* Background moved to NeonMazeBackground in layout */}

      {/* Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 p-4 sm:p-6 z-20 backdrop-blur-sm transition-colors duration-500 ${
          isDarkMode
            ? "bg-gradient-to-b from-[#000811]/80 to-transparent"
            : "bg-gradient-to-b from-white/80 to-transparent"
        }`}
      >
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <div
            className={`text-sm sm:text-base font-medium transition-colors duration-500 ${
              isDarkMode ? "text-[#e6f3ff]" : "text-gray-900"
            }`}
          >
            bassam assaf
          </div>
          <div className="flex items-center gap-4 sm:gap-6">
            <div
              className={`flex gap-4 sm:gap-6 text-xs sm:text-sm transition-colors duration-500 ${
                isDarkMode ? "text-[#b3d9ff]" : "text-gray-600"
              }`}
            >
              <a
                href="#projects"
                className={`hover:opacity-80 transition-all duration-300 ${
                  isDarkMode ? "hover:text-[#e6f3ff]" : "hover:text-gray-900"
                }`}
              >
                projects
              </a>
              <a
                href="#about"
                className={`hover:opacity-80 transition-all duration-300 ${
                  isDarkMode ? "hover:text-[#e6f3ff]" : "hover:text-gray-900"
                }`}
              >
                about
              </a>
              <a
                href="#cv"
                className={`hover:opacity-80 transition-all duration-300 ${
                  isDarkMode ? "hover:text-[#e6f3ff]" : "hover:text-blue-900"
                }`}
              >
                cv
              </a>
              <a
                href="#contact"
                className={`hover:opacity-80 transition-all duration-300 ${
                  isDarkMode ? "hover:text-[#e6f3ff]" : "hover:text-gray-900"
                }`}
              >
                contact
              </a>
            </div>
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`p-2 rounded-lg transition-all duration-300 hover:scale-110 ${
                isDarkMode
                  ? "bg-white/10 hover:bg-white/20 text-white"
                  : "bg-gray-200 hover:bg-gray-300 text-gray-900"
              }`}
            >
              {isDarkMode ? <Sun size={16} /> : <Moon size={16} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 pt-16 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h1
            className={`text-5xl sm:text-6xl md:text-7xl font-light mb-10 tracking-wide transition-colors duration-500 ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}
            id="hero-name"
          >
            bassam assaf
          </h1>
          <p
            className={`text-xl sm:text-2xl mb-12 max-w-lg mx-auto leading-relaxed transition-colors duration-500 ${
              isDarkMode ? "text-[#e6f3ff]" : "text-gray-700"
            }`}
          >
            developer • entrepreneur • student
          </p>
          <div
            className={`flex items-center justify-center gap-6 sm:gap-8 text-sm sm:text-base transition-colors duration-300 ${
              isDarkMode ? "text-[#b3d9ff]" : "text-blue-800"
            }`}
          >
            <a
              href="https://github.com/bassamassaf8"
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-2 transition-all duration-300 hover:scale-105 ${
                isDarkMode ? "hover:text-[#e6f3ff]" : "hover:text-blue-900"
              }`}
            >
              <Github size={12} />
              github
            </a>
            <a
              href="mailto:bassamassaf32@gmail.com"
              className={`flex items-center gap-2 transition-all duration-300 hover:scale-105 ${
                isDarkMode ? "hover:text-[#e6f3ff]" : "hover:text-blue-900"
              }`}
            >
              <Mail size={12} />
              email
            </a>
            <a
              href="https://www.linkedin.com/in/bassamassaf123/"
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-2 transition-all duration-300 hover:scale-105 ${
                isDarkMode ? "hover:text-[#e6f3ff]" : "hover:text-blue-900"
              }`}
            >
              <Linkedin size={12} />
              linkedin
            </a>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section
        className="max-w-3xl mx-auto px-4 sm:px-6 py-16 sm:py-20 relative z-10"
        id="projects"
      >
        <h2
          className={`text-lg sm:text-xl font-medium mb-8 sm:mb-12 transition-colors duration-500 ${
            isDarkMode ? "text-white" : "text-gray-900"
          }`}
        >
          projects
        </h2>

        <div className="space-y-8 sm:space-y-10">
          <div className="group">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-3">
              <h3
                className={`text-xl sm:text-2xl font-medium mb-2 transition-colors duration-500 ${
                  isDarkMode ? "text-white" : "text-gray-900"
                }`}
              >
                examvault
              </h3>
              <div className="flex items-center gap-4">
                <a
                  href="https://examvault.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-sm sm:text-base px-3 py-1 rounded-full border transition-colors ${
                    isDarkMode
                      ? "text-[#b3d9ff] border-[#66b3ff]/40 hover:border-[#e6f3ff] hover:text-[#e6f3ff]"
                      : "text-blue-700 border-blue-300 hover:border-blue-800 hover:text-blue-900"
                  }`}
                >
                  live ↗
                </a>
                <button
                  className={`text-sm sm:text-base px-3 py-1 rounded-full border opacity-70 cursor-not-allowed ${
                    isDarkMode
                      ? "text-[#b3d9ff] border-white/20"
                      : "text-gray-600 border-gray-300"
                  }`}
                  aria-disabled="true"
                >
                  read more
                </button>
              </div>
            </div>
            <p
              className={`text-sm sm:text-base mb-3 transition-colors duration-500 ${
                isDarkMode ? "text-[#e6f3ff]" : "text-gray-700"
              }`}
            >
              co-founder, CGO & developer
            </p>
            <p
              className={`text-sm sm:text-base leading-relaxed transition-colors duration-500 ${
                isDarkMode ? "text-[#b3d9ff]" : "text-gray-600"
              }`}
            >
              ai-powered revision assistant for ib students. learn where you're
              weak, get tailored questions, practice smart.
            </p>
          </div>

          <div className="group">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-3">
              <h3
                className={`text-xl sm:text-2xl font-medium mb-2 transition-colors duration-500 ${
                  isDarkMode ? "text-white" : "text-gray-900"
                }`}
              >
                dxb hoops
              </h3>
              <div className="flex items-center gap-4">
                <a
                  href="https://dxbhoops.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-sm sm:text-base px-3 py-1 rounded-full border transition-colors ${
                    isDarkMode
                      ? "text-[#b3d9ff] border-[#66b3ff]/40 hover:border-[#e6f3ff] hover:text-[#e6f3ff]"
                      : "text-blue-700 border-blue-300 hover:border-blue-800 hover:text-blue-900"
                  }`}
                >
                  live ↗
                </a>
                <button
                  className={`text-sm sm:text-base px-3 py-1 rounded-full border opacity-70 cursor-not-allowed ${
                    isDarkMode
                      ? "text-[#b3d9ff] border-white/20"
                      : "text-gray-600 border-gray-300"
                  }`}
                  aria-disabled="true"
                >
                  read more
                </button>
              </div>
            </div>
            <p
              className={`text-sm sm:text-base mb-3 transition-colors duration-500 ${
                isDarkMode ? "text-[#e6f3ff]" : "text-gray-700"
              }`}
            >
              founder & developer
            </p>
            <p
              className={`text-sm sm:text-base leading-relaxed transition-colors duration-500 ${
                isDarkMode ? "text-[#b3d9ff]" : "text-gray-600"
              }`}
            >
              basketball community platform connecting athletes in dubai.
              features player profiles, game scheduling, and community events.
            </p>
          </div>

          <div className="group">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-3">
              <h3
                className={`text-xl sm:text-2xl font-medium mb-2 transition-colors duration-500 ${
                  isDarkMode ? "text-white" : "text-gray-900"
                }`}
              >
                paradigm
              </h3>
              <div className="flex items-center gap-4">
                <span
                  className={`text-sm sm:text-base self-start sm:self-auto transition-colors duration-500 ${
                    isDarkMode ? "text-[#b3d9ff]" : "text-blue-600"
                  }`}
                >
                  in development
                </span>
                <button
                  className={`text-sm sm:text-base px-3 py-1 rounded-full border opacity-70 cursor-not-allowed ${
                    isDarkMode
                      ? "text-[#b3d9ff] border-white/20"
                      : "text-gray-600 border-gray-300"
                  }`}
                  aria-disabled="true"
                >
                  read more
                </button>
              </div>
            </div>
            <p
              className={`text-sm sm:text-base mb-3 transition-colors duration-500 ${
                isDarkMode ? "text-[#e6f3ff]" : "text-gray-700"
              }`}
            >
              ai video analysis platform
            </p>
            <p
              className={`text-sm sm:text-base leading-relaxed transition-colors duration-500 ${
                isDarkMode ? "text-[#b3d9ff]" : "text-gray-600"
              }`}
            >
              ai-powered video analysis tool for content creators and
              businesses. extract insights, generate summaries, and analyze
              engagement patterns from video content.
            </p>
          </div>

          <div className="group">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-3">
              <h3
                className={`text-xl sm:text-2xl font-medium mb-2 transition-colors duration-500 ${
                  isDarkMode ? "text-white" : "text-gray-900"
                }`}
              >
                time to copy
              </h3>
              <div className="flex items-center gap-4">
                <a
                  href="https://timetocopy.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-sm sm:text-base px-3 py-1 rounded-full border transition-colors ${
                    isDarkMode
                      ? "text-[#b3d9ff] border-[#66b3ff]/40 hover:border-[#e6f3ff] hover:text-[#e6f3ff]"
                      : "text-blue-700 border-blue-300 hover:border-blue-800 hover:text-blue-900"
                  }`}
                >
                  live ↗
                </a>
                <button
                  className={`text-sm sm:text-base px-3 py-1 rounded-full border opacity-70 cursor-not-allowed ${
                    isDarkMode
                      ? "text-[#b3d9ff] border-white/20"
                      : "text-gray-600 border-gray-300"
                  }`}
                  aria-disabled="true"
                >
                  read more
                </button>
              </div>
            </div>
            <p
              className={`text-sm sm:text-base mb-3 transition-colors duration-500 ${
                isDarkMode ? "text-[#e6f3ff]" : "text-gray-700"
              }`}
            >
              productivity application
            </p>
            <p
              className={`text-sm sm:text-base leading-relaxed transition-colors duration-500 ${
                isDarkMode ? "text-[#b3d9ff]" : "text-gray-600"
              }`}
            >
              a sophisticated productivity application that transforms how users
              manage digital content. features include intelligent text
              categorization and cross-device synchronization.
            </p>
          </div>

          <div className="group">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-3">
              <h3
                className={`text-xl sm:text-2xl font-medium mb-2 transition-colors duration-500 ${
                  isDarkMode ? "text-white" : "text-gray-900"
                }`}
              >
                domaindle
              </h3>
              <div className="flex items-center gap-4">
                <a
                  href="https://domaindle.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-sm sm:text-base px-3 py-1 rounded-full border transition-colors ${
                    isDarkMode
                      ? "text-[#b3d9ff] border-[#66b3ff]/40 hover:border-[#e6f3ff] hover:text-[#e6f3ff]"
                      : "text-blue-700 border-blue-300 hover:border-blue-800 hover:text-blue-900"
                  }`}
                >
                  live ↗
                </a>
                <button
                  className={`text-sm sm:text-base px-3 py-1 rounded-full border opacity-70 cursor-not-allowed ${
                    isDarkMode
                      ? "text-[#b3d9ff] border-white/20"
                      : "text-gray-600 border-gray-300"
                  }`}
                  aria-disabled="true"
                >
                  read more
                </button>
              </div>
            </div>
            <p
              className={`text-sm sm:text-base mb-3 transition-colors duration-500 ${
                isDarkMode ? "text-[#e6f3ff]" : "text-gray-700"
              }`}
            >
              word game hub
            </p>
            <p
              className={`text-sm sm:text-base leading-relaxed transition-colors duration-500 ${
                isDarkMode ? "text-[#b3d9ff]" : "text-gray-600"
              }`}
            >
              this was literally the first thing i ever made. every morning at
              school, our teacher would put up games like wordle and we'd all
              get stuck trying to find similar games to play. i got tired of the
              hunt, so one day i just decided to build a simple hub to make life
              easier for everyone.
            </p>
          </div>
        </div>
      </section>

      {/* Skills Section - temporarily hidden */}
      {false && (
        <section className="max-w-3xl mx-auto px-4 sm:px-6 py-16 sm:py-20 relative z-10">
          ...
        </section>
      )}

      {/* About Section */}
      <section
        className="max-w-3xl mx-auto px-4 sm:px-6 py-16 sm:py-20 relative z-10"
        id="about"
      >
        <h2
          className={`text-lg sm:text-xl font-medium mb-8 sm:mb-12 transition-colors duration-500 ${
            isDarkMode ? "text-white" : "text-gray-900"
          }`}
        >
          about
        </h2>

        <div
          className={`space-y-4 sm:space-y-6 transition-colors duration-500 ${
            isDarkMode ? "text-[#b3d9ff]" : "text-gray-600"
          }`}
        >
          <p className="text-sm sm:text-base leading-relaxed">
            passionate self-taught developer and entrepreneur. i fell in love
            with coding through solving everyday problems and now specialize in
            creating web applications with a focus on ai integration, user
            experience, and scalable architectures.
          </p>
          <p className="text-sm sm:text-base leading-relaxed">
            currently studying a-levels in pure mathematics, further pure
            mathematics, computer science, and physics.
          </p>
          <div className="pt-2">
            <p
              className={`text-sm sm:text-base transition-colors duration-500 ${
                isDarkMode ? "text-[#e6f3ff]" : "text-gray-700"
              }`}
            >
              dubai, uae • grappler • basketball player
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        className="max-w-3xl mx-auto px-4 sm:px-6 py-16 sm:py-20 relative z-10"
        id="contact"
      >
        <h2
          className={`text-lg sm:text-xl font-medium mb-8 sm:mb-12 transition-colors duration-500 ${
            isDarkMode ? "text-white" : "text-gray-900"
          }`}
        >
          contact
        </h2>

        <div
          className={`space-y-4 sm:space-y-6 transition-colors duration-500 ${
            isDarkMode ? "text-[#b3d9ff]" : "text-gray-600"
          }`}
        >
          <p className="text-sm sm:text-base leading-relaxed">
            always excited to work on new projects and collaborate with talented
            people. let's discuss how we can bring your ideas to life.
          </p>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 pt-2">
            <a
              href="mailto:bassamassaf32@gmail.com"
              className={`flex items-center gap-2 text-sm sm:text-base transition-colors ${
                isDarkMode
                  ? "text-[#b3d9ff] hover:text-[#e6f3ff]"
                  : "text-blue-700 hover:text-blue-900"
              }`}
            >
              <Mail size={12} />
              email
            </a>
            <a
              href="https://github.com/bassamassaf8"
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-2 text-sm sm:text-base transition-colors ${
                isDarkMode
                  ? "text-[#b3d9ff] hover:text-[#e6f3ff]"
                  : "text-blue-700 hover:text-blue-900"
              }`}
            >
              <Github size={12} />
              github
            </a>
            <a
              href="https://www.linkedin.com/in/bassamassaf123/"
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-2 text-sm sm:text-base transition-colors ${
                isDarkMode
                  ? "text-[#b3d9ff] hover:text-[#e6f3ff]"
                  : "text-blue-700 hover:text-blue-900"
              }`}
            >
              <Linkedin size={12} />
              linkedin
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#001a33] py-6 sm:py-8 relative z-10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center text-xs sm:text-sm text-[#b3d9ff]">
          <p>&copy; 2025 bassam assaf</p>
        </div>
      </footer>
    </div>
  );
}
