import EventBus from './core/EventBus.js';
import Store from './core/Store.js';
import Header from './components/Header.js';
import Hero from './components/Hero.js';
import MobileHero from './components/MobileHero.js';
import Services from './components/Services.js';
import Projects from './components/Projects.js';
import Tools from './components/Tools.js';
import Features from './components/Features.js';
import Contact from './components/Contact.js';
import Footer from './components/Footer.js';
import Clock from './components/Clock.js';
import personalData from './data/personal.js';

/**
 * Main Application Controller
 * Initializes and manages all components
 */
class App {
    constructor() {
        this.components = new Map();
        this.initTime = performance.now();
        this.isInitialized = false;
        this.errors = [];
        this.debug = window.location.hostname === 'localhost' || 
                     window.location.hostname === '127.0.0.1' ||
                     window.location.search.includes('debug=1');
    }

    async init() {
        try {
            console.log('🚀 Initializing portfolio...');
            
            // Initialize Eruda for local development
            if (this.debug) {
                await this.initEruda();
            }
            
            // Setup SEO meta tags first
            this.setupSEO();
            
            // Register components
            this.registerComponents();
            
            // Render all components
            await this.renderAll();
            
            this.initPurposeUI();
            
            // Mark as initialized
            this.isInitialized = true;
            
            // Log performance
            const loadTime = (performance.now() - this.initTime).toFixed(2);
            console.log(`✅ App initialized in ${loadTime}ms`);
            console.log(`📦 Components loaded: ${this.components.size}`);
            
            if (this.errors.length > 0) {
                console.warn(`⚠️  ${this.errors.length} non-critical errors:`, this.errors);
            }
            
            // Emit ready event
            EventBus.emit('app:ready', { loadTime, errors: this.errors });
            
        } catch (error) {
            console.error('❌ Failed to initialize app:', error);
            this.handleCriticalError(error);
        }
    }
    
    initPurposeUI() {
        // Purpose UI needs to re-process the DOM after dynamic content is added
        if (typeof window.Purpose !== 'undefined') {
            console.log('🔄 Re-initializing Purpose UI...');
            try {
                // Re-initialize core features
                if (window.Purpose.init) {
                    window.Purpose.init();
                }
            } catch (e) {
                console.warn('Purpose UI re-init warning:', e);
            }
        }
    }

    async initEruda() {
      console.log("loading eruda")
        try {
            // Dynamic import of Eruda
            const script = document.createElement('script');
            script.src = 'https://cdn.jsdelivr.net/npm/eruda';
            script.onload = () => {
                eruda.init({
                    tool: ['console', 'elements', 'network', 'resources', 'sources', 'info'],
                    useShadowDom: true,
                    autoScale: true,
                    defaults: {
                        displaySize: 50,
                        transparency: 0.9,
                        theme: 'Material Darker'
                    }
                });
                console.log('🔍 Eruda debug console loaded');
            };
            document.head.appendChild(script);
        } catch (error) {
            console.warn('Failed to load Eruda:', error);
        }
    }

    registerComponents() {
        const componentConfigs = [
            { name: 'header', component: Header, container: 'header-container' },
            { name: 'hero', component: Hero, container: 'hero-container' },
            { name: 'mobileHero', component: MobileHero, container: 'mobile-hero-container' },
            { name: 'services', component: Services, container: 'services-container' },
            { name: 'projects', component: Projects, container: 'projects-container' },
            { name: 'tools', component: Tools, container: 'tools-container' },
            { name: 'features', component: Features, container: 'features-container' },
            { name: 'contact', component: Contact, container: 'contact-container' },
            { name: 'footer', component: Footer, container: 'footer-container' },
            { name: 'clock', component: Clock, container: 'clock-container' }
        ];

        for (const config of componentConfigs) {
            try {
                const container = document.getElementById(config.container);
                if (!container) {
                    console.warn(`⚠️  Container #${config.container} not found for ${config.name}`);
                    continue;
                }
                
                const component = new config.component();
                this.components.set(config.name, component);
                console.log(`📦 Registered: ${config.name}`);
            } catch (error) {
                console.error(`❌ Failed to register ${config.name}:`, error);
                this.errors.push({ component: config.name, error });
            }
        }
    }

