import Component from '../core/Component.js';
import personalData from '../data/personal.js';

class Footer extends Component {
    constructor() {
        super('footer-container');
        this.data = personalData;
        this.currentYear = new Date().getFullYear();
    }

    template() {
        return `
            <footer class="footer footer-dark bg-gradient-primary" role="contentinfo">
                <div class="container">
                    <div class="row pt-md pt-5">
                        <div class="col-lg-4 mb-5 mb-lg-0">
                            <a href="/" aria-label="${this.data.name} - Home">
                                <img src="${this.data.logo.light}" alt="${this.data.name}" style="height: 45px;" />
                            </a>
                            <p class="mt-3 text-sm opacity-8">
                                I strive to design backend systems that keep working when things don’t go as planned.
                            </p>
                            <div class="mt-4">
                                <a href="mailto:${this.data.email.business}" 
                                   class="btn btn-sm btn-white rounded-pill hover-translate-y-n3">
                                    <i class="fas fa-envelope mr-2"></i> ${this.data.email.business}
                                </a>
                            </div>
                        </div>

                        <div class="col-lg-2 col-md-4 mb-5 mb-lg-0">
                            <h5 class="heading text-white mb-3">Navigate</h5>
                            <ul class="list-unstyled">
                                <li><a href="#services" class="footer-link" data-scroll-to="services-container">Services</a></li>
                                <li><a href="#projects" class="footer-link" data-scroll-to="projects-container">Projects</a></li>
                                <li><a href="#tools" class="footer-link" data-scroll-to="tools-container">Tech Stack</a></li>
                                <li><a href="${this.data.resume}" target="_blank" class="footer-link">Resume</a></li>
                            </ul>
                        </div>

                        <div class="col-lg-3 col-md-4 mb-5 mb-lg-0">
                            <h5 class="heading text-white mb-3">Focus Areas</h5>
                            <ul class="list-unstyled">
                                <li><span class="footer-link">Backend Engineering</span></li>
                                <li><span class="footer-link">API & Microservices</span></li>
                                <li><span class="footer-link">Fintech Integrations</span></li>
                                <li><span class="footer-link">IoT & Telemetry</span></li>
                            </ul>
                        </div>

                        <div class="col-lg-3 col-md-4 mb-5 mb-lg-0">
                            <h5 class="heading text-white mb-3">Find Me</h5>
                            <ul class="nav flex-column">
                                <li class="nav-item mb-2">
                                    <a class="nav-link footer-link p-0" href="${this.data.social.github}" 
                                       target="_blank" rel="noopener noreferrer">
                                        <i class="fab fa-github mr-2"></i> GitHub
                                    </a>
                                </li>
                                <li class="nav-item mb-2">
                                    <a class="nav-link footer-link p-0" href="${this.data.social.linkedin}" 
                                       target="_blank" rel="noopener noreferrer">
                                        <i class="fab fa-linkedin-in mr-2"></i> LinkedIn
                                    </a>
                                </li>
                                <li class="nav-item mb-2">
                                    <a class="nav-link footer-link p-0" href="${this.data.social.twitter}" 
                                       target="_blank" rel="noopener noreferrer">
                                        <i class="fab fa-twitter mr-2"></i> Twitter
                                    </a>
                                </li>
                            </ul>
                            <div class="mt-3">
                                <p class="text-sm opacity-8 mb-0">
                                    <i class="fas fa-map-marker-alt mr-2"></i> ${this.data.location}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div class="row align-items-center justify-content-md-between py-4 mt-5 delimiter-top">
                        <div class="col-md-6">
                            <div class="copyright text-sm font-weight-bold text-center text-md-left opacity-8">
                                &copy; ${this.currentYear} 
                                <a href="https://jjenus.github.io/" class="font-weight-bold text-white" 
                                   target="_blank" rel="noopener noreferrer">
                                    ${this.data.name}
                                </a>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <p class="text-sm text-center text-md-right mb-0 opacity-7">
                                Built with Purpose UI · Deployed on GitHub Pages
                            </p>
                        </div>
                    </div>
                </div>
            </footer>
        `;
    }

    afterRender() {
        super.afterRender();
        
        const footerLinks = this.querySelectorAll('[data-scroll-to]');
        footerLinks.forEach(link => {
            this.addEventListener(link, 'click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('data-scroll-to');
                const target = document.getElementById(targetId);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });
    }
}

export default Footer;