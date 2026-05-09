import Component from '../core/Component.js';
import servicesData from '../data/services.js';

class Services extends Component {
    constructor() {
        super('services-container');
        this.services = servicesData.sort((a, b) => a.order - b.order);
    }

    template() {
        return `
            <section class="slice slice-lg delimiter-top" aria-labelledby="services-heading">
                <div class="container">
                    <div class="mb-5 text-center">
                        <h3 id="services-heading" class="mt-4">What I Do</h3>
                        <div class="fluid-paragraph mt-3">
                            <p class="lead lh-180">Start building fast, beautiful and modern looking websites in no time.</p>
                        </div>
                    </div>
                    <div class="row justify-content-center">
                        ${this.services.map(service => this.createServiceCard(service)).join('')}
                    </div>
                </div>
            </section>
        `;
    }

    createServiceCard(service) {
        const isPrimary = service.color === 'primary';
        const cardBg = isPrimary ? 'bg-primary' : '';
        const textColor = isPrimary ? 'text-white' : '';
        const descColor = isPrimary ? 'text-light' : '';
        
        let iconColorClass = '';
        if (isPrimary) {
            iconColorClass = 'text-light';
        } else if (service.icon === 'fa-terminal') {
            iconColorClass = 'text-info';
        } else if (service.icon === 'fa-java') {
            iconColorClass = 'text-danger';
        }
        
        return `
            <div class="col-md-6 col-lg-4">
                <div class="card ${cardBg} hover-shadow-lg hover-translate-y-n10">
                    <div class="px-5 pb-5">
                        <div class="py-5">
                            <div class="icon">
                                <i class="${service.icon} ${iconColorClass}"></i>
                            </div>
                        </div>
                        <h5 class="${textColor}">${service.title}</h5>
                        <p class="mt-2 ${descColor} mb-0">
                            ${service.description}
                        </p>
                        <div class="mt-4">
                            ${service.skills.map(skill => `
                                <a class="badge badge-lg badge-pill badge-soft-${service.badgeColor} d-inline-block my-1 px-3">${skill}</a>
                            `).join('')}
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
}

export default Services;