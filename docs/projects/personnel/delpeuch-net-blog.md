---
title: Blog
---

<img src="/img/project/delpeuch.png" alt="Aperçu blog delpeuch.net" style={{maxWidth: '400px', margin: '2rem auto', display: 'block'}} />

<div className="project-meta-grid">
  <div className="project-meta-item">📅 Depuis 2024</div>
  <div className="project-meta-item">📖 Veille DevOps · Retours d'expérience</div>
  <div className="project-meta-item">🔧 Docusaurus · MDX · GitHub Copilot</div>
</div>

## Le contexte

Ingénieur en informatique spécialisé robotique au CATIE, j'ai décidé en 2024 de me spécialiser en DevOps. Le choix s'est accompagné d'un constat : la meilleure façon de savoir si on a vraiment compris quelque chose, c'est d'essayer de l'expliquer. Écrire un article force à structurer, à trouver les bonnes formulations, à identifier ce qu'on pensait comprendre mais qu'on ne comprenait pas vraiment. Le blog est né de ça — pas pour publier, mais pour apprendre.

Plus de 50 articles publiés depuis 2024, organisés le long d'une roadmap DevOps en 9 domaines : réseau, conteneurisation, CI/CD, cloud AWS, orchestration, observabilité, IaC Ansible, scripting Python, et Git.

## La roadmap comme fil directeur

Le point de départ est une roadmap DevOps personnelle, publiée chaque début d'année. Elle trace les domaines à explorer, les outils à maîtriser, les projets à réaliser. Ce n'est pas une liste de vœux — chaque entrée est liée à des articles ou des projets concrets produits dans l'année.

La roadmap 2024 posait les fondations : Docker, CI/CD, cloud, Kubernetes, monitoring, Ansible. La roadmap 2025 a approfondi Kubernetes, la stack Prometheus/Loki, et Ansible avec des cas pratiques réels (cluster GitHub ARC, déploiement Swarm). La roadmap 2026 se concentre sur AWS et Terraform. Avoir ces trois articles côte à côte permet de voir exactement comment les priorités ont évolué — ce qui est acquis, ce qui a glissé à l'année suivante, ce qui a été abandonné.

## La structure du blog

Les articles sont organisés par domaine technique dans la navbar, pas seulement par date. L'idée est de rendre le blog utilisable comme une base de référence : quand on revient sur un sujet six mois après, on veut retrouver l'article directement, pas chercher dans une liste chronologique.

Les tags sont définis dans un fichier `tags.yaml` versionné plutôt qu'inline dans chaque article. Ça standardise le référentiel et évite d'accumuler des variantes (`k8s`, `kubernetes`, `Kubernetes`...) au fil des publications.

Chaque article de blog est aussi lié aux projets qui lui correspondent. Les articles sur Poetry et Docker sont référencés depuis la page body_analysis. Les articles sur Kubernetes depuis la page GitHub ARC. Cette double entrée — par thème dans le blog, par usage dans les projets — est volontaire.

## Écrire avec des agents IA

Depuis 2024, GitHub Copilot est intégré dans la démarche de rédaction. Le processus typique : notes brutes prises pendant l'exploration d'un outil ou d'un concept, puis utilisation de Copilot pour structurer ces notes en article, générer des exemples de configuration, reformuler les passages trop denses. L'IA ne remplace pas le travail de compréhension — elle compresse le temps entre "j'ai compris" et "c'est lisible et structuré". Les articles où je ne maîtrisais pas vraiment le sujet le montrent immédiatement à la relecture : la structure tient, mais le fond sonne creux.

## Liens

- [Blog](/blog/)
- [DevOps Roadmap 2024](/blog/2024/01/01/devops-roadmap)
- [DevOps Roadmap 2025](/blog/2025/01/01/devops-roadmap-2025)
- [DevOps Roadmap 2026](/blog/2026/01/01/devops-roadmap-2026)
- [github.com/sedelpeuch/sedelpeuch.github.io](https://github.com/sedelpeuch/sedelpeuch.github.io)
