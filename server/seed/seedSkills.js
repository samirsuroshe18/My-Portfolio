import { SkillCategory } from '../models/SkillCategory.js';
import { Skill } from '../models/Skill.js';

const DATA = [
  {
    title: 'Programming Languages',
    skills: [
      { name: 'JavaScript', icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/JavaScript-logo.png/800px-JavaScript-logo.png' },
      { name: 'Java', icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/java/java-original.svg' },
      { name: 'Kotlin', icon: 'https://res.cloudinary.com/daaciwspp/image/upload/v1786466686/my-portfolio/kotlin_lzvwkx.png' },
      { name: 'Dart', icon: 'https://res.cloudinary.com/daaciwspp/image/upload/v1786466675/my-portfolio/dart_x8pdmw.png' },
      { name: 'Python', icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original.svg' },
      { name: 'PHP', icon: 'https://res.cloudinary.com/daaciwspp/image/upload/v1786466699/my-portfolio/php_o6c5ws.png' },
    ],
  },
  {
    title: 'Frontend Development',
    skills: [
      { name: 'React.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
      { name: 'Redux', icon: 'https://d33wubrfki0l68.cloudfront.net/0834d0215db51e91525a25acf97433051f280f2f/c30f5/img/redux.svg' },
      { name: 'HTML', icon: 'https://www.w3.org/html/logo/badge/html5-badge-h-solo.png' },
      { name: 'CSS', icon: 'https://res.cloudinary.com/daaciwspp/image/upload/v1786469810/my-portfolio/css-logo_qfwfcj.png' },
      { name: 'Tailwind', icon: 'https://res.cloudinary.com/daaciwspp/image/upload/v1786466712/my-portfolio/tailwind_w0wrr9.png' },
      { name: 'Bootstrap', icon: 'https://getbootstrap.com/docs/5.3/assets/brand/bootstrap-logo-shadow.png' },
    ],
  },
  {
    title: 'Backend & Database',
    skills: [
      { name: 'Node.js', icon: 'https://res.cloudinary.com/daaciwspp/image/upload/v1786466697/my-portfolio/nodejs_z25nwz.png' },
      { name: 'Express.js', icon: 'https://res.cloudinary.com/daaciwspp/image/upload/v1786466675/my-portfolio/express_lswykx.png' },
      { name: 'MySQL', icon: 'https://res.cloudinary.com/daaciwspp/image/upload/v1786466695/my-portfolio/mysql_fblya2.png' },
      { name: 'MongoDB', icon: 'https://res.cloudinary.com/daaciwspp/image/upload/v1786466693/my-portfolio/mongodb_t2tm1m.png' },
    ],
  },
  {
    title: 'Mobile App Development',
    skills: [
      { name: 'Flutter', icon: 'https://res.cloudinary.com/daaciwspp/image/upload/v1786466675/my-portfolio/flutter_ynsmev.png' },
      { name: 'Jetpack Compose', icon: 'https://res.cloudinary.com/daaciwspp/image/upload/v1786466686/my-portfolio/jetpackcompose_w65ahm.png' },
      { name: 'XML', icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBMw6_RdwKQ9bDFfnKDX1iwMl4bVJEvd9PP53XuIw&s' },
      { name: 'Android Studio', icon: 'https://developer.android.com/static/studio/images/new-studio-logo-1_1920.png' },
    ],
  },
  {
    title: 'Development & Deployment Tools',
    skills: [
      { name: 'Git', icon: 'https://www.vectorlogo.zone/logos/git-scm/git-scm-icon.svg' },
      { name: 'GitHub', icon: 'https://res.cloudinary.com/daaciwspp/image/upload/v1786466679/my-portfolio/github_z7jpak.png' },
      { name: 'Postman', icon: 'https://www.vectorlogo.zone/logos/getpostman/getpostman-icon.svg' },
      { name: 'VS Code', icon: 'https://res.cloudinary.com/daaciwspp/image/upload/v1786469811/my-portfolio/vs-code_fhcrie.jpg' },
    ],
  },
  {
    title: 'Cloud & Hosting',
    skills: [
      { name: 'AWS', icon: 'https://res.cloudinary.com/daaciwspp/image/upload/v1786466672/my-portfolio/aws_dcvxtw.png' },
      { name: 'Firebase', icon: 'https://res.cloudinary.com/daaciwspp/image/upload/v1786466677/my-portfolio/firebase_vv2jso.png' },
      { name: 'Netlify', icon: 'https://seeklogo.com/images/N/netlify-logo-BD8F8A77E2-seeklogo.com.png' },
      { name: 'Vercel', icon: 'https://res.cloudinary.com/daaciwspp/image/upload/v1786466716/my-portfolio/vercel_b87b3l.png' },
      { name: 'Render', icon: 'https://res.cloudinary.com/daaciwspp/image/upload/v1786466702/my-portfolio/render_kljyte.png' },
    ],
  },
];

export async function seedSkills() {
  let categoryCount = 0;
  let skillCount = 0;

  for (let i = 0; i < DATA.length; i += 1) {
    const { title, skills } = DATA[i];
    const category = await SkillCategory.findOneAndUpdate(
      { title },
      { title, order: i },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );
    categoryCount += 1;

    for (let j = 0; j < skills.length; j += 1) {
      await Skill.findOneAndUpdate(
        { category: category._id, name: skills[j].name },
        { ...skills[j], category: category._id, order: j },
        { upsert: true, setDefaultsOnInsert: true }
      );
      skillCount += 1;
    }
  }

  return { created: true, count: categoryCount + skillCount, detail: `${categoryCount} categories, ${skillCount} skills` };
}
