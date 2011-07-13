/**
 * Contrasting Text Color v0.1
 * jQuery Plugin for adjusting the text color based on the object's brackground color.
 *
 * Free to use.
 */
(function($) {
	$.fn.extend({
		adjustColor: function(options) {
			
			var defaults = {
				darkShadow: '0 1px 0 #000',
				lightShadow: '0 1px 0 #fff'
			}
			
			var options = $.extend(defaults, options);
			
			return this.each(function() {
				var o = options;
				var $obj = $(this);
				var mycolor = rgb2hex($obj.css('background-color'));
				var textcolor = idealTextColor(mycolor);

				$obj.css('color',textcolor);
				if (textcolor == '#ffffff') {
					$obj.css('text-shadow',o.darkShadow);
				} else {
					$obj.css('text-shadow',o.lightShadow);
				}
				
			});
		}
	});

	// Converts RGB to HEX
	// http://stackoverflow.com/questions/638948/background-color-hex-to-javascript-variable-jquery
	function rgb2hex(rgbString) {
		var parts = rgbString.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);

		if (!parts) { return; }

		delete (parts[0]);
		
		for (var i = 1; i <= 3; ++i) {
		    parts[i] = parseInt(parts[i]).toString(16);
		    if (parts[i].length == 1) parts[i] = '0' + parts[i];
		}
		return '#'+parts.join('');

	}
	

	// Gets the ideal color based on the given bgColor
	// http://stackoverflow.com/questions/4726344/how-do-i-change-text-color-determined-by-the-background-color
	function idealTextColor(bgColor) {
		
		if (!bgColor) { return; }
		
		var nThreshold = 105;
		var components = getRGBComponents(bgColor);
		var bgDelta = (components.R * 0.299) + (components.G * 0.587) + (components.B * 0.114);
		return ((255 - bgDelta) < nThreshold) ? "#000000" : "#ffffff";   
	}
	function getRGBComponents(color) {       

	    var r = color.substring(1, 3);
	    var g = color.substring(3, 5);
	    var b = color.substring(5, 7);

	    return {
	       R: parseInt(r, 16),
	       G: parseInt(g, 16),
	       B: parseInt(b, 16)
	    };
	}

})(jQuery);
