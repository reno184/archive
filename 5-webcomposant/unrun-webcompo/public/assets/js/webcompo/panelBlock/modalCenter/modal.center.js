import JustConfirm from "./just.confirm.js";
import QuestionConfirm from "./question.confirm.js";
import SuccessRep from "./success.rep.js";
import FailRep from "./fail.rep.js";
import ThankRep from "./thank.rep.js";
import VotreAvis from "./votre.avis.js";
import MenuCarte from "./menu.carte.js";
import OrderBasket from "./order.basket.js";
import MenuProfil from "./menu.profil.js";

const template = document.createElement('template');

template.innerHTML = `
<style>
.modal-center  .backdrop{
   position: absolute;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: rgba(0,0,0,.5);
    opacity: 0;
}
.modal-center  .backdrop  .modal {
  /*border: solid 1px #000;*/
  position: relative;
  background: white;
  box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.8);
  overflow: hidden;
  border-radius: 5px;
  margin-top: -100px;
  width : 1px;
  height: 2px;
 
}
.modal-center  .backdrop  .modal > div{
text-align: center;
 padding: 10px;
 }
 
 .modal-center  .backdrop  .modal > div  footer{
margin: 20px 0;
 }
 
.modal-center  .backdrop  .modal > a {
 position: absolute;
 top: 7px;
 right: 5px;
}
</style>
<div class="backdrop">
    <div class="modal">
    <a href="#" id="btnClose"><i class="far fa-lg fa-times-circle"></i></a><div class="content"></div></div>
</div>
`;

export default class ModalCenter extends HTMLElement {
    static get observedAttributes() {
        return ['data-height', "data-action"];
    }

    constructor() {
        super();
        this.appendChild(template.content.cloneNode(true));
        this.style.display = "none";
        this.setAttribute("data-height",2)
        this.querySelector(".modal > a").addEventListener("click", (e)=>{
            e.preventDefault();
           this.setAttribute("data-action", "close")
        });
    }

    attributeChangedCallback(name, oldValue, newValue) {
       if(name==="data-action"){

          if(newValue==="close"){
               this.close()
           }else{
              this._open(newValue)
          }
       }else if(name ==="data-height"){
               this._toggle(oldValue, newValue)
       }
    }
    _toggle(oldValue, newValue){

        if(newValue !== "2") {


            d3.select(".modal-center .modal")
                .style("height", oldValue + "px")
                .transition()
                .style("height", newValue + "px");

            d3.select(".modal-center .content")
                .style("opacity", 0)
                .transition()
                .delay(500)
                .style("opacity", 1)
        }

    }
    close(){
        window.location.hash = "#close"
        d3.select(".modal-center .content")
            .transition()
            .style("opacity",0)
            .on("end", function(){
                this.innerHTML = ''
            });

        d3.select(".modal-center .modal")
            .transition()
            .delay(500)
            .style("height", "2px")
            .transition()
            .style("width", "2px")
            .on("end",()=>{
                this.setAttribute("data-height",2)
            });

        d3.select(".modal-center .backdrop")
            .transition()
            .delay(1000)
            .style("opacity",0)
            .on("end",()=>{
                this.style.display = "none";

            });
    }

    _open(type){

        this.style.display = "block";
        d3.select(".modal-center .backdrop")
            .style("opacity",0)
            .transition()
            .style("opacity",1);

        d3.select(".modal-center .modal")
            .style("width", "1px")
            .transition()
            .delay(500)
            .style("width", "300px")
            .on("end", ()=>{
                this.querySelector(".modal-center .content").style.opacity = 0;
                var articleSelected = document.querySelector("home-main").selectedArticle;
                if(type=== "confirm"){

                if(articleSelected.questionList && articleSelected.questionList.length>0){
                    var div  = new QuestionConfirm();

                    div.setAttribute("class","question-confirm");
                }else{
                    var div  = new JustConfirm();
                    div.setAttribute("class","just-confirm");
                }
                }else if(type=== "avis"){
                    var div  = new VotreAvis()
                    div.setAttribute("class","votre-avis")
                }else if(type=== "order"){
                    var div  = new OrderBasket()
                    div.setAttribute("class","order-basket")
                }else if(type=== "menu"){
                    var div  = new MenuCarte()
                    div.setAttribute("class","menu-carte")
                }else if(type=== "menuprofil"){
                    var div  = new MenuProfil()
                    div.setAttribute("class","menu-profil")
                }
                this.querySelector(".modal-center .content").appendChild(div);

            })
    }

    gotoRep(type){
        d3.select(".modal-center .content")
            .transition()
            .style("opacity",0)
            .on("end",()=>{
                var content = this.querySelector(".modal-center .content");
                content.innerHTML ='';
                if(type ==="success"){
                    var div  = new SuccessRep();
                    div.setAttribute("class","success-rep");
                }else if(type ==="thank"){
                    var div  = new ThankRep();
                    div.setAttribute("class","thank-rep");
                }
                else{
                    var div  = new FailRep();
                    div.setAttribute("class","fail-rep");
                }
                content.appendChild(div);
            })
    }


}
