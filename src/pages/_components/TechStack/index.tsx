import {Icon} from '@iconify/react';

// Composant individuel de Card
function Card({logo, techName}) {
    return (
        <div style={{margin: '10px', boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)', textAlign: 'center'}}>
            <Icon icon={logo} style={{fontSize: '100px'}}/>
            <div style={{padding: '2px 16px'}}>
                <h4><b>{techName}</b></h4>
            </div>
        </div>
    );
}

// Composant de liste de Card
function TechStack() {
    const techData = [
        {name: 'Python', logo: 'skill-icons:python-light'},
        {name: 'C++', logo: 'logos:c-plusplus'},
        {name: 'ROS', logo: 'skill-icons:ros-light'},
        {name: 'ROS2', logo: 'skill-icons:ros-light'},
        {name: 'VS Code', logo: 'skill-icons:vscode-light'},
        {name: 'Linux', logo: 'skill-icons:linux-light'},
        {name: 'Oh My Zsh', logo: 'devicon:ohmyzsh'},
        {name: 'Git', logo: 'skill-icons:git'},
        {name: 'GitHub', logo: 'skill-icons:github-light'},
        {name: 'Github Actions', logo: 'skill-icons:githubactions-light'},
        {name: 'Nginx', logo: 'skill-icons:nginx'},
        {name: 'Docker', logo: 'skill-icons:docker'},
        {name: 'Kubernetes', logo: 'skill-icons:kubernetes'},
    ];

    return (
        <div style={{display: 'flex', justifyContent: 'center', flexWrap: 'wrap'}}>
            {techData.map((tech, index) =>
                <Card key={index} logo={tech.logo} techName={tech.name}/>
            )}
        </div>
    );
}

export default TechStack;