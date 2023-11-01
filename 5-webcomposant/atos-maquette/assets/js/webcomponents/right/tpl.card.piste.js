import {latDMS, lngDMS} from "../../helpers.js";


const template = document.createElement('template');

template.innerHTML = `
<style>

 .card-piste > section{
  margin: 5px 15px;
  position: relative;
   border: solid 1px black;
   border-radius: 5px;
   background: #fefefe;
 }
 
.card-piste > section .icon-toggle{
  transition: transform .7s;
}
  
.card-piste > section[data-collapse=false] .icon-toggle {
    transform: rotateX(0deg);
    }
.card-piste > section[data-collapse=true] .icon-toggle {
    transform: rotateX(-180deg)
}
.card-piste  > section > main{
    padding: 10px;
}

.card-piste > section[data-collapse=true] > main{
  max-height: 0;
  opacity: 0;
   transition: opacity .7s,max-height 1s ;
}
.card-piste  > section[data-collapse=false] > main{
    max-height: 600px;
    opacity: 1;
  transition: opacity .7s linear .3s,max-height 3s ;
}

.card-piste  > section >header{
display: flex;
flex-direction: row;
align-items: center;
background: #ccc;
border-bottom: solid 1px black;
}
.card-piste  > section >header .far{
    text-shadow: 1px 1px 1px rgba(0,0,0,.5);
}

.card-piste > section > header div:nth-child(2){
flex: 1;
padding-left: 10px;
}
.card-piste  > section > header div:nth-child(3){

padding-right: 10px;
}
.card-piste  > section> footer{
    padding: 5px;
    border-top: solid 1px black;
    display:flex ;
    flex-direction: row;
}
.card-piste  > section > footer a{
    margin:0 15px
}
.card-piste  > section > footer a:nth-child(2){
    flex: 1;
    text-align: center;
}

.card-piste .timelap{
  background-image: linear-gradient(dodgerblue, royalblue);
  height: 40px;
  width: 10px;
  transform-origin: 0 100%;
  transition: transform 1s linear;
  animation: timelap 6s infinite;
}

 @keyframes timelap {
        0% {
            transform: scaleY(1.0);
            -webkit-transform: scaleY(1.0);
        }
        100% {
            transform: scaleY(.2);
            -webkit-transform: scaleY(.2);
        }
 }
</style>
<section data-collapse="false">
    <header>
        <div data-role="timelap" class="timelap" ></div>
        <div data-piste="tn"></div>
        <div><i class="far fa-paper-plane" data-piste="color" ></i></div>
    </header>                          
    <main>
        <div>
            <strong style="margin-right: 10px">Temps :</strong>
            <span data-piste="duree" ></span>
        </div>
        <div>
            <strong style="margin-right: 10px">Lat:</strong>
            <span data-piste="lat" ></span>
        </div>
        <div>
            <strong style="margin-right: 10px">Long:</strong>
            <span  data-piste="lng" ></span>
        </div>
        <div>
            <strong style="margin-right: 10px">Alt:</strong>
            <span  data-piste="altitude" ></span>
        </div>
        <div>
            <strong style="margin-right: 10px">Vitesse:</strong>
            <span  data-piste="vitesse" >420 km/h</span>
        </div>
    </main>
    <footer> 
        <a href="#" data-role="piste-select" ><i class="far fa-map-marked-alt "  ></i></a>
        <a href="#"><i class="far fa-wifi "></i></a>
        <a href="#" data-role="piste-toggle"><i class="far fa-chevron-up icon-toggle"></i></a>
    </footer>
</section>
`;

export default class CardPiste extends HTMLDivElement {

    constructor() {
        super();
        this.appendChild(template.content.cloneNode(true));
    }

    getOriginX(target) {
        return document.getElementById(target).getBoundingClientRect().x;
    }

    getOriginY(target) {
        return document.getElementById(target).getBoundingClientRect().y;
    }

    getWidth(target) {
        return document.getElementById(target).getBoundingClientRect().width;
    }

    getHeight(target) {
        return document.getElementById(target).getBoundingClientRect().height;
    }



    get checked() {
        return this._checked;
    }

    set checked(value) {
        this._checked = value;
    }

    get tn() {
        return this._tn;
    }

    set tn(value) {
        this._tn = value;
    }

    get color() {
        return this._color;
    }

    set color(value) {
        this._color = value;
    }

    get lat() {
        return document.querySelector("[is=submenu-setting]").unitLatlng === "dms" ? latDMS(this._lat) : this._lat;
    }

    set lat(value) {
        this._lat = value;
    }

    get lng() {
        return document.querySelector("[is=submenu-setting]").unitLatlng === "dms" ? lngDMS(this._lng) : this._lng;
    }

    set lng(value) {
        this._lng = value;
    }

    get altitude() {
        return this._altitude / parseFloat(document.querySelector("[is=submenu-setting]").unitAltitude.coef);
    }

    set altitude(value) {
        this._altitude = value;
    }

    get x() {
        return  document.querySelector("map-layer").projectPoint(this.lat, this.lng).x
    }
    get y() {
        return document.querySelector("map-layer").projectPoint(this.lat, this.lng).y
    }

