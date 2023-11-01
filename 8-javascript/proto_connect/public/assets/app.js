$(window).on('load', function() {
    // code here
    firebase.auth().onAuthStateChanged(function(user){
       if(user){

           $("#notconnected").hide()
           $("#connected").show()
           var db = firebase.firestore();
           db.collection("resto/3333/zone")
               .onSnapshot(function(querySnapshot) {
                   var str = '';
                   querySnapshot.forEach(function(doc) {
                       const data = doc.data();
                       console.log(data)
                       str += `<div style="border-top:solid 1px #000;margin-top: 10px">
<h3>${data.name}</h3>
<div>${data.token}</div>
<a data-index="qr_${doc.id}" href="https://mambatest.web.app/resto?token-id=${data.token}" title="lien">Lien </a>
                        <div id="qr_${doc.id}" style="display:flex;justify-content: center;align-items: center;margin-top: 10px"></div></div>`
                   });
                   $("#container").html(str)
                   $("#container a").each(function( index ) {
                       new QRCode(document.getElementById($( this ).data("index")), {
                           text:  $( this ).attr("href"),
                           width: 120,
                           height: 120,
                           colorDark : "#000000",
                           colorLight : "#ffffff",
                       })
                   })

               });

       }else{
           $("#connected").hide()
           $("#notconnected").show()
       }
    })
    $("form").on("submit", function(e){
        e.preventDefault();
        $("#error").empty();
        const form = this;
        firebase.auth().signInWithEmailAndPassword(form.username.value, this.password.value).then(()=>form.reset()).catch(err => $("#error").text(err.message))
    });
    $("#signout").on("click", function(e){
        firebase.auth().signOut();
    });

});
