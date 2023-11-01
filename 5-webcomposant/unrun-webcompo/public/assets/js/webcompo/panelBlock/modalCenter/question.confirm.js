const template = document.createElement('template');

template.innerHTML = `
<style>
.question-confirm input{
    display: none;
}
.question-confirm label{
    line-height: 1.5;
}
.question-confirm .fa-check{
   opacity: .1;
}
.question-confirm input[type="checkbox"]:checked + label > .fa-check{ 
 opacity: 1; 
} 

</style>
<div>
<header><h2></h2></header>
<main></main>
 <footer>
  <a href="#" >             
      <i class="far fa-check-circle fa-2x"></i>
  </a>
</footer>

</div>

`;

export default class QuestionConfirm extends HTMLElement {

    constructor() {
        super();
        this.appendChild(template.content.cloneNode(true));

        this.querySelector("footer a").addEventListener("click", (e) => {
            e.preventDefault();

            var valid = true;
            this.querySelectorAll("ul").forEach((element)=>{
                if(valid){
                    valid = element.querySelectorAll("input[type=checkbox]:checked").length > 0 ? true  : false;
                }
            });
            if(valid){
                var articleSelected = document.querySelector("home-main").selectedArticle;
                const classList = this.querySelector("footer i").classList
                classList.remove("fa-check-circle")
                classList.add("fa-spinner")
                classList.add("fa-spin")
                setTimeout(function(){
                    document.querySelector("modal-center").gotoRep("success")
                },1500)
            }
        })
    }

    connectedCallback() {
        var articleSelected = document.querySelector("home-main").selectedArticle;
        this.querySelector("header > h2").textContent = articleSelected.libelle;

        for (let i = 0; i < articleSelected.questionList.length; i++) {
            const question = articleSelected.questionList[i];

            var ul = document.createElement("ul");

            const strong = document.createElement("h4");
            strong.textContent = question.libelle;
            ul.appendChild(strong);
            for (let j = 0; j < question.reponseList.length; j++) {
                const li = document.createElement("li");

                var str = `<input type="checkbox" id="check_${i}_${j}"> <label for="check_${i}_${j}"><i class="far fa-check" style="margin-right:10px"></i>${question.reponseList[j].libelle}</label>`;
                li.innerHTML = str;
                ul.appendChild(li)
            }
            this.querySelector("main").appendChild(ul)
        }
        document.querySelector("modal-center").setAttribute("data-height", this.getBoundingClientRect().height +40)
    }

}
