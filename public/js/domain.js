$(function() {
	$('#domainSubmit').click(function() {
		var userDomain = $('#domainForm').val();

		console.log("domain is:" + userDomain);
		$.ajax({
			method: "POST",
			contentType: "application/x-www-form-urlencoded",
            data: {
                userDomain: userDomain
            },
            dataType: 'json',
            url: '/api/v1/dns',
            success: function(response, textStatus, jqXHR) {
                // if (err) console.log(err);
                if (response.redirect) {
                    // response.redirect contains the string URL to redirect to
                    window.location.href = response.redirect;
                }
            }
		});
	});

  $(window).keydown(function(event){
    if(event.keyCode == 13) {
      event.preventDefault();
      return false;
    }
  });
})