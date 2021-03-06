# Sorting Algorithms interactive

**Original Author:** Jack Morgan
**Modified by:** Hayley van Waas, Alasdair Smith

This interactive is created for teaching sorting algorithms; mainly selection, quick, and merge sort.

The interactive will run with one row of boxes (used for selection sort) by default.
A second row of boxes can be shown/hidden with a button press or through URL parameters.

## URL Parameters

- `method=quick` adds a second row for boxes (used for merge and quick sort).
- `peek=true` reveals an eye symbol that shows the weights of each box to the user when clicked on.
- `data=[sorted|almost|random|reverse] (default: random)` sets the type of data for the user to sort.

## Assets

- Both the Eye icon and Closed Eye icon are from [Icons8](https://icons8.com) and scaled down for use in the interactive.
  They are also used by the Sorting Algorithms Configurator interactive
- The images `icons8-number-X.png`, where `X` is a number, are also from [Icons8](https://icons8.com).
- The colourful box images used are located in the `static/img/interactives/colourful-box-images` directory.

## Licence

The interactive uses [Dragula](https://github.com/bevacqua/dragula) for intuitive drag and drop behaviour.
Its licence is listed in `LICENCE-THIRD-PARTY` with a full copy available in the `third-party-licences` directory.
