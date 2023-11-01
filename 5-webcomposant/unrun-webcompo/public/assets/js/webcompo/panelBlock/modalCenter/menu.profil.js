const template = document.createElement('template');

template.innerHTML = `
<style>
.menu-profil  ul li {
    font-size: 1.2rem;
    line-height: 1.6;
  }
  
</style>
<div>
<ul>
<li><a href="#">RGBD</a></li>
</ul>
</div>
`;

export default class MenuProfil extends HTMLElement {

    constructor() {
        super();
        this.appendChild(template.content.cloneNode(true));
    }

    connectedCallback() {
        document.querySelector("modal-center").setAttribute("data-height", this.getBoundingClientRect().height + 40);
    }
}
