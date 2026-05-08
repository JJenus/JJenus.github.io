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
                        <!-- Brand Column -->
                        <div class="col-lg-4 mb-5 mb-lg-0">
                            <a href="/" aria-label="${this.data.name} - Home">
                                <img src="${this.data.logo.light}" alt="${this.data.name}" style="height: 45px;" />
                            </a>
                            <p class="mt-3 text-sm opacity-8">
                                ${this.data.description}
                            </p>
                            <div class="mt-4">
                                <a href="mailto:${this.data.email.business}" 
                                   class="btn btn-sm btn-white rounded-pill hover-translate-y-n3">
                                    <i class="fas fa-envelope mr-2"></i> ${this.data.email.business}
                                </a>
                            </div>
                        </div>

                        <!-- Quick Links -->
                        <div class="col-lg-2 col-md-4 mb-5 mb-lg-0">
                            <h5 class="heading text-white mb-3">Quick Links</h5>
                            <ul class="list-unstyled">
                                <li><a href="#services" class="footer-link" data-scroll-to="services-container">Services</a></li>
                                <li><a href="#projects" class="footer-link" data-scroll-to="projects-container">Projects</a></li>
                                <li><a href="${this.data.resume}" target="_blank" class="footer-link">Resume</a></li>
                                <li><a href="mailto:${this.data.email.business}?subject=Project%20Enquiry" class="footer-link">Contact</a></li>
                            </ul>
                        </div>

                        <!-- Services -->
                        <div class="col-lg-3 col-md-4 mb-5 mb-lg-0">
                            <h5 class="heading text-white mb-3">What I Do</h5>
                            <ul class="list-unstyled">
                                <li><span class="footer-link">Fullstack Web Development</span></li>
                                <li><span class="footer-link">Backend Engineering</span></li>
                                <li><span class="footer-link">Desktop Applications</span></li>
                                <li><span class="footer-link">API Development</span></li>
                            </ul>
                        </div>

                        <!-- Social & Location -->
                        <div class="col-lg-3 col-md-4 mb-5 mb-lg-0">
                            <h5 class="heading text-white mb-3">Connect</h5>
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
                                <li class="nav-item mb-2">
                                    <a class="nav-link footer-link p-0" href="${this.data.social.facebook}" 
                                       target="_blank" rel="noopener noreferrer">
                                        <i class="fab fa-facebook mr-2"></i> Facebook
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

                    <!-- Bottom bar -->
                    <div class="row align-items-center justify-content-md-between py-4 mt-5 delimiter-top">
                        <div class="col-md-6">
                            <div class="copyright text-sm font-weight-bold text-center text-md-left opacity-8">
                                &copy; ${this.currentYear} 
                                <a href="https://jjenus.github.io/" class="font-weight-bold text-white" 
                                   target="_blank" rel="noopener noreferrer">
                                    ${this.data.name}
                                </a>. All rights reserved.
                            </div>
                        </div>
                        <div class="col-md-6">
                            <p class="text-sm text-center text-md-right mb-0 opacity-7">
                                Built with <i class="fas fa-heart text-danger mx-1"></i> using 
                                <span class="font-weight-bold text-white">Purpose UI</span>
                            </p>
                        </div>
                    </div>
                </div>
            </footer>
        `;
    }

    afterRender() {
        super.afterRender();
        
        // Smooth scroll for footer links
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