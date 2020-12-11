// This is a simple demo script, feel free to edit or delete it
// Find a tutorial and the list of availalbe elements at:
// https://www.pcibex.net/documentation/

PennController.ResetPrefix(null) // Shorten command names (keep this line here)

// Show the 'intro' trial first, then all the 'experiment' trials in a random order
// then send the results and finally show the trial labeled 'bye'
Sequence("introduction","consent", "instructions","startpractice", "practiceblock", "beginblock1", randomize("block1"), "beginblock2", randomize("block2"), "beginblock3", randomize("block3"), "exitform", "bye" )


// What is in Header happens at the beginning of every single trial
Header(
    // We will use this global Var element later to store the participant's name
    newVar("ParticipantName")
        .global()
    ,
    // Delay of 250ms before every trial
    newTimer(250)
        .start()
        .wait()
)
.log( "Name" , getVar("ParticipantName") )
// This log command adds a column reporting the participant's name to every line saved to the results


newTrial( "intro" ,
    newText("<p>Welcome to the PCIbex demo experiment.</p><p>Please enter your name below and press Enter:</p>")
        .print()
    ,
    newTextInput()
        .print()
        .wait()                 // The next command won't be executed until Enter is pressed
        .setVar( "ParticipantName" )
        // This setVar command stores the value from the TextInput element into the Var element
)


newTrial("introduction",
    newHtml("example_intro.html")
    .settings.log()
    .print(),
    newButton("button1", "continue")
    .print()
    .wait(),
    getButton("button1")
    .remove()
)

newTrial("consent",
    newHtml("consentandinfo.html")
    .settings.log()
    .print(),
    newButton("button1", "continue")
    .print()
    .wait(),
    getButton("button1")
    .remove()
)


newTrial("instructions",
    newHtml("instructions1", "instructionspage1.html")
    .print(),
    newKey(" ")
    .wait(),
    getHtml("instructions1")
    .remove(),
    newHtml("instructions2", "instructionspage2.html")
    .print(),
    newKey(" ")
    .wait(),
    getHtml("instructions2")
    .remove(),
    newHtml("instructions3", "instructionspage3.html")
    .print(),
    newKey(" ")
    .wait(),
    getHtml("instructions3")
    .remove(),
    newHtml("instructions4", "instructionspage4.html")
    .print(),
    newKey(" ")
    .wait(),
    getHtml("instructions4")
    .remove(),
    newHtml("instructions5", "instructionspage5.html")
    .print(),
    newKey(" ")
    .wait(),
    getHtml("instructions5")
    .remove()
)

newTrial("startpractice",
    newText("space","Press the SPACEBAR to begin the practice session.")
    .settings.css("font-size", "x-large")
    .print(),
    newKey(" ")
    .wait(),
    getText("space")
    .remove()
)
Template("PracticeBlock.csv" , row =>
    newTrial("practiceblock",
    newText("sep", "+++ Ready? +++")
        .settings.css("font-size", "x-large")
        .print(),
     newTimer(1000)
        .start()
        .wait()
        .remove(),
    getText("sep")
        .remove(),
    newController("DashedSentence", {s: row.Sentence , mode: "speeded acceptability",
        wordTime : 200, 
        wordPauseTime : 40,
        display: "in place"})
        .settings.css("font-size", "x-large")
        .print()
        .wait(),
    newText("frameD", " [ D ] ")
        .settings.css("font-size", "xx-large")
        .bold()
        .css("border","display: inline-block", "width: 50px", "border: 1px solid #000","text-align : center")
        .print(),
    newText("frameK", " [ K ] ")
        .settings.css("font-size", "xx-large")
        .bold()
        .print(),
    newText("true", "True")
        .italic()
        .print(),
    newText("false", "False")
        .italic()
        .print(),
    newText("answer", "Press the key 'D' (True) or the key 'K' (False) to answer.")
        .settings.css("font-size", "medium")
        .italic()
        .print(),
    newCanvas("canvas1", 450,200)
        .add(135 , 0 , getText("frameD"))
        .add(155, 40 , getText("true"))
        .add(300 , 0, getText("frameK"))
        .add(320 , 40, getText("false"))
        .add(80, 100, getText("answer"))
        .print(),
    newKey("DK")
        .log()
        .wait(),
    getCanvas("canvas1")
        .remove(),
    newText("nextsentence", "Press the SPACEBAR for the next sentence.")
        .settings.css("font-size", "x-large")
        .print()
        .log(),
    newKey(" ")
        .wait(),
    getText("nextsentence")
        .remove()
)
    .log("Item", row.Item)
)

newTrial("beginblock1",
    newText("space","This marks the end of the practice session and the start of Block 1. Press the SPACEBAR to continue.")
    .settings.css("font-size", "x-large")
    .print(),

    newKey(" ")
    .wait(),
    getText("space")
    .remove()
)

