export function specialViewMode(canvas, cropBox) {
    var newCanvasData = {};
    var cropBoxAspectRatio = cropBox.width / cropBox.height;
    var cropBoxRight = cropBox.left + cropBox.width;
    var cropBoxBottom = cropBox.top + cropBox.height;
    var canvasAspectRatio = canvas.width / canvas.height;
    var canvasRight = canvas.left + canvas.width;
    var canvasBottom = canvas.top + canvas.height;
    var checkHorizontalBorders = function (isBigger) {
        if (compare(cropBox.left, canvas.left, isBigger)) {
            newCanvasData.left = cropBox.left;
        } else if (compare(canvasRight, cropBoxRight, isBigger)) {
            newCanvasData.left = cropBoxRight - canvas.width;
        }
    };
    var checkVerticalBorders = function (isBigger) {
        if (compare(cropBox.top, canvas.top, isBigger)) {
            newCanvasData.top = cropBox.top;
        } else if (compare(canvasBottom, cropBoxBottom, isBigger)) {
            newCanvasData.top = cropBoxBottom - canvas.height;
        }
    };
    var checkNewWidth = function (newCanvasWidth) {
        if (newCanvasWidth !== canvas.width) {
            newCanvasData.width = newCanvasWidth;
        }
    };
    var options = {
        width: Math.max(canvas.width, cropBox.width),
        horizontal: false,
        vertical: canvas.height < cropBox.height
    };
    if (canvasAspectRatio < cropBoxAspectRatio) {
        options.width = Math.max(canvas.height, cropBox.height) * canvasAspectRatio;
        options.horizontal = canvas.width < cropBox.width;
        options.vertical = false;
    }
    checkNewWidth(options.width);
    checkHorizontalBorders(options.horizontal);
    checkVerticalBorders(options.vertical);
    return newCanvasData;
}
/**
 * If the opposite param is set to false then the function will actually be isSmaller.
 *
 * @param a
 * @param b
 * @param isBigger
 * @returns {boolean}
 */
function compare (a, b, isBigger) {
    return Math.round(a) > Math.round(b) === isBigger && Math.round(a) !== Math.round(b);
}