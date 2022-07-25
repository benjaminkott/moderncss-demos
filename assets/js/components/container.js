import { LitElement, html, unsafeCSS } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

class Container extends LitElement {

    static get properties() {
        return {
            content: { type: String },
            styles: { type: String }
        };
    }

    render() {
        return html`
            <style>${unsafeCSS(this.styles)}</style>
            ${unsafeHTML(this.content)}
        `;
    }
}
customElements.define('demo-container', Container);
