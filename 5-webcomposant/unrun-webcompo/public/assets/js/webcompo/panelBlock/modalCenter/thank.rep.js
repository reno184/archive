const template = document.createElement('template');

template.innerHTML = `
<style>


</style>
<div>
    <header><h2>Milles merci !</h2></header>
    <main><p>Nous allons prendre en compte votre avis, pour nos futures évolutions...</p></main>
 <footer>
  <a href="#" >             
      <i class="far fa-check-circle fa-2x"></i>
  </a>
</footer>
</div>
`;

export default class ThankRep extends HTMLElement {

    constructor() {
        super();
        this.appendChild(template.content.cloneNode(true));
        this.querySelector("a").addEventListener("click",function(e){
            e.preventDefault();
            document.querySelector("modal-center").close()
        })
    }
    connectedCallback() {
        document.querySelector("modal-center").setAttribute("data-height", this.getBoundingClientRect().height );
    }

}
