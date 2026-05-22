const STORAGE_KEY = "ten10-skills-matrix-v1";
const UI_STORAGE_KEY = "ten10-skills-matrix-ui-v1";
const AUTH_STORAGE_KEY = "ten10-skills-matrix-auth-v1";
const ADMIN_TABS = ["overview", "consultants", "heatmap", "targets"];
const ADMIN_ACCOUNTS = [
  { id: "matt", name: "Matt McCormick", username: "matt.mccormick" },
  { id: "craig", name: "Craig Booth", username: "craig.booth" },
  { id: "callum", name: "Callum Prasser", username: "callum.prasser" },
  { id: "nuha", name: "Nuha AlShabi", username: "nuha.alshabi" }
];

const STATUS_LABELS = {
  "not-started": "Not Started",
  "in-progress": "In Progress",
  complete: "Complete"
};

const LEVELS = [
  { key: "level1", label: "Level 1: Foundational" },
  { key: "level2", label: "Level 2: Practitioner" },
  { key: "level3", label: "Level 3: Expert" }
];

const ROLES = {
  manualTester: {
    title: "Software Developer",
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
  dataAnalyst: {
    title: "Data Analyst",
    summary: "Extracts insights from data to drive decision-making and business value.",
    skills: [
      skill("da-l1-1", "dataAnalyst", "level1", "Data Literacy", "Data types & structures", "Understand different data types, structures, and how data is stored in systems."),
      skill("da-l1-2", "dataAnalyst", "level1", "Tools", "Excel fundamentals", "Use formulas, pivot tables, and basic charts to analyze small datasets."),
      skill("da-l1-3", "dataAnalyst", "level1", "SQL", "SQL basics", "Write SELECT statements with WHERE, ORDER BY, and basic joins."),
      skill("da-l1-4", "dataAnalyst", "level1", "Visualization", "Chart selection", "Choose the right chart type for the data and the question being asked."),
      skill("da-l2-1", "dataAnalyst", "level2", "SQL", "Complex queries", "Use aggregations, subqueries, and window functions to answer complex business questions."),
      skill("da-l2-2", "dataAnalyst", "level2", "Programming", "Python for data", "Use libraries like Pandas and Matplotlib for data manipulation and visualization."),
      skill("da-l2-3", "dataAnalyst", "level2", "BI Tools", "Dashboard design", "Create interactive dashboards in tools like Power BI or Tableau with clear UX."),
      skill("da-l2-4", "dataAnalyst", "level2", "Data Quality", "Data cleaning", "Identify and handle missing values, duplicates, and outliers in datasets."),
      skill("da-l3-1", "dataAnalyst", "level3", "Statistics", "Statistical modeling", "Apply hypothesis testing and regression analysis to identify trends and patterns."),
      skill("da-l3-2", "dataAnalyst", "level3", "Strategy", "Data storytelling", "Translate technical findings into compelling narratives for non-technical stakeholders."),
      skill("da-l3-3", "dataAnalyst", "level3", "Engineering", "Data pipelines", "Understand ETL/ELT processes and how to automate data movement and transformation."),
      skill("da-l3-4", "dataAnalyst", "level3", "Leadership", "Insight advocacy", "Influence business strategy by presenting data-driven recommendations to leadership.")
    ]
  },
  dataEngineer: {
    title: "Data Engineer",
    summary: "Builds and maintains the systems that allow data to be collected, stored, and analyzed.",
    skills: [
      skill("de-l1-1", "dataEngineer", "level1", "SQL", "SQL for Engineering", "Write complex queries using CTEs, window functions, and performance-tuned joins."),
      skill("de-l1-2", "dataEngineer", "level1", "Programming", "Python for Engineering", "Develop modular Python scripts for data extraction and automation."),
      skill("de-l1-3", "dataEngineer", "level1", "Architecture", "Warehousing concepts", "Understand OLTP vs OLAP, Star Schemas, and Fact/Dimension tables."),
      skill("de-l1-4", "dataEngineer", "level1", "Tools", "Git for Data", "Use version control to manage SQL scripts and pipeline code collaboratively."),
      skill("de-l2-1", "dataEngineer", "level2", "Orchestration", "Pipeline automation", "Schedule and manage workflows using tools like Apache Airflow or dbt."),
      skill("de-l2-2", "dataEngineer", "level2", "Big Data", "Distributed processing", "Process large-scale datasets using Spark or Databricks efficiently."),
      skill("de-l2-3", "dataEngineer", "level2", "Data Modeling", "Dimensional modeling", "Design robust schemas using Kimball or Data Vault methodologies."),
      skill("de-l2-4", "dataEngineer", "level2", "Platforms", "Cloud data stacks", "Configure and optimize cloud data warehouses like Snowflake, BigQuery, or Redshift."),
      skill("de-l3-1", "dataEngineer", "level3", "Streaming", "Real-time processing", "Design and maintain streaming architectures using Kafka or Flink."),
      skill("de-l3-2", "dataEngineer", "level3", "DevOps", "Data Infrastructure", "Manage data infrastructure as code using Terraform or CloudFormation."),
      skill("de-l3-3", "dataEngineer", "level3", "Quality", "Data observability", "Implement automated testing and monitoring for data health and reliability."),
      skill("de-l3-4", "dataEngineer", "level3", "Strategy", "Data Architecture", "Define architectural patterns like Data Mesh or Lakehouse for organizational scalability.")
    ]
  },
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

const CONSULTANTS = [
  { id: "aisha", name: "Aisha Khan", roleId: "manualTester" },
  { id: "omar", name: "Omar Williams", roleId: "manualTester" },
  { id: "ben", name: "Ben Taylor", roleId: "javaDeveloper" },
  { id: "maya", name: "Maya Patel", roleId: "automationTester" },
  { id: "priya", name: "Priya Shah", roleId: "automationTester" },
  { id: "lewis", name: "Lewis Carter", roleId: "businessAnalyst" },
  { id: "niamh", name: "Niamh O'Connor", roleId: "businessAnalyst" },
  { id: "sophia", name: "Sophia Green", roleId: "devopsEngineer" },
  { id: "ethan", name: "Ethan Brooks", roleId: "devopsEngineer" },
  { id: "daniel", name: "Daniel Hughes", roleId: "javaDeveloper" },
  { id: "max", name: "Max Turner", roleId: "dataAnalyst" },
  { id: "lily", name: "Lily Wong", roleId: "dataAnalyst" },
  { id: "zoe", name: "Zoe Chen", roleId: "dataEngineer" },
  { id: "leo", name: "Leo Garcia", roleId: "dataEngineer" }
];

const FALLBACK_COURSES = {};
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

let courseData = FALLBACK_COURSES;

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

// Data Analyst Learning Bridge links
FALLBACK_COURSES["da-l1-1"] = [{ title: "Data Literacy Fundamentals", provider: "LinkedIn Learning", url: "https://www.linkedin.com/learning/data-fluency-exploring-and-describing-data" }];
FALLBACK_COURSES["da-l1-2"] = [{ title: "Excel for Data Analysis", provider: "Microsoft Learn", url: "https://learn.microsoft.com/en-us/training/paths/modern-analyze-data-excel/" }];
FALLBACK_COURSES["da-l1-3"] = [{ title: "SQL for Data Science", provider: "Coursera", url: "https://www.coursera.org/learn/sql-for-data-science" }];
FALLBACK_COURSES["da-l1-4"] = [{ title: "Storytelling with Data", provider: "SWD", url: "https://www.storytellingwithdata.com/books" }];

FALLBACK_COURSES["da-l2-1"] = [
  { title: "Advanced SQL Tutorials", provider: "Mode Analytics", url: "https://mode.com/sql-tutorial/introduction-to-advanced-sql/" },
  { title: "Window Functions Guide", provider: "PostgreSQL", url: "https://www.postgresql.org/docs/current/tutorial-window.html" }
];
FALLBACK_COURSES["da-l2-2"] = [
  { title: "Pandas for Data Analysis", provider: "Real Python", url: "https://realpython.com/pandas-python-explore-dataset/" },
  { title: "Python Data Science Handbook", provider: "Jake VanderPlas", url: "https://jakevdp.github.io/PythonDataScienceHandbook/" }
];
FALLBACK_COURSES["da-l2-3"] = [
  { title: "Power BI Training", provider: "Microsoft", url: "https://learn.microsoft.com/en-us/training/powerplatform/power-bi" },
  { title: "Tableau Public Training", provider: "Tableau", url: "https://public.tableau.com/en-us/s/resources" }
];
FALLBACK_COURSES["da-l2-4"] = [{ title: "Data Cleaning Course", provider: "Kaggle", url: "https://www.kaggle.com/learn/data-cleaning" }];

FALLBACK_COURSES["da-l3-1"] = [
  { title: "Statistics and Probability", provider: "Khan Academy", url: "https://www.khanacademy.org/math/statistics-probability" },
  { title: "Introduction to Statistical Learning", provider: "StatLearning", url: "https://www.statlearning.com/" }
];
FALLBACK_COURSES["da-l3-2"] = [
  { title: "Effective Data Storytelling", provider: "Brent Dykes", url: "https://www.effectivedatastorytelling.com/" },
  { title: "Narrative Science", provider: "Tableau", url: "https://www.tableau.com/learn/articles/data-storytelling" }
];
FALLBACK_COURSES["da-l3-3"] = [
  { title: "Data Engineering Foundations", provider: "Google Cloud", url: "https://www.cloudskillsboost.google/course_templates/3" },
  { title: "ETL Best Practices", provider: "AWS", url: "https://docs.aws.amazon.com/glue/latest/dg/aws-glue-programming-etl-libraries.html" }
];
FALLBACK_COURSES["da-l3-4"] = [
  { title: "Data Science Leadership", provider: "HBR", url: "https://hbr.org/2018/11/what-data-scientists-really-do" },
  { title: "Leading with Data", provider: "Coursera", url: "https://www.coursera.org/learn/leading-with-data" }
];

// Data Engineer Learning Bridge links
FALLBACK_COURSES["de-l1-1"] = [{ title: "Advanced SQL for Data Engineers", provider: "LinkedIn Learning", url: "https://www.linkedin.com/learning/advanced-sql-for-data-scientists" }];
FALLBACK_COURSES["de-l1-2"] = [{ title: "Python for Data Engineering", provider: "DataCamp", url: "https://www.datacamp.com/tracks/data-engineer-with-python" }];
FALLBACK_COURSES["de-l1-3"] = [{ title: "Data Warehouse Fundamentals", provider: "Coursera", url: "https://www.coursera.org/learn/data-warehousing" }];
FALLBACK_COURSES["de-l1-4"] = [{ title: "Git for Data Teams", provider: "GitLab", url: "https://about.gitlab.com/topics/version-control/" }];

FALLBACK_COURSES["de-l2-1"] = [{ title: "Modern Data Orchestration with Airflow", provider: "Astronomer", url: "https://www.astronomer.io/academy/" }];
FALLBACK_COURSES["de-l2-2"] = [{ title: "Spark and Python for Big Data", provider: "Udemy", url: "https://www.udemy.com/course/spark-and-python-for-big-data-with-pyspark/" }];
FALLBACK_COURSES["de-l2-3"] = [{ title: "Data Modeling for Data Warehouses", provider: "Kimball Group", url: "https://www.kimballgroup.com/data-warehouse-business-intelligence-resources/" }];
FALLBACK_COURSES["de-l2-4"] = [{ title: "Snowflake Cloud Data Platform", provider: "Snowflake", url: "https://quickstarts.snowflake.com/" }];

FALLBACK_COURSES["de-l3-1"] = [{ title: "Kafka: The Definitive Guide", provider: "Confluent", url: "https://www.confluent.io/resources/kafka-the-definitive-guide/" }];
FALLBACK_COURSES["de-l3-2"] = [{ title: "Infrastructure as Code for Data", provider: "Terraform", url: "https://registry.terraform.io/modules/terraform-google-modules/sql-db/google/latest" }];
FALLBACK_COURSES["de-l3-3"] = [{ title: "Introduction to Data Quality", provider: "Great Expectations", url: "https://docs.greatexpectations.io/docs/tutorials/getting_started/tutorial_overview" }];
FALLBACK_COURSES["de-l3-4"] = [{ title: "Data Mesh Principles", provider: "Martin Fowler", url: "https://martinfowler.com/articles/data-mesh-principles.html" }];

let appData = createSeedData();
let authData = loadAuthData();
let activeView = "login";
let activeConsultantId = CONSULTANTS[0].id;
let selectedRoleId = null;
let selectedAdminTab = "overview";
let adminDrilldownId = null;
let comparisonRoleId = getDefaultComparisonRoleId();
let comparisonConsultantIds = getDefaultComparisonPair(comparisonRoleId);
let consultantSearchQuery = "";
let activeSession = null;
let charts = [];

const app = document.getElementById("app");
const logoutButton = document.getElementById("logoutButton");
const resetDemoButton = document.getElementById("resetDemo");
const themeToggleButton = document.getElementById("themeToggle");
const brandHome = document.getElementById("brandHome");

document.addEventListener("DOMContentLoaded", init);

function init() {
  authData = loadAuthData();
  appData = loadSavedData();
  loadSavedUiState();
  loadCourseData();
  bindShellActions();
  renderCurrentView();
}

function skill(id, roleId, level, category, name, description) {
  return { id, roleId, level, category, name, description };
}

function bindShellActions() {
  logoutButton.addEventListener("click", logout);
  brandHome.addEventListener("click", event => {
    event.preventDefault();
    logout();
  });
  themeToggleButton.addEventListener("click", () => {
    document.body.classList.toggle("dark");
  });
  resetDemoButton.addEventListener("click", () => {
    if (confirm("Are you sure you want to reset all consultant demo data?")) {
      appData = createSeedData();
      saveData();
      renderCurrentView();
    }
  });
}

async function loadCourseData() {
  try {
    const response = await fetch("data/courses.json");
    if (!response.ok) return;
    courseData = await response.json();
    renderCurrentView();
  } catch (error) {
    courseData = FALLBACK_COURSES;
  }
}

function loadSavedData() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) return createSeedData();
  try {
    return mergeSavedData(JSON.parse(saved));
  } catch (error) {
    return createSeedData();
  }
}

