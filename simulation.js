$( document ).ready(function() {
  //Attaches the doSim function to the submit button on a click
  $('#resultsDiv').hide();
  $('#simulateBtn').click(doSim);
  $('#singleRunBtn').click(doSingleRun);
});

//simulate a battle numRuns number of times
function fightFleets(numberOfRuns) {

  $('#resultsDiv').html("");

  var fleet1 = new fleet("Fleet 1",
                        $('#fighterOne').val(), 9,
                        $('#carrierOne').val(), 9,
                        $('#destroyerOne').val(), 9,
                        $('#cruiserOne').val(), 7,
                        $('#dreddieOne').val(), 5,
                        $('#warSunOne').val(), 3,
                        $('#cannonOne').val(), 6,
                        $('#infantryOne').val(), 9);

  var fleet2 = new fleet("Fleet 2",
                        $('#fighterTwo').val(), 9,
                        $('#carrierTwo').val(), 9,
                        $('#destroyerTwo').val(), 9,
                        $('#cruiserTwo').val(), 7,
                        $('#dreddieTwo').val(), 5,
                        $('#warSunTwo').val(), 3,
                        $('#cannonTwo').val(), 6,
                        $('#infantryTwo').val(), 9);


  var fleet1wins = 0;
  var fleet2wins = 0;
  for (var j = 0; j < numberOfRuns; j++){ 

    var winner = 0;
    fleet1f = Object.assign({},fleet1);
    fleet2f = Object.assign({},fleet2);
    winner = fleetSim(fleet1f, fleet2f);
    if(winner == 1){
      fleet1wins++;
    } else {fleet2wins++}

  }

  console.log(fleet1wins);
  $("#team1").text(fleet1wins);
  console.log(fleet2wins);
  $("#team2").text(fleet2wins);
}

function doSim() {
  fightFleets(1000);
}

function doSingleRun() {
  fightFleets(1);
  $('#resultsDiv').show();
}

//fleet object contains all the necessary info about the fleet
//var fleetc = 

function fleet(fleetName, fighter, fighterHit, carrier, carrierHit, destroyer, destroyerHit, cruiser, cruiserHit, dreddie, dreddieHit, warSun, warSunHit, cannon, cannonHit, infantry, infantryHit){

  this.fleetName = fleetName;
  this.fight = fighter;
  this.fightHit = fighterHit;
  this.car = carrier;
  this.carHit = carrierHit;
  this.des = destroyer;
  this.desHit = destroyerHit;
  this.cru = cruiser;
  this.cruHit = cruiserHit;
    //WAR SUN AND DREDDY NEED TO BE 2X!! It is HITS they can take
  this.dred = dreddie;
  this.dredHit = dreddieHit;
  //WAR SUN AND DREDDY NEED TO BE 2X!! It is HITS they can take
  this.sun = warSun;
  this.sunHit = warSunHit;
  this.pds = cannon;
  this.pdsHit = cannonHit
  this.gf = infantry
  this.gfHit = infantryHit

  //returns a string containing all of the fleet information - good for debugging
  //this is a javascript thing I only kind of understand
  this.print = function () {
      output = "Fighters: " + this.fight + " Combat: " + this.fightHit + "<br>";
      output += "Carriers: " + this.car + " Combat: " + this.carHit + "<br>";
      output += "Destroyers: " + this.des + " Combat: " + this.desHit + "<br>";
      output += "Cruisers: " + this.cru + " Combat: " + this.cruHit + "<br>";
      output += "Dreddies: " + this.dred + " Combat: " + this.dredHit + "<br>";
      output += "War Sun: " + this.sun + " Combat: " + this.sunHit + "<br>";
      output += "PDS: " + this.pds + " Combat: " + this.pdsHit + "<br>";
      output += "Infantry: " + this.gf + " Combat: " + this.gfHit + "<br>";
      return output
  };

  this.printExisting = function () {
    output = this.fleetName + "<br>";
    if (this.fight > 0) {
      output += "Fighters: " + this.fight + " Combat: " + this.fightHit + "<br>";
    }
    if (this.car > 0) {
      output += "Carriers: " + this.car + " Combat: " + this.carHit + "<br>";
    }
    if (this.des > 0) {
      output += "Destroyers: " + this.des + " Combat: " + this.desHit + "<br>";
    }
    if (this.cru > 0) {
      output += "Cruisers: " + this.cru + " Combat: " + this.cruHit + "<br>";
    }
    if (this.dred > 0) {
      output += "Dreddies: " + this.dred + " Combat: " + this.dredHit + "<br>";
    }
    if (this.sun > 0) {
      output += "War Sun: " + this.sun + " Combat: " + this.sunHit + "<br>";
    }
    if (this.pds > 0) {
      output += "PDS: " + this.pds + " Combat: " + this.pdsHit + "<br>";
    }
    if (this.gf > 0) {
      output += "Infantry: " + this.gf + " Combat: " + this.gfHit + "<br>";
    }

    if (output == "") {
      output = "Fleet is empty."
    }

    return output
  }

  this.fleetSum = function() {
    var sum = 0
    sum = 1*this.fight + 1*this.car + 1*this.des + 1*this.cru + 1*this.dred + 1*this.sun
    return sum
  }

  this.isDead = function() {
    return this.fleetSum() < 1
  }
}

