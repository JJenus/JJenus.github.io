import EventBus from './EventBus.js';

/**
 * Base Component class
 * All components extend this to get lifecycle methods and state management
 */
class Component {
    constructor(containerId, options = {}) {
        this.containerId = containerId;
        this.container = null;
        this.state = {};
        this.props = options.props || {};
        this.options = options;
        this.isMounted = false;
        this.eventListeners = [];
    }

    /**
     * Lifecycle: Called before first render
     */
    beforeMount() {}

    /**
     * Main template method - override in child classes
     */
    template() {
        return '';
    }

    /**
     * Update state and re-render
     */
    setState(newState, shouldRender = true) {
        const prevState = { ...this.state };
        this.state = { ...this.state, ...newState };
        
        if (shouldRender && this.isMounted) {
            this.render();
        }
        
        EventBus.emit(`${this.constructor.name}:stateChange`, {
            prevState,
            currentState: this.state
        });
    }

    /**
     * Render component to DOM
     */
    render() {
        if (!this.container) {
            this.container = document.getElementById(this.containerId);
        }
        
        if (!this.container) {
            console.warn(`Container #${this.containerId} not found for ${this.constructor.name}`);
            return;
        }

        if (!this.isMounted) {
            this.beforeMount();
        }

        this.container.innerHTML = this.template();
        
        if (!this.isMounted) {
            this.afterMount();
            this.isMounted = true;
        }
        
        this.afterRender();
    }

    /**
     * Lifecycle: Called after first render
     */
    afterMount() {}

    /**
     * Called after every render
     */
    afterRender() {
        this.attachEventListeners();
    }

    /**
     * Attach event listeners - override in child classes
     */
    attachEventListeners() {}

    /**
     * Add event listener with automatic cleanup
     */
    addEventListener(element, event, handler, options = {}) {
        if (!element) return;
        
        element.addEventListener(event, handler, options);
        this.eventListeners.push({
            element,
            event,
            handler,
            options
        });
    }

    /**
     * Query selector within component
     */
    querySelector(selector) {
        return this.container ? this.container.querySelector(selector) : null;
    }

    /**
     * Query selector all within component
     */
    querySelectorAll(selector) {
        return this.container ? this.container.querySelectorAll(selector) : [];
    }

    /**
     * Emit event through EventBus
     */
    emit(event, data) {
        EventBus.emit(event, data);
    }

    /**
     * Listen to event through EventBus
     */
    on(event, callback) {
        EventBus.on(event, callback);
    }

    /**
     * Cleanup component
     */
    destroy() {
        this.eventListeners.forEach(({ element, event, handler, options }) => {
            element.removeEventListener(event, handler, options);
        });
        this.eventListeners = [];
        
        if (this.container) {
            this.container.innerHTML = '';
        }
        
        this.isMounted = false;
    }
}

export default Component;