function saveData() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(appData));
}

function loadAuthData() {
  const defaults = { passwords: {}, changed: {} };
  getAuthAccounts().forEach(account => {
    defaults.passwords[account.key] = getDefaultPassword(account.username);
    defaults.changed[account.key] = false;
  });

  const saved = localStorage.getItem(AUTH_STORAGE_KEY);
  if (!saved) return defaults;

  try {
    const parsed = JSON.parse(saved);
    return {
      passwords: { ...defaults.passwords, ...(parsed.passwords || {}) },
      changed: { ...defaults.changed, ...(parsed.changed || {}) }
    };
  } catch (error) {
    return defaults;
  }
}

function saveAuthData() {
  localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(authData));
}

function mergeSavedData(saved) {
  const seed = createSeedData();
  CONSULTANTS.forEach(consultant => {
    const savedProgress = saved?.progress?.[consultant.id] || {};
    const savedTargets = saved?.targets?.[consultant.id] || {};
    seed.progress[consultant.id] = { ...seed.progress[consultant.id], ...savedProgress };
    seed.targets[consultant.id] = { ...seed.targets[consultant.id], ...savedTargets };
  });
  return seed;
}

function createSeedData() {
  const progress = {};
  const targets = {};

  CONSULTANTS.forEach(consultant => {
    progress[consultant.id] = {};
    targets[consultant.id] = {};
    getRoleSkills(consultant.roleId).forEach(item => {
      progress[consultant.id][item.id] = "not-started";
    });
  });

  setStatuses(progress.aisha, ["mt-l1-1", "mt-l1-2", "mt-l1-3", "mt-l2-1"], "complete");
  setStatuses(progress.aisha, ["mt-l1-4", "mt-l2-2", "mt-l2-3"], "in-progress");
  targets.aisha["mt-l2-2"] = target("mt-l2-2", "2026-06-18");

  setStatuses(progress.omar, ["mt-l1-1", "mt-l1-2"], "complete");
  setStatuses(progress.omar, ["mt-l1-3", "mt-l2-1"], "in-progress");
  targets.omar["mt-l2-1"] = target("mt-l2-1", "2026-06-28");

  setStatuses(progress.ben, ["jd-l1-1", "jd-l1-2", "jd-l1-3", "jd-l1-4", "jd-l2-1"], "complete");
  setStatuses(progress.ben, ["jd-l2-2", "jd-l2-3"], "in-progress");
  targets.ben["jd-l2-2"] = target("jd-l2-2", "2026-06-21");

  setStatuses(progress.maya, ["at-l1-1", "at-l1-2", "at-l2-1"], "complete");
  setStatuses(progress.maya, ["at-l1-3", "at-l1-4", "at-l2-2"], "in-progress");
  targets.maya["at-l2-2"] = target("at-l2-2", "2026-07-05");

  setStatuses(progress.priya, ["at-l1-1", "at-l1-3"], "complete");
  setStatuses(progress.priya, ["at-l1-2", "at-l2-1"], "in-progress");

  setStatuses(progress.lewis, ["ba-l1-1", "ba-l1-2"], "complete");
  setStatuses(progress.lewis, ["ba-l1-3", "ba-l2-1"], "in-progress");

  setStatuses(progress.niamh, ["ba-l1-1", "ba-l1-3", "ba-l2-2"], "complete");
  setStatuses(progress.niamh, ["ba-l1-2", "ba-l2-1"], "in-progress");
  targets.niamh["ba-l2-1"] = target("ba-l2-1", "2026-07-12");

  setStatuses(progress.sophia, ["do-l1-1", "do-l1-2", "do-l1-3"], "complete");
  setStatuses(progress.sophia, ["do-l2-1"], "in-progress");

  setStatuses(progress.ethan, ["do-l1-1", "do-l1-4"], "complete");
  setStatuses(progress.ethan, ["do-l1-2", "do-l2-2"], "in-progress");

  setStatuses(progress.daniel, ["jd-l1-1", "jd-l1-3"], "complete");
  setStatuses(progress.daniel, ["jd-l1-2", "jd-l2-1"], "in-progress");

  setStatuses(progress.max, ["da-l1-1", "da-l1-2", "da-l1-3"], "complete");
  setStatuses(progress.max, ["da-l1-4", "da-l2-1"], "in-progress");
  targets.max["da-l2-1"] = target("da-l2-1", "2026-08-10");

  setStatuses(progress.lily, ["da-l1-1", "da-l1-4"], "complete");

  setStatuses(progress.zoe, ["de-l1-1", "de-l1-2", "de-l1-3"], "complete");
  setStatuses(progress.zoe, ["de-l2-1", "de-l2-4"], "in-progress");
  targets.zoe["de-l2-1"] = target("de-l2-1", "2026-09-15");

  setStatuses(progress.leo, ["de-l1-1", "de-l1-4"], "complete");

  return { progress, targets };
}

