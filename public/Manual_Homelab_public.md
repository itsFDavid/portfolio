# Manual Técnico de Infraestructura - Homelab

**Versión:** 1.0  
**Fecha:** Agosto 2026  
**Arquitecto:** Senior Infrastructure Architect  
**Host:** homelab.example.com

---

## Resumen Ejecutivo

Este documento presenta la auditoría técnica completa de la infraestructura homelab basada en datos reales extraídos mediante APIs de OPNsense y Proxmox VE. El entorno implementa una arquitectura de virtualización distribuida con segmentación de red avanzada mediante 8 VLANs especializadas.

### Hallazgos Principales

- **Segmentación Avanzada:** 8 VLANs especializadas por función (ISVERCEO, DOKPLOY, MANAGEMENT, etc.)
- **Virtualización Intensiva:** 12 VMs activas + 1 LXC + 1 template en servidor Proxmox único
- **Servicios Críticos:** OPNsense virtualizado como VM 102 para firewall y routing
- **Cluster Kubernetes:** Implementación k3s en VMs 106-108 con arquitectura master/worker

---

## Visión General de la Arquitectura

La infraestructura implementa un diseño híbrido donde el firewall OPNsense opera como máquina virtual dentro del propio servidor Proxmox que protege, creando una topología de "firewall interno" que requiere análisis de seguridad específico.

### Diagrama de Topología de Red
[Ver Topología](./Diagrama_Topologia_Red_public.html)

### Diagrama de Servicios Proxmox  
[Ver Servicios](./Diagrama_Servicios_public.html)

---

## Configuración de Red OPNsense

### Información General del Sistema

| Parámetro | Valor |
|-----------|-------|
| Hostname | OPNsense.internal |
| Dominio | internal |
| Implementación | VM 102 en Proxmox |
| RAM Asignada | 1.8GB / 2GB |
| CPU Cores | 2 cores |
| Uptime | 213,463 segundos |

### Interfaces de Red

| Interfaz | Tipo | Dispositivo | Configuración | Descripción |
|----------|------|-------------|---------------|-------------|
| wan | WAN | vtnet0 | DHCP | Conexión WAN principal |
| lan | LAN | vtnet1 | 10.10.1.1/24 | Red LAN base |
| opt1 | VLAN | vlan01 | 10.10.10.1/24 | ISVERCEO |
| opt2 | VLAN | vlan02 | 10.10.30.1/24 | DOKPLOY |
| opt3 | VLAN | vlan03 | 10.10.50.1/24 | MANAGEMENT |
| opt4 | VLAN | vlan04 | 10.10.60.1/24 | DEVOPS |
| opt5 | VLAN | vlan05 | 10.10.70.1/24 | AWS_LAB |
| opt6 | VLAN | vlan06 | 10.10.80.1/24 | KUBERNETES |
| opt7 | VLAN | vlan07 | 10.10.100.1/24 | OBSERVABILITY |
| opt8 | VLAN | vlan08 | 10.10.40.1/24 | WORKSPACE |

### Configuración de VLANs

| VLAN ID | Interface | Descripción | Subred | Dispositivo Físico | Propósito |
|---------|-----------|-------------|--------|--------------------|-----------|
| 10 | vlan01 | ISVERCEO_VLAN | 10.10.10.1/24 | vtnet1 | Aplicación IsVerceo |
| 30 | vlan02 | DOKPLOY_VLAN | 10.10.30.1/24 | vtnet1 | Plataforma Dokploy |
| 50 | vlan03 | MANAGEMENT_VLAN | 10.10.50.1/24 | vtnet1 | Gestión de infraestructura |
| 60 | vlan04 | DEVOPS_VLAN | 10.10.60.1/24 | vtnet1 | Herramientas DevOps |
| 70 | vlan05 | AWS_LAB_VLAN | 10.10.70.1/24 | vtnet1 | Laboratorio AWS |
| 80 | vlan06 | KUBERNETES_VLAN | 10.10.80.1/24 | vtnet1 | Cluster Kubernetes |
| 100 | vlan07 | OBSERVABILITY_VLAN | 10.10.100.1/24 | vtnet1 | Monitoreo y logs |
| 40 | vlan08 | WORKSPACE | 10.10.40.1/24 | vtnet1 | Apache Guacamole + Dev workspace |

### Servicios de Red Configurados

| Servicio | Estado | Configuración |
|----------|--------|---------------|
| DNS/DHCP | Activo | Dnsmasq en puerto 53053 |
| DHCP Range | Configurado | 10.10.1.41 - 10.10.1.245 |
| NAT Mode | Híbrido | Outbound NAT híbrido |
| SSL Certificate | Configurado | Certificado autofirmado |
| SSH | Activo | Grupo: admins |

