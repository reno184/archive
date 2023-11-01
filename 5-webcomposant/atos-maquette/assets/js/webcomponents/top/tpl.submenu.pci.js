const template = document.createElement('template');

template.innerHTML = `
<style>
.submenu-pci ul {
 min-width: 250px;
 padding: 15px;
}
.submenu-pci li{
  padding: 5px 0;
}
.submenu-pci li:last-child{
  text-align: center;
}
.submenu-pci strong{
    display: inline-block;
    margin-right: 10px;
}
</style>
<ul>
 <li><strong>Nom:</strong><span>PCI 1</span></li>
       <li><strong>Alt:</strong><span>2.05m</span></li>
       <li><strong>Lat:</strong><span>76°56\\'45.96\\'\\'N</span></li>
       <li><strong>Lon:</strong><span>175°18 \\'50.40\\'\\'W</span></li>
        <li><strong>Cap:</strong><span>14.45 °</span></li>
      <li><a href="#"><i class="far fa-map-marker-check" style="font-size: 1.5em"></i></a></li>
</ul>
`;

export default class SubMenuPCI extends HTMLDivElement {


    constructor() {
        super();
        this.appendChild(template.content)
    }



}
