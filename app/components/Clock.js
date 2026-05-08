import Component from '../core/Component.js';

class Clock extends Component {
    constructor() {
        super('clock-container');
        this.interval = null;
    }

    template() {
        return `
            <section class="fixed-bottom d-none d-md-none pt-3 pb-1 w-100 bg-gradient-primary bg-transparent align-items-center" 
                     style="text-align: center;"
                     aria-label="Time display">
                
                <!-- Background Clouds -->
                <div class="shape-container" data-shape-position="bottom" style="height: 345.297px; z-index: 1;" aria-hidden="true">
                    <svg preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1437.24 372.58" class="ie-shape-clouds">
                        <!-- SVG paths unchanged -->
                    </svg>
                </div>
                
                <div style="z-index: 10;" class="clock2 bg-gradient-primary shadow card hover-translate-y-n3 hover-shadow-lg">
                    <div class="card-body text-white center">
                        <span class="ch1 d-block" id="yest" aria-label="Yesterday's time">--:--</span>
                        <span class="mkr d-block">ago</span>
                        <span class="sm1 d-block" id="ysd" aria-label="Yesterday's date">--- ----</span>
                    </div>
                </div>
                
                <div style="z-index: 10;" class="clock mx-2 card bg-gradient-primary shadow hover-translate-y-n3 hover-shadow-lg">
                    <div class="center text-white card-body">
                        <span class="ch2 d-block" id="today" aria-label="Current time">00:00</span>
                        <span class="sec font-weight-bold d-block" id="secs" aria-live="polite">00</span>
                        <span class="sm2 d-block" id="td" aria-label="Current date">--- ----</span>
                    </div>
                </div>
                
                <div style="z-index: 10;" class="clock2 card bg-gradient-primary shadow hover-translate-y-n3 hover-shadow-lg">
                    <div class="card-body text-white center">
                        <span class="ch1 d-block" id="tom" aria-label="Tomorrow's time">--:--</span>
                        <span class="mkr d-block">from now</span>
                        <span class="sm1 d-block" id="tmd" aria-label="Tomorrow's date">--- ----</span>
                    </div>
                </div>
            </section>
        `;
    }

    updateClock() {
        const now = moment();
        const yesterday = moment().subtract(24, 'hours');
        const tomorrow = moment().add(24, 'hours');

        // Update elements if they exist
        const todayEl = document.getElementById('today');
        const secsEl = document.getElementById('secs');
        const tdEl = document.getElementById('td');
        const yestEl = document.getElementById('yest');
        const ysdEl = document.getElementById('ysd');
        const tomEl = document.getElementById('tom');
        const tmdEl = document.getElementById('tmd');

        if (todayEl) todayEl.textContent = now.format('HH:mm');
        if (secsEl) secsEl.textContent = now.format('ss');
        if (tdEl) tdEl.textContent = now.format('MMM YYYY');
        if (yestEl) yestEl.textContent = yesterday.format('HH:mm');
        if (ysdEl) ysdEl.textContent = yesterday.format('MMM YYYY');
        if (tomEl) tomEl.textContent = tomorrow.format('HH:mm');
        if (tmdEl) tmdEl.textContent = tomorrow.format('MMM YYYY');
    }

    afterMount() {
        this.updateClock();
        this.interval = setInterval(() => this.updateClock(), 1000);
    }

    destroy() {
        if (this.interval) {
            clearInterval(this.interval);
        }
        super.destroy();
    }
}

export default Clock;