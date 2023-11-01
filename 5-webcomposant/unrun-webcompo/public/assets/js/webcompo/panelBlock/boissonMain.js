const template = document.createElement('template');

template.innerHTML = `
<style>
.home-main > ul > li {
    
    font-size: 1.2rem;
    text-align: center;
    margin: 5px 0;
    color: white;    
  }
  
</style>
<ul id="ulMain"></ul>
`;

export default class BoissonMain extends HTMLElement {

    static get observedAttributes() {
        return ['data-index'];
    }

    get selectedArticle() {
        return this._selectedArticle;
    }
    set selectedArticle(value){
        this._selectedArticle = value;
    }
    constructor() {
        super();
        this.appendChild(template.content.cloneNode(true));
    }

    attributeChangedCallback (name, oldValue, newValue) 	{

         const articleArray = document.querySelector("carte-loader").carteBoisson.blockList[newValue].articleList;
        var ul = d3.select('#ulMain');
        var ilList = ul.selectAll('li').data(articleArray)

        // new data but not enouph li
        ilList.enter()
            .append('li').html(d => {
                const str = `<a href="#" >${d.libelle}</a>`;
                return str;
            })
            .on("click", (data)=>{
                this.selectedArticle = data;
                document.querySelector("modal-center").setAttribute("data-action", "confirm")
            })
            .style("line-height", "0px")
            .style("opacity", 0)
            .transition()
            .delay(function (d, i) {
                return i * 100;
            })
            .duration(300)
            .style("line-height", "40px")
            .style("opacity", 0)
            .transition()
            .duration(300)
            .delay(function (d, i) {
                return i * 100;
            })
            .style("opacity", 1);

        // remove data
        ilList.exit()
            .style("opacity", 1)
            .transition()
            .delay(function (d, i) {
                return i * 100;
            })
            .duration(300)
            .style("opacity", 0)
            .style("line-height", "40px")
            .transition()
            .style("line-height", "0px")
            .remove();

        // change value into li present on scene
        ilList.merge(ilList)
            .style("opacity", 1)
            .transition()
            .delay(function (d, i) {
                return i * 100;
            })
            .duration(300)
            .style("opacity", 0)
            .text(d => d.libelle)
            .transition()
            .delay(function (d, i) {
                return i * 100;
            })
            .duration(300)
            .style("opacity", 1);
    }
}