// roll makes a D10 roll N times and returns the hits based on the ship's combat value
function roll(n, hitv){
  var hit = 0;
  for(i=0;i<n; i++){
    var roll = Math.floor(Math.random()*10) + 1;
    if(roll>= hitv){
      hit ++ ;
    }
  }
  $("#resultsDiv").append("<p>" + n + " shots at combat value " + hitv + ": got " + hit + " hits.</p>"); 
  return hit
}

//ship round checks to make sure there are more than 0 ships in each class...could eventually be combined with the roll function
function shipRound(n, hit){
  var result = 0;
  if (n>0){
    result = roll(n,hit);
  }
  return result;
}

//rolls the dice for all the ships in the fleet and returns a total number of hits
function battleRound(fleet){
  var hits = 0
  hits = hits + shipRound(fleet.fight, fleet.fightHit);
  hits = hits + shipRound(fleet.car, fleet.carHit);
  hits = hits + shipRound(fleet.des, fleet.desHit);
  hits = hits + shipRound(fleet.cru, fleet.cruHit);
  hits = hits + shipRound(Math.ceil(fleet.dred/2), fleet.dredHit);
  hits = hits + shipRound(3*(Math.ceil(fleet.sun/2)), fleet.sunHit);
  console.log(fleet.fleetName + " got a total of " + hits + " hits");
  return hits
}



//assign hits to the fleet....could not think of a way to iterate through the ship list so did it manually...
function assignHits(fleet, hits){
  h = hits
  if(fleet.fight > 0 && h > 0){
   while(fleet.fight>0 && h > 0){
     h = h - 1;
     fleet.fight= fleet.fight - 1;
   }
  }

  if(fleet.car > 0 && h > 0){
    while(fleet.car>0 && h > 0){
      h = h - 1;
      fleet.car= fleet.car - 1;
    }
  }

  if(fleet.des > 0 && h > 0){
    while(fleet.des>0 && h > 0){
      h = h - 1;
      fleet.des= fleet.des - 1;
    }
  }

  if(fleet.cru > 0 && h > 0){
    while(fleet.cru>0 && h > 0){
      h = h - 1;
      fleet.cru= fleet.cru - 1;
    }
  }

  if(fleet.dred > 0 && h > 0){
    while(fleet.dred>0 && h > 0){
     h = h - 1;
     fleet.dred= fleet.dred - 1;
    }
  }

  if(fleet.sun > 0 && h > 0){
    while(fleet.sun>0 && h > 0){
      h = h - 1;
      fleet.sun = fleet.sun - 1;
    }
  }

  $("#resultsDiv").append("<p>" + fleet.fleetName + " can take " + fleet.fleetSum() + " more damage</p>")
}

//runs the simulation, looping through each game round
function fleetSim(fleet1, fleet2){
  var winner
  if( fleet1.isDead() || fleet2.isDead() ){ // tests that there are enough ships
    console.log("not enough ships in one of the fleets")

  } else {
    $("#resultsDiv").append("<p>" + fleet1.printExisting() + "</p>")
    $("#resultsDiv").append("<p>" + fleet2.printExisting() + "</p>")
    //pds fire
    var h1 = shipRound(fleet1.pds, fleet1.pdsHit)
    var h2 = shipRound(fleet2.pds, fleet2.pdsHit)
    assignHits(fleet1, h2);
    assignHits(fleet2, h1);

    //tests if the battle is over
    if(fleet1.isDead() || fleet2.isDead() ) {
      if (fleet1.fleetSum() > fleet2.fleetSum()) {
          winner = 1
      } else {
          winner = 2
      }
    }

    //only initiates if there are o fleets left
    while(!fleet1.isDead() && !fleet2.isDead()) { //while at least one fleet has ships
      $("#resultsDiv").append("<p> <strong>Fleet 1 rolls: </strong></p>");
      h1 = battleRound(fleet1)
      $("#resultsDiv").append("<p> <strong>Fleet 2 rolls: </strong></p>");
      h2 = battleRound(fleet2)
      assignHits(fleet1, h2);
      assignHits(fleet2, h1);
    }

    if ( fleet1.fleetSum() > fleet2.fleetSum() ){
      winner = 1
      $("#resultsDiv").append("Remaining Fleet: <br>");
      $("#resultsDiv").append(fleet1.printExisting());
    } else {
      winner = 2
      $("#resultsDiv").append("Remaining Fleet: <br>");
      $("#resultsDiv").append(fleet2.printExisting());
    }

  }
  
  return winner

}

