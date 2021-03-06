/**
 * ImageGrid contains functions for creating a grid of images
 * and then removing images from it without the remaining ones shifting about
 */
class ImageGrid {
  constructor(parentDiv, imgPath, maxWidth) {
    this.$parent = parentDiv;
    this.imagePath = imgPath;
    this.maxWidth = maxWidth;
  }

  /**
   * Creates a grid of the given number of images.
   * Bound by the variables set at creation
   */
  createGrid(size) {
    this.allSticks = [];
    this.$parent.html('');
    var fullHtml = "";
    var i = 0;
    var row = 1;
    var separator = '<div id="row-' + row + '" class="row col-12">\n';
    var container = '<div class="stick-image-container">\n';
    var end = '</div>\n'
    while (i < size) {
      fullHtml += separator;
      while (i < (this.maxWidth * row) && i < size) {
        fullHtml += container + '<img src="' + this.imagePath + '" id="img-' + i + '" class="img-grid-img"/>\n' + end;
        this.allSticks.push(i);
        i++;
      }
      fullHtml += end;
      row++;
      separator = '<div id="row-' + row + '" class="row col-12">\n';
    }
    this.$parent.html(fullHtml)
  }

  /**
   * Hides the given number of top-left-most visible sticks by adding the d-none class.
   * As such the remaining sticks don't move
   */
  removeSticks(num) {
    for (var i=0; i < num; i++) {
      $('#img-' + this.allSticks[0]).addClass('d-none'); // Hide item 0 from user
      this.allSticks.shift(); // Remove item 0 from list to get a new item 0
    }
  }
}

module.exports = {
  ImageGrid
}
