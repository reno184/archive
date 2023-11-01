const template = document.createElement('template');

template.innerHTML = `
<style>

.layer-background  div{
    position: absolute;
    height: 100%;
    width: 100%;
    transition: opacity 3s ease;
    z-index: 0;
  
}

.morning {
background: #23074d;  /* fallback for old browsers */
background: -webkit-linear-gradient(to right, #cc5333, #23074d);  /* Chrome 10-25, Safari 5.1-6 */
background: linear-gradient(to right, #cc5333, #23074d); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

}

.day {
background: #FF0099;  /* fallback for old browsers */
background: -webkit-linear-gradient(to bottom, #493240, #FF0099);  /* Chrome 10-25, Safari 5.1-6 */
background: linear-gradient(to bottom, #493240, #FF0099); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

}

.sunset {
  background: #ad5389; /* fallback for old browsers */
  background: -webkit-linear-gradient(to left, #ad5389, #3c1053); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to left, #ad5389, #3c1053); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}

.night {
  background: #c31432;  /* fallback for old browsers */
background: -webkit-linear-gradient(to bottom, #240b36, #c31432);  /* Chrome 10-25, Safari 5.1-6 */
background: linear-gradient(to bottom, #240b36, #c31432); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

}

</style>

<div class="morning"></div>
<div class="day"></div>
<div class="night"></div>
<div class="sunset"></div>

`;

export default class LayerBackground extends HTMLElement {
    static get observedAttributes() {
        return ['data-index'];
    }
    constructor() {
        super();
        this.appendChild(template.content);
    }
    attributeChangedCallback (name, oldValue, newValue) 	{
        this.querySelectorAll('div').forEach(function (element, index) {

            if (index === parseInt(newValue)){
                element.style.zIndex = 0;
                element.style.opacity = 1;
            } else if (index === parseInt(oldValue)){
                element.style.zIndex = -1;
                element.style.opacity = 0;
            }
            else {
                element.style.opacity = 0;
                element.style.zIndex = -2;
            }
        });


    }
}
