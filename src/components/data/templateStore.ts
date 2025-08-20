export interface TaskTemplate {
  id: string;
  title: string;
  description: string;
  phase: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  estimatedTime: string;
  tags: string[];
  dependencies?: string[]; // IDs of tasks that must be completed first
  subtasks?: Array<{
    title: string;
    completed: boolean;
  }>;
}

export interface PhaseTemplate {
  name: string;
  description: string;
  color: string;
  tasks: TaskTemplate[];
}

export interface ProjectTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: string;
  phases: PhaseTemplate[];
  estimatedDuration: string;
  teamSize: string;
}

export const projectTemplates: ProjectTemplate[] = [
  {
    id: "software-development",
    name: "Software Development Project",
    description: "Complete software development lifecycle from planning to deployment",
    category: "Development",
    icon: "Code",
    estimatedDuration: "12-16 weeks",
    teamSize: "4-6 people",
    phases: [
      {
        name: "Planning",
        description: "Project planning and requirements gathering",
        color: "bg-blue-500",
        tasks: [
          {
            id: "req-gathering",
            title: "Requirements Gathering",
            description: "Collect and document all project requirements from stakeholders",
            phase: "Planning",
            priority: "high",
            estimatedTime: "40h",
            tags: ["Requirements", "Documentation", "Stakeholders"],
            subtasks: [
              { title: "Stakeholder interviews", completed: false },
              { title: "Business requirements document", completed: false },
              { title: "Technical requirements document", completed: false },
              { title: "Requirements review meeting", completed: false }
            ]
          },
          {
            id: "project-scope",
            title: "Define Project Scope",
            description: "Create detailed project scope and boundaries",
            phase: "Planning",
            priority: "high",
            estimatedTime: "16h",
            tags: ["Scope", "Planning", "Documentation"],
            dependencies: ["req-gathering"],
            subtasks: [
              { title: "Scope statement", completed: false },
              { title: "Work breakdown structure", completed: false },
              { title: "Success criteria", completed: false }
            ]
          },
          {
            id: "technical-arch",
            title: "Technical Architecture Design",
            description: "Design system architecture and technology stack",
            phase: "Planning",
            priority: "high",
            estimatedTime: "32h",
            tags: ["Architecture", "Technical", "Design"],
            dependencies: ["project-scope"],
            subtasks: [
              { title: "System architecture diagram", completed: false },
              { title: "Technology stack selection", completed: false },
              { title: "Database design", completed: false },
              { title: "API design", completed: false }
            ]
          }
        ]
      },
      {
        name: "Design",
        description: "UI/UX design and prototyping",
        color: "bg-purple-500",
        tasks: [
          {
            id: "user-research",
            title: "User Research & Personas",
            description: "Conduct user research and create user personas",
            phase: "Design",
            priority: "high",
            estimatedTime: "24h",
            tags: ["UX", "Research", "Personas"],
            subtasks: [
              { title: "User interviews", completed: false },
              { title: "Survey creation and distribution", completed: false },
              { title: "User personas", completed: false },
              { title: "User journey mapping", completed: false }
            ]
          },
          {
            id: "wireframes",
            title: "Wireframes & Mockups",
            description: "Create wireframes and high-fidelity mockups",
            phase: "Design",
            priority: "high",
            estimatedTime: "40h",
            tags: ["Wireframes", "Mockups", "UI"],
            dependencies: ["user-research"],
            subtasks: [
              { title: "Low-fidelity wireframes", completed: false },
              { title: "High-fidelity mockups", completed: false },
              { title: "Mobile responsive designs", completed: false },
              { title: "Design system components", completed: false }
            ]
          },
          {
            id: "prototype",
            title: "Interactive Prototype",
            description: "Build interactive prototype for user testing",
            phase: "Design",
            priority: "medium",
            estimatedTime: "20h",
            tags: ["Prototype", "Testing", "UX"],
            dependencies: ["wireframes"],
            subtasks: [
              { title: "Clickable prototype", completed: false },
              { title: "User flow testing", completed: false },
              { title: "Usability testing", completed: false }
            ]
          }
        ]
      },
      {
        name: "Development",
        description: "Core development and implementation",
        color: "bg-green-500",
        tasks: [
          {
            id: "dev-environment",
            title: "Development Environment Setup",
            description: "Set up development environment and tools",
            phase: "Development",
            priority: "critical",
            estimatedTime: "16h",
            tags: ["Setup", "Environment", "Tools"],
            subtasks: [
              { title: "Version control setup", completed: false },
              { title: "CI/CD pipeline", completed: false },
              { title: "Development server setup", completed: false },
              { title: "Code quality tools", completed: false }
            ]
          },
          {
            id: "backend-api",
            title: "Backend API Development",
            description: "Develop backend APIs and database integration",
            phase: "Development",
            priority: "high",
            estimatedTime: "80h",
            tags: ["Backend", "API", "Database"],
            dependencies: ["dev-environment"],
            subtasks: [
              { title: "Database schema implementation", completed: false },
              { title: "REST API endpoints", completed: false },
              { title: "Authentication system", completed: false },
              { title: "Data validation", completed: false },
              { title: "API documentation", completed: false }
            ]
          },
          {
            id: "frontend-dev",
            title: "Frontend Development",
            description: "Build user interface and integrate with backend",
            phase: "Development",
            priority: "high",
            estimatedTime: "100h",
            tags: ["Frontend", "UI", "Integration"],
            dependencies: ["backend-api"],
            subtasks: [
              { title: "Component library", completed: false },
              { title: "Page layouts", completed: false },
              { title: "API integration", completed: false },
              { title: "State management", completed: false },
              { title: "Responsive implementation", completed: false }
            ]
          }
        ]
      },
      {
        name: "Testing",
        description: "Quality assurance and testing",
        color: "bg-orange-500",
        tasks: [
          {
            id: "unit-testing",
            title: "Unit Testing",
            description: "Write and execute unit tests for all components",
            phase: "Testing",
            priority: "high",
            estimatedTime: "40h",
            tags: ["Testing", "Unit Tests", "Quality"],
            dependencies: ["frontend-dev"],
            subtasks: [
              { title: "Frontend component tests", completed: false },
              { title: "Backend API tests", completed: false },
              { title: "Test coverage reports", completed: false }
            ]
          },
          {
            id: "integration-testing",
            title: "Integration Testing",
            description: "Test integration between different system components",
            phase: "Testing",
            priority: "high",
            estimatedTime: "32h",
            tags: ["Testing", "Integration", "API"],
            dependencies: ["unit-testing"],
            subtasks: [
              { title: "API integration tests", completed: false },
              { title: "Database integration tests", completed: false },
              { title: "End-to-end testing", completed: false }
            ]
          },
          {
            id: "user-acceptance",
            title: "User Acceptance Testing",
            description: "Conduct user acceptance testing with stakeholders",
            phase: "Testing",
            priority: "medium",
            estimatedTime: "24h",
            tags: ["UAT", "Stakeholders", "Validation"],
            dependencies: ["integration-testing"],
            subtasks: [
              { title: "UAT test plan", completed: false },
              { title: "Stakeholder testing sessions", completed: false },
              { title: "Bug fixes and iterations", completed: false }
            ]
          }
        ]
      },
      {
        name: "Deployment",
        description: "Production deployment and launch",
        color: "bg-red-500",
        tasks: [
          {
            id: "production-setup",
            title: "Production Environment Setup",
            description: "Set up production infrastructure and deployment pipeline",
            phase: "Deployment",
            priority: "critical",
            estimatedTime: "24h",
            tags: ["Production", "Infrastructure", "DevOps"],
            subtasks: [
              { title: "Server configuration", completed: false },
              { title: "Database setup", completed: false },
              { title: "SSL certificates", completed: false },
              { title: "Monitoring tools", completed: false }
            ]
          },
          {
            id: "deployment",
            title: "Application Deployment",
            description: "Deploy application to production environment",
            phase: "Deployment",
            priority: "critical",
            estimatedTime: "16h",
            tags: ["Deployment", "Production", "Launch"],
            dependencies: ["production-setup"],
            subtasks: [
              { title: "Code deployment", completed: false },
              { title: "Database migration", completed: false },
              { title: "Smoke testing", completed: false },
              { title: "Go-live verification", completed: false }
            ]
          },
          {
            id: "post-launch",
            title: "Post-Launch Monitoring",
            description: "Monitor application performance and fix issues",
            phase: "Deployment",
            priority: "medium",
            estimatedTime: "20h",
            tags: ["Monitoring", "Support", "Maintenance"],
            dependencies: ["deployment"],
            subtasks: [
              { title: "Performance monitoring", completed: false },
              { title: "Bug fixes", completed: false },
              { title: "User feedback collection", completed: false }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "marketing-campaign",
    name: "Marketing Campaign",
    description: "Complete marketing campaign from strategy to execution and analysis",
    category: "Marketing",
    icon: "Megaphone",
    estimatedDuration: "8-12 weeks",
    teamSize: "3-5 people",
    phases: [
      {
        name: "Planning",
        description: "Campaign strategy and planning",
        color: "bg-blue-500",
        tasks: [
          {
            id: "market-research",
            title: "Market Research & Analysis",
            description: "Conduct thorough market research and competitor analysis",
            phase: "Planning",
            priority: "high",
            estimatedTime: "32h",
            tags: ["Research", "Market Analysis", "Competition"],
            subtasks: [
              { title: "Target audience research", completed: false },
              { title: "Competitor analysis", completed: false },
              { title: "Market trends analysis", completed: false },
              { title: "SWOT analysis", completed: false }
            ]
          },
          {
            id: "campaign-strategy",
            title: "Campaign Strategy Development",
            description: "Develop comprehensive campaign strategy and objectives",
            phase: "Planning",
            priority: "high",
            estimatedTime: "24h",
            tags: ["Strategy", "Objectives", "Planning"],
            dependencies: ["market-research"],
            subtasks: [
              { title: "Campaign objectives", completed: false },
              { title: "Key messaging strategy", completed: false },
              { title: "Channel strategy", completed: false },
              { title: "Budget allocation", completed: false }
            ]
          },
          {
            id: "content-calendar",
            title: "Content Calendar Planning",
            description: "Create detailed content calendar and publishing schedule",
            phase: "Planning",
            priority: "medium",
            estimatedTime: "16h",
            tags: ["Content", "Calendar", "Scheduling"],
            dependencies: ["campaign-strategy"],
            subtasks: [
              { title: "Content themes", completed: false },
              { title: "Publishing schedule", completed: false },
              { title: "Content types and formats", completed: false }
            ]
          }
        ]
      },
      {
        name: "Design",
        description: "Creative assets and brand materials",
        color: "bg-purple-500",
        tasks: [
          {
            id: "brand-guidelines",
            title: "Brand Guidelines & Style Guide",
            description: "Establish brand guidelines and visual identity for the campaign",
            phase: "Design",
            priority: "high",
            estimatedTime: "20h",
            tags: ["Branding", "Guidelines", "Identity"],
            subtasks: [
              { title: "Color palette", completed: false },
              { title: "Typography guidelines", completed: false },
              { title: "Logo usage rules", completed: false },
              { title: "Visual style guide", completed: false }
            ]
          },
          {
            id: "creative-assets",
            title: "Creative Asset Development",
            description: "Design all creative assets for the campaign",
            phase: "Design",
            priority: "high",
            estimatedTime: "60h",
            tags: ["Design", "Creative", "Assets"],
            dependencies: ["brand-guidelines"],
            subtasks: [
              { title: "Social media graphics", completed: false },
              { title: "Web banners", completed: false },
              { title: "Print materials", completed: false },
              { title: "Video assets", completed: false },
              { title: "Email templates", completed: false }
            ]
          }
        ]
      },
      {
        name: "Development",
        description: "Campaign implementation and setup",
        color: "bg-green-500",
        tasks: [
          {
            id: "landing-page",
            title: "Landing Page Development",
            description: "Create campaign-specific landing pages",
            phase: "Development",
            priority: "high",
            estimatedTime: "40h",
            tags: ["Web Development", "Landing Page", "Conversion"],
            subtasks: [
              { title: "Page design implementation", completed: false },
              { title: "Form integration", completed: false },
              { title: "Analytics tracking", completed: false },
              { title: "Mobile optimization", completed: false }
            ]
          },
          {
            id: "email-automation",
            title: "Email Marketing Automation",
            description: "Set up email marketing campaigns and automation",
            phase: "Development",
            priority: "medium",
            estimatedTime: "24h",
            tags: ["Email Marketing", "Automation", "CRM"],
            subtasks: [
              { title: "Email sequences", completed: false },
              { title: "Automation workflows", completed: false },
              { title: "Segmentation setup", completed: false }
            ]
          },
          {
            id: "social-media-setup",
            title: "Social Media Campaign Setup",
            description: "Configure social media campaigns and advertising",
            phase: "Development",
            priority: "medium",
            estimatedTime: "20h",
            tags: ["Social Media", "Advertising", "Setup"],
            subtasks: [
              { title: "Ad campaign creation", completed: false },
              { title: "Audience targeting", completed: false },
              { title: "Budget allocation", completed: false }
            ]
          }
        ]
      },
      {
        name: "Testing",
        description: "Campaign testing and optimization",
        color: "bg-orange-500",
        tasks: [
          {
            id: "ab-testing",
            title: "A/B Testing Setup",
            description: "Set up A/B tests for key campaign elements",
            phase: "Testing",
            priority: "medium",
            estimatedTime: "16h",
            tags: ["A/B Testing", "Optimization", "Analytics"],
            dependencies: ["landing-page"],
            subtasks: [
              { title: "Test variations", completed: false },
              { title: "Testing framework", completed: false },
              { title: "Success metrics", completed: false }
            ]
          },
          {
            id: "quality-assurance",
            title: "Campaign Quality Assurance",
            description: "Test all campaign elements before launch",
            phase: "Testing",
            priority: "high",
            estimatedTime: "12h",
            tags: ["QA", "Testing", "Launch Prep"],
            dependencies: ["ab-testing"],
            subtasks: [
              { title: "Link testing", completed: false },
              { title: "Form testing", completed: false },
              { title: "Cross-platform testing", completed: false }
            ]
          }
        ]
      },
      {
        name: "Deployment",
        description: "Campaign launch and monitoring",
        color: "bg-red-500",
        tasks: [
          {
            id: "campaign-launch",
            title: "Campaign Launch",
            description: "Execute campaign launch across all channels",
            phase: "Deployment",
            priority: "critical",
            estimatedTime: "8h",
            tags: ["Launch", "Execution", "Go-Live"],
            dependencies: ["quality-assurance"],
            subtasks: [
              { title: "Content publishing", completed: false },
              { title: "Ad activation", completed: false },
              { title: "Email deployment", completed: false },
              { title: "Social media launch", completed: false }
            ]
          },
          {
            id: "monitoring-optimization",
            title: "Performance Monitoring & Optimization",
            description: "Monitor campaign performance and optimize as needed",
            phase: "Deployment",
            priority: "high",
            estimatedTime: "40h",
            tags: ["Monitoring", "Optimization", "Analytics"],
            dependencies: ["campaign-launch"],
            subtasks: [
              { title: "Daily performance monitoring", completed: false },
              { title: "Optimization adjustments", completed: false },
              { title: "Reporting and analysis", completed: false },
              { title: "Campaign wrap-up report", completed: false }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "product-launch",
    name: "Product Launch",
    description: "End-to-end product launch from development to market introduction",
    category: "Product",
    icon: "Rocket",
    estimatedDuration: "16-20 weeks",
    teamSize: "6-10 people",
    phases: [
      {
        name: "Planning",
        description: "Product strategy and market planning",
        color: "bg-blue-500",
        tasks: [
          {
            id: "product-strategy",
            title: "Product Strategy & Roadmap",
            description: "Define product strategy, vision, and roadmap",
            phase: "Planning",
            priority: "critical",
            estimatedTime: "32h",
            tags: ["Strategy", "Roadmap", "Vision"],
            subtasks: [
              { title: "Market opportunity analysis", completed: false },
              { title: "Product vision document", completed: false },
              { title: "Product roadmap", completed: false },
              { title: "Success metrics definition", completed: false }
            ]
          },
          {
            id: "market-validation",
            title: "Market Validation & Research",
            description: "Validate market demand and gather customer insights",
            phase: "Planning",
            priority: "high",
            estimatedTime: "40h",
            tags: ["Validation", "Research", "Customer"],
            dependencies: ["product-strategy"],
            subtasks: [
              { title: "Customer interviews", completed: false },
              { title: "Market size analysis", completed: false },
              { title: "Competitive landscape", completed: false },
              { title: "Pricing research", completed: false }
            ]
          }
        ]
      },
      {
        name: "Design",
        description: "Product design and user experience",
        color: "bg-purple-500",
        tasks: [
          {
            id: "user-experience",
            title: "User Experience Design",
            description: "Design comprehensive user experience and interface",
            phase: "Design",
            priority: "high",
            estimatedTime: "60h",
            tags: ["UX", "UI", "Design"],
            dependencies: ["market-validation"],
            subtasks: [
              { title: "User journey mapping", completed: false },
              { title: "Information architecture", completed: false },
              { title: "Wireframes and prototypes", completed: false },
              { title: "Usability testing", completed: false }
            ]
          },
          {
            id: "brand-identity",
            title: "Brand Identity & Marketing Materials",
            description: "Develop brand identity and create marketing materials",
            phase: "Design",
            priority: "medium",
            estimatedTime: "40h",
            tags: ["Branding", "Marketing", "Identity"],
            subtasks: [
              { title: "Logo and brand guidelines", completed: false },
              { title: "Marketing collateral", completed: false },
              { title: "Product packaging", completed: false },
              { title: "Website design", completed: false }
            ]
          }
        ]
      },
      {
        name: "Development",
        description: "Product development and implementation",
        color: "bg-green-500",
        tasks: [
          {
            id: "mvp-development",
            title: "MVP Development",
            description: "Build minimum viable product with core features",
            phase: "Development",
            priority: "critical",
            estimatedTime: "120h",
            tags: ["MVP", "Development", "Core Features"],
            dependencies: ["user-experience"],
            subtasks: [
              { title: "Core feature development", completed: false },
              { title: "Backend infrastructure", completed: false },
              { title: "Frontend implementation", completed: false },
              { title: "Database design", completed: false }
            ]
          },
          {
            id: "integration-apis",
            title: "Third-party Integrations",
            description: "Integrate with external services and APIs",
            phase: "Development",
            priority: "medium",
            estimatedTime: "40h",
            tags: ["Integration", "APIs", "External"],
            dependencies: ["mvp-development"],
            subtasks: [
              { title: "Payment gateway integration", completed: false },
              { title: "Analytics integration", completed: false },
              { title: "External API connections", completed: false }
            ]
          }
        ]
      },
      {
        name: "Testing",
        description: "Product testing and quality assurance",
        color: "bg-orange-500",
        tasks: [
          {
            id: "beta-testing",
            title: "Beta Testing Program",
            description: "Conduct beta testing with selected users",
            phase: "Testing",
            priority: "high",
            estimatedTime: "60h",
            tags: ["Beta Testing", "Users", "Feedback"],
            dependencies: ["integration-apis"],
            subtasks: [
              { title: "Beta user recruitment", completed: false },
              { title: "Beta testing platform", completed: false },
              { title: "Feedback collection", completed: false },
              { title: "Issue resolution", completed: false }
            ]
          },
          {
            id: "performance-testing",
            title: "Performance & Security Testing",
            description: "Comprehensive performance and security testing",
            phase: "Testing",
            priority: "high",
            estimatedTime: "32h",
            tags: ["Performance", "Security", "Testing"],
            dependencies: ["beta-testing"],
            subtasks: [
              { title: "Load testing", completed: false },
              { title: "Security audit", completed: false },
              { title: "Performance optimization", completed: false }
            ]
          }
        ]
      },
      {
        name: "Deployment",
        description: "Product launch and go-to-market",
        color: "bg-red-500",
        tasks: [
          {
            id: "launch-strategy",
            title: "Go-to-Market Strategy Execution",
            description: "Execute comprehensive go-to-market strategy",
            phase: "Deployment",
            priority: "critical",
            estimatedTime: "40h",
            tags: ["Go-to-Market", "Strategy", "Launch"],
            dependencies: ["performance-testing"],
            subtasks: [
              { title: "Launch timeline", completed: false },
              { title: "Marketing campaign execution", completed: false },
              { title: "Sales enablement", completed: false },
              { title: "PR and media outreach", completed: false }
            ]
          },
          {
            id: "production-deployment",
            title: "Production Deployment",
            description: "Deploy product to production environment",
            phase: "Deployment",
            priority: "critical",
            estimatedTime: "24h",
            tags: ["Production", "Deployment", "Infrastructure"],
            dependencies: ["launch-strategy"],
            subtasks: [
              { title: "Production environment setup", completed: false },
              { title: "Application deployment", completed: false },
              { title: "Monitoring setup", completed: false },
              { title: "Launch verification", completed: false }
            ]
          },
          {
            id: "post-launch-support",
            title: "Post-Launch Support & Monitoring",
            description: "Provide ongoing support and monitor product performance",
            phase: "Deployment",
            priority: "high",
            estimatedTime: "80h",
            tags: ["Support", "Monitoring", "Maintenance"],
            dependencies: ["production-deployment"],
            subtasks: [
              { title: "Customer support setup", completed: false },
              { title: "Performance monitoring", completed: false },
              { title: "User feedback analysis", completed: false },
              { title: "Iterative improvements", completed: false }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "event-planning",
    name: "Event Planning",
    description: "Complete event planning and execution workflow",
    category: "Events",
    icon: "Calendar",
    estimatedDuration: "8-12 weeks",
    teamSize: "4-8 people",
    phases: [
      {
        name: "Planning",
        description: "Event concept and initial planning",
        color: "bg-blue-500",
        tasks: [
          {
            id: "event-concept",
            title: "Event Concept & Objectives",
            description: "Define event concept, objectives, and success metrics",
            phase: "Planning",
            priority: "critical",
            estimatedTime: "16h",
            tags: ["Concept", "Objectives", "Strategy"],
            subtasks: [
              { title: "Event purpose and goals", completed: false },
              { title: "Target audience definition", completed: false },
              { title: "Success metrics", completed: false },
              { title: "Budget framework", completed: false }
            ]
          },
          {
            id: "venue-selection",
            title: "Venue Research & Selection",
            description: "Research and select appropriate venue for the event",
            phase: "Planning",
            priority: "high",
            estimatedTime: "24h",
            tags: ["Venue", "Research", "Selection"],
            dependencies: ["event-concept"],
            subtasks: [
              { title: "Venue requirements", completed: false },
              { title: "Venue research", completed: false },
              { title: "Site visits", completed: false },
              { title: "Contract negotiation", completed: false }
            ]
          },
          {
            id: "event-timeline",
            title: "Event Timeline & Schedule",
            description: "Create detailed event timeline and schedule",
            phase: "Planning",
            priority: "high",
            estimatedTime: "12h",
            tags: ["Timeline", "Schedule", "Planning"],
            dependencies: ["venue-selection"],
            subtasks: [
              { title: "Event agenda", completed: false },
              { title: "Speaker schedule", completed: false },
              { title: "Activity timeline", completed: false }
            ]
          }
        ]
      },
      {
        name: "Design",
        description: "Event branding and promotional materials",
        color: "bg-purple-500",
        tasks: [
          {
            id: "event-branding",
            title: "Event Branding & Identity",
            description: "Create event brand identity and visual guidelines",
            phase: "Design",
            priority: "medium",
            estimatedTime: "20h",
            tags: ["Branding", "Identity", "Visual"],
            subtasks: [
              { title: "Logo design", completed: false },
              { title: "Color scheme", completed: false },
              { title: "Brand guidelines", completed: false }
            ]
          },
          {
            id: "promotional-materials",
            title: "Promotional Materials Design",
            description: "Design all promotional and marketing materials",
            phase: "Design",
            priority: "medium",
            estimatedTime: "30h",
            tags: ["Promotional", "Marketing", "Design"],
            dependencies: ["event-branding"],
            subtasks: [
              { title: "Event website design", completed: false },
              { title: "Social media graphics", completed: false },
              { title: "Print materials", completed: false },
              { title: "Signage design", completed: false }
            ]
          }
        ]
      },
      {
        name: "Development",
        description: "Event platform and registration setup",
        color: "bg-green-500",
        tasks: [
          {
            id: "registration-system",
            title: "Registration Platform Setup",
            description: "Set up online registration and ticketing system",
            phase: "Development",
            priority: "high",
            estimatedTime: "20h",
            tags: ["Registration", "Ticketing", "Platform"],
            subtasks: [
              { title: "Registration form", completed: false },
              { title: "Payment processing", completed: false },
              { title: "Confirmation emails", completed: false }
            ]
          },
          {
            id: "event-website",
            title: "Event Website Development",
            description: "Build comprehensive event website",
            phase: "Development",
            priority: "medium",
            estimatedTime: "32h",
            tags: ["Website", "Development", "Information"],
            dependencies: ["promotional-materials"],
            subtasks: [
              { title: "Website development", completed: false },
              { title: "Content management", completed: false },
              { title: "Mobile optimization", completed: false }
            ]
          }
        ]
      },
      {
        name: "Testing",
        description: "Event rehearsal and testing",
        color: "bg-orange-500",
        tasks: [
          {
            id: "technical-rehearsal",
            title: "Technical Rehearsal",
            description: "Conduct full technical rehearsal of all systems",
            phase: "Testing",
            priority: "high",
            estimatedTime: "16h",
            tags: ["Rehearsal", "Technical", "Testing"],
            dependencies: ["registration-system"],
            subtasks: [
              { title: "AV system testing", completed: false },
              { title: "Registration process testing", completed: false },
              { title: "Emergency procedures", completed: false }
            ]
          },
          {
            id: "final-preparations",
            title: "Final Event Preparations",
            description: "Complete all final preparations before event day",
            phase: "Testing",
            priority: "critical",
            estimatedTime: "24h",
            tags: ["Preparation", "Final Check", "Coordination"],
            dependencies: ["technical-rehearsal"],
            subtasks: [
              { title: "Staff briefing", completed: false },
              { title: "Supplier coordination", completed: false },
              { title: "Contingency planning", completed: false }
            ]
          }
        ]
      },
      {
        name: "Deployment",
        description: "Event execution and follow-up",
        color: "bg-red-500",
        tasks: [
          {
            id: "event-execution",
            title: "Event Day Execution",
            description: "Execute the event according to plan",
            phase: "Deployment",
            priority: "critical",
            estimatedTime: "12h",
            tags: ["Execution", "Event Day", "Management"],
            dependencies: ["final-preparations"],
            subtasks: [
              { title: "Setup supervision", completed: false },
              { title: "Event coordination", completed: false },
              { title: "Real-time problem solving", completed: false },
              { title: "Breakdown management", completed: false }
            ]
          },
          {
            id: "post-event-analysis",
            title: "Post-Event Analysis & Follow-up",
            description: "Analyze event success and conduct follow-up activities",
            phase: "Deployment",
            priority: "medium",
            estimatedTime: "16h",
            tags: ["Analysis", "Follow-up", "Reporting"],
            dependencies: ["event-execution"],
            subtasks: [
              { title: "Attendee feedback collection", completed: false },
              { title: "Event metrics analysis", completed: false },
              { title: "Thank you communications", completed: false },
              { title: "Final report", completed: false }
            ]
          }
        ]
      }
    ]
  }
];

export const getTemplatesByCategory = () => {
  const categories = [...new Set(projectTemplates.map(template => template.category))];
  return categories.reduce((acc, category) => {
    acc[category] = projectTemplates.filter(template => template.category === category);
    return acc;
  }, {} as Record<string, ProjectTemplate[]>);
};

export const getTemplateById = (id: string) => {
  return projectTemplates.find(template => template.id === id);
};