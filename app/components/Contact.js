import Component from '../core/Component.js';
import personalData from '../data/personal.js';

class Contact extends Component {
    constructor() {
        super('contact-container');
        this.data = personalData;
    }

    template() {
        return `
            <section class="slice slice-lg" aria-labelledby="contact-heading">
                <div class="container">
                    <div class="row justify-content-center align-items-center">
                        <div class="col-lg-8 text-center">
                            <h3 id="contact-heading" class="font-weight-400">
                                Ready to start a project with <span class="font-weight-700">you</span>
                            </h3>
                            <div class="mt-5">
                                <a href="mailto:${this.data.email.business}?&subject=Enquiry%20on%20starting%20a%20project%20&body=Please%20include%20project%20description%20here%20and%20desired%20info." 
                                   class="btn btn-primary rounded-pill hover-translate-y-n3">
                                    Contact me now
                                    <span class="badge badge-pill badge-soft-warning badge-floating border-">with your budget</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        `;
    }
}

export default Contact;