const template = document.createElement('template');

template.innerHTML = `
<style>
.submenu-alerte ul {
    min-width: 300px
}
.submenu-alerte p{
    padding: 5px 20px;
    font-size: .9rem;
    text-align: initial;
    word-break: break-all;
}
.submenu-alerte li{
    padding: 3px 5px;
    border-top: solid 1px #ccc;
    display: flex;
    flex-direction: row;
    align-items: center;
}
.submenu-alerte li:first-of-type{
    border-top: none;
}
.submenu-alerte li > div{
font-size: .9rem;
  flex:1;
  padding: 3px 15px;
}
</style>
<ul>
       <li>
        <i class="far fa-exclamation-triangle text-danger"></i>
        <div>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dicta distinctio, riosam odio, quod recusandae, reprehenderit</div>
        <a href="#" ><i class="far fa-times-circle"></i></a>
        </li>
        <li>
        <i class="far fa-info-circle"></i>
        <div>Lorem ipsum dolor sit amet, consectetur adipisicing elit. it</div>
        <a href="#"><i class="far fa-times-circle"></i></a>
        </li>
</ul>
 
`;

export default class SubMenuAlerte extends HTMLDivElement {

    constructor() {
        super();
        this.appendChild(template.content)
    }

}
