import { Icon } from "@iconify/react";

// Composant individuel de Card
function Card({ logo, techName }) {
  return (
    <div
      style={{
        margin: "10px",
        boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
        textAlign: "center",
        minWidth: 120,
      }}
    >
      <Icon icon={logo} style={{ fontSize: "100px" }} />
      <div style={{ padding: "2px 16px" }}>
        <h4>
          <b>{techName}</b>
        </h4>
      </div>
    </div>
  );
}

// Composant de liste de Card
function TechStack() {
  const majors = [
    // Coeur de métier
    { name: "Python", logo: "skill-icons:python-light" },
    { name: "Linux", logo: "skill-icons:linux-light" },
    { name: "Docker", logo: "skill-icons:docker" },
    { name: "Git", logo: "skill-icons:git" },
    { name: "ROS", logo: "skill-icons:ros-light" },
    { name: "Kubernetes", logo: "skill-icons:kubernetes" },
    { name: "GitHub", logo: "skill-icons:github-light" },
    { name: "GitHub Actions", logo: "skill-icons:githubactions-light" },
    { name: "Ansible", logo: "skill-icons:ansible" },
    { name: "Grafana", logo: "skill-icons:grafana-light" },
    { name: "VS Code", logo: "skill-icons:vscode-light" },
    { name: "Oh My Zsh", logo: "devicon:ohmyzsh" },
  ];
  const minors = [
    { name: "Prometheus", logo: "skill-icons:prometheus" },
    { name: "Nginx", logo: "skill-icons:nginx" },
    { name: "FastAPI", logo: "skill-icons:fastapi" },
    { name: "C", logo: "skill-icons:c" },
    { name: "C++", logo: "skill-icons:cpp" },
    { name: "React", logo: "skill-icons:react-light" },
    { name: "TypeScript", logo: "skill-icons:typescript" },
  ];

  return (
    <div>
      <h3 style={{ textAlign: "center", marginBottom: 0 }}>Au quotidien</h3>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          marginBottom: 32,
        }}
      >
        {majors.map((tech, index) => (
          <Card key={index} logo={tech.logo} techName={tech.name} />
        ))}
      </div>
      <hr
        style={{
          maxWidth: 400,
          margin: "32px auto",
          border: 0,
          borderTop: "2px dashed #bdbdbd",
        }}
      />
      <h4
        style={{
          textAlign: "center",
          marginTop: 0,
        }}
      >
        Sur mon temps libre / Dans le passé
      </h4>
      <div
        style={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}
      >
        {minors.map((tech, index) => (
          <Card key={index} logo={tech.logo} techName={tech.name} />
        ))}
      </div>
    </div>
  );
}

export default TechStack;
