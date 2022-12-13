//	 Fifteen Puzzle Group Project 
//	 Web Programming Fall 2022
	 
//	 Patrick Davis
//	 Jay Lambasia
//	 Farhana Chadni
//   Abdulmalek Abulgasem


var canvas;                   // The canvas shown on the page.
var ctx;                      // The context, used to access the canvas.
var INTERVAL = 30;            // that time it takes for the tick function to update
var musicInterval = 205000;   // After how many seconds the music restarts
var SpriteRow = 0;            // Row of the graphic to show
var SpriteCol = 0;            // Col of the graphic to show
SpriteCol2 = 80;
SpriteWidth = 88;
SpriteHeight = 88;
var x1 = 200;
var y1 = 150;
var x2 = x1;
var y2 = y1;

var didwin = false;

var FireWork1 = new Image();
FireWork1.src = "Sprites/firework1.png";

var FireWork2 = new Image();
FireWork2.src = "Sprites/firework2.png";


function playmusic(){
	var audio = new Audio('BGM.mp3');
	audio.play();
}

function eraseSprite() 
{
  // erase what's in canvas here:
  
  ctx.clearRect(0,0, 10000,1000)
}
function drawFW1()
{
  ctx.drawImage(FireWork1, SpriteCol * SpriteWidth, SpriteRow * SpriteHeight, 
    SpriteWidth, SpriteHeight, x1, y1, SpriteWidth*1.3, SpriteHeight*1.3); 
}

function drawFW2()
{
    ctx.drawImage(FireWork2, SpriteCol2 * 72, SpriteRow * SpriteHeight, 
    72, SpriteHeight, x2+500, y2, 72*1.6, SpriteHeight*1.6); 
}

function loadComplete() 
{
  var bgm = new Audio('BGM.mp3'); 
  bgm.volume = 0.1;
  bgm.addEventListener('ended', function() {
    this.currentTime = 0;
    this.play();
    }, false);
bgm.play();

  canvas = document.getElementById("theCanvas");
  ctx = canvas.getContext("2d");

  var w = window.innerWidth;
  canvas.width = w;
  myInterval = self.setInterval(function(){Tick()}, INTERVAL); 
  console.log("Load complete");
}
var co = 100;
function Tick()
{
  if(didwin == true)
  {
    eraseSprite();
    drawFW2();
    drawFW1();
    spriteCoor();
    spriteCoor2();
}
}

function spriteCoor()
{ 
  SpriteCol=SpriteCol+1;
    if(SpriteCol >100)
    {
    SpriteCol = 0;
    if (x1 == 200)
    x1=1500;
    else if (x1 == 1500)
    x1 = 400;
    else if (x1 == 400)
    x1 = 1200;
    else if(x1==1200)
    x1 = 100;
    else if(x1 == 100)
    x1 = 600;
    else if(x1 = 600)
    x1 = 200;


      // y1 = 0;
      if (y1==150)
      y1 = 0;
      else if(y1==0)
      y1=50;
      else if(y1 == 50)
      y1=20;
      else if(y1==20)
      y1 = 150;
    console.log(y1);

  }
}
function spriteCoor2()
{ 
  SpriteCol2=SpriteCol2+1;
    if(SpriteCol2 >100)
    {
    SpriteCol2 = 0;
    if (x2 == 200)
    x2=1500;
    else if (x2 == 1500)
    x2 = 400;
    else if (x2 == 400)
    x2 = 1200;
    else if(x2==1200)
    x2 = 100;
    else if(x2 == 100)
    x2 = 600;
    else if(x2 = 600)
    x2 = 200;


      // y1 = 0;
      if (y2==150)
      y2 = 0;
      else if(y2==0)
      y2=50;
      else if(y2 == 50)
      y2=20;
      else if(y2==20)
      y2 = 150;
    console.log(y2);

  }
}

