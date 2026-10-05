import { useEffect } from 'react';
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
import { usePortfolioData } from '../hooks/usePortfolioData.js';

export function HomePage() {
  const { data: settings } = usePortfolioData('siteSettings');

  useEffect(() => {
    if (settings?.metaTitle) {
      document.title = settings.metaTitle;
    }
    if (settings?.metaDescription) {
      const metaDescriptionTag = document.querySelector('meta[name="description"]');
      metaDescriptionTag?.setAttribute('content', settings.metaDescription);
    }
  }, [settings]);

  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <ExperienceSection />
        <ProjectsSection />
        <OpenSourceSection />
        <HackathonsSection />
        <SkillsSection />
        <EducationSection />
        <BlogsSection />
        <GitHubActivitySection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
