import Component from '../core/Component.js';
import personalData from '../data/personal.js';

class Header extends Component {
    constructor() {
        super('header-container');
        this.data = personalData;
    }

    template() {
        // WhatsApp URL
        const whatsappNumber = '2347048080326'; // Replace with your actual WhatsApp number
        const whatsappMessage = encodeURIComponent('Hi Jenus, I would like to discuss a project.');
        const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

        return `
            <header class="header header-transparent" id="header-main" role="banner">
                <nav class="navbar navbar-main navbar-expand-lg navbar-transparent navbar-dark bg-dark" 
                     id="navbar-main" 
                     role="navigation" 
                     aria-label="Main navigation">
                    <div class="container px-lg-0">
                        <a class="navbar-brand mr-lg-5" href="/" aria-label="${this.data.name} - Home">
                            <img class="d-md-block d-none" 
                                 alt="${this.data.name}" 
                                 src="${this.data.logo.dark}" 
                                 id="navbar-logo" 
                                 style="width: 150px;" />
                            <img class="d-md-none" 
                                 alt="${this.data.name}" 
                                 src="${this.data.logo.light}" 
                                 style="width: 120px;" />
                        </a>
                        
                        <button class="navbar-toggler" type="button" data-toggle="collapse" 
                                data-target="#navbar-main-collapse" aria-controls="navbar-main-collapse" 
                                aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button>
                        
                        <div class="collapse navbar-collapse" id="navbar-main-collapse">
                            <ul class="navbar-nav ml-auto align-items-lg-center">
                                <li class="nav-item">
                                    <a class="nav-link" href="#services" data-scroll-to="services-container">
                                        Services
                                    </a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="#projects" data-scroll-to="projects-container">
                                        Projects
                                    </a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="#tools" data-scroll-to="tools-container">
                                        Tools
                                    </a>
                                </li>
                                <li class="nav-item d-none d-lg-block">
                                    <a class="nav-link" href="${this.data.resume}" target="_blank" rel="noopener noreferrer">
                                        Resume
                                    </a>
                                </li>
                                <li class="nav-item ml-lg-2">
                                    <a class="nav-link p-0" href="${whatsappUrl}" 
                                       target="_blank" rel="noopener noreferrer"
                                       aria-label="Chat on WhatsApp">
                                        <span class="btn btn-sm btn-success rounded-pill px-3">
                                            <i class="fab fa-whatsapp mr-1"></i> WhatsApp
                                        </span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </header>
        `;
    }

    afterRender() {
        super.afterRender();
        
        const navLinks = this.querySelectorAll('[data-scroll-to]');
        navLinks.forEach(link => {
            this.addEventListener(link, 'click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('data-scroll-to');
                const target = document.getElementById(targetId);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
                
                const collapse = this.querySelector('.navbar-collapse');
                if (collapse && collapse.classList.contains('show')) {
                    collapse.classList.remove('show');
                }
            });
        });
    }
}

export default Header;