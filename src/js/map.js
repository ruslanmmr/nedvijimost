$(document).ready(function () {
  visibleMaps();
});
$(document).scroll(function () {
	visibleMaps();
});
var flag = true;
function visibleMaps() {
	var s_top = $("html, body").scrollTop(),
			o_block = $(".place__container").offset().top,
			v_height = $(window).height();
	if(s_top > o_block - v_height && flag){
		maps();
		flag = false;
	}
}
function maps() {
	$(document).on("click", "[data-media]", function () {
		if ($(this).hasClass("active")) {
			return false
		}
		$("[data-media]").removeClass("active");
		$(this).addClass("active");
		$("[data-media]").each(function () {
			var d = $("#" + $(this).data("media"));
			d.hide();
			var c = d.find("iframe");
			if (c) {
				c.attr("src", c.attr("src"))
			}
		});
		var b = $("#" + $(this).data("media"));
		b.show();
		return false
	});
	$('[role="map"]').click(function () {
		var c = $(this).data("latitude");
		var d = $(this).data("longitude");
		var e = $(this).data("map-id");
		var b = $(this).data("exist");
		if (!b) {
			$(this).data("exist", true);
			ymaps.ready(function () {
				var f = new ymaps.Map(e, {
					center: [c, d],
					zoom: 17
				});
				f.behaviors.disable("scrollZoom");
				var g = new ymaps.Placemark([c, d], {}, {
					draggable: true,
				});
				f.geoObjects.add(g)
			})
		}
	});
	$('[role="map"][data-map-load="true"]').click();
	$('[role="panorama"]').click(function () {
		var c = $(this).data("latitude");
		var e = $(this).data("longitude");
		var f = $(this).data("map-id");
		var b = $(this).data("exist");
		if (!b) {
			$(this).data("exist", true);
			var d = ymaps.panorama.locate([c, e]);
			d.then(function (g) {
				if (g.length) {
					var h = new ymaps.panorama.Player(f, g[0]);
					$("#mapPanoramaFoto").detach()
				} else {
					$("#mapPanorama").hide();
					$("#mapPanoramaFoto").show()
				}
			}, function (g) {
				$("#mapPanorama").hide();
				$("#mapPanoramaFoto").show()
			})
		}
	});
	$('[role="national"]').click(function () {
		var c = $(this).data("latitude");
		var d = $(this).data("longitude");
		var e = $(this).data("map-id");
		var b = $(this).data("exist");
		if (!b) {
			$(this).data("exist", true);
			DG.then(function () {
				var f = DG.map(e, {
					center: [c, d],
					zoom: 17,
					scrollWheelZoom: false
				});
				DG.marker([c, d]).addTo(f)
			})
		}
	});
}