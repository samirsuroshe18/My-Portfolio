import { useEffect } from 'react';
import { Navbar } from '../components/layout/Navbar.jsx';
import { Footer } from '../components/layout/Footer.jsx';
import { HeroSection } from '../components/sections/HeroSection.jsx';
import { ProjectsSection } from '../components/sections/ProjectsSection.jsx';
import { ExperienceSection } from '../components/sections/ExperienceSection.jsx';
import { OpenSourceSection } from '../components/sections/OpenSourceSection.jsx';
import { SkillsSection } from '../components/sections/SkillsSection.jsx';
import { EducationSection } from '../components/sections/EducationSection.jsx';
import { BlogsSection } from '../components/sections/BlogsSection.jsx';
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
      <main className="mx-auto flex max-w-[1120px] flex-col gap-24 px-[clamp(16px,5vw,48px)] pb-32 pt-10 sm:pt-[72px] lg:gap-32">
        <HeroSection />
        <ProjectsSection />
        <ExperienceSection />
        <OpenSourceSection />
        <SkillsSection />
        <EducationSection />
        <BlogsSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
