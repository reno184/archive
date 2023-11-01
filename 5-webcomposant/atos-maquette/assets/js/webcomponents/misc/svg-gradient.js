const template = document.createElement('template');

template.innerHTML = `
<style>
.svg-gradient{
}
</style>
<svg>
<defs >
<linearGradient id="redGradient" >
<stop offset="0%" stop-color="red" ></stop>
<stop offset="100%" stop-color="black" ></stop>
</linearGradient>
<linearGradient id="goldGradient" >
<stop offset="0%" stop-color="yellow" ></stop>
<stop offset="100%" stop-color="black" ></stop>
</linearGradient>
<linearGradient id="blueGradient" >
<stop offset="0%" stop-color="blue" ></stop>
<stop offset="100%" stop-color="black" ></stop>
</linearGradient>
</defs>
</svg>
`;

export default class SvgGradient extends HTMLElement {
    static get observedAttributes() {
        return ['data-index'];
    }


    constructor() {
        super();
        this.appendChild(template.content.cloneNode(true));
    }

    connectedCallback () {

    }

    attributeChangedCallback (name, oldValue, newValue) 	{
      /*  d3.selectAll("#svgGradient")
            .transition()
            .attr("x1", "100%")
            .attr("y1", "0%")*/
    }

}
