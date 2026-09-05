import type { LocalizedText } from "../i18n/types";
import type { Lang } from "../i18n/utils";

export interface ProjectDetailContent {
  slug: string;
  headerEyebrow: LocalizedText;
  objetivoTitulo: LocalizedText;
  objetivo: LocalizedText;
  objetivoIntro: LocalizedText;
  arquitecturaIntro: LocalizedText;
  cuentaDemo?: {
    email: string;
    password: string;
    nota?: LocalizedText;
  };
  arquitectura: {
    items: { label: LocalizedText; value: LocalizedText }[];
  };
  diagramas: {
    topologiaLabel: LocalizedText;
    serviciosLabel: LocalizedText;
  };
  aprendizaje: {
    intro: LocalizedText;
    puntos: { title: LocalizedText; description: LocalizedText }[];
  };
  hallazgo: {
    titulo: LocalizedText;
    resumen: LocalizedText;
    implicaciones: LocalizedText[];
    recomendaciones: LocalizedText[];
  };
  stack: string[];
  manualUrl?: string;
  manualLabel?: LocalizedText;
}

export const projectDetails: Record<string, ProjectDetailContent> = {
  "homelab-infrastructure": {
    slug: "homelab-infrastructure",
    headerEyebrow: {
      es: "Proyecto Destacado · Homelab",
      en: "Featured Project · Homelab",
    },
    objetivoTitulo: {
      es: "¿Por qué un homelab propio?",
      en: "Why a Personal Homelab?",
    },
    objetivo: {
      es: "Tener infraestructura propia (VMs, servicios, entornos de prueba) sin depender de VPS de pago, aprovechando hardware propio con virtualización completa y segmentación de red por VLANs para aislar cada proyecto o entorno.",
      en: "To have your own infrastructure (VMs, services, test environments) without relying on paid VPS, utilizing your own hardware with complete virtualization and network segmentation by VLANs to isolate each project or environment.",
    },
    objetivoIntro: {
      es: "El objetivo principal fue construir un laboratorio de infraestructura autosuficiente que sirviera como entorno real de desarrollo, testing y despliegue para mis proyectos personales, eliminando la dependencia de servicios cloud de pago y dándome control total sobre la topología de red.",
      en: "The main objective was to build a self-sufficient infrastructure lab that would serve as a real-world development, testing, and deployment environment for my personal projects, eliminating the dependency on paid cloud services and giving me complete control over the network topology.",
    },
    arquitecturaIntro: {
      es: "Servidor Proxmox con 12 VMs + 1 LXC, firewall OPNsense virtualizado, 8 VLANs para separar lógicamente cada proyecto/entorno, cluster k3s (1 master + 2 workers) y Apache Guacamole para acceso remoto seguro.",
      en: "Proxmox server with 12 VMs + 1 LXC, virtualized OPNsense firewall, 8 VLANs to logically separate each project/environment, k3s cluster (1 master + 2 workers) and Apache Guacamole for secure remote access.",
    },
    arquitectura: {
      items: [
        {
          label: { es: "Hypervisor", en: "Hypervisor" },
          value: {
            es: "Proxmox VE 8.x sobre servidor único",
            en: "Proxmox VE 8.x on a single server",
          },
        },
        {
          label: { es: "VMs", en: "VMs" },
          value: {
            es: "12 máquinas virtuales en operación",
            en: "12 virtual machines in operation",
          },
        },
        {
          label: { es: "Contenedores", en: "Containers" },
          value: {
            es: "1 LXC (Apache Guacamole) + 1 template",
            en: "1 LXC (Apache Guacamole) + 1 template",
          },
        },
        {
          label: { es: "Firewall", en: "Firewall" },
          value: {
            es: "OPNsense virtualizado (VM 102) como router/firewall",
            en: "Virtualized OPNsense (VM 102) as router/firewall",
          },
        },
        {
          label: { es: "VLANs", en: "VLANs" },
          value: {
            es: "8 VLANs 802.1Q segmentadas por función",
            en: "8 VLANs 802.1Q segmented by function",
          },
        },
        {
          label: { es: "Cluster", en: "Cluster" },
          value: {
            es: "k3s con 1 master + 2 workers (VMs 106-108)",
            en: "k3s with 1 master + 2 workers (VMs 106-108)",
          },
        },
        {
          label: { es: "Acceso remoto", en: "Remote Access" },
          value: {
            es: "Apache Guacamole vía navegador (sin RDP/SSH directo)",
            en: "Apache Guacamole via browser (no direct RDP/SSH)",
          },
        },
        {
          label: { es: "DNS/DHCP", en: "DNS/DHCP" },
          value: {
            es: "Dnsmasq integrado en OPNsense",
            en: "Dnsmasq integrated in OPNsense",
          },
        },
      ],
    },
    diagramas: {
      topologiaLabel: { es: "Topología de Red", en: "Network Topology" },
      serviciosLabel: {
        es: "Inventario de Servicios Proxmox",
        en: "Proxmox Services Inventory",
      },
    },
    aprendizaje: {
      intro: {
        es: "Este proyecto me obligó a entender, configurar y razonar sobre infraestructura completa. Estos son los aprendizajes más valiosos que me llevo:",
        en: "This project forced me to understand, configure, and reason about complete infrastructure. These are the most valuable lessons I take with me:",
      },
      puntos: [
        {
          title: {
            es: "VLANs en OPNsense integradas con Proxmox",
            en: "VLANs in OPNsense integrated with Proxmox",
          },
          description: {
            es: "Configurar interfaces VLAN sobre el trunk del hypervisor y crear las interfaces opt1..opt8 en OPNsense, mapeando cada una a un bridge de Proxmox. Cada VLAN termina en un bridge Linux independiente que las VMs usan como interfaz de red, manteniendo el aislamiento a nivel de capa 2.",
            en: "Configure VLAN interfaces on the hypervisor trunk and create the opt1..opt8 interfaces in OPNsense, mapping each one to a Proxmox bridge. Each VLAN ends in an independent Linux bridge that the VMs use as a network interface, maintaining isolation at layer 2.",
          },
        },
        {
          title: {
            es: "Segmentación y reglas de firewall inter-VLAN",
            en: "Segmentation and inter-VLAN firewall rules",
          },
          description: {
            es: "Diseñar reglas explícitas en OPNsense para BLOQUEAR tráfico entre VLANs por defecto y solo permitir lo necesario. Esto es lo opuesto a como se configuran redes planas: cada proyecto es una red aislada lógicamente, sin visibilidad ni acceso a las otras aunque estén en el mismo servidor físico.",
            en: "Design explicit rules in OPNsense to BLOCK traffic between VLANs by default and only allow what is necessary. This is the opposite of how flat networks are configured: each project is a logically isolated network, with no visibility or access to the others even if they are on the same physical server.",
          },
        },
        {
          title: {
            es: "Por qué 8 VLANs y no menos",
            en: "Why 8 VLANs and not less",
          },
          description: {
            es: "Una VLAN por proyecto/entorno (ISVERCEO, DOKPLOY, MANAGEMENT, DEVOPS, AWS_LAB, KUBERNETES, OBSERVABILITY, WORKSPACE). Si un servicio se compromete, el atacante queda confinado a esa VLAN. Adicionalmente, permite replicar entornos (lab vs producción) sin colisión de IPs y sin miedo a romper el resto.",
            en: "One VLAN per project/environment (ISVERCEO, DOKPLOY, MANAGEMENT, DEVOPS, AWS_LAB, KUBERNETES, OBSERVABILITY, WORKSPACE). If a service is compromised, the attacker is confined to that VLAN. Additionally, it allows replicating environments (lab vs production) without IP conflicts and without fear of breaking the rest.",
          },
        },
        {
          title: {
            es: "Acceso remoto seguro con Apache Guacamole",
            en: "Secure remote access with Apache Guacamole",
          },
          description: {
            es: "En vez de exponer RDP/SSH al exterior (que serían blancos directos de brute force y exploits), uso Apache Guacamole como gateway web. El usuario se autentica vía HTTPS en una sola URL, y Guacamole proxea el protocolo nativo (RDP/VNC/SSH) hacia la VM interna. Resultado: superficie de ataque mínima, un solo punto de hardening, MFA fácil de integrar.",
            en: "Instead of exposing RDP/SSH to the outside (which would be direct targets for brute force and exploits), I use Apache Guacamole as a web gateway. The user authenticates via HTTPS on a single URL, and Guacamole proxies the native protocol (RDP/VNC/SSH) to the internal VM. Result: minimal attack surface, a single point of hardening, and easy MFA integration.",
          },
        },
        {
          title: {
            es: "k3s en lugar de Kubernetes completo",
            en: "k3s instead of full Kubernetes",
          },
          description: {
            es: "Para un servidor único con recursos limitados, k3s es la elección correcta: un solo binario, SQLite como datastore por defecto, etcd reemplazado por SQLite embebido, y todos los componentes en un único proceso. Funciona out-of-the-box sin la complejidad operacional de un cluster k8s real (etcd, control plane separado, etcd backups, etc.).",
            en: "For a single server with limited resources, k3s is the right choice: a single binary, SQLite as the default datastore, etcd replaced by an embedded SQLite, and all components in a single process. It works out-of-the-box without the operational complexity of a real k8s cluster (etcd, separate control plane, etcd backups, etc.).",
          },
        },
      ],
    },
    hallazgo: {
      titulo: {
        es: "El problema que descubrí diseñando la red: el firewall depende del hypervisor",
        en: "The problem I discovered while designing the network: the firewall depends on the hypervisor",
      },
      resumen: {
        es: "Algo que no vi venir hasta que lo dibujé en papel: el firewall OPNsense corre como una VM dentro del mismo servidor Proxmox que se supone que debe proteger. Si el host cae, cae el firewall Y todos los servicios a la vez. Es un single point of failure que ningún diagrama te muestra hasta que lo buscas.",
        en: "Something I didn't see coming until I drew it on paper: the OPNsense firewall runs as a VM within the same Proxmox server it's supposed to protect. If the host fails, the firewall fails and all services at the same time. It's a single point of failure that no diagram shows you until you look for it.",
      },
      implicaciones: [
        {
          es: "Esto contradice directamente la promesa de un firewall dedicado: el firewall depende del hypervisor para arrancar, lo cual es conceptualmente circular. Un boot failure del host = sin red Y sin protección.",
          en: "This directly contradicts the promise of a dedicated firewall: the firewall depends on the hypervisor to boot, which is conceptually circular. A boot failure of the host = no network and no protection.",
        },
        {
          es: "El tráfico interno entre VMs puede evadir el firewall si Proxmox enruta por bridges sin pasar por OPNsense. Hay que auditar cada bridge y cada VLAN para confirmar que todo pasa por el firewall.",
          en: "Internal traffic between VMs can bypass the firewall if Proxmox routes through bridges without going through OPNsense. Each bridge and VLAN must be audited to confirm that all traffic goes through the firewall.",
        },
        {
          es: "Administrar Proxmox requiere un camino que bypasea el firewall (consola, IP de management en VLAN aparte, etc.), abriendo vectores que el firewall no ve.",
          en: "Managing Proxmox requires a path that bypasses the firewall (console, management IP in a separate VLAN, etc.), opening vectors that the firewall doesn't see.",
        },
      ],
      recomendaciones: [],
    },
    stack: [
      "Proxmox VE",
      "OPNsense",
      "k3s (Kubernetes ligero)",
      "Apache Guacamole",
      "Dnsmasq",
      "VLAN 802.1Q",
      "Terraform (roadmap)",
      "Ansible (roadmap)",
    ],
    manualUrl: "/Manual_Homelab_public.md",
    manualLabel: {
      es: "Ver documentación técnica completa",
      en: "View complete technical documentation",
    },
  },
  isverceo: {
    slug: "isverceo",
    headerEyebrow: {
      es: "Proyecto Destacado · PaaS",
      en: "Featured Project · PaaS",
    },
    objetivoTitulo: {
      es: "¿Por qué construir un PaaS propio?",
      en: "Why build a self-hosted PaaS?",
    },
    objetivo: {
      es: "Construir un PaaS self-hosted (tipo Vercel/Netlify) que permita desplegar aplicaciones a partir de repositorios de GitHub con control total sobre la infraestructura, sin depender de servicios de terceros de pago, y entendiendo a fondo cada decisión arquitectónica.",
      en: "Build a self-hosted PaaS (similar to Vercel/Netlify) that allows deploying applications from GitHub repositories with full control over the infrastructure, without relying on paid third-party services, and understanding each architectural decision in depth.",
    },
    objetivoIntro: {
      es: 'El objetivo fue construir una alternativa propia a Vercel/Netlify/Railway que automatizara el ciclo "push a GitHub → build → deploy público" para mis proyectos, asumiendo yo toda la responsabilidad operacional: build runners, registry, edge proxy, certificados, base de datos, observabilidad y billing. La motivación principal fue aprender haciendo, no solo desplegar.',
      en: 'The goal was to build a self-hosted alternative to Vercel/Netlify/Railway that would automate the "push to GitHub → build → public deploy" cycle for my projects, assuming all operational responsibility: build runners, registry, edge proxy, certificates, database, observability and billing. The main motivation was to learn by doing, not just deploy.',
    },
    arquitecturaIntro: {
      es: "Monorepo de 9 microservicios NestJS (gateway, auth, users, projects, deployments, github, payments, email, encrypt) comunicados por RabbitMQ con patrón híbrido request/response + eventos asíncronos. Redis para sesiones, rate-limiting y Pub/Sub. PostgreSQL con Prisma como ORM compartido. Traefik como edge proxy con terminación TLS. El núcleo del sistema (deployments) clona repos, ejecuta build con Nixpacks/Railpack, publica en un registry Docker privado y despliega en Docker Swarm.",
      en: "Monorepo of 9 NestJS microservices (gateway, auth, users, projects, deployments, github, payments, email, encrypt) communicating via RabbitMQ with a hybrid request/response + asynchronous events pattern. Redis for sessions, rate-limiting and Pub/Sub. PostgreSQL with Prisma as the shared ORM. Traefik as the edge proxy with automatic TLS termination. The core of the system (deployments) clones repositories, runs builds with Nixpacks/Railpack, publishes to a private Docker registry and deploys to Docker Swarm.",
    },
    arquitectura: {
      items: [
        {
          label: { es: "Tipo", en: "Type" },
          value: {
            es: "Monorepo de microservicios NestJS auto-contenidos",
            en: "Monorepo of self-contained NestJS microservices",
          },
        },
        {
          label: { es: "Servicios", en: "Services" },
          value: {
            es: "9 microservicios especializados",
            en: "9 specialized microservices",
          },
        },
        {
          label: { es: "API Gateway", en: "API Gateway" },
          value: {
            es: "Único endpoint HTTP público (gateway)",
            en: "Single public HTTP endpoint (gateway)",
          },
        },
        {
          label: { es: "Mensajería", en: "Messaging" },
          value: {
            es: "RabbitMQ con request/response + eventos asíncronos",
            en: "RabbitMQ with request/response + asynchronous events",
          },
        },
        {
          label: { es: "Cache/Sesiones", en: "Cache/Sessions" },
          value: {
            es: "Redis (rate-limit, sesiones JWT, Pub-Sub)",
            en: "Redis (rate-limit, JWT sessions, Pub-Sub)",
          },
        },
        {
          label: { es: "Persistencia", en: "Persistence" },
          value: {
            es: "PostgreSQL 15 + Prisma 6 (5 esquemas por dominio)",
            en: "PostgreSQL 15 + Prisma 6 (5 schemas by domain)",
          },
        },
        {
          label: { es: "Edge proxy", en: "Edge proxy" },
          value: {
            es: "Traefik con terminación TLS automática",
            en: "Traefik with automatic TLS termination",
          },
        },
        {
          label: { es: "Build runners", en: "Build runners" },
          value: {
            es: "Nixpacks (dinámicos) y Railpack (estáticos)",
            en: "Nixpacks (dynamic) and Railpack (static)",
          },
        },
        {
          label: { es: "Orquestación", en: "Orchestration" },
          value: {
            es: "Docker Swarm con stack deploy",
            en: "Docker Swarm with stack deploy",
          },
        },
        {
          label: { es: "Registry", en: "Registry" },
          value: {
            es: "Docker Registry privado interno",
            en: "Internal private Docker Registry",
          },
        },
        {
          label: { es: "Pagos", en: "Payments" },
          value: { es: "Stripe SDK + webhooks", en: "Stripe SDK + webhooks" },
        },
        {
          label: { es: "Email", en: "Email" },
          value: {
            es: "Resend para emails transaccionales",
            en: "Resend for transactional emails",
          },
        },
      ],
    },
    diagramas: {
      topologiaLabel: {
        es: "Diagrama de Arquitectura",
        en: "Architecture Diagram",
      },
      serviciosLabel: { es: "Flujo de Despliegue", en: "Deployment Flow" },
    },
    aprendizaje: {
      intro: {
        es: "Construir un PaaS real me obligó a entender patrones de sistemas distribuidos, seguridad operativa y trade-offs de diseño. Estos son los aprendizajes más valiosos:",
        en: "Building a real PaaS forced me to understand patterns of distributed systems, operational security and design trade-offs. These are the most valuable learnings:",
      },
      puntos: [
        {
          title: {
            es: "Microservicios con comunicación híbrida (RPC + eventos)",
            en: "Microservices with hybrid communication (RPC + events)",
          },
          description: {
            es: 'Diseñar un bus de mensajes único (RabbitMQ) con dos patrones: request/response para llamadas síncronas tipo "auth login with github" y eventos asíncronos fire-and-forget para "github sync repositories". Cada servicio usa la conexión AMQP con reconexión automática. Aprendí a definir bien los boundaries: qué necesita respuesta inmediata y qué puede procesarse en background.',
            en: 'Design a single message bus (RabbitMQ) with two patterns: request/response for synchronous calls like "auth login with github" and asynchronous events for "github sync repositories". Each service uses the AMQP connection with automatic reconnection. I learned to define boundaries well: what needs an immediate response and what can be processed in the background.',
          },
        },
        {
          title: {
            es: "Aislamiento de red por superficie de ataque",
            en: "Network isolation by attack surface",
          },
          description: {
            es: "Decisión clave: solo el gateway, el servicio de GitHub (para webhooks) y el servicio de pagos (para webhook de Stripe) están expuestos a internet. Los demás microservicios viven en una red interna sin acceso directo desde fuera. Las apps de los usuarios desplegadas corren en una tercera red separada. Esto reduce drásticamente la superficie de ataque: un compromiso en deployments-ms no expone automáticamente al resto.",
            en: "Key decision: only the gateway, the GitHub service (for webhooks) and the payments service (for Stripe webhooks) are exposed to the internet. The rest of the microservices live in an internal network without direct access from outside. The users' apps deployed run in a third separate network. This drastically reduces the attack surface: a compromise in deployments-ms doesn't automatically expose the rest.",
          },
        },
        {
          title: {
            es: "Endurecimiento de contenedores de usuario",
            en: "Hardening of user containers",
          },
          description: {
            es: "Cada app que un usuario despliega se ejecuta en un contenedor con filesystem read-only, usuario no-root (UID 1000), tmpfs endurecidos en rutas sensibles (/tmp, /run, /var/cache/nginx, etc.) y resource limits (CPU/memoria) leídos dinámicamente del plan del tenant. El goal: que un app comprometida no pueda escribir en el sistema, no escale de privileges, y no consuma recursos del host. Diferente por plan (FREE/PRO/INSANO).",
            en: "Each app that a user deploys runs in a container with a read-only filesystem, non-root user (UID 1000), hardened tmpfs in sensitive paths (/tmp, /run, /var/cache/nginx, etc.), and resource limits (CPU/memory) read dynamically from the tenant's plan. The goal: that a compromised app cannot write to the system, escalate privileges, or consume resources from the host. Different per plan (FREE/PRO/INSANO).",
          },
        },
        {
          title: {
            es: "Integración de pagos y CI/CD con webhooks externos",
            en: "Integration of payments and CI/CD with external webhooks",
          },
          description: {
            es: "Stripe mediante SDK oficial y webhooks firmados para actualizar el planStatus del tenant. GitHub App + OAuth para clonar repos sin pedir PAT personal al usuario, con webhooks para reaccionar a pushes. Aprendí a manejar idempotencia en webhooks (un mismo evento puede llegar dos veces) y a validar firmas criptográficamente antes de cualquier mutación de estado.",
            en: "Stripe via official SDK and signed webhooks to update the tenant's planStatus. GitHub App + OAuth to clone repos without asking the user for a personal access token, with webhooks to react to pushes. I learned to handle idempotency in webhooks (the same event can arrive twice) and to validate signatures cryptographically before any state mutation.",
          },
        },
        {
          title: {
            es: "Cifrado de tokens sensibles con servicio dedicado",
            en: "Encryption of sensitive tokens with a dedicated service",
          },
          description: {
            es: "Los access tokens de GitHub y los secrets de variables de entorno nunca se guardan en texto plano: pasan por un microservicio dedicado de cifrado (AES-256-GCM autenticado) que rota claves automáticamente y mantiene las últimas 3 versiones activas para poder descifrar tokens emitidos con claves anteriores. Los JWTs de sesión además van firmados Y cifrados antes de entregarse como cookie HttpOnly. Doble capa de protección.",
            en: "GitHub access tokens and environment variable secrets are never stored in plain text: they go through a dedicated encryption microservice (AES-256-GCM authenticated) that rotates keys automatically and maintains the last 3 active versions to be able to decrypt tokens issued with previous keys. Session JWTs are also signed and encrypted before being delivered as HttpOnly cookies. Double layer of protection.",
          },
        },
      ],
    },
    hallazgo: {
      titulo: {
        es: "El trade-off honesto: 9 microservicios, 5 esquemas Prisma",
        en: "The honest trade-off: 9 microservices, 5 Prisma schemas",
      },
      resumen: {
        es: "La decisión que más me hizo pensar fue separar el sistema en 9 microservicios cuando un monolito bien organizado probablemente habría cubierto el 80% de los casos. Y, sobre todo, aceptar que cinco de esos servicios comparten una única Postgres con esquemas Prisma duplicados.",
        en: "The decision that made me think the most was to split the system into 9 microservices when a well-organized monolith would probably have covered 80% of the cases. And, above all, to accept that five of those services share a single Postgres with duplicated Prisma schemas.",
      },
      implicaciones: [
        {
          es: "Microservicios dan boundaries claros y fallos aislados, pero cuestan: 9 pipelines de deploy, 9 imágenes Docker, tracing distribuido e idempotencia en cada handler. Para un sistema de este tamaño no es óbvio que sea la mejor elección — es la que más te enseña sobre sistemas distribuidos, que era parte del objetivo.",
          en: "Microservices provide clear boundaries and isolated failures, but they come with a cost: 9 deployment pipelines, 9 Docker images, distributed tracing, and idempotency in each handler. For a system of this size, it's not obvious that this is the best choice — it's the one that teaches you the most about distributed systems, which was part of the goal.",
        },
        {
          es: "Duplicar el `schema.prisma` en 5 servicios te da autonomía de despliegue pero rompe la consistencia del modelo de datos. Cualquier cambio hay que replicarlo en 5 archivos coordinados. Funciona, pero tiene un techo de escala claro: si el sistema creciera a 15+ servicios, este diseño se rompería.",
          en: "Duplicating the `schema.prisma` in 5 services gives you deployment autonomy but breaks the consistency of the data model. Any change has to be replicated in 5 coordinated files. It works, but it has a clear scalability ceiling: if the system grows to 15+ services, this design would break.",
        },
      ],
      recomendaciones: [],
    },
    stack: [
      "NestJS 11",
      "TypeScript 5.7",
      "RabbitMQ (NestJS Microservices)",
      "Redis",
      "PostgreSQL 15",
      "Prisma 6",
      "Docker Swarm",
      "Traefik",
      "Let's Encrypt",
      "Nixpacks / Railpack",
      "Stripe API",
      "GitHub Apps + OAuth",
      "AES-256-GCM (cifrado autenticado)",
    ],
  },
  "tiendas-don-pepe": {
    slug: "tiendas-don-pepe",
    headerEyebrow: { es: "Proyecto · E-commerce", en: "Project · E-commerce" },
    objetivoTitulo: { es: "¿Por qué construir un e-commerce desde cero?", en: "Why build an e-commerce from scratch?" },
    objetivo:
      { es: "Construir un sistema de gestión de tienda minorista end-to-end: clientes, inventario, ventas con control de stock transaccional, y generación de facturas en PDF — para practicar un backend real con lógica de negocio no trivial (transacciones, roles, generación de documentos).", en: "Build a complete retail store management system: customers, inventory, sales with transactional stock control, and PDF invoice generation — to practice a real backend with non-trivial business logic (transactions, roles, document generation)." },
    objetivoIntro:
      { es: "La motivación fue práctica: un e-commerce real toca todo lo que un backend debe saber hacer bien — transacciones SQL con rollback, autorización por roles, generación de documentos, subida de archivos, paginación, validación de datos en cada capa. Quería un proyecto donde la lógica de negocio no fuera trivial y donde cada decisión de diseño tuviera consecuencias reales.", en: "The motivation was practical: a real e-commerce touches everything a backend should know how to do well — SQL transactions with rollback, role-based authorization, document generation, file uploads, pagination, and data validation at each layer. I wanted a project where the business logic wasn't trivial and where each design decision had real consequences." },
    arquitecturaIntro:
      { es: "Monolito modular en NestJS (un único proceso, 8 módulos de dominio) con TypeORM sobre MySQL, autenticación JWT con dos roles, y generación de PDFs con pdfmake usando templates declarativos. Frontend en Next.js con Shadcn + Tailwind consumiendo la API REST documentada con Swagger.", en: "Modular monolith in NestJS (a single process, 8 domain modules) with TypeORM over MySQL, JWT authentication with two roles, and PDF generation with pdfmake using declarative templates. Frontend in Next.js with Shadcn + Tailwind consuming the REST API documented with Swagger." },
    cuentaDemo: {
      email: "pruebas@pruebas.com",
      password: "pruebas123",
      nota: { es: "Cuenta de demostración con datos de seed cargados. Accede al Swagger en / para explorar los endpoints.", en: "Demo account with seed data loaded. Access the Swagger at / to explore the endpoints." },
    },
    arquitectura: {
      items: [
        { label: { es: "Tipo", en: "Type" }, value: { es: "Monolito modular NestJS (un único proceso)", en: "Modular monolith in NestJS (a single process)" } },
        {
          label: { es: "Módulos", en: "Modules" },
          value: {
            es: "8 módulos de dominio (Auth, Clientes, Tiendas, Productos, Compras, Facturas, Printer, Common)",
            en: "8 domain modules (Auth, Clientes, Tiendas, Productos, Compras, Facturas, Printer, Common)"
          }
        },
        {
          label: { es: "Patrón", en: "Pattern" },
          value: { es: "Modular monolith de NestJS (no microservicios)", en: "Modular monolith of NestJS (not microservices)" },
        },
        {
          label: { es: "API", en: "API" },
          value: { es: "REST con prefijo global /api/v1/* y Swagger en /", en: "REST with global prefix /api/v1/* and Swagger at /" },
        },
        { label: { es: "ORM", en: "ORM" }, value: { es: "TypeORM 0.3 con autoLoadEntities", en: "TypeORM 0.3 with autoLoadEntities" } },
        { label: { es: "DB", en: "DB" }, value: { es: "MySQL 8.0", en: "MySQL 8.0" } },
        {
          label: { es: "Auth", en: "Auth" },
          value: { es: "JWT propio (sin Passport) con sliding session", en: "Own JWT (without Passport) with sliding session" },
        },
        {
          label: { es: "Autorización", en: "Authorization" },
          value: { es: "Roles planos (admin/user) con Reflector + SetMetadata", en: "Flat roles (admin/user) with Reflector + SetMetadata" },
        },
        {
          label: { es: "PDFs", en: "PDFs" },
          value:
            { es: "pdfmake con TDocumentDefinitions declarativo + fuentes Roboto locales", en: "pdfmake with declarative TDocumentDefinitions + local Roboto fonts" },
        },
        {
          label: { es: "Uploads", en: "Uploads" },
          value: { es: "multer (diskStorage) en ./imagenes/ + ServeStatic", en: "multer (diskStorage) in ./imagenes/ + ServeStatic" },
        },
        { label: { es: "Frontend", en: "Frontend" }, value: { es: "Next.js + Shadcn + Tailwind CSS", en: "Next.js + Shadcn + Tailwind CSS" } },
        {
          label: { es: "Validación", en: "Validation" },
          value: { es: "class-validator + ValidationPipe global", en: "class-validator + Global ValidationPipe" },
        },
      ],
    },
    diagramas: {
      topologiaLabel: { es: "Diagrama de Arquitectura", en: "Architecture Diagram" },
      serviciosLabel: { es: "Flujo de Venta y Facturación", en: "Sales and Invoicing Flow" },
    },
    aprendizaje: {
      intro:
        { es: 'Un e-commerce "completo" termina tocando casi todos los temas importantes de un backend moderno. Estos son los aprendizajes que más me marcaron:', en: 'A "complete" e-commerce touches almost all the important topics of a modern backend. These are the learnings that marked me the most:' },
      puntos: [
        {
          title: { es: "Transacciones SQL explícitas con TypeORM QueryRunner", en: "Explicit SQL Transactions with TypeORM QueryRunner" },
          description:
            { es: 'La operación crítica es "vender N unidades de M productos a un cliente". El bug clásico es validar stock en línea y descontarlo después — si entre validar y descontar falla algo, queda stock vendido que no existe. La solución correcta: abrir un QueryRunner con startTransaction, validar TODO primero, y solo si todo pasa hacer los UPDATE. Si algo falla en el camino, rollback automático. La query de reversión tiene un N+1 que se podría optimizar, pero a esta escala no es problema.', en: 'The critical operation is "to sell N units of M products to a client". The classic bug is to validate stock online and then deduct it — if something fails between validation and deduction, there will be sold stock that doesn\'t exist. The correct solution: open a QueryRunner with startTransaction, validate everything first, and only if everything passes do the UPDATEs. If something fails along the way, automatic rollback. The reversal query has an N+1 that could be optimized, but at this scale it\'s not a problem.' },
        },
        {
          title: { es: "Cliente como espejo de User", en: "Client as a Mirror of User" },
          description:
            { es: "El sistema tiene dos entidades: User (autenticación) y Cliente (dominio de negocio). La relación es por email — un User siempre tiene un Cliente asociado. Esto desacopla el modelo de dominio de la autenticación, lo que es elegante: las compras y facturas no saben nada de passwords ni JWT. El trade-off es que abre la puerta a inconsistencias: si falla el insert del Cliente espejo al registrar un User, tienes un User sin Cliente (o al revés). La solución pragmática es crear ambas en cascada dentro de la misma transacción.", en: "The system has two entities: User (authentication) and Client (business domain). The relationship is by email — a User always has a Client associated. This decouples the business domain model from authentication, which is elegant: purchases and invoices don't know anything about passwords or JWTs. The trade-off is that it opens the door to inconsistencies: if the insert of the Client mirror fails when registering a User, you have a User without a Client (or vice versa). The pragmatic solution is to create both in cascade within the same transaction." },
        },
        {
          title: { es: "Generación de PDFs con pdfmake declarativo", en: "Generating PDFs with declarative pdfmake" },
          description:
            { es: 'En vez de pdfkit imperativo o puppeteer HTML→PDF, pdfmake permite describir el template de factura como un árbol de objetos: { content: [header, table, footer], styles: {...} }. El template vive en un solo archivo parametrizable. La marca de agua "DOCUMENTO NO FISCAL" se renderiza con una función background por página. Es la decisión correcta para PDFs repetibles: cambiar el logo o el formato es tocar un solo archivo, no decenas de líneas imperativas.', en: 'Instead of imperative pdfkit or puppeteer HTML→PDF, pdfmake allows you to describe the invoice template as a tree of objects: { content: [header, table, footer], styles: {...} }. The template lives in a single parametrizable file. The watermark "DOCUMENTO NO FISCAL" is rendered with a background function per page. This is the correct decision for repeatable PDFs: changing the logo or format is just touching a single file, not dozens of imperative lines.' },
        },
        {
          title: { es: "Sliding session JWT sin refresh token formal", en: "Sliding session JWT without formal refresh token" },
          description:
            { es: "AuthGuard no solo verifica el token — también genera uno nuevo y lo asigna a request.token. El efecto: cada request válido te devuelve un token renovado, como una sesión deslizante. No hay refresh token explícito. El trade-off: si el frontend no actualiza el header Authorization con el nuevo token, eventualmente el viejo expira y el usuario tiene que re-loguear. Es una solución elegante para SPAs que cooperan, pero frágil si el cliente ignora el header de respuesta.", en: "AuthGuard not only verifies the token — it also generates a new one and assigns it to request.token. The effect is that each valid request returns a renewed token, like a sliding session. There is no formal refresh token. The trade-off is that if the frontend doesn't update the Authorization header with the new token, eventually the old one expires and the user has to re-login. It's an elegant solution for SPAs that cooperate, but fragile if the client ignores the response header." },
        },
        {
          title: { es: "Roles con metadata reflectiva de NestJS", en: "Roles with reflective metadata from NestJS" },
          description:
            { es: 'Patrón canónico: @RoleProtected(ValidRoles.ADMIN) es solo un decorador que llama SetMetadata("roles", ["admin"]). UserRoleGuard usa Reflector.get(META_ROLES, handler) para decidir. Cada controller combina @UseGuards(AuthGuard, UserRoleGuard) y @RoleProtected(...). El resultado es autorización granular por endpoint sin boilerplate. El trade-off: solo dos roles planos (admin/user), sin permisos granulares. Suficiente para una app de tienda, insuficiente para SaaS multi-tenant.', en: 'Canonical pattern: @RoleProtected(ValidRoles.ADMIN) is just a decorator that calls SetMetadata("roles", ["admin"]). UserRoleGuard uses Reflector.get(META_ROLES, handler) to decide. Each controller combines @UseGuards(AuthGuard, UserRoleGuard) and @RoleProtected(...). The result is granular authorization by endpoint without boilerplate. The trade-off: only two flat roles (admin/user), no granular permissions. Sufficient for a store app, insufficient for a multi-tenant SaaS.' },
        },
      ],
    },
    hallazgo: {
      titulo: { es: "El patrón Cliente-espejo-de-User: útil pero con gotcha", en: "The Client-mirror-User pattern: useful but with a gotcha" },
      resumen:
        { es: "La decisión más interesante (y la que más me enseñó sobre consistencia eventual) fue desacoplar autenticación de dominio haciendo que cada User tenga un Cliente asociado por email. Es elegante y te da boundaries claros, pero abre una puerta a inconsistencias que solo descubres cuando algo falla en producción.", en: "The most interesting decision (and the one that taught me the most about eventual consistency) was to decouple authentication from the domain by making each User have a Client associated by email. It's elegant and gives you clear boundaries, but it opens the door to inconsistencies that you only discover when something fails in production." },
      implicaciones: [
        { es: "Ventaja: el módulo de autenticación no sabe nada de clientes, y el módulo de clientes no sabe nada de passwords. Si en el futuro cambias la auth (passkeys, OAuth, MFA), el dominio de negocio no se entera.", en: "Advantage: the authentication module doesn't know anything about clients, and the clients module doesn't know anything about passwords. If in the future you change the auth (passkeys, OAuth, MFA), the business domain won't be aware." },
        { es: "Trade-off: si el insert del Cliente espejo falla (red, constraint, lo que sea), tienes un User sin Cliente. La app no rompe inmediatamente, pero el primer intento de comprar va a fallar con un error confuso. La defensa es crear ambas en la misma transacción: si el Cliente falla, rollback del User.", en: "Trade-off: if the insert of the mirror Client fails (network, constraint, whatever), you have a User without a Client. The app doesn't break immediately, but the first attempt to buy will fail with a confusing error. The defense is to create both in the same transaction: if the Client fails, rollback the User." },
        { es: "Para mi caso (proyecto de práctica, deploy simple), el riesgo era aceptable. Para producción con miles de usuarios, consideraría un FK Users.id_cliente real o un modelo de identidad unificado.", en: "For my case (practice project, simple deploy), the risk was acceptable. For production with thousands of users, I would consider a real FK Users.id_cliente or a unified identity model." },
      ],
      recomendaciones: [
        { es: "Validar las variables de entorno con Joi en arranque para fallar rápido si falta algo crítico (la app no lo hacía y se descubría en runtime).", en: "Validate environment variables with Joi at startup to fail fast if something critical is missing (the app wasn't doing this and it was discovered at runtime)." },
        { es: "Mover el bootstrap del admin inicial a un script CLI independiente en vez de quemarlo en el código del servicio, para que las credenciales nunca estén en el repo.", en: "Move the initial admin bootstrap to an independent CLI script instead of hardcoding it in the service code, so that credentials never end up in the repo." },
        { es: "Activar políticas de CORS estrictas leyendo los orígenes permitidos desde una variable de entorno, en vez de dejar CORS abierto a todos los orígenes.", en: "Enable strict CORS policies by reading allowed origins from an environment variable, instead of leaving CORS open to all origins." },
        { es: "Añadir rate-limiting por IP en el endpoint de login para defenderse de fuerza bruta, y considerar CSRF tokens si la API se va a usar desde navegadores de terceros.", en: "Add rate-limiting by IP on the login endpoint to defend against brute force attacks, and consider CSRF tokens if the API is going to be used from third-party browsers." },
        { es: "Desactivar Swagger en producción o protegerlo con auth, ya que la documentación interna puede revelar vectores de ataque.", en: "Deactivate Swagger in production or protect it with auth, as internal documentation can reveal attack vectors." },
      ],
    },
    stack: [
      "NestJS 11",
      "TypeScript",
      "TypeORM",
      "MySQL 8.0",
      "JWT (jsonwebtoken)",
      "pdfmake",
      "bcryptjs",
      "multer",
      "Next.js",
      "Shadcn",
      "Tailwind CSS",
      "Swagger / OpenAPI",
    ],
  },
};


export function getProjectDetails(lang: Lang) {
  return Object.fromEntries(
    Object.entries(projectDetails).map(([key, value]) => [
      key,
      {
        ...value,
        headerEyebrow: value.headerEyebrow[lang],
        objetivoTitulo: value.objetivoTitulo[lang],
      objetivo: value.objetivo[lang],
      objetivoIntro: value.objetivoIntro[lang],
      arquitecturaIntro: value.arquitecturaIntro[lang],
      aprendizaje: {
        ...value.aprendizaje,
        intro: value.aprendizaje.intro[lang],
        puntos: value.aprendizaje.puntos.map((p) => ({
          title: p.title[lang],
          description: p.description[lang],
        })),
      },
      hallazgo: {
        ...value.hallazgo,
        titulo: value.hallazgo.titulo[lang],
        resumen: value.hallazgo.resumen[lang],
        implicaciones: value.hallazgo.implicaciones.map((i) => i[lang]),
        recomendaciones: value.hallazgo.recomendaciones.map((r) => r[lang]),
      },
      manualLabel: value.manualLabel ? value.manualLabel[lang]: undefined,
    }]
  ));
}