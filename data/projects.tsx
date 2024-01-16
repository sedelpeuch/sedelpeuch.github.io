export const projects: Project[] = [
    {
        title: 'Ronoco',
        description: 'ROS No Code',
        preview: '/img/project/ronoco.png',
        website: 'https://sedelpeuch.github.io/ronoco/',
        source: 'https://github.com/sedelpeuch/ronoco',
        tags: ['opensource'],
        type: 'Robotique',
    },
    {
        title: 'Wolf',
        description: 'Le projet Wolf est un projet ayant pour but de créer un environnement d\'interconnexion entre les différents outils pouvant être utilisés dans la gestion d\'associations, de projets etc ',
        preview: '/img/project/wolf.png',
        website: 'https://github.com/sedelpeuch/wolf',
        source: 'https://github.com/sedelpeuch/wolf',
        tags: ['opensource'],
        type: 'Web',
    },
    {
        title: 'Reachy Mobile',
        description: 'Jouer avec Reachy au Tic Tac Toe',
        preview: '/img/project/reachy_mobile.png',
        website: 'https://eirlab.github.io/reachy_mobile_reachy/',
        source: 'https://github.com/Eirlab/reachy_mobile_reachy',
        tags: ['opensource'],
        type: 'Robotique',
    }
]

export type Tag = {
    label: string
    description: string
    color: string
}

export type TagType = 'opensource'

export type ProjectType = 'Robotique' | 'Web'

export const projectTypeMap = {
    robotics: 'Robotique',
    web: 'Web',
}

export type Project = {
    title: string
    description: string
    preview?: string
    website: string
    source?: string | null
    tags: TagType[]
    type: ProjectType
}

export const Tags: Record<TagType, Tag> = {
    opensource: {
        label: 'OpenSource',
        description: 'OpenSource project',
        color: '#12affa',
    },
}

export const TagList = Object.keys(Tags) as TagType[]

export const groupByProjects = projects.reduce(
    (group, project) => {
        const {type} = project
        group[type] = group[type] ?? []
        group[type].push(project)
        return group
    },
    {} as Record<ProjectType, Project[]>,
)
