import { SkillCard } from './SkillCard.jsx';

export function SkillCategoryBlock({ title, skills }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-glow transition-transform hover:-translate-y-1">
      <h3 className="mb-5 text-center text-xl font-semibold text-text-primary">{title}</h3>
      <div className="flex flex-wrap justify-center gap-3">
        {skills.map((skill) => (
          <SkillCard key={skill._id} name={skill.name} icon={skill.icon} />
        ))}
      </div>
    </div>
  );
}