function setStatuses(progressMap, ids, status) {
  ids.forEach(id => {
    progressMap[id] = status;
  });
}

function target(skillId, deadline) {
  const item = getSkillById(skillId);
  return {
    text: makeSmartTarget(item, deadline),
    deadline
  };
}

function makeSmartTarget(item, deadline) {
  const resource = getResources(item.id)[0];
  const dateText = deadline || "the selected deadline";
  return `By ${dateText}, I will improve ${item.name} by completing "${resource.title}" and applying it to a practical ${item.category.toLowerCase()} task, then evidence my progress with notes, examples, or a short demo for my ${ROLES[item.roleId].title} roadmap.`;
}

function renderCurrentView() {
  if (activeView !== "login" && !activeSession) {
    renderLogin();
    return;
  }

  if (activeView === "login") renderLogin();
  else if (activeView === "role") renderRoleSelection();
  else if (activeView === "consultant") renderConsultantDashboard(activeConsultantId);
  else if (activeView === "admin") renderAdmin();
  else renderLogin();
}

function setView(view) {
  activeView = view;
  saveUiState();
  app.focus();
}

function loadSavedUiState() {
  const saved = localStorage.getItem(UI_STORAGE_KEY);
  if (!saved) return;

  try {
    const state = JSON.parse(saved);
    const views = ["login", "role", "consultant", "admin"];
    if (views.includes(state.activeView)) activeView = state.activeView;
    if (getConsultant(state.activeConsultantId)) activeConsultantId = state.activeConsultantId;
    if (state.selectedRoleId && Object.keys(ROLES).includes(state.selectedRoleId)) selectedRoleId = state.selectedRoleId;
    if (ADMIN_TABS.includes(state.selectedAdminTab)) selectedAdminTab = state.selectedAdminTab;
    adminDrilldownId = getConsultant(state.adminDrilldownId) ? state.adminDrilldownId : null;
    if (getComparableRoleIds().includes(state.comparisonRoleId)) comparisonRoleId = state.comparisonRoleId;
    if (Array.isArray(state.comparisonConsultantIds)) comparisonConsultantIds = state.comparisonConsultantIds;
    activeSession = isValidSession(state.activeSession) ? state.activeSession : null;
    normalizeComparisonState();
  } catch (error) {
    localStorage.removeItem(UI_STORAGE_KEY);
  }
}

function saveUiState() {
  localStorage.setItem(UI_STORAGE_KEY, JSON.stringify({
    activeView,
    activeConsultantId,
    selectedRoleId,
    selectedAdminTab,
    adminDrilldownId,
    comparisonRoleId,
    comparisonConsultantIds,
    activeSession
  }));
}

function logout() {
  activeSession = null;
  activeView = "login";
  activeConsultantId = CONSULTANTS[0].id;
  adminDrilldownId = null;
  saveUiState();
  renderLogin();
}

function renderLogin(message = "") {
  activeSession = null;
  adminDrilldownId = null;
  setView("login");
  clearCharts();
  logoutButton.classList.add("hide");
  app.innerHTML = `
    <section class="hero">
      <div class="hero-panel">
        <div class="hero-copy">
          <p class="eyebrow">Ten10 Academy Skills Platform</p>
          <h1>Skills Matrix</h1>
          <p>Sign in as a consultant or academy lead to track role progress, skill gaps, SMART goals, and team capability.</p>
        </div>
        <div class="hero-metrics" aria-label="Demo platform metrics">
          <div class="metric-tile"><strong>5</strong><span>Tech roles</span></div>
          <div class="metric-tile"><strong>60</strong><span>Mapped skills</span></div>
          <div class="metric-tile"><strong>${CONSULTANTS.length}</strong><span>Consultants</span></div>
        </div>
      </div>
      <div class="login-panel">
        <div>
          <p class="eyebrow">Demo login</p>
          <h2>Sign in</h2>
          <p class="muted">Enter your assigned consultant or academy lead credentials.</p>
        </div>
        ${message ? `<div class="form-message error">${message}</div>` : ""}
        <div class="login-grid">
          <div class="login-choice">
            <h3><i class="fa-solid fa-user-check" aria-hidden="true"></i> Consultant</h3>
            <form id="consultantLoginForm">
              <div class="form-field">
                <label for="consultantUsername">Username</label>
                <input id="consultantUsername" type="text" autocomplete="username">
              </div>
              <div class="form-field">
                <label for="consultantPassword">Password</label>
                <input id="consultantPassword" type="password" autocomplete="current-password">
              </div>
              <button class="primary-button" type="submit">
                <i class="fa-solid fa-arrow-right-to-bracket" aria-hidden="true"></i>
                Sign in as Consultant
              </button>
            </form>
          </div>
          <div class="login-choice">
            <h3><i class="fa-solid fa-chart-line" aria-hidden="true"></i> Academy Lead</h3>
            <form id="adminLoginForm">
              <div class="form-field">
                <label for="adminUsername">Username</label>
                <input id="adminUsername" type="text" autocomplete="username">
              </div>
              <div class="form-field">
                <label for="adminPassword">Password</label>
                <input id="adminPassword" type="password" autocomplete="current-password">
              </div>
              <button class="primary-button" type="submit">
                <i class="fa-solid fa-chart-simple" aria-hidden="true"></i>
                Sign in as Admin
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  `;

  document.getElementById("consultantLoginForm").addEventListener("submit", event => {
    event.preventDefault();
    handleLogin("consultant", document.getElementById("consultantUsername").value, document.getElementById("consultantPassword").value);
  });
  document.getElementById("adminLoginForm").addEventListener("submit", event => {
    event.preventDefault();
    handleLogin("admin", document.getElementById("adminUsername").value, document.getElementById("adminPassword").value);
  });
}

function handleLogin(type, usernameValue, passwordValue) {
  const username = normalizeUsername(usernameValue);
  const account = getAuthAccounts().find(item => item.type === type && item.username === username);

  if (!account || authData.passwords[account.key] !== passwordValue) {
    renderLogin("Username or password is incorrect.");
    return;
  }

  if (!authData.changed[account.key]) {
    renderPasswordChange(account);
    return;
  }

  completeLogin(account);
}

function getActiveRoleId(consultant) {
  if (selectedRoleId && ROLES[selectedRoleId]) return selectedRoleId;
  return consultant.roleId;
}

