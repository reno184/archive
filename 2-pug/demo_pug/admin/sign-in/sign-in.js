window.addEventListener("load", function () {

    $("#btnLogout").on("click", async function () {
        try {
            const token = await firebase.auth().currentUser.getIdToken()
            const rep = await fetch('/fb/logoff', {headers: {'Content-Type': 'application/json', authorization: token}})
            if (rep.ok) {
                await firebase.auth().signOut()
                helpers.toast({message: 'Vous êtes connecté', color: '#52a9f6'});
            } else {
                helpers.toast({message: 'prb', color: 'red'});
        }
        } catch (err) {
            $(".alert-danger").html(`<small>${err.message}</small>`).show()
        }
    })

    $('form').on('submit', async function (e) {
        e.preventDefault()
        try {
            const currentUser = await firebase.auth().signInWithEmailAndPassword(this.email.value, this.password.value)
            const token = await currentUser.getIdToken()
            const rep = await fetch('fb/login', {headers: {'Content-Type': 'application/json', authorization: token}})
            if (rep.ok) {
                helpers.toast({message: 'Vous êtes connecté', color: '#52a9f6'});
            } else {
                helpers.toast({message: 'prb', color: 'red'});
            }
        } catch (err) {
            $(".alert-danger").html(`<small>${err.message}</small>`).show()
        }
    })

    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            $("#frmLogged").hide()
            $("#pnlLogout").show()
        } else {
            $("#frmLogged").show()
            $("#pnlLogout").hide()
        }
    })

})
