---
title: Dashboard d'analyse corporelle
---

<img src="/img/project/body_analysis.png" alt="Aperçu dashboard body_analysis" style={{maxWidth: '400px', margin: '2rem auto', display: 'block'}} />

<div className="project-meta-grid">
  <div className="project-meta-item">📅 Depuis 2023</div>
  <div className="project-meta-item">📖 Pipeline ETL, Data Visualization, Quantified Self</div>
  <div className="project-meta-item">🔧 Python, Streamlit, Docker, DevOps</div>
</div>

## Contexte & Motivation

Application de suivi personnel pour automatiser la collecte, le traitement et la visualisation de données de santé issues de Samsung Health. Le projet répond à un besoin authentique : **transformer des données brutes (poids, calories, activities) en insights visuels et mesurables**, tout en maîtrisant la pipeline complète de l'ingestion à la production.

Bénéfices architecturaux :
- **Propriété des données** : stockage local, aucun cloud tiers
- **Reproducibilité** : pipeline versionnée et containerisée
- **Scalabilité** : patterns réutilisables pour d'autres domaines data

---

## 🏗️ **Architecture Technique**

### **Stack Technologique**

| Couche | Composant | Version | Rôle |
|--------|-----------|---------|------|
| **Backend Data** | Python | 3.11+ | Traitement, calculs, ETL |
| **Framework Web** | Streamlit | 1.38.0 | Interface interactive multi-pages |
| **Manipulation Données** | Pandas | 2.2.3 | Opérations vectorisées, time-series |
| **Visualisation** | Altair | 5.3.0 | Graphiques déclaratifs + interactifs |
| **Traitement Images** | Pillow | 11.0.0 | Resizing, rotation, blur (confidentialité) |
| **Calculs Scientifiques** | SciPy | 1.16.3 | Stats, détection de patterns |
| **Gestion Dépendances** | Poetry + uv | 1.8.3 | Isolation d'env et perf optimisée |
| **Containerisation** | Docker | - | Reproducibilité cross-platform |
| **Orchestration** | Docker Compose | - | Multi-services (data, app) |
| **CI/CD** | GitHub Actions | - | Build/Push images automatisé |
| **Code Quality** | Pre-commit hooks | 4.5.0 | Black, linting, validation |

### **Pipeline ETL**

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ INGESTION (data_ingestion.py)                                               │
├─────────────────────────────────────────────────────────────────────────────┤
│ Input  : Samsung Health CSV Export                                          │
│   ├─ Weight: date, weight, body_fat%, skeletal_muscle, fat_free_mass        │
│   ├─ Food:   date, meal_type, name, amount, unit, calories                  │
│   └─ Exercise: date, type, duration, distance, calories, heart_rate         │
│                                                                             │
│ Processing:                                                                 │
│   ├─ Robust date parsing (YYYY-MM-DD HH:MM:SS)                              │
│   ├─ Calendar validation (mois 1-12, jours valides)                         │
│   ├─ Numeric extraction via regex + safe type coercion                      │
│   └─ Chronological sorting                                                  │
│                                                                             │
│ Output : list[dict] + daily_calories aggregation                            │
└─────────────────────────────────────────────────────────────────────────────┘
                                     ↓
┌─────────────────────────────────────────────────────────────────────────────┐
│ STRUCTURATION (phases.py)                                                   │
├─────────────────────────────────────────────────────────────────────────────┤
│ Input  : phases.json (bulk/cut/maintain definitions)                        │
│                                                                             │
│ Processing:                                                                 │
│   ├─ Load @dataclass Phase(name, type, start, end, objectives)              │
│   ├─ Pandas vectorized time-series operations                               │
│   ├─ Calculate Δ metrics per phase:                                         │
│   │   ├─ Weight: Δ absolute, Δ %, monthly_rate (kg/month)                   │
│   │   ├─ Body Fat: Δ %, progression                                         │
│   │   ├─ Muscle: Δ kg, efficiency ratio                                     │
│   │   └─ Duration: days elapsed, estimated remaining                        │
│   └─ Phase summary with KPIs                                                │
│                                                                             │
│ Output : {phase_metrics, progression_data, objectives_tracking}             │
└─────────────────────────────────────────────────────────────────────────────┘
                                     ↓
