const template = document.createElement('template');
template.innerHTML = `
<style>

.slider-bottom > div {
    position: fixed;
    height:150px;
    width:100vw;
    z-index:1000;
}

.slider-bottom > div > div{
    height: 100%;
    width: 100%;
    background: white;
    position: relative;
    transform: translateY(-100%);
    transition: transform 1s;
    box-shadow: 0 -2px 6px rgba(0, 0, 0, .6);   
}

.slider-bottom  > div[data-collapse=true] > div {
    transform: translateY(0%);
}

.slider-bottom  a{
    position: absolute;
    display: inline-block;
    right: 250px;
    background: white;
    transform: translateY(-100%);
    padding: 5px 25px;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    box-shadow: 0 -4px 4px rgba(0, 0, 0, .1);   
}
.slider-bottom svg{
    height: 100%;
    width: 100%;
}
</style>
  <div data-collapse="true" > 
        <div class="pnlAltitude">
               <a href="#" ><i class="far fa-plane"></i></a>
        <div>    
    </div>
`;

export default class SliderBottom extends HTMLElement {


    get graphInnerHeight() {
        return this._graphInnerHeight;
    }
    set graphInnerHeight(value){
        this._graphInnerHeight = value;
    }
    constructor() {
        super();
        this.appendChild(template.content.cloneNode(true));
        this.graphInnerHeight =140;
        this.paddingX = 50;
        this.querySelector("a").addEventListener("click", function (e) {
            e.preventDefault();
            var slider = this.querySelector("div[data-collapse]")
            slider.setAttribute("data-collapse", slider.getAttribute("data-collapse") !=="true");
        }.bind(this));
    }

    connectedCallback() {
        const paddingTop = 10;
        var svg = d3.select(".pnlAltitude").append("svg");
        svg.append("g").attr("transform", "translate(50," + paddingTop + ")").attr("id", "groupYAxisLeft");
        svg.append("g").attr("transform", "translate(" + (window.innerWidth - this.paddingX) + "," + paddingTop + ")").attr("id", "groupYAxisRight");
        svg.append("g").attr("transform", "translate(0," + paddingTop + ")").attr("id", "groupLines");
        svg.append("g").attr("transform", "translate(50," + paddingTop + ")").attr("id", "groupPistes");

    }
    /* async doi attendre que les données pistes arrivent*/
    updateAltitude(){
        const maxAltitude = document.querySelector("panel-pistes").maxAltitude;
        var yScale = d3.scaleLinear().domain([0,maxAltitude]).range([this.graphInnerHeight, 0]);
        d3.select("#groupYAxisLeft").call( d3.axisLeft().scale(yScale))
        d3.select("#groupYAxisRight").call( d3.axisRight().scale(yScale))

        d3.select("#groupLines").selectAll("line")
            .data(yScale.ticks())
            .enter()
            .append("line")
            .attr("stroke", "rgba(204,204,204,.3)")
            .attr("x1", this.paddingX)
            .attr("x2", (window.innerWidth - this.paddingX))
            .attr("y1", d =>  yScale(d) )
            .attr("y2", d =>yScale(d));
    }
}
