const template = document.createElement('template');

template.innerHTML = `
<style>


</style>
<div>
    <header><h1>Oups :(</h1></header>
    <h3>Une erreur est survenue...</h3>
 <footer>
  <a href="#" >             
      <i class="far fa-check-circle fa-2x"></i>
  </a>
</footer>
</div>
`;

export default class FailRep extends HTMLElement {

    constructor() {
        super();
        this.appendChild(template.content.cloneNode(true));
        this.querySelector("a").addEventListener("click",function(e){
            e.preventDefault();
            document.querySelector("modal-center").close()
        })
    }
    connectedCallback() {
        document.querySelector("modal-center").setAttribute("data-height", this.getBoundingClientRect().height +40 );
    }

}
