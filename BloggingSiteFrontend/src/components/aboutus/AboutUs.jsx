import React from "react";

/**
 * About / Portfolio component for Akhilesh Soni
 *
 * Usage:
 *  - Put "Akhilesh_Soni-Resume.pdf" in your public/ folder
 *  - Add a route in App.jsx: <Route path="/about" element={<AboutUs />} />
 *
 * Design: responsive, accessible, recruiter-focused.
 */

const projects = [
  {
    title: "Margyn for Seller (AI-first Seller Toolkit)",
    tech: "Node.js, Express, MongoDB, Socket.IO, AWS EC2, Seedreams AI",
    desc:
      "Built backend with wallets/credits, subscriptions, image workflows (background removal, enhancements), real-time buyer-seller lead claiming and audit logging.",
  },
  {
    title: "Z App (EdTech Platform)",
    tech: "Node.js, Express, MongoDB, Razorpay, Cloudinary, AWS EC2",
    desc:
      "Student/Teacher dashboards, attendance, tests, payments (Razorpay with webhooks), secure deployment with Nginx & PM2.",
  },
  {
    title: "upClass (Multi-tenant SaaS)",
    tech: "Node.js, Express, MongoDB, Razorpay, AWS EC2",
    desc:
      "Multi-tenant architecture with RBAC, white-label portals, course & billing automation, optimized deployment pipelines.",
  },
  {
    title: "PulseAdvi (Ad Platform)",
    tech: "Node.js, MongoDB, OpenAI, Fast2SMS, JWT",
    desc:
      "Mobile ad-campaign platform with wallet top-ups, OpenAI-based verification and campaign analytics.",
  },
  {
    title: "NotaAI (AI-powered Notes App)",
    tech: "Node.js, OpenAI API, MongoDB",
    desc:
      "Built smart notes with OCR, chat & utilities, secure email login and optimized storage.",
  },
];

const skills = [
  "JavaScript (ES6+)",
  "React",
  "Node.js",
  "Express.js",
  "MongoDB / Mongoose",
  "Socket.IO",
  "Redis",
  "JWT / OAuth / RBAC",
  "Razorpay / Stripe / Square",
  "OpenAI / Seedreams AI",
  "AWS (EC2, S3)",
  "Docker / CI-CD",
  "Nginx / PM2",
];

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-6">
        {/* Hero */}
        <section className="bg-white rounded-2xl shadow-lg p-8 md:flex md:gap-8 items-center">
          {/* Photo / avatar placeholder */}
          <div className="w-40 h-40 rounded-lg bg-gradient-to-br from-red-500 to-pink-500 flex items-center justify-center text-white text-2xl font-bold shrink-0">
            AS
          </div>

          <div className="mt-6 md:mt-0 flex-1">
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900">
              Akhilesh Soni
            </h1>
            <p className="text-sm text-gray-500 mt-1">Backend Developer</p>

            <p className="mt-4 text-gray-700 leading-relaxed">
              Backend Developer with 3+ years experience building scalable
              e-commerce, EdTech and AI-powered mobile applications.
              Proficient in Node.js, Express, MongoDB and AWS. Experienced in
              payment integrations, real-time systems, authentication and API
              design. (Read full resume below)
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="/Akhilesh_Soni-Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded shadow hover:bg-red-700 transition"
              >
                Download Resume
              </a>

              <a
                href="mailto:akhileshsoni098@gmail.com"
                className="inline-flex items-center gap-2 border border-gray-200 px-4 py-2 rounded hover:bg-gray-100 transition"
              >
                Contact: akhileshsoni098@gmail.com
              </a>

              <a
                href="https://github.com/akhileshsoni" 
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-gray-700 px-4 py-2 rounded hover:bg-gray-100 transition"
              >
                GitHub
              </a>

              <a
                href="https://www.linkedin.com/in/akhileshsoni" 
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-gray-700 px-4 py-2 rounded hover:bg-gray-100 transition"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </section>

        {/* Key stats / summary */}
        <section className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="text-sm text-gray-500">Experience</h3>
            <p className="text-2xl font-bold mt-2">3+ Years</p>
            <p className="text-sm text-gray-500 mt-1">Backend & Systems</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="text-sm text-gray-500">Tech Focus</h3>
            <p className="text-2xl font-bold mt-2">Node.js · MongoDB</p>
            <p className="text-sm text-gray-500 mt-1">Real-time · Payments · AI</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="text-sm text-gray-500">Impact</h3>
            <p className="text-2xl font-bold mt-2">10k+ users</p>
            <p className="text-sm text-gray-500 mt-1">Multiple live apps</p>
          </div>
        </section>

        {/* Skills */}
        <section className="mt-8 bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold text-gray-800">Skills</h2>
          <p className="text-sm text-gray-500 mt-1">
            Strong backend & full-stack fundamentals — highlights below.
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            {skills.map((s) => (
              <span
                key={s}
                className="px-3 py-1 rounded-full bg-gray-100 text-sm text-gray-800 border"
              >
                {s}
              </span>
            ))}
          </div>
        </section>

        {/* Projects */}
        <section className="mt-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Selected Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((p) => (
              <article key={p.title} className="bg-white rounded-xl shadow p-5">
                <div className="flex items-start justify-between">
                  <h3 className="text-lg font-bold">{p.title}</h3>
                  <span className="text-sm text-gray-500">{p.tech}</span>
                </div>
                <p className="text-gray-700 mt-3">{p.desc}</p>
              </article>
            ))}
          </div>
        </section>

        {/* Resume & contact CTA */}
        <section className="mt-8 bg-white rounded-xl shadow p-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold">Want to see full experience?</h3>
            <p className="text-gray-600 mt-1">Download the detailed resume (PDF) or get in touch.</p>
          </div>

          <div className="flex gap-3">
            <a
              href="/Akhilesh_Soni-Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-red-600 text-white px-5 py-2 rounded-md hover:bg-red-700 transition"
            >
              Download Resume
            </a>
            <a
              href="mailto:akhileshsoni098@gmail.com?subject=Opportunity"
              className="border px-5 py-2 rounded-md hover:bg-gray-100 transition"
            >
              Email Me
            </a>
          </div>
        </section>

        {/* small footer */}
        <footer className="mt-6 text-center text-sm text-gray-500">
          Built by Akhilesh Soni — Backend Engineer. Resume source: <span className="text-blue-600">PDF</span>.
        </footer>
      </div>
    </div>
  );
};

export default AboutUs;
