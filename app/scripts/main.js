$(document).ready(function() {
  $('.color').colorpicker({
    align: 'left'
  }).on('changeColor', function(e) {
    console.log(vm);
    var rgba = e.color.toRGB();
    var rgbaStr = 'rgba(' + rgba.r + ', ' + rgba.g + ', ' + rgba.b + ', '
      + rgba.a + ')';
    vm.changeColor(rgbaStr);
  });
});

var vm = new Vue({
  el: '#acc-theme-color',

  data: {
    colors: ['#ffcc00', '#ccff00', '#00ffcc', '#00ccff'],
    selectedColorId: null
  },

  methods: {
    changeColor: function(color) {
      this.$set('colors[' + this.selectedColorId + ']', color);
    },

    selectColor: function(id) {
      this.$set('selectedColorId', id);
    }
  }
});
