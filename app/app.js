import SEO from './core/SEO.js';
import Renderer from './core/Renderer.js';
import EventBus from './core/EventBus.js';
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

class App {
    constructor() {
        this.renderer = new Renderer();
        this.initTime = performance.now();
        this.debug = window.location.hostname === 'localhost' || 
                     window.location.hostname === '127.0.0.1' ||
                     window.location.search.includes('debug=1');
    }

    async init() {
        try {
            console.log('Initializing portfolio...');

            // SEO first
            SEO.init();

            // Debug tools for local dev
            if (this.debug) await this.initEruda();

            // Register all components
            this.renderer.register([
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
            ]);

            // Render in order
            await this.renderer.renderAll([
                'header', 'hero', 'mobileHero', 'services', 'projects',
                'tools', 'features', 'contact', 'footer', 'clock'
            ]);

            // Re-init Purpose UI for dynamic content
            this.initPurposeUI();

            const loadTime = (performance.now() - this.initTime).toFixed(2);
            console.log(`App initialized in ${loadTime}ms`);
            console.log(`Components: ${this.renderer.getAll().size}`);
            
            EventBus.emit('app:ready', { loadTime });

        } catch (error) {
            console.error('[x] Failed to initialize app:', error);
            this.handleCriticalError(error);
        }
    }

    initPurposeUI() {
        if (typeof window.Purpose !== 'undefined') {
            console.log('Re-initializing Purpose UI...');
            try {
                if (window.Purpose.init) window.Purpose.init();
            } catch (e) {
                console.warn('Purpose UI re-init warning:', e);
            }
        }
    }

    async initEruda() {
        try {
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
                console.log('Eruda debug console loaded');
            };
            document.head.appendChild(script);
        } catch (error) {
            console.warn('Failed to load Eruda:', error);
        }
    }

    handleCriticalError(error) {
        EventBus.emit('app:error', error);
        document.body.innerHTML = `
            <div style="display: flex; justify-content: center; align-items: center; min-height: 100vh; background: #f8f9fa; padding: 20px;">
                <div style="max-width: 600px; text-align: center; background: white; padding: 40px; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                    <h1 style="color: #dc3545;">[!] Application Error</h1>
                    <p style="color: #6c757d;">Failed to load. Please refresh.</p>
                    <pre style="background: #f8f9fa; padding: 15px; border-radius: 8px; text-align: left; font-size: 13px; overflow: auto;">${error.message}</pre>
                    <button onclick="location.reload()" style="background: #007bff; color: white; border: none; padding: 10px 20px; border-radius: 6px; cursor: pointer;">Refresh</button>
                </div>
            </div>
        `;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const app = new App();
    app.init().catch(error => {
        console.error('[X] Fatal:', error);
        document.body.innerHTML += `
            <div style="position: fixed; bottom: 20px; right: 20px; background: #dc3545; color: white; padding: 15px; border-radius: 8px; z-index: 99999;">
                <strong>Fatal Error</strong>
                <p style="margin: 5px 0; font-size: 12px;">${error.message}</p>
            </div>
        `;
    });
    window.__app = app;
});

export default App;