<p align="center">
  <img src="https://raw.githubusercontent.com/Vinodbiradar09/pico/main/public/og-banner.png" alt="Pico — Pick your stack. Ship it." width="100%" />
</p>

<h1 align="center">Pico</h1>

<p align="center">
  <strong>Pick your stack. Ship it.</strong><br />
  Curated technology picker with architecture diagrams and AI scaffold prompts.
</p>

<p align="center">
  <a href="https://usepico.vercel.app/stack-picker">Live Demo</a> •
  <a href="https://github.com/Vinodbiradar09/pico">GitHub</a>
</p>

---

## What is Pico?

Pico helps developers compose production-ready tech stacks in seconds.

Browse 100+ battle-tested technologies across 17 layers — from frontend frameworks to CI/CD — then export your blueprint as:

- an **architecture diagram**
- a shareable **stack card**
- a ready-to-paste **AI scaffold prompt**

The goal is to reduce decision fatigue and help developers move from idea to execution faster.

---

## Features

### Technology Selection

100+ curated technologies across 17 categories:

| # | Category |
|---|----------|
| 1 | Frontend |
| 2 | Styling / UI |
| 3 | Backend Runtime |
| 4 | Compute / Hosting |
| 5 | Database |
| 6 | ORM / Data Layer |
| 7 | Authentication |
| 8 | File / Blob Storage |
| 9 | Monitoring / APM |
| 10 | Product Analytics |
| 11 | Web Analytics |
| 12 | Transactional Email |
| 13 | Payments |
| 14 | AI / LLM |
| 15 | Search |
| 16 | CMS / Content |
| 17 | CI / CD |

### Exports

- **AI scaffold prompt** — One-click copy, compatible with ChatGPT, Claude, and similar tools
- **Stack card** — High-resolution PNG export
- **Architecture diagram** — Vertical system flow diagram export

---

## Tech Stack

| Layer | Technology |
|-------|------------|
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
```

### Development

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
pnpm build
```

### Linting

```bash
pnpm lint
```

---

## Project Structure

```
pico/
├── app/
│   ├── stack-picker/        # Main stack picker page
│   ├── layout.tsx           # Root layout with fonts & OG metadata
│   └── page.tsx             # Redirects to /stack-picker
├── components/
│   └── stack-picker/        # UI components (cards, bottom bar, modals, icons)
├── hooks/
│   └── useStackSelections.ts
├── lib/
│   ├── stack-data.ts        # 100+ technologies across 17 categories
│   └── stack-utils.ts       # Prompt builder and export logic
├── public/
│   └── og-banner.png        # Open Graph image
└── package.json
```

---

## Deployment

Pico is deployed on Vercel.

**Production URL:** [https://usepico.vercel.app](https://usepico.vercel.app/stack-picker)

To deploy your own instance, connect the repository to Vercel or run:

```bash
pnpm build
```

---

## Contributing

Contributions are welcome!

1. Fork the repository
2. Create a feature branch
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. Commit your changes
   ```bash
   git commit -m "Add amazing feature"
   ```
4. Push to the branch
   ```bash
   git push origin feature/amazing-feature
   ```
5. Open a Pull Request

---

## License

[MIT](./LICENSE) — Built by [Vinod Biradar](https://github.com/Vinodbiradar09).
