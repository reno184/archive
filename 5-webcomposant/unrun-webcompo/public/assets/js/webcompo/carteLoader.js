const template = document.createElement('template');

template.innerHTML = `
<style>
.carte-loader > div{
    position: absolute;
    top: 0;
    left: 0;
    height: 80vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color : #b92b27
}
</style>
<div>
<h1>Le Tajmahal</h1>

<i class="far fa-spinner fa-spin fa-2x" ></i>
<h2  ><i>Restaurant Loundge</i></h2>
</div>
`;

export default class CarteLoader extends HTMLElement {

    get carteBoisson() {
        return this._carteBoisson;
    }

    set carteBoisson(value) {
        this._carteBoisson = value;
    }

    constructor() {
        super();
        this.appendChild(template.content);
    }

    connectedCallback() {
                    fetch('http://localhost:5001/dev-mamba/us-central1/apimamba/carte' )
                        .then((rep) => {
                            console.info(rep)
                      if(rep.ok){
                          rep.json().then((json) =>{
                              this.carteBoisson = json.g[0];
                              document.querySelector("layer-background").setAttribute("data-index", 0);
                              document.querySelector("home-header").setAttribute("data-index", 0);
                              document.querySelector("home-main").setAttribute("data-index", 0);
                              document.querySelector("home-footer").setAttribute("data-index", 0);

                              this.querySelector("div").style.display = 'none';
                              document.querySelector("before-load").hide();

                          });
                      }else{
                        //  window.location.assign("500.html")
                      }
                    })
    }
}
