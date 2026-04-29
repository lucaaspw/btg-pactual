# Guia do projeto BTG Dashboard

Documentação para quem for desenvolver, operar ou integrar este repositório.

## 1. O que é este projeto

Aplicação **Next.js** (App Router) que expõe duas **landings públicas** — **Partners** e **Ultrablue** — alimentadas por ofertas vindas do **WordPress** (CPT + ACF), e um **painel** para o operador cadastrar ofertas (`/dashboard`).

- **Partners** e **Ultrablue** compartilham componentes de apresentação (cards, detalhe de oferta, seções comuns) e a mesma origem de dados, filtrada por tipo de cartão e tipo de oferta.
- O **cadastro** de novas ofertas usa a rota de API interna `POST /api/ofertas`, que publica no WordPress com autenticação por Application Password.

---

## 2. Stack

| Tecnologia | Uso |
|------------|-----|
| **Next.js** (~16) | Framework, rotas, middleware, API Routes |
| **React** | UI |
| **Tailwind CSS** | Estilos |
| **TypeScript** | Tipagem |
| **lucide-react** | Ícones |

Fontes: `app/fonts.ts` (Moderat), configuradas no `app/layout.tsx`.

---

## 3. Estrutura de pastas (visão rápida)

```
app/
  page.tsx              # Hub local (links para Partners, Ultrablue, dashboard)
  layout.tsx            # Layout raiz + fontes
  partners/             # Rotas da landing Partners (/partners/...)
  ultrablue/            # Rotas da landing Ultrablue (/ultrablue/...)
  dashboard/            # Painel do operador (/dashboard/...)
  api/ofertas/route.ts  # POST: cria oferta no WordPress (multipart)
components/
  partners/             # Blocos específicos Partners
  ultrablue/            # Blocos específicos Ultrablue
  feriados/             # Seção de feriados (reutilizada pelas duas marcas)
  ofertas/              # Card e página de detalhe de oferta
  dashboard/            # Cabeçalho do painel
constants/              # cartoes, tipo-oferta, imagens estáticas das LPs
lib/                    # Utilitários (ex.: formatação de preço)
services/ofertas.ts     # Busca ofertas no WP (REST) para páginas server-side
types/                  # Tipos (ex.: Oferta)
public/                 # Assets estáticos (imagens por pasta temática)
proxy.ts                # Proxy/rewrite por subdomínio (Partners / Ultrablue)
```

Rotas importantes:

| Caminho | Descrição |
|---------|-----------|
| `/` | Página inicial com links (útil em `localhost`) |
| `/partners`, `/partners/cruzeiros`, … | Landing Partners |
| `/ultrablue`, `/ultrablue/roteiros`, … | Landing Ultrablue |
| `/dashboard`, `/dashboard/nova-oferta` | Painel e formulário de nova oferta |
| `/api/ofertas` | API interna (POST) para criar oferta no WP |

### Cadastro de ofertas (operador)

- **Um único formulário** em `/dashboard/nova-oferta` serve **Partners** e **Ultrablue**.
- O operador escolhe a **vitrine do cartão** no topo; o valor vai para o ACF `tipo_cartao` no WordPress. A oferta **só aparece** na landing daquele cartão (filtro em `services/ofertas.ts`).
- Para publicar a **mesma viagem nas duas vitrines**, é preciso **cadastrar duas vezes** (uma com Partners, outra com Ultrablue).
- Atalhos na URL: `?cartao=partners` ou `?cartao=ultrablue` (também `p` / `ub`) **pré-selecionam** o cartão — útil em links salvos ou no hub da raiz (`/`).

---

## 4. Variáveis de ambiente

Crie um arquivo **`.env.local`** na raiz (não commitar segredos).

| Variável | Obrigatória | Descrição |
|----------|-------------|-----------|
| `NEXT_PUBLIC_WP_URL` | Sim (build/runtime das páginas que leem ofertas) | URL base do WordPress, **sem** barra final. Ex.: `https://seu-site-wp.com` |
| `WP_API_USER` | Para `POST /api/ofertas` | Usuário WP usado na autenticação Basic |
| `WP_API_APP_PASSWORD` | Para `POST /api/ofertas` | Application Password (espaços são normalizados no código) |
| `NEXT_PUBLIC_PARTNERS_CONCIERGE_EMAIL` | Não | E-mail exibido nos CTAs de concierge (componentes Partners/Ultrablue) |

**Leitura de ofertas:** `services/ofertas.ts` chama o REST `wp-json/wp/v2/btg_pactual` usando apenas `NEXT_PUBLIC_WP_URL`.