---

## Infraestructura Proxmox VE

### Servidor Host

| Parámetro | Valor |
|-----------|-------|
| Hostname | proxmox-host |
| Dirección IP | 192.0.2.10:8006 |
| Versión API | pve-api-daemon/3.0 |
| Total VMs | 12 máquinas virtuales |
| Total LXC | 1 contenedor |
| Templates | 1 template (debian13) |

### Inventario Completo de Máquinas Virtuales

| VM ID | Nombre | Estado | RAM Usado | RAM Total | CPU | Uptime (seg) | Propósito |
|-------|--------|--------|-----------|-----------|-----|--------------|-----------|
| 100 | IsVerceo | running | 3.3GB | 16GB | 4 | 213,403 | Aplicación principal |
| 101 | vps-local | running | 2.3GB | 8GB | 2 | 213,357 | VPS local |
| 102 | OPNsense | running | 1.8GB | 2GB | 2 | 213,463 | Firewall/Router |
| 103 | mgmt-vm | running | 2.4GB | 4GB | 2 | 11,937 | VM de gestión |
| 104 | devops-vm | running | 1.5GB | 8GB | 4 | 11,935 | Herramientas DevOps |
| 105 | aws-vm | running | 1.4GB | 8GB | 4 | 11,933 | Laboratorio AWS |
| 106 | k3s-master | running | 2.1GB | 8GB | 4 | 11,931 | Master Kubernetes |
| 107 | k3s-worker-1 | running | 1.1GB | 4GB | 2 | 11,929 | Worker Kubernetes |
| 108 | k3s-worker-2 | running | 1.1GB | 4GB | 2 | 11,928 | Worker Kubernetes |
| 109 | observability-vm | running | 2.3GB | 6GB | 2 | 213,348 | Monitoreo y observabilidad |
| 200 | dev-workspace | running | 1.6GB | 6GB | 4 | 213,352 | Workspace de desarrollo |
| 9000 | debian13-template | stopped | 0MB | 2GB | 2 | 0 | Template base |

### Inventario de Contenedores LXC

| LXC ID | Nombre | Estado | RAM Usado | RAM Total | CPU | Uptime (seg) | Tags | Propósito |
|--------|--------|--------|-----------|-----------|-----|--------------|------|-----------|
| 111 | apache-guacamole | running | 472MB | 2GB | 1 | 213,341 | community-script;remote;webserver | Acceso remoto web |

### Análisis de Recursos

#### Resumen de Asignación de RAM
- **Total RAM Asignada:** 73GB (suma de límites máximos)
- **Total RAM en Uso Real:** ~19.2GB 
- **Eficiencia de Uso:** ~26% de la RAM asignada
- **VMs con Mayor Consumo:** VM 100 (IsVerceo) - 3.3GB, VM 103 (mgmt-vm) - 2.4GB

#### Distribución de CPU
- **Total CPU Cores Asignados:** 41 cores
- **Distribución por Tipo:**
  - 4 cores: 4 VMs (IsVerceo, devops-vm, aws-vm, k3s-master, dev-workspace)
  - 2 cores: 7 VMs + Template
  - 1 core: 1 LXC

#### Estado de Uptime
- **Servicios de Larga Duración:** VMs 100, 101, 102, 109, 200, LXC 111 (>213k segundos)
- **Servicios Recientes:** VMs 103-108 (~11k segundos, reiniciadas recientemente)
- **Template Inactivo:** VM 9000 (stopped)

---

## Servicios por VLAN

### VLAN 10 - ISVERCEO (10.10.10.1/24)
**VM Asignada:** VM 100 - IsVerceo
- **Recursos:** 3.3GB RAM / 16GB, 4 CPU cores
- **Estado:** Running (uptime: 2.47 días)
- **Propósito:** Aplicación principal del entorno

### VLAN 30 - DOKPLOY (10.10.30.1/24)
**Servicios:** Plataforma de despliegue
- **Estado:** Configurada, sin VMs dedicadas visibles
- **Propósito:** Gestión de despliegues de aplicaciones

### VLAN 50 - MANAGEMENT (10.10.50.1/24)
**VM Asignada:** VM 103 - mgmt-vm
- **Recursos:** 2.4GB RAM / 4GB, 2 CPU cores  
- **Estado:** Running (uptime: 3.3 horas)
- **Propósito:** Gestión y administración del entorno

