const template = document.createElement('template');

template.innerHTML = `
    <style>
    .submenu-setting  > div{
    display: flex;
    flex-direction: row;
        padding: 5px 10px;
    }
      .submenu-setting  > div >ul{
    display: flex;
    flex-direction: column;
        padding: 5px 10px;
    }
   .submenu-setting  > div >ul:first-child{
        flex: 1;
    }
    
    .submenu-setting ul:nth-child(1) li{
        padding-top: 20px;
        padding-right: 10px;
        text-align: right;
    }
       .submenu-setting ul:nth-child(2) li{
        padding-top: 10px;
    }
</style>
<div>
    <ul>
        <li>Distance</li>
        <li>Angles</li>
        <li>Positions</li>
        <li>Altitude</li>
        <li>Vitesse</li>
    </ul>
<ul>
<li>
<div class="custom-dropdown">
    <select id="ddlDistance"  >
        <option value="m">Miles</option>
        <option value="km">km</option>
    </select>
</div>
</li>
<li>
<div class="custom-dropdown">
  <select >
      <option>°</option>
      <option>rad</option>
  </select>
</div>
</li>
<li>
<div class="custom-dropdown">
  <select  id="ddlPosition">
    <option value="dd">DD</option>
    <option value="dms">DMS</option>
  </select>
</div>
</li>
<li>
<div class="custom-dropdown">
    <select id="ddlAltitude">
         <option value="1" data-lib="m">m</option>
         <option value="3.280839" data-lib="ft">ft</option>
    </select>
</div>
</li>
<li>
<div class="custom-dropdown">
 <select>
     <option>Km/h</option>
     <option>m/s</option>
     <option>knot</option>
 </select>
</div>
</li>
</ul>
</div>

`;

export default class SubMenuSetting extends HTMLDivElement {

    get unitLatlng() {
        return this._unitLatlng;
    }
    set unitLatlng(value){
        this._unitLatlng = value;
    }

    get unitDistance() {
        return this._unitDistance;
    }
    set unitDistance(value){
        this._unitDistance = value;
    }

    get unitAltitude() {
        return this._unitAltitude;
    }
    set unitAltitude(value){
        this._unitAltitude = value;
    }

    constructor() {
        super();
        this.appendChild(template.content.cloneNode(true));
        this.addListeners();
    }

    connectedCallback () {
        this.unitLatlng = "m";
        this.unitDistance = "dd";
        this.unitAltitude = {coef : 1, lib : "m"};
    }

    addListeners() {

        document.getElementById("ddlPosition").addEventListener("change",  (e)=> {
            this.unitLatlng = e.target.value;
            document.querySelectorAll("[is=card-piste]").forEach((elem)=>elem.refreshlatLng());
            document.querySelector("nav-bottom").renderMousePosition();
        });

        document.getElementById("ddlDistance").addEventListener("change",  (e)=> {
            this.unitDistance =e.target.value;
            document.querySelector("map-layer").renderScale()
        });

        /*
            Sur le change de l'altitude
             - Piste-card altitude card
             - Pistes change l'altitude max (async)
             - Panel altitude axeY (right et left) (async)
             - Panel altitude text des pistes
        */
        document.getElementById("ddlAltitude").addEventListener("change",  (e)=> {

            this.unitAltitude =  {coef : parseFloat(e.target.value), lib : e.target.querySelector("option:checked").dataset.lib};

            document.querySelectorAll("[is=card-piste]").forEach((elem)=>elem.renderAltitude());
            document.querySelector("panel-pistes").debugAltitudeMax();
            //document.querySelector("slider-bottom").renderScaleY();
        });
    }
}
