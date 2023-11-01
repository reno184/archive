import BeforeLoad from "./webcompo/beforeLoad.js";
import CarteLoader from "./webcompo/carteLoader.js";
import LayerBackground from "./webcompo/LayerBackground.js";
import PanelCarte from "./webcompo/panelCarte.js";

import BoissonHeader from "./webcompo/panelBlock/boissonHeader.js";
import BoissonFooter from "./webcompo/panelBlock/boissonFooter.js";
import BoissonSeparator from "./webcompo/panelBlock/boissonSeparator.js";
import BoissonMain from "./webcompo/panelBlock/boissonMain.js";
import ModalCenter from "./webcompo/panelBlock/modalCenter/modal.center.js";
import JustConfirm from "./webcompo/panelBlock/modalCenter/just.confirm.js";

import QuestionConfirm from "./webcompo/panelBlock/modalCenter/question.confirm.js";
import SuccessRep from "./webcompo/panelBlock/modalCenter/success.rep.js";
import VotreAvis from "./webcompo/panelBlock/modalCenter/votre.avis.js";

import FailRep from "./webcompo/panelBlock/modalCenter/fail.rep.js";
import ThankRep from "./webcompo/panelBlock/modalCenter/thank.rep.js";
import MenuCarte from "./webcompo/panelBlock/modalCenter/menu.carte.js";
import OrderBasket from "./webcompo/panelBlock/modalCenter/order.basket.js";
import MenuProfil from "./webcompo/panelBlock/modalCenter/menu.profil.js";

window.addEventListener('load', function (e) {

    customElements.define('panel-carte', PanelCarte);

    customElements.define('layer-background', LayerBackground);
    customElements.define('before-load', BeforeLoad);
    customElements.define('carte-loader', CarteLoader);

    customElements.define('home-header', BoissonHeader);
    customElements.define('home-separator', BoissonSeparator);
    customElements.define('home-main', BoissonMain);
    customElements.define('home-footer', BoissonFooter);


    /* Begin webcompo modal */
    customElements.define('modal-center', ModalCenter);
    customElements.define('just-confirm', JustConfirm);
    customElements.define('question-confirm', QuestionConfirm);
    customElements.define('success-rep', SuccessRep);
    customElements.define('fail-rep', FailRep);
    customElements.define('thank-rep', ThankRep);
    customElements.define('menu-carte', MenuCarte);
    customElements.define('order-basket', OrderBasket);
    /* End webcompo modal */

    /* Begin web compo profil */
    customElements.define('menu-profil', MenuProfil);
    /* End web compo profil */

    /* Begin webcompo bottom */
    customElements.define('votre-avis', VotreAvis);
    /* End webcompo bottom */

});
