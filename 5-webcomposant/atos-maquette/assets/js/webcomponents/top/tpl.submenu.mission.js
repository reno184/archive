const template = document.createElement('template');
template.innerHTML = `
<style>
.submenu-mission > div{
    display: flex;
    flex-direction: row;
}
.submenu-mission > div > ul {
    display: flex;
    flex-direction: column;
    min-width: 70px;
    padding: 5px 10px;
}
.submenu-mission > div > ul:first-child {
flex:1;
}
.submenu-mission li{
    padding: 5px 0px;
    
}
.submenu-mission ul:first-child li{
text-align: right;
}

.submenu-mission ul:first-child li:nth-child(2) {
     padding-top: 10px;
}

</style>
<div>
    <ul>
        <li>En cours</li>
        <li>Mode</li>
    </ul>
<ul>
    <li>Prépa1</li>
    <li>
      <div class="custom-dropdown">
                <select >
                <option>Auto</option>
                <option>Semi-auto</option>
                <option>Manuel</option>
                </select>
            </div>
    </li>
</ul>
</div>
`;

export default class SubMenuMission extends HTMLDivElement {


    constructor() {
        super();
        this.appendChild(template.content)
    }

}
