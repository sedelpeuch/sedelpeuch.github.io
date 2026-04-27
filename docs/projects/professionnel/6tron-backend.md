---
title: 6TRON – Plateforme de documentation IoT industrielle
---

<img src="https://6tron.io/img/homepage/Logo-6TRON-white.png" alt="Logo 6TRON" style={{maxWidth: '300px', margin: '2rem auto', display: 'block'}} />

<div className="project-meta-grid">
  <div className="project-meta-item">📅 Période : 2022-2023 (ongoing)</div>
  <div className="project-meta-item">📖 Site officiel, documentation, blog technique</div>
  <div className="project-meta-item">🔧 React/Docusaurus, TypeScript, GitHub Actions, CI/CD</div>
</div>

## Contexte & Objectif

Site web officiel de **6TRON**, une plateforme IoT industrielle conçue par le CATIE pour l'Internet des Objets Industriel (IIoT). Mission : **centraliser la documentation technique, les ressources logicielles (EML, Mbed OS, Zephyr), les cas d'usage, et l'écosystème d'innovation** dans une architecture de contenu modulaire, versionnée et automatisée.

**Enjeux** :
- 📚 Gérer documentation pour **3 écosystèmes logiciels** différents
- 🔄 Déploiement continu et prédictible (GitHub Pages)
- ✅ Qualité et validation automatiques du contenu
- 🌐 Support multi-langues (i18n)
- 🧩 Architecture extensible pour contributeurs

---

## 🏗️ **Architecture Technique**

### **Stack Technologique**

| Couche | Composant | Rôle | Notes |
|--------|-----------|------|-------|
| **Framework** | Docusaurus v2 | Static site generation + React customization |  |
| **Langage Frontend** | TypeScript/React | Composants personnalisés | BuyForm, ContactForm, DocCard, NotFound |
| **Markup** | Markdown | Documentation + Blog | Versioning Git natif |
| **Style** | CSS + Prettier | Formatage, linting | Cohérence cross-files |
| **Déploiement** | GitHub Pages | Hosting statique | via GitHub Actions |
| **CI/CD** | GitHub Actions | Validation + Build + Deploy | 5 workflows automatisés |
| **Qualité Code** | Pre-commit hooks | Linting local | Prettier, Markdownlint |
| **Validation** | checker.py | Checks métadonnées | Lien Dropbox, ZEST metadata |
| **Internationalisation** | Docusaurus i18n | Multi-langue | Support français inclus |
| **Dev Environment** | Dev Container | Cohérence dev | Docker standardisé |

### **Architecture de Contenu (Docusaurus)**

Le site est structuré en **5 sections indépendantes**, chacune avec sa propre navigation (sidebar) et configuration. Cette modularité permet de gérer des domaines métier distincts (EML, Mbed OS, Zephyr) sans duplication ni confusion.

#### **Configuration Navigation**

La navigation est construite autour de **4 fichiers JSON** :
- **navbar.json** : Barre de navigation principale
- **sidebars.json** : Documentation générale
- **sidebarsLogicielles.json** : EML, Mbed OS, Zephyr (même fichier)
- **sidebarsWhatIs.json** et **sidebarsSupport.json** : Sections spécialisées

### **Composants React Personnalisés (src/)**

Architecture modulaire de **10 composants React** orchestrant la plateforme :

| Composant | Responsabilité | Patterns |
|-----------|-----------------|----------|
| **ZestMetadata** | Centralise metadata 78 modules ZEST | Metadata-driven design |
| **ZestPage** | Template orchestrateur (pages modules) | Compound Components |
| **BuyForm** | Panier d'achat + commande | React Context, Formspree |
| **ZestResourcesStatus** | Dashboard validation ressources | Dynamic table rendering |
| **HomepageFeatures** | Landing page multi-sections | Styled components |
| **ContactForm** | Support client | Form validation |
| **FileChecker** | Validation fichiers HTTP | useEffect + useState |
| **DocCard, NotFound, etc.** | Customisations Docusaurus | Theme overrides |

**Architecture principale : Metadata-Driven Design**

```
metadata.json (78 modules)
        ↓
 ZestMetadata component
        ↓
├→ ZestPage (génère 78 pages module)
├→ BuyForm (panier e-commerce)
└→ ZestResourcesStatus (dashboard admin)
```