### VLAN 60 - DEVOPS (10.10.60.1/24)
**VM Asignada:** VM 104 - devops-vm
- **Recursos:** 1.5GB RAM / 8GB, 4 CPU cores
- **Estado:** Running (uptime: 3.3 horas)
- **Propósito:** Herramientas de desarrollo y CI/CD

### VLAN 70 - AWS_LAB (10.10.70.1/24)
**VM Asignada:** VM 105 - aws-vm
- **Recursos:** 1.4GB RAM / 8GB, 4 CPU cores
- **Estado:** Running (uptime: 3.3 horas)  
- **Propósito:** Laboratorio y práctica con servicios AWS

### VLAN 80 - KUBERNETES (10.10.80.1/24)
**Cluster K3s:**
- **VM 106 - k3s-master:** 2.1GB RAM / 8GB, 4 CPU cores
- **VM 107 - k3s-worker-1:** 1.1GB RAM / 4GB, 2 CPU cores
- **VM 108 - k3s-worker-2:** 1.1GB RAM / 4GB, 2 CPU cores
- **Estado:** Cluster completo running (uptime: ~3.3 horas)
- **Propósito:** Orquestación de contenedores

### VLAN 100 - OBSERVABILITY (10.10.100.1/24)
**VM Asignada:** VM 109 - observability-vm
- **Recursos:** 2.3GB RAM / 6GB, 2 CPU cores
- **Estado:** Running (uptime: 2.47 días)
- **Propósito:** Monitoreo, métricas y logs centralizados

### VLAN 40 - WORKSPACE (10.10.40.1/24)
**Servicios Asignados:**
- **LXC 111 - apache-guacamole:** 472MB RAM / 2GB, 1 CPU core
- **VM 200 - dev-workspace:** 1.6GB RAM / 6GB, 4 CPU cores
- **Estado:** Ambos running (uptime: 2.47 días)
- **Propósito:** Acceso remoto web y workspace de desarrollo

---

## Análisis de Seguridad

### Arquitectura de Seguridad Crítica

**ALERTA DE DISEÑO:** El firewall OPNsense está implementado como VM 102 dentro del mismo servidor Proxmox que protege, creando una dependencia circular crítica.

#### Implicaciones de Seguridad

1. **Single Point of Failure:** Si el host Proxmox falla, se pierde tanto el firewall como todos los servicios
2. **Bootstrapping Problem:** El firewall depende del hypervisor para funcionar
3. **Bypass Potential:** Tráfico interno de VMs podría evitar el firewall
4. **Management Access:** Administración de Proxmox requiere acceso que bypasea OPNsense

### Configuración de Acceso

#### Usuario API OPNsense
- **Usuario:** api-readonly
- **Scope:** user  
- **Privilegios:** Limitados a diagnósticos, logs, firewall, interfaces, VLANs
- **API Key:** Configurada y funcional

#### Usuario API Proxmox  
- **Token:** readonly@pve!apitoken
- **Acceso:** Funcional para consulta de VMs y LXC
- **Scope:** Limitado a operaciones de lectura

---

## Conectividad y Rendimiento de Red

### Análisis de Tráfico (Últimos datos API)

| VM | Tráfico IN (bytes) | Tráfico OUT (bytes) | Ratio IN/OUT |
|----|-------------------|---------------------|--------------|
| VM 100 (IsVerceo) | 128,474,295 | 288,159,023 | 1:2.24 |
| VM 102 (OPNsense) | 1,104,400,816 | 1,001,923,022 | 1.1:1 |
| VM 105 (aws-vm) | 90,169,845 | 11,540,043 | 7.8:1 |
| VM 109 (observability) | 294,902,261 | 82,680,791 | 3.6:1 |
| VM 200 (dev-workspace) | 47,207,473 | 1,651,150 | 28.6:1 |

#### Observaciones de Tráfico

1. **OPNsense como hub:** Mayor volumen de tráfico (>1GB cada dirección)
2. **aws-vm:** Patrón de descarga intensiva (ratio 7.8:1)
3. **dev-workspace:** Patrón típico de cliente (ratio 28.6:1)
4. **observability-vm:** Recolección activa de datos (ratio 3.6:1)

---

## Configuración DHCP y DNS

### Servicio Dnsmasq

| Parámetro | Configuración |
|-----------|---------------|
| Puerto | 53053 |
| Interfaces | lan |
| Autoridad DHCP | Deshabilitada |
| DNS Forwarding | Habilitado |
| Cache DNS | Habilitado |
| DHCP Logging | Deshabilitado |

### Rango DHCP Configurado

