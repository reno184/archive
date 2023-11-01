const template = document.createElement('template');

template.innerHTML = `
<style>


</style>
<div>
    <header><h2>Commande envoyée !</h2></header>
    <main>Merci de patienter un court instant, nous allons vous servir dès que possible...</main>
 <footer>
  <a href="#" >             
      <i class="far fa-check-circle fa-2x"></i>
  </a>
</footer>
</div>
`;

export default class SuccessRep extends HTMLElement {

    constructor() {
        super();
        this.appendChild(template.content.cloneNode(true));
        this.querySelector("a").addEventListener("click",function(e){
            e.preventDefault();
            document.querySelector("modal-center").close()
        })
    }
    connectedCallback() {
        document.querySelector("modal-center").setAttribute("data-height", this.getBoundingClientRect().height + 40);
    }

}
