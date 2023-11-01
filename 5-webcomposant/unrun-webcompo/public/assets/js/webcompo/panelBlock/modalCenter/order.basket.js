const template = document.createElement('template');

template.innerHTML = `
<style>
.order-basket ul{
    padding-top: 20px;
}
.order-basket li{
    line-height: 1.5;
}
.order-basket h2{
    margin-top: 0;
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

export default class OrderBasket extends HTMLElement {

    constructor() {
        super();
        this.appendChild(template.content.cloneNode(true));
        this.querySelector("footer a").addEventListener("click", (e) => {
            e.preventDefault();
            document.querySelector("modal-center").close()
        })
    }

    connectedCallback() {
        var itemsBasket = document.querySelector("home-header").itemsBasket;

        var ul = document.createElement("ul");
        const h2 = document.createElement("h2");
        h2.textContent ="Table 2"
        ul.appendChild(h2)
        for (let itemKey in itemsBasket) {
            const item = itemsBasket[itemKey]
            const li = document.createElement("li");
            li.style.display = "flex"
            var str = `<span style="flex: 1;text-align: left">${item.ArticleLib}</span><a href="#" data-order-id="${item.id}">
            <i class="far fa-times-circle"></i>
            </a>`;
            li.innerHTML = str;
            ul.appendChild(li)
        }
        this.querySelector("main").appendChild(ul)
        document.querySelector("modal-center").setAttribute("data-height", this.getBoundingClientRect().height + 40);

    }

}
