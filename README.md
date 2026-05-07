<p align="center">
  <img src="https://raw.githubusercontent.com/Vinodbiradar09/pico/main/public/og-banner.png" alt="Pico — Pick your stack. Ship it." width="100%" />
</p>

<h1 align="center">Pico</h1>

<p align="center">
  <strong>Pick your stack. Ship it.</strong><br />
  Curated technology picker with architecture diagrams and AI scaffold prompts.
</p>

<p align="center">
  <a href="https://usepico.vercel.app">Live Demo</a> •
  <a href="https://github.com/Vinodbiradar09/pico">GitHub</a>
</p>

---

## What is Pico?

Pico helps developers compose production-ready tech stacks in seconds.

Browse 100+ battle-tested technologies across 17 layers from frontend frameworks to CI/CD then export your blueprint as:

- an architecture diagram
- a shareable stack card
- a ready-to-paste AI scaffold prompt

The goal is to reduce decision fatigue and help developers move from ideas to execution faster.

---

## Features

### Technology Selection
- 100+ curated technologies across 17 categories:
  - Frontend
  - Styling / UI
  - Backend Runtime
  - Compute / Hosting
  - Database
  - ORM / Data Layer
  - Authentication
  - File / Blob Storage
  - Monitoring / APM
  - Product Analytics
  - Web Analytics
  - Transactional Email
  - Payments
  - AI / LLM
  - Search
  - CMS / Content
  - CI / CD

### Exports
- One-click AI scaffold prompt compatible with ChatGPT, Claude, and similar tools
- High-resolution PNG stack card export
- Vertical architecture diagram export showing system flow

### UX
- Dark mode support
- Fully responsive (mobile, tablet, desktop)
- Keyboard navigable with ARIA labels and focus management

---

## Tech Stack

| Layer | Technology |
|------|-----------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| UI | shadcn/ui + Radix UI |
| Icons | Lucide React + Devicon / Simple Icons |
| Fonts | Geist + Nunito Sans |
| Package Manager | pnpm |

---

## Getting Started

### Prerequisites
- Node.js 20+
- pnpm

### Installation

```bash
git clone https://github.com/Vinodbiradar09/pico.git
cd pico
pnpm install

Development
pnpm dev
Open http://localhost:3000 in your browser.
Production Build
pnpm build
Linting
pnpm lint

Project Structure
pico/├── app/│   ├── stack-picker/        # Main stack picker page│   ├── layout.tsx           # Root layout with fonts│   └── page.tsx             # Redirects to /stack-picker├── components/│   └── stack-picker/        # UI components (cards, bottom bar, modals, icons)├── hooks/│   └── useStackSelections.ts├── lib/│   ├── stack-data.ts        # 100+ technologies across 17 categories│   └── stack-utils.ts       # Prompt builder and export logic├── public/│   └── og-banner.png        # Open Graph image└── package.json

Deployment
Pico is deployed on Vercel.
Production URL:
https://usepico.vercel.app
To deploy your own instance, connect the repository to Vercel or run:
pnpm build

Contributing
Contributions are welcome.


Fork the repository


Create a feature branch
git checkout -b feature/amazing-feature


Commit your changes
git commit -m "Add amazing feature"


Push to the branch
git push origin feature/amazing-feature

Open a Pull Request

License
MIT License
Built by Vinod Biradar.
---If you want next:- a **shorter README for Hacker News**- a **README badge set**- or a **“Why Pico exists” philosophy section**say the word.
