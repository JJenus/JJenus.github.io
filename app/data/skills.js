/**
 * Skills & Expertise Data
 * Grouped by category - no progress indicators, just clean categorization
 */
const skillsData = {
    categories: [
        {
            id: 'core',
            title: 'Core Stack',
            icon: 'fa-layer-group',
            iconColor: 'text-primary',
            description: 'Primary languages and runtimes I work with daily.',
            skills: [
                { name: 'Java', icon: 'fab fa-java', color: 'danger' },
                { name: 'TypeScript', icon: 'fas fa-code', color: 'info' },
                { name: 'PHP', icon: 'fab fa-php', color: 'primary' },
                { name: 'SQL', icon: 'fas fa-database', color: 'success' },
                { name: 'Bash', icon: 'fas fa-terminal', color: 'dark' }
            ]
        },
        {
            id: 'frameworks',
            title: 'Frameworks & Runtimes',
            icon: 'fa-cubes',
            iconColor: 'text-success',
            description: 'Frameworks I build production systems with.',
            skills: [
                { name: 'Spring Boot', icon: 'fas fa-leaf', color: 'success' },
                { name: 'Vue.js', icon: 'fab fa-vuejs', color: 'success' },
                { name: 'Nuxt', icon: 'fas fa-triangle', color: 'info' },
                { name: 'Node.js', icon: 'fab fa-node-js', color: 'success' },
                { name: 'CodeIgniter', icon: 'fas fa-fire', color: 'danger' },
                { name: 'Hibernate/JPA', icon: 'fas fa-archive', color: 'warning' }
            ]
        },
        {
            id: 'infrastructure',
            title: 'Data & Infrastructure',
            icon: 'fa-server',
            iconColor: 'text-warning',
            description: 'Databases, message brokers, and DevOps tooling.',
            skills: [
                { name: 'PostgreSQL', icon: 'fas fa-elephant', color: 'primary' },
                { name: 'MySQL', icon: 'fas fa-database', color: 'info' },
                { name: 'MongoDB', icon: 'fas fa-leaf', color: 'success' },
                { name: 'ActiveMQ', icon: 'fas fa-exchange-alt', color: 'warning' },
                { name: 'Docker', icon: 'fab fa-docker', color: 'info' },
                { name: 'GitHub Actions', icon: 'fab fa-github', color: 'dark' }
            ]
        },
        {
            id: 'practices',
            title: 'Engineering Practices',
            icon: 'fa-cogs',
            iconColor: 'text-info',
            description: 'Principles and patterns that guide my work.',
            skills: [
                { name: 'Microservices', icon: 'fas fa-sitemap', color: 'primary' },
                { name: 'REST API Design', icon: 'fas fa-plug', color: 'success' },
                { name: 'TDD', icon: 'fas fa-check-double', color: 'success' },
                { name: 'CI/CD', icon: 'fas fa-infinity', color: 'info' },
                { name: 'Observability', icon: 'fas fa-eye', color: 'warning' },
                { name: 'Agile/Scrum', icon: 'fas fa-sync-alt', color: 'primary' }
            ]
        }
    ]
};

export default skillsData;