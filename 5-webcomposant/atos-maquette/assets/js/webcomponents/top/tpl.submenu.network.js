const template = document.createElement('template');

template.innerHTML = `
<style>
.submenu-network ul {
    min-width: 200px
}

.submenu-network li{
    padding: 10px;
    border-top: solid 1px #ccc;
}
.submenu-network li i {
    margin-right: 10px;
}
.submenu-network li:first-of-type{
    border-top: none;
}
</style>
<ul>
  <li><i class="far fa-circle"></i><span>Connexion</span></li>
  <li><i class="far fa-circle"></i><span>PPSRM</span></li>
</ul>

`;

export default class SubMenuNetWork extends HTMLDivElement {

    constructor() {
        super();
        this.appendChild(template.content)
    }
}
