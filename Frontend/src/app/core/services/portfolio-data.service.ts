import { Injectable } from '@angular/core';
import { Project, SkillCategory, Experience, ServiceExpertise, ApproachStep } from '../models/portfolio.model';

@Injectable({
  providedIn: 'root'
})
export class PortfolioDataService {

  public readonly experiencesData: Experience[] = [
    {
      id: 'travidux-pde',
      role: 'Project Delivery Engineer (PDE)',
      company: 'Travidux Technologies Pvt. Ltd.',
      location: 'India',
      period: 'May 2025 – Present',
      isCurrent: true,
      responsibilities: [
        'Spearheaded the deployment of 4 complex enterprise systems, supervising end-to-end product life cycles from initial resource scope to final cloud execution.',
        'Collaborated directly with corporate clients to analyze target technical requirements, translating operational problem statements into structured backend designs.',
        'Oversaw software delivery lifecycles by structuring feature timelines, managing sprint workload allocation, and tracking milestones using Agile metrics.',
        'Enforced high-quality code metrics by leading weekly quality audits, verifying software build stability and cross-layer data encryption rules.',
        'Provided clear technical leadership to a cross-functional squad of developers, removing infrastructure roadblocks and optimizing weekly velocity parameters.'
      ],
      technologies: [
        'Agile Delivery', 'Backend Architecture', 'Python', 'Django REST Framework',
        'Cloud Infrastructure', 'AWS', 'Sprint Planning', 'Code Audits'
      ],
      metrics: [
        { label: 'Enterprise Systems', value: '4 Deployed' },
        { label: 'Leadership', value: 'Cross-Functional' },
        { label: 'Workload Allocation', value: 'Sprint Mgmt' },
        { label: 'Quality Audits', value: 'Weekly' }
      ]
    },
    {
      id: 'travidux-dev',
      role: 'Software Developer',
      company: 'Travidux Technologies Pvt. Ltd.',
      location: 'India',
      period: 'Sep 2022 – May 2025',
      isCurrent: false,
      responsibilities: [
        'Architected full-stack enterprise portals scaled for 50+ discrete operational branches, optimizing process automated routines to trim system latency metrics by 30%.',
        'Engineered, validated, and documented 25 internal RESTful web services using Python, securely processing 1,000+ monthly financial network payloads.',
        'Optimized relational PostgreSQL data models using optimized index strategies and managed an independent memory layer via Redis to boost query speeds by 40%.',
        'Provisioned web servers on AWS cloud infrastructure, defining scalable environment parameters and reducing runtime post-launch configuration friction by 15%.'
      ],
      technologies: [
        'Python', 'Django', 'Django REST Framework', 'Angular', 'PostgreSQL',
        'Redis', 'AWS EC2', 'AWS S3', 'NGINX', 'REST APIs'
      ],
      metrics: [
        { label: 'Operational Branches', value: '50+' },
        { label: 'System Latency', value: '-30%' },
        { label: 'REST Services', value: '25 Built' },
        { label: 'Query Speedup', value: '+40%' }
      ]
    },
    {
      id: 'soften-intern',
      role: 'Software Developer Intern',
      company: 'Soften Technologies Pvt Ltd',
      location: 'India',
      period: 'May 2022 – Oct 2022',
      isCurrent: false,
      responsibilities: [
        'Built 3 standalone evaluation sandboxes utilizing Flask frameworks, coordinating feedback loops with a target group of 50 active beta testers.',
        'Constructed modular web components to wrap application logic, decreasing redundant functional segments by 25%.'
      ],
      technologies: [
        'Python', 'Flask', 'Modular Components', 'HTML5', 'CSS3', 'Beta Testing'
      ],
      metrics: [
        { label: 'Sandboxes Built', value: '3 Flask' },
        { label: 'Active Beta Testers', value: '50 Users' },
        { label: 'Code Redundancy', value: '-25%' }
      ]
    }
  ];

