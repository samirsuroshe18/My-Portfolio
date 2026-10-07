import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage.jsx';
import { ProjectDetailPage } from './pages/ProjectDetailPage.jsx';
import { NotFoundPage } from './pages/NotFoundPage.jsx';
import { ProtectedRoute } from './components/admin/ProtectedRoute.jsx';
import { Spinner } from './components/ui/Spinner.jsx';

// Admin pages are split out of the main bundle so public visitors never download them
const LoginPage = lazy(() => import('./pages/admin/LoginPage.jsx').then((m) => ({ default: m.LoginPage })));
const DashboardHomePage = lazy(() => import('./pages/admin/DashboardHomePage.jsx').then((m) => ({ default: m.DashboardHomePage })));
const ProfileEditPage = lazy(() => import('./pages/admin/ProfileEditPage.jsx').then((m) => ({ default: m.ProfileEditPage })));
const SkillCategoriesListPage = lazy(() => import('./pages/admin/SkillCategoriesListPage.jsx').then((m) => ({ default: m.SkillCategoriesListPage })));
const SkillCategoryFormPage = lazy(() => import('./pages/admin/SkillCategoryFormPage.jsx').then((m) => ({ default: m.SkillCategoryFormPage })));
const SkillsListPage = lazy(() => import('./pages/admin/SkillsListPage.jsx').then((m) => ({ default: m.SkillsListPage })));
const SkillFormPage = lazy(() => import('./pages/admin/SkillFormPage.jsx').then((m) => ({ default: m.SkillFormPage })));
const ExperienceListPage = lazy(() => import('./pages/admin/ExperienceListPage.jsx').then((m) => ({ default: m.ExperienceListPage })));
const ExperienceFormPage = lazy(() => import('./pages/admin/ExperienceFormPage.jsx').then((m) => ({ default: m.ExperienceFormPage })));
const EducationListPage = lazy(() => import('./pages/admin/EducationListPage.jsx').then((m) => ({ default: m.EducationListPage })));
const EducationFormPage = lazy(() => import('./pages/admin/EducationFormPage.jsx').then((m) => ({ default: m.EducationFormPage })));
const ProjectsListPage = lazy(() => import('./pages/admin/ProjectsListPage.jsx').then((m) => ({ default: m.ProjectsListPage })));
const ProjectFormPage = lazy(() => import('./pages/admin/ProjectFormPage.jsx').then((m) => ({ default: m.ProjectFormPage })));
const OpenSourceListPage = lazy(() => import('./pages/admin/OpenSourceListPage.jsx').then((m) => ({ default: m.OpenSourceListPage })));
const OpenSourceFormPage = lazy(() => import('./pages/admin/OpenSourceFormPage.jsx').then((m) => ({ default: m.OpenSourceFormPage })));
const HackathonsListPage = lazy(() => import('./pages/admin/HackathonsListPage.jsx').then((m) => ({ default: m.HackathonsListPage })));
const HackathonFormPage = lazy(() => import('./pages/admin/HackathonFormPage.jsx').then((m) => ({ default: m.HackathonFormPage })));
const BlogsListPage = lazy(() => import('./pages/admin/BlogsListPage.jsx').then((m) => ({ default: m.BlogsListPage })));
const BlogFormPage = lazy(() => import('./pages/admin/BlogFormPage.jsx').then((m) => ({ default: m.BlogFormPage })));
const SocialLinksListPage = lazy(() => import('./pages/admin/SocialLinksListPage.jsx').then((m) => ({ default: m.SocialLinksListPage })));
const SocialLinkFormPage = lazy(() => import('./pages/admin/SocialLinkFormPage.jsx').then((m) => ({ default: m.SocialLinkFormPage })));
const SiteSettingsPage = lazy(() => import('./pages/admin/SiteSettingsPage.jsx').then((m) => ({ default: m.SiteSettingsPage })));
const GitHubConfigPage = lazy(() => import('./pages/admin/GitHubConfigPage.jsx').then((m) => ({ default: m.GitHubConfigPage })));
const ContactMessagesPage = lazy(() => import('./pages/admin/ContactMessagesPage.jsx').then((m) => ({ default: m.ContactMessagesPage })));

