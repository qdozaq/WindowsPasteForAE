var win = new Window("palette", "paste", undefined);

// win.panel = win.add("panel", undefined, "Paste");
win.btn = win.add("Button", undefined, "Paste");
win.textBox = win.add("edittext", [0,0,100,100], "editme",{multiline:true, scrollable:true});

win.btn.onClick = function() {
    app.beginUndoGroup("paste");
    paste();
    app.endUndoGroup();
};

win.show();

function paste() {
    var mainComp = app.project.activeItem;
    if (mainComp == null) {
        // alert("please select a text layer");
        return;
    }

    var selected = mainComp.selectedLayers[0];

    if (selected && !selected.source) { //check if selected layer is text layer
        selected.sourceText.setValue(win.textBox.text);
    } else {
        textLayer = mainComp.layers.addText(win.textBox.text);
    }

}
