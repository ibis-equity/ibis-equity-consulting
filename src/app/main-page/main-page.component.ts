import { Component } from '@angular/core';

@Component({
  selector: 'app-main-page',
  template: `
    <main class="main-page">
      <div class="welcome-wrap">
        <div class="welcome-header" role="banner" aria-label="Welcome header">
          Welcome to Ibis Equity Consulting, LLC
        </div>
      </div>

      <header class="hero">
        <h1 class="brand">🪶 Ibis Equity Consulting</h1>
        <h2 class="tagline">AI Service Offerings for a Just, Intelligent Future</h2>
        <blockquote class="lead">“We build intelligent systems that honor complexity, elevate equity, and co-author futures worth living.”</blockquote>
      </header>

      <hr class="divider" />

      <section class="capabilities">
        <h3 class="section-title">🔮 Core Capabilities</h3>

        <article class="capability">
          <h4>🧠 Equity-Centered AI Strategy</h4>
          <ul>
            <li>Ethical AI blueprints aligned with justice, transparency, and cultural resonance</li>
            <li>Stakeholder-centered design with symbolic UI components</li>
            <li>DEI-aligned model governance and narrative accountability</li>
          </ul>
        </article>

        <article class="capability">
          <h4>🧩 Modular AI Engineering &amp; Agentic Systems</h4>
          <ul>
            <li>Python-based, test-driven AI services with FastAPI, LangChain, and vector memory</li>
            <li>Agentic workflows with modular reasoning and prompt orchestration</li>
            <li>GitHub Copilot integration for traceable, collaborative development</li>
          </ul>
        </article>

        <article class="capability">
          <h4>☁️ Cloud-Native AI Deployment</h4>
          <ul>
            <li>Serverless and containerized AI on AWS (Lambda, ECS, SageMaker) and Azure</li>
            <li>CI/CD pipelines with observability, auto-scaling, and cost optimization</li>
            <li>Real-time inference and batch processing at scale</li>
          </ul>
        </article>

        <article class="capability">
          <h4>🔁 Data Engineering for AI Readiness</h4>
          <ul>
            <li>Kafka, PySpark, and AWS Glue pipelines for real-time and batch data</li>
            <li>Data cleaning, enrichment, and lineage for model training and monitoring</li>
            <li>Ethical data sourcing and governance frameworks</li>
          </ul>
        </article>

        <article class="capability">
          <h4>🧠 AI Talent Evaluation &amp; Hiring</h4>
          <ul>
            <li>Custom technical assessments for AI engineers and prompt designers</li>
            <li>Interview design focused on equity, clarity, and systems thinking</li>
            <li>Hiring strategy for building inclusive, high-performance AI teams</li>
          </ul>
        </article>

        <article class="capability">
          <h4>📊 Symbolic Dashboards &amp; Interfaces</h4>
          <ul>
            <li>Mythic-modern dashboards using Streamlit, Dash, or React</li>
            <li>Visual storytelling with cultural motifs and symbolic logic</li>
            <li>Interfaces that speak to both data and spirit</li>
          </ul>
        </article>

        <article class="capability">
          <h4>🛡️ AI Ethics, Auditing &amp; Governance</h4>
          <ul>
            <li>Bias audits, explainability reviews, and compliance checks</li>
            <li>Governance frameworks rooted in community values and regulatory foresight</li>
            <li>Workshops on ethical AI, stakeholder engagement, and narrative design</li>
          </ul>
        </article>
      </section>

      <hr class="divider" />

      <section class="sectors">
        <h3 class="section-title">🏛️ Sector-Specific Solutions</h3>

        <article class="sector">
          <h4>⚖️ Law &amp; Justice</h4>
          <ul>
            <li>Legal NLP for contracts, case law, and regulatory texts</li>
            <li>Equity-aware automation for intake, eligibility, and sentencing</li>
            <li>Governance dashboards for risk, precedent, and policy alignment</li>
            <li>Agentic legal assistants for paralegal support and multilingual translation</li>
          </ul>
        </article>

        <article class="sector">
          <h4>🏥 Healthcare &amp; Public Health</h4>
          <ul>
            <li>Clinical decision support with explainable AI</li>
            <li>Health equity dashboards for outcomes and disparities</li>
            <li>FHIR-compliant data pipelines for EHR and predictive modeling</li>
            <li>Agentic care navigators for education, scheduling, and benefits</li>
          </ul>
        </article>

        <article class="sector">
          <h4>🎓 Education &amp; Learning</h4>
          <ul>
            <li>Culturally responsive tutoring agents</li>
            <li>Curriculum-aware LLMs for formative feedback</li>
            <li>Equity-centered learning analytics and intervention pathways</li>
            <li>Symbolic interfaces for storytelling and inquiry-based learning</li>
          </ul>
        </article>

        <article class="sector">
          <h4>🧠 Agentic Workflows</h4>
          <ul>
            <li>Prompt-orchestrated agents with semantic memory and tool use</li>
            <li>Symbolic UI components for cognitive mapping and archetypal logic</li>
            <li>Cloud-native deployment with ethical traceability</li>
            <li>Auditability and versioning for agent decisions and outputs</li>
          </ul>
        </article>
      </section>
    </main>
  `,
  styles: [`
    .main-page { padding: 28px; max-width: 1100px; margin: 0 auto; color: #111; font-family: "Inter", system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial; }

    /* centered bordered welcome header */
    .welcome-wrap { display:flex; justify-content:center; margin-bottom: 12px; }
    .welcome-header {
      max-width: 980px;
      width: 100%;
      text-align: center;
      border: 2px solid rgba(34,34,34,0.08);
      background: linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.00));
      padding: 14px 18px;
      border-radius: 10px;
      font-weight: 700;
      font-size: 1.15rem;
      color: #1a1a1a;
      box-shadow: 0 6px 20px rgba(10,10,10,0.04);
    }

    .hero { text-align: center; margin-bottom: 18px; }
    .brand { font-size: 2rem; margin: 0; }
    .tagline { font-weight: 600; margin: 8px 0 6px; color: #333; }
    .lead { margin: 0 0 18px; font-style: italic; color: #555; }
    .divider { border: 0; border-top: 1px solid #e6e6e6; margin: 20px 0; }

    .section-title { font-size: 1.25rem; margin-bottom: 10px; color: #222; }
    .capability, .sector { margin-bottom: 16px; }
    .capability h4, .sector h4 { margin: 6px 0; font-size: 1.05rem; }
    ul { margin: 8px 0 0 20px; color: #333; }
    li { margin-bottom: 6px; line-height: 1.35; }

    @media (prefers-reduced-motion: reduce) {
      * { transition: none !important; animation: none !important; }
    }

    @media (max-width: 700px) {
      .main-page { padding: 18px; }
      .brand { font-size: 1.6rem; }
      .welcome-header { font-size: 1rem; padding: 12px 14px; }
    }
  `]
})
export class MainPageComponent {}