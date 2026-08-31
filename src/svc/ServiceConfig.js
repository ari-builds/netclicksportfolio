export const serviceCategories = [
  {
    slug: "lead-gen-outreach",
    label: "Lead Generation + Outreach",
    short: "Lead Gen + Outreach",
    color: "#8b9cf6",
    description:
      "An AI-powered prospecting system that finds your ideal prospects, scores them by real intent, and reaches out with messaging tailored to each one. Built for businesses that want a full pipeline, not one-off campaigns.",
    how: "We build a landing page people land on and want to fill out, capture the leads that come in, then reach out to each one with a message written for them. It runs on a recurring monthly retainer so the pipeline keeps filling.",
    steps: ["Build the landing page", "Capture and qualify leads", "Send personalized follow-ups", "Keep the pipeline full"],
    services: [
      {
        slug: "svc-leadgen",
        title: "Lead Generation",
        tagline: "Turn visitors into qualified opportunities.",
        description:
          "Strategic lead generation systems combining high-converting landing pages, smart form automation, and multi-channel capture funnels that fill your pipeline with decision-ready prospects.",
        iconName: "target",
        color: "#8b9cf6",
        features: [
          { title: "Conversion Landing Pages", desc: "A/B tested page architectures with persuasive copy, social proof, and scarcity triggers that maximize conversion rates." },
          { title: "Smart Form Automation", desc: "Conditional logic forms, progressive profiling, and auto-enrichment that capture more data without friction." },
          { title: "Multi-Channel Capture", desc: "Chat widgets, exit-intent popups, email capture, and SMS opt-ins coordinated across your entire digital presence." },
          { title: "CRM Integration", desc: "Real-time lead sync to Salesforce, HubSpot, or custom CRM with lead scoring and automated follow-up sequences." },
          { title: "Analytics & Attribution", desc: "Source-level attribution, funnel drop-off analysis, and cohort reporting to optimize CAC and LTV." },
        ],
      },
      {
        slug: "svc-outreach",
        title: "AI Outreach Campaigns",
        tagline: "Personalized at scale. Intelligent by design.",
        description:
          "AI-powered outreach campaigns that craft personalized email sequences, LinkedIn messages, and SMS campaigns. Natural language generation tailored to each prospect's profile and behavior.",
        iconName: "send",
        color: "#8b9cf6",
        features: [
          { title: "AI Personalization Engine", desc: "Dynamic content insertion using prospect data — job title, industry, recent news — for messages that feel handwritten." },
          { title: "Omnichannel Sequences", desc: "Coordinated email, LinkedIn, and SMS cadences with intelligent channel switching based on engagement patterns." },
          { title: "A/B Testing Automation", desc: "Automated subject line, body copy, and send-time testing that converges on winning variants without manual intervention." },
          { title: "Reply Detection & Routing", desc: "Reply analysis that auto-tags intent and routes hot leads to sales instantly." },
          { title: "Performance Analytics", desc: "Real-time dashboards tracking open rates, reply rates, meetings booked, and pipeline generated — per campaign and per rep." },
        ],
      },
    ],
  },
  {
    slug: "ads-content",
    label: "Ads & Content",
    short: "Ads & Content",
    color: "#8b9cf6",
    description:
      "Keep your brand active and your content working for you. Social media on autopilot, ad-ready creative, and a content operation that one person can actually run.",
    how: "We plan a content calendar around your goals, generate the posts and visuals, publish them across platforms on a schedule, and review what lands so we double down on what works.",
    steps: ["Plan the calendar", "Generate posts and visuals", "Publish on a schedule", "Review and repeat what works"],
    services: [
      {
        slug: "svc-social",
        title: "Social Media Autopilot",
        tagline: "Consistent presence. Zero daily effort.",
        description:
          "AI-driven social media management that plans, creates, schedules, and analyzes content across all major platforms. Calendar management, visual generation, and engagement analytics on autopilot.",
        iconName: "share2",
        color: "#8b9cf6",
        features: [
          { title: "AI Content Generation", desc: "Platform-optimized posts, captions, and visuals generated from your brand voice and content strategy brief." },
          { title: "Smart Scheduling", desc: "Optimal posting times calculated per platform and audience. Auto-schedules your monthly calendar in minutes." },
          { title: "Cross-Platform Publishing", desc: "Simultaneous or staggered publishing to Instagram, LinkedIn, Twitter/X, Facebook, TikTok, and Threads." },
          { title: "Engagement Analytics", desc: "Real-time metrics on reach, engagement rate, follower growth, and sentiment — with actionable recommendations." },
          { title: "Content Remixing", desc: "Automatically repurpose high-performing content into different formats — video to carousel, blog to thread, etc." },
        ],
      },
      {
        slug: "svc-content",
        title: "Content Vault & Management",
        tagline: "Your content. Organized. Accessible. Automated.",
        description:
          "Centralized content management with AI-powered organization and multi-channel publishing. Your entire content operation in one place.",
        iconName: "fileText",
        color: "#8b9cf6",
        features: [
          { title: "Central Content Hub", desc: "Unified repository for all your content — docs, images, video, audio — with full-text search and smart tagging." },
          { title: "AI Content Organization", desc: "Auto-tagging, topic clustering, and content gap analysis that surfaces what to create next." },
          { title: "Approval Workflows", desc: "Custom review chains with inline commenting and version comparison for seamless collaboration." },
          { title: "Multi-Channel Publishing", desc: "One-click publishing to web, social, email, and print — with platform-specific formatting applied automatically." },
          { title: "Content Analytics", desc: "Performance tracking per piece, author, channel, and topic — with recommendations for content refresh." },
        ],
      },
    ],
  },
  {
    slug: "websites-apps",
    label: "Websites & Apps",
    short: "Websites & Apps",
    color: "#8b9cf6",
    description:
      "Custom websites, e-commerce stores, and apps that look great and convert. Built to be fast, secure, and easy to maintain.",
    how: "We start with your goals and audience, design the pages, build a fast site, then hand it over clean and easy to update. Everything we ship is structured so you can keep running it after launch.",
    steps: ["Plan and design", "Build and test", "Launch and connect", "Hand over and support"],
    services: [
      {
        slug: "svc-web-design",
        title: "Web Design",
        tagline: "Pixel-perfect interfaces that captivate and convert.",
        description:
          "We craft visually stunning, user-centered designs that communicate your brand identity and guide visitors seamlessly toward conversion. Every layout, color palette, and typographic choice is intentional.",
        iconName: "palette",
        color: "#8b9cf6",
        features: [
          { title: "Custom UI/UX Design", desc: "Tailored wireframes and high-fidelity mockups built around your brand guidelines and user research." },
          { title: "Responsive Layouts", desc: "Fluid designs that look impeccable across every screen size — from mobile to ultrawide." },
          { title: "Design Systems", desc: "Component libraries and style guides ensuring visual consistency across your entire digital ecosystem." },
          { title: "Interactive Prototypes", desc: "Clickable Figma prototypes for user testing and stakeholder buy-in before a single line of code is written." },
          { title: "Accessibility First", desc: "WCAG 2.1 AA compliant designs with semantic structure, contrast ratios, and keyboard navigation built in." },
        ],
      },
      {
        slug: "svc-web-dev",
        title: "Web Development",
        tagline: "Robust, scalable websites engineered for performance.",
        description:
          "From static landing pages to full-stack web applications, we build with modern frameworks and best-in-class architecture. Clean code, fast load times, and future-proof scalability.",
        iconName: "code",
        color: "#8b9cf6",
        features: [
          { title: "Frontend Engineering", desc: "React, Next.js, and Vue applications with optimized bundles, SSR, and dynamic routing for blazing-fast experiences." },
          { title: "Backend Architecture", desc: "Node.js, Python, and Go services with RESTful and GraphQL APIs designed for reliability and throughput." },
          { title: "CMS Integration", desc: "Headless CMS solutions — Sanity, Strapi, Contentful — giving your team full control over content without touching code." },
          { title: "E-Commerce Engines", desc: "Shopify, Medusa, or custom checkout flows engineered for conversion and inventory management." },
          { title: "DevOps & Hosting", desc: "CI/CD pipelines, Vercel/AWS deployment, monitoring, and automated rollbacks for worry-free releases." },
        ],
      },
      {
        slug: "svc-ecommerce",
        title: "E-Commerce",
        tagline: "Online stores that drive revenue, not just traffic.",
        description:
          "Full-funnel e-commerce solutions designed to maximize average order value, reduce cart abandonment, and create memorable shopping experiences that keep customers coming back.",
        iconName: "shoppingCart",
        color: "#8b9cf6",
        features: [
          { title: "Storefront Design", desc: "Conversion-optimized product pages, intuitive navigation, and streamlined checkout flows that feel effortless." },
          { title: "Payment & Shipping", desc: "Multi-gateway payment processing, real-time shipping calculations, and automated tax compliance out of the box." },
          { title: "Inventory Management", desc: "Real-time stock tracking, supplier integrations, and low-stock alerts that prevent overselling." },
          { title: "Marketing Integrations", desc: "Email flows, abandoned cart recovery, upsells, and loyalty programs wired directly into your store." },
          { title: "Analytics & Reporting", desc: "Custom dashboards tracking LTV, CAC, ROAS, and cohort analysis to inform every business decision." },
        ],
      },
      {
        slug: "svc-responsive",
        title: "Responsive Design",
        tagline: "Flawless experiences on every device.",
        description:
          "Responsive design engineering that ensures your digital presence adapts beautifully to any screen. Mobile-first approach with attention to touch targets, readability, and performance.",
        iconName: "monitor",
        color: "#8b9cf6",
        features: [
          { title: "Mobile-First Framework", desc: "Touch-optimized interfaces with thumb-friendly navigation, responsive typography, and adaptive image loading." },
          { title: "Cross-Browser Testing", desc: "Rigorous testing across Chrome, Safari, Firefox, Edge, and mobile browsers — no edge case left unchecked." },
          { title: "Adaptive Layouts", desc: "CSS Grid and Flexbox architectures that reflow content intelligently from watch faces to 4K displays." },
          { title: "Performance Budgets", desc: "Strict performance budgets ensuring fast load times across all device classes." },
          { title: "Accessibility Parity", desc: "Identical functionality and information access across devices, with screen reader support." },
        ],
      },
      {
        slug: "svc-performance",
        title: "Performance",
        tagline: "Speed is a feature. We make it yours.",
        description:
          "Performance optimization that transforms sluggish sites into lightning-fast experiences. Core Web Vitals, image optimization, caching strategies, and CDN configuration for instant loading.",
        iconName: "zap",
        color: "#8b9cf6",
        features: [
          { title: "Core Web Vitals", desc: "LCP, FID, and CLS optimization targeting Google's top thresholds for search ranking and user retention." },
          { title: "Image & Asset Optimization", desc: "Next-gen formats, responsive image sets, lazy loading, and compression pipelines that cut payloads." },
          { title: "CDN & Edge Caching", desc: "Global CDN deployment with edge caching, Brotli compression, and HTTP/3 for fast TTFB worldwide." },
          { title: "Code Splitting", desc: "Tree-shaking, dynamic imports, and granular code splitting that ensure users only download what they need." },
          { title: "Database Query Tuning", desc: "Index optimization, query profiling, and connection pooling that reduce database response times." },
        ],
      },
      {
        slug: "svc-seo",
        title: "SEO Optimization",
        tagline: "Dominate search. Drive organic growth.",
        description:
          "Data-driven SEO strategies that improve rankings, increase organic traffic, and generate qualified leads. Technical audits, content strategy, and ongoing optimization included.",
        iconName: "search",
        color: "#8b9cf6",
        features: [
          { title: "Technical SEO Audit", desc: "Comprehensive crawl analysis, Core Web Vitals assessment, and structured data implementation for maximum indexability." },
          { title: "Keyword Strategy", desc: "Competitive keyword mapping, search intent analysis, and topic clusters that capture high-intent traffic." },
          { title: "On-Page Optimization", desc: "Meta tags, header structure, internal linking, and content optimization aligned with search engines' guidelines." },
          { title: "Local SEO", desc: "Google Business Profile optimization, local citation building, and review management for local businesses." },
          { title: "Link Building", desc: "Outreach campaigns and strategic partnerships that earn high-authority backlinks." },
        ],
      },
      {
        slug: "svc-maintenance",
        title: "Website Maintenance & Support",
        tagline: "Your site stays fresh. You stay focused.",
        description:
          "Ongoing website maintenance and support that keeps your digital presence secure, up-to-date, and performing at its peak. From security patches to content updates, we handle it all.",
        iconName: "wrench",
        color: "#8b9cf6",
        features: [
          { title: "Security Monitoring", desc: "24/7 threat detection, malware scanning, firewall management, and immediate patching for vulnerabilities." },
          { title: "Regular Content Updates", desc: "Text changes, image swaps, blog posts, and page additions — submit a request and we deploy it." },
          { title: "Performance Optimization", desc: "Monthly speed audits, database optimization, and cache tuning to ensure your site stays fast as it grows." },
          { title: "Backup & Recovery", desc: "Automated daily backups with point-in-time recovery and disaster recovery testing." },
          { title: "Feature Enhancements", desc: "Small feature drops — new sections, integrations, or functionality improvements included in your plan." },
        ],
      },
      {
        slug: "svc-mobile",
        title: "Mobile App Development",
        tagline: "Native experiences. Cross-platform reach.",
        description:
          "Full-cycle mobile app development from concept to App Store deployment. React Native, Flutter, and native iOS/Android apps designed for performance, engagement, and monetization.",
        iconName: "smartphone",
        color: "#8b9cf6",
        features: [
          { title: "Cross-Platform Engineering", desc: "React Native and Flutter apps with near-native performance, shared codebases, and platform-optimized UX." },
          { title: "Native iOS & Android", desc: "Swift and Kotlin development for apps requiring deep platform integration, ARKit, or hardware-level access." },
          { title: "UI/UX for Mobile", desc: "Mobile-first interaction design with gesture-based navigation, haptic feedback, and platform-specific patterns." },
          { title: "App Store Optimization", desc: "ASO strategies including keyword research, preview videos, and review management." },
          { title: "Analytics & Crash Reporting", desc: "Real-time user analytics, crash reporting with stack traces, and performance monitoring." },
        ],
      },
    ],
  },
  {
    slug: "ai-automation",
    label: "AI Automation",
    short: "AI Automation",
    color: "#8b9cf6",
    description:
      "Custom AI that works for you around the clock — voice agents, chatbots, and workflows that connect your tools and run on autopilot.",
    how: "We map the repetitive work you do by hand, build an AI or workflow to handle it, connect the tools it needs, and test it until it runs on its own. You keep the oversight, we remove the busywork.",
    steps: ["Map the busywork", "Build the automation", "Connect your tools", "Test until it runs itself"],
    services: [
      {
        slug: "svc-ai-auto",
        title: "AI Automation",
        tagline: "Workflows that run themselves.",
        description:
          "Custom AI automation solutions that eliminate repetitive tasks, streamline operations, and free your team to focus on high-impact work. From document processing to decision automation.",
        iconName: "bot",
        color: "#8b9cf6",
        features: [
          { title: "Intelligent Document Processing", desc: "AI that extracts, classifies, and validates data from invoices, contracts, and forms." },
          { title: "Workflow Automation", desc: "Visual workflow builders connecting your tools — Slack, email, CRM, databases — into automated sequences." },
          { title: "Decision Automation", desc: "Rule-based and ML-powered decision engines that approve, flag, or route items without human touch." },
          { title: "Data Extraction & Enrichment", desc: "Automated scraping, parsing, and enrichment pipelines that keep your data fresh and actionable." },
          { title: "Custom AI Agents", desc: "Task-specific AI agents trained on your processes, documentation, and data for autonomous task completion." },
        ],
      },
      {
        slug: "svc-voice",
        title: "AI Voice Agent",
        tagline: "Human-like conversations. 24/7 availability.",
        description:
          "Conversational AI voice agents that handle inbound calls, qualify leads, book appointments, and answer FAQs with natural speech.",
        iconName: "phone",
        color: "#8b9cf6",
        features: [
          { title: "Natural Conversation Flow", desc: "Neural voice models with context awareness and interruption handling for fluid conversations." },
          { title: "Lead Qualification", desc: "Structured discovery calls that capture intent, budget, timeline, and authority." },
          { title: "Appointment Booking", desc: "Calendar integration for real-time availability, booking, and reminders." },
          { title: "Multi-Language Support", desc: "Real-time language detection and switching across English, Spanish, French, German, and Mandarin." },
          { title: "Call Analytics", desc: "Transcripts, sentiment analysis, objection tracking, and call scoring for human agents." },
        ],
      },
      {
        slug: "svc-workflows",
        title: "Business Automation Workflows",
        tagline: "Connect your tools. Multiply your output.",
        description:
          "End-to-end business process automation that connects your entire tech stack. Custom workflows that trigger actions across CRM, email, billing, and internal tools seamlessly.",
        iconName: "gitBranch",
        color: "#8b9cf6",
        features: [
          { title: "Cross-Tool Orchestration", desc: "Connect 200+ tools — Salesforce, HubSpot, Slack, Asana, QuickBooks — into coordinated, event-driven workflows." },
          { title: "Lead-to-Cash Automation", desc: "Automated pipelines from lead capture through quoting, invoicing, and payment collection." },
          { title: "Employee Onboarding", desc: "Trigger-based sequences that provision accounts, assign training, and schedule check-ins." },
          { title: "Approval Routing", desc: "Smart conditional approval chains that escalate based on amount, department, or compliance." },
          { title: "Audit & Compliance Logging", desc: "Audit trails and automated report generation for every workflow execution." },
        ],
      },
      {
        slug: "svc-analytics",
        title: "Analytics Dashboards",
        tagline: "Data visualizations that drive decisions.",
        description:
          "Custom analytics dashboards that aggregate data from every corner of your business. Real-time KPIs, cohort analysis, and drill-downs that turn raw data into actionable intelligence.",
        iconName: "barChart3",
        color: "#8b9cf6",
        features: [
          { title: "Custom Dashboard Builder", desc: "Drag-and-drop interface for building role-specific dashboards with charts, tables, and KPIs from any data source." },
          { title: "Real-Time Data Pipelines", desc: "Streaming data ingestion from APIs, databases, and webhooks for live operational visibility." },
          { title: "AI-Powered Forecasting", desc: "Machine learning models that predict revenue, churn, demand, and capacity." },
          { title: "Automated Reporting", desc: "Scheduled PDF/CSV reports delivered to Slack, email, or your data warehouse." },
          { title: "Embedded Analytics", desc: "White-label dashboards you can embed into your product for customer-facing reporting." },
        ],
      },
      {
        slug: "svc-api",
        title: "API & Integration Development",
        tagline: "Connect everything. Automate anything.",
        description:
          "Custom API development and third-party integration services that connect your systems, automate data flow, and unlock new capabilities. REST, GraphQL, webhooks, and event-driven architecture.",
        iconName: "plug",
        color: "#8b9cf6",
        features: [
          { title: "REST & GraphQL APIs", desc: "Versioned, documented, and tested APIs with rate limiting, authentication, and full specs." },
          { title: "Third-Party Integrations", desc: "Custom integrations for Stripe, Slack, Salesforce, HubSpot, Shopify, and more." },
          { title: "Webhook & Event Systems", desc: "Event-driven architectures with webhook delivery, retry logic, and reliable async processing." },
          { title: "API Gateway & Management", desc: "Centralized gateway with authentication, rate limiting, caching, and monitoring." },
          { title: "Migration & Legacy Integration", desc: "Connecting modern systems with legacy databases and endpoints without disruption." },
        ],
      },
    ],
  },
]

export const services = serviceCategories.flatMap((c) => c.services)