┌─────────────────────────────────────────────────────────────────────────────┐
│ ENRICHISSEMENT (photos.py + sports_utils.py)                                │
├─────────────────────────────────────────────────────────────────────────────┤
│ Photos Pipeline:                                                            │
│   ├─ Auto-rotation detection (landscape → portrait)                         │
│   ├─ Gaussian blur (r=80) for confidentiality                               │
│   ├─ Smart resize (aspect ratio preserved, LANCZOS quality)                 │
│   └─ Monthly comparisons (before/after pairs)                               │
│                                                                             │
│ Sports Pipeline:                                                            │
│   ├─ Type mapping (Samsung constants → human readable)                      │
│   ├─ Auto-detect ("Musculation" via reps field)                             │
│   ├─ Heatmap generation (weeks × days aggregation)                          │
│   ├─ Metrics: FCM, calories, distance, SWOLF score (natation)               │
│   └─ Domain enums: SPORTS_MAP, SPORT_EMOJI, CSS_STYLES                      │
│                                                                             │
│ Output : enriched_metadata + visual_assets                                  │
└─────────────────────────────────────────────────────────────────────────────┘
                                     ↓
┌─────────────────────────────────────────────────────────────────────────────┐
│ VISUALISATION (dashboard.py + pages/)                                       │
├─────────────────────────────────────────────────────────────────────────────┤
│ Streamlit Multi-page Application:                                           │
│   ├─ Dashboard:  Phase timeline + weight/calories evolution                 │
│   ├─ Phases:    Drill-down + before/after photos per phase                  │
│   ├─ Photos:    Gallery by tag with monthly comparisons                     │
│   ├─ Objectifs:  Progress bars, badges, gap analysis                        │
│   ├─ Sports:     Heatmap calendar, stats, trends                            │
│   └─ Import:    ZIP extraction, tagging, auto-organization                  │
│                                                                             │
│ Interactions:                                                               │
│   ├─ st.session_state for state persistence                                 │
│   ├─ Altair charts with filtering + drill-down                              │
│   ├─ CSS inline styling (timeline, cards, gradients)                        │
│   └─ Responsive design with custom config                                   │
│                                                                             │
│ Output : Real-time interactive dashboard (port 8501)                        │
└─────────────────────────────────────────────────────────────────────────────┘
```



**Patterns d'Architecture** :
- ✅ **Separation of Concerns** : data_ingestion vs phases vs UI
- ✅ **Immutability** : dataclasses pour Phase, DataPaths
- ✅ **Type Hints** : PEP 484 (validation mypy possible)
- ✅ **Error Handling** : parse robuste, defaults sûrs
- ✅ **Session Management** : st.session_state for state persistence

---

## 🔄 **Modules Clés & Implémentation**

### **1. `data_ingestion.py` — Robustesse & Parsing**

**Responsabilité** : Parser et valider les données Samsung Health brutes

```python
# Parsing robuste avec validation calendrier
def _parse_datetime_str(s: str) -> datetime | None:
    # Validation avant construction (mois 1-12, jours valides)
    # Gère formats variables : YYYY-MM-DD ou YYYY-MM-DD HH:MM:SS
    pass

# Safe type coercion
def _to_float(x) -> float:  # Retourne 0.0 si parsing échoue
def _to_int(x) -> int:      # Retourne 0 si parsing échoue
```

**Défi résolu** : Les exports Samsung Health sont mal formattés → solution : regex + validation manuelle avant datetime construction → confiance en données entrantes

---

### **2. `phases.py` — Vectorisation Pandas**

**Responsabilité** : Calcul de métriques par phase (bulk/cut/maintain)

```python
@dataclass
class Phase:
    name: str
    type: str  # "bulk", "cut", "maintain", "free"
    start: pd.Timestamp
    end: pd.Timestamp
    objectives: dict  # weight_target, body_fat_target, calories_target
