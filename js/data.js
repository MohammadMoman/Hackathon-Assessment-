// Defines app-wide constants, role/skill data, consultant seed lists, and fallback course links.
function skill(id, roleId, level, category, name, description) {
  return { id, roleId, level, category, name, description };
}

var STORAGE_KEY = "ten10-skills-matrix-v2";
var UI_STORAGE_KEY = "ten10-skills-matrix-ui-v1";
var AUTH_STORAGE_KEY = "ten10-skills-matrix-auth-v1";
var CONSULTANT_STORAGE_KEY = "ten10-skills-matrix-consultants-v1";
var ADMIN_TABS = ["overview", "consultants", "heatmap", "targets"];
var ADMIN_ACCOUNTS = [
  { id: "matt", name: "Matt McCormick", username: "matt.mccormick" },
  { id: "craig", name: "Craig Booth", username: "craig.booth" },
  { id: "callum", name: "Callum Prasser", username: "callum.prasser" },
  { id: "nuha", name: "Nuha AlShabi", username: "nuha.alshabi" }
];

var STATUS_LABELS = {
  "not-started": "Not Started",
  "in-progress": "In Progress",
  complete: "Complete"
};

var LEVELS = [
  { key: "level1", label: "Level 1: Foundational" },
  { key: "level2", label: "Level 2: Practitioner" },
  { key: "level3", label: "Level 3: Expert" }
];

