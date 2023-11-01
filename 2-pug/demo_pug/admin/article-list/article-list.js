window.addEventListener("load", function () {
    firebase.firestore().collection("articles").get().then((docs) => {
        $("#elts").html(`<div class="alert alert-light border border-dark col-sm-12 offset-md-3 col-md-6">Pas de donnée</div>`);
        docs.forEach((doc) => {
            $("#elts").append($(`
            <div class="col-sm-12 col-md-4 col-lg-3 my-2">
                <div class='card'  data-id="${doc.id}" >
                    <img src="../../img/image1.jpg"  class="card-img-top" alt="mon image">
                    <div class="card-body">
                        <h5 class="card-title">Card title</h5>
                        <h6 class="card-subtitle mb-2 text-muted">Card subtitle</h6>
                        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        <a href="article-detail#${doc.id}" class="card-link"><i class="far fa-edit"></i>Modifier</a>
                    </div>
                </div>
            </div>`
            ));
        });
    })
})