    async renderAll() {
        const renderOrder = [
            'header',
            'hero',
            'mobileHero',
            'services',
            'projects',
            'tools',
            'features',
            'contact',
            'footer',
            'clock'
        ];

        for (const name of renderOrder) {
            const component = this.components.get(name);
            if (component) {
                try {
                    await component.render();
                    console.log(`✅ Rendered: ${name}`);
                } catch (error) {
                    console.error(`❌ Error rendering ${name}:`, error);
                    this.errors.push({ component: name, error, phase: 'render' });
                    
                    // Show error in container
                    const container = document.getElementById(`${name}-container`);
                    if (container && this.debug) {
                        container.innerHTML = `
                            <div style="padding: 20px; margin: 10px; background: #fff3cd; border: 1px solid #ffc107; border-radius: 8px;">
                                <strong>⚠️ Error loading ${name}</strong>
                                <pre style="margin: 10px 0; font-size: 12px; overflow: auto;">${error.message}\n${error.stack || ''}</pre>
                            </div>
                        `;
                    }
                }
            }
        }
    }

    setupSEO() {
        const { seo } = personalData;
        
        document.title = seo.title;
        
        const updateMeta = (name, content, isProperty = false) => {
            const attribute = isProperty ? 'property' : 'name';
            let meta = document.querySelector(`meta[${attribute}="${name}"]`);
            if (!meta) {
                meta = document.createElement('meta');
                meta.setAttribute(attribute, name);
                document.head.appendChild(meta);
            }
            meta.content = content;
        };

        updateMeta('description', seo.description);
        updateMeta('keywords', seo.keywords);
        updateMeta('author', seo.author);
        
        updateMeta('og:title', seo.title, true);
        updateMeta('og:description', seo.description, true);
        updateMeta('og:image', seo.ogImage, true);
        updateMeta('og:type', seo.ogType, true);
        updateMeta('og:url', window.location.href, true);
        
        updateMeta('twitter:card', seo.twitterCard);
        updateMeta('twitter:title', seo.title);
        updateMeta('twitter:description', seo.description);
        updateMeta('twitter:image', seo.ogImage);
        
        this.addStructuredData();
    }

    addStructuredData() {
        const structuredData = {
            '@context': 'https://schema.org',
            '@type': 'Person',
            'name': personalData.fullName,
            'alternateName': personalData.name,
            'jobTitle': personalData.title,
            'description': personalData.description,
            'url': 'https://jjenus.github.io',
            'email': personalData.email.business,
            'sameAs': [
                personalData.social.github,
                personalData.social.linkedin,
                personalData.social.twitter
            ]
        };

        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.textContent = JSON.stringify(structuredData);
        document.head.appendChild(script);
    }

    handleCriticalError(error) {
        EventBus.emit('app:error', error);
        
        // Show error page for critical failures
        const body = document.body;
        if (body) {
            body.innerHTML = `
                <div style="
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    min-height: 100vh;
                    font-family: -apple-system, BlinkMacSystemFont, sans-serif;
                    background: #f8f9fa;
                    padding: 20px;
                ">
                    <div style="
                        max-width: 600px;
                        text-align: center;
                        background: white;
                        padding: 40px;
                        border-radius: 12px;
                        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
                    ">
                        <h1 style="color: #dc3545; margin-bottom: 20px;">⚠️ Application Error</h1>
                        <p style="color: #6c757d; margin-bottom: 20px;">
                            Failed to load the portfolio. Please try refreshing the page.
                        </p>
                        <pre style="
                            background: #f8f9fa;
                            padding: 15px;
                            border-radius: 8px;
                            text-align: left;
                            font-size: 13px;
                            overflow: auto;
                            margin-bottom: 20px;
                        ">${error.message}\n${error.stack || ''}</pre>
                        <button onclick="location.reload()" style="
                            background: #007bff;
                            color: white;
                            border: none;
                            padding: 10px 20px;
                            border-radius: 6px;
                            cursor: pointer;
                            font-size: 16px;
                        ">
                            🔄 Refresh Page
                        </button>
                        ${this.debug ? `<p style="margin-top: 20px; font-size: 12px; color: #6c757d;">
                            Debug mode active - check Eruda console for details
                        </p>` : ''}
                    </div>
                </div>
            `;
        }
    }

    getComponent(name) {
        return this.components.get(name);
    }

    destroy() {
        this.components.forEach(component => {
            try {
                component.destroy();
            } catch (error) {
                console.warn(`Error destroying component:`, error);
            }
        });
        this.components.clear();
    }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  //alert("Its loaded")
    const app = new App();
    app.init().catch(error => {
        console.error('❌ Fatal initialization error:', error);
        
        // Last resort fallback
        document.body.innerHTML += `
            <div style="
                position: fixed;
                bottom: 20px;
                right: 20px;
                background: #dc3545;
                color: white;
                padding: 15px;
                border-radius: 8px;
                font-family: monospace;
                max-width: 300px;
                z-index: 99999;
            ">
                <strong>Fatal Error</strong>
                <p style="margin: 5px 0; font-size: 12px;">${error.message}</p>
                <small>Open console for details</small>
            </div>
        `;
    });
    
    // Expose app to window for debugging
    window.__app = app;
});

export default App;