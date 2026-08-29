export interface ProjectDetailContent {
  slug: string;
  headerEyebrow: string;
  objetivoTitulo: string;
  objetivo: string;
  objetivoIntro: string;
  arquitecturaIntro: string;
  arquitectura: {
    items: { label: string; value: string }[];
  };
  diagramas: {
    topologiaLabel: string;
    serviciosLabel: string;
  };
  aprendizaje: {
    intro: string;
    puntos: { title: string; description: string }[];
  };
  hallazgo: {
    titulo: string;
    resumen: string;
    implicaciones: string[];
    recomendaciones: string[];
  };
  stack: string[];
  manualUrl?: string;
  manualLabel?: string;
}

export const projectDetails: Record<string, ProjectDetailContent> = {
  'homelab-infrastructure': {
    slug: 'homelab-infrastructure',
    headerEyebrow: 'Proyecto Destacado · Homelab',
    objetivoTitulo: '¿Por qué un homelab propio?',
    objetivo:
      'Tener infraestructura propia (VMs, servicios, entornos de prueba) sin depender de VPS de pago, aprovechando hardware propio con virtualización completa y segmentación de red por VLANs para aislar cada proyecto o entorno.',
    objetivoIntro:
      'El objetivo principal fue construir un laboratorio de infraestructura autosuficiente que sirviera como entorno real de desarrollo, testing y despliegue para mis proyectos personales, eliminando la dependencia de servicios cloud de pago y dándome control total sobre la topología de red.',
    arquitecturaIntro:
      'Servidor Proxmox con 12 VMs + 1 LXC, firewall OPNsense virtualizado, 8 VLANs para separar lógicamente cada proyecto/entorno, cluster k3s (1 master + 2 workers) y Apache Guacamole para acceso remoto seguro.',
    arquitectura: {
      items: [
        { label: 'Hypervisor', value: 'Proxmox VE 8.x sobre servidor único' },
        { label: 'VMs', value: '12 máquinas virtuales en operación' },
        { label: 'Contenedores', value: '1 LXC (Apache Guacamole) + 1 template' },
        { label: 'Firewall', value: 'OPNsense virtualizado (VM 102) como router/firewall' },
        { label: 'VLANs', value: '8 VLANs 802.1Q segmentadas por función' },
        { label: 'Cluster', value: 'k3s con 1 master + 2 workers (VMs 106-108)' },
        { label: 'Acceso remoto', value: 'Apache Guacamole vía navegador (sin RDP/SSH directo)' },
        { label: 'DNS/DHCP', value: 'Dnsmasq integrado en OPNsense' },
      ],
    },
    diagramas: {
      topologiaLabel: 'Topología de Red',
      serviciosLabel: 'Inventario de Servicios Proxmox',
    },
    aprendizaje: {
      intro:
        'Este proyecto me obligó a entender, configurar y razonar sobre infraestructura completa. Estos son los aprendizajes más valiosos que me llevo:',
      puntos: [
        {
          title: 'VLANs en OPNsense integradas con Proxmox',
          description:
            'Configurar interfaces VLAN sobre el trunk del hypervisor y crear las interfaces opt1..opt8 en OPNsense, mapeando cada una a un bridge de Proxmox. Cada VLAN termina en un bridge Linux independiente que las VMs usan como interfaz de red, manteniendo el aislamiento a nivel de capa 2.',
        },
        {
          title: 'Segmentación y reglas de firewall inter-VLAN',
          description:
            'Diseñar reglas explícitas en OPNsense para BLOQUEAR tráfico entre VLANs por defecto y solo permitir lo necesario. Esto es lo opuesto a como se configuran redes planas: cada proyecto es una red aislada lógicamente, sin visibilidad ni acceso a las otras aunque estén en el mismo servidor físico.',
        },
        {
          title: 'Por qué 8 VLANs y no menos',
          description:
            'Una VLAN por proyecto/entorno (ISVERCEO, DOKPLOY, MANAGEMENT, DEVOPS, AWS_LAB, KUBERNETES, OBSERVABILITY, WORKSPACE). Si un servicio se compromete, el atacante queda confinado a esa VLAN. Adicionalmente, permite replicar entornos (lab vs producción) sin colisión de IPs y sin miedo a romper el resto.',
        },
        {
          title: 'Acceso remoto seguro con Apache Guacamole',
          description:
            'En vez de exponer RDP/SSH al exterior (que serían blancos directos de brute force y exploits), uso Apache Guacamole como gateway web. El usuario se autentica vía HTTPS en una sola URL, y Guacamole proxea el protocolo nativo (RDP/VNC/SSH) hacia la VM interna. Resultado: superficie de ataque mínima, un solo punto de hardening, MFA fácil de integrar.',
        },
        {
          title: 'k3s en lugar de Kubernetes completo',
          description:
            'Para un servidor único con recursos limitados, k3s es la elección correcta: un solo binario, SQLite como datastore por defecto, etcd reemplazado por SQLite embebido, y todos los componentes en un único proceso. Funciona out-of-the-box sin la complejidad operacional de un cluster k8s real (etcd, control plane separado, etcd backups, etc.).',
        },
      ],
    },
    hallazgo: {
      titulo: 'El problema que descubrí diseñando la red: el firewall depende del hypervisor',
      resumen:
        'Algo que no vi venir hasta que lo dibujé en papel: el firewall OPNsense corre como una VM dentro del mismo servidor Proxmox que se supone que debe proteger. Si el host cae, cae el firewall Y todos los servicios a la vez. Es un single point of failure que ningún diagrama te muestra hasta que lo buscas.',
      implicaciones: [
        'Esto contradice directamente la promesa de un firewall dedicado: el firewall depende del hypervisor para arrancar, lo cual es conceptualmente circular. Un boot failure del host = sin red Y sin protección.',
        'El tráfico interno entre VMs puede evadir el firewall si Proxmox enruta por bridges sin pasar por OPNsense. Hay que auditar cada bridge y cada VLAN para confirmar que todo pasa por el firewall.',
        'Administrar Proxmox requiere un camino que bypasea el firewall (consola, IP de management en VLAN aparte, etc.), abriendo vectores que el firewall no ve.',
      ],
      recomendaciones: [],
    },
    stack: [
      'Proxmox VE',
      'OPNsense',
      'k3s (Kubernetes ligero)',
      'Apache Guacamole',
      'Dnsmasq',
      'VLAN 802.1Q',
      'Terraform (roadmap)',
      'Ansible (roadmap)',
    ],
    manualUrl: '/Manual_Homelab_public.md',
    manualLabel: 'Ver documentación técnica completa',
  },
  'isverceo': {
    slug: 'isverceo',
    headerEyebrow: 'Proyecto Destacado · PaaS',
    objetivoTitulo: '¿Por qué construir un PaaS propio?',
    objetivo:
      'Construir un PaaS self-hosted (tipo Vercel/Netlify) que permita desplegar aplicaciones a partir de repositorios de GitHub con control total sobre la infraestructura, sin depender de servicios de terceros de pago, y entendiendo a fondo cada decisión arquitectónica.',
    objetivoIntro:
      'El objetivo fue construir una alternativa propia a Vercel/Netlify/Railway que automatizara el ciclo "push a GitHub → build → deploy público" para mis proyectos, asumiendo yo toda la responsabilidad operacional: build runners, registry, edge proxy, certificados, base de datos, observabilidad y billing. La motivación principal fue aprender haciendo, no solo desplegar.',
    arquitecturaIntro:
      'Monorepo de 9 microservicios NestJS (gateway, auth, users, projects, deployments, github, payments, email, encrypt) comunicados por RabbitMQ con patrón híbrido request/response + eventos asíncronos. Redis para sesiones, rate-limiting y Pub/Sub. PostgreSQL con Prisma como ORM compartido. Traefik como edge proxy con terminación TLS. El núcleo del sistema (deployments) clona repos, ejecuta build con Nixpacks/Railpack, publica en un registry Docker privado y despliega en Docker Swarm.',
    arquitectura: {
      items: [
        { label: 'Tipo', value: 'Monorepo de microservicios NestJS auto-contenidos' },
        { label: 'Servicios', value: '9 microservicios especializados' },
        { label: 'API Gateway', value: 'Único endpoint HTTP público (gateway)' },
        { label: 'Mensajería', value: 'RabbitMQ con request/response + eventos asíncronos' },
        { label: 'Cache/Sesiones', value: 'Redis (rate-limit, sesiones JWT, Pub-Sub)' },
        { label: 'Persistencia', value: 'PostgreSQL 15 + Prisma 6 (5 esquemas por dominio)' },
        { label: 'Edge proxy', value: 'Traefik con terminación TLS automática' },
        { label: 'Build runners', value: 'Nixpacks (dinámicos) y Railpack (estáticos)' },
        { label: 'Orquestación', value: 'Docker Swarm con stack deploy' },
        { label: 'Registry', value: 'Docker Registry privado interno' },
        { label: 'Pagos', value: 'Stripe SDK + webhooks' },
        { label: 'Email', value: 'Resend para emails transaccionales' },
      ],
    },
    diagramas: {
      topologiaLabel: 'Diagrama de Arquitectura',
      serviciosLabel: 'Flujo de Despliegue',
    },
    aprendizaje: {
      intro:
        'Construir un PaaS real me obligó a entender patrones de sistemas distribuidos, seguridad operativa y trade-offs de diseño. Estos son los aprendizajes más valiosos:',
      puntos: [
        {
          title: 'Microservicios con comunicación híbrida (RPC + eventos)',
          description:
            'Diseñar un bus de mensajes único (RabbitMQ) con dos patrones: request/response para llamadas síncronas tipo "auth login with github" y eventos asíncronos fire-and-forget para "github sync repositories". Cada servicio usa la conexión AMQP con reconexión automática. Aprendí a definir bien los boundaries: qué necesita respuesta inmediata y qué puede procesarse en background.',
        },
        {
          title: 'Aislamiento de red por superficie de ataque',
          description:
            'Decisión clave: solo el gateway, el servicio de GitHub (para webhooks) y el servicio de pagos (para webhook de Stripe) están expuestos a internet. Los demás microservicios viven en una red interna sin acceso directo desde fuera. Las apps de los usuarios desplegadas corren en una tercera red separada. Esto reduce drásticamente la superficie de ataque: un compromiso en deployments-ms no expone automáticamente al resto.',
        },
        {
          title: 'Endurecimiento de contenedores de usuario',
          description:
            'Cada app que un usuario despliega se ejecuta en un contenedor con filesystem read-only, usuario no-root (UID 1000), tmpfs endurecidos en rutas sensibles (/tmp, /run, /var/cache/nginx, etc.) y resource limits (CPU/memoria) leídos dinámicamente del plan del tenant. El goal: que un app comprometida no pueda escribir en el sistema, no escale de privileges, y no consuma recursos del host. Diferente por plan (FREE/PRO/INSANO).',
        },
        {
          title: 'Integración de pagos y CI/CD con webhooks externos',
          description:
            'Stripe mediante SDK oficial y webhooks firmados para actualizar el planStatus del tenant. GitHub App + OAuth para clonar repos sin pedir PAT personal al usuario, con webhooks para reaccionar a pushes. Aprendí a manejar idempotencia en webhooks (un mismo evento puede llegar dos veces) y a validar firmas criptográficamente antes de cualquier mutación de estado.',
        },
        {
          title: 'Cifrado de tokens sensibles con servicio dedicado',
          description:
            'Los access tokens de GitHub y los secrets de variables de entorno nunca se guardan en texto plano: pasan por un microservicio dedicado de cifrado (AES-256-GCM autenticado) que rota claves automáticamente y mantiene las últimas 3 versiones activas para poder descifrar tokens emitidos con claves anteriores. Los JWTs de sesión además van firmados Y cifrados antes de entregarse como cookie HttpOnly. Doble capa de protección.',
        },
      ],
    },
    hallazgo: {
      titulo: 'El trade-off honesto: 9 microservicios, 5 esquemas Prisma',
      resumen:
        'La decisión que más me hizo pensar fue separar el sistema en 9 microservicios cuando un monolito bien organizado probablemente habría cubierto el 80% de los casos. Y, sobre todo, aceptar que cinco de esos servicios comparten una única Postgres con esquemas Prisma duplicados.',
      implicaciones: [
        'Microservicios dan boundaries claros y fallos aislados, pero cuestan: 9 pipelines de deploy, 9 imágenes Docker, tracing distribuido e idempotencia en cada handler. Para un sistema de este tamaño no es óbvio que sea la mejor elección — es la que más te enseña sobre sistemas distribuidos, que era parte del objetivo.',
        'Duplicar el `schema.prisma` en 5 servicios te da autonomía de despliegue pero rompe la consistencia del modelo de datos. Cualquier cambio hay que replicarlo en 5 archivos coordinados. Funciona, pero tiene un techo de escala claro: si el sistema creciera a 15+ servicios, este diseño se rompería.',
      ],
      recomendaciones: [],
    },
    stack: [
      'NestJS 11',
      'TypeScript 5.7',
      'RabbitMQ (NestJS Microservices)',
      'Redis',
      'PostgreSQL 15',
      'Prisma 6',
      'Docker Swarm',
      'Traefik',
      "Let's Encrypt",
      'Nixpacks / Railpack',
      'Stripe API',
      'GitHub Apps + OAuth',
      'AES-256-GCM (cifrado autenticado)',
    ],
  },
};
