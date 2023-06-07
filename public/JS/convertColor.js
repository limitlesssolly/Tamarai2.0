function convertColorStringToRGB(colorString) {
    var canvas = document.createElement('canvas');
    canvas.width = canvas.height = 1;
    var ctx = canvas.getContext('2d');
    ctx.fillStyle = colorString;
    ctx.fillRect(0, 0, 1, 1);
    var data = ctx.getImageData(0, 0, 1, 1).data;
    return "rgb(" + data[0] + ", " + data[1] + ", " + data[2] + ")";
}