```

**Métriques calculées** par phase :
- **Poids** : Δ absolu, Δ %, monthly_rate (kg/mois)
- **Composition** : Δ masse grasse, Δ masse musculaire
- **Calories** : moyenne quotidienne, variance
- **Durée** : jours écoulés, jours restants estimés

**Optimisation** : Pandas vectorized operations vs boucles → 100x+ rapide

---

### **3. `photos.py` — Data Pipeline Image**

**Responsabilité** : Charger, transformer, organiser photos

**Format de stockage** :
```
data/photos/
  ├── 2024-01-15/
  │   ├── face.jpg
  │   ├── profil.jpg
  │   ├── dos.jpg
  │   └── bras.jpg
  └── 2024-02-20/
      └── ...
```

**Transformations** :
- **Auto-rotation** : détecte paysage (width > height) → rotate 90°
- **Blur confidentiel** : `GaussianBlur(radius=80)` pour vie privée
- **Redimensionnement** : target_height avec aspect ratio préservé (LANCZOS), économise bandwidth
- **Comparaison** : génère paires (current, previous) pour avant/après

---

### **4. `sports_utils.py` — Domain Logic + UI**

**Type Mapping** (Samsung Health constants → Human readable) :
```python
SPORTS_MAP = {
    1002: "Course à pied",
    11007: "Vélo",
    14001: "Natation",
    15004: "Rameur",
    # ...
}
```

**Détection Musculation** :
```python
def detect_sport(row):
    if "reps" in row.subset_data:
        return "Musculation"
    return SPORTS_MAP.get(row.exercise_type, "Autre")
```

**Composants UI** :
- `render_metric_card()` : HTML stylisé avec gradients
- `create_heatmap_chart()` : Altair heatmap (semaines × jours)
- `create_line_chart()` : Time-series avec encoder interactif

---

## 🚀 **DevOps & Déploiement**

### **Containerisation Docker**

```dockerfile
FROM python:3.11-slim

# Stage 1 : Install poetry + dependencies
RUN pip install poetry

COPY pyproject.toml poetry.lock ./
RUN poetry install --no-dev

# Stage 2 : Runtime
COPY body_analysis ./body_analysis
EXPOSE 8501

CMD ["streamlit", "run", "body_analysis/dashboard.py"]
```

**Optimisations** :
- ✅ Multi-stage build (slim pour runtime)
- ✅ Couche poetry en cache séparé
- ✅ Port 8501 explicite

### **Docker Compose**

```yaml
services:
  body-analysis:
    build: .
    ports:
      - "8501:8501"
    volumes:
      - ./data:/app/data  # Persistance données
    environment:
      - TZ=Europe/Paris
      - ENV=production
    restart: unless-stopped
    deploy:
      resources:
        limits:
          memory: 1G
