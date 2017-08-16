/*
Author: Paul Mendoza
Last Modified: 8/15/17

todo:
clean up code
make dockable
automatic text selection?
replace text button with image button
auto fill text of selected text layer
resizeable paste box
*/

var mainComp;
var mainWin = new Window("palette", "paste", undefined);
mainWin.btn = mainWin.add("Button", undefined, "Paste");

var textBox = new Window("palette", "Paste Text", undefined, {resizeable: true});
var h = textBox.maximumSize.height / 2;
// var w = textBox.maximumSize.width / 2;

textBox.box = textBox.add("edittext", [
    0, 0, h, h
], "", {
    multiline: true,
    scrollable: true
});

textBox.btns = textBox.add("Group", undefined, undefined);

var pasteBtn = textBox.btns.add("Button", [0,0,h/2,30], "Paste");
var cancelBtn = textBox.btns.add("Button", [0,0,h/2,30], "Cancel");

mainWin.btn.onClick = function() {
    mainComp = app.project.activeItem;
    if (mainComp == null) {
        // alert("please select a text layer");
        return;
    }
    textBox.show();
};

pasteBtn.onClick = function() {
    app.beginUndoGroup("paste");
    paste();
    textBox.hide();
    app.endUndoGroup();
}

cancelBtn.onClick = function() {
    textBox.hide();
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
