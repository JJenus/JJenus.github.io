import Component from '../core/Component.js';
import toolsData from '../data/tools.js';

class Tools extends Component {
    constructor() {
        super('tools-container');
        this.tools = toolsData;
    }

    template() {
        return `
            <section class="slice slice-lg" aria-labelledby="tools-heading">
                <div class="container">
                    <div class="mb-5 text-center">
                        <h1 class="mb-4">
                            <span class="badge badge-soft-success w-75 badge-pill badge-lg">
                                My Tools
                            </span>
                        </h1>
                        <h3 id="tools-heading" class="mt-5 h4">Maintainable procedures</h3>
                        <div class="fluid-paragraph mt-3">
                            <p class="lead lh-180">
                                Builds from simple to more complex web applications, 
                                ranging from blogs to e-commerce that can be simply updated.
                            </p>
                        </div>
                    </div>
                    <div class="row">
                        ${this.tools.map((tool, index) => this.createToolCard(tool, index)).join('')}
                    </div>
                </div>
            </section>
        `;
    }

    createToolCard(tool, index) {
        return `
            <div class="col-lg-4 mb-4">
                <article class="card hover-translate-y-n10 hover-shadow-lg p-2 h-100"
                         itemscope 
                         itemtype="https://schema.org/Thing">
                    <div class="card-body">
                        <div class="pb-5">
                            <div class="icon" aria-hidden="true">
                                <i class="${tool.icon}"></i>
                            </div>
                        </div>
                        <h5 class="font-weight-bold" itemprop="name">${tool.name}</h5>
                        ${tool.codeExample ? this.getCodeExample(tool) : ''}
                        <p class="mt-2 mb-0" itemprop="description">
                            ${tool.description}
                        </p>
                    </div>
                </article>
            </div>
        `;
    }

    getCodeExample(tool) {
        const mobileCode = tool.codeExample.replace('at no cost', '<br>&emsp; added at no cost');
        
        return `
            <div style="overflow: auto;" class="mt-2 bg-dark p-2 rounded text-info mb-0" aria-label="${tool.name} code example">
                <code>
                    <span class="d-md-inline d-none">${tool.codeExample}</span>
                    <span class="d-md-none" aria-hidden="true">${mobileCode}</span>
                </code>
            </div>
        `;
    }
}

export default Tools;