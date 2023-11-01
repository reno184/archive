const template = document.createElement('template');

template.innerHTML = `
<style>
.home-header  h3{
opacity: 1;
transition: opacity 1s;
text-align: center;
color: white;
transition: opacity 1s;
padding: 0 10px;
}
.home-header h3.in{
    opacity: 0;
}
.counter{
    border: solid 2px white;
    font-family: Arial!important;
    background:  transparent;
    text-align: center;
    line-height: 30px;
    height: 30px;
    display: inline-block;
    width: 30px;
    font-size: 1rem;
    color: white;
    font-weight: bold;
    border-radius: 50%;
}
.counter.in{
    border-color: transparent;
 
}
</style>
<div style="display: flex;flex-direction: row;justify-content: space-around;color:white;align-items: center;padding: 10px">
       <div style="text-align: center">
       <a href="#menucarte">
        <i class=" far fa-bars fa-2x"></i>
        </a>
        <br><small>Menu</small>
</div> 
        <h3></h3>
        <div>
          <a href="#" id="refreshCounter" title="profil" class="counter">
            <span>0</span>
        </a><br><small>Panier</small>
</div>
      
</div>

`;

export default class BoissonHeader extends HTMLElement {

    get itemsBasket() {
        console.log( this._itemsBasket)
        return this._itemsBasket;
    }
    set itemsBasket(value){
        this._itemsBasket = value;
    }

    refresh(){
        return new Promise(function(resolve, reject){
            document.getElementById("refreshCounter").classList.add("in");
            document.getElementById("refreshCounter").innerHTML ='<i class="far fa-spin fa-spinner fa-2x"></i>';



                fetch('http://localhost:5001/dev-mamba/us-central1/apimamba/order').then((rep) => {
                    if(rep.ok) {
                        rep.json().then((json) => {

                            document.getElementById("refreshCounter").classList.remove("in");
                            document.querySelector("home-header").itemsBasket = json;
                            document.getElementById("refreshCounter").textContent = 2;
                            resolve()
                        })
                    }})

        });
    }

    static get observedAttributes() {
        return ['data-index'];
    }

    constructor() {
        super();
        this.appendChild(template.content);
    }

    attributeChangedCallback (name, oldValue, newValue) 	{

        this.refresh();
        this.querySelectorAll("a")[0].addEventListener("click", function(e){
            e.preventDefault();
            document.querySelector("modal-center").setAttribute("data-action", "menu")
        });

        this.querySelectorAll("a")[1].addEventListener("click", (e)=>{
            e.preventDefault();
            window.location.hash = "#basket"
        })


    var title = this.querySelector("h3")
        if(!oldValue){
            title.textContent = document.querySelector("carte-loader").carteBoisson.blockList[newValue].libelle
        }else{
            title.classList.add("in");
            setTimeout(function () {
                title.textContent = document.querySelector("carte-loader").carteBoisson.blockList[newValue].libelle;
                title.classList.remove("in")
            },1000);
        }


    }
}