// sets the board and vars
// 0.0,1.0,2.0,3.0
// 0.1,1.1,2.1,3.1
// 0.2,1.2,2.2,3.2
// 0.3,1.3,2.3,3.3
document.onreadystatechange = function () {
    if (document.readyState == "complete") {
      var grid =  [[0,0,false],[100,0,false],[200,0,false],[300,0,false],
                   [0,100,false],[100,100,false],[200,100,false],[300,100,false],
                   [0,200,false],[100,200,false],[200,200,false],[300,200,false],
                   [0,300,false],[100,300,false],[200,300,false],[300,300,true]];

      var puzzleAreaContents = document.getElementById("puzzlearea").children;
      var shuffleTracker = 0;
      var numberOfMoves = 0;
	  
      // insert the counter html to record number of moves made by the user
      document.getElementById("overall").insertAdjacentHTML('beforeend', "number of moves: <span id='numberOfMoves'>0</span>");

		//find out if the puzzle is completed
      function checkIfComplete() {
        var check = ""
        var arr = document.getElementById("puzzlearea").children;
        for (i = 0; i < arr.length; i++) {
		  if (arr[i].innerText) {
			   check = check + arr[i].innerText 
		  } else {
			   check = check + '0'
		  }
        }
		//checks if positon is correct and moves 
        if (check == "1234567891011121314150" && numberOfMoves > 80) {
          console.log("You win");
          didwin = true;
          celebrate()
          return true;
        }
		return false;
      }

      function reload() {alert("hey") }
// fix image - call image to celbrate a win
      function celebrate() {
        document.getElementById("puzzlearea").innerHTML = "<div><img onclick='location.reload();' src='https://www.raepica.com/wp-content/uploads/2019/05/good-job.jpeg' width =200 /></div><br /><h1 onclick='location.reload();'>Good Job</h1>";
        console.log('what is this: ', document.getElementById("shufflebutton"))
		if (document.getElementById("shufflebutton")) {
			document.getElementById("shufflebutton").outerHTML = ""
		}
      }
	 
		//shuffle tracker function acts recursively and will increment until threshold
      function shuffle(shuffleTracker) {
        var rand = getRandomElement();
		console.log('shuffling');
        shiftPuzzlePiece.call(puzzleAreaContents[rand]);
        if (shuffleTracker < 199) 
          { 
            shuffleTracker = shuffleTracker + 1;
            // recursively shuffle 99 times 
            shuffle(shuffleTracker) 
          }
          else {
            // else reset the move counter
            shuffleTracker = 0;
            numberOfMoves = 0; 
            document.getElementById("numberOfMoves").innerHTML = numberOfMoves;          
          }
      }
		
      function getRandomElement() {
        var movables = getArrayOfMovableCells();
        return movables[Math.floor(Math.random() * movables.length)];
      }

      function openBlock() {
        // finds the open block in the grid[]
        for (i = 0; i < grid.length; i++) {
          if (grid[i][2] == true){return i;}
        }
      }

      function getArrayOfMovableCells() {
        var open = openBlock()
        var movables = [open-4, open-1, open+1, open+4]
        // purges the bounds of the indexes
        var count = movables.length;
        for (i = 0; i < count; i++) {
          // check down
          if (movables[i] < 0) {movables[i] = null}            
          // check up
          if (movables[i] > 15) {movables[i] = null}
          // check right
          if (open == 3 || open == 7 || open == 11 ) { movables[movables.indexOf(open+1)] = null }
          // check left
          if (open == 4 || open == 8 || open == 12 ) { movables[movables.indexOf(open-1)] = null }
        }
        movables = movables.filter(function(val) { return val !== null; })
        return movables;
      }

      function addPuzzlePieceHover() {this.className = this.className + " puzzlepiecehover";
      }

      function removePuzzlePieceHover() {this.className = "puzzlepiece";
      }

      function shiftPuzzlePiece() {
        // increment number of  moves
        numberOfMoves = numberOfMoves + 1;
        document.getElementById("numberOfMoves").innerHTML = numberOfMoves; 

        // move touched piece
        this.style.left = grid[openBlock()][0]+"px";
        this.style.top = grid[openBlock()][1]+"px";
        // reset hover state, because mouseout event never actually happened after click event
        this.className = "puzzlepiece";

        // convert the htmlCollection to a real array, and then back into html
        var collection = Array.prototype.slice.call( puzzleAreaContents )
        var movedBlock = collection.indexOf(this)
        var openBlockIndex = collection.indexOf(puzzleAreaContents[openBlock()])
        
        var switchVariable = collection[movedBlock];
        collection[movedBlock] = collection[openBlockIndex];
        collection[openBlockIndex] = switchVariable;

        document.getElementById("puzzlearea").innerHTML = ""
        for (i = 0; i < collection.length; i++) {
          document.getElementById("puzzlearea").innerHTML = document.getElementById("puzzlearea").innerHTML + collection[i].outerHTML;
        }

        // set current unit to false, unit.open? #=> false
        grid[openBlock()][2] = false;
        // set touched unit to true, unit.open? #=> true
        grid[movedBlock][2] = true;

        // var movables = getArrayOfMovableCells();
        // remove old listeners tiles
        removeEventListeners(getArrayOfMovableCells());
        // if complete, break out of everything
		console.log('checking if complete');
        if (checkIfComplete() == true) {
			console.log('done')
			celebrate()
			} 
        // add new listeners tiles to new set of movables
        addEventListeners(getArrayOfMovableCells());
      }
		//adds the listeners for moves
      function addEventListeners(movables) {
        for (i = 0; i < movables.length; i++) {
		  if (puzzleAreaContents[movables[i]]) {
	        puzzleAreaContents[movables[i]].addEventListener("mouseover", addPuzzlePieceHover, false);
            puzzleAreaContents[movables[i]].addEventListener("mouseout", removePuzzlePieceHover, false);
            puzzleAreaContents[movables[i]].addEventListener("click", shiftPuzzlePiece);
		  }
        }
      }
		//remove the listeners
      function removeEventListeners(movables) {
        for (i = 0; i < movables.length; i++) {
		  if (puzzleAreaContents[movables[i]]) {
	        puzzleAreaContents[movables[i]].removeEventListener("mouseover", addPuzzlePieceHover, false);
            puzzleAreaContents[movables[i]].removeEventListener("mouseout", removePuzzlePieceHover, false);
            puzzleAreaContents[movables[i]].removeEventListener("click", shiftPuzzlePiece, false);
		  }
        }
      }

      function initializePuzzleArea() {
        // set initial configuration
        var x = 0;
        var y = 0;
        for (i = 0; i < puzzleAreaContents.length; i++) {
          puzzleAreaContents[i].setAttribute("class", "puzzlepiece");
          // set top and left
          puzzleAreaContents[i].style.top = y+"px" ;
          puzzleAreaContents[i].style.left = x+"px" ;
          // set backgroundPosition - use negative numbers 
          puzzleAreaContents[i].style.backgroundPosition = "-"+x+"px "+"-"+y+"px" ;
          // increment x by 100 until each 4th columm, then increment y and reset x to 0
          if (x==300)
          {var y = y + 100; 
           var x = 0; }
          else{var x = x + 100;}
        }
        // add 16th or the "empty" element
        // this moves around the htmlCollection just like all other elements
        document.getElementById("puzzlearea").innerHTML = document.getElementById("puzzlearea").innerHTML + "<div class='empty'></div>"
        addEventListeners(getArrayOfMovableCells());
      }

    document.getElementById("shufflebutton").onclick = function(){shuffle(shuffleTracker);}
    initializePuzzleArea();
  }
}


