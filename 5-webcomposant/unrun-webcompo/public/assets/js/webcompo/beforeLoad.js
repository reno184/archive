const template = document.createElement('template');

template.innerHTML = `
<style>
.before-load > div{
    position: absolute;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    background: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    opacity: 1;
    -webkit-transition: opacity 1s;
    transition: opacity 3s;
}
.before-load > div.in{
    opacity :0;
}
</style>
<div></div>
`;

export default class BeforeLoad extends HTMLElement {
    constructor() {
        super();
        this.appendChild(template.content.cloneNode(true));
        this.querySelector("div").addEventListener("transitionend", ()=>this.style.display = 'none')
    }

    hide(){
        this.querySelector("div").classList.add("in")

    }
}
