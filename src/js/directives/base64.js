// This is a special file input which is able to convert an image into text before we send it to the API.

angular
  .module('itineraryApp')
  .directive('base64', base64);

function base64() {
  // The FileRead does the grunt work for us
  const fileReader = new FileReader();

  return {
    restrict: 'A', // Setting up Attribute that will be set on the file input
    require: 'ngModel', // Requiring ngModel because we want to use ngModel on our file input and be able to access data from it.

    // Get hold of a file in the directive
    link($scope, element, attrs, ngModel) {
      console.log(element);
      fileReader.onload = function fileLoaded() {
        console.log(fileReader.result);
        ngModel.$setViewValue(fileReader.result);
      };

      // When user selects an image to upload a CHANGE EVENT is triggered
      element.on('change', (e) => {
        const file = (e.target.files || e.dataTransfer.files)[0]; // Browser compatible
        console.log(file);
        fileReader.readAsDataURL(file); // Tell file reader to read the file then get the result by setting a custom function the fileReaders ONLOAD method.
      });
    }
  };
}



// Note: HTML5 FileReader reads files and converts them into various formats. The one we are interested in is base64.
