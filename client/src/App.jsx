import { Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage.jsx';
import { ProjectDetailPage } from './pages/ProjectDetailPage.jsx';
import { NotFoundPage } from './pages/NotFoundPage.jsx';
import { ProtectedRoute } from './components/admin/ProtectedRoute.jsx';

import { LoginPage } from './pages/admin/LoginPage.jsx';
import { DashboardHomePage } from './pages/admin/DashboardHomePage.jsx';
import { ProfileEditPage } from './pages/admin/ProfileEditPage.jsx';
import { SkillCategoriesListPage } from './pages/admin/SkillCategoriesListPage.jsx';
import { SkillCategoryFormPage } from './pages/admin/SkillCategoryFormPage.jsx';
import { SkillsListPage } from './pages/admin/SkillsListPage.jsx';
import { SkillFormPage } from './pages/admin/SkillFormPage.jsx';
import { ExperienceListPage } from './pages/admin/ExperienceListPage.jsx';
import { ExperienceFormPage } from './pages/admin/ExperienceFormPage.jsx';
import { EducationListPage } from './pages/admin/EducationListPage.jsx';
import { EducationFormPage } from './pages/admin/EducationFormPage.jsx';
import { ProjectsListPage } from './pages/admin/ProjectsListPage.jsx';
import { ProjectFormPage } from './pages/admin/ProjectFormPage.jsx';
import { OpenSourceListPage } from './pages/admin/OpenSourceListPage.jsx';
import { OpenSourceFormPage } from './pages/admin/OpenSourceFormPage.jsx';
import { HackathonsListPage } from './pages/admin/HackathonsListPage.jsx';
import { HackathonFormPage } from './pages/admin/HackathonFormPage.jsx';
import { BlogsListPage } from './pages/admin/BlogsListPage.jsx';
import { BlogFormPage } from './pages/admin/BlogFormPage.jsx';
import { SocialLinksListPage } from './pages/admin/SocialLinksListPage.jsx';
import { SocialLinkFormPage } from './pages/admin/SocialLinkFormPage.jsx';
import { SiteSettingsPage } from './pages/admin/SiteSettingsPage.jsx';
import { GitHubConfigPage } from './pages/admin/GitHubConfigPage.jsx';
import { ContactMessagesPage } from './pages/admin/ContactMessagesPage.jsx';

function App() {
  return (
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
  );
}

export default App;
