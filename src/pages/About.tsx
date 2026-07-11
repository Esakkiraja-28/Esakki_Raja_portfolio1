import { motion } from "framer-motion";
import { ArrowLeft, Download } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import html2pdf from "html2pdf.js";

export default function About() {
  const navigate = useNavigate();
  const text = "About Myself";

  const [displayedText, setDisplayedText] = useState("");
  const [countdown, setCountdown] = useState(null);
  const [downloading, setDownloading] = useState(false);

  // TYPING EFFECT
  useEffect(() => {
    let index = 0;
    let interval;

    const startTyping = () => {
      setDisplayedText("");
      interval = setInterval(() => {
        index++;
        setDisplayedText(text.slice(0, index));

        if (index === text.length) {
          clearInterval(interval);
          setTimeout(() => {
            index = 0;
            startTyping();
          }, 5000);
        }
      }, 120);
    };

    startTyping();
    return () => clearInterval(interval);
  }, []);

  // DOWNLOAD FUNCTION - FIXED
  const handleDownload = () => {
    if (downloading) return;

    setDownloading(true);
    setCountdown(3);

    let time = 3;

    const timer = setInterval(() => {
      time--;
      setCountdown(time);

      if (time <= 0) {
        clearInterval(timer);

        // Create a complete HTML document for PDF
        const resumeHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Esakki Raja Resume</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        html, body {
            width: 100%;
            height: 100%;
        }

        body {
            font-family: 'Segoe UI', 'Helvetica Neue', Tahoma, Geneva, Verdana, sans-serif;
            background: #000000;
            padding: 20px;
            min-height: 100vh;
            overflow-x: hidden;
        }

        .container {
            max-width: 900px;
            margin: 0 auto;
        }

        .resume-wrapper {
            background: #0d0d0d;
            border: 1px solid #222222;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.8);
        }

        .header {
            background: #000000;
            border-bottom: 2px solid #333333;
            padding: 45px 40px;
            display: flex;
            gap: 40px;
            align-items: flex-start;
        }

        .profile-photo {
            width: 150px;
            height: 150px;
            border-radius: 12px;
            border: 3px solid #444444;
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.6);
            flex-shrink: 0;
            object-fit: cover;
            transition: all 0.3s ease;
        }

        .profile-photo:hover {
            border-color: #666666;
            box-shadow: 0 12px 32px rgba(255, 255, 255, 0.1);
            transform: translateY(-3px);
        }

        .header-content {
            flex: 1;
        }

        .header-content h1 {
            font-size: 42px;
            margin-bottom: 8px;
            font-weight: 700;
            letter-spacing: -0.5px;
            color: #ffffff;
        }

        .header-content .title {
            font-size: 16px;
            color: #b0b0b0;
            margin-bottom: 18px;
            font-weight: 400;
            letter-spacing: 0.5px;
        }

        .contact-info {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 12px;
            font-size: 13px;
        }

        .contact-item {
            display: flex;
            align-items: center;
            gap: 8px;
            padding: 8px;
            background: #1a1a1a;
            border-radius: 6px;
            border: 1px solid #333333;
            transition: all 0.3s ease;
        }

        .contact-item:hover {
            background: #252525;
            border-color: #444444;
        }

        .contact-icon {
            width: 18px;
            height: 18px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 14px;
            color: #fffcfc;
        }

        .contact-item a {
            color: #ffffff;
            text-decoration: none;
            word-break: break-all;
            transition: color 0.3s ease;
        }

        .contact-item a:hover {
            color: #a1a1a1;
        }

        .content {
            padding: 40px;
            background: #0d0d0d;
        }

        .section {
            margin-bottom: 35px;
        }

        .section:last-child {
            margin-bottom: 0;
        }

        .section-title {
            font-size: 18px;
            font-weight: 700;
            color: #ffffff;
            margin-bottom: 20px;
            padding-bottom: 12px;
            border-bottom: 2px solid #333333;
            text-transform: uppercase;
            letter-spacing: 2px;
        }

        .section-content {
            display: flex;
            flex-direction: column;
            gap: 15px;
        }

        .summary-text {
            color: #d0d0d0;
            line-height: 1.8;
            font-size: 14px;
            background: #1a1a1a;
            padding: 20px;
            border-left: 3px solid #444444;
            border-radius: 6px;
            border: 1px solid #2a2a2a;
            border-left: 3px solid #555555;
            box-shadow: inset 0 1px 3px rgba(255, 255, 255, 0.02);
        }

        .skills-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
        }

        .skill-category {
            background: #1a1a1a;
            padding: 20px;
            border-radius: 8px;
            border: 1px solid #2a2a2a;
            box-shadow: inset 0 1px 3px rgba(255, 255, 255, 0.02);
            transition: all 0.3s ease;
        }

        .skill-category:hover {
            background: #1f1f1f;
            border-color: #333333;
            box-shadow: inset 0 1px 3px rgba(255, 255, 255, 0.04);
        }

        .skill-category h3 {
            color: #ffffff;
            font-size: 14px;
            margin-bottom: 15px;
            font-weight: 600;
            letter-spacing: 0.5px;
        }

        .skill-tags {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
        }

        .skill-tag {
            background: #2a2a2a;
            color: #e0e0e0;
            padding: 8px 14px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: 500;
            border: 1px solid #3a3a3a;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
            transition: all 0.3s ease;
            cursor: default;
        }

        .skill-tag:hover {
            background: #333333;
            border-color: #444444;
            color: #ffffff;
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.6);
        }

        .project {
            background: #1a1a1a;
            padding: 18px;
            border-radius: 6px;
            border: 1px solid #2a2a2a;
            border-left: 3px solid #444444;
            box-shadow: inset 0 1px 3px rgba(255, 255, 255, 0.02);
            transition: all 0.3s ease;
        }

        .project:hover {
            background: #1f1f1f;
            border-color: #333333;
            border-left-color: #555555;
            box-shadow: inset 0 1px 3px rgba(255, 255, 255, 0.04);
        }

        .project h3 {
            color: #ffffff;
            font-size: 15px;
            margin-bottom: 10px;
            font-weight: 600;
        }

        .project p {
            color: #b0b0b0;
            font-size: 13px;
            line-height: 1.6;
        }

        .project p + p {
            margin-top: 8px;
        }

        .education-item {
            background: #1a1a1a;
            padding: 18px;
            border-radius: 6px;
            border: 1px solid #2a2a2a;
            border-left: 3px solid #444444;
            box-shadow: inset 0 1px 3px rgba(255, 255, 255, 0.02);
        }

        .education-item h3 {
            color: #ffffff;
            font-size: 15px;
            margin-bottom: 8px;
            font-weight: 600;
        }

        .education-item p {
            color: #b0b0b0;
            font-size: 13px;
            line-height: 1.6;
        }

        .strengths-list {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 12px;
        }

        .strength-item {
            display: flex;
            align-items: flex-start;
            gap: 12px;
            padding: 14px;
            background: #1a1a1a;
            border-radius: 6px;
            border: 1px solid #2a2a2a;
            box-shadow: inset 0 1px 3px rgba(255, 255, 255, 0.02);
            transition: all 0.3s ease;
        }

        .strength-item:hover {
            background: #1f1f1f;
            border-color: #333333;
        }

        .strength-icon {
            color: #808080;
            font-weight: bold;
            margin-top: 2px;
            font-size: 16px;
        }

        .strength-item p {
            color: #d0d0d0;
            font-size: 13px;
            font-weight: 500;
        }

        .objective-box {
            background: #1a1a1a;
            border: 1px solid #333333;
            color: #d0d0d0;
            padding: 24px;
            border-radius: 8px;
            font-size: 14px;
            line-height: 1.8;
            box-shadow: inset 0 1px 3px rgba(255, 255, 255, 0.02);
        }

        @media print {
            body {
                background: #000000;
                padding: 0;
            }
            .resume-wrapper {
                box-shadow: none;
            }
            .header {
                page-break-after: avoid;
            }
            .section {
                page-break-inside: avoid;
            }
        }

        @media (max-width: 768px) {
            .header {
                flex-direction: column;
                align-items: center;
                text-align: center;
                padding: 30px 20px;
            }

            .header-content h1 {
                font-size: 32px;
            }

            .contact-info {
                grid-template-columns: 1fr;
            }

            .skills-grid {
                grid-template-columns: 1fr;
            }

            .strengths-list {
                grid-template-columns: 1fr;
            }

            .content {
                padding: 25px;
            }
        }

        ::-webkit-scrollbar {
            width: 10px;
        }

        ::-webkit-scrollbar-track {
            background: #1a1a1a;
        }

        ::-webkit-scrollbar-thumb {
            background: #333333;
            border-radius: 5px;
        }

        ::-webkit-scrollbar-thumb:hover {
            background: #444444;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="resume-wrapper">
            <!-- Header -->
            <div class="header">
                <img src="${window.location.origin}/assets/esakki-photo.png" alt="Esakki Raja" class="profile-photo">
                <div class="header-content">
                    <h1>Esakki Raja</h1>
                    <p class="title">Full Stack Java Developer | React Developer | MERN Stack Developer | AI Enthusiast</p>
                    <div class="contact-info">
                        <div class="contact-item">
                            <span class="contact-icon">🏠︎</span>
                            <span>Thoothukudi - 628152, Tamil Nadu, India</span>
                        </div>
                        <div class="contact-item">
                            <span class="contact-icon">✉︎</span>
                            <a href="mailto:resakki738@gmail.com">resakki738@gmail.com</a>
                        </div>
                        <div class="contact-item">
                            <span class="contact-icon">☎︎</span>
                            <a href="tel:+919025407316">+91 90254 07316</a>
                        </div>
                        <div class="contact-item">
                            <span class="contact-icon">⛆</span>
                            <a href="https://github.com/Esakkiraja-28" target="_blank">github.com/Esakkiraja-28</a>
                        </div>
                        <div class="contact-item">
                            <span class="contact-icon">🆆</span>
                            <a href="https://www.linkedin.com/in/EsakkiRaja-28" target="_blank">linkedin.com/in/EsakkiRaja-28</a>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Main Content -->
            <div class="content">
                <!-- Professional Summary -->
                <section class="section">
                    <h2 class="section-title">Professional Summary</h2>
                    <div class="summary-text">
                        I build modern, responsive and immersive web applications using Java, React, HTML, JavaScript, Bootstrap, CSS, Three.js and creative frontend technologies to create beautiful digital experiences that leave a lasting impression. Currently pursuing a B.Sc. in Information Technology, with hands-on experience across full stack, MERN stack, and UI/UX internships, and a strong interest in applying AI tools to build smarter software.
                    </div>
                </section>

                <!-- Technical Skills -->
                <section class="section">
                    <h2 class="section-title">Technical Skills</h2>
                    <div class="skills-grid">
                        <div class="skill-category">
                            <h3>Languages</h3>
                            <div class="skill-tags">
                                <span class="skill-tag">C</span>
                                <span class="skill-tag">C++</span>
                                <span class="skill-tag">Python</span>
                                <span class="skill-tag">Java</span>
                                <span class="skill-tag">JavaScript</span>
                            </div>
                        </div>
                        <div class="skill-category">
                            <h3>Web &amp; Frontend</h3>
                            <div class="skill-tags">
                                <span class="skill-tag">HTML</span>
                                <span class="skill-tag">CSS</span>
                                <span class="skill-tag">Bootstrap</span>
                                <span class="skill-tag">Tailwind CSS</span>
                                <span class="skill-tag">React</span>
                                <span class="skill-tag">Three.js</span>
                                <span class="skill-tag">Framer Motion</span>
                            </div>
                        </div>
                        <div class="skill-category">
                            <h3>Backend &amp; Database</h3>
                            <div class="skill-tags">
                                <span class="skill-tag">JSP</span>
                                <span class="skill-tag">JDBC</span>
                                <span class="skill-tag">Servlet</span>
                                <span class="skill-tag">Node.js</span>
                                <span class="skill-tag">MySQL</span>
                            </div>
                        </div>
                        <div class="skill-category">
                            <h3>Tools &amp; Platforms</h3>
                            <div class="skill-tags">
                                <span class="skill-tag">VS Code</span>
                                <span class="skill-tag">Code::Blocks</span>
                                <span class="skill-tag">Turbo C</span>
                                <span class="skill-tag">Figma</span>
                                <span class="skill-tag">Spline</span>
                                <span class="skill-tag">Canva</span>
                                <span class="skill-tag">MySQL Workbench</span>
                                <span class="skill-tag">XAMPP</span>
                                <span class="skill-tag">Git &amp; GitHub</span>
                                <span class="skill-tag">Netlify</span>
                                <span class="skill-tag">NetBeans</span>
                                <span class="skill-tag">Vercel</span>
                            </div>
                        </div>
                        <div class="skill-category">
                            <h3>AI Tools</h3>
                            <div class="skill-tags">
                                <span class="skill-tag">ChatGPT</span>
                                <span class="skill-tag">Claude</span>
                                <span class="skill-tag">Bolt</span>
                                <span class="skill-tag">Grok</span>
                                <span class="skill-tag">Meta AI</span>
                            </div>
                        </div>
                        <div class="skill-category">
                            <h3>Soft Skills</h3>
                            <div class="skill-tags">
                                <span class="skill-tag">Communication</span>
                                <span class="skill-tag">Leadership</span>
                                <span class="skill-tag">Problem Solving</span>
                                <span class="skill-tag">Time Management</span>
                                <span class="skill-tag">Error Handling</span>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- Projects -->
                <section class="section">
                    <h2 class="section-title">Projects</h2>
                    <div class="section-content">
                        <div class="project">
                            <h3>Event Registration Management System</h3>
                            <p>• Built a full stack event registration and management platform using Java and MySQL</p>
                            <p>• Implemented registration workflows, data validation, and admin management features</p>
                            <p>• Live at: eventregistrationsystem-h7sl.onrender.com</p>
                        </div>
                        <div class="project">
                            <h3>Digital Portfolio</h3>
                            <p>• Developed a modern, responsive personal portfolio with React, Three.js and Tailwind CSS</p>
                            <p>• Built smooth animations, an interactive 3D ID card, and immersive UI components</p>
                            <p>• Optimized for performance and mobile responsiveness</p>
                        </div>
                    </div>
                </section>

                <!-- Education -->
                <section class="section">
                    <h2 class="section-title">Education</h2>
                    <div class="education-item">
                        <h3>B.Sc. Information Technology</h3>
                        <p>Pope's College, Sawyerpuram, Thoothukudi — Manonmaniam Sundaranar University</p>
                        <p>June 2024 – Present (Third Year) · Expected completion 2027</p>
                    </div>
                </section>

                <!-- Certifications & Internships -->
                <section class="section">
                    <h2 class="section-title">Certifications &amp; Internships</h2>
                    <div class="section-content">
                        <div class="project">
                            <h3>Advanced Diploma in Python Programming (ADPP)</h3>
                            <p>CSC Computer Education Centre, Thoothukudi · 18 Jan 2024 – 18 May 2024</p>
                        </div>
                        <div class="project">
                            <h3>Full Stack Web Development (React) — Online Course</h3>
                            <p>Novitech R&amp;D Private Limited, Coimbatore · 10 Jul 2025 – 10 Aug 2025</p>
                        </div>
                        <div class="project">
                            <h3>Machine Learning — One Day Masterclass</h3>
                            <p>Pantech E-Learning · 16 Sep 2025</p>
                        </div>
                        <div class="project">
                            <h3>Full Stack Web Development — 30 Days Online Masterclass</h3>
                            <p>Novitech R&amp;D Private Limited · 2 Feb 2026 – 10 Mar 2026</p>
                        </div>
                        <div class="project">
                            <h3>Full Stack Development (React) — Online Internship</h3>
                            <p>Novitech R&amp;D Private Limited · 2 Feb 2026 – 2 Mar 2026</p>
                        </div>
                        <div class="project">
                            <h3>UI/UX Design — Online Internship</h3>
                            <p>Novitech R&amp;D Private Limited · 2 Feb 2026 – Mar 2026</p>
                        </div>
                        <div class="project">
                            <h3>MERN Stack Development — Online Internship (3 Months)</h3>
                            <p>Novitech R&amp;D Private Limited · 2 Feb 2026 – 2 May 2026</p>
                        </div>
                        <div class="project">
                            <h3>Full Stack Java Development — Offline Internship</h3>
                            <p>Techvolt Software, Coimbatore · 1 Month</p>
                        </div>
                    </div>
                </section>

                <!-- Strengths -->
                <section class="section">
                    <h2 class="section-title">Key Strengths</h2>
                    <div class="strengths-list">
                        <div class="strength-item">
                            <span class="strength-icon">✔</span>
                            <p>Fast Learner</p>
                        </div>
                        <div class="strength-item">
                            <span class="strength-icon">✔</span>
                            <p>Creative Problem Solving</p>
                        </div>
                        <div class="strength-item">
                            <span class="strength-icon">✔</span>
                            <p>Strong Interest in Technology</p>
                        </div>
                        <div class="strength-item">
                            <span class="strength-icon">✔</span>
                            <p>Consistent Self-Learning</p>
                        </div>
                        <div class="strength-item">
                            <span class="strength-icon">✔</span>
                            <p>Team Collaboration</p>
                        </div>
                        <div class="strength-item">
                            <span class="strength-icon">✔</span>
                            <p>Goal-Oriented Approach</p>
                        </div>
                    </div>
                </section>

                <!-- Career Objective -->
                <section class="section">
                    <h2 class="section-title">Career Objective</h2>
                    <div class="objective-box">
                        To build a successful career as a full stack developer by continuously strengthening my skills in Java, React, and modern web technologies, while creating clean, responsive and immersive digital experiences and contributing to impactful, innovative projects.
                    </div>
                </section>

                <!-- Additional Interests -->
                <section class="section">
                    <h2 class="section-title">Additional Interests</h2>
                    <div class="skills-grid">
                        <div class="skill-category">
                            <h3>Technical Interests</h3>
                            <div class="skill-tags">
                                <span class="skill-tag">Full Stack Development</span>
                                <span class="skill-tag">Artificial Intelligence</span>
                                <span class="skill-tag">Creative UI Design</span>
                                <span class="skill-tag">3D Web Experiences</span>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    </div>
</body>
</html>
        `;

        const blob = new Blob([resumeHTML], {
          type: "text/html"
        });

        const url = URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = "Esakki_Raja_Resume.html";

        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

        window.open(url, "_blank");
        setTimeout(() => URL.revokeObjectURL(url), 10000);

        setDownloading(false);
        setCountdown(null);
      }
    }, 1000);
  };


  return (
    <div className="relative min-h-screen bg-black overflow-hidden text-white px-4 sm:px-6 py-10">
      {/* ANIMATED BACKGROUND EFFECTS */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-white/5 rounded-full blur-3xl opacity-20" />
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-white/5 rounded-full blur-3xl opacity-20" />
      </div>

      {/* BACK BUTTON */}
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        onClick={() => navigate(-1)}
        className="
          fixed
          top-5
          left-5
          z-50
          flex
          items-center
          gap-2
          px-4
          py-2
          rounded-full
          border
          border-white/15
          bg-white/8
          backdrop-blur-xl
          hover:bg-white/15
          hover:border-white/30
          transition-all
          duration-300
          shadow-lg
        "
      >
        <ArrowLeft size={18} />
        <span className="hidden sm:inline">Back</span>
      </motion.button>

      {/* MAIN CONTENT */}
      <div className="relative z-20 flex flex-col items-center justify-center min-h-screen gap-8">

        {/* IMAGE SECTION */}
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="flex flex-col items-center"
        >
          <img
            src="/assets/esakki-photo.png"
            alt="Esakki Raja"
            className="
              w-[200px]
              sm:w-[280px]
              md:w-[320px]
              rounded-2xl
              border
              border-white/15
              object-cover
              shadow-[0_20px_60px_rgba(0,0,0,0.6)]
              hover:border-white/25
              transition-all
              duration-300
            "
          />

          {/* DIVIDER LINE */}
          <div
            className="
              mt-6
              h-[1px]
              bg-gradient-to-r
              from-transparent
              via-white/20
              to-transparent
              w-[90vw]
              sm:w-[400px]
              md:w-[500px]
            "
          />
        </motion.div>

        {/* GLASS BOX CONTAINER */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1,
            delay: 0.2,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="
            relative
            w-full
            max-w-4xl
            h-[500px]
            sm:h-[550px]
            md:h-[600px]
            rounded-3xl
            border
            border-white/10
            bg-white/5
            backdrop-blur-3xl
            overflow-hidden
            shadow-[0_20px_70px_rgba(0,0,0,0.5)]
            group
          "
        >
          {/* GLASS LIGHT EFFECT */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/8 via-transparent to-transparent pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />

          {/* HEADER SECTION */}
          <div
            className="
              relative
              z-20
              flex
              items-center
              justify-center
              px-6
              py-6
              sm:py-8
              border-b
              border-white/10
              bg-black/30
              backdrop-blur-2xl
            "
          >
            <h1
              className="
                text-3xl
                sm:text-4xl
                md:text-5xl
                font-extrabold
                tracking-tight
              "
            >
              {displayedText}
              <span className="animate-pulse ml-2">|</span>
            </h1>
          </div>

          {/* SCROLLABLE CONTENT */}
          <div
            className="
              relative
              z-10
              h-[calc(100%-80px)]
              overflow-y-auto
              px-6
              sm:px-10
              md:px-12
              py-8
              scrollbar-thin
              scrollbar-track-transparent
              scrollbar-thumb-white/10
              hover:scrollbar-thumb-white/20
            "
          >
            <div
              className="
                text-white/70
                text-sm
                sm:text-base
                leading-8
                tracking-wide
                space-y-6
              "
            >
              <p>
                I'm Esakki Raja, currently in my third year of B.Sc.
                Information Technology at Pope's College, Sawyerpuram,
                Thoothukudi (affiliated to Manonmaniam Sundaranar University).
                What started as curiosity about how websites and applications
                work has grown into a genuine passion for building software.
              </p>

              <p>
                Over the course of my degree, I've pushed myself well beyond
                the classroom syllabus — completing an Advanced Diploma in
                Python Programming, multiple full stack and MERN stack
                internships, a UI/UX design internship, and hands-on training
                in Java-based full stack development.
              </p>

              <p>
                I enjoy working across the stack — from designing clean,
                responsive interfaces with React, HTML, CSS, Tailwind and
                Three.js, to building solid backend logic with Java, JDBC and
                Servlets, backed by MySQL. I like understanding how every
                layer of an application connects.
              </p>

              <p>
                I'm also genuinely curious about AI tools and how they can
                speed up and improve the way we build software, and I enjoy
                bringing a creative, design-conscious eye to every interface
                I build.
              </p>

              <p>
                My goal is to keep growing as a full stack developer —
                writing clean code, designing thoughtful user experiences,
                and continuously picking up new technologies along the way.
              </p>

              <p>
                I'm always open to internships, freelance work, and
                collaborations where I can learn, contribute, and build
                something meaningful.
              </p>
            </div>
          </div>
        </motion.div>

        {/* DOWNLOAD BUTTON */}
        <motion.button
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1,
            delay: 0.4,
          }}
          onClick={handleDownload}
          disabled={downloading}
          className="
            group
            relative
            overflow-hidden
            flex
            items-center
            justify-center
            gap-3
            px-8
            sm:px-10
            py-3
            sm:py-4
            rounded-2xl
            border
            border-white/15
            bg-white/8
            backdrop-blur-xl
            hover:bg-white/15
            hover:border-white/30
            disabled:opacity-50
            disabled:cursor-not-allowed
            transition-all
            duration-300
            shadow-[0_10px_40px_rgba(0,0,0,0.4)]
            hover:shadow-[0_15px_50px_rgba(255,255,255,0.08)]
          "
        >
          {/* BUTTON GLOW EFFECT */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition-all duration-500" />

          {/* BUTTON CONTENT */}
          <div className="relative z-10 flex items-center gap-3">
            <Download
              size={20}
              className="
                group-hover:scale-110
                group-hover:-translate-y-1
                transition-all
                duration-300
              "
            />
            <span className="font-semibold tracking-wide">
              {downloading ? `Downloading in ${countdown}s` : "Download Resume"}
            </span>
          </div>
        </motion.button>
      </div>
    </div>
  );
}