function renderPasswordChange(account, message = "") {
  setView("login");
  clearCharts();
  logoutButton.classList.add("hide");
  app.innerHTML = `
    <section class="hero">
      <div class="hero-panel">
        <div class="hero-copy">
          <p class="eyebrow">First login security</p>
          <h1>Change Password</h1>
          <p>Create a new password for ${account.name}. It will be saved locally in this browser for the demo.</p>
        </div>
        <div class="hero-metrics" aria-label="Password rules">
          <div class="metric-tile"><strong>1</strong><span>Local account</span></div>
          <div class="metric-tile"><strong>8+</strong><span>Characters</span></div>
          <div class="metric-tile"><strong><i class="fa-solid fa-lock" aria-hidden="true"></i></strong><span>Stored locally</span></div>
        </div>
      </div>
      <div class="login-panel">
        <div>
          <p class="eyebrow">${account.type === "admin" ? "Academy Lead" : "Consultant"} account</p>
          <h2>${account.username}</h2>
          <p class="muted">This replaces the default first-login password for this browser.</p>
        </div>
        ${message ? `<div class="form-message error">${message}</div>` : ""}
        <form id="changePasswordForm">
          <div class="form-field">
            <label for="newPassword">New password</label>
            <input id="newPassword" type="password" autocomplete="new-password">
          </div>
          <div class="form-field">
            <label for="confirmPassword">Confirm password</label>
            <input id="confirmPassword" type="password" autocomplete="new-password">
          </div>
          <button class="primary-button" type="submit">
            <i class="fa-solid fa-floppy-disk" aria-hidden="true"></i>
            Save password and continue
          </button>
        </form>
      </div>
    </section>
  `;

  document.getElementById("changePasswordForm").addEventListener("submit", event => {
    event.preventDefault();
    const newPassword = document.getElementById("newPassword").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if (newPassword.length < 8) {
      renderPasswordChange(account, "Password must be at least 8 characters.");
      return;
    }

    if (newPassword !== confirmPassword) {
      renderPasswordChange(account, "The two passwords do not match.");
      return;
    }

    authData.passwords[account.key] = newPassword;
    authData.changed[account.key] = true;
    saveAuthData();
    completeLogin(account);
  });
}

function completeLogin(account) {
  activeSession = {
    type: account.type,
    id: account.id
  };
  adminDrilldownId = null;

  if (account.type === "admin") {
    selectedAdminTab = "overview";
    saveUiState();
    renderAdmin();
    return;
  }

  activeConsultantId = account.id;
  selectedRoleId = account.roleId;
  saveUiState();
  renderRoleSelection();
}

function renderRoleSelection() {
  if (!activeSession || activeSession.type !== "consultant") {
    renderLogin();
    return;
  }

  setView("role");
  clearCharts();
  logoutButton.classList.remove("hide");
  activeConsultantId = activeSession.id;
  const consultant = getConsultant(activeConsultantId);
  const currentRoleId = getActiveRoleId(consultant);
  app.innerHTML = `
    <section>
      <div class="view-header">
        <div>
          <p class="eyebrow">Consultant role selection</p>
          <h2>${consultant.name}</h2>
          <p>Choose a role from the list below to track progress against the skills you want to build.</p>
        </div>
      </div>
      <div class="role-selection">
        ${Object.entries(ROLES).map(([roleId, roleItem]) => `
          <div class="section-panel role-card ${roleId === currentRoleId ? "selected" : ""}">
            <div>
              <span class="pill">${roleId === consultant.roleId ? "Assigned role" : "Optional role"}</span>
              <h3>${roleItem.title}</h3>
              <p>${roleItem.summary}</p>
              <ul class="role-summary-list">
                ${LEVELS.map(level => `
                  <li>${level.label}: ${roleItem.skills.filter(item => item.level === level.key).length} skills</li>
                `).join("")}
              </ul>
            </div>
            <button class="primary-button" data-role-select="${roleId}" type="button">
              <i class="fa-solid fa-chevron-right" aria-hidden="true"></i>
              ${roleId === currentRoleId ? "Continue with this role" : "Choose this role"}
            </button>
          </div>
        `).join("")}
      </div>
    </section>
  `;

  document.querySelectorAll("[data-role-select]").forEach(button => {
    button.addEventListener("click", () => {
      selectedRoleId = button.dataset.roleSelect;
      saveUiState();
      renderConsultantDashboard(consultant.id, { roleId: selectedRoleId });
    });
  });
}

function renderConsultantDashboard(consultantId, options = {}) {
  clearCharts();
  const readOnly = options.readOnly === true;
  if (!readOnly && (!activeSession || activeSession.type !== "consultant" || activeSession.id !== consultantId)) {
    renderLogin();
    return;
  }
  if (readOnly && (!activeSession || activeSession.type !== "admin")) {
    renderLogin();
    return;
  }

  const consultant = getConsultant(consultantId);
  if (!readOnly) activeConsultantId = consultant.id;
  const roleId = options.roleId || (readOnly ? consultant.roleId : getActiveRoleId(consultant));
  const role = ROLES[roleId] || ROLES[consultant.roleId];
  const stats = getConsultantStats(consultant.id, roleId);
  setView(readOnly ? "admin" : "consultant");
  logoutButton.classList.remove("hide");

  app.innerHTML = `
    <section>
      <div class="view-header">
        <div>
          <p class="eyebrow">${readOnly ? "Admin read-only matrix" : "Consultant dashboard"}</p>
          <h2>${consultant.name} - ${role.title}</h2>
          <p>${role.summary}</p>
        </div>
        <div class="view-actions">
          ${!readOnly ? `<button class="secondary-button" id="changeRole" type="button"><i class="fa-solid fa-arrow-left" aria-hidden="true"></i> Change role</button>` : `    <button class="secondary-button" id="backToAdmin" type="button"><i class="fa-solid fa-arrow-left" aria-hidden="true"></i> Back to admin</button>`}
        </div>
      </div>
      ${readOnly ? `<div class="read-only-banner">Read-only academy lead view. Admin cannot edit consultant progress.</div>` : ""}
      ${renderStats(stats)}
      <div class="section-panel">
        <div class="view-header">
          <div>
            <h3>Skills by level</h3>
            <p>Track progress, open SMART targets, and use Learning Bridge resources.</p>
          </div>
        </div>
        ${renderSkillAccordions(consultant, readOnly, role)}
      </div>
    </section>
  `;

  if (readOnly) {
    document.getElementById("backToAdmin").addEventListener("click", () => {
      adminDrilldownId = null;
      saveUiState();
      renderAdmin();
    });
  } else {
    document.getElementById("changeRole").addEventListener("click", () => renderRoleSelection());
  }

  bindAccordionEvents();
  if (!readOnly) bindSkillEvents(consultant);
}

function renderProgressBar(percent, height = "12px", showLabel = false) {
  return `
    <div style="display: flex; align-items: center; gap: 12px; width: 100%;">
      ${showLabel ? `<span style="font-size: 0.85rem; font-weight: 600; min-width: 35px; text-align: right;">${percent}%</span>` : ""}
      <div class="progress-track" style="height: ${height}; flex: 1; margin-bottom: 0;">
        <div class="progress-fill" style="width:${percent}%"></div>
      </div>
    </div>
  `;
}

function renderStats(stats) {
  return `
    <div class="stats-grid" aria-label="Progress summary">
      <div class="stat-card">
        <span>Overall progress</span>
        <strong>${stats.progressPercent}%</strong>
        ${renderProgressBar(stats.progressPercent)}
      </div>
      <div class="stat-card"><span>Completed</span><strong>${stats.complete}</strong></div>
      <div class="stat-card"><span>In progress</span><strong>${stats.inProgress}</strong></div>
      <div class="stat-card"><span>SMART targets</span><strong>${stats.targetCount}</strong></div>
    </div>
  `;
}

function renderSkillAccordions(consultant, readOnly, role) {
  let previousLevelComplete = true;
  return `
    <div class="accordion">
      ${LEVELS.map((level, index) => {
        const levelSkills = role.skills.filter(item => item.level === level.key);
        const completeCount = levelSkills.filter(item => getStatus(consultant.id, item.id) === "complete").length;
        const levelProgress = Math.round((completeCount / levelSkills.length) * 100) || 0;

        const isLocked = !readOnly && !previousLevelComplete;
        previousLevelComplete = (levelProgress === 100);

        return `
        <div class="accordion-item ${index === 0 ? "open" : ""} ${isLocked ? "locked-level" : ""}">
          <button class="accordion-trigger" type="button" aria-expanded="${index === 0 ? "true" : "false"}" ${isLocked ? "disabled" : ""}>
            <div style="display: flex; align-items: center; justify-content: space-between; flex: 1; margin-right: 1.5rem;">
              <span style="display: flex; align-items: center; gap: 8px;">
                ${isLocked ? '<i class="fa-solid fa-lock" aria-hidden="true"></i>' : ""}
                ${level.label}
              </span>
              <div style="width: 140px;">${renderProgressBar(levelProgress, "8px", true)}</div>
            </div>
            <i class="fa-solid fa-chevron-down" aria-hidden="true"></i>
          </button>
          <div class="accordion-content">
            ${isLocked 
              ? `<p class="muted" style="padding: 1.5rem; text-align: center;">Complete the previous level to 100% to unlock these skills.</p>` 
              : levelSkills.map(item => renderSkillCard(item, consultant.id, readOnly)).join("")}
          </div>
        </div>
      `}).join("")}
    </div>
  `;
}

