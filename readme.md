## cropperSVM
This package is an extension that was created for cropperjs plugin in order to have a new view mode that allows you to limit the cropping options into the inner edges of the cropbox.

It never allows the image to have shorter sides than the cropbox on all four sides in the same moment.

Simple implementation example:
```
import { specialViewMode } from 'croppersvm';

var image = document.getElementById('image');
var cropper = new Cropper(image, {
  aspectRatio: 16 / 9,
  viewMode: 0,
  crop: function(e) {
    var cropBox = cropper.getCropBoxData();
    var canvas = cropper.getCanvasData();

    var newCanvasData = specialViewMode(canvas, cropBox);

    if (newCanvasData.hasOwnProperty('width') ||
        newCanvasData.hasOwnProperty('left') ||
        newCanvasData.hasOwnProperty('top')
    ) {
        cropper.setCanvasData(newCanvasData);
    }
  }
});
```