export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  category: 'Enterprise' | 'Full Stack' | 'Backend' | 'Government';
  technologies: string[];
  features: string[];
  myContribution: string;
  iconName: string;
  featured?: boolean;
}

export interface SkillItem {
  name: string;
  featured?: boolean;
}

export interface SkillCategory {
  title: string;
  iconName: string;
  skills: SkillItem[];
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  isCurrent: boolean;
  responsibilities: string[];
  technologies: string[];
  metrics: { label: string; value: string }[];
}

export interface ServiceExpertise {
  id: string;
  title: string;
  description: string;
  iconName: string;
  badge: string;
}

export interface ApproachStep {
  step: string;
  title: string;
  description: string;
  details: string[];
}
