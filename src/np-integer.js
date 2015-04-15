angular.module('np.integer', [])

.directive('npInteger', ['$interval', function($interval) {
  return {
    restric: 'A',
    require: 'ngModel',
    link: function(scope, element, attrs, ctrl) {
      element.keydown(function(evt) {
        var code = evt.keyCode,
          allowed = [8, 9, 46, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 35, 36, 37, 38, 39, 40, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105];
        if (!evt.metaKey && allowed.indexOf(code) === -1) {
          var input = String.fromCharCode(code);
          if (/[^\d]+/.test(input))
            return false;
        }
      });
      element.on('paste', function(evt) {
        var input = evt.originalEvent.clipboardData.getData('Text');
        $interval(function() {
          var val = element.val().replace(/[^0-9]+/g, '');
          element.val(val);
          ctrl.$setViewValue(val);
        }, 100);
      });
    }
  };
}]);