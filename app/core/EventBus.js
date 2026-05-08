/**
 * Simple Event Bus for component communication
 * Allows decoupled components to communicate through events
 */
class EventBus {
    constructor() {
        this.events = {};
        this.debug = false;
    }

    on(event, callback, priority = 0) {
        if (!this.events[event]) {
            this.events[event] = [];
        }
        this.events[event].push({ callback, priority });
        this.events[event].sort((a, b) => b.priority - a.priority);
        return () => this.off(event, callback);
    }

    once(event, callback) {
        const onceWrapper = (...args) => {
            this.off(event, onceWrapper);
            callback(...args);
        };
        this.on(event, onceWrapper);
    }

    off(event, callback) {
        if (!this.events[event]) return;
        this.events[event] = this.events[event].filter(
            listener => listener.callback !== callback
        );
    }

    emit(event, data) {
        if (this.debug) {
            console.log(`[EventBus] Emitting: ${event}`, data);
        }
        if (this.events[event]) {
            this.events[event].forEach(listener => {
                try {
                    listener.callback(data);
                } catch (error) {
                    console.error(`[EventBus] Error in event ${event}:`, error);
                }
            });
        }
    }
}

export default new EventBus();