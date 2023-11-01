const template = document.createElement('template');

template.innerHTML = `
<style>
.home-footer  div{
color: white;
    text-align: center;
}
.home-footer  span{
    font-size: 1.6rem;
}
.home-footer > div > a{
    display: inline-block;
}

.home-footer > div  > a:nth-of-type(1){
    margin-right :10px
}
.home-footer > div  > a:nth-of-type(2){
    margin-left :10px
}
</style>

<div style="margin-top: 20px">
    <a href="#"><i class="far fa-chevron-circle-down fa-2x"></i></a>
        <span>...</span>
        <span>/</span>
        <span>...</span>
    <a href="#"><i class="far fa-chevron-circle-up fa-2x"></i></a>
</div>
<div style="margin-top: 10px"><a href="#menucarte" title="Carte"><small>Carte restaurant</small></a></div>

`;

export default class BoissonFooter extends HTMLElement {

    static get observedAttributes() {
        return ['data-index'];
    }

    constructor() {
        super();

        this.appendChild(template.content);
        this.querySelectorAll("a")[0].addEventListener("click",this.prev.bind(this));
        this.querySelectorAll("a")[1].addEventListener("click",this.next.bind(this));
    }

    attributeChangedCallback (name, oldValue, newValue) 	{
        this.querySelectorAll("span")[0].textContent  = parseInt(newValue)+1;
        this.querySelectorAll("span")[2].textContent  = document.querySelector("carte-loader").carteBoisson.blockList.length;
    }
    prev(e){
        e.preventDefault();
        const newIndex = parseInt(this.dataset.index) > 0 ? parseInt(this.dataset.index)-1 : 0;
        document.querySelector("home-header").setAttribute("data-index", newIndex);
        document.querySelector("home-main").setAttribute("data-index", newIndex);
        this.setAttribute("data-index", newIndex);
        document.querySelector("layer-background").setAttribute("data-index", newIndex);
        document.querySelectorAll("home-separator").forEach(function(element){
            element.yoyo();
        })
    }
    next(e){
        e.preventDefault();
        const newIndex = parseInt(this.dataset.index) < (parseInt(this.querySelectorAll("span")[2].textContent)-1) ? parseInt(this.dataset.index)+1 : parseInt(this.dataset.index);
        document.querySelector("home-header").setAttribute("data-index", newIndex);
        document.querySelector("home-main").setAttribute("data-index", newIndex);
        document.querySelector("layer-background").setAttribute("data-index", newIndex);
        this.setAttribute("data-index", newIndex);
        document.querySelectorAll("home-separator").forEach(function(element){
            element.yoyo();
        })
    }
}
