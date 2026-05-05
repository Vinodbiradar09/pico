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
// AWS icons from official source (simpleicons uses "amazonaws" not "amazonec2")
const AWS =
  "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices";

export const CATEGORIES: Category[] = [
  {
    id: "frontend",
    title: "Frontend",
    subtitle: "UI Framework",
    items: [
      {
        id: "nextjs",
        name: "Next.js",
        iconUrl: `${DEVICON}/nextjs/nextjs-original.svg`,
      },
      {
        id: "react",
        name: "React",
        iconUrl: `${DEVICON}/react/react-original.svg`,
      },
      {
        id: "nuxt",
        name: "Nuxt",
        iconUrl: `${DEVICON}/nuxtjs/nuxtjs-original.svg`,
      },
      {
        id: "svelte",
        name: "SvelteKit",
        iconUrl: `${DEVICON}/svelte/svelte-original.svg`,
      },
      { id: "astro", name: "Astro", iconUrl: `${SIMPLE}/astro` },
      { id: "remix", name: "Remix", iconUrl: `${SIMPLE}/remix` },
      {
        id: "angular",
        name: "Angular",
        iconUrl: `${DEVICON}/angular/angular-original.svg`,
      },
      {
        id: "vue",
        name: "Vue",
        iconUrl: `${DEVICON}/vuejs/vuejs-original.svg`,
      },
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
      { id: "chakra", name: "Chakra UI", iconUrl: `${SIMPLE}/chakra-ui` },
      { id: "mui", name: "Material UI", iconUrl: `${SIMPLE}/mui` },
      {
        id: "styled",
        name: "Styled Components",
        iconUrl: `${SIMPLE}/styledcomponents`,
      },
      {
        id: "css",
        name: "CSS Modules",
        iconUrl: `${DEVICON}/css3/css3-original.svg`,
      },
      {
        id: "sass",
        name: "Sass",
        iconUrl: `${DEVICON}/sass/sass-original.svg`,
      },
    ],
  },
  {
    id: "runtime",
    title: "Backend Runtime",
    subtitle: "What Runs Your Code",
    items: [
      {
        id: "nodejs",
        name: "Node.js",
        iconUrl: `${DEVICON}/nodejs/nodejs-original.svg`,
      },
      { id: "bun", name: "Bun", iconUrl: `${SIMPLE}/bun` },
      { id: "deno", name: "Deno", iconUrl: `${SIMPLE}/deno` },
      {
        id: "python",
        name: "Python",
        iconUrl: `${DEVICON}/python/python-original.svg`,
      },
      { id: "go", name: "Go", iconUrl: `${DEVICON}/go/go-original.svg` },
      { id: "rust", name: "Rust", iconUrl: `${SIMPLE}/rust` },
      {
        id: "elixir",
        name: "Elixir",
        iconUrl: `${DEVICON}/elixir/elixir-original.svg`,
      },
      { id: "edge", name: "Edge Runtime", iconUrl: `${SIMPLE}/vercel` },
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
        iconUrl: `${AWS}/amazonwebservices-original.svg`,
      },
      {
        id: "lambda",
        name: "AWS Lambda",
        iconUrl: `${AWS}/amazonwebservices-original.svg`,
      },
      { id: "cloudrun", name: "Cloud Run", iconUrl: `${SIMPLE}/googlecloud` },
      {
        id: "azure",
        name: "Azure App Service",
        iconUrl: `${SIMPLE}/microsoftazure`,
      },
      { id: "fly", name: "Fly.io", iconUrl: `${SIMPLE}/flydotio` },
      { id: "railway", name: "Railway", iconUrl: `${SIMPLE}/railway` },
      { id: "netlify", name: "Netlify", iconUrl: `${SIMPLE}/netlify` },
    ],
  },
  {
    id: "database",
    title: "Database",
    subtitle: "Where Data Sleeps",
    items: [
      {
        id: "postgres",
        name: "PostgreSQL",
        iconUrl: `${DEVICON}/postgresql/postgresql-original.svg`,
      },
      { id: "neon", name: "Neon", iconUrl: `${SIMPLE}/neon` },
      { id: "supabase", name: "Supabase", iconUrl: `${SIMPLE}/supabase` },
      {
        id: "planetscale",
        name: "PlanetScale",
        iconUrl: `${SIMPLE}/planetscale`,
      },
      {
        id: "mysql",
        name: "MySQL",
        iconUrl: `${DEVICON}/mysql/mysql-original.svg`,
      },
      {
        id: "mongodb",
        name: "MongoDB",
        iconUrl: `${DEVICON}/mongodb/mongodb-original.svg`,
      },
      {
        id: "sqlite",
        name: "SQLite",
        iconUrl: `${DEVICON}/sqlite/sqlite-original.svg`,
      },
      {
        id: "redis",
        name: "Redis",
        iconUrl: `${DEVICON}/redis/redis-original.svg`,
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
      {
        id: "typeorm",
        name: "TypeORM",
        iconUrl: `${DEVICON}/typescript/typescript-original.svg`,
      },
      { id: "sequelize", name: "Sequelize", iconUrl: `${SIMPLE}/sequelize` },
      {
        id: "mongoose",
        name: "Mongoose",
        iconUrl: `${DEVICON}/mongodb/mongodb-original.svg`,
      },
      {
        id: "rawsql",
        name: "Raw SQL",
        iconUrl: `${DEVICON}/postgresql/postgresql-original.svg`,
      },
    ],
  },
];
