/**
 * Projects Data
 * Easily add new projects by adding objects to this array
 */
const projectsData = [
    {
        id: 'quiika',
        title: 'Quiika - Verified Gifting Platform',
        description: 'P2P gamified verified gifting platform with Paystack integration. Every gift locks funds before sharing, rules lock once claims start, and winners receive instant bank transfers with a full public audit trail.',
        shortDescription: 'P2P verified gifting with Paystack. Lock funds, share, winners claim instantly.',
        image: './assets/img/project_1/quiika.png',
        liveUrl: 'https://quiika.com',
        githubUrl: '#', // Private repo
        tech: 'Spring Boot, Java 21, PostgreSQL, Paystack',
        category: 'web',
        featured: true,
        icon: 'eye',
        year: 2025,
        highlights: ['Paystack Integration', 'Idempotent Payouts', 'Public Audit Trail', 'Instant Transfers'],
        privateRepo: true
    },
    {
        id: 'walworking',
        title: 'Walworking Technologies',
        description: 'Professional safety, fire protection and consulting company website. Built with modern React/TypeScript stack, deployed on Vercel with serverless architecture.',
        shortDescription: 'Safety & fire protection consultancy website.',
        image: './assets/img/project_1/walworking.png',
        liveUrl: 'https://walworkingtechnologies.vercel.app',
        githubUrl: 'https://github.com/JJenus/walworking',
        tech: 'React, TypeScript, TailwindCSS, Vite',
        category: 'web',
        featured: true,
        icon: 'eye',
        year: 2025,
        highlights: ['Serverless Deployment', 'SEO Optimized', 'Responsive Design']
    },
    {
        id: 'laundry',
        title: 'Qliina - Laundry Management System',
        description: 'Comprehensive laundry tracking SaaS designed to streamline laundry processes, manage orders, and track customer deliveries efficiently with real-time updates.',
        shortDescription: 'Laundry tracking and order management SaaS.',
        image: './assets/img/project_1/laundry-3.png',
        liveUrl: 'https://jjenus-laundry.alwaysdata.net',
        githubUrl: 'https://github.com/jjenus/laundry',
        tech: 'CodeIgniter, Vue.js, MySQL',
        category: 'web',
        featured: true,
        icon: 'eye',
        year: 2023,
        highlights: ['Order Management', 'Customer Tracking', 'Real-time Updates']
    },
    {
        id: 'fpams',
        title: 'Fingerprint Attendance Management System',
        description: 'Desktop application for managing attendance using fingerprint recognition. Features include real-time tracking, reporting, and integration with Digital Persona devices.',
        shortDescription: 'Click download to install on desktop.',
        image: './assets/img/project_1/fpams-1.jpg',
        liveUrl: 'https://drive.google.com/file/d/1-7KLgSfxMBv09MMRevIGyP4grJ4qz4xb/view?usp=drivesdk',
        githubUrl: 'https://github.com/jjenus/fpams',
        tech: 'Java, JavaFX, Onetouch SDK, SQLite3',
        category: 'desktop',
        featured: true,
        icon: 'download',
        year: 2022,
        requirements: [
            'JRE 1.8.*',
            'Digital Persona Onetouch RTE'
        ],
        highlights: ['Fingerprint Recognition', 'Attendance Tracking', 'Report Generation']
    },
    {
        id: 'truthy',
        title: 'Truthy - Twitter Review Platform',
        description: 'Platform that enables users to make and aggregate reviews via tweets. Leverages Twitter API for authentic, social-proof reviews.',
        shortDescription: 'Make reviews via tweets.',
        image: './assets/img/project_1/truthy-1.png',
        liveUrl: 'https://jjenus.alwaysdata.net/',
        githubUrl: 'https://github.com/jjenus/truthy',
        tech: 'PHP, Twitter API',
        category: 'web',
        featured: false,
        icon: 'eye',
        year: 2022,
        highlights: ['Twitter Integration', 'Review Aggregation', 'Social Authentication']
    },
    {
        id: 'yohplanner',
        title: 'Yohplanner - Architecture Sales Portal',
        description: 'A comprehensive sales portal for architectural services, enabling clients to browse, customize, and purchase architectural plans with ease.',
        shortDescription: 'Architecture sales portal.',
        image: './assets/img/project_1/yohanner-1.png',
        liveUrl: 'https://github.com/jjenus/planner',
        githubUrl: 'https://github.com/jjenus/planner',
        tech: 'CodeIgniter, Vue.js',
        category: 'web',
        featured: false,
        icon: 'eye',
        year: 2023,
        highlights: ['E-commerce', 'Architecture Plans', 'Custom Solutions']
    }
];

export default projectsData;