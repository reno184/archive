const template = document.createElement('template');

template.innerHTML = `
<style>

.home-separator hr{
    border: 0;
    height: 1px;
    margin-top: 10px;
    background-image: linear-gradient(to right, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.75), rgba(255, 255, 255, 0));
}

.home-separator hr.in{
   animation-name: example;
   animation-duration: .8s;  
   animation-iteration-count: 2;
   animation-direction: alternate;
   animation-timing-function: ease-in-out;
}
@keyframes example {
  0% { transform: scalex(1)}
  100% { transform: scalex(0)}
}
</style>
<hr>
`;

export default class BoissonSeparator extends HTMLElement {

    constructor() {
        super();
        this.appendChild(template.content.cloneNode(true));
    }
    yoyo(){

        this.querySelector("hr").classList.add("in")
        setTimeout(function(){
            this.querySelector("hr").classList.remove("in")
        }.bind(this),2000)
    }
}
