const template = document.createElement('template');

template.innerHTML = `
<style>

.votre-avis i {
    text-shadow: 1px 1px 1px rgba(0,0,0,.6);
}
.votre-avis i.active {
     color : yellow;
}

.votre-avis textarea{
    border-radius: 5px;
}

</style>
<div>
<header>
    <h3>Votre avis sur ce site ?</h3>
</header>
<main>
<p>
    <a href="#"><i class="far fa-star mr-1 active"></i></a>
    <a href="#"><i class="far fa-star mr-1"></i></a>
    <a href="#"><i class="far fa-star mr-1"></i></a>
    <a href="#"><i class="far fa-star mr-1"></i></a>
    <a href="#"><i class="far fa-star mr-1"></i></a>
</p>
<p>
<strong>Pouvez-vous nous en dire d'avantage ?</strong>
<br>
<textarea rows="5" cols="33"></textarea>   
</p>
</main>
<footer>
  <a href="#" >             
      <i class="far fa-check-circle fa-2x"></i>
  </a>
</footer>
</div>
`;

export default class VotreAvis extends HTMLElement {
    constructor() {
        super();
        this.appendChild(template.content.cloneNode(true));
        var linkArray = this.querySelectorAll("main a");
        var iconArray = this.querySelectorAll("main  i");
        linkArray.forEach(function(link, indexLink){
            link.addEventListener("click", function(e){
                e.preventDefault();

                iconArray.forEach(function(icon, indexIcon){
                    if(indexIcon > indexLink){
                        icon.classList.remove("active")
                    }else{
                        icon.classList.add("active")
                    }
                })
            });
        });
        this.querySelector("footer a").addEventListener("click",  (e)=> {
            e.preventDefault();
            const classList = this.querySelector("footer i").classList
            classList.remove("fa-check-circle")
            classList.add("fa-spinner")
            classList.add("fa-spin")
            setTimeout(function(){
                document.querySelector("modal-center").gotoRep("thank")
            })
        })
    }
    connectedCallback() {
        document.querySelector("modal-center").setAttribute("data-height", this.getBoundingClientRect().height +40);
    }
}
