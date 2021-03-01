
PennController.AddHost("https://filedn.com/lDf2Oa0trFMzhcSFiv5VDuu/ibex/");
PennController.ResetPrefix(null); // Shorten command names (keep this line here)
 PennController.DebugOff() // use for the final version


//Create picking function; needed for breaks
function Pick(set,n) {
    assert(set instanceof Object, "First argument of pick cannot be a plain string" );
    n = Number(n);
    if (isNaN(n) || n<0) 
        n = 0;
    this.args = [set];
    this.runSet = null;
    set.remainingSet = null;
    this.run = arrays => {
        if (this.runSet!==null) return this.runSet;
        const newArray = [];
        if (set.remainingSet===null) {
        if (set.runSet instanceof Array) set.remainingSet = [...set.runSet];
        else set.remainingSet = arrays[0];
    }
        for (let i = 0; i < n && set.remainingSet.length; i++)
            newArray.push( set.remainingSet.shift() );
    this.runSet = [...newArray];
    return newArray;
}
}
    function pick(set, n) { return new Pick(set,n); }
        
        critical = randomizeNoMoreThan(anyOf("1", "2","3","4","5","6"),2);

PennController.Sequence("welcome", "practiceblock", "beginblock1",
                        pick(critical,18),"beginblock2",
                        pick(critical,18),"beginblock3",
                        pick(critical,18), "exitform","send", "bye");


// Welcome text /////////////
PennController( "welcome",
    defaultText
        .print()
    ,
    newText("text1", "<h2>Welcome!</h2>")
    ,
    newText("text3", "<p>Thank you for your participation. This is a study about language comprehension conducted by the Humboldt University of Berlin.</p>")
    ,
    newText("text4", "<p>You are going to read a few sentences and decide whether they are true or false.</p>")
    ,
    newText("text5", "<p>The experiment will take about 10 minutes. Please make sure to complete the experiment without interruption.</p>")
    ,
    newText("text66", "<p>It is important that you complete the task in a quiet environment. Please turn off your computer's speakers throughout the experiment. </p>")
    ,
    newText("text2", "<p>Your task will be explained in the following pages.</p>")
    ,
    
    newButton("button1", "continue")
        .print()
        .wait()
    ,
    getText("text1")
        .remove()
    ,
    getText("text3")
        .remove()
    ,
    getText("text4")
        .remove()
    ,
    getText("text5")
        .remove()
    ,
    getText("text2")
        .remove()
    ,
    getText("text66")
        .remove()
    ,
    //getTextInput("ID")
    //    .remove()
    //,
    getButton("button1")
        .remove()
    ,
    newHtml("consentInfo", "consentInfo.html")
        .settings.log()
        .print()
    ,
    newButton("button2", "continue")
        .print()
        .wait(getHtml("consentInfo").test.complete()
            .failure( getHtml("consentInfo").warn() ) // wait and display warning message if not all the obligatory fields in the html document are filled
          )
    ,
    getHtml("consentInfo")
        .remove()
    ,
    getButton("button2")
        .remove()
    ,

    newHtml("instructions", "instructions.html")
        .print()
    ,
    newButton("button4", "continue")
        .print()
        .wait()
    ,
    getHtml("instructions")
        .remove()
    ,
    getButton("button4")
        .remove()
    ,
    newHtml("instructions2", "instructions2.html")
        .print()
    ,
    newButton("button44", "continue")
        .print()
        .wait()
    ,
    getHtml("instructions2")
        .remove()
    ,
    getButton("button44")
        .remove()
    ,
    newHtml("VPInfo", "VPInfo.html")
        .settings.log() // log inputs in html
        .print()
    ,
    newButton("vpbutton","continue")
        .print()
        .wait(
          getHtml("VPInfo").test.complete()
            .failure( getHtml("VPInfo").warn() )
        )
    ,
          getHtml("VPInfo")
        .remove()
    ,
    getButton("vpbutton")
        .remove()
      ,          
    newHtml("instructions3", "instructions3.html")
        .print()
    ,
    newButton("button5", "start the experiment")
        .print()
        .wait()
    ,
    getHtml("instructions3")
        .remove()
    ,
    getButton("button5")
        .remove()
    
)
    .log("list", "na")
         .log("condition", "welcome")
         .log("Item", "intro")
         .log("category", "na")
         .log("sentence", "na")
         .log("quantifier", "na")
         .log("noun", "na")

