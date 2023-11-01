const template = document.createElement('template');

template.innerHTML = `
<style>

.menu-carte  ul li {
    font-size: 1.2rem;
    line-height: 1.6;
  }
  
</style>
<div>
<ul>

</ul>
</div>
`;

export default class MenuCarte extends HTMLElement {

    constructor() {
        super();
        this.appendChild(template.content.cloneNode(true));

    }
    connectedCallback() {
        this.querySelector("ul").innerHTML=''
        var blockList = document.querySelector("carte-loader").carteBoisson.blockList;

        for (let i = 0; i < blockList.length; i++) {
            var li = document.createElement("li")
            li.innerHTML = `<a href="#" data-index="${i}">${blockList[i].libelle}</a>`
            this.querySelector("ul").appendChild(li)
        }

        this.querySelectorAll("a").forEach(function(element){
            element.addEventListener("click",function(e){
                e.preventDefault();
                document.querySelector("layer-background").setAttribute("data-index",  e.target.dataset.index);
                document.querySelector("home-header").setAttribute("data-index", e.target.dataset.index )
                document.querySelector("home-main").setAttribute("data-index", e.target.dataset.index )
                document.querySelector("home-footer").setAttribute("data-index", e.target.dataset.index )
                document.querySelector("modal-center").close()
            })
        });
        document.querySelector("modal-center")
            .setAttribute("data-height", this.getBoundingClientRect().height +40 );
    }

}
