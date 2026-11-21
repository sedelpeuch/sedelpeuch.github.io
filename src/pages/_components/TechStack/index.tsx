import { Icon } from "@iconify/react";
import styles from "./styles.module.css";

export const majors = [
  { name: "Python", logo: "skill-icons:python-light" },
  { name: "ROS 2", logo: "skill-icons:ros-light" },
  { name: "Docker", logo: "skill-icons:docker" },
  { name: "Kubernetes", logo: "skill-icons:kubernetes" },
  { name: "Terraform", logo: "skill-icons:terraform-light" },
  { name: "AWS", logo: "skill-icons:aws-light" },
  { name: "GitHub Actions", logo: "skill-icons:githubactions-light" },
  { name: "Prometheus", logo: "skill-icons:prometheus" },
];
export const minors = [
  { name: "Ansible", logo: "skill-icons:ansible" },
  { name: "Helm", logo: "devicon:helm" },
  { name: "Traefik", logo: "devicon:traefikproxy" },
  { name: "Grafana", logo: "skill-icons:grafana-light" },
  { name: "Loki", logo: "devicon:grafanaloki" },
  { name: "OpenTelemetry", logo: "logos:opentelemetry-icon" },
  { name: "PostgreSQL", logo: "skill-icons:postgresql-light" },
  { name: "Scaleway", logo: "devicon:scaleway" },
  { name: "Authentik", logo: "selfhst:authentik" },
  { name: "Tailscale", logo: "selfhst:tailscale-light" },
];

// Majeures en tuiles (mêmes que l'accueil), mineures en pastilles compactes.
function TechStack(): JSX.Element {
  return (
    <div className={styles.stack}>
      <h3 className={styles.groupTitle}>Majeures</h3>
      <ul className={styles.majors}>
        {majors.map((tech) => (
          <li key={tech.name} className={styles.major}>
            <Icon
              icon={tech.logo}
              className={styles.majorIcon}
              aria-hidden="true"
            />
            <span>{tech.name}</span>
          </li>
        ))}
      </ul>
      <h3 className={styles.groupTitle}>Mineures</h3>
      <ul className={styles.minors}>
        {minors.map((tech) => (
          <li key={tech.name} className={styles.minor}>
            <Icon
              icon={tech.logo}
              className={styles.minorIcon}
              aria-hidden="true"
            />
            {tech.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TechStack;
