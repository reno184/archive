
import {latDMS, lngDMS} from "../../helpers.js";

const template = document.createElement('template');
template.innerHTML = `
<style>
.context-menu  > div {
        position: fixed;
        height: 100vh;
        width: 100vw;
        background: transparent;
       /* background: rgba(0,0,0,.1);*/
}
 .context-menu  ul{
     position:absolute;
     padding: 10px 5px!important;
     z-index: 401;
     border: solid 1px grey;
     border-radius: 5px;
     background: white;
     box-shadow: 1px 1px 4px rgba(0,0,0,.1);
}
 .context-menu  strong{
    margin-left: 5px;
 }
</style>
<div style="display:none">
    <ul>
        <li><strong>Lat :</strong><span></span></li>
        <li><strong>Lng :</strong><span></span></li>
    </ul>
</div>
`;

export default class ContextMenu extends HTMLElement {

    constructor() {
        super();
        this.appendChild(template.content.cloneNode(true));
        this._addListeners()
    }

    toggle(e) {
        var unit = document.getElementById("ddlPosition").value;

        if (this.querySelector("div").style.display === 'none') {
            this.querySelector("div").style.display = 'block';
        }
        this.querySelector("ul").style.left = e.containerPoint.x + "px";
        this.querySelector("ul").style.top = e.containerPoint.y + document.getElementById("menuTop").getBoundingClientRect().height + "px";

        var lat =  e.latlng.lat;
        var lng =  e.latlng.lng;
        this.querySelectorAll("span")[0].textContent = unit === 'dms' ? latDMS(lat) : lat;
        this.querySelectorAll("span")[1].textContent = unit === 'dms' ? lngDMS(lng) : lng;
    }

    _addListeners() {
        this.addEventListener("click",this._closeMenu);
        this.addEventListener("contextmenu",this._closeMenu);
    }

    _closeMenu(e) {
        e.preventDefault();
        this.querySelector("div").style.display = "none";
    }
}
