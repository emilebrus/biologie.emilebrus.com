function getPageParams () {
    var result = {};
    var vars = window.location.search.substring(1).split("&");
    for (var i = 0; i<vars.length; i++) {
        var pair = vars[i].split("=");
        var pair0 = pair[0];
        var pair1 = pair[1];
        if (typeof result[pair0]==="undefined") {
            // first entry with this name
            result[pair0] = pair1;
        } else if (typeof result[pair0]==="string") {
            // second entry with this name
            result[pair0] =
                [
                    result[pair0],
                    pair1
                ];
        } else {
            // If third or later entry with this name
            result[pair0].push(pair1);
        }
    }
    return result;
}

var MVG_PAGE;
var MVG_P0S;
var MVG_P1S;
var MVG_P2S;
var MVG_P3S;
var MVG_P4S;
var MVG_BARBUTTONS;

function showIf (c, l) {
    if (c) {
        l.fadeIn(500);
    } else {
        l.hide();
    }
}

function selectPage (p, pushHist) {
    if (p!==MVG_PAGE) {
        MVG_PAGE = p;
        showIf(MVG_PAGE==="p0", MVG_P0S);
        showIf(MVG_PAGE==="p1", MVG_P1S);
        showIf(MVG_PAGE==="p2", MVG_P2S);
        showIf(MVG_PAGE==="p3", MVG_P3S);
        showIf(MVG_PAGE==="p4", MVG_P4S);

        MVG_BARBUTTONS.removeClass("act").addClass("inact");
        $("."+MVG_PAGE.toUpperCase()).removeClass("inact").addClass("act");
        if (pushHist) {
            history.pushState({}, "", "?page="+MVG_PAGE);
        }
    }
}

function getPageParamsAndSelectState () {
    $.fancybox.close();
    selectState(getPageParams());
}

function selectState (pageParams) {
    var defaultPage = "p0";
    selectPage(pageParams.page && pageParams.page.match(/p[0-4]/) ? pageParams.page : defaultPage, false);
}

function buttonBarClick () {
    selectPage($(this).first().attr("page"), true);
}

function makeButtonBar (titles) {
    document.write('<div class="buttonBar noselect abs">');
    var left = 0;
    $.each(titles, function (i) {
        document.write('<div page=p'+i+' style="left:'+left+'px" class="P'+i+' inact abs"><span class="abs" style:"z-index: 100">'+titles[i]+'</span></div>');
        left += 111;
    });
    document.write('<div class="left abs" style="left:'+left+'px">');
    document.write('</div>');
    left += 33;
    document.write('<div class="middle abs" style="left:'+left+'px;width:'+(858-left)+'px">');
    document.write('</div>');
    left = 858;
    document.write('<div class="right abs" style="left:'+left+'px">');
    document.write('</div>');
    document.write('</div>');
}

$(function () {
    // this is an attempt to hide the email address from harvesters (zero width space and at sign as calc):
    var at = '&#8203;&#'+(63+1)+';&#8203;';
    var dot = '&#8203;.&#8203;';
    $('.fillWithMail').html("info"+at+"modelingvalue"+dot+"nl");

    MVG_P0S = $(".p0");
    MVG_P1S = $(".p1");
    MVG_P2S = $(".p2");
    MVG_P3S = $(".p3");
    MVG_P4S = $(".p4");
    MVG_BARBUTTONS = $(".P0,.P1,.P2,.P3,.P4");
    MVG_BARBUTTONS.click(buttonBarClick);

    $("#sfSmall").fancybox({
        'openSpeed' : 800,
        'closeSpeed': 500,
        title       : function () {
            return "Principe schema van Next Level Software Factories"
        }
    });

    window.onpopstate = getPageParamsAndSelectState;
    getPageParamsAndSelectState();
});
