$(document).ready(function() {
  // prevent from calling onchange recursively
  var isRootEvent = true;
  $('.colorpicker-component').colorpicker()
    .on('changeColor', function(e) {
      if (isRootEvent) {
        isRootEvent = false;
        $(e.currentTarget).children('input').trigger('change', false);
        isRootEvent = true;
      }
    });
});



var vm = new Vue({
  el: '#content',

  data: {
    theme: {
      backgroundColor: '#ccc',
      color: ['#ffcc00', '#ccff00', '#00ffcc', '#00ccff']
    }
  },

  methods: {
    aaa: function() {
      console.log(arguments);
    }
  }
});
