"""Seed the database with demo data."""
import json
import sys
import os

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from app.db.session import SessionLocal, engine, Base
from app.models.user import User
from app.models.job import Job
from app.models.profile import Profile
from app.models.notification import Notification
from app.core.security import get_password_hash


DEMO_JOBS = [
    {
        "title": "Senior Frontend Engineer",
        "company": "TechNova Solutions",
        "location": "Hyderabad, India",
        "description": "We are looking for a Senior Frontend Engineer to join our growing team. You will be responsible for building and maintaining our customer-facing web applications using React and TypeScript. You will work closely with designers and backend engineers to deliver exceptional user experiences.",
        "requirements": "5+ years of experience with React, TypeScript, and modern web technologies. Strong understanding of state management, performance optimization, and responsive design. Experience with testing frameworks and CI/CD pipelines.",
        "responsibilities": "Lead frontend architecture decisions and implementation. Mentor junior developers. Collaborate with product and design teams. Optimize application performance and accessibility.",
        "salary_min": 1800000,
        "salary_max": 3000000,
        "job_type": "full-time",
        "experience_level": "senior",
        "remote_type": "hybrid",
        "skills": json.dumps(["React", "TypeScript", "Next.js", "Tailwind CSS", "GraphQL"]),
        "benefits": json.dumps(["Health Insurance", "Flexible Hours", "Learning Budget", "Stock Options"]),
    },
    {
        "title": "Backend Developer",
        "company": "DataPulse Inc.",
        "location": "Bangalore, India",
        "description": "Join our backend team to build scalable microservices that power our data analytics platform. You will work with Python, FastAPI, and PostgreSQL to create high-performance APIs.",
        "requirements": "3+ years of backend development experience with Python. Proficiency with SQL databases and API design. Understanding of cloud services and containerization.",
        "responsibilities": "Design and implement RESTful APIs. Optimize database queries. Write clean, well-tested code. Participate in code reviews.",
        "salary_min": 1500000,
        "salary_max": 2500000,
        "job_type": "full-time",
        "experience_level": "mid",
        "remote_type": "remote",
        "skills": json.dumps(["Python", "FastAPI", "PostgreSQL", "Redis", "Docker"]),
        "benefits": json.dumps(["Remote Work", "Health Insurance", "Gym Membership", "Annual Retreat"]),
    },
    {
        "title": "Full Stack Engineer",
        "company": "CloudBridge Technologies",
        "location": "Pune, India",
        "description": "We need a versatile Full Stack Engineer to help build our SaaS platform from the ground up. You will work across the entire stack, from database design to pixel-perfect UI.",
        "requirements": "3+ years of full stack development. Experience with React/Next.js and Python/Node.js. Database design skills. Familiarity with cloud platforms.",
        "responsibilities": "Build end-to-end features. Design database schemas. Create responsive UI components. Write API documentation.",
        "salary_min": 1200000,
        "salary_max": 2200000,
        "job_type": "full-time",
        "experience_level": "mid",
        "remote_type": "onsite",
        "skills": json.dumps(["React", "Node.js", "Python", "PostgreSQL", "AWS"]),
        "benefits": json.dumps(["Health Insurance", "Meal Allowance", "Team Events", "Learning Budget"]),
    },
    {
        "title": "DevOps Engineer",
        "company": "Skyline Digital",
        "location": "Chennai, India",
        "description": "Looking for a DevOps Engineer to manage and improve our cloud infrastructure and CI/CD pipelines. You will ensure our systems are reliable, scalable, and secure.",
        "requirements": "4+ years of DevOps experience. Strong knowledge of AWS/GCP, Kubernetes, and Terraform. Experience with monitoring and logging systems.",
        "responsibilities": "Manage Kubernetes clusters. Build CI/CD pipelines. Implement monitoring solutions. Automate infrastructure provisioning.",
        "salary_min": 1600000,
        "salary_max": 2800000,
        "job_type": "full-time",
        "experience_level": "senior",
        "remote_type": "remote",
        "skills": json.dumps(["Kubernetes", "AWS", "Terraform", "Docker", "Jenkins"]),
        "benefits": json.dumps(["Remote Work", "Stock Options", "Health Insurance", "Conference Budget"]),
    },
    {
        "title": "UI/UX Designer",
        "company": "PixelCraft Studios",
        "location": "Mumbai, India",
        "description": "We are seeking a talented UI/UX Designer to create intuitive and visually stunning interfaces for our enterprise SaaS products. You will own the design process from research to final handoff.",
        "requirements": "3+ years of UI/UX design experience. Proficiency with Figma and design systems. Strong portfolio showing user-centered design thinking.",
        "responsibilities": "Conduct user research. Create wireframes and prototypes. Build and maintain design systems. Collaborate with engineering teams.",
        "salary_min": 1000000,
        "salary_max": 1800000,
        "job_type": "full-time",
        "experience_level": "mid",
        "remote_type": "hybrid",
        "skills": json.dumps(["Figma", "Design Systems", "User Research", "Prototyping", "CSS"]),
        "benefits": json.dumps(["Creative Tools Budget", "Health Insurance", "Flexible Hours", "Workshops"]),
    },
    {
        "title": "Machine Learning Engineer",
        "company": "NeuralEdge AI",
        "location": "Hyderabad, India",
        "description": "Join our AI team to build and deploy machine learning models that drive business intelligence. You will work on natural language processing and recommendation systems.",
        "requirements": "3+ years of ML engineering experience. Strong Python skills with TensorFlow or PyTorch. Experience with MLOps and model deployment. Knowledge of NLP techniques.",
        "responsibilities": "Develop and train ML models. Deploy models to production. Optimize model performance. Collaborate with data scientists and engineers.",
        "salary_min": 2000000,
        "salary_max": 3500000,
        "job_type": "full-time",
        "experience_level": "senior",
        "remote_type": "hybrid",
        "skills": json.dumps(["Python", "TensorFlow", "PyTorch", "NLP", "MLOps"]),
        "benefits": json.dumps(["GPU Access", "Research Time", "Health Insurance", "Stock Options"]),
    },
    {
        "title": "Junior React Developer",
        "company": "WebFlow Labs",
        "location": "Bangalore, India",
        "description": "Great opportunity for a junior developer to grow their skills working on modern React applications. You will receive mentorship and work on real customer-facing features.",
        "requirements": "1+ year of experience with React. Understanding of HTML, CSS, and JavaScript. Eagerness to learn and grow. Good communication skills.",
        "responsibilities": "Build React components. Fix bugs and implement features. Write unit tests. Participate in team ceremonies.",
        "salary_min": 600000,
        "salary_max": 1000000,
        "job_type": "full-time",
        "experience_level": "entry",
        "remote_type": "onsite",
        "skills": json.dumps(["React", "JavaScript", "HTML/CSS", "Git"]),
        "benefits": json.dumps(["Mentorship Program", "Health Insurance", "Learning Budget", "Team Events"]),
    },
    {
        "title": "Product Manager",
        "company": "InnovateTech Solutions",
        "location": "Delhi, India",
        "description": "We are looking for a Product Manager to lead our core platform product. You will define the product vision, work with engineering, and drive business outcomes.",
        "requirements": "5+ years of product management experience in tech. Strong analytical and communication skills. Experience with agile methodologies. Technical background preferred.",
        "responsibilities": "Define product roadmap. Gather and prioritize requirements. Work with engineering and design. Analyze metrics and user feedback.",
        "salary_min": 2000000,
        "salary_max": 3500000,
        "job_type": "full-time",
        "experience_level": "senior",
        "remote_type": "hybrid",
        "skills": json.dumps(["Product Strategy", "Agile", "Data Analysis", "User Research", "Roadmapping"]),
        "benefits": json.dumps(["Stock Options", "Health Insurance", "Leadership Training", "Flexible Hours"]),
    },
    {
        "title": "QA Automation Engineer",
        "company": "QualityFirst Software",
        "location": "Hyderabad, India",
        "description": "Join our QA team to build and maintain automated test suites. You will ensure our products meet the highest quality standards before release.",
        "requirements": "3+ years of QA automation experience. Proficiency with Selenium, Cypress, or Playwright. Knowledge of API testing. CI/CD integration experience.",
        "responsibilities": "Design test automation frameworks. Write and maintain test scripts. Perform regression testing. Report and track bugs.",
        "salary_min": 1200000,
        "salary_max": 2000000,
        "job_type": "full-time",
        "experience_level": "mid",
        "remote_type": "remote",
        "skills": json.dumps(["Cypress", "Selenium", "Playwright", "API Testing", "CI/CD"]),
        "benefits": json.dumps(["Remote Work", "Health Insurance", "Testing Tools Budget", "Flexible Hours"]),
    },
    {
        "title": "Data Analyst",
        "company": "InsightMetrics",
        "location": "Mumbai, India",
        "description": "We need a Data Analyst to transform raw data into actionable business insights. You will work with stakeholders across the organization to drive data-informed decisions.",
        "requirements": "2+ years of data analysis experience. Strong SQL and Python skills. Proficiency with data visualization tools. Statistical analysis knowledge.",
        "responsibilities": "Analyze business data and trends. Create dashboards and reports. Present findings to stakeholders. Support data-driven decision making.",
        "salary_min": 800000,
        "salary_max": 1400000,
        "job_type": "full-time",
        "experience_level": "entry",
        "remote_type": "hybrid",
        "skills": json.dumps(["SQL", "Python", "Tableau", "Excel", "Statistics"]),
        "benefits": json.dumps(["Health Insurance", "Learning Budget", "Mentorship", "Flexible Hours"]),
    },
    {
        "title": "Mobile App Developer",
        "company": "AppForge Technologies",
        "location": "Chennai, India",
        "description": "Build beautiful, performant mobile applications using React Native. You will work on apps used by millions of users across Android and iOS.",
        "requirements": "3+ years of mobile development experience. React Native and/or Flutter expertise. Understanding of mobile app architecture and performance optimization.",
        "responsibilities": "Develop cross-platform mobile features. Optimize app performance. Handle app store submissions. Collaborate with design and backend teams.",
        "salary_min": 1400000,
        "salary_max": 2400000,
        "job_type": "full-time",
        "experience_level": "mid",
        "remote_type": "hybrid",
        "skills": json.dumps(["React Native", "TypeScript", "iOS", "Android", "Mobile Architecture"]),
        "benefits": json.dumps(["Latest Devices", "Health Insurance", "App Store Revenue Share", "Flexible Hours"]),
    },
    {
        "title": "Technical Writer",
        "company": "DocuStream",
        "location": "Remote, India",
        "description": "Create comprehensive technical documentation for our developer platform. You will work closely with engineering teams to produce clear, accurate documentation.",
        "requirements": "2+ years of technical writing experience. Ability to understand complex technical concepts. Proficiency with Markdown and documentation tools. API documentation experience.",
        "responsibilities": "Write and maintain API documentation. Create user guides and tutorials. Review engineering documentation. Improve documentation processes.",
        "salary_min": 800000,
        "salary_max": 1400000,
        "job_type": "contract",
        "experience_level": "mid",
        "remote_type": "remote",
        "skills": json.dumps(["Technical Writing", "API Documentation", "Markdown", "Git", "Developer Experience"]),
        "benefits": json.dumps(["Fully Remote", "Flexible Schedule", "Health Insurance", "Writing Tools"]),
    },
    {
        "title": "Cloud Architect",
        "company": "StratoCloud Services",
        "location": "Pune, India",
        "description": "Design and implement cloud infrastructure solutions for enterprise clients. You will be the technical leader for cloud architecture decisions.",
        "requirements": "7+ years of cloud infrastructure experience. AWS/Azure/GCP certification. Expertise in microservices architecture. Strong communication skills.",
        "responsibilities": "Design cloud architectures. Lead migration projects. Optimize costs and performance. Mentor engineering teams.",
        "salary_min": 2500000,
        "salary_max": 4500000,
        "job_type": "full-time",
        "experience_level": "lead",
        "remote_type": "hybrid",
        "skills": json.dumps(["AWS", "Azure", "Microservices", "Terraform", "System Design"]),
        "benefits": json.dumps(["Premium Health Insurance", "Stock Options", "Conference Budget", "Sabbatical"]),
    },
    {
        "title": "Security Engineer",
        "company": "CyberShield Networks",
        "location": "Bangalore, India",
        "description": "Protect our systems and our customers' data. You will identify vulnerabilities, implement security measures, and ensure compliance with security standards.",
        "requirements": "4+ years of security engineering experience. Knowledge of OWASP, penetration testing, and security frameworks. Security certifications preferred.",
        "responsibilities": "Conduct security assessments. Implement security controls. Respond to security incidents. Train teams on security best practices.",
        "salary_min": 1800000,
        "salary_max": 3200000,
        "job_type": "full-time",
        "experience_level": "senior",
        "remote_type": "hybrid",
        "skills": json.dumps(["Penetration Testing", "OWASP", "SIEM", "Python", "Compliance"]),
        "benefits": json.dumps(["Security Certifications", "Health Insurance", "Bug Bounty", "Flexible Hours"]),
    },
    {
        "title": "Intern - Software Development",
        "company": "FutureTech Labs",
        "location": "Hyderabad, India",
        "description": "Start your career with a 6-month internship at FutureTech Labs. Work on real projects alongside experienced engineers and gain hands-on industry experience.",
        "requirements": "Currently pursuing CS or related degree. Basic knowledge of programming (any language). eagerness to learn. Good problem-solving skills.",
        "responsibilities": "Work on assigned features and bug fixes. Learn development best practices. Participate in team activities. Complete intern project.",
        "salary_min": 200000,
        "salary_max": 400000,
        "job_type": "internship",
        "experience_level": "entry",
        "remote_type": "onsite",
        "skills": json.dumps(["Python", "JavaScript", "Git", "Problem Solving"]),
        "benefits": json.dumps(["Mentorship", "Stipend", "Certificate", "PPO Opportunity"]),
    },
]


