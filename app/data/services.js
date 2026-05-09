/**
 * Services Data
 * Add, remove, or modify services here
 */
const servicesData = [
    {
        id: 'backend',
        icon: 'fas fa-server',
        title: 'Backend Systems & APIs',
        description: 'Design and build scalable RESTful APIs, microservices, and event-driven backend systems with Java and Spring Boot. Specialized in high-integrity transaction processing, real-time data pipelines, and secure payment integrations.',
        skills: ['Java', 'Spring Boot', 'PostgreSQL', 'REST APIs', 'Microservices', 'ActiveMQ'],
        color: 'success',
        badgeColor: 'success',
        order: 1
    },
    {
        id: 'fullstack',
        icon: 'fas fa-layer-group',
        title: 'Fullstack Web Applications',
        description: 'Build complete web platforms from database to frontend. Vue.js and Nuxt for responsive interfaces, Spring Boot, Node.js or PHP backends, with automated CI/CD pipelines and cloud deployment.',
        skills: ['Vue.js', 'Nuxt', 'TypeScript', 'Node.js', 'TailwindCSS', 'React'],
        color: 'default',
        badgeColor: 'info',
        order: 2
    },
    {
        id: 'desktop',
        icon: 'fab fa-java',
        title: 'Desktop & Embedded Solutions',
        description: 'Build robust desktop applications with Java and JavaFX. Experienced with hardware integration, biometric systems, and IoT device communication protocols.',
        skills: ['Java', 'JavaFX', 'IoT Protocols', 'MQTT'],
        color: 'default',
        badgeColor: 'danger',
        order: 3
    }
];

export default servicesData;