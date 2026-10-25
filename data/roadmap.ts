// Roadmap DevOps (page /roadmap) : les onze domaines, détaillés en sous-sujets
// inspirés de roadmap.sh/devops.
//
// Un sous-sujet est « acquis » dès qu'un article du blog le couvre (référence
// `dossier/slug`, sans la date ni l'extension) ; son année est celle du premier
// article. `status` force un état sans article : « acquis » (avec `since`, pour
// les compétences antérieures au blog), « en cours » ou « à venir » (défaut).
export type TopicStatus = "acquis" | "en cours" | "à venir";

export type RoadmapTopic = {
  label: string;
  articles?: string[];
  status?: TopicStatus;
  since?: number;
};

export type RoadmapDomain = {
  number: string;
  label: string;
  icon: string;
  tag?: string;
  description: string;
  topics: RoadmapTopic[];
};

export const ROADMAP: RoadmapDomain[] = [
  {
    number: "01",
    label: "Concepts du développement logiciel",
    icon: "tabler:code",
    description: "Méthodes de travail et cycle de vie du logiciel, socle du parcours d'ingénieur.",
    topics: [
      { label: "Méthodes agiles et gestion de projet", status: "acquis", since: 2023 },
      { label: "Cycle de vie du logiciel et outils de build", status: "acquis", since: 2023 },
      { label: "Tests automatisés", status: "acquis", since: 2023, articles: ["09-scripting/pytest-testing"] },
    ],
  },
  {
    number: "02",
    label: "Réseau",
    icon: "tabler:topology-star-3",
    tag: "network",
    description: "Adressage, protocoles et intermédiaires entre le client et le service.",
    topics: [
      { label: "Adressage IP, ports et DNS", since: 2023, articles: ["02-network/kubernetes-acces-lan-coredns"] },
      {
        label: "Proxy, reverse proxy et équilibrage de charge",
        articles: ["02-network/proxy-vs-reverse-proxy", "02-network/nginx", "02-network/nginx-proxy-manager", "02-network/traefik"],
      },
      { label: "TLS et HTTPS", articles: ["02-network/ssl-tls"] },
      { label: "Pare-feu", status: "acquis", since: 2026 },
    ],
  },
  {
    number: "03",
    label: "Conteneurisation",
    icon: "tabler:box",
    tag: "containerization",
    description: "Empaqueter une application et ses dépendances dans une image portable.",
    topics: [
      { label: "Conteneurs et machines virtuelles", articles: ["03-containerization/difference-conteneurisation-virtualisation"] },
      {
        label: "Images et Dockerfile",
        articles: ["03-containerization/docker", "03-containerization/docker-containers", "03-containerization/docker-best-practices"],
      },
      { label: "Débogage de conteneurs", articles: ["03-containerization/debugging-docker-containers"] },
      { label: "Docker Compose", articles: ["06-orchestration/docker-compose"] },
      { label: "Volumes et sauvegarde", articles: ["03-containerization/docker-volume-backup"] },
      { label: "Registres d'images", articles: ["03-containerization/ghcr", "05-cloud/docker-ec2-ecr"] },
    ],
  },
  {
    number: "04",
    label: "CI/CD",
    icon: "tabler:git-merge",
    tag: "cicd",
    description: "Construire, tester et déployer automatiquement à chaque changement.",
    topics: [
      { label: "Workflows GitHub Actions", articles: ["04-ci-cd/github-actions", "04-ci-cd/workflow"] },
      {
        label: "Actions et workflows réutilisables",
        articles: ["04-ci-cd/action", "04-ci-cd/github-actions-architecture-reutilisable"],
      },
      { label: "Runners auto-hébergés", articles: ["04-ci-cd/self-host-runner", "04-ci-cd/github-arc"] },
      {
        label: "Déploiement continu",
        articles: ["04-ci-cd/github-actions-deploiement-compose", "04-ci-cd/pipeline-cicd-eks", "04-ci-cd/helm-tag-immuable"],
      },
      { label: "Mise à jour des dépendances", articles: ["04-ci-cd/github-actions-renovate"] },
      { label: "Tests d'intégration en pipeline", articles: ["04-ci-cd/github-actions-simulation-kubernetes"] },
      { label: "GitOps (Argo CD, Flux)" },
    ],
  },
  {
    number: "05",
    label: "Cloud",
    icon: "tabler:cloud",
    tag: "cloud",
    description: "Services managés d'un fournisseur cloud, du calcul au stockage.",
    topics: [
      { label: "Compte, IAM et EC2", articles: ["05-cloud/ec2"] },
      { label: "CLI et outillage", articles: ["05-cloud/aws-cli"] },
      { label: "Réseau privé (VPC)", articles: ["05-cloud/vpc"] },
      {
        label: "Stockage objet et bases managées",
        articles: ["05-cloud/aws-storage", "05-cloud/s3-garage", "05-cloud/garage-kubernetes-multi-noeuds"],
      },
      { label: "Serverless", articles: ["05-cloud/lambda"] },
      { label: "Conteneurs managés (ECR, EKS)", articles: ["05-cloud/docker-ec2-ecr", "05-cloud/eks"] },
      { label: "Supervision cloud", articles: ["05-cloud/cloudwatch-eks"] },
      { label: "Second fournisseur (Azure, GCP)" },
    ],
  },
  {
    number: "06",
    label: "Orchestration de conteneurs",
    icon: "tabler:hierarchy-3",
    tag: "orchestration",
    description: "Répartir et maintenir des conteneurs sur plusieurs machines.",
    topics: [
      { label: "Orchestrateurs légers (Swarm, Dokku)", articles: ["06-orchestration/docker-swarm", "06-orchestration/orchestration-dokku"] },
      {
        label: "Kubernetes : composants et kubectl",
        articles: ["06-orchestration/k8s-introduction", "06-orchestration/k8s-basic-components", "06-orchestration/kubectl-commandes-essentielles"],
      },
      { label: "Configuration et secrets", articles: ["06-orchestration/k8s-secrets-configmaps"] },
      { label: "Stockage persistant", articles: ["06-orchestration/k8s-storage", "06-orchestration/kubernetes-longhorn"] },
      {
        label: "Déploiements et haute disponibilité",
        articles: ["06-orchestration/kubernetes-rolling-update-ressources", "06-orchestration/kubernetes-haute-disponibilite-pdb"],
      },
      {
        label: "Exploitation du cluster",
        articles: [
          "06-orchestration/renouveler-certificats",
          "06-orchestration/kubernetes-sauvegarde-cronjob",
          "06-orchestration/kubernetes-gpu-nvidia",
        ],
      },
      { label: "Démarrage à la demande", articles: ["06-orchestration/traefik-sablier"] },
      { label: "Service mesh (Istio, Linkerd)" },
    ],
  },
  {
    number: "07",
    label: "Observabilité",
    icon: "tabler:activity-heartbeat",
    tag: "monitoring",
    description: "Mesurer, journaliser et alerter sur l'état des systèmes en production.",
    topics: [
      { label: "Métriques (Prometheus)", articles: ["07-monitoring/prometheus-introduction"] },
      {
        label: "Alerting",
        articles: ["07-monitoring/prometheus-alertmanager", "07-monitoring/prometheus-alertes-kubernetes"],
      },
      { label: "Logs (Loki, Alloy)", articles: ["07-monitoring/loki-logs-management", "07-monitoring/alloy"] },
      { label: "Dashboards (Grafana)", articles: ["07-monitoring/grafana-provisioning"] },
      { label: "Supervision de disponibilité", articles: ["07-monitoring/gatus"] },
      { label: "Fiabilité de l'hôte", articles: ["07-monitoring/linux-kdump-watchdog"] },
      { label: "Traces distribuées (OpenTelemetry)" },
    ],
  },
  {
    number: "08",
    label: "Infrastructure as Code",
    icon: "tabler:file-code",
    tag: "iac",
    description: "Décrire l'infrastructure dans du code versionné et reproductible.",
    topics: [
      {
        label: "Gestion de configuration (Ansible)",
        articles: ["08-iac/ansible-introduction", "08-iac/ansible-playbooks-avances", "08-iac/ansible-zsh-automation"],
      },
      {
        label: "Provisioning (Terraform)",
        articles: [
          "08-iac/terraform",
          "08-iac/terraform-data-sources",
          "08-iac/terraform-count-foreach-locals",
          "08-iac/terraform-depends-on-lifecycle",
        ],
      },
      { label: "Modules", articles: ["08-iac/terraform-modules"] },
      { label: "State distant", articles: ["08-iac/terraform-remote-state"] },
      { label: "Multi-environnements", articles: ["08-iac/terraform-multi-environnements"] },
    ],
  },
  {
    number: "09",
    label: "Langages de script",
    icon: "tabler:terminal-2",
    tag: "scripting",
    description: "Automatiser les tâches de build, de déploiement et d'exploitation.",
    topics: [
      { label: "Shell et ligne de commande", status: "acquis", since: 2023 },
      { label: "Python", since: 2023, articles: ["09-scripting/python-async-await"] },
      {
        label: "Dépendances et packaging",
        articles: ["09-scripting/poetry-python-dependency", "09-scripting/uv-python", "09-scripting/packaging-python"],
      },
      { label: "Qualité de code et tests", articles: ["09-scripting/ruff-linting-formatting", "09-scripting/pytest-testing"] },
      {
        label: "APIs web",
        articles: [
          "09-scripting/fastapi",
          "09-scripting/pydantic-validation-donnees",
          "09-scripting/graphql",
          "09-scripting/strawberry",
          "09-scripting/fastapi-crud-auth",
        ],
      },
      { label: "Bases de données", articles: ["09-scripting/sqlalchemy"] },
    ],
  },
  {
    number: "10",
    label: "Contrôle de version",
    icon: "tabler:git-branch",
    tag: "git",
    description: "Versionner, relire et partager le code comme l'infrastructure.",
    topics: [
      { label: "Branches, pull requests et revue de code", status: "acquis", since: 2023 },
      { label: "Plateformes GitHub et GitLab", status: "acquis", since: 2023 },
      { label: "Chiffrement de fichiers dans un dépôt", articles: ["08-iac/git-crypt"] },
    ],
  },
  {
    number: "11",
    label: "Sécurité",
    icon: "tabler:shield-lock",
    tag: "security",
    description: "Protéger les accès, les secrets et la chaîne de livraison.",
    topics: [
      {
        label: "Gestion des secrets",
        articles: ["08-iac/ansible-vault", "08-iac/git-crypt", "06-orchestration/k8s-secrets-configmaps"],
      },
      {
        label: "Authentification et SSO",
        articles: ["02-network/authelia-forward-auth", "02-network/authelia-oidc", "02-network/authentik-kubernetes"],
      },
      { label: "Coffres de secrets externes (Vault, SOPS)" },
      { label: "Analyse des images et des dépendances" },
      { label: "Contrôle d'accès Kubernetes (RBAC, NetworkPolicy)" },
    ],
  },
];
