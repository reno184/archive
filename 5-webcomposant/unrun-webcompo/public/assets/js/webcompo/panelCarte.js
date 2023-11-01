const template = document.createElement('template');

template.innerHTML = `
<style>
.panel-carte > div{
    height: 100%;
    width: 100%;
}
</style>
  <home-header class="home-header"></home-header>
  <home-separator class="home-separator"></home-separator>
  <home-main class="home-main"></home-main>
  <home-separator class="home-separator"></home-separator>
  <home-footer class="home-footer"></home-footer>
`;

export default class PanelCarte extends HTMLElement {
    constructor() {
        super();
        this.appendChild(template.content.cloneNode(true));
    }
}
