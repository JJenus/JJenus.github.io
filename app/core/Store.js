import EventBus from './EventBus.js';

/**
 * Simple state management store
 */
class Store {
    constructor(initialState = {}) {
        this.state = initialState;
        this.listeners = new Map();
    }

    getState(key) {
        return key ? this.state[key] : this.state;
    }

    setState(key, value) {
        const prevState = { ...this.state };
        
        if (typeof key === 'object') {
            this.state = { ...this.state, ...key };
        } else {
            this.state[key] = value;
        }
        
        EventBus.emit('store:change', {
            prevState,
            currentState: this.state
        });
        
        this.notifyListeners(key);
    }

    subscribe(key, callback) {
        if (!this.listeners.has(key)) {
            this.listeners.set(key, new Set());
        }
        this.listeners.get(key).add(callback);
        
        return () => {
            this.listeners.get(key)?.delete(callback);
        };
    }

    notifyListeners(key) {
        const listeners = this.listeners.get(key);
        if (listeners) {
            listeners.forEach(callback => callback(this.state[key]));
        }
    }
}

export default new Store();