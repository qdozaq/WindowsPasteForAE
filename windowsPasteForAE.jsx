/*
Author: Paul Mendoza
Last Modified: 8/15/17

todo:
clean up code
make dockable
√ - automatic text selection?
replace text button with image button
√ - auto fill text of selected text layer
√ - resizeable paste box
make [enter] click highlighted button?
*/

// Initial paste window
var mainComp, selected;
var mainWin = new Window("palette", "paste", undefined);
mainWin.btn = mainWin.add("Button", undefined, "Paste");

mainWin.btn.onClick = function() {
    mainComp = app.project.activeItem;
    if (mainComp == null) {
        // alert("please select a text layer");
        return;
    }
    selected = mainComp.selectedLayers[0];

    if (selected && !selected.source)//check if selected layer is text layer
        textWindow.box.text = selected.sourceText.value;
    textWindow.show();
};

//Text box that appears after click on mainWin.btn
var textWindow = new Window("palette", "Paste Text", undefined, {resizeable: true, orientation:'column'});
var h = textWindow.maximumSize.height / 2;
// textWindow.minimumSize = [h,h]

textWindow.box = textWindow.add("edittext", [0,0,h,h], "", {
    multiline: true,
    scrollable: true
});
textWindow.box.alignment=["fill", "fill"];

textWindow.btns = textWindow.add("Group", undefined, {orientation:'row'});
textWindow.btns.alignment = 'center';

var pasteBtn = textWindow.btns.add("Button", undefined, "Paste", {name:"ok"});
var cancelBtn = textWindow.btns.add("Button", undefined, "Cancel");

textWindow.box.active = true; //text box is highlighted

var margin = 40;
textWindow.onResizing = textWindow.onResize = function(){
    this.layout.resize();
}

pasteBtn.onClick = function() {
    app.beginUndoGroup("paste");
    paste();
    textWindow.hide();
    app.endUndoGroup();
}

cancelBtn.onClick = function() {
    textWindow.hide();
}

mainWin.show();

function paste() {
    if (selected && !selected.source) { //check if selected layer is text layer
        // alert(selected.sourceText.value);
        selected.sourceText.setValue(textWindow.box.text);
    } else {
        textLayer = mainComp.layers.addText(textWindow.box.text);
    }
}
