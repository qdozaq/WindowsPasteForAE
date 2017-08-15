/*
Author: Paul Mendoza
Last Modified: 8/15/17
*/

var mainComp;
var mainWin = new Window("palette", "paste", undefined);
mainWin.btn = mainWin.add("Button", undefined, "Paste");

var textBox = new Window("palette", "Paste Text", undefined, {resizable: true});
var h = textBox.maximumSize.height / 2;
var w = textBox.maximumSize.width / 2;

textBox.box = textBox.add("edittext", [
    0, 0, w, h
], "editme", {
    multiline: true,
    scrollable: true
});

textBox.paste = textBox.add("Button", [0,0,w,40], "Paste");
textBox.cancel = textBox.add("Button", [0,0,w,40], "Cancel");

mainWin.btn.onClick = function() {
    mainComp = app.project.activeItem;
    if (mainComp == null) {
        // alert("please select a text layer");
        return;
    }
    textBox.show();
};

textBox.paste.onClick = function() {
    app.beginUndoGroup("paste");
    paste();
    textBox.close();
    app.endUndoGroup();
}

textBox.cancel.onClick = function() {
    textBox.close();
}

mainWin.show();

function paste() {
    var selected = mainComp.selectedLayers[0];

    if (selected && !selected.source) { //check if selected layer is text layer
        selected.sourceText.setValue(textBox.box.text);
    } else {
        textLayer = mainComp.layers.addText(textBox.box.text);
    }
}
