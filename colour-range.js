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

            this.hue *= 60;
            this.lightness = (cMin + cMax) / 2;
            this.saturation = d ? d / (1 - Math.abs(2 * this.lightness - 1)) : 0;

            this.color1 = "rgb(" + this.red + ", " + this.green + ", " + this.blue + ")";

            return Math.round(this.hue) + ", " + Math.round(this.saturation * 100) / 100 + " " + Math.round(this.lightness * 100) / 100;
        },
        nColours: function() {
            return parseInt(this.colourRange);
        }
    },
    methods: {

    },

});
