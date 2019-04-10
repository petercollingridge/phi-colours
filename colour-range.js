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

            if (this.hue < 0) { this.hue += 6; }
            this.hue = Math.round(this.hue * 60);
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
    watch: {
        // red: function() { this.updateHSL(); },
        // green: function() { this.updateHSL(); },
        // blue: function() { this.updateHSL(); },
        // hue: function() { this.updateRGB(); },
        // saturation: function() { this.updateRGB(); },
        // lightness: function() { this.updateRGB(); },
    },
    methods: {
        updateHSL: function(evt, attr) {
            this[attr] = evt.target.value;
            var hsl = this.RBG2HSL(this.red, this.blue, this.green);
            this.hue = hsl[0];
            this.saturation = hsl[1];
            this.lightness = hsl[2];
        },
        updateRGB: function() {
            var rgb = this.HSL2RGB(this.hue, this.saturation, this.lightness);
            this.red = rgb[0];
            this.green = rgb[1];
            this.blue = rgb[2];
        },
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
        RBG2HSL: function(red, blue, green) {
            // https://www.rapidtables.com/convert/color/rgb-to-hsl.html
            red /= 255;
            green /= 255;
            blue /= 255;

            var cMin = Math.min(red, green, blue);
            var cMax = Math.max(red, green, blue);
            var d = cMax - cMin;

            var hue;
            if (d === 0) {
                hue = 0;
            } else if (cMax === red) {
                hue = ((green - blue) / d) % 6;
            } else if (cMax === green) {
                hue = (blue - red) / d + 2;
            } else if (cMax === blue) {
                hue = (red - green) / d + 4;
            }

            if (hue < 0) { hue += 6; }
            hue = Math.round(hue * 60);

            var lightness = (cMin + cMax) / 2;
            var saturation = d ? Math.round(100 * d / this.absLightness(lightness)) / 100  : 0;
            lightness = Math.round(100 * lightness) / 100;

            return [hue, saturation, lightness];
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