var ROLES = {
  manualTester: {
    title: "Junior Manual Tester",
    summary: "Validates user journeys, documents defects, and protects release quality.",
    skills: [
      skill("mt-l1-1", "manualTester", "level1", "Test Fundamentals", "Testing mindset", "Understand why testing matters, what risk means, and how defects affect users."),
      skill("mt-l1-2", "manualTester", "level1", "Test Design", "Writing test cases", "Create clear test cases with steps, expected results, and acceptance criteria."),
      skill("mt-l1-3", "manualTester", "level1", "Tools", "Defect logging", "Log defects with useful titles, reproduction steps, evidence, severity, and priority."),
      skill("mt-l1-4", "manualTester", "level1", "Consultancy", "Clear status updates", "Explain testing progress and blockers in concise updates for a delivery team."),
      skill("mt-l2-1", "manualTester", "level2", "Test Design", "Exploratory testing", "Use charters and notes to investigate risk areas beyond scripted test cases."),
      skill("mt-l2-2", "manualTester", "level2", "Tools", "Jira workflow", "Manage test and defect workflow through a sprint board without losing traceability."),
      skill("mt-l2-3", "manualTester", "level2", "Quality Practice", "Regression planning", "Select high-value regression coverage based on recent change and business risk."),
      skill("mt-l2-4", "manualTester", "level2", "Data", "Test data preparation", "Prepare realistic test data while respecting privacy and environment constraints."),
      skill("mt-l3-1", "manualTester", "level3", "Strategy", "Risk-based testing", "Lead test prioritisation using business impact, probability, and confidence."),
      skill("mt-l3-2", "manualTester", "level3", "Leadership", "UAT coordination", "Support users through acceptance testing with clear evidence and issue triage."),
      skill("mt-l3-3", "manualTester", "level3", "Quality Practice", "Release readiness", "Advise whether a release is ready using evidence, risk, and known defects."),
      skill("mt-l3-4", "manualTester", "level3", "Consultancy", "Quality coaching", "Help a team improve test habits through practical coaching and examples.")
    ]
  },
  automationTester: {
    title: "Automation Tester",
    summary: "Builds repeatable checks that increase confidence and speed up delivery.",
    skills: [
      skill("at-l1-1", "automationTester", "level1", "Coding", "JavaScript basics", "Use variables, functions, arrays, and objects to write simple test logic."),
      skill("at-l1-2", "automationTester", "level1", "Automation", "Selector strategy", "Choose stable selectors that make browser tests less fragile."),
      skill("at-l1-3", "automationTester", "level1", "Tools", "Git basics", "Clone, branch, commit, and push test code safely."),
      skill("at-l1-4", "automationTester", "level1", "Testing", "Assertions", "Write clear assertions that prove the expected behaviour happened."),
      skill("at-l2-1", "automationTester", "level2", "Frameworks", "Playwright flows", "Automate meaningful user journeys with setup, actions, assertions, and cleanup."),
      skill("at-l2-2", "automationTester", "level2", "Maintenance", "Debugging flaky tests", "Investigate timing, data, and environment causes behind unreliable tests."),
      skill("at-l2-3", "automationTester", "level2", "API Testing", "API checks", "Validate API responses, status codes, and payload fields as part of test coverage."),
      skill("at-l2-4", "automationTester", "level2", "CI", "Pipeline test runs", "Run automated tests in a delivery pipeline and interpret failures."),
      skill("at-l3-1", "automationTester", "level3", "Strategy", "Automation pyramid", "Choose the right mix of unit, API, integration, and UI tests."),
      skill("at-l3-2", "automationTester", "level3", "Architecture", "Framework design", "Design reusable helpers and fixtures without hiding important test intent."),
      skill("at-l3-3", "automationTester", "level3", "Reporting", "Quality dashboards", "Turn automated results into useful confidence signals for stakeholders."),
      skill("at-l3-4", "automationTester", "level3", "Coaching", "Test code reviews", "Review automation pull requests for readability, coverage, and maintainability.")
    ]
  },
  javaDeveloper: {
    title: "Java Developer",
    summary: "Builds reliable services with clean code, tests, and delivery awareness.",
    skills: [
      skill("jd-l1-1", "javaDeveloper", "level1", "Java", "Core syntax", "Use classes, methods, collections, loops, and exceptions in simple programs."),
      skill("jd-l1-2", "javaDeveloper", "level1", "Testing", "Unit tests", "Write focused unit tests for business logic using clear arrange, act, assert steps."),
      skill("jd-l1-3", "javaDeveloper", "level1", "Tools", "Git collaboration", "Work on branches, resolve simple conflicts, and explain commit history."),
      skill("jd-l1-4", "javaDeveloper", "level1", "Web", "HTTP basics", "Understand requests, responses, status codes, and JSON payloads."),
      skill("jd-l2-1", "javaDeveloper", "level2", "Spring", "REST controllers", "Create REST endpoints with validation, error responses, and simple routing."),
      skill("jd-l2-2", "javaDeveloper", "level2", "Data", "SQL queries", "Read and write relational data with joins, filtering, and ordering."),
      skill("jd-l2-3", "javaDeveloper", "level2", "Design", "Service layer design", "Separate controllers, services, and repositories with clear responsibilities."),
      skill("jd-l2-4", "javaDeveloper", "level2", "Testing", "Integration tests", "Test service behaviour across API and data boundaries."),
      skill("jd-l3-1", "javaDeveloper", "level3", "Architecture", "API design", "Design consistent endpoints, error shapes, and versioning for consumers."),
      skill("jd-l3-2", "javaDeveloper", "level3", "Performance", "Query optimisation", "Identify slow queries and improve them using indexes and better access patterns."),
      skill("jd-l3-3", "javaDeveloper", "level3", "Security", "Secure coding", "Handle authentication, authorisation, secrets, and validation responsibly."),
      skill("jd-l3-4", "javaDeveloper", "level3", "Leadership", "Technical mentoring", "Guide junior developers through code reviews and design tradeoffs.")
    ]
  },
  businessAnalyst: {
    title: "Business Analyst",
    summary: "Turns business needs into clear requirements, decisions, and delivery alignment.",
    skills: [
      skill("ba-l1-1", "businessAnalyst", "level1", "Discovery", "Stakeholder interviews", "Ask structured questions to uncover needs, constraints, and success measures."),
      skill("ba-l1-2", "businessAnalyst", "level1", "Requirements", "User stories", "Write user stories with clear acceptance criteria and business value."),
      skill("ba-l1-3", "businessAnalyst", "level1", "Process", "Process mapping", "Map current and future workflows in a way teams can validate."),
      skill("ba-l1-4", "businessAnalyst", "level1", "Consultancy", "Workshop notes", "Capture decisions, actions, risks, and assumptions after a meeting."),
      skill("ba-l2-1", "businessAnalyst", "level2", "Discovery", "Facilitation", "Run workshops that keep stakeholders focused and produce decisions."),
      skill("ba-l2-2", "businessAnalyst", "level2", "Requirements", "Backlog refinement", "Split work into valuable, testable items with clear priority."),
      skill("ba-l2-3", "businessAnalyst", "level2", "Data", "Data requirements", "Define fields, rules, ownership, and reporting needs for a feature."),
      skill("ba-l2-4", "businessAnalyst", "level2", "Delivery", "Change impact", "Assess who and what is affected by a proposed change."),
      skill("ba-l3-1", "businessAnalyst", "level3", "Strategy", "Product outcomes", "Connect delivery decisions to measurable business outcomes."),
      skill("ba-l3-2", "businessAnalyst", "level3", "Leadership", "Conflict resolution", "Resolve competing stakeholder needs using evidence and facilitation."),
      skill("ba-l3-3", "businessAnalyst", "level3", "Governance", "Traceability", "Maintain a clear link from business goals to requirements and tests."),
      skill("ba-l3-4", "businessAnalyst", "level3", "Consultancy", "Executive storytelling", "Explain complex delivery options to senior stakeholders clearly.")
    ]
  },
  projectManager: {
    title: "Project Manager",
    summary: "Plans delivery, manages risks, coordinates teams, and keeps stakeholders aligned.",
    skills: [
      skill("pm-l1-1", "projectManager", "level1", "Delivery", "Project lifecycle", "Understand initiation, planning, delivery, monitoring, and closure activities."),
      skill("pm-l1-2", "projectManager", "level1", "Planning", "Work breakdown", "Break project outcomes into manageable activities, milestones, and dependencies."),
      skill("pm-l1-3", "projectManager", "level1", "Governance", "RAID logs", "Capture risks, assumptions, issues, and dependencies with clear owners and actions."),
      skill("pm-l1-4", "projectManager", "level1", "Communication", "Status reporting", "Create concise status updates that show progress, blockers, and next steps."),
      skill("pm-l2-1", "projectManager", "level2", "Planning", "Schedule management", "Build and maintain delivery plans that respond to change and team capacity."),
      skill("pm-l2-2", "projectManager", "level2", "Risk", "Risk management", "Assess probability, impact, mitigation, ownership, and escalation paths."),
      skill("pm-l2-3", "projectManager", "level2", "Stakeholders", "Stakeholder engagement", "Map stakeholder needs and keep decision-makers aligned through delivery."),
      skill("pm-l2-4", "projectManager", "level2", "Finance", "Budget tracking", "Track effort, spend, forecast, and commercial impact against a delivery plan."),
      skill("pm-l3-1", "projectManager", "level3", "Leadership", "Delivery leadership", "Lead cross-functional teams through ambiguity, tradeoffs, and changing priorities."),
      skill("pm-l3-2", "projectManager", "level3", "Governance", "Steering forums", "Run governance forums with clear decisions, escalations, and accountability."),
      skill("pm-l3-3", "projectManager", "level3", "Recovery", "Project recovery", "Stabilise challenged delivery using evidence, replanning, and stakeholder alignment."),
      skill("pm-l3-4", "projectManager", "level3", "Consultancy", "Client confidence", "Build trust by communicating options, risks, and delivery consequences clearly.")
    ]
  },
  serviceDeskAnalyst: {
    title: "Service Desk Analyst",
    summary: "Supports users, triages incidents, handles requests, and protects service quality.",
    skills: [
      skill("sd-l1-1", "serviceDeskAnalyst", "level1", "Support", "Ticket handling", "Log, categorise, prioritise, and update tickets with clear customer-facing notes."),
      skill("sd-l1-2", "serviceDeskAnalyst", "level1", "Communication", "Customer communication", "Communicate calmly and clearly with users during support interactions."),
      skill("sd-l1-3", "serviceDeskAnalyst", "level1", "Troubleshooting", "Basic diagnosis", "Use structured questions and evidence to narrow down common technical issues."),
      skill("sd-l1-4", "serviceDeskAnalyst", "level1", "Knowledge", "Knowledge base use", "Find, follow, and improve support articles and standard operating procedures."),
      skill("sd-l2-1", "serviceDeskAnalyst", "level2", "ITSM", "Incident management", "Restore service quickly while capturing impact, urgency, and resolution evidence."),
      skill("sd-l2-2", "serviceDeskAnalyst", "level2", "Requests", "Request fulfilment", "Handle access, software, hardware, and service requests within agreed processes."),
      skill("sd-l2-3", "serviceDeskAnalyst", "level2", "Tools", "Remote support tools", "Use remote support tooling safely to inspect, diagnose, and resolve user issues."),
      skill("sd-l2-4", "serviceDeskAnalyst", "level2", "Escalation", "Major incident escalation", "Escalate high-impact issues with the right evidence and communication rhythm."),
      skill("sd-l3-1", "serviceDeskAnalyst", "level3", "Problem", "Problem management", "Identify recurring incidents and contribute evidence to root cause analysis."),
      skill("sd-l3-2", "serviceDeskAnalyst", "level3", "Reporting", "Service metrics", "Interpret SLA, backlog, first-contact resolution, and customer satisfaction trends."),
      skill("sd-l3-3", "serviceDeskAnalyst", "level3", "Coaching", "Shift-left support", "Improve self-service and first-line resolution through coaching and knowledge articles."),
      skill("sd-l3-4", "serviceDeskAnalyst", "level3", "Quality", "Service improvement", "Suggest practical changes that reduce repeat contacts and improve user experience.")
    ]
  },
  softwareTester: {
    title: "Software Tester",
    summary: "Applies structured testing, evidence, and automation awareness to improve product quality.",
    skills: [
      skill("st-l1-1", "softwareTester", "level1", "Testing", "Testing principles", "Explain test levels, test types, defect lifecycle, and quality risk."),
      skill("st-l1-2", "softwareTester", "level1", "Design", "Test scenarios", "Create scenarios and test cases from requirements, acceptance criteria, and risk."),
      skill("st-l1-3", "softwareTester", "level1", "Execution", "Test execution", "Run tests carefully, capture evidence, and report actual versus expected results."),
      skill("st-l1-4", "softwareTester", "level1", "Defects", "Defect reports", "Raise useful defects with steps, evidence, severity, priority, and environment details."),
      skill("st-l2-1", "softwareTester", "level2", "Exploration", "Exploratory testing", "Use charters, notes, and heuristics to investigate product risk beyond scripts."),
      skill("st-l2-2", "softwareTester", "level2", "API", "API test basics", "Validate API responses, payload fields, errors, and simple data flows."),
      skill("st-l2-3", "softwareTester", "level2", "Regression", "Regression selection", "Choose high-value regression checks based on change, risk, and impact."),
      skill("st-l2-4", "softwareTester", "level2", "Agile", "Agile quality", "Contribute quality thinking during refinement, planning, demos, and retrospectives."),
      skill("st-l3-1", "softwareTester", "level3", "Strategy", "Test strategy", "Shape a pragmatic test approach for scope, risk, environments, and evidence."),
      skill("st-l3-2", "softwareTester", "level3", "Automation", "Automation awareness", "Identify where automated checks add value and where manual testing is better."),
      skill("st-l3-3", "softwareTester", "level3", "Data", "Complex test data", "Plan and manage data needs for integrated, edge-case, and privacy-aware testing."),
      skill("st-l3-4", "softwareTester", "level3", "Leadership", "Quality advocacy", "Coach teams to improve testability, acceptance criteria, and release confidence.")
    ]
  },
  rpaAnalyst: {
    title: "RPA Analyst",
    summary: "Identifies, documents, and improves automation opportunities across business processes.",
    skills: [
      skill("rpa-l1-1", "rpaAnalyst", "level1", "Discovery", "Process discovery", "Identify repetitive, rule-based tasks that may be suitable for automation."),
      skill("rpa-l1-2", "rpaAnalyst", "level1", "Documentation", "Process definition", "Document current steps, inputs, outputs, systems, exceptions, and owners."),
      skill("rpa-l1-3", "rpaAnalyst", "level1", "Data", "Structured data", "Recognise structured inputs and data rules that automation can reliably use."),
      skill("rpa-l1-4", "rpaAnalyst", "level1", "Tools", "RPA concepts", "Explain bots, queues, triggers, selectors, credentials, and attended versus unattended automation."),
      skill("rpa-l2-1", "rpaAnalyst", "level2", "Analysis", "Automation assessment", "Assess feasibility, complexity, stability, volume, benefits, and operational risk."),
      skill("rpa-l2-2", "rpaAnalyst", "level2", "Requirements", "PDD creation", "Create process definition documents with clear rules, exceptions, and test cases."),
      skill("rpa-l2-3", "rpaAnalyst", "level2", "Testing", "Bot acceptance testing", "Validate automated processes using business scenarios, exceptions, and evidence."),
      skill("rpa-l2-4", "rpaAnalyst", "level2", "Change", "Operational handover", "Prepare support, monitoring, controls, and handover material for live automations."),
      skill("rpa-l3-1", "rpaAnalyst", "level3", "Optimisation", "Process improvement", "Improve processes before automation to remove waste, variation, and failure points."),
      skill("rpa-l3-2", "rpaAnalyst", "level3", "Governance", "Automation governance", "Apply governance for prioritisation, security, compliance, reuse, and supportability."),
      skill("rpa-l3-3", "rpaAnalyst", "level3", "Benefits", "Benefits tracking", "Measure time saved, quality improvements, risk reduction, and adoption outcomes."),
      skill("rpa-l3-4", "rpaAnalyst", "level3", "Stakeholders", "Automation storytelling", "Explain automation options, constraints, and value to business stakeholders.")
    ]
  },
  devopsEngineer: {
    title: "DevOps Engineer",
    summary: "Improves delivery flow through automation, environments, reliability, and observability.",
    skills: [
      skill("do-l1-1", "devopsEngineer", "level1", "Cloud", "Cloud fundamentals", "Understand compute, storage, networking, and identity at a beginner level."),
      skill("do-l1-2", "devopsEngineer", "level1", "Linux", "Command line basics", "Navigate files, inspect processes, and run simple commands safely."),
      skill("do-l1-3", "devopsEngineer", "level1", "CI/CD", "Pipeline basics", "Understand build, test, package, and deploy stages in a pipeline."),
      skill("do-l1-4", "devopsEngineer", "level1", "Scripting", "Shell scripting", "Write simple scripts to automate repeated environment tasks."),
      skill("do-l2-1", "devopsEngineer", "level2", "Infrastructure", "Infrastructure as code", "Describe infrastructure changes in code and review them safely."),
      skill("do-l2-2", "devopsEngineer", "level2", "Containers", "Docker images", "Build and run containers with clear configuration and logs."),
      skill("do-l2-3", "devopsEngineer", "level2", "Observability", "Logging and metrics", "Use logs and basic metrics to understand service behaviour."),
      skill("do-l2-4", "devopsEngineer", "level2", "Security", "Secrets handling", "Store and pass secrets without exposing them in code or logs."),
      skill("do-l3-1", "devopsEngineer", "level3", "Reliability", "Incident response", "Triage incidents, communicate status, and capture follow-up actions."),
      skill("do-l3-2", "devopsEngineer", "level3", "Platform", "Deployment strategy", "Choose safe deployment patterns such as blue-green or canary releases."),
      skill("do-l3-3", "devopsEngineer", "level3", "Architecture", "Scalable environments", "Design repeatable environments that support teams without manual drift."),
      skill("do-l3-4", "devopsEngineer", "level3", "Coaching", "DevOps culture", "Help teams improve collaboration across development, testing, and operations.")
    ]
  }
  ,
  cyberSecurityAnalyst: {
    title: "Cyber Security Analyst",
    summary: "Monitors security signals, triages incidents, and reduces organisational risk.",
    skills: [
      // Level 1
      skill("csa-l1-1", "cyberSecurityAnalyst", "level1", "Networking", "Foundational networking", "Understand basic networking concepts: IP, DNS, ports, routing, and common protocols."),
      skill("csa-l1-2", "cyberSecurityAnalyst", "level1", "Identity", "Identity & access management", "Explain authentication vs authorisation and apply basic IAM controls."),
      skill("csa-l1-3", "cyberSecurityAnalyst", "level1", "Incident", "Basic incident reporting", "Capture clear incident summaries, evidence, impact, and next steps for stakeholders."),
      skill("csa-l1-4", "cyberSecurityAnalyst", "level1", "Vulnerability", "Vulnerability scanning", "Run simple scans and interpret basic findings from common tools."),

      // Level 2
      skill("csa-l2-1", "cyberSecurityAnalyst", "level2", "Investigation", "Advanced incident investigation & threat hunting", "Perform advanced incident investigations and hypothesis-driven threat hunting."),
      skill("csa-l2-2", "cyberSecurityAnalyst", "level2", "Cloud", "Cloud security implementation", "Apply security controls and hardening in cloud environments."),
      skill("csa-l2-3", "cyberSecurityAnalyst", "level2", "Vulnerability", "Vulnerability management & remediation", "Run vulnerability scans, interpret results, and coordinate remediation."),
      skill("csa-l2-4", "cyberSecurityAnalyst", "level2", "Automation", "Security automation", "Automate repetitive security tasks to reduce manual effort and improve response time."),
      skill("csa-l2-5", "cyberSecurityAnalyst", "level2", "Governance", "Compliance & framework knowledge", "Apply common security frameworks and compliance requirements to controls and processes."),

      // Level 3
      skill("csa-l3-1", "cyberSecurityAnalyst", "level3", "Architecture", "Security architecture & design", "Design secure architectures and justify security trade-offs for systems and services."),
      skill("csa-l3-2", "cyberSecurityAnalyst", "level3", "Forensics", "Crisis management & forensic leadership", "Lead forensic investigations and manage crisis communication and response."),
      skill("csa-l3-3", "cyberSecurityAnalyst", "level3", "Threat", "Threat modelling & risk assessment", "Conduct threat modelling and risk assessments to inform mitigations."),
      skill("csa-l3-4", "cyberSecurityAnalyst", "level3", "DevSecOps", "DevSecOps integration", "Integrate security into CI/CD and development practices to shift-left security."),
      skill("csa-l3-5", "cyberSecurityAnalyst", "level3", "Leadership", "Mentorship & stakeholder management", "Mentor junior practitioners and manage stakeholder communications for security initiatives.")
    ]
  }
};