Template("Block1.csv" , row =>
    newTrial("block1",
    newText("sep", "+++ Ready? +++")
        .settings.css("font-size", "x-large")
        .print(),
     newTimer(1000)
        .start()
        .wait()
        .remove(),
    getText("sep")
        .remove(),
    newController("DashedSentence", {s: row.Sentence , mode: "speeded acceptability",
        wordTime : 200, 
        wordPauseTime : 40,
        display: "in place"})
        .settings.css("font-size", "x-large")
        .print()
        .wait(),
    newText("frameD", " [ D ] ")
        .settings.css("font-size", "x-large")
        .bold()
        .print(),
    newText("frameK", " [ K ] ")
        .settings.css("font-size", "x-large")
        .bold()
        .print(),
    newText("true", "True")
        .italic()
        .print(),
    newText("false", "False")
        .italic()
        .print(),
    newText("answer", "Press the key 'D' (True) or the key 'K' (False) to answer.")
        .settings.css("font-size", "medium")
        .italic()
        .print(),
    newCanvas("canvas1", 450,200)
        .add(135 , 0 , getText("frameD"))
        .add(155, 40 , getText("true"))
        .add(300 , 0, getText("frameK"))
        .add(320 , 40, getText("false"))
        .add(80, 100, getText("answer"))
        .print(),
    newKey("DK")
        .log()
        .wait(),
    getCanvas("canvas1")
        .remove(),
    newText("nextsentence", "Press the SPACEBAR for the next sentence.")
        .settings.css("font-size", "x-large")
        .print()
        .log(),
    newKey(" ")
        .wait(),
    getText("nextsentence")
        .remove()
)
    .log("Group", row.Group)
    .log("Type", row.Type)
    .log("Item", row.Item)
)

newTrial("beginblock2",
    newText("space","This marks the end of Block 1 and the start of Block 2. Press the SPACEBAR to continue.")
    .settings.css("font-size", "x-large")
    .print(),

    newKey(" ")
    .wait(),
    getText("space")
    .remove()
)

Template("Block2.csv" , row =>
    newTrial("block2",
    newText("sep", "+++ Ready? +++")
        .settings.css("font-size", "x-large")
        .print(),
     newTimer(1000)
        .start()
        .wait()
        .remove(),
    getText("sep")
        .remove(),
    newController("DashedSentence", {s: row.Sentence , mode: "speeded acceptability",
        wordTime : 200, 
        wordPauseTime : 40,
        display: "in place"})
        .settings.css("font-size", "x-large")
        .print()
        .wait(),
    newText("frameD", " [ D ] ")
        .settings.css("font-size", "xx-large")
        .bold()
        .print(),
    newText("frameK", " [ K ] ")
        .settings.css("font-size", "xx-large")
        .bold()
        .print(),
    newText("true", "True")
        .italic()
        .print(),
    newText("false", "False")
        .italic()
        .print(),
    newText("answer", "Press the key 'D' (True) or the key 'K' (False) to answer.")
        .settings.css("font-size", "medium")
        .italic()
        .print(),
    newCanvas("canvas1", 450,200)
        .add(135 , 0 , getText("frameD"))
        .add(155, 40 , getText("true"))
        .add(300 , 0, getText("frameK"))
        .add(320 , 40, getText("false"))
        .add(80, 100, getText("answer"))
        .print(),
    newKey("DK")
        .log()
        .wait(),
    getCanvas("canvas1")
        .remove(),
    newText("nextsentence", "Press the SPACEBAR for the next sentence.")
        .settings.css("font-size", "x-large")
        .print()
        .log(),
    newKey(" ")
        .wait(),
    getText("nextsentence")
        .remove()
)
    .log("Group", row.Group)
    .log("Type", row.Type)
    .log("Item", row.Item)
)

newTrial("beginblock3",
    newText("space","This marks the end of Block 2 and the start of Block 3. Press the SPACEBAR to continue.")
    .settings.css("font-size", "x-large")
    .print(),

    newKey(" ")
    .wait(),
    getText("space")
    .remove()
)

Template("Block3.csv" , row =>
    newTrial("block3",
    newText("sep", "+++ Ready? +++")
        .settings.css("font-size", "x-large")
        .print(),
     newTimer(1000)
        .start()
        .wait()
        .remove(),
    getText("sep")
        .remove(),
    newController("DashedSentence", {s: row.Sentence , mode: "speeded acceptability",
        wordTime : 200, 
        wordPauseTime : 40,
        display: "in place"})
        .settings.css("font-size", "x-large")
        .print()
        .wait(),
    newText("frameD", " [ D ] ")
        .settings.css("font-size", "xx-large")
        .bold()
        .print(),
    newText("frameK", " [ K ] ")
        .settings.css("font-size", "xx-large")
        .bold()
        .print(),
    newText("true", "True")
        .italic()
        .print(),
    newText("false", "False")
        .italic()
        .print(),
    newText("answer", "Press the key 'D' (True) or the key 'K' (False) to answer.")
        .settings.css("font-size", "medium")
        .italic()
        .print(),
    newCanvas("canvas1", 450,200)
        .add(135 , 0 , getText("frameD"))
        .add(155, 40 , getText("true"))
        .add(300 , 0, getText("frameK"))
        .add(320 , 40, getText("false"))
        .add(80, 100, getText("answer"))
        .print(),
    newKey("DK")
        .log()
        .wait(),
    getCanvas("canvas1")
        .remove(),
    newText("nextsentence", "Press the SPACEBAR for the next sentence.")
        .settings.css("font-size", "x-large")
        .print()
        .log(),
    newKey(" ")
        .wait(),
    getText("nextsentence")
        .remove()
)
    .log("Group", row.Group)
    .log("Type", row.Type)
    .log("Item", row.Item)
)
newTrial("exitform",  
    newHtml("debrief", "debrief.html")
    .print()
    .log(),
    newButton("Submit answers")
    .print()
    .wait(),
    getHtml("debrief")
    .remove()
)
// Spaces and linebreaks don't matter to the script: we've only been using them for the sake of readability
newTrial( "bye" ,
    newText("Thank you for your participation!").print(),
    newButton().wait()  // Wait for a click on a non-displayed button = wait here forever
)

.setOption( "countsForProgressBar" , false )
// Make sure the progress bar is full upon reaching this last (non-)trial