function renderSkillCard(item, consultantId, readOnly) {
  const status = getStatus(consultantId, item.id);
  const existingTarget = appData.targets[consultantId][item.id];
  return `
    <article class="skill-card" data-skill-id="${item.id}">
      <div class="skill-head">
        <div>
          <span class="pill">${item.category}</span>
          <h3>${item.name}</h3>
        </div>
        <span class="pill">${STATUS_LABELS[status]}</span>
      </div>
      <p>${item.description}</p>
      <div class="status-row" aria-label="Skill status for ${item.name}">
        ${Object.entries(STATUS_LABELS).map(([key, label]) => `
          <button class="status-button ${status === key ? "active" : ""}" data-action="status" data-status="${key}" type="button" ${readOnly ? "disabled" : ""}>${label}</button>
        `).join("")}
      </div>
      <div>
        <strong>Learning Bridge</strong>
        <div class="resource-list">
          ${getResources(item.id).map((resource, index) => `
            <a class="resource-link" href="${resource.url}" target="_blank" rel="noreferrer">
              <i class="fa-solid ${index === 0 ? "fa-star" : "fa-link"}" aria-hidden="true"></i>
              ${resource.provider}: ${resource.title}
            </a>
          `).join("")}
        </div>
      </div>
      ${status !== "complete" && !readOnly ? `
        <button class="secondary-button" data-action="smart" type="button">
          <i class="fa-solid fa-bullseye" aria-hidden="true"></i>
          ${existingTarget ? "Edit SMART Target" : "Generate SMART Target"}
        </button>
      ` : ""}
      ${existingTarget && readOnly ? `
        <div class="smart-editor">
          <strong>Saved SMART target</strong>
          <p>${existingTarget.text}</p>
          <span class="pill"><i class="fa-solid fa-calendar" aria-hidden="true"></i> ${existingTarget.deadline}</span>
        </div>
      ` : ""}
      <div class="smart-host"></div>
    </article>
  `;
}

function bindAccordionEvents() {
  document.querySelectorAll(".accordion-trigger").forEach(button => {
    button.addEventListener("click", () => {
      const item = button.closest(".accordion-item");
      const isOpen = item.classList.toggle("open");
      button.setAttribute("aria-expanded", String(isOpen));
    });
  });
}

function bindSkillEvents(consultant) {
  document.querySelectorAll("[data-action='status']").forEach(button => {
    button.addEventListener("click", () => {
      const skillId = button.closest(".skill-card").dataset.skillId;
      appData.progress[consultant.id][skillId] = button.dataset.status;
      saveData();
      renderConsultantDashboard(consultant.id);
    });
  });

  document.querySelectorAll("[data-action='smart']").forEach(button => {
    button.addEventListener("click", () => {
      const card = button.closest(".skill-card");
      const skillId = card.dataset.skillId;
      showSmartEditor(card, consultant.id, skillId);
    });
  });
}

function showSmartEditor(card, consultantId, skillId) {
  const item = getSkillById(skillId);
  const saved = appData.targets[consultantId][skillId];
  const deadline = saved?.deadline || getDefaultDeadline();
  const text = saved?.text || makeSmartTarget(item, deadline);
  const host = card.querySelector(".smart-host");
  host.innerHTML = `
    <div class="smart-editor">
      <div class="form-field">
        <label for="targetText-${skillId}">SMART target</label>
        <textarea id="targetText-${skillId}">${text}</textarea>
      </div>
      <div class="form-field">
        <label for="targetDate-${skillId}">Deadline</label>
        <input id="targetDate-${skillId}" type="date" value="${deadline}">
      </div>
      <div class="editor-actions">
        <button class="ghost-button" data-action="cancel-target" type="button">Cancel</button>
        <button class="primary-button" data-action="save-target" type="button">
          <i class="fa-solid fa-floppy-disk" aria-hidden="true"></i>
          Save target
        </button>
      </div>
    </div>
  `;

  host.querySelector("[data-action='cancel-target']").addEventListener("click", () => {
    host.innerHTML = "";
  });
  host.querySelector("[data-action='save-target']").addEventListener("click", () => {
    const targetText = host.querySelector("textarea").value.trim();
    const targetDate = host.querySelector("input").value;
    if (!targetText || !targetDate) return;
    appData.targets[consultantId][skillId] = { text: targetText, deadline: targetDate };
    saveData();
    renderConsultantDashboard(consultantId);
  });
}

function renderAdmin() {
  if (!activeSession || activeSession.type !== "admin") {
    renderLogin();
    return;
  }

  setView("admin");
  logoutButton.classList.remove("hide");
  if (adminDrilldownId) {
    renderConsultantDashboard(adminDrilldownId, { readOnly: true, roleId: getConsultant(adminDrilldownId).roleId });
    return;
  }
  app.innerHTML = `
    <section>
      <div class="view-header">
        <div>
          <p class="eyebrow">Academy lead view</p>
          <h2>Team skills dashboard</h2>
          <p>Read-only analytics for consultants, skill gaps, and saved SMART targets.</p>
        </div>
      </div>
      <nav class="tabs" aria-label="Admin sections">
        ${[
          ["overview", "Overview", "fa-gauge"],
          ["consultants", "Consultants", "fa-users"],
          ["heatmap", "Heatmap", "fa-fire"],
          ["targets", "SMART Targets", "fa-bullseye"]
        ].map(([key, label, icon]) => `
          <button class="tab-button ${selectedAdminTab === key ? "active" : ""}" data-tab="${key}" type="button">
            <i class="fa-solid ${icon}" aria-hidden="true"></i>${label}
          </button>
        `).join("")}
      </nav>
      <div id="adminContent"></div>
    </section>
  `;
  document.querySelectorAll("[data-tab]").forEach(button => {
    button.addEventListener("click", () => {
      selectedAdminTab = button.dataset.tab;
      consultantSearchQuery = "";
      adminDrilldownId = null;
      renderAdmin();
    });
  });
  renderAdminTab();
}

function renderAdminTab() {
  clearCharts();
  const host = document.getElementById("adminContent");
  if (selectedAdminTab === "overview") host.innerHTML = renderAdminOverview();
  if (selectedAdminTab === "consultants") {
    host.innerHTML = renderConsultantTable() + renderComparison();
    bindConsultantTable();
    bindComparison();
  }
  if (selectedAdminTab === "heatmap") {
    host.innerHTML = renderHeatmap();
    drawHeatCharts();
  }
  if (selectedAdminTab === "targets") host.innerHTML = renderAdminTargets();
}

function renderAdminOverview() {
  const teamStats = getTeamStats();
  return `
    <div class="admin-grid">
      <div class="stat-card"><span>Registered consultants</span><strong>${CONSULTANTS.length}</strong></div>
      <div class="stat-card"><span>Average progress</span><strong>${teamStats.averageProgress}%</strong></div>
      <div class="stat-card"><span>Saved SMART targets</span><strong>${teamStats.targetCount}</strong></div>
    </div>
    <div class="section-panel" style="margin-top:16px">
      <h3>Academy lead summary</h3>
      <p class="muted">Use the tabs to review all consultants, identify common completed skills, spot missing skills, and inspect saved SMART goals.</p>
    </div>
  `;
}

function renderConsultantTable() {
  const filtered = CONSULTANTS.filter(person => 
    person.name.toLowerCase().includes(consultantSearchQuery.toLowerCase())
  );

  return `
    <div class="search-container" style="margin-bottom: 1.5rem;">
      <div class="form-field" style="max-width: 400px;">
        <label for="consultantSearch">Search consultants</label>
        <input type="text" id="consultantSearch" placeholder="Filter by name..." value="${consultantSearchQuery}" autocomplete="off">
      </div>
    </div>
    <div class="table-wrap">
      <table>
        <thead>
          <tr>
            <th>Name</th><th>Role</th><th>Progress</th><th>Complete</th><th>In Progress</th>
          </tr>
        </thead>
        <tbody>
          ${filtered.map(person => {
            const stats = getConsultantStats(person.id);
            return `
              <tr>
                <td>
                  <a href="#" class="consultant-link" data-view-consultant="${person.id}">
                    ${person.name}
                  </a>
                </td>
                <td>${ROLES[person.roleId].title}</td>
                <td>${stats.progressPercent}%</td>
                <td>${stats.complete}</td>
                <td>${stats.inProgress}</td>
              </tr>
            `;
          }).join("")}
          ${filtered.length === 0 ? '<tr><td colspan="5" style="text-align: center; padding: 2rem;"><p class="muted">No consultants found matching your search.</p></td></tr>' : ''}
        </tbody>
      </table>
    </div>
  `;
}

function bindConsultantTable() {
  const searchInput = document.getElementById("consultantSearch");
  if (searchInput) {
    // Maintain focus and cursor position if user was typing
    if (consultantSearchQuery !== "") {
      searchInput.focus();
      const len = searchInput.value.length;
      searchInput.setSelectionRange(len, len);
    }

    searchInput.addEventListener("input", (e) => {
      consultantSearchQuery = e.target.value;
      renderAdminTab();
    });
  }

  document.querySelectorAll("[data-view-consultant]").forEach(element => {
    element.addEventListener("click", (e) => {
      if (element.tagName === "A") e.preventDefault();
      adminDrilldownId = element.dataset.viewConsultant;
      saveUiState();
      renderAdmin();
    });
  });
}

