const template = document.createElement('template');

template.innerHTML = `
<style>
.menu-right > .drawer{
    position: absolute;
    display: flex;
    flex-direction: row;
    top :0;
    height: 100%;
    width: 320px;
    transform: translateX(-40px);
    transition: transform .8s;
    
}
.menu-right > .drawer:hover,.menu-right >  .drawer.test {
    transform: translateX(-320px);
}

.menu-right   > .drawer >  nav{
    padding-top: 50px;
    width: 40px;
}
.menu-right  > .drawer >  nav  a{
    display: inline-block;
    margin-top: 10px;
    width: 100%;
    padding: 10px 0;
    border : solid 1px black;
    border-right: none;
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
   background : white;
    text-align: center;
}
.menu-right > .drawer > nav a:active , .menu-right  > .drawer >  nav a.is-active {
   border-right: solid 2px #eee;
    background: #eee;
    transform: translateX(-1px);
}
.menu-right  > .drawer > main{
     height: 100%;
     flex:1;
     background: #eee; 
     border-left:solid 1px black;
}
.menu-right > .drawer > main > section{
  display: none;
}
.menu-right  > .drawer > main > section.is-active{
  display: block;
}
</style>
<div class="drawer">
    <nav>
            <a href="#"  data-role="drawer-link" data-target="link_1"  class="drawer-nav__link"><i class="far fa-list fa-lg"></i></a>
            <a href="#" data-role="drawer-link" data-target="link_2" class="drawer-nav__link"><i class="far fa-wave-square"></i></a>
            <a href="#" data-role="drawer-link" data-target="link_3" class="drawer-nav__link"><i class="far fa-draw-polygon fa-lg"></i></a>
            <a href="#" data-role="drawer-link" data-target="link_4" class="drawer-nav__link"><i class="far fa-headset fa-lg"></i></a>
            <a href="#" data-role="drawer-link" data-target="link_5" class="drawer-nav__link"><i class="far fa-chart-network fa-lg"></i></a>
    </nav>

    <main>

        <section  data-role="drawer-content" id="link_1" >
        <h4>Pistes</h4>
        <panel-pistes class="panel-pistes"></panel-pistes>
</section>
        <section  data-role="drawer-content" id="link_2" >
        <h4>Zones d'intéret / interdites</h4>
        <panel-pci class="panel-pci"></panel-pci>
</section>
        <section  data-role="drawer-content" id="link_3" >
         <h4>Log actions</h4>
</section>
        <section  data-role="drawer-content" id="link_4" >
         <h4>Log actions</h4>
</section>
                  <section  data-role="drawer-content" id="link_5" >
         <h4>Log actions</h4>
</section>    
    </main>
</div>

`;

export default class MenuRight extends HTMLElement {
    static get observedAttributes() {
        return ['data-index'];
    }


    constructor() {
        super();
        this.appendChild(template.content.cloneNode(true));

    }

    connectedCallback () {
        this.setAttribute("data-index", 0);
        document.querySelectorAll("[data-role=drawer-link]").forEach((elem, index)=>{

            elem.addEventListener("click", function(e){
                e.preventDefault();
                this.setAttribute("data-index", index);
            }.bind(this));
        });
    }

    attributeChangedCallback (name, oldValue, newValue) 	{
       if(oldValue) {
           this.querySelectorAll("[data-role=drawer-link]")[oldValue].classList.remove("is-active");
           this.querySelectorAll("[data-role=drawer-content]")[oldValue].classList.remove("is-active");
       }
       if(newValue){
           this.querySelectorAll("[data-role=drawer-link]")[parseInt(newValue)].classList.add("is-active");
           this.querySelectorAll("[data-role=drawer-content]")[parseInt(newValue)].classList.add("is-active");
       }
    }

}
