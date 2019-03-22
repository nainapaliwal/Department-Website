
$(document).ready(function () {

    $('#nav').sidr();

    // About

    xhr('get', { path: '/about/' }, '#about').done(function (json) {
        $('#title').append('<h2>' + json.title + '</h2>');
        $('#description').append('<h4>' + json.description + '</h4>');
        $('#quote').append('<h5><i class="fa fa-quote-left" aria-hidden="true"></i>  ' + json.quote + '  <i class="fa fa-quote-right" aria-hidden="true"></i></h5>');
        $('#author').append('<h5>' + json.quoteAuthor + '</h5>');
    });

    //minors

    xhr('get', { path: '/minors/' }, '#minors').done(function (json) {
        //   console.log(json);
        var x = '';
        $.each(json.UgMinors, function (i, item) {
            x += '<div class="my_popup_open"  style="text-align:center; width: 200px; float:left; height:150px;  background:orange; margin:50px; margin-left: 40px; margin-top: 20px; cursor:pointer; " ' +
                ' data-minorname="' + item.name + '" >';

            x += '<p style="text-align: center;">' + item.title + '</p>'
                + '</div>';
        });
        $('#minors').append(x);
    });

    $(document).on('click', '.my_popup_open', function () {

        var minor_name = $(this).attr('data-minorname');
        $('#my_popup').empty();
        xhr('get', { path: '/minors/UgMinors/name=' + minor_name }).done(function (json) {
            console.log(json);
            var x = '';

            x += '<h3 color:red>' + json.title + '</h3><hr/>';
            x += '<h6 style="color:black; font-size:18px">' + json.description + '</h6>';
            $.each(json.courses, function (i, item) {
                x += '<h5 style="display:inline;">' + item + '<h5/>';
            });
            x += '<h6 color:black>' + json.note + '</h6>';
            $('#my_popup').append(x);
        });
    });

    //   undergraduate

    xhr('get', { path: '/degrees/undergraduate/' }, '#undergraduate').done(function (json) {
        console.log(json);
        var x = '';
        $.each(json.undergraduate, function (i, item) {
            x += '<div class="my_popup_open"  style="text-align:center; width: 200px; float:left; height:150px;  background:orange; margin:50px; margin-left: 40px; margin-top: 20px; cursor:pointer; " ' +
                ' data-undergraduate="' + item.degreeName + '" ><br/>';

            x += '<p style="text-align: center;">' + item.title + '</p>'
                + '</div>';
        });
        $('#undergraduate').append(x);
    });

    $(document).on('click', '.my_popup_open', function () {

        var degree_name = $(this).attr('data-undergraduate');
        $('#my_popup').empty();
        xhr('get', { path: '/degrees/undergraduate/degreeName=' + degree_name }).done(function (json) {
            console.log(json);

            var x = '';

            x += '<h3 color:red>' + json.title + '</h3><hr/>';
            x += '<h6 style="color:black; font-size:18px">' + json.description + '</h6><br><h4>Concentrations:</h4>';
            $.each(json.concentrations, function (i, item) {
                console.log(item);
                x += '<h5 style="display:inline;">' + item + '<h5/>';
            });
            $('#my_popup').append(x);
        });
    });

    // graduate

    xhr('get', { path: '/degrees/graduate/' }, '#graduate').done(function (json) {
        //   console.log(json);
        var x = '';
        $.each(json.graduate, function (i, item) {

            if (i == 3) {
                x += '<div class="my_popup_open"  style="text-align:center; width: 200px; float:left; height:150px;  background:orange; margin:50px; margin-left: 40px; margin-top: 20px; cursor:pointer; " ' +
            ' data-graduate="' + item.degreeName + '" ><br/>';
                x += '<p style="text-align: center;">' + item.degreeName + '</p></div>';
            } else {

                x += '<div class="my_popup_open"  style="text-align:center; width: 200px; float:left; height:150px;  background:orange; margin:50px; margin-left: 40px; margin-top: 20px; cursor:pointer; " ' +
                    ' data-graduate="' + item.degreeName + '" ><br/>';

                x += '<p style="text-align: center;">' + item.title + '</p></div>';
            }
        });
        $('#graduate').append(x);
    });

    $(document).on('click', '.my_popup_open', function () {

        var degree_name = $(this).attr('data-graduate');
        $('#my_popup').empty();
        xhr('get', { path: '/degrees/graduate/degreeName=' + degree_name }).done(function (json) {
            console.log(json);
            var x = '';

            x += '<h3 color:red>' + json.title + '</h3><hr/>';
            x += '<h6 style="color:black; font-size:18px" >' + json.description + '</h6><h4>Concentrations:</h4>';
            $.each(json.concentrations, function (i, item) {
                x += '<h5 style="display:inline;">' + item + '<h5/>';
            });

            $('#my_popup').append(x);
        });
    });

    //To get data from the "PEOPLE" - faculty

    xhr('get', { path: '/people/faculty/' }, '#people').done(function (json) {
        var x = '<div class="wmg-container">';
        $.each(json.faculty, function (i, item) {
            x += '<div class="wmg-item"><div class="wmg-thumbnail"><div class="wmg-thumbnail-content">';
            x += '<img src= "' + item.imagePath + '" alt="image">';

            x += '</div><div class="wmg-arrow"></div></div><div class="wmg-details"><span class="wmg-close"><i class="fa fa-times" aria-hidden="true">' +
                 '</i></span><div class="wmg-details-content" style=" background:#ADD8E6 ; padding: 20px;">';

            x += '<div class="container exemplo"><div class="row"><div class="col-md-6"></div><div class="col-md-6">';
            x += '<h2>' + item.name + '</h2><hr>';

            x += '<p>' + item.username + '<br>' + item.tagline + '<br>' + item.title + '<br>Interest Area: ' + item.interestArea + '<br><i class="fa fa-map-marker" aria-hidden="true"></i> ';
            x += item.office + '<br>' + item.website + '<br><i class="fa fa-phone" aria-hidden="true"></i> ' + item.phone + '<br><i class="fa fa-envelope" aria-hidden="true"></i> ' + item.email + '<br>';

            if (item.website !== null) { x += item.website + '<br>' };
            
            x += '</p></div></div></div></div></div></div>';
        });
        x += '</div>';
        $('#people').append(x);
        $('.wmg-container').WMGridfolio();
    });

    //To get data from the "PEOPLE" - staff

    xhr('get', { path: '/people/staff/' }, '#staff').done(function (json) {
        var x = '<div class="wmg-container">';
        $.each(json.staff, function (i, item) {
            x += '<div class="wmg-item"><div class="wmg-thumbnail"><div class="wmg-thumbnail-content">';
            x += '<img src= "' + item.imagePath + '" alt="image">';

            x += '</div><div class="wmg-arrow"></div></div><div class="wmg-details"><span class="wmg-close"><i class="fa fa-times" aria-hidden="true">' +
                 '</i></span><div class="wmg-details-content" style=" background:#ADD8E6 ; padding: 20px;">';

            x += '<div class="container exemplo"><div class="row"><div class="col-md-6"></div><div class="col-md-6">';
            x += '<h2>' + item.name + '</h2><hr>';

            x += '<p>' + item.username + '<br>' + item.tagline + '<br>' + item.title + '<br>Interest Area: ' + item.interestArea + '<br><i class="fa fa-map-marker" aria-hidden="true"></i> ';
            x += item.office + '<br>' + item.website + '<br><i class="fa fa-phone" aria-hidden="true"></i> ' + item.phone + '<br><i class="fa fa-envelope" aria-hidden="true"></i> ' + item.email + '<br>';

            if (item.website !== null) { x += item.website + '<br>' };

            x += '</p></div></div></div></div></div></div>';
        });
        x += '</div>';
        $('#staff').append(x);
        $('.wmg-container').WMGridfolio();
    });

    // research by faculty

    xhr('get', { path: '/research/byFaculty/' }, '#researchFac').done(function (json) {
        //   console.log(json);
        var x = '';
        $.each(json.byFaculty, function (i, item) {
            x += '<div class="my_popup_open"  style="text-align:center; width: 200px; float:left; height:100px;  background:lightgreen; margin:50px; margin-left: 40px; margin-top: 20px; cursor:pointer; " ' +
                ' data-username="' + item.username + '" ><br/>';

            x += '<p style="text-align: center;">' + item.facultyName + '</p>'
                + '</div>';
        });
        $('#researchFac').append(x);
    });

    $(document).on('click', '.my_popup_open', function () {

        var username = $(this).attr('data-username');
        $('#my_popup').empty();
        xhr('get', { path: '/research/byFaculty/username=' + username }).done(function (json) {
            var x = '';
            x += '<h3 color:black>' + json.facultyName + '</h3><hr/>';
            $.each(json.citations, function (i, item) {
                x +=  (i+1)+'. <h5 style="display:inline;">'  + item + '<h5/>';
            });
            $('#my_popup').append(x);
        });
    });

    // research by interest area

    xhr('get', { path: '/research/byInterestArea/' }, '#researchArea').done(function (json) {
        //   console.log(json);
        var x = '';
        $.each(json.byInterestArea, function (i, item) {
            x += '<div class="my_popup_open"  style="text-align:center; width: 200px; float:left; height:100px;  background:lightgreen; margin:50px; margin-left: 40px; margin-top: 20px; cursor:pointer; " ' +
                ' data-areaName="' + item.areaName + '" ><br/>';
            x += '<p style="text-align: center;">' + item.areaName + '</p>'
              + '</div>';
        });
        $('#researchArea').append(x);
    });

    $(document).on('click', '.my_popup_open', function () {

        var areaName = $(this).attr('data-areaName');
        $('#my_popup').empty();
        xhr('get', { path: '/research/byInterestArea/areaName=' + areaName }).done(function (json) {
            console.log(json);
            var x = '';
            x += '<h3 color:black>' + json.areaName + '</h3><hr/>';
            $.each(json.citations, function (i, item) {
                x += (i + 1) + '. <h5 style="display:inline;">' + item + '<h5/>';
            });
            $('#my_popup').append(x);
        });
    });

    // Initialize the popup plugin
    $('#my_popup').popup({
        transition: 'all 0.3s'
    });

    // Employment

    xhr('get', { path: '/employment/' }, '#employment').done(function (json) {
        console.log(json);

        $('#e_quote').append('<h2>' + json.introduction.title + '</h2>');
        var x = '' ;
        x += '<div style="overflow: hidden; padding-bottom: 20px ;float:center">';
        $.each(json.introduction.content, function (i, item) {
            x += '<h3 style="font-weight: bold;text-align:center;font-size:18px">' + item.title + '</h3>';
            x += '<hr><p style="font-size:14px ;text-align:justify; margin:5px 20px 2px 20px;">' + item.description + '</p>';

        });
        x += '</div>';

        $.each(json.degreeStatistics.statistics, function (i, stat) {
            x += '<div style="float:left;height:150px;width:24%;margin:5px;background-color:white;border:1px solid black;margin-bottom:50px">';
      
            x += '<span style="color:black">' + stat.value + '</span>';
            x += '<p style="color:black; font-size:18px">' + stat.description + '</p>';
            x += '</div>';
        
        });
        x += '</div>';
        $('#employment').append(x);

    });
    
    // footer - social links

    xhr('get', { path: '/footer/' }, '#footer').done(function (json) {
        $('#social').append('<h2>' + json.social.title + '</h2>');
    
        $('#by').append('<p>  ' + json.social.by + '  </p>');
        $('#tweet').append('<p>' + json.social.tweet + '<p>');
        $('#twitter').append('<a href="' + json.social.twitter + '"><span style="margin-left: 20px"><i class="fa fa-twitter fa-2x" style="color:white"></i><span style="margin-left: 20px"></span></a>');
        $('#facebook').append('<a href="' + json.social.facebook + '"><i class="fa fa-facebook fa-2x" style="color:white"></i><span style="margin-left: 20px"></span></a>');
    });
      

    function xhr(getPost, d, idForSpinner) {
        return $.ajax({
            type: getPost,
            dataType: 'json',
            data: d,
            cache: false,
            async: true,
            url: 'proxy.php',
            beforeSend: function () {
                $(idForSpinner).append('<img src="img/gears.gif" class="spin"/>');
            }
        }).always(function () {
           
            $(idForSpinner).find('.spin').fadeOut(500, function () {
                $(this).remove();
            });
        }).fail(function (err) {
            console.log(err);
        });
    }

}); // doc end
 