var CONSULTANTS = [
  { id: "aisha", name: "Aisha Khan", roleId: "manualTester" },
  { id: "omar", name: "Omar Williams", roleId: "manualTester" },
  { id: "ben", name: "Ben Taylor", roleId: "javaDeveloper" },
  { id: "maya", name: "Maya Patel", roleId: "automationTester" },
  { id: "priya", name: "Priya Shah", roleId: "automationTester" },
  { id: "lewis", name: "Lewis Carter", roleId: "businessAnalyst" },
  { id: "niamh", name: "Niamh O'Connor", roleId: "businessAnalyst" },
  { id: "amelia", name: "Amelia Brooks", roleId: "businessAnalyst" },
  { id: "george", name: "George Miller", roleId: "projectManager" },
  { id: "fatima", name: "Fatima Ahmed", roleId: "projectManager" },
  { id: "ella", name: "Ella Thompson", roleId: "serviceDeskAnalyst" },
  { id: "james", name: "James Wilson", roleId: "serviceDeskAnalyst" },
  { id: "sam", name: "Sam Roberts", roleId: "softwareTester" },
  { id: "chloe", name: "Chloe Evans", roleId: "softwareTester" },
  { id: "harry", name: "Harry Singh", roleId: "rpaAnalyst" },
  { id: "isla", name: "Isla Morgan", roleId: "rpaAnalyst" },
  { id: "yasmin", name: "Yasmin Ali", roleId: "cyberSecurityAnalyst" },
  { id: "noah", name: "Noah Clarke", roleId: "cyberSecurityAnalyst" },
  { id: "sophia", name: "Sophia Green", roleId: "devopsEngineer" },
  { id: "ethan", name: "Ethan Brooks", roleId: "devopsEngineer" },
  { id: "daniel", name: "Daniel Hughes", roleId: "javaDeveloper" }
];

