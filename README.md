# BTG Dashboard

Monorepo **Next.js** com landings **Partners** e **Ultrablue**, painel de ofertas (`/dashboard`) e integração com **WordPress** (REST + ACF).

## Início rápido

```bash
npm install
cp .env.example .env.local
# Edite .env.local (mínimo: NEXT_PUBLIC_WP_URL) — detalhes em docs/GUIA.md
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) — a raiz lista atalhos para Partners, Ultrablue e o fluxo de nova oferta.

## Documentação

| Documento | Conteúdo |
|-----------|----------|
| **[docs/GUIA.md](./docs/GUIA.md)** | Visão do projeto, pastas, variáveis de ambiente, WordPress, **subdomínios e middleware**, deploy e boas práticas |

## Scripts

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Desenvolvimento |
| `npm run build` | Build de produção |
| `npm run start` | Servidor após build |
| `npm run lint` | ESLint |

## Stack principal

Next.js (App Router), React, TypeScript, Tailwind CSS.

---

Documentação detalhada: **[docs/GUIA.md](./docs/GUIA.md)**.