    connectedCallback() {

        this.checked = false;
        this.setAttribute("id", "card_" + this.tn);
        this.querySelector("[data-piste=tn]").textContent = this.tn;
        this.querySelector("[data-piste=color]").style.color = this.color;
        this.querySelector("[data-piste=duree]").textContent = "4:30:00";
        this.querySelector("[data-piste=vitesse]").textContent = "1000";
        this.renderAltitude();
        this.renderLatLng();

        this.querySelector("[data-role=piste-select]").addEventListener("click", () => {
            this.checked = !this.checked;
            if(this.checked){
                //ajout piste
                this.addSVGPiste();
               // document.querySelector("panel-pistes").updateTN(this.tn)
            }else{
                //suppression piste
                this.removeSVGPiste()
            }

        });

        this.querySelector("[data-role=piste-toggle]").addEventListener("click", () => {
            const section = this.querySelector("section");
            section.setAttribute("data-collapse", section.dataset.collapse !== "true");
        });

    }

    renderAltitude() {
        const coefAltitude  = document.querySelector("[is=submenu-setting]").unitAltitude;
        this.querySelector("[data-piste=altitude]").textContent = (this.altitude / coefAltitude.coef) + "" + coefAltitude.lib ;
    }

    renderLatLng() {
        this.querySelector("[data-piste=lat]").textContent = this.lat;
        this.querySelector("[data-piste=lng]").textContent = this.lng;
    }
    /* Permet d'ajouter une piste (svg) à la scene */
    addSVGPiste(){
        var line = d3.line();

        d3.select("#groupSVGMap").append("path")
            .attr("id", "path_" + this.tn)
            .attr("class","piste-path")
            .attr("tn", this.tn)
            .attr("index", 1)
            .attr("fill", "transparent")
            .attr("stroke-width", 2)
            .attr("stroke", "black")
            .attr("stroke", `url(#${this.color}Gradient)`)
            .attr("d", line([[this.x, this.y], [this.x, this.y], [this.x, this.y]]))
            .transition()
            .attr("d", line([[this.x, this.y], [this.x + 40, this.y - 40], [this.x + 40, this.y - 40 ]]))
            .transition()
            .delay(500)
            .attr("d", line([[this.x, this.y], [this.x + 40, this.y - 40 ], [this.x + 200, this.y - 40]]))


        d3.select("#groupSVGMap").append("text")
            .attr("clip-path", ("url(#mask_" + this.tn + ")"))
            .attr("tn", this.tn)
            .attr("index", 1)
            .attr("class", "upside-text")
            .text(this.tn)
            .attr("id","text_tn_" + this.tn)
            .style("font-size","1.1rem")
            .attr("dy", "-.1em")
            .attr("x",  (this.x+ 100))
            .attr("y",this.y-40)

        d3.select("#groupSVGMap")
            .append("clipPath")
            .attr("id", "mask_" + this.tn)
            .append("rect")
            .attr("tn", this.tn)
            .attr("index", 1)
            .attr("class", "upside-mask")
            .attr("height", this.getHeight("text_tn_" + this.tn))
            .attr("width",this.getWidth("text_tn_" + this.tn))
            .attr("y",this.y-40)
            .attr("x", this.x+ 100 )
            .transition()
            .delay(1000)
            .duration(1000)
            .attr("y",this.y-40-this.getHeight("text_tn_" + this.tn));

        d3.select("#groupSVGMap").append("text")
            .text("Eclairable")
            .attr("tn", this.tn)
            .attr("index", 1)
            .attr("id","text_status_" +this.tn)
            .attr("class", "downside-text")
            .style("font-size",".7rem")
            .attr("dy", ".9em")
            .attr("x",  (this.x+ 100))
            .attr("y",this.y-40);

        var sliderBottom  =  document.querySelector("slider-bottom")
        const maxAltitude = document.querySelector("panel-pistes").maxAltitude;
        var scaleY =  d3.scaleLinear().domain([0, maxAltitude]).range([sliderBottom.graphInnerHeight, 0]);

        d3.select("#groupPistes")
            .attr("fill", "transparent")
            .attr("stroke-width", 1)
            .attr("stroke", "black")

        d3.select("#groupPistes").append("path")
            .attr("tn", this.tn)
            .attr("id","poteau_"+this.tn)
            .attr("class","altitude-poteau")
            .attr("startY",150)
            .attr("endY",scaleY(this.altitude))
            .attr("d", line([[this.x-50, 150], [this.x-50, 150]]))
            .transition()
            .attr("d", line([[this.x-50, 150], [this.x-50,scaleY(this.altitude)]]))

        d3.select("#groupPistes").append("circle")
            .attr("r",5)
            .attr("id","circle_"+this.tn)
            .attr("tn", this.tn)
            .attr("class","altitude-circle")
            .attr("cx",this.x-50)
            .attr("cy",scaleY(this.altitude))
            .attr("fill", `url(#${this.color}Gradient)`)

//poteau-circle
    }
    /* Permet de supprimer une piste (svg) à la scene */
    removeSVGPiste(){
        document.getElementById("groupPistes").removeChild(document.getElementById("circle_"+this.tn));
        document.getElementById("groupPistes").removeChild(document.getElementById("poteau_"+this.tn));

        document.getElementById("groupSVGMap").removeChild(document.getElementById("path_"+this.tn));
        document.getElementById("groupSVGMap").removeChild(document.getElementById("text_tn_"+this.tn));
        document.getElementById("groupSVGMap").removeChild(document.getElementById("text_status_"+this.tn));
        document.getElementById("groupSVGMap").removeChild(document.getElementById("mask_"+this.tn));



    }


}
