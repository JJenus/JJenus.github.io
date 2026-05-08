import Component from '../core/Component.js';
import featuresData from '../data/features.js';

class Features extends Component {
    constructor() {
        super('features-container');
        this.features = featuresData;
    }

    template() {
        const ctaFeature = this.features.find(f => f.isCTA);
        const otherFeatures = this.features.filter(f => !f.isCTA);

        return `
            ${ctaFeature ? this.createCTAFeature(ctaFeature) : ''}
            ${otherFeatures.map(feature => this.createFeatureSection(feature)).join('')}
        `;
    }

    createCTAFeature(feature) {
        return `
            <section class="slice delimiter-top delimiter-bottom" aria-label="Customer satisfaction promise">
                <div class="container">
                    <div class="d-flex align-items-center justify-content-center">
                        <div>
                            <span class="btn btn-${feature.color} btn-icon-only btn-zoom--hover rounded-circle" aria-hidden="true">
                                <span class="btn-inner--icon">
                                    <i class="fas ${feature.icon}"></i>
                                </span>
                            </span>
                        </div>
                        <div>
                            <h4 class="ml-3 mb-0">${feature.title}</h4>
                        </div>
                    </div>
                </div>
            </section>
        `;
    }

    createFeatureSection(feature) {
        const isImageRight = feature.imagePosition === 'right';
        const orderClasses = isImageRight 
            ? { text: 'order-lg-1', image: 'order-lg-2' }
            : { text: 'order-lg-2', image: 'order-lg-1' };
        
        const mailtoLink = `mailto:${feature.linkEmail}?&subject=${feature.linkSubject}&body=${feature.linkBody}`;

        return `
            <section class="slice slice-lg" aria-label="${feature.title}">
                <div class="container">
                    <div class="row row-grid justify-content-around align-items-center">
                        <div class="col-lg-5 ${orderClasses.text}">
                            <div class="${isImageRight ? '' : 'pr-lg-4'}">
                                <h5 class="h3">${feature.title}</h5>
                                <p class="lead my-4">${feature.description}</p>
                                <a href="${mailtoLink}" 
                                   class="link link-underline-${isImageRight ? 'info' : 'warning'} font-weight-bold"
                                   aria-label="Contact about ${feature.title}">
                                    ${feature.linkText}
                                </a>
                            </div>
                        </div>
                        <div class="col-lg-6 ${orderClasses.image}">
                            <img alt="${feature.title} illustration" 
                                 src="${feature.image}" 
                                 class="img-fluid img-center"
                                 loading="lazy"
                                 width="500"
                                 height="400" />
                        </div>
                    </div>
                </div>
            </section>
        `;
    }
}

export default Features;