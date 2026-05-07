export interface StackItem {
  id: string;
  name: string;
  iconUrl: string;
}

export interface Category {
  id: string;
  title: string;
  subtitle: string;
  items: StackItem[];
}

const DEVICON = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons";
const SIMPLE = "https://cdn.simpleicons.org";
const SVGL = "https://svgl.app/library";
const DASHICONS = "https://cdn.jsdelivr.net/npm/@dashboardicons/icons/icons";
const PROICONS = "https://proicons.com/icon";

export const CATEGORIES: Category[] = [
  {
    id: "frontend",
    title: "Frontend",
    subtitle: "UI Framework",
    items: [
      { id: "nextjs", name: "Next.js", iconUrl: `${SIMPLE}/nextdotjs` },
      { id: "react", name: "React", iconUrl: `${SIMPLE}/react` },
      { id: "vue", name: "Vue", iconUrl: `${SIMPLE}/vuedotjs` },
      { id: "svelte", name: "SvelteKit", iconUrl: `${SIMPLE}/svelte` },
      { id: "astro", name: "Astro", iconUrl: `${SIMPLE}/astro` },
      { id: "solidjs", name: "SolidJS", iconUrl: `${SIMPLE}/solid` },
      { id: "angular", name: "Angular", iconUrl: `${SIMPLE}/angular` },
      { id: "remix", name: "Remix", iconUrl: `${SIMPLE}/remix` },
      { id: "nuxt", name: "Nuxt", iconUrl: `${SIMPLE}/nuxt` },
      { id: "blazor", name: "Blazor", iconUrl: `${SIMPLE}/blazor` },
    ],
  },
  {
    id: "styling",
    title: "Styling / UI",
    subtitle: "Look & Feel",
    items: [
      {
        id: "tailwind",
        name: "Tailwind CSS",
        iconUrl: `${SIMPLE}/tailwindcss`,
      },
      { id: "shadcn", name: "shadcn/ui", iconUrl: `${SIMPLE}/shadcnui` },
      { id: "radix", name: "Radix UI", iconUrl: `${SIMPLE}/radixui` },
      { id: "chakra", name: "Chakra UI", iconUrl: `${SIMPLE}/chakraui` },
      { id: "mantine", name: "Mantine", iconUrl: `${SIMPLE}/mantine` },
      { id: "mui", name: "MUI", iconUrl: `${SIMPLE}/mui` },
      { id: "bootstrap", name: "Bootstrap", iconUrl: `${SIMPLE}/bootstrap` },
    ],
  },
  {
    id: "runtime",
    title: "Backend Runtime",
    subtitle: "What Runs Your Code",
    items: [
      { id: "nodejs", name: "Node.js", iconUrl: `${SIMPLE}/nodedotjs` },
      { id: "bun", name: "Bun", iconUrl: `${SIMPLE}/bun` },
      { id: "deno", name: "Deno", iconUrl: `${SIMPLE}/deno` },
      { id: "fastapi", name: "Python (FastAPI)", iconUrl: `${SIMPLE}/fastapi` },
      { id: "go", name: "Go", iconUrl: `${SIMPLE}/go` },
      { id: "rails", name: "Ruby on Rails", iconUrl: `${SIMPLE}/rubyonrails` },
      { id: "elixir", name: "Elixir / Phoenix", iconUrl: `${SIMPLE}/elixir` },
      { id: "nestjs", name: "NestJS", iconUrl: `${SIMPLE}/nestjs` },
      { id: "hono", name: "Hono", iconUrl: `${SIMPLE}/hono` },
      {
        id: "dotnet",
        name: "ASP.NET Core (.NET)",
        iconUrl: `${SIMPLE}/dotnet`,
      },
      { id: "spring", name: "Spring Boot", iconUrl: `${SIMPLE}/springboot` },
    ],
  },
  {
    id: "hosting",
    title: "Compute / Hosting",
    subtitle: "Where It Lives",
    items: [
      { id: "vercel", name: "Vercel", iconUrl: `${SIMPLE}/vercel` },
      {
        id: "awsec2",
        name: "AWS EC2",
        iconUrl: `${DEVICON}/amazonwebservices/amazonwebservices-original-wordmark.svg`,
      },
      {
        id: "lambda",
        name: "AWS Lambda",
        iconUrl: `${DEVICON}/amazonwebservices/amazonwebservices-original-wordmark.svg`,
      },
      {
        id: "cloudrun",
        name: "Google Cloud Run",
        iconUrl: `${SIMPLE}/googlecloud`,
      },
      {
        id: "azure",
        name: "Azure App Service",
        iconUrl: `${DEVICON}/azure/azure-original.svg`,
      },
      {
        id: "azurefunc",
        name: "Azure Functions",
        iconUrl: `${DEVICON}/azure/azure-original.svg`,
      },
      {
        id: "cfworkers",
        name: "Cloudflare Workers",
        iconUrl: `${SIMPLE}/cloudflare`,
      },
      { id: "fly", name: "Fly.io", iconUrl: `${SIMPLE}/flydotio` },
      { id: "railway", name: "Railway", iconUrl: `${SIMPLE}/railway` },
      { id: "render", name: "Render", iconUrl: `${SIMPLE}/render` },
      { id: "netlify", name: "Netlify", iconUrl: `${SIMPLE}/netlify` },
      {
        id: "digitalocean",
        name: "DigitalOcean",
        iconUrl: `${SIMPLE}/digitalocean`,
      },
    ],
  },
  {
    id: "database",
    title: "Database",
    subtitle: "Where Data Sleeps",
    items: [
      { id: "postgres", name: "PostgreSQL", iconUrl: `${SIMPLE}/postgresql` },
      { id: "neon", name: "Neon", iconUrl: `${SIMPLE}/neon` },
      { id: "supabase", name: "Supabase", iconUrl: `${SIMPLE}/supabase` },
      {
        id: "planetscale",
        name: "PlanetScale",
        iconUrl: `${SIMPLE}/planetscale`,
      },
      { id: "mysql", name: "MySQL", iconUrl: `${SIMPLE}/mysql` },
      { id: "mongodb", name: "MongoDB", iconUrl: `${SIMPLE}/mongodb` },
      { id: "firebase", name: "Firebase", iconUrl: `${SIMPLE}/firebase` },
      {
        id: "dynamodb",
        name: "DynamoDB",
        iconUrl: `${DEVICON}/amazonwebservices/amazonwebservices-original-wordmark.svg`,
      },
      { id: "convex", name: "Convex", iconUrl: `${SIMPLE}/convex` },
      {
        id: "turso",
        name: "Turso",
        iconUrl: `${DEVICON}/sqlite/sqlite-original.svg`,
      },
      { id: "redis", name: "Redis", iconUrl: `${SIMPLE}/redis` },
      {
        id: "sqlserver",
        name: "SQL Server",
        iconUrl: `${DEVICON}/microsoftsqlserver/microsoftsqlserver-original.svg`,
      },
      {
        id: "azuresql",
        name: "Azure SQL",
        iconUrl: `${DEVICON}/azure/azure-original.svg`,
      },
      {
        id: "cosmosdb",
        name: "Cosmos DB",
        iconUrl: `${DEVICON}/azure/azure-original.svg`,
      },
    ],
  },
  {
    id: "orm",
    title: "ORM / Data Layer",
    subtitle: "How You Query",
    items: [
      { id: "prisma", name: "Prisma", iconUrl: `${SIMPLE}/prisma` },
      { id: "drizzle", name: "Drizzle", iconUrl: `${SIMPLE}/drizzle` },
      { id: "kysely", name: "Kysely", iconUrl: `${SIMPLE}/postgresql` },
      {
        id: "typeorm",
        name: "TypeORM",
        iconUrl: `${DEVICON}/typescript/typescript-original.svg`,
      },
      { id: "sequelize", name: "Sequelize", iconUrl: `${SIMPLE}/sequelize` },
      { id: "rawsql", name: "Raw SQL", iconUrl: `${SIMPLE}/postgresql` },
      {
        id: "efcore",
        name: "Entity Framework Core",
        iconUrl: `${SIMPLE}/dotnet`,
      },
    ],
  },
  {
    id: "auth",
    title: "Auth",
    subtitle: "Who's Logging In",
    items: [
      { id: "clerk", name: "Clerk", iconUrl: `${SIMPLE}/clerk` },
      { id: "auth0", name: "Auth0", iconUrl: `${SIMPLE}/auth0` },
      {
        id: "supabaseauth",
        name: "Supabase Auth",
        iconUrl: `${SIMPLE}/supabase`,
      },
      {
        id: "nextauth",
        name: "NextAuth / Auth.js",
        iconUrl: `${SIMPLE}/authjs`,
      },
      { id: "workos", name: "WorkOS", iconUrl: `${SVGL}/workos.svg` },
      {
        id: "firebaseauth",
        name: "Firebase Auth",
        iconUrl: `${SIMPLE}/firebase`,
      },
      {
        id: "betterauth",
        name: "Better Auth",
        iconUrl: `${SVGL}/better-auth.svg`,
      },
      {
        id: "cognito",
        name: "AWS Cognito",
        iconUrl: `${DEVICON}/amazonwebservices/amazonwebservices-original-wordmark.svg`,
      },
      {
        id: "entraid",
        name: "Microsoft Entra ID",
        iconUrl: `${DEVICON}/azure/azure-original.svg`,
      },
    ],
  },
  {
    id: "storage",
    title: "File / Blob Storage",
    subtitle: "Big Binary Stuff",
    items: [
      {
        id: "s3",
        name: "AWS S3",
        iconUrl: `${DEVICON}/amazonwebservices/amazonwebservices-original-wordmark.svg`,
      },
      { id: "vercelblob", name: "Vercel Blob", iconUrl: `${SIMPLE}/vercel` },
      { id: "r2", name: "Cloudflare R2", iconUrl: `${SIMPLE}/cloudflare` },
      {
        id: "gcs",
        name: "Google Cloud Storage",
        iconUrl: `${SIMPLE}/googlecloud`,
      },
      {
        id: "azureblob",
        name: "Azure Blob",
        iconUrl: `${DEVICON}/azure/azure-original.svg`,
      },
      {
        id: "uploadthing",
        name: "UploadThing",
        iconUrl: `${SVGL}/uploadthing.svg`,
      },
    ],
  },
  {
    id: "monitoring",
    title: "Monitoring / APM",
    subtitle: "Is It on Fire?",
    items: [
      { id: "sentry", name: "Sentry", iconUrl: `${SIMPLE}/sentry` },
      { id: "datadog", name: "Datadog", iconUrl: `${SIMPLE}/datadog` },
      { id: "newrelic", name: "New Relic", iconUrl: `${SIMPLE}/newrelic` },
      {
        id: "cloudwatch",
        name: "AWS CloudWatch",
        iconUrl: `${DEVICON}/amazonwebservices/amazonwebservices-original-wordmark.svg`,
      },
      {
        id: "gcpmon",
        name: "Google Cloud Monitoring",
        iconUrl: `${SIMPLE}/googlecloud`,
      },
      { id: "grafana", name: "Grafana", iconUrl: `${SIMPLE}/grafana` },
      { id: "prometheus", name: "Prometheus", iconUrl: `${SIMPLE}/prometheus` },
      { id: "honeycomb", name: "Honeycomb", iconUrl: `${SVGL}/honeycomb.svg` },
      { id: "axiom", name: "Axiom", iconUrl: `${SVGL}/axiom.svg` },
      {
        id: "betterstack",
        name: "Better Stack",
        iconUrl: `${SIMPLE}/betterstack`,
      },
    ],
  },
  {
    id: "productanalytics",
    title: "Product Analytics",
    subtitle: "What Users Actually Do",
    items: [
      { id: "posthog", name: "PostHog", iconUrl: `${SIMPLE}/posthog` },
      {
        id: "amplitude",
        name: "Amplitude",
        iconUrl: `${DASHICONS}/amplitude.svg`,
      },
      { id: "mixpanel", name: "Mixpanel", iconUrl: `${SIMPLE}/mixpanel` },
      { id: "heap", name: "Heap", iconUrl: `${DASHICONS}/heap.svg` },
      { id: "june", name: "June", iconUrl: `${DASHICONS}/june.svg` },
      { id: "statsig", name: "Statsig", iconUrl: `${DASHICONS}/statsig.svg` },
    ],
  },
  {
    id: "webanalytics",
    title: "Web Analytics",
    subtitle: "Pageviews & Vitals",
    items: [
      {
        id: "vercelanalytics",
        name: "Vercel Analytics",
        iconUrl: `${SIMPLE}/vercel`,
      },
      { id: "ga", name: "Google Analytics", iconUrl: `${SIMPLE}/google` },
      {
        id: "plausible",
        name: "Plausible",
        iconUrl: `${DASHICONS}/plausible.svg`,
      },
      { id: "fathom", name: "Fathom", iconUrl: `${SIMPLE}/fathom` },
      {
        id: "simpleanalytics",
        name: "Simple Analytics",
        iconUrl: `${SIMPLE}/simpleanalytics`,
      },
    ],
  },
  {
    id: "email",
    title: "Transactional Email",
    subtitle: "Reset Links, Receipts",
    items: [
      { id: "resend", name: "Resend", iconUrl: `${SIMPLE}/resend` },
      {
        id: "postmark",
        name: "Postmark",
        iconUrl: `${DASHICONS}/postmark.svg`,
      },
      {
        id: "sendgrid",
        name: "SendGrid",
        iconUrl: `${DASHICONS}/sendgrid.svg`,
      },
      {
        id: "awsses",
        name: "AWS SES",
        iconUrl: `${DEVICON}/amazonwebservices/amazonwebservices-original-wordmark.svg`,
      },
      { id: "mailgun", name: "Mailgun", iconUrl: `${SIMPLE}/mailgun` },
      { id: "loops", name: "Loops", iconUrl: `${SIMPLE}/loops` },
    ],
  },
  {
    id: "payments",
    title: "Payments",
    subtitle: "Take the Money",
    items: [
      { id: "stripe", name: "Stripe", iconUrl: `${SIMPLE}/stripe` },
      {
        id: "lemonsqueezy",
        name: "Lemon Squeezy",
        iconUrl: `${SIMPLE}/lemonsqueezy`,
      },
      { id: "paddle", name: "Paddle", iconUrl: `${SIMPLE}/paddle` },
      { id: "polar", name: "Polar", iconUrl: `${SVGL}/polar.svg` },
      { id: "paypal", name: "PayPal", iconUrl: `${SIMPLE}/paypal` },
    ],
  },
  {
    id: "ai",
    title: "AI / LLM",
    subtitle: "The Smart Bits",
    items: [
      {
        id: "anthropic",
        name: "Anthropic Claude",
        iconUrl: `${SIMPLE}/anthropic`,
      },
      { id: "openai", name: "OpenAI", iconUrl: `${PROICONS}/264667.svg` },
      {
        id: "vercelai",
        name: "Vercel AI Gateway",
        iconUrl: `${SIMPLE}/vercel`,
      },
      { id: "gemini", name: "Google Gemini", iconUrl: `${SIMPLE}/google` },
      { id: "replicate", name: "Replicate", iconUrl: `${SIMPLE}/replicate` },
      {
        id: "togetherai",
        name: "Together AI",
        iconUrl: `${PROICONS}/264670.svg`,
      },
      { id: "groq", name: "Groq", iconUrl: `${PROICONS}/264668.svg` },
    ],
  },
  {
    id: "search",
    title: "Search",
    subtitle: "Find Stuff Fast",
    items: [
      { id: "algolia", name: "Algolia", iconUrl: `${SIMPLE}/algolia` },
      {
        id: "meilisearch",
        name: "Meilisearch",
        iconUrl: `${SIMPLE}/meilisearch`,
      },
      { id: "typesense", name: "Typesense", iconUrl: `${PROICONS}/264669.svg` },
      { id: "elastic", name: "Elastic", iconUrl: `${SIMPLE}/elastic` },
      { id: "pgfts", name: "Postgres FTS", iconUrl: `${SIMPLE}/postgresql` },
    ],
  },
  {
    id: "cms",
    title: "CMS / Content",
    subtitle: "Marketing & Blog",
    items: [
      { id: "sanity", name: "Sanity", iconUrl: `${SIMPLE}/sanity` },
      { id: "contentful", name: "Contentful", iconUrl: `${SIMPLE}/contentful` },
      { id: "payload", name: "Payload", iconUrl: `${SIMPLE}/payloadcms` },
      { id: "strapi", name: "Strapi", iconUrl: `${SIMPLE}/strapi` },
      { id: "notion", name: "Notion", iconUrl: `${SIMPLE}/notion` },
      {
        id: "mdx",
        name: "Markdown / MDX",
        iconUrl: `${DEVICON}/markdown/markdown-original.svg`,
      },
    ],
  },
  {
    id: "cicd",
    title: "CI / CD",
    subtitle: "Ship It",
    items: [
      {
        id: "ghactions",
        name: "GitHub Actions",
        iconUrl: `${SIMPLE}/githubactions`,
      },
      {
        id: "verceldeploys",
        name: "Vercel Deploys",
        iconUrl: `${SIMPLE}/vercel`,
      },
      { id: "circleci", name: "CircleCI", iconUrl: `${SIMPLE}/circleci` },
      { id: "gitlabci", name: "GitLab CI", iconUrl: `${SIMPLE}/gitlab` },
      { id: "buildkite", name: "Buildkite", iconUrl: `${SIMPLE}/buildkite` },
    ],
  },
];
