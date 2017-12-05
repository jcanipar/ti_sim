$( document ).ready(function() {
  // Handler for .ready() called.
  $('#simulateBtn').click(doSim);
});

function doSim() {
  
  var fleet1 = new fleetCreate(2,9,1,9,0,8,3,6,1,5,0,3,2,6,0,8);
  var fleet2 = new fleetCreate(0,9,0,9,0,8,2,6,3,5,0,3,2,6,0,8);

  fleet1.fight = $('#fighterOne').val();  
  fleet1.fightHit = 9;
  fleet1.car = $('#carrierOne').val();
  fleet1.carHit = 9;
  fleet1.des = $('#destroyerOne').val();
  fleet1.desHit = 9;
  fleet1.cru = $('#cruiserOne').val();
  fleet1.cruHit = 7;
  fleet1.dred = $('#dreddieOne').val();
  fleet1.dredHit = 5;
  fleet1.sun = $('#warSunOne').val();
  fleet1.sunHit = 3;
  fleet1.pds = $('#cannonOne').val();
  fleet1.pdsHit = 6;
  fleet1.gf = $('#infantryOne').val();
  fleet1.gfHit = 9;

  //alert(fleetPrint(fleet1));
  alert(fleet1.print());


  fleet2.fight = $('#fighterTwo').val();  
  fleet2.fightHit = 9;
  fleet2.car = $('#carrierTwo').val();
  fleet2.carHit = 9;
  fleet2.des = $('#destroyerTwo').val();
  fleet2.desHit = 9;
  fleet2.cru = $('#cruiserTwo').val();
  fleet2.cruHit = 7;
  fleet2.dred = $('#dreddieTwo').val();
  fleet2.dredHit = 5;
  fleet2.sun = $('#warSunTwo').val();
  fleet2.sunHit = 3;
  fleet2.pds = $('#cannonTwo').val();
  fleet2.pdsHit = 6;
  fleet2.gf = $('#infantryTwo').val();
  fleet2.gfHit = 9;

  //alert(fleetPrint(fleet2));
  alert(fleet2.print());

  var fleet1wins = 0;
  var fleet2wins = 0;
  for (var j = 0; j < 1000; j++){ //loops through the simulaion 1000 times figuring our who wins

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

//fleet object contains all the necessary info about the fleet
//var fleetc = 

function fleetCreate(fighter, fighterHit, carrier, carrierHit, destroyer, destroyerHit, cruiser, cruiserHit, dreddie, dreddieHit, warSun, warSunHit, cannon, cannonHit, infantry, infantryHit){

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

  this.print = function () {
      output = "Fighters: " + this.fight + " Combat: " + this.fightHit + "\n";
      output += "Carriers: " + this.car + " Combat: " + this.carHit + "\n";
      output += "Destroyers: " + this.des + " Combat: " + this.desHit + "\n";
      output += "Cruisers: " + this.cru + " Combat: " + this.cruHit + "\n";
      output += "Dreddies: " + this.dred + " Combat: " + this.dredHit + "\n";
      output += "War Sun: " + this.sun + " Combat: " + this.sunHit + "\n";
      output += "PDS: " + this.pds + " Combat: " + this.pdsHit + "\n";
      output += "Infantry: " + this.gf + " Combat: " + this.gfHit + "\n";
      return output
  };
}



function fleetPrint(fleet) {
  output = "Fighters: " + fleet.fight + " Combat: " + fleet.fightHit + "\n";
  output += "Carriers: " + fleet.car + " Combat: " + fleet.carHit + "\n";
  output += "Destroyers: " + fleet.des + " Combat: " + fleet.desHit + "\n";
  output += "Cruisers: " + fleet.cru + " Combat: " + fleet.cruHit + "\n";
  output += "Dreddies: " + fleet.dred + " Combat: " + fleet.dredHit + "\n";
  output += "War Sun: " + fleet.sun + " Combat: " + fleet.sunHit + "\n";
  output += "PDS: " + fleet.pds + " Combat: " + fleet.pdsHit + "\n";
  output += "Infantry: " + fleet.gf + " Combat: " + fleet.gfHit + "\n";
  return output
}

//fleetSum counts up the number of ships in each fleet
function fleetSum(fleet){
  var sum = 0
  sum = fleet.fight + fleet.car + fleet.des + fleet.cru + fleet.dred + fleet.sun
  return sum
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
}

//runs the simulation, looping through each game round
function fleetSim(fleet1, fleet2){
  var winner
  if((fleetSum(fleet1)) < 1 ||(fleetSum(fleet2))<1){ // tests that there are enough ships
  console.log("not enough ships in one of the fleets")

      } else{
        //pds fire
        var h1 = shipRound(fleet1.pds, fleet1.pdsHit)
        var h2 = shipRound(fleet2.pds, fleet2.pdsHit)
        assignHits(fleet1, h2);
        assignHits(fleet2, h1);

       //tests if the battle is over
          if((fleetSum(fleet1)) < 1 ||(fleetSum(fleet2))<1){
            if (fleetSum(fleet1) > fleetSum(fleet2)){
              winner = 1
            } else {winner = 2}}

      //only initiates if there are o fleets left
        while(fleetSum(fleet1) > 0 && fleetSum(fleet2) > 0) //while at least one fleet has ships,
      {
          h1 = battleRound(fleet1)
          h2 = battleRound(fleet2)
          assignHits(fleet1, h2);
          assignHits(fleet2, h1);


        }

      if (fleetSum(fleet1) > fleetSum(fleet2)){
        winner = 1
      } else {winner = 2}
      }
     return winner

}



//
//var fleet1 = new fleetCreate(2,9,1,9,0,8,3,6,1,5,0,3,2,6,0,8);
//console.log(fleet1.fight);
//fleet1.print();
//var fleet2 = new fleetCreate(0,9,0,9,0,8,2,6,3,5,0,3,2,6,0,8);
//
//
////This entire bit is for easy testing
//fleet1.fight = 8;
//fleet1.fightHit = 9;
//fleet1.car = 1;
//fleet1.carHit = 9;
//fleet1.des = 2;
//fleet1.desHit = 9;
//fleet1.cru = 3;
//fleet1.cruHit = 7;
//fleet1.dred = 1;
//fleet1.dredHit = 5;
//fleet1.sun = 2;
//fleet1.sunHit = 3;
//fleet1.pds = 2;
//fleet1.pdsHit = 6;
//fleet1.gf = 0;
//fleet1.gfHit = 9;
//
//
//fleet2.fight = 6;
//fleet2.fightHit = 9;
//fleet2.car = 1;
//fleet2.carHit = 9;
//fleet2.des = 2;
//fleet2.desHit = 9;
//fleet2.cru = 3;
//fleet2.cruHit = 7;
//fleet2.dred = 1;
//fleet2.dredHit = 5;
//fleet2.sun = 2;
//fleet2.sunHit = 3;
//fleet2.pds = 2;
//fleet2.pdsHit = 6;
//fleet2.gf = 0;
//fleet2.gfHit = 9;
//
//
//
//
//var fleet1wins = 0;
//var fleet2wins = 0;
//for (var j = 0; j < 1000; j++){ //loops through the simulaion 1000 times figuring our who wins
//
  //var winner = 0;
  //fleet1f = Object.assign({},fleet1);
  //fleet2f = Object.assign({},fleet2);
  //winner = fleetSim(fleet1f, fleet2f);
  //if(winner == 1){
    //fleet1wins++;
  //} else {fleet2wins++}
//
//}
//
//console.log(fleet1wins);
//$("#team1").text(fleet1wins);
//console.log(fleet2wins);
//$("#team2").text(fleet2wins);