var FALLBACK_COURSES = {};
Object.values(ROLES).forEach(role => {
  role.skills.forEach(item => {
    FALLBACK_COURSES[item.id] = [
      {
        title: `${item.name} essentials`,
        provider: "Mock Learning",
        url: "https://example.com/mock-course"
      },
      {
        title: `${item.category} reference guide`,
        provider: "Documentation",
        url: "https://example.com/mock-docs"
      }
    ];
  });
});

var courseData = FALLBACK_COURSES;

// Add specific Learning Bridge resources for Cyber Security Analyst skills
FALLBACK_COURSES["csa-l2-1"] = [
  { title: "Advanced Incident Investigation & Threat Hunting - Chris Sanders", provider: "Chris Sanders", url: "https://chrissanders.org/training/" },
  { title: "Blue Team Labs Online", provider: "Cyber Defenders", url: "https://cyberdefenders.org/blue-team-labs/" }
];
// add additional monitoring resources
FALLBACK_COURSES["csa-l2-1"].push(
  { title: "BlueTeamLabs Online (alternate)", provider: "Blue Team Labs", url: "https://blueteamlabs.online/" },
  { title: "LetsDefend", provider: "LetsDefend", url: "https://letsdefend.io/" }
);
FALLBACK_COURSES["csa-l2-2"] = [
  { title: "Cloud Security Training", provider: "Cloud Lee", url: "https://learn.cloudlee.io/" },
  { title: "Cloud Native & Security Writing", provider: "Brendan Cantrill", url: "https://cantrill.io/" }
];
FALLBACK_COURSES["csa-l2-3"] = [
  { title: "Web Security Academy", provider: "PortSwigger", url: "https://portswigger.net/web-security" }
];
FALLBACK_COURSES["csa-l2-4"] = [
  { title: "Automate the Boring Stuff", provider: "Al Sweigart", url: "https://automatetheboringstuff.com/" }
];
FALLBACK_COURSES["csa-l2-5"] = [
  { title: "NIST Cybersecurity Framework", provider: "NIST", url: "https://www.nist.gov/cyberframework" }
];