function renderComparison() {
  normalizeComparisonState();
  const comparableRoleIds = getComparableRoleIds();
  const rolePeople = getConsultantsByRole(comparisonRoleId);
  const comparedPeople = comparisonConsultantIds.map(id => getConsultant(id)).filter(Boolean);

  if (comparableRoleIds.length === 0) {
    return `
      <div class="section-panel" style="margin-top:16px">
        <h3>Same-role comparison</h3>
        <p class="muted">Add at least two consultants to the same role to compare progress.</p>
      </div>
    `;
  }

  return `
    <div class="section-panel" style="margin-top:16px">
      <div class="view-header">
        <div>
          <h3>Same-role comparison</h3>
          <p>Choose any two consultants from the same role and compare progress at summary level.</p>
        </div>
      </div>
      <div class="comparison-controls">
        <div class="form-field">
          <label for="comparisonRole">Role</label>
          <select id="comparisonRole">
            ${comparableRoleIds.map(roleId => `
              <option value="${roleId}" ${roleId === comparisonRoleId ? "selected" : ""}>${ROLES[roleId].title}</option>
            `).join("")}
          </select>
        </div>
        ${[0, 1].map(index => `
          <div class="form-field">
            <label for="comparisonPerson${index}">Consultant ${index + 1}</label>
            <select id="comparisonPerson${index}" data-comparison-person="${index}">
              ${rolePeople.map(person => `
                <option value="${person.id}" ${person.id === comparisonConsultantIds[index] ? "selected" : ""} ${person.id === comparisonConsultantIds[1 - index] ? "disabled" : ""}>
                  ${person.name}
                </option>
              `).join("")}
            </select>
          </div>
        `).join("")}
      </div>
      <div class="compare-grid">
        ${comparedPeople.map(person => {
          const stats = getConsultantStats(person.id);
          return `
            <div class="stat-card">
              <span>${ROLES[person.roleId].title}</span>
              <h3>${person.name}</h3>
              <strong>${stats.progressPercent}%</strong>
              <p class="muted">${stats.complete} complete, ${stats.inProgress} in progress, ${stats.notStarted} not started</p>
            </div>
          `;
        }).join("")}
      </div>
    </div>
  `;
}

function bindComparison() {
  const roleSelect = document.getElementById("comparisonRole");
  if (!roleSelect) return;

  roleSelect.addEventListener("change", () => {
    comparisonRoleId = roleSelect.value;
    comparisonConsultantIds = getDefaultComparisonPair(comparisonRoleId);
    saveUiState();
    renderAdmin();
  });

  document.querySelectorAll("[data-comparison-person]").forEach(select => {
    select.addEventListener("change", () => {
      const index = Number(select.dataset.comparisonPerson);
      comparisonConsultantIds[index] = select.value;
      normalizeComparisonState();
      saveUiState();
      renderAdmin();
    });
  });
}

function renderHeatmap() {
  const complete = getSkillRanking("complete");
  const missing = getSkillRanking("not-started");
  return `
    <div class="heat-grid">
      <div class="heat-card">
        <h3><i class="fa-solid fa-circle-check" aria-hidden="true"></i> Most Complete Skills</h3>
        <canvas id="completeChart" height="210" aria-label="Most complete skills chart"></canvas>
        ${renderRankList(complete)}
      </div>
      <div class="heat-card">
        <h3><i class="fa-solid fa-triangle-exclamation" aria-hidden="true"></i> Most Missing Skills</h3>
        <canvas id="missingChart" height="210" aria-label="Most missing skills chart"></canvas>
        ${renderRankList(missing)}
      </div>
    </div>
  `;
}

function renderRankList(items) {
  const max = Math.max(...items.map(item => item.count), 1);
  return `
    <div class="rank-list">
      ${items.map(item => `
        <div>
          <div class="rank-row"><strong>${item.name}</strong><span>${item.count}</span></div>
          <div class="rank-bar"><span style="width:${(item.count / max) * 100}%"></span></div>
        </div>
      `).join("")}
    </div>
  `;
}

function drawHeatCharts() {
  if (!window.Chart) return;
  const complete = getSkillRanking("complete");
  const missing = getSkillRanking("not-started");
  charts.push(makeBarChart("completeChart", complete, "#158a61"));
  charts.push(makeBarChart("missingChart", missing, "#b73554"));
}

function makeBarChart(canvasId, items, color) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return null;
  return new Chart(canvas, {
    type: "bar",
    data: {
      labels: items.map(item => item.name),
      datasets: [{ data: items.map(item => item.count), backgroundColor: color, borderRadius: 6 }]
    },
    options: {
      responsive: true,
      plugins: { legend: { display: false } },
      scales: {
        x: { ticks: { display: false }, grid: { display: false } },
        y: { beginAtZero: true, precision: 0 }
      }
    }
  });
}

function clearCharts() {
  charts.filter(Boolean).forEach(chart => chart.destroy());
  charts = [];
}

function bindAdminTargetEvents() {
  document.querySelectorAll(".edit-smart-target-button").forEach(button => {
    button.addEventListener("click", () => {
      const targetItem = button.closest(".smart-target-item");
      const consultantId = targetItem.dataset.consultantId;
      const skillId = targetItem.dataset.skillId;
      showSmartEditor(targetItem, consultantId, skillId);
    });
  });
}

function renderAdminTargets() {
  const groups = CONSULTANTS.map(person => {
    const targets = Object.entries(appData.targets[person.id] || {});
    return { person, targets };
  }).filter(group => group.targets.length > 0);

  if (groups.length === 0) {
    return `<div class="empty-state">No SMART targets have been saved yet.</div>`;
  }

  return `
    <div class="target-grid">
      ${groups.map(group => `
        <div class="target-card">
          <h3>${group.person.name}</h3>
          <p class="muted">${ROLES[group.person.roleId].title}</p>
          ${group.targets.map(([skillId, saved]) => {
            const item = getSkillById(skillId);
            return `
              <div class="smart-target-item" data-consultant-id="${group.person.id}" data-skill-id="${skillId}">
                <strong>${item.name}</strong>
                <p>${saved.text}</p>
                <span class="pill"><i class="fa-solid fa-calendar" aria-hidden="true"></i> ${saved.deadline}</span>
                <button class="secondary-button edit-smart-target-button" type="button">
                  <i class="fa-solid fa-pencil" aria-hidden="true"></i> Edit SMART Target
                </button>
                <div class="smart-host"></div>
              </div>
            `;
          }).join("")}
        </div>
      `).join("")}
    </div>
  `;
}

function getConsultant(id) {
  return CONSULTANTS.find(person => person.id === id);
}

function getAuthAccounts() {
  return [
    ...CONSULTANTS.map(person => ({
      key: `consultant:${person.id}`,
      type: "consultant",
      id: person.id,
      name: person.name,
      username: makeUsername(person.name)
    })),
    ...ADMIN_ACCOUNTS.map(admin => ({
      key: `admin:${admin.id}`,
      type: "admin",
      id: admin.id,
      name: admin.name,
      username: admin.username
    }))
  ];
}