  public readonly skillCategories: SkillCategory[] = [
    {
      title: 'Backend Development',
      iconName: 'server',
      skills: [
        { name: 'Python', featured: true },
        { name: 'Django', featured: true },
        { name: 'Django REST Framework', featured: true },
        { name: 'REST APIs', featured: true },
        { name: 'Celery' },
        { name: 'Redis' }
      ]
    },
    {
      title: 'Frontend Development',
      iconName: 'layout',
      skills: [
        { name: 'Angular', featured: true },
        { name: 'TypeScript', featured: true },
        { name: 'HTML5' },
        { name: 'CSS3' },
        { name: 'Bootstrap' }
      ]
    },
    {
      title: 'Database & Storage',
      iconName: 'database',
      skills: [
        { name: 'PostgreSQL', featured: true },
        { name: 'SQL Query Optimization', featured: true }
      ]
    },
    {
      title: 'Cloud & Infrastructure',
      iconName: 'cloud',
      skills: [
        { name: 'AWS EC2', featured: true },
        { name: 'AWS S3' },
        { name: 'Linux OS' },
        { name: 'NGINX' },
        { name: 'SSH & DevOps' }
      ]
    },
    {
      title: 'Tools & Delivery Practices',
      iconName: 'git-branch',
      skills: [
        { name: 'Project Delivery (PDE)', featured: true },
        { name: 'Agile / Scrum', featured: true },
        { name: 'Sprint Planning' },
        { name: 'Git & GitHub' },
        { name: 'GitLab' },
        { name: 'Debugging' },
        { name: 'Code Optimization' }
      ]
    },
    {
      title: 'Integrations & Payments',
      iconName: 'credit-card',
      skills: [
        { name: 'Razorpay', featured: true },
        { name: 'PayU', featured: true },
        { name: 'SAP Integration', featured: true },
        { name: 'Pine Labs' }
      ]
    }
  ];

  public readonly projects: Project[] = [
    {
      id: 'erp-platform',
      title: 'Distributed ERP Infrastructure',
      subtitle: 'Enterprise Business & Operations Management',
      description: 'A comprehensive, multi-tenant enterprise resource planning system engineered for managing core business operations across 50+ branches, inventory, invoicing, financial transactions, and multi-department reporting.',
      category: 'Enterprise',
      featured: true,
      iconName: 'layers',
      technologies: ['Python', 'Django', 'Django REST Framework', 'Angular', 'PostgreSQL', 'Celery', 'Redis'],
      features: [
        'Automated Invoicing & Tax Calculations',
        'Real-time Stock & Inventory Tracking',
        'Multi-Branch Operations & Warehouse Logs',
        'Transaction Accounting & Financial Ledgers',
        'Customer Management & CRM Integration',
        'Custom Business Analytics & Exportable Reports'
      ],
      myContribution: 'Lead delivery and full-stack engineering: designed high-throughput DRF API endpoints, built responsive Angular administrative interfaces, optimized PostgreSQL indexing to reduce system latency by 30%, and supervised cloud execution on AWS.'
    },
    {
      id: 'crm-bi-platform',
      title: 'CRM & Business Intelligence Platform',
      subtitle: 'Customer Intelligence & Analytical Insights',
      description: 'An advanced platform designed for managing complete customer lifecycles, real-time data retrieval, high-density business metrics analysis, and automated executive reporting.',
      category: 'Full Stack',
      featured: true,
      iconName: 'bar-chart-2',
      technologies: ['Python', 'Django', 'Angular', 'PostgreSQL', 'Redis', 'TypeScript'],
      features: [
        'Complete Customer Lifecycle Management',
        'High-Performance Data Retrieval Engines',
        'Custom Business Reporting Dashboards',
        'Real-Time Analytics & Key Performance Metrics',
        'Operational Insights & Trend Forecasting'
      ],
      myContribution: 'Architected customer data pipeline REST services in Django, created interactive Angular dashboard widgets with live data visualization, and implemented Redis caching to achieve sub-second data load times for analytical queries.'
    },
    {
      id: 'booking-portal-backoffice',
      title: 'Booking Portal & Back-Office System',
      subtitle: 'Maritime Fleet Booking & Commission Engine',
      description: 'An end-to-end maritime vessel booking portal combined with a secure back-office operational management engine handling ticketing, agent commissions, and multi-channel payment integrations.',
      category: 'Enterprise',
      featured: true,
      iconName: 'ship',
      technologies: ['Python', 'Django', 'Django REST Framework', 'Angular', 'PostgreSQL', 'Razorpay', 'PayU'],
      features: [
        'Online & Offline Vessel Booking Engine',
        'Dynamic Schedule & Capacity Management',
        'Automated E-Ticket Generation & Verification',
        'Razorpay & PayU Payment Gateway Integrations',
        'Agent Commission Calculation & Ledger Management'
      ],
      myContribution: 'Implemented full booking transaction workflows with atomicity to prevent double-booking, integrated payment webhooks for instant status confirmation, and developed agent payout commission calculation algorithms.'
    },
    {
      id: 'government-application',
      title: 'Government Application',
      subtitle: 'Official Law Enforcement & Diary Management',
      description: 'A secure, high-compliance government workflow application built for structured data recording, FIR filing, and General Diary management with strict role-based access control.',
      category: 'Government',
      featured: true,
      iconName: 'shield',
      technologies: ['Python', 'Django', 'PostgreSQL', 'Linux', 'Security Workflows'],
      features: [
        'First Information Report (FIR) Registration Workflow',
        'General Diary Daily Incident Recording',
        'Structured Official Document Management',
        'Role-Based Granular Access Control & Security Auditing',
        'High-Reliability Secure Business Logic'
      ],
      myContribution: 'Developed secure Django models and views enforcing strict data audit trails, implemented database constraints to ensure legal document integrity, and performed security hardening for official deployment.'
    }
  ];

