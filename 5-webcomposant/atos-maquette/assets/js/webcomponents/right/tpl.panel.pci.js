

const template = document.createElement('template');

template.innerHTML = `
<style>
.panel-pci  {
    display: flex;
    margin-left: 5px;
    margin-right: 5px;
    justify-content: center;
    border: solid 1px black;
    border-radius: 5px;
    padding: 5px;
}
.panel-pci strong{
display: inline-block;
    margin:10px 0 ;
}
.panel-pci form footer{
    text-align: center;
}
</style>
<div>
<strong>PCI</strong>
    <form>
        <main>
             <div class="form-group">
                <label>lat :</label><input type="text" class="form-control" name="lat" value="43.42699324866588" >
            </div>
            <div class="form-group">
                <label>lng :</label><input type="text" class="form-control" name="lng"  value="5.368194580078125" >
            </div>
        </main>
        <footer>
         <input type="submit" class="btn">
        </footer>
    </form>
    <hr>
    <div style="text-align:center">
            <div class="custom-dropdown" style="width:150px">
        <select style="width:150px" >
        <option value="-1">Sélectionner</option>
            <option value="0">Piste 1</option>
            <option value="1">Piste 2</option>
            <option value="2">Piste 3</option>
        </select>
        </div>
    </div>
    <pre></pre>

</div>
`;

export default class PanelPCI extends HTMLElement {

    get x() {
        return  document.querySelector("map-layer").projectPoint(this.lat, this.lng).x
    }
    get y() {
        return document.querySelector("map-layer").projectPoint(this.lat, this.lng).y
    }

    get lat() {
        return this._lat;
    }

    set lat(value) {
        this._lat = value;
    }

    get lng() {
        return  this._lng;
    }

    set lng(value) {
        this._lng = value;
    }

    constructor() {
        super();
        this.appendChild(template.content);

        this.querySelector("form").addEventListener("submit", (e) => {
            e.preventDefault();
            d3.select("#groupSVGMap").append("circle")
                .attr("stroke", "red")
                .attr("fill", "url(#goldGradient)")
                .attr("fill-opacity", .8)
                .attr("r",  5)
                .attr("cx",document.querySelector("map-layer").projectPoint(lat, lng).x)
                .attr("cy",  document.querySelector("map-layer").projectPoint(lat, lng).y);
        });

        this.querySelector("select").addEventListener("change",  (e)=> {
           var latPiste = document.querySelectorAll(".card-piste")[e.target.value].lat;
            var lngPiste = document.querySelectorAll(".card-piste")[e.target.value].lng;
            var latPCI = this.querySelector("input[type=text]").value;
            var lngPCI =  this.querySelector("input[type=text]").value;
            var point1 = turf.point([lngPCI, latPCI]);
            var point2 = turf.point([lngPiste, latPiste]);
            var from = point1;
            var to = point2;

            var options = {units: 'kilometers'};
            var bearing = turf.bearing(point1, point2, {final: true});
            var distance = turf.distance(from, to, options);
            var distances = {
                km: distance,
                miles: turf.convertLength(distance, "kilometers", "miles"),
                degrees: bearing,
                radians_1: turf.degreesToRadians(bearing)
            };
            this.querySelector("pre").textContent = JSON.stringify(distances, null, 4);
        })
    }


}