function makeUsername(name) {
  return name
    .toLowerCase()
    .replace(/'/g, "")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .join(".");
}

function normalizeUsername(username) {
  return username.trim().toLowerCase();
}

function getDefaultPassword(username) {
  return `${username}1`;
}

function isValidSession(session) {
  if (!session) return false;
  if (session.type === "admin") return ADMIN_ACCOUNTS.some(admin => admin.id === session.id);
  return session.type === "consultant" && Boolean(getConsultant(session.id));
}

function getConsultantsByRole(roleId) {
  return CONSULTANTS.filter(person => person.roleId === roleId);
}

function getComparableRoleIds() {
  return Object.keys(ROLES).filter(roleId => getConsultantsByRole(roleId).length >= 2);
}

function getDefaultComparisonRoleId() {
  return getComparableRoleIds()[0] || CONSULTANTS[0].roleId;
}

function getDefaultComparisonPair(roleId) {
  return getConsultantsByRole(roleId).slice(0, 2).map(person => person.id);
}

function normalizeComparisonState() {
  const comparableRoleIds = getComparableRoleIds();
  if (!comparableRoleIds.includes(comparisonRoleId)) {
    comparisonRoleId = comparableRoleIds[0] || CONSULTANTS[0].roleId;
  }

  const rolePeople = getConsultantsByRole(comparisonRoleId);
  const rolePersonIds = rolePeople.map(person => person.id);
  comparisonConsultantIds = [...new Set(comparisonConsultantIds.filter(id => rolePersonIds.includes(id)))];

  rolePersonIds.forEach(id => {
    if (comparisonConsultantIds.length < 2 && !comparisonConsultantIds.includes(id)) {
      comparisonConsultantIds.push(id);
    }
  });

  comparisonConsultantIds = comparisonConsultantIds.slice(0, 2);
}

function getRoleSkills(roleId) {
  return ROLES[roleId].skills;
}

function getSkillById(skillId) {
  return Object.values(ROLES).flatMap(role => role.skills).find(item => item.id === skillId);
}

function getStatus(consultantId, skillId) {
  return appData.progress[consultantId]?.[skillId] || "not-started";
}

function getResources(skillId) {
  return courseData[skillId] || FALLBACK_COURSES[skillId] || [];
}

function getConsultantStats(consultantId, roleId) {
  const consultant = getConsultant(consultantId);
  const effectiveRoleId = roleId && ROLES[roleId] ? roleId : consultant.roleId;
  const skills = getRoleSkills(effectiveRoleId);
  const statuses = skills.map(item => getStatus(consultantId, item.id));
  const complete = statuses.filter(status => status === "complete").length;
  const inProgress = statuses.filter(status => status === "in-progress").length;
  const notStarted = statuses.filter(status => status === "not-started").length;
  const targetCount = Object.keys(appData.targets[consultantId] || {}).length;
  return {
    complete,
    inProgress,
    notStarted,
    targetCount,
    progressPercent: Math.round((complete / skills.length) * 100)
  };
}

function getTeamStats() {
  const stats = CONSULTANTS.map(person => getConsultantStats(person.id));
  const averageProgress = Math.round(stats.reduce((sum, item) => sum + item.progressPercent, 0) / stats.length);
  const targetCount = stats.reduce((sum, item) => sum + item.targetCount, 0);
  return { averageProgress, targetCount };
}

function getSkillRanking(status) {
  const counts = {};
  CONSULTANTS.forEach(person => {
    getRoleSkills(person.roleId).forEach(item => {
      if (getStatus(person.id, item.id) === status) {
        counts[item.id] = (counts[item.id] || 0) + 1;
      }
    });
  });

  return Object.entries(counts)
    .map(([skillId, count]) => ({ ...getSkillById(skillId), count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);
}

function getDefaultDeadline() {
  const date = new Date();
  date.setDate(date.getDate() + 30);
  return date.toISOString().slice(0, 10);
}
  const skills = getRoleSkills(effectiveRoleId);
  const statuses = skills.map(item => getStatus(consultantId, item.id));
  const complete = statuses.filter(status => status === "complete").length;
  const inProgress = statuses.filter(status => status === "in-progress").length;
  const notStarted = statuses.filter(status => status === "not-started").length;
  const targetCount = Object.keys(appData.targets[consultantId] || {}).length;
  return {
    complete,
    inProgress,
    notStarted,
    targetCount,
    progressPercent: Math.round((complete / skills.length) * 100)
  };
}

function getTeamStats() {
  const stats = CONSULTANTS.map(person => getConsultantStats(person.id));
  const averageProgress = Math.round(stats.reduce((sum, item) => sum + item.progressPercent, 0) / stats.length);
  const targetCount = stats.reduce((sum, item) => sum + item.targetCount, 0);
  return { averageProgress, targetCount };
}

function getSkillRanking(status) {
  const counts = {};
  CONSULTANTS.forEach(person => {
    getRoleSkills(person.roleId).forEach(item => {
      if (getStatus(person.id, item.id) === status) {
        counts[item.id] = (counts[item.id] || 0) + 1;
      }
    });
  });

  return Object.entries(counts)
    .map(([skillId, count]) => ({ ...getSkillById(skillId), count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);
}

function getDefaultDeadline() {
  const date = new Date();
  date.setDate(date.getDate() + 30);
  return date.toISOString().slice(0, 10);
}
    getRoleSkills(person.roleId).forEach(item => {
      if (getStatus(person.id, item.id) === status) {
        counts[item.id] = (counts[item.id] || 0) + 1;
      }
    });
  });

  return Object.entries(counts)
    .map(([skillId, count]) => ({ ...getSkillById(skillId), count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);
}

function getDefaultDeadline() {
  const date = new Date();
  date.setDate(date.getDate() + 30);
  return date.toISOString().slice(0, 10);
}
  const skills = getRoleSkills(effectiveRoleId);
  const statuses = skills.map(item => getStatus(consultantId, item.id));
  const complete = statuses.filter(status => status === "complete").length;
  const inProgress = statuses.filter(status => status === "in-progress").length;
  const notStarted = statuses.filter(status => status === "not-started").length;
  const targetCount = Object.keys(appData.targets[consultantId] || {}).length;
  return {
    complete,
    inProgress,
    notStarted,
    targetCount,
    progressPercent: Math.round((complete / skills.length) * 100)
  };
}

function getTeamStats() {
  const stats = CONSULTANTS.map(person => getConsultantStats(person.id));
  const averageProgress = Math.round(stats.reduce((sum, item) => sum + item.progressPercent, 0) / stats.length);
  const targetCount = stats.reduce((sum, item) => sum + item.targetCount, 0);
  return { averageProgress, targetCount };
}

function getSkillRanking(status) {
  const counts = {};
  CONSULTANTS.forEach(person => {
    getRoleSkills(person.roleId).forEach(item => {
      if (getStatus(person.id, item.id) === status) {
        counts[item.id] = (counts[item.id] || 0) + 1;
      }
    });
  });

  return Object.entries(counts)
    .map(([skillId, count]) => ({ ...getSkillById(skillId), count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);
}

function getDefaultDeadline() {
  const date = new Date();
  date.setDate(date.getDate() + 30);
  return date.toISOString().slice(0, 10);
}
    getRoleSkills(person.roleId).forEach(item => {
      if (getStatus(person.id, item.id) === status) {
        counts[item.id] = (counts[item.id] || 0) + 1;
      }
    });
  });

  return Object.entries(counts)
    .map(([skillId, count]) => ({ ...getSkillById(skillId), count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);
}

function getDefaultDeadline() {
  const date = new Date();
  date.setDate(date.getDate() + 30);
  return date.toISOString().slice(0, 10);
}
  const skills = getRoleSkills(effectiveRoleId);
  const statuses = skills.map(item => getStatus(consultantId, item.id));
  const complete = statuses.filter(status => status === "complete").length;
  const inProgress = statuses.filter(status => status === "in-progress").length;
  const notStarted = statuses.filter(status => status === "not-started").length;
  const targetCount = Object.keys(appData.targets[consultantId] || {}).length;
  return {
    complete,
    inProgress,
    notStarted,
    targetCount,
    progressPercent: Math.round((complete / skills.length) * 100)
  };
}

function getTeamStats() {
  const stats = CONSULTANTS.map(person => getConsultantStats(person.id));
  const averageProgress = Math.round(stats.reduce((sum, item) => sum + item.progressPercent, 0) / stats.length);
  const targetCount = stats.reduce((sum, item) => sum + item.targetCount, 0);
  return { averageProgress, targetCount };
}

function getSkillRanking(status) {
  const counts = {};
  CONSULTANTS.forEach(person => {
    getRoleSkills(person.roleId).forEach(item => {
      if (getStatus(person.id, item.id) === status) {
        counts[item.id] = (counts[item.id] || 0) + 1;
      }
    });
  });

  return Object.entries(counts)
    .map(([skillId, count]) => ({ ...getSkillById(skillId), count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);
}

function getDefaultDeadline() {
  const date = new Date();
  date.setDate(date.getDate() + 30);
  return date.toISOString().slice(0, 10);
}
    getRoleSkills(person.roleId).forEach(item => {
      if (getStatus(person.id, item.id) === status) {
        counts[item.id] = (counts[item.id] || 0) + 1;
      }
    });
  });

  return Object.entries(counts)
    .map(([skillId, count]) => ({ ...getSkillById(skillId), count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);
}

function getDefaultDeadline() {
  const date = new Date();
  date.setDate(date.getDate() + 30);
  return date.toISOString().slice(0, 10);
}
  const skills = getRoleSkills(effectiveRoleId);
  const statuses = skills.map(item => getStatus(consultantId, item.id));
  const complete = statuses.filter(status => status === "complete").length;
  const inProgress = statuses.filter(status => status === "in-progress").length;
  const notStarted = statuses.filter(status => status === "not-started").length;
  const targetCount = Object.keys(appData.targets[consultantId] || {}).length;
  return {
    complete,
    inProgress,
    notStarted,
    targetCount,
    progressPercent: Math.round((complete / skills.length) * 100)
  };
}

function getTeamStats() {
  const stats = CONSULTANTS.map(person => getConsultantStats(person.id));
  const averageProgress = Math.round(stats.reduce((sum, item) => sum + item.progressPercent, 0) / stats.length);
  const targetCount = stats.reduce((sum, item) => sum + item.targetCount, 0);
  return { averageProgress, targetCount };
}

function getSkillRanking(status) {
  const counts = {};
  CONSULTANTS.forEach(person => {
    getRoleSkills(person.roleId).forEach(item => {
      if (getStatus(person.id, item.id) === status) {
        counts[item.id] = (counts[item.id] || 0) + 1;
      }
    });
  });

  return Object.entries(counts)
    .map(([skillId, count]) => ({ ...getSkillById(skillId), count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);
}

function getDefaultDeadline() {
  const date = new Date();
  date.setDate(date.getDate() + 30);
  return date.toISOString().slice(0, 10);
}
    getRoleSkills(person.roleId).forEach(item => {
      if (getStatus(person.id, item.id) === status) {
        counts[item.id] = (counts[item.id] || 0) + 1;
      }
    });
  });

  return Object.entries(counts)
    .map(([skillId, count]) => ({ ...getSkillById(skillId), count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);
}

function getDefaultDeadline() {
  const date = new Date();
  date.setDate(date.getDate() + 30);
  return date.toISOString().slice(0, 10);
}
  const skills = getRoleSkills(effectiveRoleId);
  const statuses = skills.map(item => getStatus(consultantId, item.id));
  const complete = statuses.filter(status => status === "complete").length;
  const inProgress = statuses.filter(status => status === "in-progress").length;
  const notStarted = statuses.filter(status => status === "not-started").length;
  const targetCount = Object.keys(appData.targets[consultantId] || {}).length;
  return {
    complete,
    inProgress,
    notStarted,
    targetCount,
    progressPercent: Math.round((complete / skills.length) * 100)
  };
}

function getTeamStats() {
  const stats = CONSULTANTS.map(person => getConsultantStats(person.id));
  const averageProgress = Math.round(stats.reduce((sum, item) => sum + item.progressPercent, 0) / stats.length);
  const targetCount = stats.reduce((sum, item) => sum + item.targetCount, 0);
  return { averageProgress, targetCount };
}

function getSkillRanking(status) {
  const counts = {};
  CONSULTANTS.forEach(person => {
    getRoleSkills(person.roleId).forEach(item => {
      if (getStatus(person.id, item.id) === status) {
        counts[item.id] = (counts[item.id] || 0) + 1;
      }
    });
  });

  return Object.entries(counts)
    .map(([skillId, count]) => ({ ...getSkillById(skillId), count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);
}

function getDefaultDeadline() {
  const date = new Date();
  date.setDate(date.getDate() + 30);
  return date.toISOString().slice(0, 10);
}
    getRoleSkills(person.roleId).forEach(item => {
      if (getStatus(person.id, item.id) === status) {
        counts[item.id] = (counts[item.id] || 0) + 1;
      }
    });
  });

  return Object.entries(counts)
    .map(([skillId, count]) => ({ ...getSkillById(skillId), count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);
}

function getDefaultDeadline() {
  const date = new Date();
  date.setDate(date.getDate() + 30);
  return date.toISOString().slice(0, 10);
}
  const skills = getRoleSkills(effectiveRoleId);
  const statuses = skills.map(item => getStatus(consultantId, item.id));
  const complete = statuses.filter(status => status === "complete").length;
  const inProgress = statuses.filter(status => status === "in-progress").length;
  const notStarted = statuses.filter(status => status === "not-started").length;
  const targetCount = Object.keys(appData.targets[consultantId] || {}).length;
  return {
    complete,
    inProgress,
    notStarted,
    targetCount,
    progressPercent: Math.round((complete / skills.length) * 100)
  };
}

function getTeamStats() {
  const stats = CONSULTANTS.map(person => getConsultantStats(person.id));
  const averageProgress = Math.round(stats.reduce((sum, item) => sum + item.progressPercent, 0) / stats.length);
  const targetCount = stats.reduce((sum, item) => sum + item.targetCount, 0);
  return { averageProgress, targetCount };
}

function getSkillRanking(status) {
  const counts = {};
  CONSULTANTS.forEach(person => {
    getRoleSkills(person.roleId).forEach(item => {
      if (getStatus(person.id, item.id) === status) {
        counts[item.id] = (counts[item.id] || 0) + 1;
      }
    });
  });

  return Object.entries(counts)
    .map(([skillId, count]) => ({ ...getSkillById(skillId), count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);
}

function getDefaultDeadline() {
  const date = new Date();
  date.setDate(date.getDate() + 30);
  return date.toISOString().slice(0, 10);
}
    getRoleSkills(person.roleId).forEach(item => {
      if (getStatus(person.id, item.id) === status) {
        counts[item.id] = (counts[item.id] || 0) + 1;
      }
    });
  });

  return Object.entries(counts)
    .map(([skillId, count]) => ({ ...getSkillById(skillId), count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);
}

function getDefaultDeadline() {
  const date = new Date();
  date.setDate(date.getDate() + 30);
  return date.toISOString().slice(0, 10);
}
  const skills = getRoleSkills(effectiveRoleId);
  const statuses = skills.map(item => getStatus(consultantId, item.id));
  const complete = statuses.filter(status => status === "complete").length;
  const inProgress = statuses.filter(status => status === "in-progress").length;
  const notStarted = statuses.filter(status => status === "not-started").length;
  const targetCount = Object.keys(appData.targets[consultantId] || {}).length;
  return {
    complete,
    inProgress,
    notStarted,
    targetCount,
    progressPercent: Math.round((complete / skills.length) * 100)
  };
}

function getTeamStats() {
  const stats = CONSULTANTS.map(person => getConsultantStats(person.id));
  const averageProgress = Math.round(stats.reduce((sum, item) => sum + item.progressPercent, 0) / stats.length);
  const targetCount = stats.reduce((sum, item) => sum + item.targetCount, 0);
  return { averageProgress, targetCount };
}

function getSkillRanking(status) {
  const counts = {};
  CONSULTANTS.forEach(person => {
    getRoleSkills(person.roleId).forEach(item => {
      if (getStatus(person.id, item.id) === status) {
        counts[item.id] = (counts[item.id] || 0) + 1;
      }
    });
  });

  return Object.entries(counts)
    .map(([skillId, count]) => ({ ...getSkillById(skillId), count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);
}

function getDefaultDeadline() {
  const date = new Date();
  date.setDate(date.getDate() + 30);
  return date.toISOString().slice(0, 10);
}
    getRoleSkills(person.roleId).forEach(item => {
      if (getStatus(person.id, item.id) === status) {
        counts[item.id] = (counts[item.id] || 0) + 1;
      }
    });
  });

  return Object.entries(counts)
    .map(([skillId, count]) => ({ ...getSkillById(skillId), count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);
}

function getDefaultDeadline() {
  const date = new Date();
  date.setDate(date.getDate() + 30);
  return date.toISOString().slice(0, 10);
}
  const skills = getRoleSkills(effectiveRoleId);
  const statuses = skills.map(item => getStatus(consultantId, item.id));
  const complete = statuses.filter(status => status === "complete").length;
  const inProgress = statuses.filter(status => status === "in-progress").length;
  const notStarted = statuses.filter(status => status === "not-started").length;
  const targetCount = Object.keys(appData.targets[consultantId] || {}).length;
  return {
    complete,
    inProgress,
    notStarted,
    targetCount,
    progressPercent: Math.round((complete / skills.length) * 100)
  };
}

function getTeamStats() {
  const stats = CONSULTANTS.map(person => getConsultantStats(person.id));
  const averageProgress = Math.round(stats.reduce((sum, item) => sum + item.progressPercent, 0) / stats.length);
  const targetCount = stats.reduce((sum, item) => sum + item.targetCount, 0);
  return { averageProgress, targetCount };
}

function getSkillRanking(status) {
  const counts = {};
  CONSULTANTS.forEach(person => {
    getRoleSkills(person.roleId).forEach(item => {
      if (getStatus(person.id, item.id) === status) {
        counts[item.id] = (counts[item.id] || 0) + 1;
      }
    });
  });

  return Object.entries(counts)
    .map(([skillId, count]) => ({ ...getSkillById(skillId), count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);
}

function getDefaultDeadline() {
  const date = new Date();
  date.setDate(date.getDate() + 30);
  return date.toISOString().slice(0, 10);
}
    getRoleSkills(person.roleId).forEach(item => {
      if (getStatus(person.id, item.id) === status) {
        counts[item.id] = (counts[item.id] || 0) + 1;
      }
    });
  });

  return Object.entries(counts)
    .map(([skillId, count]) => ({ ...getSkillById(skillId), count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);
}

function getDefaultDeadline() {
  const date = new Date();
  date.setDate(date.getDate() + 30);
  return date.toISOString().slice(0, 10);
}
