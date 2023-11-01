import SubMenuNetWork from "./webcomponents/top/tpl.submenu.network.js";
import MenuTop from "./webcomponents/top/tpl.menu.top.js";
import SubMenuMission from "./webcomponents/top/tpl.submenu.mission.js";
import SubMenuPCI from "./webcomponents/top/tpl.submenu.pci.js";
import SubMenuChargeUtile from "./webcomponents/top/tpl.submenu.chargeUtile.js";
import SubMenuSetting from "./webcomponents/top/tpl.submenu.setting.js";
import SubMenuAlerte from "./webcomponents/top/tpl.submenu.alerte.js";
import PanelPistes from "./webcomponents/right/tpl.panel.pistes.js";
import TplMap from "./webcomponents/map/tpl.map.js";
import NavBottom from "./webcomponents/bottom/tpl.nav.bottom.js";
import MenuRight from "./webcomponents/right/menu.right.js";
import ContextMenu from "./webcomponents/map/tpl.contextmenu.js";
import PanelPCI from "./webcomponents/right/tpl.panel.pci.js";
import SliderBottom from "./webcomponents/bottom/tpl.slider.bottom.js";
import SvgScene from "./webcomponents/map/tpl.svg.scene.js";
import CardPiste from "./webcomponents/right/tpl.card.piste.js";

import SvgGradient from "./webcomponents/misc/svg-gradient.js";



window.addEventListener("load", function () {
    customElements.define('map-layer', TplMap);
    customElements.define('nav-bottom', NavBottom);
    customElements.define('submenu-setting', SubMenuSetting, {extends: 'div'});
    customElements.define('context-menu', ContextMenu);
    customElements.define('submenu-network', SubMenuNetWork, {extends: 'div'});
    customElements.define('submenu-mission', SubMenuMission, {extends: 'div'});
    customElements.define('submenu-pci', SubMenuPCI, {extends: 'div'});
    customElements.define('submenu-chargeutile', SubMenuChargeUtile, {extends: 'div'});
    customElements.define('submenu-alerte', SubMenuAlerte, {extends: 'div'});
    customElements.define('menu-top', MenuTop);
    customElements.define('panel-pistes', PanelPistes);
    customElements.define('panel-pci', PanelPCI);
    customElements.define('menu-right', MenuRight);
    customElements.define('slider-bottom', SliderBottom);

    customElements.define('svg-scene', SvgScene);
    customElements.define('svg-gradient', SvgGradient);



    customElements.define('card-piste', CardPiste,{extends: 'div'});
    document.querySelector("nav-bottom").renderMousePosition()
    document.querySelector("map-layer").renderScale()
});
