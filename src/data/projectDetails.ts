export interface ProjectDetailContent {
  slug: string;
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
      titulo: 'Hallazgo de seguridad crítico: dependencia circular del firewall',
      resumen:
        'Durante el diseño detecté un problema arquitectónico serio: el firewall OPNsense corre como VM dentro del mismo Proxmox que se supone debe proteger. Esto crea una dependencia circular y un single point of failure importante.',
      implicaciones: [
        'Single Point of Failure: si el host Proxmox cae, se pierde el firewall Y todos los servicios simultáneamente. No hay red de seguridad.',
        'Problema de bootstrapping: el firewall depende del hypervisor para arrancar, lo cual es conceptualmente contradictorio con su rol de protección perimetral.',
        'Potencial bypass: tráfico interno entre VMs podría evadir el firewall si Proxmox enruta por bridges sin pasar por OPNsense.',
        'Acceso de gestión: administrar Proxmox requiere un camino que bypasea el firewall (consola directa, IP de management en otra VLAN, etc.), abriendo vectores.',
      ],
      recomendaciones: [
        'Migrar OPNsense a hardware físico dedicado (mini PC con 2+ NICs) como firewall perimetral externo al servidor Proxmox.',
        'Implementar Alta Disponibilidad (HA) con un segundo nodo Proxmox para cluster, almacenamiento compartido (NFS/iSCSI) y migración en vivo de VMs críticas.',
        'Adoptar Infrastructure as Code con Terraform/Ansible para que toda la configuración (VLANs, reglas, VMs) sea declarativa, versionada y reproducible.',
        'Configurar IDS/IPS en OPNsense (Suricata) y logging centralizado de seguridad para detectar anomalías.',
      ],
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
};
