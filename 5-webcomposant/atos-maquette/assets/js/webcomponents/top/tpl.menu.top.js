const template = document.createElement('template');

template.innerHTML = `
  <style>

.menu-top > ul{
    position: relative;
    display: flex;
    z-index: 1;
    margin-bottom: 0;
    flex-direction: row;
    align-items: center;
    border-bottom: solid 1px white;
    background: dodgerblue;
    box-shadow: 0 2px 6px rgba(0, 0, 0, .6);   
}
.menu-top > ul > li{
    position: relative;
    padding: 10px 10px;
    border-right: solid 1px #fff;
    background-image: linear-gradient(royalblue, dodgerblue);
    color: white;
}
.menu-top >ul > li.alert{
   background-image: linear-gradient(#dc1212, red);
}
.menu-top > ul > li:hover{
   color: inherit;
   background-image: linear-gradient(#eee, white);
}
.menu-top i{
  margin: 0 5px;
}
.menu-top > ul > li > div.submenu{
    position: absolute;
    left: -1px;
    margin-top: 10px;
    z-index: 1;
    border: solid 1px white;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    background-image: linear-gradient(white, #eee);
    box-shadow: 2px 2px 3px rgba(0, 0, 0, .1);
    color: black;
    opacity: 0;
    visibility: hidden;
    transition: opacity 1s;
}
.menu-top ul > li:hover > .submenu, .menu-top ul > li.test > .submenu{
    opacity: 1;
    visibility: visible;
}
.menu-top .badge{
    border: solid 1px white;
    border-radius: 50%;
    padding: 0px 5px;
    font-size: .8rem;
    font-weight: bold
}
</style>

  <ul id="menuTop">
       <li>
       <a href="#">
       <i class="far fa-tachometer-alt-slowest" ></i>
        <span>Tableau de bord</span>
       </a>
       </li>
       <li>
       <a href="#">
       <i class="far fa-chart-network" ></i>
       <span>Réseau</span>
       </a>
       <div class="submenu submenu-network" is="submenu-network" ></div>
       </li>
       <li>
       <a href="#">
       <i class="far fa-play-circle" ></i>
       <span>Préparation mission</span>
       </a>
       <div class="submenu submenu-mission" is="submenu-mission" ></div>
       </li>
       <li>
       <a href="#">
       <i class="far fa-truck" ></i>
       <span>PCI  info</span>
       </a>
       <div class="submenu submenu-pci" is="submenu-pci" ></div>
       </li>
       <li>
       <a href="#">
       <i class="far fa-wifi" ></i>
       <span>Charges utiles</span>
       </a>
       <div class="submenu submenu-chargeutile" is="submenu-chargeutile" ></div>
       </li>
       <li><a href="#"><i class="far fa-cogs" ></i><span>Réglages</span></a>
       <div class="submenu submenu-setting" is="submenu-setting" ></div>
       </li>
       <li  ><a href="#"><i class="far fa-stop-circle fa-lg" ></i></a></li>
       <li class="alert"><a href="#">
            <span>Alertes</span>
            <span class="badge">2</span>
       </a>
        <div class="submenu submenu-alerte"  is="submenu-alerte"  ></div>
        </li>
    </ul>

`;

export default class MenuTop extends HTMLElement {

    constructor() {
        super();
        this.appendChild(template.content);
    }

}