FALLBACK_COURSES["csa-l3-1"] = [
  { title: "CISSP Certification", provider: "(ISC)²", url: "https://www.isc2.org/Certifications/CISSP" }
];
FALLBACK_COURSES["csa-l3-2"] = [
  { title: "Defensible Security Architecture", provider: "SANS", url: "https://www.sans.org/cyber-security-courses/defensible-security-architecture-and-engineering" }
];
FALLBACK_COURSES["csa-l3-3"] = [
  { title: "Threat Modeling: Designing for Security", provider: "Adam Shostack", url: "https://shostack.org/books/threat-modeling-book" }
];
FALLBACK_COURSES["csa-l3-4"] = [
  { title: "Practical DevSecOps", provider: "Practical DevSecOps", url: "https://www.practical-devsecops.com/" }
];
FALLBACK_COURSES["csa-l3-5"] = [
  { title: "Stakeholder Management Courses", provider: "Coursera", url: "https://www.coursera.org/courses?query=stakeholder%20management" },
  { title: "Professional Certificate in Stakeholder Engagement", provider: "BCS", url: "https://www.bcs.org/qualifications-and-certifications/certifications-for-professionals/business-analysis/professional-certificate-in-stakeholder-engagement/" }
];
// Stage 1 Learning Bridge links for Cyber Security Analyst
FALLBACK_COURSES["csa-l1-1"] = [
  { title: "Foundational Networking (YouTube)", provider: "YouTube", url: "https://www.youtube.com/watch?v=xmd-jHaqcH8" }
];
FALLBACK_COURSES["csa-l1-2"] = [
  { title: "Security, Compliance, and Identity Fundamentals", provider: "Microsoft Learn", url: "https://learn.microsoft.com/en-us/credentials/certifications/security-compliance-and-identity-fundamentals/?practice-assessment-type=certification" }
];
FALLBACK_COURSES["csa-l1-3"] = [
  { title: "SOC Level 1 Path", provider: "TryHackMe", url: "https://tryhackme.com/path/outline/soclevel1" }
];
FALLBACK_COURSES["csa-l1-4"] = [
  { title: "Tenable Training & Education", provider: "Tenable", url: "https://www.tenable.com/education" }
];