**Criação de ofertas:** `app/api/ofertas/route.ts` exige `NEXT_PUBLIC_WP_URL` + credenciais `WP_*` para publicar via API.

---

## 5. Scripts npm

```bash
npm run dev      # Servidor de desenvolvimento
npm run build    # Build de produção
npm run start    # Servidor após build
npm run lint     # ESLint
```

---

## 6. WordPress e dados

- **CPT:** `btg_pactual` (slug de oferta nas URLs do front: `/partners/oferta/[slug]`, `/ultrablue/oferta/[slug]`).
- **Campos ACF** usados no front e na API incluem: tipo de cartão, tipo de oferta, preço, moeda, imagens, datas, nacional/internacional, etc. (ver `types/oferta.ts` e `app/api/ofertas/route.ts` para o contrato completo).
- **Filtros no app:** `constants/cartoes.ts` e `constants/tipo-oferta.ts` alinham labels e comparações com o que vem do ACF.

Imagens remotas do próprio domínio WP podem ser permitidas em `next.config.ts` via `images.remotePatterns` derivadas de `NEXT_PUBLIC_WP_URL`.

---

## 7. Subdomínios (Partners e Ultrablue)

O arquivo **`middleware.ts`** na raiz reescreve internamente as rotas conforme o **primeiro rótulo** do hostname:

| Host de exemplo | Comportamento |
|-----------------|---------------|
| `partners.empresa.com.br` | URLs “curtas” no navegador (`/`, `/cruzeiros`) são servidas como `/partners`, `/partners/cruzeiros`, etc. |
| `ultrablue.empresa.com.br` | Idem para o prefixo `/ultrablue`. |
| `localhost`, `empresa.com.br`, `www.…` (sem primeiro rótulo `partners` ou `ultrablue`) | **Sem reescrita:** o app se comporta como hoje, com paths `/partners/...` e `/ultrablue/...` explícitos. |

### O que não passa pelo prefixo de landing

Para não quebrar API, painel e arquivos estáticos, estas URLs **não** são reescritas para `/partners` ou `/ultrablue`:

- `/api/*`
- `/_next/*`
- `/dashboard/*`
- Pastas de asset em `public`: `/partners_image`, `/ultrablue_image`, `/concierge_image`, `/beneficios_image`
- `favicon.ico`, `robots.txt`, `sitemap.xml`, `/.well-known/*`
- Arquivos com extensões de estático cobertas pelo `matcher` do middleware

### Links com path completo no subdomínio

Se alguém abrir `https://partners.empresa.com.br/partners/cruzeiros`, o middleware **remove** o prefixo duplicado e continua servindo a rota correta (`/partners/cruzeiros`).

### Teste em desenvolvimento

- Em **`http://localhost:3000`** continue usando `/partners` e `/ultrablue` normalmente.
- Para simular subdomínio, use por exemplo **`http://partners.localhost:3000`** e **`http://ultrablue.localhost:3000`** (conforme suporte do SO/navegador a `*.localhost`).

### Deploy

1. Apontar DNS **`partners.dominio`** e **`ultrablue.dominio`** para o mesmo deploy.
2. No provedor (ex.: Vercel), **adicionar os dois domínios** ao projeto e certificar SSL.
3. Opcional: no domínio raiz, definir redirects canônicos (ex.: `/partners` → `https://partners.dominio/`) em `next.config.ts` ou no edge do provedor.

### Nota Next.js 16

O build pode avisar que a convenção **`middleware`** será substituída por **`proxy`**. Enquanto a migração oficial não for feita, o arquivo atual continua funcionando; acompanhe a [documentação do Next.js](https://nextjs.org/docs) para renomear/migrar quando for o momento.

---

## 8. Boas práticas para novos desenvolvedores

1. **Landings:** colocar páginas em `app/partners/...` ou `app/ultrablue/...`; componentes grandes em `components/partners` ou `components/ultrablue`.
2. **Compartilhado:** `components/shared` (ex.: header e CTA entre marcas), `components/ofertas`, `components/feriados`, `lib`, `types`, `constants` (ex.: `concierge.ts`, `landing-header.ts`).
3. **Novos assets em `public`:** se forem servidos na **raiz** (`/minha_pasta/...`), adicione o prefixo em `PUBLIC_ROOT_PREFIXES` em `middleware.ts` para o subdomínio não reescrever o path incorretamente.
4. **Não commitar** `.env.local` com senhas; usar variáveis no painel do host em produção.

---

## 9. Referências internas

- Regras do repositório para agentes/IA: `AGENTS.md`
- Redirecionamento global: `next.config.ts` (`redirects`, `images`)
