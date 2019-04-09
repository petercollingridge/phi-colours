var PHI = (1 + Math.sqrt(5)) / 2;
var dHue = PHI * 360;

var vm = new Vue({
    el: '#colour-range',
    data: {
       red: 0,
       green: 0,
       blue: 0,
       hue: 0,
       saturation: 0,
       lightness: 0,
       colourRange: 5,
       color1: 'rgb(0, 0, 0)'
    },
    computed: {
        hsl: function() {
            // https://www.rapidtables.com/convert/color/rgb-to-hsl.html
            var r = this.red / 255;
            var g = this.green / 255;
            var b = this.blue / 255;

            var cMin = Math.min(r, g, b);
            var cMax = Math.max(r, g, b);
            var d = cMax - cMin;

            if (d === 0) {
                this.hue = 0;
            } else if (cMax === r) {
                this.hue = ((g - b) / d) % 6;
            } else if (cMax === g) {
                this.hue = (b - r) / d + 2;
            } else if (cMax === b) {
                this.hue = (r - g) / d + 4;
            }

            this.hue *= 60;
            this.lightness = (cMin + cMax) / 2;
            this.saturation = d ? d / this.absLightness(this.lightness) : 0;

            this.color1 = "rgb(" + this.red + ", " + this.green + ", " + this.blue + ")";

            return Math.round(this.hue) + ", " + Math.round(this.saturation * 100) / 100 + " " + Math.round(this.lightness * 100) / 100;
        },
        colours: function() {
            var colours = [];
            var n = parseInt(this.colourRange);

            for (var i = 0; i < n; i++) {
                var hue = (this.hue + dHue * i) % 360;
                var rgb = this.HSL2RGB(hue, this.saturation, this.lightness);
                colours.push(rgb);
            }
            return colours;
        }
    },
    methods: {
        HSL2RGB: function(hue, saturation, lightness) {
            var c = this.absLightness(lightness) * saturation;
            var x = c * (1 - Math.abs((hue / 60) % 2 - 1));
            var m = lightness - c * 0.5;

            var r = g = b = 0;

            if (hue < 60) {
                r = c; g = x;
            } else if (hue < 120) {
                r = x; g = c;
            } else if (hue < 180) {
                g = c; b = x;
            } else if (hue < 240) {
                g = x; b = c;
            } else if (hue < 300) {
                r = x; b = c;
            } else {
                r = c; b = x;
            } 

            r = (r + m) * 255;
            g = (g + m) * 255;
            b = (b + m) * 255;

            return [r, g, b];
        },
        absLightness: function(lightness) {
            return 1 - Math.abs(2 * lightness - 1);
        },
        getColourString: function(rgb) {
            return "rgb(" + rgb.map(Math.round).join(", ") + ")";
        },
        getStyle: function(rgb) {
            return {
                backgroundColor: this.getColourString(rgb)
            };
        }
    },

});
