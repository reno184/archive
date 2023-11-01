const template = document.createElement('template');

template.innerHTML = `
<style>
.submenu-chargeutile ul {
    min-width: 200px
}
.submenu-chargeutile li{
    padding: 10px;
    border-top: solid 1px #ccc;
}
.submenu-chargeutile li i {
    margin-right: 10px;
}
.submenu-chargeutile li:first-of-type{
    border-top: none;
}
</style>
<ul>
  <li><i class="far fa-circle"></i><span>Connexion</span></li>
  <li><i class="far fa-circle"></i><span>Etat système</span></li>
</ul>
    `;

export default class SubMenuChargeUtile extends HTMLDivElement {

    constructor() {
        super();
        this.appendChild(template.content)
    }

}