**Key Patterns:**
- **React Context API** pour gestion du panier d'achat
- **CSS Modules** pour scoping des styles
- **TypeScript** pour type safety
- **BrowserOnly** pour éviter hydration mismatch
- **Compound Components** pour réutilisabilité

**Stack:** React 18.2, Docusaurus 3.8, @formspree/react

---

## 🔄 **CI/CD & Qualité (Zero-Downtime Deployment)**

L'entièreté du déploiement est automatisée via **GitHub Actions** : 5 workflows décorélés qui valident → construisent → déploient sur 6tron.io en ~30 secondes.

**Pipeline d'assurance qualité (pré-commit → PR checks → build → deploy) :**

1. **Pré-commit hooks** (local)
   - Prettier (formatage), Markdownlint (structure), forbidden patterns, YAML validation
   - Bloque commits cassés avant le push

2. **PR Validation** (GitHub Actions)
   - `check-dropbox-links.yml` - Vérifie ressources externes
   - `check-zest-metadata.yml` - Valide format ZEST (metadata critique)
   - `pr_review.yml` - Suggestions automatiques

3. **Build & Deploy**
   - Compilation statique Docusaurus → HTML/CSS/JS bundles
   - Push automatique vers `gh-pages` → Site live en 30 secondes
   - Zéro downtime (site ancien accessible pendant build)

4. **Security Monitoring**
   - Dependabot scans npm dépendances 1x/semaine
   - Auto-PRs pour security updates
   - Environment parity via Dev Container (local == CI)

**Résultat:** Déploiement rapide, sûr, prédictible. Aucun "broken build" ne touche 6tron.io.

## 🎯 **Documentation des Modules ZEST**

**78 modules hardware** documentés automatiquement via un système **metadata-driven**. Une source de vérité (metadata.json) génère l'UI, la validation, et les ressources associées. Aucune redondance.

### **Le Flux Technique : Comment Les 78 Doc Sont Créées**

**1. Source de Vérité : metadata.json (11.9 KB)**

Un seul fichier JSON liste tous les 78 modules avec : slug, versions (v1.0.0 → v3.1.0), support logiciel (Zephyr, Mbed OS), description.

**2. ZestMetadata Component (171 lignes)**

Extrait les données de metadata.json, génère automatiquement les URLs des ressources associées (image, schematic, BOM, datasheet, etc.), valide que chaque ressource existe via FileChecker. Une seule source, toutes les pages lisent from this.

**3. ZestPage Component (76 lignes)**

Template réutilisable. Reçoit des enfants Markdown (`<header>`, `<features>`, `<software>`, `<techspec>`), les parse, et rend une page standardisée avec description, matrice caractéristiques, tabs logiciels, ressources téléchargeables, bouton "Order Now".

**4. 78 Fichiers Markdown Identiques**

Chaque module `zest_battery_lipo_1_0_0.md` c'est **le même template** : importe ZestPage, wraps contenu technique dans les balises enfants. Quand le composant ZestPage change → 78 pages mises à jour automatiquement.

**5. ZestResourcesStatus Dashboard (148 lignes)**

Utilise metadata pour générer tableau 78×8 : vérifie image présente? schematic? BOM? datasheet? etc. Statut visuel (✓/❌/⚠️). Identifie ressources manquantes immédiatement.

**6. BuyForm E-Commerce (258 lignes)**

Récupère metadata via ZestMetadata, affiche grille de produits (78 modules), gère panier via Context API, envoie commande via Formspree.

---

### **Pourquoi C'est Puissant**

- **Pas de duplication** : 1 metadata.json pour 78 pages. Modification metadata → 78 pages recalculées.
- **Validation auto** : 624 fichiers ressources (8 par module) vérifiés à chaque commit via CI/CD.
- **Scalable** : Ajouter module = 1 entry JSON + 1 fichier Markdown = vivant immédiatement.
- **DRY** : Changer ZestPage → 78 pages impactées sans re-maintainer chaque fichier.
- **Type-safe** : TypeScript exports types depuis ZestMetadata.

C'est pas "une doc de 78 modules", c'est **un système de gestion hardware** où metadata drive présentation, validation, et e-commerce. Tout centrale, tout validé, rien dupliqué.
