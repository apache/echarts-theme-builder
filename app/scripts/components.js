/**
 * Vue color tag
 */
var VueColor = Vue.extend({

  template: '<div class="input-group colorpicker-component">'
          +   '<input type="text" class="form-control" debounce="2000" />'
          +   '<span class="input-group-addon"><i></i></span>'
          + '</div>',

  mounted: function () {
    var vm = this;
    var $el = $(this.$el);
    $el.find('input').val(this.color);
    $el.colorpicker().on('changeColor', function () {
      // Avoid colorpicker will format the color string and cause vm updated
      // twice when editing the hex value
      var colorStr = $el.find('input').val();
      var isColorValid = echarts.color.parse(colorStr);
      if (isColorValid) {
        vm.$set(vm, 'color', colorStr);
      }
    });
    vm.$watch('color', function(newV) {
      $el.colorpicker('setValue', newV);
      vm.$emit('update:color', newV);
    });
  },

  props: {
    color: {
      twoWay: true
    }
  }
});

Vue.component('color', VueColor);



/**
 * Vue color list tag
 */
var VueColorList = Vue.extend({

  template: '<div>'
          +   '<div v-for="(color, $index) in colors" v-bind:track-by="$index">'
          +     '<color :color.sync="colors[$index]"></color>'
          +   '</div>'
          +   '<div class="theme-color-control">'
          +     '<a v-on:click="addColor()">增加</a>'
          +     '<a v-on:click="removeColor()" v-show="colors.length > 1">减少</a>'
          +   '</div>'
          + '</div>',

  props: {
    colors: {
      twoWay: true
    }
  },

  watch: {
    colors: {
      handler: function (newVal) {
        this.$emit('update:colors', newVal);
      },
      deep: true
    }
  },

  methods: {
    addColor: function () {
      this.colors.push('#333333');
    },
    removeColor: function () {
      this.colors.pop();
    }
  }
});

Vue.component('color-list', VueColorList);

/**
 * Vue number config tag
 */
var VueNumberConfig = Vue.extend({
  template:
          '<div class="form-group">' +
          '  <div class="col-sm-3">' +
          '    <input type="checkbox" v-model="enabled" v-if="canDisable" />' +
          '    <label class="control-label">{{title}}</label>' +
          '  </div>' +
          '  <div class="col-sm-9">' +
          '    <div class="input-group" v-show="enabled">' +
          '      <input type="number" v-model="value" class="form-control" />' +
          '    </div>' +
          '  </div>' +
          '</div>',

  props: {
    title: String,
    canDisable: {
      type: Boolean,
      default: false
    },
    value: {
      twoWay: true
    },
    enabled: {
      twoWay: true,
      default: true
    }
  },

  watch: {
    value: function (newVal) {
      this.$emit('update:value', newVal)
    },
    enabled: function (newVal) {
      this.$emit('update:enabled', newVal)
    }
  }
});

Vue.component('config-number', VueNumberConfig);

/**
 * Vue color config tag
 */
var VueColorConfig = Vue.extend({
  template:
          '<div class="form-group">' +
          '  <div class="col-sm-3">' +
          '    <input type="checkbox" v-model="enabled" v-if="canDisable" />' +
          '    <label class="control-label">{{title}}</label>' +
          '  </div>' +
          '  <div class="col-sm-9">' +
              // FIXME Why still needs sync?
          '    <color :color.sync="color" v-show="enabled"></color>' +
          '  </div>' +
          '</div>',

  props: {
    title: String,
    canDisable: {
      type: Boolean,
      default: false
    },
    color: {
      twoWay: true
    },
    enabled: {
      twoWay: true,
      default: true
    }
  },

  watch: {
    color: function (newVal) {
      this.$emit('update:color', newVal)
    },
    enabled: function (newVal) {
      this.$emit('update:enabled', newVal)
    }
  }
});
Vue.component('config-color', VueColorConfig);

/**
 * Vue color list config tag
 */
var VueColorListConfig = Vue.extend({
  template:
          '<div class="form-group">' +
          '  <div class="col-sm-3">' +
          '    <input type="checkbox" v-model="enabled" v-if="canDisable" />' +
          '    <label class="control-label">{{title}}</label>' +
          '  </div>' +
          '  <div class="col-sm-9">' +
          '    <color-list :colors.sync="colors" v-show="enabled"></color-list>' +
          '  </div>' +
          '</div>',

  props: {
    title: String,
    canDisable: {
      type: Boolean,
      default: false
    },
    colors: {
      twoWay: true
    },
    enabled: {
      twoWay: true,
      default: true
    }
  },

  watch: {
    colors: {
      handler: function (newVal) {
        this.$emit('update:colors', newVal)
      },
      deep: true
    },
    enabled: function (newVal) {
      this.$emit('update:enabled', newVal)
    }
  }
});
Vue.component('config-color-list', VueColorListConfig);
