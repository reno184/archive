const template = document.createElement('template');
template.innerHTML = `
<style>

</style>
`;

/*
- update tab get data
- udpate setting

 */

export default class SvgScene extends HTMLElement {

    constructor() {
        super();
        this.appendChild(template.content.cloneNode(true));
    }

    connectedCallback() {
        const map = document.querySelector("map-layer").getMap();
        d3.select(map.getPanes().svgPane).append("svg").attr("id", "svgSceneMap")
            .append("g")
            .attr("id", "groupSVGMap")
            .style("background", "rgba(255,0,0,.9")
            .attr("class", "leaflet-zoom-hide");

        this.updateViewPort()
    }

    updateViewPort() {
        const map = document.querySelector("map-layer").getMap();
        let topLeft = map.latLngToLayerPoint(map.getBounds().getNorthWest());
        let svg = d3.select("#svgSceneMap");
        svg.style("width", map.getSize().x + "px")
            .style("height", map.getSize().y + "px")
            .style("left", topLeft.x + "px")
            .style("top", topLeft.y + "px")
            .style("background", "rgba(0,0,0,.1)");

        let gMap = d3.select("#groupSVGMap");
        gMap.attr("transform", "translate(" + -topLeft.x + "," + -topLeft.y + ")");

        let gPiste = d3.select("#groupPistes");
        gPiste.attr("transform", `translate(${  (parseInt(topLeft.x)-50)*-1 },10)`);
    }


    /* after zoom only */
    updatePiste() {
        let line = d3.line();
        d3.selectAll(".upside-text").attr("x", function(d){
            let tn = d3.select(this).attr('tn')
            let newXpos = document.getElementById("card_" + tn).x;
            return newXpos + 100
        }).attr("y", function(d,i){
            // i++
            i=1
            let tn = d3.select(this).attr('tn')
            let index = parseInt(d3.select(this).attr('index'))
            let newYpos = document.getElementById("card_" + tn).y;
            return newYpos - (40* i)
        })

        d3.selectAll(".upside-mask").attr("x", function(d){
            let tn = d3.select(this).attr('tn')
            let newXpos = document.getElementById("card_" + tn).x;
            return newXpos + 100
        }).attr("y", function(d,i){
            // i++
            i=1
            let tn = d3.select(this).attr('tn')
            let newYpos = document.getElementById("card_" + tn).y;
            let newHeight = document.getElementById("text_tn_" + tn).getBoundingClientRect().height
            return newYpos -(40*i)-newHeight
        })

        d3.selectAll(".downside-text").attr("x", function(d){
            let tn = d3.select(this).attr('tn')
            let newXpos = document.getElementById("card_" + tn).x;
            return newXpos + 100
        }).attr("y", function(d,i){
            // i++
            i=1
            let tn = d3.select(this).attr('tn')
            let newYpos = document.getElementById("card_" + tn).y;
            let index = parseInt(d3.select(this).attr('index'))
            return newYpos - (40* i)

        });

        d3.selectAll(".altitude-circle").attr("cx", function(d){
            let tn = d3.select(this).attr('tn')
            let newXpos = document.getElementById("card_" + tn).x;
            return newXpos - 50
        });

        d3.selectAll(".altitude-poteau").attr("d", function(d){
            let tn = d3.select(this).attr('tn')
            let startY = parseInt(d3.select(this).attr('startY'))
            let endY = parseInt(d3.select(this).attr('endY'))
            let newXpos = document.getElementById("card_" + tn).x;
            return  line([[newXpos-50, startY], [newXpos-50,endY]])
        });

        d3.selectAll(".piste-path").attr("d", function(d,i){
           // i++
            i=1
             let tn = d3.select(this).attr('tn')
            let posx = document.getElementById("card_" + tn).x;
            let posy =document.getElementById("card_" + tn).y;
            return line([[posx, posy], [posx + 40, posy - (40 * i)], [posx + 200, posy - (40 * i)]]);
        });
    }


    /* Permet d'évtier les superpositionsde text, seul le  change pas besoin d'actualisé les poteaux altitudes */
    visiblityPistes() {
        let line =d3.line();
        d3.selectAll(".piste-path")
            .transition()
            .attrTween('d', function (d, i) {
          i++
                let previous = d3.select(this).attr('d');
                let tn = d3.select(this).attr('tn')
                let posx = document.getElementById("card_" + tn).x;
                let posy =document.getElementById("card_" + tn).y;
                let current = line([[posx, posy], [posx + 40, posy - (40 * i)], [posx + 200, posy - (40 * i)]]);
                return d3.interpolatePath(previous, current);
            });

        d3.selectAll(".downside-text")
            .attr('y', function (d, i) {
                return parseInt(d3.select(this).attr('y'));
            })
            .transition()
            .attr('y', function (d, i) {
                return parseInt(d3.select(this).attr('y'))-(40*i);
            });

        d3.selectAll(".upside-text")
            .attr('y', function (d, i) {
                return parseInt(d3.select(this).attr('y'));
            })
            .transition()
            .attr('y', function (d, i) {
                return parseInt(d3.select(this).attr('y'))-(40*i);
            });

        d3.selectAll(".upside-mask")
            .attr('y', function (d, i) {
                return parseInt(d3.select(this).attr('y'));
            })
            .transition()
            .attr('y', function (d, i) {
                return parseInt(d3.select(this).attr('y'))-(40*i);
            });
    }


    updatePCI() {
        d3.select("#groupSVGMap").selectAll("circle")
            .attr("cx", d => document.querySelector("map-layer").projectPoint(d.lat, d.lng).x)
            .attr("cy", d => document.querySelector("map-layer").projectPoint(d.lat, d.lng).y);
    }

    /*    togglePiste() {
            this.updateViewPort();
            const line = d3.line();
            let pistesArray = document.querySelector("panel-pistes").getPisteArray();
            for (let i = 0; i < pistesArray.length; i++) {
                let tn = pistesArray[i];
                let card = document.getElementById("card_" + tn);
                let elem = document.createElement("div", {is: "svg-piste"});
                elem.setAttribute("data-tn", tn)
                elem.setAttribute("data-index", i);
                elem.setAttribute("data-x", card.x);
                elem.setAttribute("data-y", card.y);
                elem.setAttribute("data-color", card.color);
                elem.setAttribute("data-altitude", card.altitude);
                document.getElementById("groupSVGMap").appendChild(elem);
            }
        }*/

    addPCI(lat, lng) {
        this.circleArray.push({lat: lat, lng: lng})
        /* d3.select("#groupSVGMap").selectAll("circle")
             .data(this.circleArray)
             .enter()
             .append("circle")
             .attr("stroke", "black")
             .attr("fill", "brown")
             .attr("fill-opacity", .8)
             .attr("r",  5)
             .attr("cx",d=> document.querySelector("map-layer").projectPoint(d.lat, d.lng).x)
             .attr("cy", d=>  document.querySelector("map-layer").projectPoint(d.lat, d.lng).y);*/


        for (let i = 0; i < this.circleArray.length; i++) {
            let elem = document.createElement("div", {is: "svg-pci"});
            elem.setAttribute("data-lat", this.circleArray[i].lat);
            elem.setAttribute("data-lng", this.circleArray[i].lng);
            document.getElementById("groupSVGMap").appendChild(elem);
        }

        this.updateViewPort();
    }

    removePCI(id) {

    }


}