  public readonly expertiseServices: ServiceExpertise[] = [
    {
      id: 'pde-leadership',
      title: 'Project Delivery & Engineering (PDE)',
      description: 'Spearheading product lifecycles, supervising resource scoping, leading developer squads, enforcing quality audits, and managing Agile sprint timelines.',
      iconName: 'briefcase',
      badge: 'PDE & Agile'
    },
    {
      id: 'backend-dev',
      title: 'Backend Development',
      description: 'Building robust, scalable, and secure backend systems and REST APIs using Python, Django, and Django REST Framework.',
      iconName: 'code',
      badge: 'Python & DRF'
    },
    {
      id: 'frontend-dev',
      title: 'Frontend Development',
      description: 'Crafting responsive, performant, and user-centric web applications using Angular, TypeScript, and modern SCSS.',
      iconName: 'monitor',
      badge: 'Angular & TS'
    },
    {
      id: 'db-optimization',
      title: 'Database Optimization',
      description: 'Architecting relational schemas, writing efficient SQL queries, and optimizing PostgreSQL & Redis performance for heavy loads.',
      iconName: 'database',
      badge: 'PostgreSQL & Redis'
    },
    {
      id: 'enterprise-apps',
      title: 'Enterprise Applications',
      description: 'Developing end-to-end ERP, CRM, inventory, invoicing, and back-office management solutions scaled across 50+ branches.',
      iconName: 'layers',
      badge: 'ERP & CRM'
    },
    {
      id: 'deployment-support',
      title: 'Cloud & Production Deployment',
      description: 'Provisioning AWS EC2 & S3 web servers, defining environment parameters, and maintaining high-availability production environments.',
      iconName: 'cloud-lightning',
      badge: 'AWS & Linux'
    }
  ];

  public readonly approachSteps: ApproachStep[] = [
    {
      step: '01',
      title: 'Scope & Client Requirements',
      description: 'Collaborate directly with corporate clients to analyze technical requirements, translating operational problem statements into structured backend designs.',
      details: ['Client Requirements', 'Problem Translation', 'Resource Scoping']
    },
    {
      step: '02',
      title: 'Architect & Design',
      description: 'Plan scalable application architecture, clean RESTful API specs, normalized database schemas, and intuitive frontend component hierarchies.',
      details: ['Database Schema', 'API Specs', 'Component Architecture']
    },
    {
      step: '03',
      title: 'Sprint Execution & Build',
      description: 'Lead development squads to build backend services in Django and responsive Angular frontends, managing sprint workload allocation.',
      details: ['Sprint Planning', 'Django DRF', 'Angular Frontend']
    },
    {
      step: '04',
      title: 'Quality Audits & Optimization',
      description: 'Conduct weekly quality audits, verify build stability and encryption rules, optimize PostgreSQL query speeds by 40%, and trim system latency.',
      details: ['Code Audits', 'Query Tuning', 'Security Rules']
    },
    {
      step: '05',
      title: 'Cloud Provisioning & Delivery',
      description: 'Provision web servers on AWS cloud infrastructure, supervise end-to-end product lifecycles, and ensure 99.9% production stability.',
      details: ['AWS Cloud', 'Product Lifecycles', 'Production Support']
    }
  ];
}
