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
      { name: 'Redux', icon: 'https://res.cloudinary.com/daaciwspp/image/upload/v1791705428/my-portfolio/redux_q0yvdy.svg' },
      { name: 'HTML', icon: 'https://res.cloudinary.com/daaciwspp/image/upload/v1791705424/my-portfolio/html5-badge-h-solo_lloyfe.png' },
      { name: 'CSS', icon: 'https://res.cloudinary.com/daaciwspp/image/upload/v1786469810/my-portfolio/css-logo_qfwfcj.png' },
      { name: 'Tailwind', icon: 'https://res.cloudinary.com/daaciwspp/image/upload/v1786466712/my-portfolio/tailwind_w0wrr9.png' },
      { name: 'Bootstrap', icon: 'https://res.cloudinary.com/daaciwspp/image/upload/v1791705423/my-portfolio/bootstrap-logo-shadow_uef7on.png' },
    ],
  },
  {
    title: 'Backend & Database',
    skills: [
      { name: 'Node.js', icon: 'https://res.cloudinary.com/daaciwspp/image/upload/v1786466697/my-portfolio/nodejs_z25nwz.png' },
      { name: 'Express.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg' },
      { name: 'MySQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
      { name: 'MongoDB', icon: 'https://res.cloudinary.com/daaciwspp/image/upload/v1786466693/my-portfolio/mongodb_t2tm1m.png' },
    ],
  },
  {
    title: 'Mobile App Development',
    skills: [
      { name: 'Flutter', icon: 'https://res.cloudinary.com/daaciwspp/image/upload/v1786466675/my-portfolio/flutter_ynsmev.png' },
      { name: 'Jetpack Compose', icon: 'https://res.cloudinary.com/daaciwspp/image/upload/v1786466686/my-portfolio/jetpackcompose_w65ahm.png' },
      { name: 'XML', icon: 'https://res.cloudinary.com/daaciwspp/image/upload/v1791705426/my-portfolio/images_ytehju.png' },
      { name: 'Android Studio', icon: 'https://res.cloudinary.com/daaciwspp/image/upload/v1791705427/my-portfolio/new-studio-logo-1_1920_jsetf5.png' },
    ],
  },
  {
    title: 'Development & Deployment Tools',
    skills: [
      { name: 'Git', icon: 'https://res.cloudinary.com/daaciwspp/image/upload/v1791705424/my-portfolio/git-scm-icon_fg0rin.svg' },
      { name: 'GitHub', icon: 'https://res.cloudinary.com/daaciwspp/image/upload/v1786466679/my-portfolio/github_z7jpak.png' },
      { name: 'Postman', icon: 'https://res.cloudinary.com/daaciwspp/image/upload/v1791705425/my-portfolio/getpostman-icon_xrkvba.svg' },
      { name: 'VS Code', icon: 'https://res.cloudinary.com/daaciwspp/image/upload/v1786469811/my-portfolio/vs-code_fhcrie.jpg' },
    ],
  },
  {
    title: 'Cloud & Hosting',
    skills: [
      { name: 'AWS', icon: 'https://res.cloudinary.com/daaciwspp/image/upload/v1786466672/my-portfolio/aws_dcvxtw.png' },
      { name: 'Firebase', icon: 'https://res.cloudinary.com/daaciwspp/image/upload/v1786466677/my-portfolio/firebase_vv2jso.png' },
      { name: 'Netlify', icon: 'https://res.cloudinary.com/daaciwspp/image/upload/v1791702908/my-portfolio/netlify-original_ollaqj.svg' },
      { name: 'Vercel', icon: 'https://res.cloudinary.com/daaciwspp/image/upload/v1786466716/my-portfolio/vercel_b87b3l.png' },
      { name: 'Render', icon: 'https://cdn.simpleicons.org/render/000000' },
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
