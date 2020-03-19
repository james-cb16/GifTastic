$(document).ready(function () {
    var t = ["trending", "nbc", "football", "coronavirus", "funny", "tiktok", "health", "coachella", "kawaii"];

    function a(t, a, i) {
        $(i).empty();
        for (var e = 0; e < t.length; e++) {
            var n = $("<button>");
            n.addClass(a), n.attr("data-type", t[e]), n.text(t[e]), $(i).append(n)
        }
    }
    $(document).on("click", ".gif-button", function () {
        $("#APIresponse").empty(), $(".gif-button").removeClass("active"), $(this).addClass("active");
        var t = "http://api.giphy.com/v1/gifs/search?q=" + $(this).attr("data-type") + "&api_key=dc6zaTOxFJmzC&limit=40";
        $.ajax({
            url: t,
            method: "GET"
        }).then(function (t) {
            for (var a = t.data, i = 0; i < 5; i++) {
                var e = Math.floor(20 * Math.random()),
                    n = $('<div class="gif-item">'),
                    r = a[e].rating,
                    s = $("<p>").text("Rating: " + r),
                    o = a[e].images.fixed_height.url,
                    d = a[e].images.fixed_height_still.url,
                    c = $("<img>");
                c.attr("src", d), c.attr("data-inert", d), c.attr("data-animate", o), c.attr("data-state", "inert"), c.addClass("gif-image"), n.append(s), n.append(c), $("#APIresponse").append(n)
            }
        })
    }), $(document).on("click", ".gif-image", function () {
        "inert" === $(this).attr("data-state") ? ($(this).attr("src", $(this).attr("data-animate")), $(this).attr("data-state", "animate")) : ($(this).attr("src", $(this).attr("data-inert")), $(this).attr("data-state", "inert"))
    }), $("#addGif").on("click", function (i) {
        i.preventDefault();
        var e = $("input").eq(0).val();
        e.length > 2 && t.push(e), a(t, "gif-button", "#gif-buttons")
    }), a(t, "gif-button", "#gif-buttons")
});