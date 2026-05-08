import Component from '../core/Component.js';
import projectsData from '../data/projects.js';

class Projects extends Component {
    constructor() {
        super('projects-container');
        this.projects = projectsData;
        this.filter = 'all';
    }

    template() {
        return `
            <section class="slice" aria-labelledby="projects-heading">
                <div class="container">
                    <h3 id="projects-heading" class="pt-4 text-center mb-4">Projects</h3>
                    <div class="row">
                        ${this.getFilteredProjects().map(project => this.createProjectCard(project)).join('')}
                    </div>
                </div>
            </section>
        `;
    }

    getFilteredProjects() {
        if (this.filter === 'all') return this.projects;
        return this.projects.filter(p => p.category === this.filter);
    }

    createProjectCard(project) {
        const actionIcon = project.icon === 'download' ? 'fa-download' : 'fa-eye';
        const githubLink = project.privateRepo 
            ? `<span class="action-item mr-3 text-muted" title="Private repository">
                 <i class="fas fa-lock"></i>
               </span>`
            : `<a href="${project.githubUrl}" class="action-item mr-3" target="_blank" rel="noopener noreferrer">
                 <i class="fab fa-github"></i>
               </a>`;
        
        return `
            <div class="col-lg-6">
                <div class="card card-overlay card-hover-overlay">
                    <figure class="figure">
                        <img alt="${project.title}" src="${project.image}" class="img-fluid" loading="lazy" />
                    </figure>
                    <div class="card-img-overlay d-flex flex-column align-items-center p-0">
                        <div class="overlay-text w-75 mt-auto p-4 py-2 py-md-4">
                            <p class="text-sm">
                                ${project.shortDescription}
                                ${project.requirements ? this.getRequirements(project.requirements) : ''}
                            </p>
                            <a href="${project.liveUrl}" 
                               class="link link-underline-white font-weight-bold"
                               target="_blank"
                               rel="noopener noreferrer">
                                ${project.title}
                            </a>
                        </div>
                        <div class="overlay-actions w-100 card-footer mt-auto d-flex justify-content-between align-items-center">
                            <div>
                                <span class="h6 mb-0">${project.tech}</span>
                            </div>
                            <div>
                                <div class="actions">
                                    ${githubLink}
                                    <a href="${project.liveUrl}" class="action-item mr-3" target="_blank" rel="noopener noreferrer">
                                        <i class="fas ${actionIcon}"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    getRequirements(requirements) {
        return `
            <br>Requirements 
            <ul class="list text-sm text-sm-lg m-0 p-0">
                ${requirements.map(req => `<li class="list-item m-0 p-0">${req}</li>`).join('')}
            </ul>
        `;
    }
}

export default Projects;