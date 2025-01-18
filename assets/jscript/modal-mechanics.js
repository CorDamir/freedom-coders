var alertSuccess = document.getElementById('ThankYouMessage')
var alertSuccessMessage = document.getElementById('send-button')

function alert(message) {
    var container = document.createElement('div')
    container.innerHTML = '<div class="alert alert-dark alert-dismissible" role="alert">' + message + '<button type="button" class="btn-close" data-dismiss="alert" aria-label="Close"></button></div>'

    alertSuccess.append(container)
}

if (alertSuccessMessage) {
    alertSuccessMessage.addEventListener('click', function () {
        alert('Thanks for contacting us'), { passive: true }
    })
}