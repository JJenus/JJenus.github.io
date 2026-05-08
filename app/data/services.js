/**
 * Services Data
 * Add, remove, or modify services here
 */
const servicesData = [
    {
        id: 'fullstack',
        icon: 'fa-code',
        title: 'Fullstack Web Development',
        description: 'Design, build, or maintain web sites, using authoring or scripting languages, content creation tools, management tools, and digital media. Develop web site maps, application models, image templates, or page templates that meet project goals, user needs, or industry standards.',
        skills: ['Bootstrap', 'Vue.js', 'PHP', 'JavaScript', 'HTML5/CSS3'],
        color: 'primary',
        badgeColor: 'info',
        order: 1
    },
    {
        id: 'backend',
        icon: 'fa-terminal',
        title: 'Backend Engineering',
        description: 'Debug or build new server scripts in no time with core PHP and CodeIgniter 4. Purchase and renew DNS subscriptions and hosting space. Efficient database design and optimization.',
        skills: ['JAVA/SPRINGBOOT', 'NODE.JS', 'SQL', 'PHP', 'RDBMS', 'API Design', 'Server Management'],
        color: 'default',
        badgeColor: 'info',
        order: 2
    },
    {
        id: 'desktop',
        icon: 'fa-java',
        title: 'Desktop Application Development',
        description: 'Design and build efficient desktop applications with Java. Create robust, cross-platform solutions using modern frameworks and best practices.',
        skills: ['Java', 'JavaFX', 'Scene Builder', 'JDBC', 'SQLite'],
        color: 'default',
        badgeColor: 'danger',
        order: 3
    }
];

export default servicesData;