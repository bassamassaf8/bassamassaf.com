"use client";

import { Github, Mail, ExternalLink, Linkedin, Sun, Moon, Download } from "lucide-react";
import { useState } from "react";

export default function Home() {
  const [isDarkMode, setIsDarkMode] = useState(true);

  return (
    <div className={`min-h-screen relative overflow-hidden transition-colors duration-500 ${
      isDarkMode 
        ? 'bg-gradient-to-b from-[#000811] via-[#000408] to-[#000000] text-white' 
        : 'bg-gradient-to-b from-[#f8fafc] via-[#f1f5f9] to-[#e2e8f0] text-gray-900'
    }`}>
      {/* Subtle animated background */}
      <div className="fixed inset-0 opacity-10">
        <div className={`absolute inset-0 transition-colors duration-500 ${
          isDarkMode 
            ? 'bg-gradient-to-br from-[#001a33] via-transparent to-[#000d1a]' 
            : 'bg-gradient-to-br from-[#e0f2fe] via-transparent to-[#f0f9ff]'
        }`} />
        

        {/* Fun floating shapes background */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(12)].map((_, i) => (
            <div
            key={i}
              className={`absolute opacity-10 animate-bounce ${
                isDarkMode ? 'text-[#66b3ff]' : 'text-[#3b82f6]'
              }`}
            style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 4}s`,
                animationDuration: `${3 + Math.random() * 2}s`,
                fontSize: `${20 + Math.random() * 30}px`,
              }}
            >
              {['●', '▲', '◆', '★', '◐', '◑'][Math.floor(Math.random() * 6)]}
            </div>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 p-4 sm:p-6 z-20 backdrop-blur-sm transition-colors duration-500 ${
        isDarkMode 
          ? 'bg-gradient-to-b from-[#000811]/80 to-transparent' 
          : 'bg-gradient-to-b from-white/80 to-transparent'
      }`}>
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <div className={`text-sm sm:text-base font-medium transition-colors duration-500 ${
            isDarkMode ? 'text-[#e6f3ff]' : 'text-gray-900'
          }`}>
            bassam assaf
          </div>
          <div className="flex items-center gap-4 sm:gap-6">
            <div className={`flex gap-4 sm:gap-6 text-xs sm:text-sm transition-colors duration-500 ${
              isDarkMode ? 'text-[#b3d9ff]' : 'text-gray-600'
            }`}>
              <a
                href="#projects"
                className={`hover:opacity-80 transition-all duration-300 ${
                  isDarkMode ? 'hover:text-[#e6f3ff]' : 'hover:text-gray-900'
                }`}
              >
                projects
              </a>
              <a 
                href="#about" 
                className={`hover:opacity-80 transition-all duration-300 ${
                  isDarkMode ? 'hover:text-[#e6f3ff]' : 'hover:text-gray-900'
                }`}
              >
                about
        </a>
        <a
                href="#cv"
                className={`hover:opacity-80 transition-all duration-300 ${
                  isDarkMode ? 'hover:text-[#e6f3ff]' : 'hover:text-gray-900'
                }`}
              >
                cv
        </a>
        <a
                href="#contact"
                className={`hover:opacity-80 transition-all duration-300 ${
                  isDarkMode ? 'hover:text-[#e6f3ff]' : 'hover:text-gray-900'
                }`}
              >
                contact
              </a>
            </div>
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`p-2 rounded-lg transition-all duration-300 hover:scale-110 ${
                isDarkMode 
                  ? 'bg-white/10 hover:bg-white/20 text-white' 
                  : 'bg-gray-200 hover:bg-gray-300 text-gray-900'
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
          <h1 className={`text-5xl sm:text-6xl md:text-7xl font-light mb-10 tracking-wide transition-colors duration-500 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            bassam assaf
          </h1>
          <p className={`text-xl sm:text-2xl mb-12 max-w-lg mx-auto leading-relaxed transition-colors duration-500 ${
            isDarkMode ? 'text-[#e6f3ff]' : 'text-gray-700'
          }`}>
            developer • entrepreneur • student
          </p>
          <div className={`flex items-center justify-center gap-6 sm:gap-8 text-sm sm:text-base transition-colors duration-500 ${
            isDarkMode ? 'text-[#b3d9ff]' : 'text-gray-600'
          }`}>
            <a
              href="https://github.com/bassamassaf8"
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-2 transition-all duration-300 hover:scale-105 ${
                isDarkMode ? 'hover:text-[#e6f3ff]' : 'hover:text-gray-900'
              }`}
            >
              <Github size={12} />
              github
            </a>
            <a
              href="mailto:bassamassaf32@gmail.com"
              className={`flex items-center gap-2 transition-all duration-300 hover:scale-105 ${
                isDarkMode ? 'hover:text-[#e6f3ff]' : 'hover:text-gray-900'
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
                isDarkMode ? 'hover:text-[#e6f3ff]' : 'hover:text-gray-900'
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
        <h2 className={`text-lg sm:text-xl font-medium mb-8 sm:mb-12 transition-colors duration-500 ${
          isDarkMode ? 'text-white' : 'text-gray-900'
        }`}>
          projects
        </h2>

        <div className="space-y-8 sm:space-y-10">
          <div className="group">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-3">
              <h3 className="text-xl sm:text-2xl font-medium text-[#ffffff] mb-2">
                examvault
              </h3>
              <a
                href="https://examvault.app"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm sm:text-base text-[#b3d9ff] hover:text-[#e6f3ff] transition-colors self-start sm:self-auto"
              >
                live
              </a>
            </div>
            <p className="text-sm sm:text-base text-[#e6f3ff] mb-3">
              co-founder, CGO & developer
            </p>
            <p className="text-sm sm:text-base text-[#b3d9ff] leading-relaxed">
              ai-powered revision assistant for ib students. learn where you're
              weak, get tailored questions, practice smart.
            </p>
          </div>

          <div className="group">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-3">
              <h3 className="text-xl sm:text-2xl font-medium text-[#ffffff] mb-2">
                dxb hoops
              </h3>
              <a
                href="https://dxbhoops.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm sm:text-base text-[#b3d9ff] hover:text-[#e6f3ff] transition-colors self-start sm:self-auto"
              >
                live
              </a>
            </div>
            <p className="text-sm sm:text-base text-[#e6f3ff] mb-3">
              founder & developer
            </p>
            <p className="text-sm sm:text-base text-[#b3d9ff] leading-relaxed">
              basketball community platform connecting athletes in dubai.
              features player profiles, game scheduling, and community events.
            </p>
          </div>

          <div className="group">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-3">
              <h3 className="text-xl sm:text-2xl font-medium text-[#ffffff] mb-2">
                paradigm
              </h3>
              <span className="text-sm sm:text-base text-[#b3d9ff] self-start sm:self-auto">
                in development
              </span>
              </div>
            <p className="text-sm sm:text-base text-[#e6f3ff] mb-3">
              ai video analysis platform
            </p>
            <p className="text-sm sm:text-base text-[#b3d9ff] leading-relaxed">
              ai-powered video analysis tool for content creators and
              businesses. extract insights, generate summaries, and analyze
              engagement patterns from video content.
            </p>
              </div>

          <div className="group">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-3">
              <h3 className="text-xl sm:text-2xl font-medium text-[#ffffff] mb-2">
                time to copy
              </h3>
              <a
                href="https://timetocopy.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm sm:text-base text-[#b3d9ff] hover:text-[#e6f3ff] transition-colors self-start sm:self-auto"
              >
                live
              </a>
              </div>
            <p className="text-sm sm:text-base text-[#e6f3ff] mb-3">
              productivity application
            </p>
            <p className="text-sm sm:text-base text-[#b3d9ff] leading-relaxed">
              a sophisticated productivity application that transforms how users
              manage digital content. features include intelligent text
              categorization and cross-device synchronization.
            </p>
          </div>

          <div className="group">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-3">
              <h3 className="text-xl sm:text-2xl font-medium text-[#ffffff] mb-2">
                domaindle
              </h3>
              <a
                href="https://domaindle.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm sm:text-base text-[#b3d9ff] hover:text-[#e6f3ff] transition-colors self-start sm:self-auto"
              >
                live
              </a>
            </div>
            <p className="text-sm sm:text-base text-[#e6f3ff] mb-3">
              word game hub
            </p>
            <p className="text-sm sm:text-base text-[#b3d9ff] leading-relaxed">
              this was literally the first thing i ever made. every morning at
              school, our teacher would put up games like wordle and we'd all
              get stuck trying to find similar games to play. i got tired of the
              hunt, so one day i just decided to build a simple hub to make life
              easier for everyone.
            </p>
          </div>
        </div>
      </section>


      {/* Skills Section */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-16 sm:py-20 relative z-10">
        <h2 className={`text-lg sm:text-xl font-medium mb-12 sm:mb-16 text-center transition-colors duration-500 ${
          isDarkMode ? 'text-white' : 'text-gray-900'
        }`}>
          skills & tech stack
        </h2>

        <div className="space-y-12">
          {/* Languages */}
          <div className="text-center">
            <h3 className={`text-sm sm:text-base font-medium mb-6 tracking-wider uppercase transition-colors duration-500 ${
              isDarkMode ? 'text-[#b3d9ff]' : 'text-blue-600'
            }`}>
              languages
            </h3>
            <div className="flex flex-wrap justify-center gap-4">
              {["TypeScript", "JavaScript", "Python", "HTML", "CSS", "SQL"].map(
                (skill) => (
                  <span
                    key={skill}
                    className={`px-4 py-2 bg-transparent rounded-full text-sm font-medium border transition-all duration-300 ${
                      isDarkMode 
                        ? 'text-[#e6f3ff] border-[#66b3ff]/40 hover:border-[#66b3ff] hover:bg-[#66b3ff]/10' 
                        : 'text-gray-700 border-blue-300 hover:border-blue-500 hover:bg-blue-50'
                    }`}
                  >
                    {skill}
                  </span>
                )
              )}
            </div>
            </div>

          {/* Frameworks */}
          <div className="text-center">
            <h3 className={`text-sm sm:text-base font-medium mb-6 tracking-wider uppercase transition-colors duration-500 ${
              isDarkMode ? 'text-[#b3d9ff]' : 'text-blue-600'
            }`}>
              frameworks
            </h3>
            <div className="flex flex-wrap justify-center gap-4">
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
                  className="px-4 py-2 bg-transparent text-[#e6f3ff] rounded-full text-sm font-medium border border-[#66b3ff]/40 hover:border-[#66b3ff] hover:bg-[#66b3ff]/10 transition-all duration-300"
                >
                  {skill}
                </span>
              ))}
            </div>
            </div>

          {/* Tools */}
          <div className="text-center">
            <h3 className={`text-sm sm:text-base font-medium mb-6 tracking-wider uppercase transition-colors duration-500 ${
              isDarkMode ? 'text-[#b3d9ff]' : 'text-blue-600'
            }`}>
              tools
            </h3>
            <div className="flex flex-wrap justify-center gap-4">
              {["Supabase", "Vercel", "OpenAI", "Git", "Docker", "Redis"].map(
                (skill) => (
                  <span
                    key={skill}
                    className={`px-4 py-2 bg-transparent rounded-full text-sm font-medium border transition-all duration-300 ${
                      isDarkMode 
                        ? 'text-[#e6f3ff] border-[#66b3ff]/40 hover:border-[#66b3ff] hover:bg-[#66b3ff]/10' 
                        : 'text-gray-700 border-blue-300 hover:border-blue-500 hover:bg-blue-50'
                    }`}
                  >
                    {skill}
                  </span>
                )
              )}
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section
        className="max-w-3xl mx-auto px-4 sm:px-6 py-16 sm:py-20 relative z-10"
        id="about"
      >
        <h2 className={`text-lg sm:text-xl font-medium mb-8 sm:mb-12 transition-colors duration-500 ${
          isDarkMode ? 'text-white' : 'text-gray-900'
        }`}>
          about
        </h2>

        <div className={`space-y-4 sm:space-y-6 transition-colors duration-500 ${
          isDarkMode ? 'text-[#b3d9ff]' : 'text-gray-600'
        }`}>
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
            <p className={`text-sm sm:text-base transition-colors duration-500 ${
              isDarkMode ? 'text-[#e6f3ff]' : 'text-gray-700'
            }`}>
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
        <h2 className={`text-lg sm:text-xl font-medium mb-8 sm:mb-12 transition-colors duration-500 ${
          isDarkMode ? 'text-white' : 'text-gray-900'
        }`}>
          contact
        </h2>

        <div className={`space-y-4 sm:space-y-6 transition-colors duration-500 ${
          isDarkMode ? 'text-[#b3d9ff]' : 'text-gray-600'
        }`}>
          <p className="text-sm sm:text-base leading-relaxed">
            always excited to work on new projects and collaborate with talented
            people. let's discuss how we can bring your ideas to life.
          </p>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 pt-2">
            <a
              href="mailto:bassamassaf32@gmail.com"
              className={`flex items-center gap-2 text-sm sm:text-base transition-colors ${
                isDarkMode 
                  ? 'text-[#b3d9ff] hover:text-[#e6f3ff]' 
                  : 'text-blue-600 hover:text-blue-800'
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
                  ? 'text-[#b3d9ff] hover:text-[#e6f3ff]' 
                  : 'text-blue-600 hover:text-blue-800'
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
                  ? 'text-[#b3d9ff] hover:text-[#e6f3ff]' 
                  : 'text-blue-600 hover:text-blue-800'
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
