/* https://github.com/madmurphy/cookies.js (GPL3) */
var docCookies={getItem:function(e){return e?decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*"+encodeURIComponent(e).replace(/[\-\.\+\*]/g,"\\$&")+"\\s*\\=\\s*([^;]*).*$)|^.*$"),"$1"))||null:null},setItem:function(e,o,n,t,r,c){if(!e||/^(?:expires|max\-age|path|domain|secure)$/i.test(e))return!1;var s="";if(n)switch(n.constructor){case Number:s=n===1/0?"; expires=Fri, 31 Dec 9999 23:59:59 GMT":"; max-age="+n;break;case String:s="; expires="+n;break;case Date:s="; expires="+n.toUTCString()}return document.cookie=encodeURIComponent(e)+"="+encodeURIComponent(o)+s+(r?"; domain="+r:"")+(t?"; path="+t:"")+(c?"; secure":""),!0},removeItem:function(e,o,n){return this.hasItem(e)?(document.cookie=encodeURIComponent(e)+"=; expires=Thu, 01 Jan 1970 00:00:00 GMT"+(n?"; domain="+n:"")+(o?"; path="+o:""),!0):!1},hasItem:function(e){return!e||/^(?:expires|max\-age|path|domain|secure)$/i.test(e)?!1:new RegExp("(?:^|;\\s*)"+encodeURIComponent(e).replace(/[\-\.\+\*]/g,"\\$&")+"\\s*\\=").test(document.cookie)},keys:function(){for(var e=document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g,"").split(/\s*(?:\=[^;]*)?;\s*/),o=e.length,n=0;o>n;n++)e[n]=decodeURIComponent(e[n]);return e}};"undefined"!=typeof module&&"undefined"!=typeof module.exports&&(module.exports=docCookies);

$.noConflict();
(function($) {
  var fname = $('#fname').val();
  var lname = $('#lname').val();
  var number = $('#number').val();
  var email = $('#email').val();
  var birthday = $('#birthday').val();

  /* page one: search */
  $('#flightsearch').on('submit', function(e) {

    console.log("submit clicked");

    /* serialize array for form inputs */
    var formOneData = $(this).serializeArray();
    console.log(formOneData);

    $.each(formOneData, function(i, field) {
      console.log(field.name, field.value);

      docCookies.setItem(field.name, field.value);
      console.log(field.name + ": " + docCookies.getItem(field.name));
    });

    /* get numeric value for ticket quantity */

    var adult = $("#adult").val();
    var senior = $("#senior").val();
    var children = $("#children").val();
    var infant = $("#infant").val();

    adult = +adult;
    senior = +senior;
    children = +children;
    infant = +infant;

    docCookies.setItem("adult", adult);
    docCookies.setItem("senior", senior);
    docCookies.setItem("children", children);
    docCookies.setItem("infant", infant);

    console.log(docCookies.getItem("adult"));
    console.log(docCookies.getItem("senior"));
    console.log(docCookies.getItem("children"));
    console.log(docCookies.getItem("infant"));

    var quantity = (adult + senior + children + infant);
    console.log("total tickets: " + quantity);

    /* add quantity cookie */
    docCookies.setItem("quantity", quantity);
    console.log("cookie: " + docCookies.getItem("quantity"));

    /* validation */
    if(quantity < 6){
      if(adult >= 1 || senior >= 1) {
      /* if values are null, then display error message */
    //  e.preventDefault();
        switch('') {
          case $("#deparloc").val():
            $(".error").remove();
            $(".loc").before("<li class=error>Please enter your departure location!</li>");
            console.log("Please enter your departure location!");
            break;
          case $("#arriveloc").val():
            $(".error").remove();
            $(".loc").before("<li class=error>Please enter your arrival location!</li>");
            console.log("Please enter your arrival location!");
            break;
          case $("#departdate").val():
            $(".error").remove();
            $(".dates").before("<li class=error>Please enter your departure date!</li>");
            console.log("Please enter your departure date!");
            break;
          }
          if(document.getElementById('roundtrip').checked){

            switch('') {
              case $("#returndate").val():
                $(".error").remove();
                $(".dates").before("<li class=error>Please enter your return date!</li>");
                console.log("Please enter your return date!");
                break;
            }
          } else {
            /* todo: hide the return date entirely when not selected */
          }
        } else {

          $(".error").remove();
          $(".tickets").before("<li class=error>You must have at least one adult or senior ticket.</li>");
        console.log("You must have at least one adult or senior ticket per order.");
      }
    } else {

      $(".error").remove();
      $(".tickets").before("<li class=error>No more than six tickets per customer!</li>");
      console.log("No more than 6 tickets per customer.");
    }
  });
  /* page two: search results */


  $('#flightselection').on('submit', function(d)
  {
      var departflights = document.getElementsByName("departflight");
      var returnflights = document.getElementsByName("returnflight");
      var formValid = false;
      var formValid2 = false;
      var j = 0;
      var i = 0;

      while (!formValid && i < departflights.length) {
        if (departflights[i].checked) formValid = true;
            i++;
        }
        while (!formValid2 && j < returnflights.length) {
          if (returnflights[j].checked) formValid2 = true;
            j++;
        }
        if (!formValid || !formValid2){
          d.preventDefault();
        }
        return formValid;
  //})
  });

  /* page three: seat selection */



  /* page whatever: user information */
  $('#uinformation').on('submit', function(d)
    {
      var fname = $('#fname').val();
      var lname = $('#lname').val();
      var number = $('#number').val();
      var email = $('#email').val();
      var birthday = $('#birthday').val();
      var uinformation = $(this).serializeArray();
      console.log(uinformation);

      $.each(uinformation, function(i, field) {
        console.log(field.name, field.value);
        docCookies.setItem(field.name, field.value);
        console.log(field.name + ": " + docCookies.getItem(field.name));
      });


      if(document.getElementById("fname").value === '' || document.getElementById("lname").value === '' || document.getElementById("number").value === '' || document.getElementById("email") === ''){
        d.preventDefault();
        $('#header2').after('<li id="error">You have information missing!</li>');
      }
      // check if input boxes are empty
      if(document.getElementById("fname").value !== '' && document.getElementById("lname").value !== '' && document.getElementById("number").value !== '' && document.getElementById("email").value !== '')
      {
        if(d.target instanceof HTMLAnchorElement) d.preventDefault();
        // remove the error messages
        $('#error').remove();

        docCookies.setItem("fname", fname, "/traveler/index.html");
        docCookies.setItem("lname", lname, "/traveler/index.html");
        docCookies.setItem("number", number, "/traveler/index.html");
        docCookies.setItem("email", email, "/traveler/index.html");
        docCookies.setItem("birthday", birthday, "/traveler/index.html");

        console.log(docCookies.getItem("lname"));
        console.log(docCookies.getItem("fname"));
        console.log(docCookies.getItem("number"));
        console.log(docCookies.getItem("email"));
        console.log(docCookies.getItem("birthday"));
      }
    });

    $('#zipcode').on('keyup', function(e) {
      var zip = $('#zipcode').val();
      if(zip.length === 5){
        console.log("looks good to me!");}
      $.get('http://api.zippopotam.us/us/' + zip,
        function(data){
          $('#state').val(data.places[0]["state abbreviation"]);
          $('#city').val(data.places[0]["place name"]);
        });
    });

    $('#paymentinformation').on('submit', function(d)
    {

      var paymentInformation = $(this).serializeArray();
      console.log(paymentInformation);

      $.each(paymentInformation, function(i, field) {
        console.log(field.name, field.value);
        docCookies.setItem(field.name, field.value);
        console.log(field.name + ": " + docCookies.getItem(field.name));
      });

      var cardnum = $('#cardnumber').val();
      var expmonth = $('#expmonth').val();
      var expyear = $('#expyear').val();
      var username = $('#username').val();
      var address = $('#address').val();
      var city = $('#city').val();
      var zipcode = $('#zipcode').val();
      var state = $('#state').val();

      if(document.getElementById("cardnumber").value === '' || document.getElementById("expmonth").value === ''
       || document.getElementById("expyear").value === '' || document.getElementById("username").value === ''
      || document.getElementById("address").value === '' || document.getElementById("city").value === ''
      || document.getElementById("zipcode").value === '' || document.getElementById("state").value === '' ){
        d.preventDefault();
        $('#h2card').after('<li id="error2">There is missing information</li>');
        $('#h2card').after('<p id="reciept">RECIEPT: You requested ' + docCookies.getItem('quantity') + ' tickets, so the total for your departing and arrival flight will be $460 + $390 = $850</p>');
      }

      if(document.getElementById("cardnumber").value !== '' && document.getElementById("expmonth").value !== ''
      && document.getElementById("expyear").value !== '' && document.getElementById("username").value !== ''
      && document.getElementById("address").value !== '' && document.getElementById("city").value !== ''
      && document.getElementById("zipcode").value !== '' && document.getElementById("state").value !== '' ) {
        if(d.target instanceof HTMLAnchorElement) d.preventDefault();
        $('#error2').remove();

        docCookies.setItem('cardnum', cardnum, "/payment/index.html");
        docCookies.setItem('expmonth', expmonth, "/payment/index.html");
        docCookies.setItem('expyear', expyear, "/payment/index.html");
        docCookies.setItem('address', address, "/payment/index.html");
        docCookies.setItem('state', state, "/payment/index.html");
        docCookies.setItem('zipcode', zipcode, "/payment/index.html");
        docCookies.setItem('city', city, "/payment/index.html");
        docCookies.setItem('username', username, "/payment/index.html");

        console.log(docCookies.getItem('cardnum'));
        console.log(docCookies.getItem('username'));
        console.log(docCookies.getItem('expmonth'));
        console.log(docCookies.getItem('expyear'));
        console.log(docCookies.getItem('address'));
        console.log(docCookies.getItem('city'));
        console.log(docCookies.getItem('state'));
        console.log(docCookies.getItem('zipcode'));

      }
  });
 departdate = $('#departdate').val()
  console.log(document.cookie);
  $('.firstName').append(docCookies.getItem('fname'));
  $('#confirmationpg').append('<b>This is your quantity of tickets: ' + docCookies.getItem('quantity') + ' Adults: ' + docCookies.getItem('adult') + ' Seniors: ' +
   docCookies.getItem('senior') + ' Children: ' + docCookies.getItem('children') + ' Have a safe and enjoyable trip!!</b>');
})(jQuery);
