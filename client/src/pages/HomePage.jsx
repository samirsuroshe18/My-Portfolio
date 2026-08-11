import { Navbar } from '../components/layout/Navbar.jsx';
import { Footer } from '../components/layout/Footer.jsx';
import { HeroSection } from '../components/sections/HeroSection.jsx';
import { AboutSection } from '../components/sections/AboutSection.jsx';
import { SkillsSection } from '../components/sections/SkillsSection.jsx';
import { ExperienceSection } from '../components/sections/ExperienceSection.jsx';
import { ProjectsSection } from '../components/sections/ProjectsSection.jsx';
import { OpenSourceSection } from '../components/sections/OpenSourceSection.jsx';
import { HackathonsSection } from '../components/sections/HackathonsSection.jsx';
import { EducationSection } from '../components/sections/EducationSection.jsx';
import { BlogsSection } from '../components/sections/BlogsSection.jsx';
import { GitHubActivitySection } from '../components/sections/GitHubActivitySection.jsx';
import { ContactSection } from '../components/sections/ContactSection.jsx';

export function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ExperienceSection />
        <ProjectsSection />
        <OpenSourceSection />
        <HackathonsSection />
        <EducationSection />
        <BlogsSection />
        <GitHubActivitySection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
