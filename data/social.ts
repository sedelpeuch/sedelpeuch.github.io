export type Social = {
    github?: string
    email?: string
}

type SocialValue = {
    href?: string
    title: string
    icon: string
    color: string
}

const social: Social = {
    github: 'https://github.com/sedelpeuch',
    email: 'mailto:sebastien@delpeuch.net',
}

const socialSet: Record<keyof Social, SocialValue> = {
    github: {
        href: social.github,
        title: 'GitHub',
        icon: 'ri:github-line',
        color: '#010409',
    },
    email: {
        href: social.email,
        title: 'Email',
        icon: 'ri:mail-line',
        color: '#D44638',
    },
}

export default socialSet
