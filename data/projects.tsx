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
]

export type Tag = {
    label: string
    description: string
    color: string
}

export type TagType = 'opensource'

export type ProjectType = 'Robotique'

export const projectTypeMap = {
    robotics: 'Robotique',
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
