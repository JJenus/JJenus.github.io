import personalData from '../data/personal.js';

class SEO {
    static init() {
        this.setDocumentTitle();
        this.updateMetaTags();
        this.addStructuredData();
        console.log('[+] SEO initialized');
    }

    static setDocumentTitle() {
        document.title = personalData.seo.title;
    }

    static updateMetaTags() {
        const { seo } = personalData;
        
        const setMeta = (name, content, isProperty = false) => {
            const attr = isProperty ? 'property' : 'name';
            let meta = document.querySelector(`meta[${attr}="${name}"]`);
            if (!meta) {
                meta = document.createElement('meta');
                meta.setAttribute(attr, name);
                document.head.appendChild(meta);
            }
            meta.content = content;
        };

        setMeta('description', seo.description);
        setMeta('keywords', seo.keywords);
        setMeta('author', seo.author);
        setMeta('og:title', seo.title, true);
        setMeta('og:description', seo.description, true);
        setMeta('og:image', seo.ogImage, true);
        setMeta('og:type', seo.ogType, true);
        setMeta('og:url', window.location.href, true);
        setMeta('twitter:card', seo.twitterCard);
        setMeta('twitter:title', seo.title);
        setMeta('twitter:description', seo.description);
        setMeta('twitter:image', seo.ogImage);
    }

    static addStructuredData() {
        const data = {
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
        script.textContent = JSON.stringify(data);
        document.head.appendChild(script);
    }
}

export default SEO;