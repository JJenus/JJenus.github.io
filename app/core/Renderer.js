import EventBus from './EventBus.js';

/**
 * Component Renderer
 * Handles registration and rendering of all components
 */
class Renderer {
    constructor() {
        this.components = new Map();
        this.errors = [];
    }

    register(configs) {
        for (const config of configs) {
            try {
                const container = document.getElementById(config.container);
                if (!container) {
                    console.warn(`[!]  Container #${config.container} not found for ${config.name}`);
                    continue;
                }
                
                const component = new config.component();
                this.components.set(config.name, component);
                console.log(`[+] Registered: ${config.name}`);
            } catch (error) {
                console.error(`[x]Failed to register ${config.name}:`, error);
                this.errors.push({ component: config.name, error });
            }
        }
    }

    async renderAll(order) {
        for (const name of order) {
            const component = this.components.get(name);
            if (!component) continue;
            
            try {
                await component.render();
                console.log(`[+] Rendered: ${name}`);
            } catch (error) {
                console.error(`[x]Error rendering ${name}:`, error);
                this.errors.push({ component: name, error, phase: 'render' });
                
                const container = document.getElementById(`${name}-container`);
                if (container) {
                    container.innerHTML = `
                        <div style="padding: 20px; margin: 10px; background: #fff3cd; border: 1px solid #ffc107; border-radius: 8px;">
                            <strong>[!] Error loading ${name}</strong>
                            <pre style="margin: 10px 0; font-size: 12px; overflow: auto;">${error.message}\n${error.stack || ''}</pre>
                        </div>
                    `;
                }
            }
        }
    }

    get(name) {
        return this.components.get(name);
    }

    getAll() {
        return this.components;
    }

    destroy() {
        this.components.forEach(component => {
            try { component.destroy(); } 
            catch (error) { console.warn(`Error destroying component:`, error); }
        });
        this.components.clear();
    }
}

export default Renderer;