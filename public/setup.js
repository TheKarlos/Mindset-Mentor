function submitForm(e){
    e.preventDefault();

    // get the form and get its data
    var form = document.getElementById("form");
    var url = form.getAttribute("action");
    var formData = $(form).serializeArray();
    
    // send a POST request to the target URL
    $.post(url, formData).done(function (data) {
        window.location.href = '/dashboard'; // redirect user to index page
    });
}