def seed():
    db = SessionLocal()
    try:
        # Check if data exists
        existing_users = db.query(User).count()
        if existing_users > 0:
            print("Database already seeded. Skipping.")
            return

        # Create demo user
        demo_user = User(
            name="Demo User",
            email="demo@careerflow.dev",
            password_hash=get_password_hash("DemoPassword123!"),
            role="user",
        )
        db.add(demo_user)
        db.flush()

        # Create admin user
        admin_user = User(
            name="Admin User",
            email="admin@careerflow.dev",
            password_hash=get_password_hash("AdminPassword123!"),
            role="admin",
        )
        db.add(admin_user)
        db.flush()

        # Create profiles
        demo_profile = Profile(
            user_id=demo_user.id,
            skills=json.dumps(["React", "TypeScript", "Python", "SQL"]),
            experience="3 years as a frontend developer at TechCorp, 1 year as a full-stack developer at StartUpXYZ.",
            education="B.Tech Computer Science, Osmania University, 2020",
            preferred_locations=json.dumps(["Hyderabad", "Bangalore", "Remote"]),
            preferred_job_types=json.dumps(["full-time", "contract"]),
        )
        db.add(demo_profile)

        admin_profile = Profile(
            user_id=admin_user.id,
            skills=json.dumps(["System Architecture", "Cloud Computing", "Team Leadership"]),
            experience="10+ years in software engineering, 5 years in management.",
            education="M.Tech Computer Science, IIT Hyderabad, 2015",
            preferred_locations=json.dumps(["Hyderabad"]),
            preferred_job_types=json.dumps(["full-time"]),
        )
        db.add(admin_profile)

        # Create jobs
        for job_data in DEMO_JOBS:
            job = Job(**job_data)
            db.add(job)

        db.flush()

        # Create some sample applications for the demo user
        jobs = db.query(Job).limit(5).all()
        statuses = ["applied", "screening", "interview", "applied", "rejected"]
        for i, job in enumerate(jobs):
            app = Application(
                user_id=demo_user.id,
                job_id=job.id,
                status=statuses[i],
                notes=f"Applied through CareerFlow. Interested in the {job.title} role.",
                next_action="Wait for response" if statuses[i] == "applied" else "Prepare for interview",
            )
            db.add(app)

        # Create notifications for demo user
        notifications_data = [
            {
                "title": "Interview Reminder",
                "message": "Your interview with TechNova Solutions is tomorrow at 10:00 AM.",
                "notification_type": "interview",
            },
            {
                "title": "Application Status Updated",
                "message": "Your application for Backend Developer at DataPulse Inc. has moved to Screening stage.",
                "notification_type": "info",
            },
            {
                "title": "New Job Matches",
                "message": "5 new jobs match your preferences. Check them out!",
                "notification_type": "info",
            },
            {
                "title": "Follow-up Reminder",
                "message": "It's been 5 days since you applied to Full Stack Engineer at CloudBridge. Consider following up.",
                "notification_type": "warning",
            },
        ]

        for notif_data in notifications_data:
            notification = Notification(user_id=demo_user.id, **notif_data)
            db.add(notification)

        db.commit()
        print("✅ Database seeded successfully!")
        print("   Demo account: demo@careerflow.dev / DemoPassword123!")
        print("   Admin account: admin@careerflow.dev / AdminPassword123!")

    except Exception as e:
        db.rollback()
        print(f"❌ Error seeding database: {e}")
        raise
    finally:
        db.close()


if __name__ == "__main__":
    Base.metadata.create_all(bind=engine)
    seed()