```

**Caractéristiques** :
- 📌 Volumes persistants pour données santé privées
- 🔄 Restart policy (résilience)
- 🎛️ Resource limits (predictable behavior)
- 🌍 TZ pour coherence timestamps

### **CI/CD Pipeline (GitHub Actions)**

Trigger : `push` sur `master`
- ✅ Build image Docker
- ✅ Test image (lint pre-commit)
- ✅ Push vers GitHub Container Registry (GHCR)
- ✅ Accessible pour déploiement suivi

---

## 📊 **Features Avancées**

### **Dashboard Principal (`dashboard.py`)**
- 📈 **Timeline CSS personnalisée** des phases avec couleurs
- 📊 **Graphiques Altair interactifs** :
  - Évolution du poids avec phases en arrière-plan
  - Calories quotidiennes + trend
  - Composition corporelle (3D effect avec stratification)
- 🔘 **Filtres de periodo** : 1m, 3m, 6m, 1y, all

### **Page Phases (`01_Phases.py`)**
- 🗂️ Sélection phase via grille CSS (3 colonnes)
- 📏 Synthèse : Δ poids, Δ BF%, Δ musculaire, durée
- 🖼️ Photos avant/après avec floutage confidentiel
- 📈 Graphiques phase-spécifiques

### **Page Sports (`04_Sports.py`)**
**Heatmap calendrier** : semaines × jours (colored by séances/week)
**Statistiques** :
- Durée totale, calories, distance, FCM
- SWOLF score natation (strokes per 100m)
- Coût énergétique
**Évolution** : Altair + drill-down par sport

### **Page Import (`05_Import.py`)**
**Workflow** :
1. Upload ZIP Samsung Health
2. Auto-extraction CSV/JSON
3. Cleanup (garde fichiers récents uniquement)
4. Photo tagging (face, profil, dos, bras, epaule)
5. Organisation automatique dans `data/photos/YYYY-MM-DD/tag.ext`

---

## 🛡️ **Sécurité & Confidentialité**

| Mesure | Implémentation |
|--------|-----------------|
| **Données locales** | Zéro cloud tiers, storage local |
| **Photos privées** | Blur GaussianBlur(r=80) en UI pour partage |
| **Env variables** | Secrets en ENV vs hardcoded |
| **Docker volumes** | Données non perdues au shutdown |
| **Pre-commit hooks** | Black, linting, validation TOML |

---

## 📈 **Résultats Mesurables et Impact**

### **Automatisation & Productivité**
- **100% automatisé** : Import ZIP → Parse → Visualisation (5 min vs 2h manuel)
- **Consistency** : Format données standarisé via parsing robuste
- **Auditable** : Commit history de chaque changement de données

### **Insights Data**
- **3+ ans de données** : Suivi corporel continu avec 15+ métriques
- **Correlation sports-poids** : Visualisation SWOLF natation vs efficacité
- **Phase objectives tracking** : Progression visible (ex: -5% BF en 3 months)

### **Code Quality**
- **Type hints** : 100% du code annoté (mypy compatible)
- **Pre-commit** : Zero broken states committed
- **Modular** : Réutilisable pour d'autres domains (nutrition, sleep, etc)

---

## 🎓 **Concepts DevOps/Data Appliqués**

Cet projet applique des patterns enterprise à un problème personnel :

| Concept | Application |
|---------|------------|
| **ETL Pipeline** | Data ingestion → transformation → storage → BI |
| **Data Validation** | Robust parsing, calendar checks, type safety |
| **Containerization** | Docker for reproducibility across envs |
| **IaC** | Docker Compose as infrastructure definition |
| **CI/CD** | GitHub Actions for image building |
| **Time-Series Analysis** | Pandas + Altair for temporal data viz |
| **Image Processing** | PIL transformations for data privacy |
| **Responsive UI** | Streamlit multi-pages + CSS customization |
| **State Management** | Session state for interactive dashboards |

---

## 🔗 **Concepts Théoriques & Articles Blog**

Articles appliquant concepts de ce projet :

- 🐍 **[Python : uv](/blog/09-scripting/2025-12-19-uv-python)** — Optimisation dépendances Python utilisée ici
- 📦 **[Poetry](/blog/09-scripting/2025-06-06-poetry-python-dependency)** — Gestion deps avec lock file
- 🐳 **Docker Best Practices** — Multi-stage builds, volumes, env vars
- 📊 **Data Pipelines ETL** — Patterns appliqués à Samsung Health

---

## 📚 **Ressources & Liens**

| Ressource | Lien |
|-----------|------|
| **Repository** | [github.com/sedelpeuch/body_analysis](https://github.com/sedelpeuch/body_analysis) |
| **Streamlit Setup** | `.streamlit/config.toml` (port, theme) |
| **Data Structure** | `data/phases.json` (objectifs par phase) |
| **Local Deployment** | `docker-compose up` |

---

## 🚧 **Évolutions Futures**

**Pistes d'amélioration** :
- 🔔 **Notifications** : Alertes objectifs atteints via webhook
- 📱 **Mobile-first** : Responsive design amélioré
- 🔐 **Auth** : Multi-user avec authentification
- 📤 **Export** : PDF reports, calendar integration, iCal
- 🤖 **ML** : Prediction tendances, anomaly detection
- 🔗 **Integrations** : Apple Health, Fitbit, Garmin API
- 📈 **Advanced BI** : Model fitting (linear regression trends)

---

## 📌 **Points Clés pour Portfolio**

✅ **Full-stack Python** : Backend data + frontend web  
✅ **Production-ready** : Docker, CI/CD, error handling  
✅ **Scalable architecture** : Modular, type-safe, testable  
✅ **Data engineering** : ETL pipeline, time-series, aggregations  
✅ **DevOps** : Containerization, IaC, automation  
✅ **Real-world problem** : Automation du processus personnel  
✅ **Long-term commitment** : 3+ ans de données, itération continue
