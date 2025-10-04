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
      {/* Neon Circuit Board Background */}
      <div className="fixed inset-0 overflow-hidden">
        <div className={`absolute inset-0 transition-colors duration-500 ${
          isDarkMode 
            ? 'bg-gradient-to-br from-[#000811] via-[#000408] to-[#000000]' 
            : 'bg-gradient-to-br from-[#f8fafc] via-[#f1f5f9] to-[#e2e8f0]'
        }`} />
        
        {/* Animated Neon Lines */}
        <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="neonGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={isDarkMode ? "#00ffff" : "#3b82f6"} />
              <stop offset="50%" stopColor={isDarkMode ? "#66b3ff" : "#1d4ed8"} />
              <stop offset="100%" stopColor={isDarkMode ? "#8b5cf6" : "#7c3aed"} />
            </linearGradient>
          </defs>
          
          {/* Circuit Lines */}
          <g stroke="url(#neonGradient)" strokeWidth="1" fill="none">
            {/* Horizontal Lines */}
            <line x1="0" y1="20%" x2="100%" y2="20%" className="animate-pulse" style={{animationDelay: '0s', animationDuration: '3s'}} />
            <line x1="0" y1="40%" x2="100%" y2="40%" className="animate-pulse" style={{animationDelay: '1s', animationDuration: '4s'}} />
            <line x1="0" y1="60%" x2="100%" y2="60%" className="animate-pulse" style={{animationDelay: '2s', animationDuration: '3.5s'}} />
            <line x1="0" y1="80%" x2="100%" y2="80%" className="animate-pulse" style={{animationDelay: '0.5s', animationDuration: '4.5s'}} />
            
            {/* Vertical Lines */}
            <line x1="20%" y1="0" x2="20%" y2="100%" className="animate-pulse" style={{animationDelay: '1.5s', animationDuration: '3.2s'}} />
            <line x1="40%" y1="0" x2="40%" y2="100%" className="animate-pulse" style={{animationDelay: '0.8s', animationDuration: '4.2s'}} />
            <line x1="60%" y1="0" x2="60%" y2="100%" className="animate-pulse" style={{animationDelay: '2.2s', animationDuration: '3.8s'}} />
            <line x1="80%" y1="0" x2="80%" y2="100%" className="animate-pulse" style={{animationDelay: '1.2s', animationDuration: '4.8s'}} />
            
            {/* Diagonal Circuit Patterns */}
            <path d="M0,0 L25%,25% L50%,0 L75%,25% L100%,0" className="animate-pulse" style={{animationDelay: '0.3s', animationDuration: '5s'}} />
            <path d="M0,100% L25%,75% L50%,100% L75%,75% L100%,100%" className="animate-pulse" style={{animationDelay: '1.8s', animationDuration: '4.7s'}} />
            <path d="M0,50% L30%,20% L60%,50% L90%,20% L100%,50%" className="animate-pulse" style={{animationDelay: '2.5s', animationDuration: '3.9s'}} />
          </g>
          
          {/* Circuit Nodes */}
          <g fill="url(#neonGradient)">
            <circle cx="20%" cy="20%" r="2" className="animate-pulse" style={{animationDelay: '0s', animationDuration: '2s'}} />
            <circle cx="40%" cy="40%" r="2" className="animate-pulse" style={{animationDelay: '1s', animationDuration: '2.5s'}} />
            <circle cx="60%" cy="60%" r="2" className="animate-pulse" style={{animationDelay: '2s', animationDuration: '2.2s'}} />
            <circle cx="80%" cy="80%" r="2" className="animate-pulse" style={{animationDelay: '0.5s', animationDuration: '2.8s'}} />
            <circle cx="30%" cy="70%" r="2" className="animate-pulse" style={{animationDelay: '1.5s', animationDuration: '2.3s'}} />
            <circle cx="70%" cy="30%" r="2" className="animate-pulse" style={{animationDelay: '2.5s', animationDuration: '2.7s'}} />
          </g>
        </svg>
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
              <h3 className={`text-xl sm:text-2xl font-medium mb-2 transition-colors duration-500 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                examvault
              </h3>
              <a
                href="https://examvault.app"
                target="_blank"
                rel="noopener noreferrer"
                className={`text-sm sm:text-base transition-colors self-start sm:self-auto ${
                  isDarkMode 
                    ? 'text-[#b3d9ff] hover:text-[#e6f3ff]' 
                    : 'text-blue-600 hover:text-blue-800'
                }`}
              >
                live
              </a>
            </div>
            <p className={`text-sm sm:text-base mb-3 transition-colors duration-500 ${
              isDarkMode ? 'text-[#e6f3ff]' : 'text-gray-700'
            }`}>
              co-founder, CGO & developer
            </p>
            <p className={`text-sm sm:text-base leading-relaxed transition-colors duration-500 ${
              isDarkMode ? 'text-[#b3d9ff]' : 'text-gray-600'
            }`}>
              ai-powered revision assistant for ib students. learn where you're
              weak, get tailored questions, practice smart.
            </p>
          </div>

          <div className="group">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-3">
              <h3 className={`text-xl sm:text-2xl font-medium mb-2 transition-colors duration-500 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                dxb hoops
              </h3>
              <a
                href="https://dxbhoops.com"
                target="_blank"
                rel="noopener noreferrer"
                className={`text-sm sm:text-base transition-colors self-start sm:self-auto ${
                  isDarkMode 
                    ? 'text-[#b3d9ff] hover:text-[#e6f3ff]' 
                    : 'text-blue-600 hover:text-blue-800'
                }`}
              >
                live
              </a>
            </div>
            <p className={`text-sm sm:text-base mb-3 transition-colors duration-500 ${
              isDarkMode ? 'text-[#e6f3ff]' : 'text-gray-700'
            }`}>
              founder & developer
            </p>
            <p className={`text-sm sm:text-base leading-relaxed transition-colors duration-500 ${
              isDarkMode ? 'text-[#b3d9ff]' : 'text-gray-600'
            }`}>
              basketball community platform connecting athletes in dubai.
              features player profiles, game scheduling, and community events.
            </p>
          </div>

          <div className="group">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-3">
              <h3 className={`text-xl sm:text-2xl font-medium mb-2 transition-colors duration-500 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                paradigm
              </h3>
              <span className={`text-sm sm:text-base self-start sm:self-auto transition-colors duration-500 ${
                isDarkMode ? 'text-[#b3d9ff]' : 'text-blue-600'
              }`}>
                in development
              </span>
              </div>
            <p className={`text-sm sm:text-base mb-3 transition-colors duration-500 ${
              isDarkMode ? 'text-[#e6f3ff]' : 'text-gray-700'
            }`}>
              ai video analysis platform
            </p>
            <p className={`text-sm sm:text-base leading-relaxed transition-colors duration-500 ${
              isDarkMode ? 'text-[#b3d9ff]' : 'text-gray-600'
            }`}>
              ai-powered video analysis tool for content creators and
              businesses. extract insights, generate summaries, and analyze
              engagement patterns from video content.
            </p>
              </div>

          <div className="group">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-3">
              <h3 className={`text-xl sm:text-2xl font-medium mb-2 transition-colors duration-500 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                time to copy
              </h3>
              <a
                href="https://timetocopy.com"
                target="_blank"
                rel="noopener noreferrer"
                className={`text-sm sm:text-base transition-colors self-start sm:self-auto ${
                  isDarkMode 
                    ? 'text-[#b3d9ff] hover:text-[#e6f3ff]' 
                    : 'text-blue-600 hover:text-blue-800'
                }`}
              >
                live
              </a>
              </div>
            <p className={`text-sm sm:text-base mb-3 transition-colors duration-500 ${
              isDarkMode ? 'text-[#e6f3ff]' : 'text-gray-700'
            }`}>
              productivity application
            </p>
            <p className={`text-sm sm:text-base leading-relaxed transition-colors duration-500 ${
              isDarkMode ? 'text-[#b3d9ff]' : 'text-gray-600'
            }`}>
              a sophisticated productivity application that transforms how users
              manage digital content. features include intelligent text
              categorization and cross-device synchronization.
            </p>
          </div>

          <div className="group">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-3">
              <h3 className={`text-xl sm:text-2xl font-medium mb-2 transition-colors duration-500 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                domaindle
              </h3>
              <a
                href="https://domaindle.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className={`text-sm sm:text-base transition-colors self-start sm:self-auto ${
                  isDarkMode 
                    ? 'text-[#b3d9ff] hover:text-[#e6f3ff]' 
                    : 'text-blue-600 hover:text-blue-800'
                }`}
              >
                live
              </a>
            </div>
            <p className={`text-sm sm:text-base mb-3 transition-colors duration-500 ${
              isDarkMode ? 'text-[#e6f3ff]' : 'text-gray-700'
            }`}>
              word game hub
            </p>
            <p className={`text-sm sm:text-base leading-relaxed transition-colors duration-500 ${
              isDarkMode ? 'text-[#b3d9ff]' : 'text-gray-600'
            }`}>
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
        <h2 className={`text-lg sm:text-xl font-medium mb-8 sm:mb-12 transition-colors duration-500 ${
          isDarkMode ? 'text-white' : 'text-gray-900'
        }`}>
          skills & tech stack
        </h2>

        <div className="space-y-8 sm:space-y-10">
          {/* Languages */}
          <div>
            <h3 className={`text-sm sm:text-base font-medium mb-6 tracking-wider uppercase transition-colors duration-500 ${
              isDarkMode ? 'text-[#b3d9ff]' : 'text-blue-600'
            }`}>
              languages
            </h3>
            <div className="flex flex-wrap gap-4">
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
          <div>
            <h3 className={`text-sm sm:text-base font-medium mb-6 tracking-wider uppercase transition-colors duration-500 ${
              isDarkMode ? 'text-[#b3d9ff]' : 'text-blue-600'
            }`}>
              frameworks
            </h3>
            <div className="flex flex-wrap gap-4">
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
          <div>
            <h3 className={`text-sm sm:text-base font-medium mb-6 tracking-wider uppercase transition-colors duration-500 ${
              isDarkMode ? 'text-[#b3d9ff]' : 'text-blue-600'
            }`}>
              tools
            </h3>
            <div className="flex flex-wrap gap-4">
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