| Red | Rango Inicio | Rango Final | Máscara | Pool |
|-----|--------------|-------------|---------|------|
| LAN | 10.10.1.41 | 10.10.1.245 | /24 | 205 IPs disponibles |

---

## Certificados y Criptografía

### Certificado Web GUI OPNsense

| Campo | Valor |
|-------|-------|
| Subject | O=OPNsense self-signed web certificate |
| Issuer | CN=OPNsense.internal |
| Algoritmo | RSA 2048 bits |
| Hash | SHA256 |
| Validez | 2 años |
| Uso | TLS para Web GUI |

### Certificado Proxmox

| Campo | Valor |
|-------|-------|
| Subject | CN=homelab.example.com |
| Issuer | CN=Proxmox Virtual Environment |
| Validez | 2026-2028 |
| Propósito | API y Web GUI de Proxmox |

---

## Recomendaciones Técnicas

### Críticas (Acción Inmediata)

1. **Separación del Firewall**
   - Migrar OPNsense a hardware físico dedicado
   - Implementar firewall perimetral externo al entorno Proxmox
   - Crear DMZ para servicios públicos

2. **Backup y Recuperación**
   - Implementar backup externo de configuraciones OPNsense
   - Configurar replicación de VMs críticas
   - Documentar procedimientos de recuperación ante desastres

3. **Monitoreo de Recursos**
   - VM 100 (IsVerceo) usa solo 20% de RAM asignada - ajustar asignación
   - VMs 107-108 (k3s workers) están balanceadas correctamente
   - Considerar consolidación de VMs subutilizadas

### Mejoras de Mediano Plazo

1. **Alta Disponibilidad**
   - Implementar segundo nodo Proxmox para cluster HA
   - Configurar almacenamiento compartido (NFS/iSCSI)
   - Balanceador de carga para servicios críticos

2. **Segmentación Avanzada**
   - Implementar micro-segmentación con reglas inter-VLAN específicas
   - Configurar IDS/IPS en OPNsense
   - Implementar logging centralizado de seguridad

3. **Automatización**
   - Infrastructure as Code con Terraform/Ansible
   - CI/CD pipelines para gestión de configuración
   - Monitoreo proactivo con alertas automáticas

### Optimizaciones de Rendimiento

1. **Asignación de Recursos**
   - Reducir RAM de VMs sobredimensionadas
   - Balancear cargas CPU entre VMs
   - Implementar almacenamiento SSD para VMs críticas

2. **Red**
   - Configurar bonding en interfaces físicas
   - Optimizar MTU para VLANs específicas
   - Implementar QoS por VLAN

---

## Anexos

### A. Comandos de Verificación

#### OPNsense (API)
```bash
# Obtener configuración completa
curl -k -u "API_KEY:API_SECRET" http://127.0.0.1:8080/api/core/backup/download/this

# Verificar interfaces
curl -k -u "API_KEY:API_SECRET" http://127.0.0.1:8080/api/interfaces/overview

# Estado del firewall
curl -k -u "API_KEY:API_SECRET" http://127.0.0.1:8080/api/firewall/filter/searchRule
```

#### Proxmox (API)
```bash
# Listar VMs
curl -k -H "Authorization: PVEAPIToken=TOKEN" https://192.0.2.10:8006/api2/json/nodes/proxmox-host/qemu

# Listar LXC
curl -k -H "Authorization: PVEAPIToken=TOKEN" https://192.0.2.10:8006/api2/json/nodes/proxmox-host/lxc

# Estado del cluster
curl -k -H "Authorization: PVEAPIToken=TOKEN" https://192.0.2.10:8006/api2/json/cluster/status
```

### B. Topología de Puertos

| Servicio | Puerto | Protocolo | Acceso |
|----------|--------|-----------|---------|
| Proxmox Web | 8006 | HTTPS | 192.0.2.10 |
| OPNsense Web | 80/443 | HTTP/HTTPS | 10.10.1.1 |
| SSH Proxmox | 22 | SSH | 192.0.2.10 |
| Dnsmasq | 53053 | DNS | Interno |

### C. Archivos de Configuración

**Ubicaciones Críticas:**
- Configuración OPNsense: Backup XML generado vía API
- Configuración Proxmox: `/etc/pve/` (cluster filesystem)
- Certificados: Almacenados en configuraciones respectivas

---

**Fin del Manual Técnico de Infraestructura**

*Este documento ha sido generado mediante extracción de datos reales vía API. Se recomienda actualizarlo tras cualquier cambio significativo en la infraestructura.*

**Próxima Revisión:** Trimestral o ante cambios críticos  
**Contacto Técnico:** Administrador del entorno homelab