Template("PracticeBlock.csv" , row =>
         newTrial("practiceblock",
                  newText("sep", "Wait for next trial...")
                  .settings.css("font-size", "x-large")
                  .print(),
                  newTimer(2000)
                  .start()
                  .wait()
                  .remove(),
                  getText("sep")
                  .remove(),
                  newController("DashedSentence", {s: row.Sentence , mode: "speeded acceptability",
                                                   wordTime : 500,
                                                   wordPauseTime : 40,
                                                   display: "in place"})
                  .settings.css("font-size", "x-large")
                  .print()
                  .wait(),
                  newText("frameD", " [ F ] ")
                  .settings.css("font-size", "xx-large")
                  .bold()
                  .css("border","display: inline-block", "width: 50px", "border: 1px solid #000","text-align : center")
                  .print(),
                  newText("frameK", " [ J ] ")
                  .settings.css("font-size", "xx-large")
                  .bold()
                  .print(),
                  newText("true", "True")
                  .italic()
                  .print(),
                  newText("false", "False")
                  .italic()
                  .print(),
                  newText("answer", "Press the key 'F' (False) or the key 'J' (True) to answer.")
                  .settings.css("font-size", "medium")
                  .italic()
                  .print(),
                  newCanvas("canvas1", 450,200)
                  .add(135 , 0 , getText("frameD"))
                  .add(155, 40 , getText("false"))
                  .add(300 , 0, getText("frameK"))
                  .add(320 , 40, getText("true"))
                  .add(80, 100, getText("answer"))
                  .print(),
                  newKey("FJ")
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
         .log("list", "na")
         .log("condition", "na")
         .log("Item", "practice")
         .log("category", "na")
         .log("sentence", "na")
         .log("quantifier", "na")
         .log("noun", "na")
        );

newTrial("beginblock1",
         newText("space","This marks the end of the practice session and the start of Block 1. Press the SPACEBAR to continue. Remember to keep your index fingers on the F and J keys!")
         .settings.css("font-size", "x-large")
         .print(),
         
         newKey(" ")
         .wait(),
         getText("space")
         .remove()
         .log("list", "na")
         .log("condition", "na")
         .log("Item", "beginBlock1")
         .log("category", "na")
         .log("sentence", "na")
         .log("quantifier", "na")
         .log("noun", "na")
        )
    .log("list", "na")
         .log("condition", "na")
         .log("Item", "beginBlock1")
         .log("category", "na")
         .log("sentence", "na")
         .log("quantifier", "na")
         .log("noun", "na")
    ;


Template("master_list.csv" , row => PennController(row.condition,
                                                   newText("sep", "Wait for next trial...")
                                                   .settings.css("font-size", "x-large")
                                                   .print(),
                                                   newTimer(2000)
                                                   .start()
                                                   .wait()
                                                   .remove(),
                                                   getText("sep")
                                                   .remove(),
                                                   newController("DashedSentence", {s: row.sentence , mode: "speeded acceptability",
                                                                                    wordTime : 500,
                                                                                    wordPauseTime : 40,
                                                                                    display: "in place"})
                                                   .settings.css("font-size", "x-large")
                                                   .print()
                                                   .wait(),
                                                   newText("frameF", " [ F ] ")
                                                   .settings.css("font-size", "x-large")
                                                   .bold()
                                                   .print(),
                                                   newText("frameJ", " [ J ] ")
                                                   .settings.css("font-size", "x-large")
                                                   .bold()
                                                   .print(),
                                                   newText("true", "True")
                                                   .italic()
                                                   .print(),
                                                   newText("false", "False")
                                                   .italic()
                                                   .print(),
                                                   newText("answer", "Press the key 'F' (False) or the key 'J' (True) to answer.")
                                                   .settings.css("font-size", "medium")
                                                   .italic()
                                                   .print(),
                                                   newCanvas("canvas1", 450,200)
                                                   .add(135 , 0 , getText("frameF"))
                                                   .add(155, 40 , getText("false"))
                                                   .add(300 , 0, getText("frameJ"))
                                                   .add(320 , 40, getText("true"))
                                                   .add(80, 100, getText("answer"))
                                                   .print(),
                                                   newKey("FJ")
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
         .log("list", row.Group)
         .log("condition", row.condition)
         .log("Item", row.item)
         .log("category", row.category)
         .log("sentence", row.sentence)
         .log("quantifier", row.quantifier)
         .log("noun", row.noun)
         
        );

newTrial("beginblock2",
         newText("space","This marks the end of Block 1 and the start of Block 2. Press the SPACEBAR to continue. Remember to keep your index fingers on the F and J keys!")
         .settings.css("font-size", "x-large")
         .print(),
         
         newKey(" ")
         .wait(),
         getText("space")
         .remove()
         .log("list", "na")
         .log("condition", "na")
         .log("Item", "practice")
         .log("category", "na")
         .log("sentence", "na")
         .log("quantifier", "na")
         .log("noun", "na")
        )
     .log("list", "na")
         .log("condition", "na")
         .log("Item", "beginBlock2")
         .log("category", "na")
         .log("sentence", "na")
         .log("quantifier", "na")
         .log("noun", "na")
    ;


newTrial("beginblock3",
         newText("space","This marks the end of Block 2 and the start of Block 3. Press the SPACEBAR to continue. Remember to keep your index fingers on the F and J keys!")
         .settings.css("font-size", "x-large")
         .print(),
         
         newKey(" ")
         .wait(),
         getText("space")
         .remove()
                  .log("list", "na")
         .log("condition", "na")
         .log("Item", "practice")
         .log("category", "na")
         .log("sentence", "na")
         .log("quantifier", "na")
         .log("noun", "na")
        )
     .log("list", "na")
         .log("condition", "na")
         .log("Item", "beginBlock3")
         .log("category", "na")
         .log("sentence", "na")
         .log("quantifier", "na")
         .log("noun", "na")
    ;


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
     .log("list", "na")
         .log("condition", "na")
         .log("Item", "debrief")
         .log("category", "na")
         .log("sentence", "na")
         .log("quantifier", "na")
         .log("noun", "na")
    ;


PennController.SendResults( "send" );


PennController("bye",
    newText("<p>This is the end of the experiment. Thank you for your participation!</p>")
        .print()
    ,
    newCanvas("empty6", 1, 10)
        .print()
    ,
    newText("<p><a href='https://app.prolific.co/submissions/complete?cc=4925D823' target='_blank'>Click here to confirm your participation.</a></p>")
        .print()
    ,
    newText("<p>You can close the window now.</p>")
        .print()
    ,
    newButton("void") // create an empty button that makes the screen stay
        .wait()
  )
