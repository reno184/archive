import {queryString, debounce} from "../../helpers.js";

const template = document.createElement('template');
template.innerHTML = `
<style>

.map-layer .myMap{
   height: 100%;
  width: 100%;
}
.map-layer .myMap:hover{
    cursor: context-menu;
}
.map-layer  .scale {
  background: white;
  text-align: center;
  padding: 5px;
  border-radius: 5px;
  box-shadow: 1px 1px 4px rgba(0, 0, 0, .5);
  border: solid 1px black;
}

</style>

<div style="position: relative;height: 100%;width: 100%">
    <div id="myMap" class="myMap" data-mouse-x="0"   data-mouse-y="0"></div>
    <slider-bottom class="slider-bottom"></slider-bottom>  
</div>
`

export default class TplMap extends HTMLElement {
    get mouseX() {
        return this._mouseX;
    }
    set mouseX(value){
        this._mouseX = value;
    }
    get mouseY() {
        return this._mouseY;
    }
    set mouseY(value){
        this._mouseY = value;
    }

    constructor() {
        super();
        this.appendChild(template.content.cloneNode(true));
        this.map = L.map(document.getElementById("myMap"));
        this.initViewPort();
        this.appendTileLayer();

        this.appendScaleControl();
        this.addListeners();
    }

    initViewPort() {
        const key = queryString('layer') || 'basic';
        const viewList = {
            offline: {
                attribution: '',
                init: {zoom: 9, lat: 43.4856, long: 5.3430}
            },
            satellite: {
                init: {zoom: 9, lat: 43.4856, long: 5.3430}
            },
            basic: {
                init: {zoom: 9, lat: 43.4856, long: 5.3430}
            }
        };
        this.map.setView([viewList[key].init.lat, viewList[key].init.long], viewList[key].init.zoom);
    }

    appendTileLayer() {
        const key = queryString('layer') || 'basic';
        const providerlist = {
            offline: {
                url: 'http://localhost:8080/styles/klokantech-basic/{z}/{x}/{y}.png',
                attribution: ''
            },
            satellite: {
                url: 'https://api.maptiler.com/maps/hybrid/{z}/{x}/{y}.jpg?key=48pmvVjRiTP61E0SMsQ4'
            },
            basic: {
                url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }
        };
        L.tileLayer(providerlist[key].url, {attribution: providerlist[key].attribution}).addTo(this.map);
    }

    getMap(){
        return this.map;
    }

    appendSVGLayer() {
        this.map.createPane('svgPane');
        this.map.getPane('svgPane').style.zIndex = 650;
        this.map.getPane('svgPane').innerHTML = '<svg-scene class="svg-scene"></svg-scene>';
      //  d3.select(this.map.getPanes().svgPane).append("svg").attr("id", "svgMapScene");
    }

    appendScaleControl() {
        const scale = L.control.scale();
        scale.addTo(this.map);
        scale.getContainer().classList.add('scale');
        scale.getContainer().style.bottom = "20px";
        scale.getContainer().style.left = "20px";
    }

    addListeners() {

               this.map.on("zoom", (e) => {
           document.querySelector("svg-scene").updatePiste();
        });

        /* permet de relaceer le viw port et les group des svg */
        this.map.on("move", () => {
            document.querySelector("svg-scene").updateViewPort();
        });


        this.map.addEventListener("mousemove", debounce(function (e) {
            this.mouseX = e.latlng.lat;
            this.mouseY = e.latlng.lng;
                    document.querySelector("nav-bottom").renderMousePosition()
            }.bind(this), 20)
        );

        this.map.addEventListener("contextmenu", function (e) {
            document.querySelector("context-menu").toggle(e);
        });
    }

    renderScale() {
        var unit = document.querySelector("[is=submenu-setting]").unitLatlng;
        if (unit === "m") {
            document.querySelectorAll(".leaflet-control-scale-line")[0].style.display = "none";
            document.querySelectorAll(".leaflet-control-scale-line")[1].style.display = "block";
        } else {
            document.querySelectorAll(".leaflet-control-scale-line")[0].style.display = "none";
            document.querySelectorAll(".leaflet-control-scale-line")[1].style.display = "block";
        }
    }

   projectPoint( x, y) {
         return this.map.latLngToLayerPoint(new L.LatLng(x, y));
    }
    connectedCallback () {
       this.appendSVGLayer();
    }
}