function App() {
  return (
    <Suspense fallback={<Spinner className="min-h-screen" />}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/projects/:id" element={<ProjectDetailPage />} />

        <Route path="/admin/login" element={<LoginPage />} />
        <Route path="/admin" element={<ProtectedRoute><DashboardHomePage /></ProtectedRoute>} />
        <Route path="/admin/profile" element={<ProtectedRoute><ProfileEditPage /></ProtectedRoute>} />

        <Route path="/admin/skill-categories" element={<ProtectedRoute><SkillCategoriesListPage /></ProtectedRoute>} />
        <Route path="/admin/skill-categories/new" element={<ProtectedRoute><SkillCategoryFormPage /></ProtectedRoute>} />
        <Route path="/admin/skill-categories/:id/edit" element={<ProtectedRoute><SkillCategoryFormPage /></ProtectedRoute>} />

        <Route path="/admin/skills" element={<ProtectedRoute><SkillsListPage /></ProtectedRoute>} />
        <Route path="/admin/skills/new" element={<ProtectedRoute><SkillFormPage /></ProtectedRoute>} />
        <Route path="/admin/skills/:id/edit" element={<ProtectedRoute><SkillFormPage /></ProtectedRoute>} />

        <Route path="/admin/experience" element={<ProtectedRoute><ExperienceListPage /></ProtectedRoute>} />
        <Route path="/admin/experience/new" element={<ProtectedRoute><ExperienceFormPage /></ProtectedRoute>} />
        <Route path="/admin/experience/:id/edit" element={<ProtectedRoute><ExperienceFormPage /></ProtectedRoute>} />

        <Route path="/admin/education" element={<ProtectedRoute><EducationListPage /></ProtectedRoute>} />
        <Route path="/admin/education/new" element={<ProtectedRoute><EducationFormPage /></ProtectedRoute>} />
        <Route path="/admin/education/:id/edit" element={<ProtectedRoute><EducationFormPage /></ProtectedRoute>} />

        <Route path="/admin/projects" element={<ProtectedRoute><ProjectsListPage /></ProtectedRoute>} />
        <Route path="/admin/projects/new" element={<ProtectedRoute><ProjectFormPage /></ProtectedRoute>} />
        <Route path="/admin/projects/:id/edit" element={<ProtectedRoute><ProjectFormPage /></ProtectedRoute>} />

        <Route path="/admin/open-source" element={<ProtectedRoute><OpenSourceListPage /></ProtectedRoute>} />
        <Route path="/admin/open-source/new" element={<ProtectedRoute><OpenSourceFormPage /></ProtectedRoute>} />
        <Route path="/admin/open-source/:id/edit" element={<ProtectedRoute><OpenSourceFormPage /></ProtectedRoute>} />

        <Route path="/admin/hackathons" element={<ProtectedRoute><HackathonsListPage /></ProtectedRoute>} />
        <Route path="/admin/hackathons/new" element={<ProtectedRoute><HackathonFormPage /></ProtectedRoute>} />
        <Route path="/admin/hackathons/:id/edit" element={<ProtectedRoute><HackathonFormPage /></ProtectedRoute>} />

        <Route path="/admin/blogs" element={<ProtectedRoute><BlogsListPage /></ProtectedRoute>} />
        <Route path="/admin/blogs/new" element={<ProtectedRoute><BlogFormPage /></ProtectedRoute>} />
        <Route path="/admin/blogs/:id/edit" element={<ProtectedRoute><BlogFormPage /></ProtectedRoute>} />

        <Route path="/admin/social-links" element={<ProtectedRoute><SocialLinksListPage /></ProtectedRoute>} />
        <Route path="/admin/social-links/new" element={<ProtectedRoute><SocialLinkFormPage /></ProtectedRoute>} />
        <Route path="/admin/social-links/:id/edit" element={<ProtectedRoute><SocialLinkFormPage /></ProtectedRoute>} />

        <Route path="/admin/site-settings" element={<ProtectedRoute><SiteSettingsPage /></ProtectedRoute>} />
        <Route path="/admin/github" element={<ProtectedRoute><GitHubConfigPage /></ProtectedRoute>} />
        <Route path="/admin/messages" element={<ProtectedRoute><ContactMessagesPage /></ProtectedRoute>} />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
}

export default App;
