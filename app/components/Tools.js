import Component from '../core/Component.js';
import skillsData from '../data/skills.js';

class Tools extends Component {
    constructor() {
        super('tools-container');
        this.skills = skillsData;
    }

    template() {
        return `
            <section class="slice slice-lg" aria-labelledby="skills-heading">
                <div class="container">
                    <div class="mb-5 text-center">
                        <h1 class="mb-4">
                            <span class="badge badge-soft-success w-75 badge-pill badge-lg">
                                Tech Stack & Expertise
                            </span>
                        </h1>
                        <div class="fluid-paragraph mt-3">
                            <p class="lead lh-180">
                                Technologies I use to build reliable, observable, and production-grade systems.
                            </p>
                        </div>
                    </div>
                    
                    <!-- Category Cards -->
                    <div class="row">
                        ${this.skills.categories.map(cat => this.createCategoryCard(cat)).join('')}
                    </div>
                </div>
            </section>
        `;
    }

    createCategoryCard(category) {
        return `
            <div class="col-lg-6 mb-4">
                <div class="card hover-shadow-lg hover-translate-y-n3 h-100">
                    <div class="card-body p-4">
                        <!-- Category Header -->
                        <div class="d-flex align-items-center mb-4">
                            <div class="icon-shape bg-${category.iconColor.replace('text-', '')} icon-${category.iconColor.replace('text-', '') === 'dark' ? 'dark' : category.iconColor.replace('text-', 'primary')} rounded-circle mr-3" style="width: 48px; height: 48px; min-width: 48px; display: flex; align-items: center; justify-content: center;">
                            </div>
                            <div>
                                <h5 class="mb-1 font-weight-bold">${category.title}</h5>
                                <p class="text-sm text-muted mb-0">${category.description}</p>
                            </div>
                        </div>
                        
                        <!-- Skills Badges -->
                        <div>
                            ${category.skills.map(skill => `
                                <span class="badge badge-lg badge-pill badge-soft-${skill.color} d-inline-flex align-items-center my-1 mr-2 px-3 py-2">
                                    <i class="${skill.icon} mr-2" style="font-size: 0.8rem;"></i> ${skill.name}
                                </span>
                            `).join('')}
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
}

export default Tools;