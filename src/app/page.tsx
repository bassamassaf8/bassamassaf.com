import { Github, Mail, ExternalLink, Linkedin } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#000811] via-[#000408] to-[#000000] text-white relative overflow-hidden">
      {/* Geometric blueprint background */}
      <div className="fixed inset-0 opacity-25">
        <div className="absolute inset-0 bg-gradient-to-br from-[#001a33] via-transparent to-[#000d1a]" />
        <div className="absolute inset-0 bg-gradient-to-tl from-[#002244] via-transparent to-[#001122]" />

        {/* Geometric grid pattern - more visible */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(102, 179, 255, 0.2) 1px, transparent 1px),
              linear-gradient(90deg, rgba(102, 179, 255, 0.2) 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
          }}
        />

        {/* Blueprint-style lines - more visible */}
        <div className="absolute top-32 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#66b3ff] to-transparent opacity-40" />
        <div className="absolute bottom-40 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#66b3ff] to-transparent opacity-35" />
        <div className="absolute top-0 left-32 w-px h-full bg-gradient-to-b from-transparent via-[#66b3ff] to-transparent opacity-40" />
        <div className="absolute top-0 right-40 w-px h-full bg-gradient-to-b from-transparent via-[#66b3ff] to-transparent opacity-35" />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 p-4 sm:p-6 z-20 bg-gradient-to-b from-[#000811]/80 to-transparent backdrop-blur-sm">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <div className="text-sm sm:text-base font-medium text-[#e6f3ff]">
            bassam assaf
          </div>
          <div className="flex gap-4 sm:gap-6 text-xs sm:text-sm text-[#b3d9ff]">
            <a
              href="#projects"
              className="hover:text-[#e6f3ff] transition-colors"
            >
              projects
            </a>
            <a href="#about" className="hover:text-[#e6f3ff] transition-colors">
              about
            </a>
            <a
              href="#contact"
              className="hover:text-[#e6f3ff] transition-colors"
            >
              contact
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 pt-20 relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-light mb-8 tracking-wide text-[#ffffff]">
            bassam assaf
          </h1>
          <p className="text-lg sm:text-xl text-[#e6f3ff] mb-10 max-w-md mx-auto leading-relaxed">
            developer • entrepreneur • student
          </p>
          <div className="flex items-center justify-center gap-6 sm:gap-8 text-sm sm:text-base text-[#b3d9ff]">
            <a
              href="https://github.com/bassamassaf8"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-[#e6f3ff] transition-colors"
            >
              <Github size={12} />
              github
            </a>
            <a
              href="mailto:bassamassaf32@gmail.com"
              className="flex items-center gap-2 hover:text-[#e6f3ff] transition-colors"
            >
              <Mail size={12} />
              email
            </a>
            <a
              href="https://www.linkedin.com/in/bassamassaf123/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-[#e6f3ff] transition-colors"
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
        <h2 className="text-lg sm:text-xl font-medium mb-8 sm:mb-12 text-[#ffffff]">
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
                domaindle
              </h3>
              <a
                href="https://domaindle.com"
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
        </div>
      </section>

      {/* Skills Section */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-16 sm:py-20 relative z-10">
        <h2 className="text-lg sm:text-xl font-medium mb-12 sm:mb-16 text-[#ffffff] text-center">
          skills & tech stack
        </h2>

        <div className="space-y-12">
          {/* Languages */}
          <div className="text-center">
            <h3 className="text-sm sm:text-base font-medium text-[#b3d9ff] mb-6 tracking-wider uppercase">
              languages
            </h3>
            <div className="flex flex-wrap justify-center gap-4">
              {["TypeScript", "JavaScript", "Python", "HTML", "CSS", "SQL"].map(
                (skill) => (
                  <span
                    key={skill}
                    className="px-4 py-2 bg-transparent text-[#e6f3ff] rounded-full text-sm font-medium border border-[#66b3ff]/40 hover:border-[#66b3ff] hover:bg-[#66b3ff]/10 transition-all duration-300"
                  >
                    {skill}
                  </span>
                )
              )}
            </div>
          </div>

          {/* Frameworks */}
          <div className="text-center">
            <h3 className="text-sm sm:text-base font-medium text-[#b3d9ff] mb-6 tracking-wider uppercase">
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
            <h3 className="text-sm sm:text-base font-medium text-[#b3d9ff] mb-6 tracking-wider uppercase">
              tools
            </h3>
            <div className="flex flex-wrap justify-center gap-4">
              {["Supabase", "Vercel", "OpenAI", "Git", "Docker", "Redis"].map(
                (skill) => (
                  <span
                    key={skill}
                    className="px-4 py-2 bg-transparent text-[#e6f3ff] rounded-full text-sm font-medium border border-[#66b3ff]/40 hover:border-[#66b3ff] hover:bg-[#66b3ff]/10 transition-all duration-300"
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
        <h2 className="text-lg sm:text-xl font-medium mb-8 sm:mb-12 text-[#ffffff]">
          about
        </h2>

        <div className="space-y-4 sm:space-y-6 text-[#b3d9ff]">
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
            <p className="text-sm sm:text-base text-[#e6f3ff]">
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
        <h2 className="text-lg sm:text-xl font-medium mb-8 sm:mb-12 text-[#ffffff]">
          contact
        </h2>

        <div className="space-y-4 sm:space-y-6 text-[#b3d9ff]">
          <p className="text-sm sm:text-base leading-relaxed">
            always excited to work on new projects and collaborate with talented
            people. let's discuss how we can bring your ideas to life.
          </p>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 pt-2">
            <a
              href="mailto:bassamassaf32@gmail.com"
              className="flex items-center gap-2 text-sm sm:text-base text-[#b3d9ff] hover:text-[#e6f3ff] transition-colors"
            >
              <Mail size={12} />
              email
            </a>
            <a
              href="https://github.com/bassamassaf8"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm sm:text-base text-[#b3d9ff] hover:text-[#e6f3ff] transition-colors"
            >
              <Github size={12} />
              github
            </a>
            <a
              href="https://www.linkedin.com/in/bassamassaf123/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm sm:text-base text-[#b3d9ff] hover:text-[#e6f3ff] transition-colors"
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
