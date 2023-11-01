const template = document.createElement('template');

template.innerHTML = `
<style>


</style>
<div>
    <header><h2></h2></header>

     <main><h4>Confirmer votre commande ?</h4></main>
 <footer>
  <a href="#" >             
      <i class="far fa-check-circle fa-2x"></i>
  </a>
</footer>
</div>
`;

export default class JustConfirm extends HTMLElement {


    constructor() {
        super();
        this.appendChild(template.content.cloneNode(true));
        this.querySelector("footer a").addEventListener("click", (e) => {
            e.preventDefault();
            const classList = this.querySelector("footer i").classList
            classList.remove("fa-check-circle")
            classList.add("fa-spinner")
            classList.add("fa-spin")
            var articleSelected = document.querySelector("home-main").selectedArticle;
            setTimeout(function(){
                document.querySelector("modal-center").gotoRep("success")
            },500)
        })
    }

    connectedCallback (){
        var articleSelected = document.querySelector("home-main").selectedArticle;
        this.querySelector("header h2").textContent = articleSelected.libelle;
        document.querySelector("modal-center").setAttribute("data-height", this.getBoundingClientRect().height +40)

    }
}
