import {latDMS, lngDMS} from "../../helpers.js";

const template = document.createElement('template');

template.innerHTML = `
<style>
    .menu-bottom ul{
        display: flex;
        position: relative;
        width: 100vw;
        margin-bottom: 0;
        border-top: solid 1px white;
        background: dodgerblue;
        /*box-shadow: 0 -2px 6px rgba(0, 0, 0, .6);   */
    }
    
    .menu-bottom li{
            color:white ;
            display: inline-block;
            padding: .5rem 1rem;;
    }
</style>
   
    <ul>
        <li>Avantix</li>
        <li>
            <small><i class="far fa-spinner fa-spin"></i></small>
        </li>
        <li id="txtTimer">
            <i class="far fa-spinner fa-spin"></i>
        </li>
    </ul>
`;

export default class NavBottom extends HTMLElement {

    constructor() {
        super();
        this.appendChild(template.content);
        setInterval(() => {
            this._renderTimer();
        }, 1000);
    }

    _renderTimer() {
        document.getElementById("txtTimer").textContent = new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getSeconds()
    }

    renderMousePosition () {
        var unit = document.querySelector("[is=submenu-setting]").unitLatlng;
        var map = document.querySelector("map-layer");
        var lat = unit === "dd" ? map.mouseX :  latDMS( map.mouseX);
        var lng = unit === "dd" ? map.mouseY :  lngDMS( map.mouseY);
        this.querySelector("small").textContent = `Lat : ${lat} Lon :  ${lng}`;
    }
}
