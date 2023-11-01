window.addEventListener("load", function () {
    const id = window.location.hash.substring(1, window.location.hash.length);
    const mode = id ? 'update' : 'create';
    // firebase.firestore().collection("articles").doc(id).get().then(doc => {
    //     if (doc.exists) {
    //         const article = doc.data();
    //         $("#title").value = article.title;
    //         $("#desc").value = article.desc;
    //     }
    // })

    $('form').on('submit', async function (e) {
        e.preventDefault()
        const token = await firebase.auth().currentUser.getIdToken()
        const response = await fetch('/api/articles', {
            headers: {
                'content-type' : 'application/json',
                'authorization' : token
            },
            method : 'post',
            body : JSON.stringify({
                lib : this.lib.value,
                desc : this.desc.value
            })
        })

                const rep = await  response.text()
                console.info(response, rep)


    })
})
