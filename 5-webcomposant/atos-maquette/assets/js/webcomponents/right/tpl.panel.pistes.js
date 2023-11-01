const template = document.createElement('template');

template.innerHTML = `
    <div>
        <span>Altitude max : </span>
        <strong></strong>
    </div>
    <button id="btnVisiblity" >Visibility</button>
`;
/*

* */
export default class PanelPistes extends HTMLElement {

    get maxAltitude() {
        return this._maxAltitude;
    }
    set maxAltitude(value){
        this._maxAltitude = value;
    }

    constructor() {
        super();
        this.appendChild(template.content.cloneNode(true));

        fetch("http://localhost:4000/pistes").then((response)=> {
            response.json().then((datas)=> {

                for (var i = 0; i < datas.length; i++) {
                    //        var card = document.createElement("card-piste", { is: "card-piste" }
                    var card = document.createElement("div", { is: "card-piste" });
                    card.setAttribute("is","card-piste")
                    card.setAttribute("class","card-piste");
                    card.tn = datas[i].tn;
                    card.color = datas[i].color;
                    card.lat = datas[i].lat;
                    card.lng = datas[i].lng;
                    card.altitude = datas[i].altitude;
                    this.append(card)
                }
                this.updateAltitudeMax();
                this._renderAltitudeMax();
                document.querySelector("slider-bottom").updateAltitude();
            });
        });

        this.querySelector("#btnVisiblity").addEventListener("click", function () {
            document.querySelector("svg-scene").visiblityPistes()
        });
    }

    _renderAltitudeMax(){
        this.querySelector("strong").textContent = parseInt(this.maxAltitude)  +" "+  document.querySelector("[is=submenu-setting]").unitAltitude.lib;
    }
    /*
        Prend l'altitude max de toutes les card piste sélectionnée ou non
     */
    updateAltitudeMax(){
        var temp = [];
        const unitAltitude  = document.querySelector("[is=submenu-setting]").unitAltitude;
        document.querySelectorAll("[is=card-piste]").forEach(elem =>{
            temp.push(elem.altitude / unitAltitude.coef);
        });
        this.maxAltitude =   d3.max(temp);
    }



}
