/*
*
* Quick Index 
*
* - Canvas Settings
* - Main Battle area
* - Objects
* - Character 1 : Skeleton
* - Character 2 : Frost Giant
* - Character 3 : Dragonling
* - Character 4 : Thunder Serpent
* - Leveling Up
* - Skills and Upgrades
* - Set Initial Backgrounds
* - Stats and Pet/Character Information
* - jQuery
* - Tutorial Section
* - Settings Section
* - Talents Section
* - Saving and Loading (Local)
* - Graphics for Pet
* - Easy-read Number Conversion
* - Reincarnation System
* - RP Section
* - TODO : Add remaining sections, especially between talents/saving
*/

/*
* -------------------------------
* Canvas Settings 
* -------------------------------
*/


/*Main battle area*/
const canvas = document.getElementById('battleArea');
const context = canvas.getContext('2d');

//Drawing some simple borders and a background to help separate items
let drawBorders = function() {
  context.fillStyle = 'rgba(0,0,0,0.01)';

  //Fill the rectangle based on canvas width/height
  context.fillRect(0,0,canvas.width, canvas.height);

  //Scale the borders to be a little more visible
  context.scale(2,2);                           
  context.strokeStyle = 'maroon';

  //Borders for canvas
  let mainBorder = context.strokeRect(1, 1, 398, 298); 
  let topBorder = context.strokeRect  (1, 1, 398, 298 / 1.885);
  //let middleBorder = context.strokeRect(1, 1, 398, 298 / 1.25);

  //Vertical Line 1 - Left
  context.beginPath();
  context.moveTo(75, 159);
  context.lineTo(75, 1);
  context.stroke();

  //Vertical Line 1 - Left
  context.beginPath();
  context.moveTo(325, 159);
  context.lineTo(325, 1);
  context.stroke();
  //
}

drawBorders();

/*
* -------------------------------
* Objects
* -------------------------------
*/

//Character Object, just need one for now
let player = {
  totalPets: 0, //TODO - Bonuses based on current pets
  gold: 28,  //TODO - General - Balancing Issues with Starting Gold 
	goldBonusCount: 1.00,
  level: 1,  //TODO - Talent/Skill points for pets
  exp: 1,  
	expBonusCount: 1.00,
  maxXp: 5,
  maxPets: 1,
  nextReincarPoints: 0,
  totalOveralRP: 0,
  reincarPoints: 0,
  damageIncreaseRP: 1.00,
  bonusRPCount: 1,   //This is the RP bonus and increases the multiple of RP gains
  
  /*RP Talent Properties - Helps set current, max allowable, and cost for the talent tree*/
  
  bonusRPTalentOne: 0,						//Skeleton Damage
  bonusRPTalentOneMax: 1500,			//Skeleton Speed
  bonusRPTalentOneCost: 1,				//Skeleton Special, rinse/repeat this until Talent 15
  bonusRPTalentTwo: 0,
  bonusRPTalentTwoMax: 25,
  bonusRPTalentTwoCost: 1,
  bonusRPTalentThree: 0,
  bonusRPTalentThreeMax: 3,
  bonusRPTalentThreeCost: 10,
  bonusRPTalentFour: 0,
  bonusRPTalentFourMax: 1500,
  bonusRPTalentFourCost: 1,
  bonusRPTalentFive: 0,
  bonusRPTalentFiveMax: 10,
  bonusRPTalentFiveCost: 1,
  bonusRPTalentSix: 0,
  bonusRPTalentSixMax: 25,
  bonusRPTalentSixCost: 1,
  bonusRPTalentSeven: 0,
  bonusRPTalentSevenMax: 1500,
  bonusRPTalentSevenCost: 1,
  bonusRPTalentEight: 0,
  bonusRPTalentEightMax: 25,
  bonusRPTalentEightCost: 1,
  bonusRPTalentNine: 0,
  bonusRPTalentNineMax: 25,
  bonusRPTalentNineCost: 1,
  bonusRPTalentTen: 0,
  bonusRPTalentTenMax: 1500,
  bonusRPTalentTenCost: 1,
  bonusRPTalentEleven: 0,
  bonusRPTalentElevenMax: 25,
  bonusRPTalentElevenCost: 1,
  bonusRPTalentTwelve: 0,
  bonusRPTalentTwelveMax: 5,
  bonusRPTalentTwelveCost: 10,
  bonusRPTalentThirteen: 0,
  bonusRPTalentThirteenMax: 25,
  bonusRPTalentThirteenCost: 10,
  bonusRPTalentFourteen: 0,
  bonusRPTalentFourteenMax: 25,
  bonusRPTalentFourteenCost: 10,
  bonusRPTalentFifteen: 0,
  bonusRPTalentFifteenMax: 25,
  bonusRPTalentFifteenCost: 10,
	costMultiplier: 1,
  autoSaveSelection: 0
}

//Pet Object, TODO: Possibly more pet properties that deal with modifiers (such as poison, crit, etc.)
let pet = function(name, level, damage, type, speed, count, cost, skill1, skill2, skill3, skill4, skill5, skill6, addDam, addSpeed){
  this.name = name,
  this.level = level,     //Currently does nothing
  this.damage = damage,
  this.type = type,       //TODO - Something with types that will actually work
  this.speed = speed,
  this.count = count,
  this.cost = cost,
  this.skill1 = skill1,   //These skills will be set to zero.
  this.skill2 = skill2,   //Once they are activated they will be set to one.
  this.skill3 = skill3,   //This will help with reincarnation and other stuff
  this.skill4 = skill4,
  this.skill5 = skill5,
  this.skill6 = skill6,
  this.addDam = addDam,
  this.addSpeed = addSpeed
  //TODO - New types of ways for pets to improve. Example - Crit, Crit %, etc.
}

//Enemy  
//TODO - Enemy information 
//TODO - Enemy Movement between levels
//TODO - Bosses
//TODO - Images for different enemies
let enemy = {
  currentEnemyHealth: 10,
  maxEnemyHealth: 10,
  monsterGold: 1,
  exp: 1,
  toNextLevel: 1,
  toNextLevelMax: 10,
  level: 1
}

/* ************************************************ */

//Character 1 : Skeleton
let Skeleton = new pet('Skeleton', 1, 1.5, "Normal", 1750, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0);

let buySkeleton = function(){  

  for(let x = 0; x < player.costMultiplier; x++){

    //Initial check for gold cost. If the gold doesn't match the cost, then exit the conditional statement
    if(player.gold <= Skeleton.cost){ 
      break; 
    }

    //Set a ceiling for the cost
    player.gold -= Math.ceil(Skeleton.cost);
    Skeleton.count++;
    player.totalPets++;

    //We set some individual costs here based on testing.
    //Adjust cost values to change difficulty as you level
    if(Skeleton.count > 0 && Skeleton.count < 10){
      Skeleton.cost = Skeleton.cost * 1.3;
    }
    if(Skeleton.count > 9 && Skeleton.count < 50){
      Skeleton.cost = Skeleton.cost * 1.20;
    }
    if(Skeleton.count >= 50){
      Skeleton.cost = Skeleton.cost * 1.10;
      }
  }
    
    //Wait until conditional finishes 
    showSkeletonGraphic();
    document.getElementById('skeletonCost').innerHTML = "Cost: " + nFormatter(Math.ceil(Skeleton.cost).toFixed(0));
}

/* Auto Attack System */
let autoattackSkeleton = function(){
  
  let finalSkeletonSpeed = (Skeleton.speed - Skeleton.addSpeed);
  let floatingTextSkeleton = finalSkeletonSpeed;
  
    //Our decided speed limit is no more than 10 attacks a second, or ever 100ms
    if (finalSkeletonSpeed > 100){
      finalSkeletonSpeed = (Skeleton.speed - Skeleton.addSpeed);
    }
    
    //Floating Damage Text
  
    //First off, let's make sure there are actual minions on the battlefield 
    if (Skeleton.count > 0){
      
      //The final damage output is complicated through additional % and flat damage increases, but we 
      //need to get all of them to display the DPS correctly
      document.getElementById('floatingSkeletonDamage').innerHTML = "-" + nFormatter((((Skeleton.damage + Skeleton.addDam) * player.damageIncreaseRP) * Skeleton.count).toFixed(2));  
    
      //Once per timeout this will fire, thanks to the final setTimeout below
      //Note: Change 100 and 350 values to adjust how fast/slow the damage will
      //fade in, and then fade out immediately
      $("#floatingSkeletonDamage").animate({
        opacity: 1,
            }, 100, function() {
            // Animation complete.
          }).animate({ 
                opacity: 0,
                  }, 350, function() {
                    // Animation complete.
                  })};
    
  //Finally, the actual attack, where we subtract the amount of enemy health
  enemy.currentEnemyHealth -= ((Skeleton.damage + Skeleton.addDam) * Skeleton.count) * player.damageIncreaseRP;
  
  
  //This will make sure this runs again after finishing the timeout OUTSIDE of the function
  var timeoutGraphicSkeleton =  setTimeout(autoattackSkeleton, finalSkeletonSpeed);
  
}

//Continually checks for the timeout inside of attack function and resets it once it is done
setTimeout(autoattackSkeleton, 10);  


/* ************************************************ */

//Character 2 : Frost Giant
let FrostGiant = new pet('Frost Giant', 1, 9, "Frost", 2800, 0, 200, 0, 0, 0, 0, 0, 0, 0, 0);

let buyFrostGiant = function(){  

  for(let x = 0; x < player.costMultiplier; x++){

    //Initial check for gold cost. If the gold doesn't match the cost, then exit the conditional statement
    if(player.gold <= FrostGiant.cost){ 
      break; 
    }

    //Set a ceiling for the cost
    player.gold -= Math.ceil(FrostGiant.cost);
    FrostGiant.count++;
    player.totalPets++;

    //We set some individual costs here based on testing.
    //Adjust cost values to change difficulty as you level
    if(FrostGiant.count > 0 && FrostGiant.count < 50){
      FrostGiant.cost = FrostGiant.cost * 1.20;
    }
    if(FrostGiant.count >= 50){
      FrostGiant.cost = FrostGiant.cost * 1.10;
      }
  }
    
    //Wait until conditional finishes
    showFrostGiantGraphic();
    document.getElementById('frostGiantCost').innerHTML = "Cost: " + nFormatter(Math.ceil(FrostGiant.cost).toFixed(0));
}

let autoattackFrostGiant = function(){
  
  let finalFrostGiantSpeed = (FrostGiant.speed - FrostGiant.addSpeed);
  let floatingTextFrostGiant = finalFrostGiantSpeed;
  
    if (finalFrostGiantSpeed > 100){
      finalFrostGiantSpeed = (FrostGiant.speed - FrostGiant.addSpeed);
    }
  
  
    if (FrostGiant.count > 0){
      document.getElementById('floatingFrostGiantDamage').innerHTML = "-" + nFormatter((((FrostGiant.damage + FrostGiant.addDam) * player.damageIncreaseRP) * FrostGiant.count).toFixed(0));  
    
      $("#floatingFrostGiantDamage").animate({
        opacity: 1,
            }, 100, function() {
            // Animation complete.
          }).animate({ 
                opacity: 0,
                  }, 350, function() {
                    // Animation complete.
                  })};
    
  
  enemy.currentEnemyHealth -= ((FrostGiant.damage + FrostGiant.addDam) * FrostGiant.count) * player.damageIncreaseRP;
  
  
  
  var timeoutGraphicFrostGiant =  setTimeout(autoattackFrostGiant, finalFrostGiantSpeed);
}


setTimeout(autoattackFrostGiant, 100);  
/* *************************************************/

//Character 3 : Dragonling
let Dragonling = new pet('Dragonling', 2500, 22, "Fire", 2800, 0, 900, 0, 0, 0, 0, 0, 0, 0, 0);

let buyDragonling = function(){    

  for(let x = 0; x < player.costMultiplier; x++){

    //Initial check for gold cost. If the gold doesn't match the cost, then exit the conditional statement
    if(player.gold <= Dragonling.cost){ 
      break; 
    }

    //Set a ceiling for the cost
    player.gold -= Math.ceil(Dragonling.cost);
    Dragonling.count++;
    player.totalPets++;

    //We set some individual costs here based on testing.
    //Adjust cost values to change difficulty as you level
    if(Dragonling.count > 0 && Dragonling.count < 50){
      Dragonling.cost = Dragonling.cost * 1.20;
    }
    if(Dragonling.count >= 50){
      Dragonling.cost = Dragonling.cost * 1.10;
      }
  }
    
    //Wait until conditional finishes
    showDragonlingGraphic();
    document.getElementById('dragonlingCost').innerHTML = "Cost: " + nFormatter(Math.ceil(Dragonling.cost).toFixed(0));
}

let autoattackDragonling = function(){
  
  let finalDragonlingSpeed = (Dragonling.speed - Dragonling.addSpeed);
  let floatingTextDragonling = finalDragonlingSpeed;
  
    if (finalDragonlingSpeed > 100){
      finalDragonlingSpeed = (Dragonling.speed - Dragonling.addSpeed);
    }
  
  
    if (Dragonling.count > 0){
      document.getElementById('floatingDragonlingDamage').innerHTML = "-" + nFormatter((((Dragonling.damage + Dragonling.addDam) * player.damageIncreaseRP) * Dragonling.count).toFixed(0));  
    
      $("#floatingDragonlingDamage").animate({
        opacity: 1,
            }, 100, function() {
            // Animation complete.
          }).animate({ 
                opacity: 0,
                  }, 350, function() {
                    // Animation complete.
                  })};
    
  
  enemy.currentEnemyHealth -= ((Dragonling.damage + Dragonling.addDam) * Dragonling.count) * player.damageIncreaseRP;
  
  
  
  var timeoutGraphicDragonling =  setTimeout(autoattackDragonling, finalDragonlingSpeed);
}


setTimeout(autoattackDragonling, 100);  


/* ************************************************ */

//Character 4 : Thunder Serpent
let ThunderSerpent = new pet('Thunder Serpent', 1, 19, "Thunder", 1700, 0, 2500, 0, 0, 0, 0, 0, 0, 0, 0);

let buyThunderSerpent = function(){    

  for(let x = 0; x < player.costMultiplier; x++){

    //Initial check for gold cost. If the gold doesn't match the cost, then exit the conditional statement
    if(player.gold <= ThunderSerpent.cost){ 
      break; 
    }

    //Set a ceiling for the cost
    player.gold -= Math.ceil(ThunderSerpent.cost);
    ThunderSerpent.count++;
    player.totalPets++;

    //We set some individual costs here based on testing.
    //Adjust cost values to change difficulty as you level
    if(ThunderSerpent.count > 0 && ThunderSerpent.count < 50){
      ThunderSerpent.cost = ThunderSerpent.cost * 1.20;
    }
    if(ThunderSerpent.count >= 50){
      ThunderSerpent.cost = ThunderSerpent.cost * 1.10;
      }
  }
    
    //Wait until conditional finishes
    showThunderSerpentGraphic();
    document.getElementById('thunderSerpentCost').innerHTML = "Cost: " + nFormatter(Math.ceil(ThunderSerpent.cost).toFixed(0));
}



let autoattackThunderSerpent = function(){
  
  let finalThunderSerpentSpeed = (ThunderSerpent.speed - ThunderSerpent.addSpeed);
  let floatingTextThunderSerpent = finalThunderSerpentSpeed;
  
    if (finalThunderSerpentSpeed > 100){
      finalThunderSerpentSpeed = (ThunderSerpent.speed - ThunderSerpent.addSpeed);
    }
  
  
    if (ThunderSerpent.count > 0){
      document.getElementById('floatingThunderSerpentDamage').innerHTML = "-" + nFormatter((((ThunderSerpent.damage + ThunderSerpent.addDam) * player.damageIncreaseRP) * ThunderSerpent.count).toFixed(0));  
    
      $("#floatingThunderSerpentDamage").animate({
        opacity: 1,
            }, 100, function() {
            // Animation complete.
          }).animate({ 
                opacity: 0,
                  }, 350, function() {
                    // Animation complete.
                  })};  
    
  
  enemy.currentEnemyHealth -= ((ThunderSerpent.damage + ThunderSerpent.addDam) * ThunderSerpent.count) * player.damageIncreaseRP;
  
  
  var timeoutGraphicThunderSerpent =  setTimeout(autoattackThunderSerpent, finalThunderSerpentSpeed);
}


setTimeout(autoattackThunderSerpent, 100);  

/*
* -------------------------------
* Battle System
* -------------------------------
*/

let enemyLevelSystem = function(){
  if(enemy.toNextLevel === enemy.toNextLevelMax){
      enemy.toNextLevel = 0;
      
      //Determines enemy health. Use this section for general balancing
      //IDEA:
      if(enemy.level < 10 && enemy.level > 0){
      enemy.maxEnemyHealth *= 1.315;
      }
      if(enemy.level < 49 && enemy.level > 9){
      enemy.maxEnemyHealth *= 1.335;
      }
      if(enemy.level > 50){
      enemy.maxEnemyHealth *= 1.355;
      }
    
      enemy.level++;
      enemy.exp = ((enemy.exp * player.expBonusCount) * 1.15);

      enemy.monsterGold = Math.floor((((enemy.monsterGold) + 2.5) * 1.425) * player.goldBonusCount);
  }
}

let enemyBackground = function(){

  if(enemy.level < 5){
    document.getElementById("enemyOne").src="images/orc_zumbi.png";
  }
  else if(enemy.level < 10){
    document.getElementById("enemyOne").src="images/BanditBeigeGold.png";
  }
  
  
  else if(enemy.level < 15){
    document.getElementById("enemyOne").src="images/bathornetgreen.png";
  }
  else if(enemy.level < 20){
    document.getElementById("enemyOne").src="images/BanditWhiteGrey.png";
  }
  else if(enemy.level < 25){
    document.getElementById("enemyOne").src="images/orc_zumbi.png";
  }
  
  else if(enemy.level < 30){
    document.getElementById("enemyOne").src="images/bathornetblue.png";
  }
  else if(enemy.level < 35){
    document.getElementById("enemyOne").src="images/BanditBlackRed.png";
  }
  else if(enemy.level < 40){
    document.getElementById("enemyOne").src="images/orc_stone.png";
  }
  else if(enemy.level < 45){
    document.getElementById("enemyOne").src="images/BanditBlueDarkBlue.png";
  }
  else if(enemy.level < 50){
    document.getElementById("enemyOne").src="images/orc_zumbi_2.png";
  }
  else if(enemy.level < 55){
    document.getElementById("enemyOne").src="images/bathornetred.png";
  }
  else if(enemy.level < 60){
    document.getElementById("enemyOne").src="images/orc_hig.png";
  }
  else if(enemy.level < 65){
    document.getElementById("enemyOne").src="images/orc_zumbi.png";
  }
  else if(enemy.level < 70){
    document.getElementById("enemyOne").src="images/BanditBeigeGold.png";
  }
  
  else if(enemy.level < 75){
    document.getElementById("enemyOne").src="images/bathornetgreen.png";
  }
  else if(enemy.level < 80){
    document.getElementById("enemyOne").src="images/BanditWhiteGrey.png";
  }
  else if(enemy.level < 85){
    document.getElementById("enemyOne").src="images/orc_zumbi.png";
  }
  
  else if(enemy.level < 90){
    document.getElementById("enemyOne").src="images/bathornetblue.png";
  }
  else if(enemy.level < 95){
    document.getElementById("enemyOne").src="images/BanditBlackRed.png";
  }
  else if(enemy.level < 100){
    document.getElementById("enemyOne").src="images/orc_stone.png";
  }
  else if(enemy.level < 105){
    document.getElementById("enemyOne").src="images/BanditBlueDarkBlue.png";
  }
  else if(enemy.level < 110){
    document.getElementById("enemyOne").src="images/orc_zumbi_2.png";
  }
  else if(enemy.level < 115){
    document.getElementById("enemyOne").src="images/bathornetred.png";
  }
  else if(enemy.level < 120){
    document.getElementById("enemyOne").src="images/orc_hig.png";
  }
  

  if(enemy.level < 10){
    document.getElementById("enemyFrontInterface").style.backgroundImage = "url('images/background-rock.png')";
  }
  else if(enemy.level < 11){
    document.getElementById("enemyFrontInterface").style.backgroundImage = "url('images/background-swamp.png')";
  }
  else if(enemy.level < 21){
    document.getElementById("enemyFrontInterface").style.backgroundImage = "url('images/background-snow.png')";
  }
  else if(enemy.level < 31){
    document.getElementById("enemyFrontInterface").style.backgroundImage = "url('images/background-city.png')";
  }
  else if(enemy.level < 41){
    document.getElementById("enemyFrontInterface").style.backgroundImage = "url('images/background-rock.png')";
  }
  else if(enemy.level < 51){
    document.getElementById("enemyFrontInterface").style.backgroundImage = "url('images/background-swamp.png')";
  }
  else if(enemy.level < 61){
    document.getElementById("enemyFrontInterface").style.backgroundImage = "url('images/background-snow.png')";
  }
  else if(enemy.level < 71){
    document.getElementById("enemyFrontInterface").style.backgroundImage = "url('images/background-city.png')";
  }
  else if(enemy.level < 81){
    document.getElementById("enemyFrontInterface").style.backgroundImage = "url('images/background-rock.png')";
  }
  else if(enemy.level < 91){
    document.getElementById("enemyFrontInterface").style.backgroundImage = "url('images/background-swamp.png')";
  }
  else if(enemy.level < 11){
    document.getElementById("enemyFrontInterface").style.backgroundImage = "url('images/background-snow.png')";
  }
  else if(enemy.level < 111){
    document.getElementById("enemyFrontInterface").style.backgroundImage = "url('images/background-city.png')";
  }
  else if(enemy.level < 121){``
    document.getElementById("enemyFrontInterface").style.backgroundImage = "url('images/background-rock.png')";
  }
}

let checkForUpgradeStatusforCostAndSkills = function(){

  /****   Check For Cost      ****/
  if(Skeleton.cost > player.gold){
    document.getElementById('skeletonStats').style.color = 'red';
    document.getElementById('skeletonCost').style.color = 'red';
  }
  else{
    document.getElementById('skeletonStats').style.color = 'white';  
    document.getElementById('skeletonCost').style.color = 'white';
  }

  if(FrostGiant.cost > player.gold){
    document.getElementById('frostGiantStats').style.color = 'red';
  }
  else{ 
    document.getElementById('frostGiantStats').style.color = 'white';   
  }

  if(Dragonling.cost > player.gold){
    document.getElementById('dragonlingStats').style.color = 'red';
  }
  else{
    document.getElementById('dragonlingStats').style.color = 'white';   
  }
  
  if(ThunderSerpent.cost > player.gold){
    document.getElementById('thunderSerpentStats').style.color = 'red';
  }
  else{
    document.getElementById('thunderSerpentStats').style.color = 'white';   
  }

}

setInterval(checkForUpgradeStatusforCostAndSkills, 100);

checkForUpgradeStatusforCostAndSkills();
enemyBackground();

/*
* -------------------------------
* Leveling Up
* -------------------------------
*/

let levelUpPlayer = function(){

  if (enemy.currentEnemyHealth <= 0.9){

    enemyLevelSystem();
    enemy.currentEnemyHealth = enemy.maxEnemyHealth;
    player.exp += (enemy.exp * player.expBonusCount);
    player.gold += (enemy.monsterGold * player.goldBonusCount);
    enemy.toNextLevel++;
    enemyBackground();
    checkNextRP();  
    floatingGoldText();
    /*$("#enemyDeath").delay(800).addClass("hidden");*/
  }

  if (player.exp >= player.maxXp){
    player.level++;
    checkForNextRP();
    player.exp = 0;
    
    if(player.level <= 75){
      player.maxXp *= 1.15;
    }
    
    if(player.level <= 150 && player.level < 75){
      player.maxXp *= 1.20;
    }
    
    if(player.level > 150){
      player.maxXp *= 1.225;
    }
  }
}

/*
*
* SKELETON
*
*/
let skeletonSkillFirst = function(){

  if(Skeleton.count >= 10 && Skeleton.skill1 !== 1){
    Skeleton.skill1 = 1;
    
    //Skill upgrade
    Skeleton.damage *= 3.5;
    Skeleton.speed *= .90;
  }
}

let skeletonSkillSecond = function(){

  if(Skeleton.count >= 25 && Skeleton.skill2 !== 1){
    Skeleton.skill2 = 1;

    //Skill upgrade
    Skeleton.damage *= 4.5;
    Skeleton.speed *= .85;
  }
}


let skeletonSkillThird = function(){

  if(Skeleton.count >= 50 && Skeleton.skill3 !== 1){
    Skeleton.skill3 = 1;

    //Skill upgrade
    Skeleton.damage *= 7;
    Skeleton.speed *= .85;
  }
}


let skeletonSkillFourth = function(){

  if(Skeleton.count >= 100 && Skeleton.skill4 !== 1){
    Skeleton.skill4 = 1;

    //Skill upgrade
    Skeleton.damage *= 8;
    Skeleton.speed *= .75;
  }
}


let skeletonSkillFifth = function(){

  if(Skeleton.count >= 250 && Skeleton.skill5 !== 1){
    Skeleton.skill5 = 1;

    //Skill upgrade
    Skeleton.damage *= 8.5;
    Skeleton.speed *= .75;
  }
}


let skeletonSkillSixth = function(){

  if(Skeleton.count >= 500 && Skeleton.skill6 !== 1){
    Skeleton.skill6 = 1;

    //Skill upgrade
    Skeleton.damage *= 9;
    Skeleton.speed *= .70;
  }
}


/*
*
* FROST GIANT
*
*/
let frostGiantSkillFirst = function(){

  if(FrostGiant.count >= 10 && FrostGiant.skill1 !== 1){
    FrostGiant.skill1 = 1;

    //Skill upgrade
    FrostGiant.damage *= 3;
    FrostGiant.speed *= .75;
  }
}

let frostGiantSkillSecond = function(){

  if(FrostGiant.count >= 25 && FrostGiant.skill2 !== 1){
    FrostGiant.skill2 = 1;

    //Skill upgrade
    FrostGiant.damage *= 4;
    FrostGiant.speed *= .75;
  }
}


let frostGiantSkillThird = function(){

  if(FrostGiant.count >= 50 && FrostGiant.skill3 !== 1){
    FrostGiant.skill3 = 1;

    //Skill upgrade
    FrostGiant.damage *= 5;
    FrostGiant.speed *= .95;
  }
}


let frostGiantSkillFourth = function(){

  if(FrostGiant.count >= 100 && FrostGiant.skill4 !== 1){
    FrostGiant.skill4 = 1;

    //Skill upgrade
    FrostGiant.damage *= 5;
    FrostGiant.speed *= .35;
  }
}


let frostGiantSkillFifth = function(){

  if(FrostGiant.count >= 250 && FrostGiant.skill5 !== 1){
    FrostGiant.skill5 = 1;

    //Skill upgrade
    FrostGiant.damage *= 6;
    FrostGiant.speed *= .75;
  }
}


let frostGiantSkillSixth = function(){

  if(FrostGiant.count >= 500 && FrostGiant.skill6 !== 1){
    FrostGiant.skill6 = 1;

    //Skill upgrade
    FrostGiant.damage *= 7;
    FrostGiant.speed *= .70;
  }
}

/*
*
* DRAGONLING
*
*/
let dragonlingSkillFirst = function(){

  if(Dragonling.count >= 10 && Dragonling.skill1 !== 1){
    Dragonling.skill1 = 1;

     //Skill upgrade
    Dragonling.damage *= 2.5;
    Dragonling.speed *= .85;
  }
}

let dragonlingSkillSecond = function(){

  if(Dragonling.count >= 25 && Dragonling.skill2 !== 1){
    Dragonling.skill2 = 1;

    //Skill upgrade
    Dragonling.damage *= 3.5;
    Dragonling.speed *= .70;
  }
}


let dragonlingSkillThird = function(){

  if(Dragonling.count >= 50 && Dragonling.skill3 !== 1){
    Dragonling.skill3 = 1;

    //Skill upgrade
    Dragonling.damage *= 5;
    Dragonling.speed *= .70;
  }
}


let dragonlingSkillFourth = function(){

  if(Dragonling.count >= 100 && Dragonling.skill4 !== 1){
    Dragonling.skill4 = 1;

    //Skill upgrade
    Dragonling.damage *= 6;
    Dragonling.speed *= .70;
  }
}


let dragonlingSkillFifth = function(){

  if(Dragonling.count >= 250 && Dragonling.skill5 !== 1){
    Dragonling.skill5 = 1;

    //Skill upgrade
    Dragonling.damage *= 7;
    Dragonling.speed *= .65;
  }
}


let dragonlingSkillSixth = function(){

  if(Dragonling.count >= 500 && Dragonling.skill6 !== 1){
    Dragonling.skill6 = 1;

    //Skill upgrade
    Dragonling.damage *= 8;
    Dragonling.speed *= .55;
  }
}


/*
*
* THUNDER SERPENT
*
*/
let thunderSerpentSkillFirst = function(){

  if(ThunderSerpent.count >= 10 && ThunderSerpent.skill1 !== 1){
    ThunderSerpent.skill1 = 1;

     //Skill upgrade
    ThunderSerpent.damage *= 3;
    ThunderSerpent.speed *= .75;
  }
}

let thunderSerpentSkillSecond = function(){

  if(ThunderSerpent.count >= 25 && ThunderSerpent.skill2 !== 1){
    ThunderSerpent.skill2 = 1;

    //Skill upgrade
    ThunderSerpent.damage *= 5;
    ThunderSerpent.speed *= .75;
  }
}


let thunderSerpentSkillThird = function(){

  if(ThunderSerpent.count >= 50 && ThunderSerpent.skill3 !== 1){
    ThunderSerpent.skill3 = 1;

    //Skill upgrade
    ThunderSerpent.damage *= 6;
    ThunderSerpent.speed *= .75;
  }
}


let thunderSerpentSkillFourth = function(){

  if(ThunderSerpent.count >= 100 && ThunderSerpent.skill4 !== 1){
    ThunderSerpent.skill4 = 1;

    //Skill upgrade
    ThunderSerpent.damage *= 6.5;
    ThunderSerpent.speed *= .75;
  }
}


let thunderSerpentSkillFifth = function(){

  if(ThunderSerpent.count >= 250 && ThunderSerpent.skill5 !== 1){
    ThunderSerpent.skill5 = 1;

    //Skill upgrade
    ThunderSerpent.damage *= 7.5;
    ThunderSerpent.speed *= .75;
  }
}


let thunderSerpentSkillSixth = function(){

  if(ThunderSerpent.count >= 500 && ThunderSerpent.skill6 !== 1){
    ThunderSerpent.skill6 = 1;

    //Skill upgrade
    ThunderSerpent.damage *= 10;
  }
}


let skillUpgrades = function(){
  //Skeleton
  if(Skeleton.count >= 10){
    document.getElementById('skeletonSkillOne').src = 
    "skills/needles-sky-1.png";
    document.getElementById('skeletonSkillOne').style.border = '1px solid white';
  }

  if(Skeleton.count >= 25){
    document.getElementById('skeletonSkillTwo').src = 
    "skills/air-burst-sky-2.png";
    document.getElementById('skeletonSkillTwo').style.border = '1px solid white';
  }

  if(Skeleton.count >= 50){
    document.getElementById('skeletonSkillThree').src = 
    "skills/fire-arrows-sky-2.png";
    document.getElementById('skeletonSkillThree').style.border = '1px solid white';
  }

  if(Skeleton.count >= 100){
    document.getElementById('skeletonSkillFour').src = 
    "skills/fog-sky-2.png";
    document.getElementById('skeletonSkillFour').style.border = '1px solid white';
  }

  if(Skeleton.count >= 250){
    document.getElementById('skeletonSkillFive').src = 
    "skills/shielding-spirit-1.png";
    document.getElementById('skeletonSkillFive').style.border = '1px solid white';
  }

  if(Skeleton.count >= 500){
    document.getElementById('skeletonSkillSix').src = 
    "skills/slice-sky-3.png";
    document.getElementById('skeletonSkillSix').style.border = '1px solid white';
  }


  if(Skeleton.skill1 === 1){
    document.getElementById('skeletonSkillOne').style.border = '1px solid gold';  
  }

  if(Skeleton.skill2 === 1){
    document.getElementById('skeletonSkillTwo').style.border = '1px solid gold';  
  }

  if(Skeleton.skill3 === 1){
    document.getElementById('skeletonSkillThree').style.border = '1px solid gold';  
  }

  if(Skeleton.skill4 === 1){
    document.getElementById('skeletonSkillFour').style.border = '1px solid gold';  
  }

  if(Skeleton.skill5 === 1){
    document.getElementById('skeletonSkillFive').style.border = '1px solid gold';  
  }

  if(Skeleton.skill6 === 1){
    document.getElementById('skeletonSkillSix').style.border = '1px solid gold';  
  }

  //Frost Giant
  if(FrostGiant.count >= 10){
    document.getElementById('frostGiantSkillOne').src = 
    "skills/fog-blue-3.png";
    document.getElementById('frostGiantSkillOne').style.border = '1px solid white';
  }

  if(FrostGiant.count >= 25){
    document.getElementById('frostGiantSkillTwo').src = 
    "skills/light-blue-2.png";
    document.getElementById('frostGiantSkillTwo').style.border = '1px solid white';
  }

  if(FrostGiant.count >= 50){
    document.getElementById('frostGiantSkillThree').src = 
    "skills/light-blue-3.png";
    document.getElementById('frostGiantSkillThree').style.border = '1px solid white';
  }

  if(FrostGiant.count >= 100){
    document.getElementById('frostGiantSkillFour').src = 
    "skills/needles-blue-2.png";
    document.getElementById('frostGiantSkillFour').style.border = '1px solid white';
  }

  if(FrostGiant.count >= 250){
    document.getElementById('frostGiantSkillFive').src = 
    "skills/shielding-eerie-3.png";
    document.getElementById('frostGiantSkillFive').style.border = '1px solid white';
  }

  if(FrostGiant.count >= 500){
    document.getElementById('frostGiantSkillSix').src = 
    "skills/wind-grasp-eerie-2.png";
    document.getElementById('frostGiantSkillSix').style.border = '1px solid white';
  }  


  if(FrostGiant.skill1 === 1){
    document.getElementById('frostGiantSkillOne').style.border = '1px solid gold';  
  }

  if(FrostGiant.skill2 === 1){
    document.getElementById('frostGiantSkillTwo').style.border = '1px solid gold';  
  }

  if(FrostGiant.skill3 === 1){
    document.getElementById('frostGiantSkillThree').style.border = '1px solid gold';  
  }

  if(FrostGiant.skill4 === 1){
    document.getElementById('frostGiantSkillFour').style.border = '1px solid gold';  
  }

  if(FrostGiant.skill5 === 1){
    document.getElementById('frostGiantSkillFive').style.border = '1px solid gold';  
  }

  if(FrostGiant.skill6 === 1){
    document.getElementById('frostGiantSkillSix').style.border = '1px solid gold';  
  }

  //Dragonling
  if(Dragonling.count >= 10){
    document.getElementById('dragonlingSkillOne').src = 
    "skills/fire-arrows-3.png";
    document.getElementById('dragonlingSkillOne').style.border = '1px solid white';
  }

  if(Dragonling.count >= 25){
    document.getElementById('dragonlingSkillTwo').src = 
    "skills/fog-orange-2.png";
    document.getElementById('dragonlingSkillTwo').style.border = '1px solid white';
  }

  if(Dragonling.count >= 50){
    document.getElementById('dragonlingSkillThree').src = 
    "skills/light-air-fire-3.png";
    document.getElementById('dragonlingSkillThree').style.border = '1px solid white';
  }

  if(Dragonling.count >= 100){
    document.getElementById('dragonlingSkillFour').src = 
    "skills/rip-acid-1.png";
    document.getElementById('dragonlingSkillFour').style.border = '1px solid white';
  }

  if(Dragonling.count >= 250){
    document.getElementById('dragonlingSkillFive').src = 
    "skills/rip-magenta-3.png";
    document.getElementById('dragonlingSkillFive').style.border = '1px solid white';
  }

  if(Dragonling.count >= 500){
    document.getElementById('dragonlingSkillSix').src = 
    "skills/slice-orange-3.png";
    document.getElementById('dragonlingSkillSix').style.border = '1px solid white';
  }

  if(Dragonling.skill1 === 1){
    document.getElementById('dragonlingSkillOne').style.border = '1px solid gold';  
  }

  if(Dragonling.skill2 === 1){
    document.getElementById('dragonlingSkillTwo').style.border = '1px solid gold';  
  }

  if(Dragonling.skill3 === 1){
    document.getElementById('dragonlingSkillThree').style.border = '1px solid gold';  
  }

  if(Dragonling.skill4 === 1){
    document.getElementById('dragonlingSkillFour').style.border = '1px solid gold';  
  }

  if(Dragonling.skill5 === 1){
    document.getElementById('dragonlingSkillFive').style.border = '1px solid gold';  
  }

  if(Dragonling.skill6 === 1){
    document.getElementById('dragonlingSkillSix').style.border = '1px solid gold';  
  }




  //ThunderSerpent
  if(ThunderSerpent.count >= 10){
    document.getElementById('thunderSerpentSkillOne').src = 
    "skills/air-burst-air-2.png";
    document.getElementById('thunderSerpentSkillOne').style.border = '1px solid white';
  }

  if(ThunderSerpent.count >= 25){
    document.getElementById('thunderSerpentSkillTwo').src = 
    "skills/air-burst-air-3.png";
    document.getElementById('thunderSerpentSkillTwo').style.border = '1px solid white';
  }

  if(ThunderSerpent.count >= 50){
    document.getElementById('thunderSerpentSkillThree').src = 
    "skills/light-eerie-3.png";
    document.getElementById('thunderSerpentSkillThree').style.border = '1px solid white';
  }

  if(ThunderSerpent.count >= 100){
    document.getElementById('thunderSerpentSkillFour').src = 
    "skills/light-sky-1.png";
    document.getElementById('thunderSerpentSkillFour').style.border = '1px solid white';
  }

  if(ThunderSerpent.count >= 250){
    document.getElementById('thunderSerpentSkillFive').src = 
    "skills/link-spirit-3.png";
    document.getElementById('thunderSerpentSkillFive').style.border = '1px solid white';
  }

  if(ThunderSerpent.count >= 500){
    document.getElementById('thunderSerpentSkillSix').src = 
    "skills/needles-sky-3.png";
    document.getElementById('thunderSerpentSkillSix').style.border = '1px solid white';
  }

  if(ThunderSerpent.skill1 === 1){
    document.getElementById('thunderSerpentSkillOne').style.border = '1px solid gold';  
  }

  if(ThunderSerpent.skill2 === 1){
    document.getElementById('thunderSerpentSkillTwo').style.border = '1px solid gold';  
  }

  if(ThunderSerpent.skill3 === 1){
    document.getElementById('thunderSerpentSkillThree').style.border = '1px solid gold';  
  }

  if(ThunderSerpent.skill4 === 1){
    document.getElementById('thunderSerpentSkillFour').style.border = '1px solid gold';  
  }

  if(ThunderSerpent.skill5 === 1){
    document.getElementById('thunderSerpentSkillFive').style.border = '1px solid gold';  
  }

  if(ThunderSerpent.skill6 === 1){
    document.getElementById('thunderSerpentSkillSix').style.border = '1px solid gold';  
  }
}


/*
*
* - Set Initial Backgrounds
*
*Decided to separate the functions so that we only need to run the initial background once
*instead of testing it every time we call skillUpgrades
*/

let setInitialBackgrounds = function(){

//Initial Skeleton Skill Backgrounds
  document.getElementById('skeletonSkillOne').src = 
  "skills/bw-needles-sky-1.png";
  document.getElementById('skeletonSkillOne').style.border = '1px solid red';

  document.getElementById('skeletonSkillTwo').src = 
  "skills/bw_air-burst-sky-2.png";
  document.getElementById('skeletonSkillTwo').style.border = '1px solid red';

  document.getElementById('skeletonSkillThree').src = 
  "skills/bw_fire-arrows-sky-2.png";
  document.getElementById('skeletonSkillThree').style.border = '1px solid red';

  document.getElementById('skeletonSkillFour').src = 
  "skills/bw_fog-sky-2.png";
  document.getElementById('skeletonSkillFour').style.border = '1px solid red';

  document.getElementById('skeletonSkillFive').src = 
  "skills/bw_shielding-spirit-1.png";
  document.getElementById('skeletonSkillFive').style.border = '1px solid red';

  document.getElementById('skeletonSkillSix').src = 
  "skills/bw_slice-sky-3.png";
  document.getElementById('skeletonSkillSix').style.border = '1px solid red';

//Initial Frost Giant Skill Backgrounds
  document.getElementById('frostGiantSkillOne').src = 
  "skills/bw_fog-blue-3.png";
  document.getElementById('frostGiantSkillOne').style.border = '1px solid red';

  document.getElementById('frostGiantSkillTwo').src = 
  "skills/bw_light-blue-2.png";
  document.getElementById('frostGiantSkillTwo').style.border = '1px solid red';

  document.getElementById('frostGiantSkillThree').src = 
  "skills/bw_light-blue-3.png";
  document.getElementById('frostGiantSkillThree').style.border = '1px solid red';

  document.getElementById('frostGiantSkillFour').src = 
  "skills/bw_needles-blue-2.png";
  document.getElementById('frostGiantSkillFour').style.border = '1px solid red';

  document.getElementById('frostGiantSkillFive').src = 
  "skills/bw_shielding-eerie-3.png";
  document.getElementById('frostGiantSkillFive').style.border = '1px solid red';

  document.getElementById('frostGiantSkillSix').src = 
  "skills/bw_wind-grasp-eerie-2.png";
  document.getElementById('frostGiantSkillSix').style.border = '1px solid red';

//Initial Dragonling Backgrounds
  document.getElementById('dragonlingSkillOne').src = 
  "skills/bw_fire-arrows-3.png";
  document.getElementById('dragonlingSkillOne').style.border = '1px solid red';

  document.getElementById('dragonlingSkillTwo').src = 
  "skills/bw_fog-orange-2.png";
  document.getElementById('dragonlingSkillTwo').style.border = '1px solid red';
  
  document.getElementById('dragonlingSkillThree').src = 
  "skills/bw_light-air-fire-3.png";
  document.getElementById('dragonlingSkillThree').style.border = '1px solid red';

  document.getElementById('dragonlingSkillFour').src = 
  "skills/bw_rip-acid-1.png";
  document.getElementById('dragonlingSkillFour').style.border = '1px solid red';

  document.getElementById('dragonlingSkillFive').src = 
  "skills/bw_rip-magenta-3.png";
  document.getElementById('dragonlingSkillFive').style.border = '1px solid red';

  document.getElementById('dragonlingSkillSix').src = 
  "skills/bw_slice-orange-3.png";
  document.getElementById('dragonlingSkillSix').style.border = '1px solid red';

  
  
//Initial Thunder Serpent Backgrounds
  document.getElementById('thunderSerpentSkillOne').src = 
  "skills/bw_air-burst-air-2.png";
  document.getElementById('thunderSerpentSkillOne').style.border = '1px solid red';

  document.getElementById('thunderSerpentSkillTwo').src = 
  "skills/bw_air-burst-air-3.png";
  document.getElementById('thunderSerpentSkillTwo').style.border = '1px solid red';
  
  document.getElementById('thunderSerpentSkillThree').src = 
  "skills/bw_light-eerie-3.png";
  document.getElementById('thunderSerpentSkillThree').style.border = '1px solid red';

  document.getElementById('thunderSerpentSkillFour').src = 
  "skills/bw_light-sky-1.png";
  document.getElementById('thunderSerpentSkillFour').style.border = '1px solid red';

  document.getElementById('thunderSerpentSkillFive').src = 
  "skills/bw_link-spirit-3.png";
  document.getElementById('thunderSerpentSkillFive').style.border = '1px solid red';

  document.getElementById('thunderSerpentSkillSix').src = 
  "skills/bw_needles-sky-3.png";
  document.getElementById('thunderSerpentSkillSix').style.border = '1px solid red';
}

setInitialBackgrounds();
setInterval(skillUpgrades, 100);

/*
* -------------------------------
* Stats and Pet/Character Information
* -------------------------------
*/

//Does not display gold for less than 0 gold; will revert it to show 0
let helpNegativeGold = function(){

  if(player.gold <= -1){
   return player.gold = 0;
  } 

  else{
   return Math.floor(player.gold);
  }
}


//look... this is ok for now but REFACTOR this beast before you forget and hate yourself when someone sees this monstrosity
let showStats = function(){
  //Player
  document.getElementById('charGold').innerHTML = "Gold <br>" + nFormatter(helpNegativeGold());  
  document.getElementById('charLevel').innerHTML = "Level: " + nFormatter(player.level);    
  document.getElementById('charRPTotal').innerHTML = "RP: " + nFormatter(player.reincarPoints);
  document.getElementById('charDamRP').innerHTML = "RP x: " + nFormatter((player.damageIncreaseRP).toFixed(2));
  document.getElementById('charExpInfo').innerHTML = "EXP: <br>" + nFormatter((player.exp).toFixed(2)) + " / " + nFormatter(Math.ceil(player.maxXp));

  //Skeleton     
  document.getElementById('skeletonDamage').innerHTML = "Damage: <br>" + nFormatter(((Skeleton.damage + Skeleton.addDam)*player.damageIncreaseRP).toFixed(2));    
  document.getElementById('skeletonSpeed').innerHTML = "Speed: <br>" + ((Skeleton.speed - Skeleton.addSpeed) / 1000).toFixed(2);    
  document.getElementById('skeletonCount').innerHTML = "#: " + nFormatter(Skeleton.count);
  document.getElementById('skeletonDps').innerHTML = "DPS <br>" + nFormatter((((Skeleton.damage + Skeleton.addDam) / ((Skeleton.speed - Skeleton.addSpeed) / 1000)) * Skeleton.count).toFixed(2));

  //Frost Giant     
  document.getElementById('frostGiantDamage').innerHTML = "Damage: <br>" + nFormatter(((FrostGiant.damage + FrostGiant.addDam)*player.damageIncreaseRP).toFixed(2));    
  document.getElementById('frostGiantSpeed').innerHTML = "Speed: <br>" + ((FrostGiant.speed - FrostGiant.addSpeed) / 1000).toFixed(2);    
  document.getElementById('frostGiantCount').innerHTML = "#: " + nFormatter(FrostGiant.count);
  document.getElementById('frostGiantDps').innerHTML = "DPS <br>" + nFormatter((((FrostGiant.damage + FrostGiant.addDam) / ((FrostGiant.speed - FrostGiant.addSpeed) / 1000)) * FrostGiant.count).toFixed(2));

  //Dragonling 
  document.getElementById('dragonlingDamage').innerHTML = "Damage: <br>" + nFormatter(((Dragonling.damage + Dragonling.addDam)*player.damageIncreaseRP).toFixed(2));    
  document.getElementById('dragonlingSpeed').innerHTML = "Speed: <br>" + ((Dragonling.speed - Dragonling.addSpeed) / 1000).toFixed(2);    
  document.getElementById('dragonlingCount').innerHTML = "#: " + nFormatter(Dragonling.count);
  document.getElementById('dragonlingDps').innerHTML = "DPS <br>" + nFormatter((((Dragonling.damage + Dragonling.addDam) / ((Dragonling.speed - Dragonling.addSpeed) / 1000)) * Dragonling.count).toFixed(2));
  
   //ThunderSerpent 
  document.getElementById('thunderSerpentDamage').innerHTML = "Damage: <br>" + nFormatter(((ThunderSerpent.damage + ThunderSerpent.addDam)*player.damageIncreaseRP).toFixed(2));    
  document.getElementById('thunderSerpentSpeed').innerHTML = "Speed: <br>" + ((ThunderSerpent.speed - ThunderSerpent.addSpeed) / 1000).toFixed(2);    
  document.getElementById('thunderSerpentCount').innerHTML = "#: " + nFormatter(ThunderSerpent.count);
  document.getElementById('thunderSerpentDps').innerHTML = "DPS <br>" + nFormatter((((ThunderSerpent.damage + ThunderSerpent.addDam) / ((ThunderSerpent.speed - ThunderSerpent.addSpeed) / 1000)) * ThunderSerpent.count).toFixed(2));

  //Overall Damage
  document.getElementById('overallDpsMeter').innerHTML = "DPS: <br>" + nFormatter((player.damageIncreaseRP *((((Skeleton.damage + Skeleton.addDam) / ((Skeleton.speed - Skeleton.addSpeed) / 1000)) * Skeleton.count) + (((FrostGiant.damage + FrostGiant.addDam) / ((FrostGiant.speed - FrostGiant.addSpeed) / 1000)) * FrostGiant.count) + (((Dragonling.damage + Dragonling.addDam) / ((Dragonling.speed - Dragonling.addSpeed) / 1000)) * Dragonling.count) + (((ThunderSerpent.damage + ThunderSerpent.addDam) / ((ThunderSerpent.speed - ThunderSerpent.addSpeed) / 1000)) * ThunderSerpent.count))).toFixed(2));      

  document.getElementById('monsterGold').innerHTML = "Bounty<br> " + nFormatter((((enemy.monsterGold)) * player.goldBonusCount).toFixed(2))  + " Gold";
  document.getElementById('monsterExp').innerHTML = "Worth<br> " + nFormatter(((enemy.exp) * player.expBonusCount).toFixed(2)) + " XP";
  document.getElementById('leftToLevel').innerHTML = "Next Level<br>" + (enemy.toNextLevel - 1) + " / " + enemy.toNextLevelMax;
  document.getElementById('monsterLevel').innerHTML = "Level: <br>" + nFormatter(enemy.level);
  document.getElementById('totalRPCount').innerHTML = "Spendable RP: " + nFormatter(player.reincarPoints);
  document.getElementById('totalOverallRPCount').innerHTML = "Overall RP: " + nFormatter(player.totalOveralRP);
}

  
let setIntPlayerStats = window.setInterval(showStats, 100);

/*
* -------------------------------
* jQuery 
* -------------------------------
*/

//Pet Tabs - Add/Remove appropriate Skill tabs

//TODO - alternative (more efficient?)

//Toggle between skeleton skill/pet tabs
$("#toggleSkeletonSkillsFront").click(function() {
  $("#skeletonStats").addClass("hidden");
  $("#skeletonSkills").removeClass("hidden");
    $("#toggleSkeletonSkillsFront").addClass("hidden");
    $("#toggleSkeletonSkillsBack").removeClass("hidden");
});

$("#toggleSkeletonSkillsBack").click(function() {
  $("#skeletonSkills").addClass("hidden");
  $("#skeletonStats").removeClass("hidden");
    $("#toggleSkeletonSkillsBack").addClass("hidden");
    $("#toggleSkeletonSkillsFront").removeClass("hidden");
});

//Toggle between frost giant skill/pet tabs
$("#toggleFrostGiantSkillsFront").click(function() {
  $("#frostGiantStats").addClass("hidden");
  $("#frostGiantSkills").removeClass("hidden");
    $("#toggleFrostGiantSkillsFront").addClass("hidden");
    $("#toggleFrostGiantSkillsBack").removeClass("hidden");
});

$("#toggleFrostGiantSkillsBack").click(function() {
  $("#frostGiantSkills").addClass("hidden");
  $("#frostGiantStats").removeClass("hidden");
    $("#toggleFrostGiantSkillsBack").addClass("hidden");
    $("#toggleFrostGiantSkillsFront").removeClass("hidden");
});


//Toggle between dragonling skill/pet tabs
$("#toggleDragonlingSkillsFront").click(function() {
$("#dragonlingStats").addClass("hidden");
  $("#dragonlingSkills").removeClass("hidden");
    $("#toggleDragonlingSkillsFront").addClass("hidden");
    $("#toggleDragonlingSkillsBack").removeClass("hidden");
});

$("#toggleDragonlingSkillsBack").click(function() {
 $("#dragonlingSkills").addClass("hidden");
  $("#dragonlingStats").removeClass("hidden");
    $("#toggleDragonlingSkillsBack").addClass("hidden");
    $("#toggleDragonlingSkillsFront").removeClass("hidden");
});

//Toggle between thunderSerpent skill/pet tabs
$("#toggleThunderSerpentSkillsFront").click(function() {
$("#thunderSerpentStats").addClass("hidden");
  $("#thunderSerpentSkills").removeClass("hidden");
    $("#toggleThunderSerpentSkillsFront").addClass("hidden");
    $("#toggleThunderSerpentSkillsBack").removeClass("hidden");
});

$("#toggleThunderSerpentSkillsBack").click(function() {
 $("#thunderSerpentSkills").addClass("hidden");
  $("#thunderSerpentStats").removeClass("hidden");
    $("#toggleThunderSerpentSkillsBack").addClass("hidden");
    $("#toggleThunderSerpentSkillsFront").removeClass("hidden");
});

//Notification Area for Skill

//Skeleton
$("#skeletonSkillOneHover").hover(function() {
  $("#notificationOne").html(
    "<p class='notifyTitleSk'>Bone Spikes</p><p class='notifyDescription'>Attach spikes of bone to your Skeleton's weapons<br><br>Damage: x3.5<br><br>Attack Speed: +10%</p>"
  ), $('#notificationArea').css('background-image','url(skills/needles-sky-1.png)');
    }, function(){
      //Works as a mouseover to clear the current notification area
        $("#notificationOne").html(''), $('#notificationArea').css('background-image','');
      });

$("#skeletonSkillTwoHover").hover(function() {
  $("#notificationOne").html(
    "<p class='notifyTitleSk'>Bonewhirl</p><p class='notifyDescription'>A fast attack meant to swarm enemies<br><br>Damage: x4.5<br><br>Attack Speed: +15%</p>"
  ), $('#notificationArea').css('background-image','url(skills/air-burst-sky-2.png)');
    }, function(){
      //Works as a mouseover to clear the current notification area
        $("#notificationOne").html(''), $('#notificationArea').css('background-image','');
      });

$("#skeletonSkillThreeHover").hover(function() {
  $("#notificationOne").html(
    "<p class='notifyTitleSk'>Stardust</p><p class='notifyDescription'>Invigorating meteor rain; also hurts the enemy<br><br>Damage: x7<br><br>Attack Speed: +15%</p>"
  ), $('#notificationArea').css('background-image','url(skills/fire-arrows-sky-2.png)');
    }, function(){
      //Works as a mouseover to clear the current notification area
        $("#notificationOne").html(''), $('#notificationArea').css('background-image','');
      });

$("#skeletonSkillFourHover").hover(function() {
  $("#notificationOne").html(
    "<p class='notifyTitleSk'>The Fog</p><p class='notifyDescription'>A mist that increases vitality and awareness<br><br>Damage: x8<br><br>Attack Speed: +15%</p>"
  ), $('#notificationArea').css('background-image','url(skills/fog-sky-2.png)');
    }, function(){
      //Works as a mouseover to clear the current notification area
        $("#notificationOne").html(''), $('#notificationArea').css('background-image','');
      });

$("#skeletonSkillFiveHover").hover(function() {
  $("#notificationOne").html(
    "<p class='notifyTitleSk'>Multi-strike</p><p class='notifyDescription'>Attacks in quick succession, confusing the enemy<br><br>Damage: x8.5<br><br>Attack Speed: +25%</p>"
  ), $('#notificationArea').css('background-image','url(skills/shielding-spirit-1.png)');
    }, function(){
      //Works as a mouseover to clear the current notification area
        $("#notificationOne").html(''), $('#notificationArea').css('background-image','');
      });

$("#skeletonSkillSixHover").hover(function() {
  $("#notificationOne").html(
    "<p class='notifyTitleSk'a>Towering Strike</p><p class='notifyDescription'>A bone-rattling strike, pun intended <br><br>Damage: x9<br><br>Attack Speed: +30%</p>"
  ), $('#notificationArea').css('background-image','url(skills/slice-sky-3.png)');
    }, function(){
      //Works as a mouseover to clear the current notification area
        $("#notificationOne").html(''), $('#notificationArea').css('background-image','');
      });



/***************************************************************/

//Frost Giant
$("#frostGiantSkillOneHover").hover(function() {
  $("#notificationOne").html(
    "<p class='notifyTitleFg'>Frost Breath</p><p class='notifyDescription'>A frosty breath that slows enemies movement, making them easier to hit<br><br>Damage: x3<br><br>Attack Speed: +25%</p>"
  ), $('#notificationArea').css('background-image','url(skills/fog-blue-3.png)');
    }, function(){
      //Works as a mouseover to clear the current notification area
        $("#notificationOne").html(''), $('#notificationArea').css('background-image','');
      }); 

$("#frostGiantSkillTwoHover").hover(function() {
  $("#notificationOne").html(
    "<p class='notifyTitleFg'>Small Frost Comet</p><p class='notifyDescription'>A small but vicious hunk of ice is called down upon the enemy<br><br>Damage: x4<br><br>Attack Speed: +25%</p>"
  ), $('#notificationArea').css('background-image','url(skills/light-blue-2.png)');
    }, function(){
      //Works as a mouseover to clear the current notification area
        $("#notificationOne").html(''), $('#notificationArea').css('background-image','');
      });

$("#frostGiantSkillThreeHover").hover(function() {
  $("#notificationOne").html(
    "<p class='notifyTitleFg'>Large Frost Meteor</p><p class='notifyDescription'>Offers no mercy; a slow, massive ice comet plummets towards the enemy<br><br>Damage: x5<br><br>Attack Speed: +5%</p>"
  ), $('#notificationArea').css('background-image','url(skills/light-blue-3.png)');
    }, function(){
      //Works as a mouseover to clear the current notification area
        $("#notificationOne").html(''), $('#notificationArea').css('background-image','');
      });

$("#frostGiantSkillFourHover").hover(function() {
  $("#notificationOne").html(
    "<p class='notifyTitleFg'>Burst of Speed</p><p class='notifyDescription'>They say Frost Giant's are slow. Pretty sure they are right, at least most of the time.<br><br>Damage: 5x<br><br>Attack Speed: +65%</p>"
  ), $('#notificationArea').css('background-image','url(skills/needles-blue-2.png)');
    }, function(){
      //Works as a mouseover to clear the current notification area
        $("#notificationOne").html(''), $('#notificationArea').css('background-image','');
      });

$("#frostGiantSkillFiveHover").hover(function() {
  $("#notificationOne").html(
    "<p class='notifyTitleFg'>Glacial Trap</p><p class='notifyDescription'>Throw at the enemy to slow their movement speed and increase their damage taken<br><br>Damage: x6<br><br>Attack Speed: +25%</p>"
  ), $('#notificationArea').css('background-image','url(skills/shielding-eerie-3.png)');
    }, function(){
      //Works as a mouseover to clear the current notification area
        $("#notificationOne").html(''), $('#notificationArea').css('background-image','');
      });

$("#frostGiantSkillSixHover").hover(function() {
  $("#notificationOne").html(
    "<p class='notifyTitleFg'a>Grasp of Ymir</p><p class='notifyDescription'>A frozen tendril pierces the enemy with frozen rocks and ice.<br><br>Damage: x7<br><br>Attack Speed: +30%</p>"
  ), $('#notificationArea').css('background-image','url(skills/wind-grasp-eerie-2.png)');
    }, function(){
      //Works as a mouseover to clear the current notification area
        $("#notificationOne").html(''), $('#notificationArea').css('background-image','');
      });


/***************************************************************/


//Dragonling
$("#dragonlingSkillOneHover").hover(function() {
  $("#notificationOne").html(
    "<p class='notifyTitleDr'>Meteor Fall</p><p class='notifyDescription'>Meteors rain from the sky, causing fire damage and emboldening the dragonling.<br><br>Damage: x2.5<br><br>Attack Speed: +15%</p>"
  ), $('#notificationArea').css('background-image','url(skills/fire-arrows-3.png)');
    }, function(){
      //Works as a mouseover to clear the current notification area
        $("#notificationOne").html(''), $('#notificationArea').css('background-image','');
      });

$("#dragonlingSkillTwoHover").hover(function() {
  $("#notificationOne").html(
    "<p class='notifyTitleDr'>Firespin</p><p class='notifyDescription'>The dragonling spins around quickly, shooting gusts of blazing-hot wind towards the enemy<br><br>Damage: x3.5<br><br>Attack Speed: +30%</p>"
  ), $('#notificationArea').css('background-image','url(skills/fog-orange-2.png)');
    }, function(){
      //Works as a mouseover to clear the current notification area
        $("#notificationOne").html(''), $('#notificationArea').css('background-image','');
      });

$("#dragonlingSkillThreeHover").hover(function() {
  $("#notificationOne").html(
    "<p class='notifyTitleDr'>Solar Flare</p><p class='notifyDescription'>Solar flare that blinds the enemy and hastens the attacks of the dragonling<br><br>Damage: x5<br><br>Attack Speed: +30%</p>"
  ), $('#notificationArea').css('background-image','url(skills/light-air-fire-3.png)');
    }, function(){
      //Works as a mouseover to clear the current notification area
        $("#notificationOne").html(''), $('#notificationArea').css('background-image','');
      });

$("#dragonlingSkillFourHover").hover(function() {
  $("#notificationOne").html(
    "<p class='notifyTitleDr'>Snaplock</p><p class='notifyDescription'>A fast, clean strike to the enemies weak point<br><br>Damage: x6<br><br>Attack Speed: +30%</p>"
  ), $('#notificationArea').css('background-image','url(skills/rip-acid-1.png)');
    }, function(){
      //Works as a mouseover to clear the current notification area
        $("#notificationOne").html(''), $('#notificationArea').css('background-image','');
      });

$("#dragonlingSkillFiveHover").hover(function() {
  $("#notificationOne").html(
    "<p class='notifyTitleDr'>Lava Rift</p><p class='notifyDescription'>A dark, fiery chasm appears beneath the enemy<br><br>Damage: x7<br><br>Attack Speed: +35%</p>"
  ), $('#notificationArea').css('background-image','url(skills/rip-magenta-3.png)');
    }, function(){
      //Works as a mouseover to clear the current notification area
        $("#notificationOne").html(''), $('#notificationArea').css('background-image','');
      });

$("#dragonlingSkillSixHover").hover(function() {
  $("#notificationOne").html(
    "<p class='notifyTitleDr'a>UNLEASH</p><p class='notifyDescription'>The shackles are cut, releasing the full power of the dragonling<br><br>Damage: x8<br><br>Attack Speed: +45%</p>"
  ), $('#notificationArea').css('background-image','url(skills/slice-orange-3.png)');
    }, function(){
      //Works as a mouseover to clear the current notification area
        $("#notificationOne").html(''), $('#notificationArea').css('background-image','');
      });



/***************************************************************/


//Thunder Serpent
$("#thunderSerpentSkillOneHover").hover(function() {
  $("#notificationOne").html(
    "<p class='notifyTitleTs'>Lightning Swirl</p><p class='notifyDescription'>A static burst of energy. Bolsters courage in the serpent, increasing damage and attack speed<br><br>Damage: x3<br><br>Attack Speed: +25%</p>"
  ), $('#notificationArea').css('background-image','url(skills/air-burst-air-2.png)');
    }, function(){
      //Works as a mouseover to clear the current notification area
        $("#notificationOne").html(''), $('#notificationArea').css('background-image','');
      });

$("#thunderSerpentSkillTwoHover").hover(function() {
  $("#notificationOne").html(
    "<p class='notifyTitleTs'>Charged Disc</p><p class='notifyDescription'>The serpent spins its tail and creates a disc-type object, then flings it at full-speed towards the enemy<br><br>Damage: x5<br><br>Attack Speed: +25%</p>"
  ), $('#notificationArea').css('background-image','url(skills/air-burst-air-3.png)');
    }, function(){
      //Works as a mouseover to clear the current notification area
        $("#notificationOne").html(''), $('#notificationArea').css('background-image','');
      });

$("#thunderSerpentSkillThreeHover").hover(function() {
  $("#notificationOne").html(
    "<p class='notifyTitleTs'>Lightning Ball</p><p class='notifyDescription'>Flings a ball of lightning at the enemy<br><br>Damage: x6<br><br>Attack Speed: +25%</p>"
  ), $('#notificationArea').css('background-image','url(skills/light-eerie-3.png)');
    }, function(){
      //Works as a mouseover to clear the current notification area
        $("#notificationOne").html(''), $('#notificationArea').css('background-image','');
      });

$("#thunderSerpentSkillFourHover").hover(function() {
  $("#notificationOne").html(
    "<p class='notifyTitleTs'>Star Freefall</p><p class='notifyDescription'>Rains down highly charged matter at the enemy from long distances<br><br>Damage: x6.5<br><br>Attack Speed: +25%</p>"
  ), $('#notificationArea').css('background-image','url(skills/light-sky-1.png)');
    }, function(){
      //Works as a mouseover to clear the current notification area
        $("#notificationOne").html(''), $('#notificationArea').css('background-image','');
      });

$("#thunderSerpentSkillFiveHover").hover(function() {
  $("#notificationOne").html(
    "<p class='notifyTitleTs'>Fissure</p><p class='notifyDescription'>Streams highly volatile, positively charged fluid at the enemy, binding them in the process<br><br>Damage: x7.5<br><br>Attack Speed: +25%</p>"
  ), $('#notificationArea').css('background-image','url(skills/link-spirit-3.png)');
    }, function(){
      //Works as a mouseover to clear the current notification area
        $("#notificationOne").html(''), $('#notificationArea').css('background-image','');
      });

$("#thunderSerpentSkillSixHover").hover(function() {
  $("#notificationOne").html(
   "<p class='notifyTitleTs'>Time Shards</p><p class='notifyDescription'>Shards that can literally slow down time, increasing damage to the enemy and showering them with lightning<br><br>Damage: x10<br></p>"
  ), $('#notificationArea').css('background-image','url(skills/needles-sky-3.png)');
    }, function(){
      //Works as a mouseover to clear the current notification area
        $("#notificationOne").html(''), $('#notificationArea').css('background-image','');
      });

/* Information on Pets on Hover */

$("#skeletonTab").hover(function() {
  $("#notificationOne").html(
    "<p class='notifyTitlePet'>SKELETON</p><p class='notifyDescription'>A skeleton who loves to attack, regardless of your living/dead status</p>"
  );
    }, function(){
      //Works as a mouseover to clear the current notification area
        $("#notificationOne").html('');
      });

$("#frostGiantTab").hover(function() {
  $("#notificationOne").html(
    "<p class='notifyTitlePet'>FROST GIANT</p><p class='notifyDescription'>In the depths of massive glaciers lies the ancient Frost Giants. They serve their master without question</p>"
  );
    }, function(){
      //Works as a mouseover to clear the current notification area
        $("#notificationOne").html('');
      });

$("#dragonlingTab").hover(function() {
  $("#notificationOne").html(
    "<p class='notifyTitlePet'>DRAGONLING</p><p class='notifyDescription'>A massive dragonling that commands fire. At the moment it is chained in servitude, but a master who trains them efficiently finds a way around</p>"
  );
    }, function(){
      //Works as a mouseover to clear the current notification area
        $("#notificationOne").html('');
      });

$("#thunderSerpentTab").hover(function() {
  $("#notificationOne").html(
    "<p class='notifyTitlePet'>THUNDER SERPENT</p><p class='notifyDescription'>Heard, but not seen, this fast-attacking behemoth lords from the skies above</p>"
  );
    }, function(){
      //Works as a mouseover to clear the current notification area
        $("#notificationOne").html('');
      });

/*
*
* Tutorial Section
*
*/

//This will use the checkbox on tmodal to determine whether or not to hide the modal
let checkForTutorial = function(){
  
  if(!$('#tmodal').prop('checked')) {
    $(".modal").css('display', 'none');
  }

  if($('#tmodal').prop('checked')) {
    $(".modal").css('display', 'inherit');
  }
}   

/*		
*
* Settings Section
*
*/

//Settings section is a copy of the tutorial with a different action
let checkForSettings = function(){
  
  if(!$('#tmodalSettings').prop('checked')) {
    $(".modalSettings").css('display', 'none');
  }
  
  if($('#tmodalSettings').prop('checked')) {
    $(".modalSettings").css('display', 'inherit');
  }
}


/*
*
* Talents Section
*
*/

//Talents section is a copy of the tutorial with a different action

let checkForTalents = function(){
  
  if(!$('#tmodalTalents').prop('checked')) {
    $(".modalTalents").css('display', 'none');
  }
  
  if($('#tmodalTalents').prop('checked')) {
    $(".modalTalents").css('display', 'inherit');
  }
}

/*
*
* Health Bars 
* TODO : Enemy Health Bars
*
*/  

let healthBarEnemy = {
  x: 120,
  y: 10,
  width: 150,
  height: 10
};
// Render Loop
function onTimerTick() {

  //Calculate enemy.currentEnemyHealth bar percentage
  const totalRemainingHealth = enemy.currentEnemyHealth / enemy.maxEnemyHealth;

    document.getElementById('healthBarEnemy').innerHTML = nFormatter((enemy.currentEnemyHealth).toFixed(1)) + "/" + nFormatter(((enemy.maxEnemyHealth)).toFixed(1)) + " HP";
    context.fillStyle = "aliceblue";

  if (enemy.currentEnemyHealth > 0){
    context.fillRect(healthBarEnemy.x, healthBarEnemy.y, healthBarEnemy.width, healthBarEnemy.height);
    context.fillStyle = "red";
    context.fillRect(healthBarEnemy.x, healthBarEnemy.y, healthBarEnemy.width * totalRemainingHealth, healthBarEnemy.height);
  }
}

// Loop
setInterval(onTimerTick, 100);
setInterval(levelUpPlayer, 100);

/*
*
*   Settings Menu
*
*/

let openSettingsMenu = function(){
  $("#settingsButton").click(function() {
    $("#closeModal").removeClass("hidden");
  });
}

/*
*  
*   Set Talent Tree Text
*
*/

let talentTreeInitialDescriptions = function(){
  $("#talentOneOne").html(
    "<p class='talentTitle'>Skeleton Dam+ <br><span>" + player.bonusRPTalentOne + " / " + player.bonusRPTalentOneMax + "</span><br><span>+ " + Skeleton.addDam + "<br> Cost: " + player.bonusRPTalentOneCost + "</span></p>"
  )
  
  $("#talentOneTwo").html(
    "<p class='talentTitle'>Skeleton Spd+ <br><span>" + player.bonusRPTalentTwo + " / " + player.bonusRPTalentTwoMax + "</span><br><span>- " + (Skeleton.addSpeed / 1000).toFixed(2) + " SPD" + "<br> Cost: " + player.bonusRPTalentTwoCost + "</span></p>"
  ); 
  
  $("#talentOneThree").html(
    "<p class='talentTitle'>Increase RP Gain: <br>" + player.bonusRPTalentThree + " / " + player.bonusRPTalentThreeMax + "<br><span>" + player.bonusRPCount + " x RP " + "<br> Cost: " + player.bonusRPTalentThreeCost + "</span></p>"
  );
  
  $("#talentTwoOne").html(
    "<p class='talentTitle'>FrostGiant Dam+ <br><span>" + player.bonusRPTalentFour + " / " + player.bonusRPTalentFourMax + "</span><br><span>+ " + FrostGiant.addDam + "<br> Cost: " + player.bonusRPTalentFourCost + "</span></p>"
  ); 
  
  $("#talentTwoTwo").html(
    "<p class='talentTitle'>FrostGiant Spd+ <br><span>" + player.bonusRPTalentFive + " / " + player.bonusRPTalentFiveMax + "</span><br><span>- " + (FrostGiant.addSpeed / 1000).toFixed(2) + " SPD" + "<br> Cost: " + player.bonusRPTalentFiveCost + "</span></p>"
  ); 
  
  $("#talentTwoThree").html(
    "<p class='talentTitle'>Bonus Gold % :<br>" + player.bonusRPTalentSix + " / " + player.bonusRPTalentSixMax + "<br><span>" + player.goldBonusCount.toFixed(2) + " x % Gold " + "<br> Cost: " + player.bonusRPTalentSixCost + "</span></p>"
  );
  
  $("#talentThreeOne").html(
    "<p class='talentTitle'>Dragonling Dam+ <br><span>" + player.bonusRPTalentSeven + " / " + player.bonusRPTalentSevenMax + "</span><br><span>+ " + Dragonling.addDam + "<br> Cost: " + player.bonusRPTalentSevenCost +"</span></p>"
  ); 
  
  $("#talentThreeTwo").html(
    "<p class='talentTitle'>Dragonling Spd+ <br><span>" + player.bonusRPTalentEight + " / " + player.bonusRPTalentEightMax + "</span><br><span>- " + (Dragonling.addSpeed / 1000).toFixed(2) + " SPD" + "<br> Cost: " + player.bonusRPTalentEightCost +"</span></p>"
  ); 
  
  $("#talentThreeThree").html(
    "<p class='talentTitle'>Increase Exp Gain: <br>" + player.bonusRPTalentNine + " / " + player.bonusRPTalentNineMax + "<br><span>" + player.expBonusCount.toFixed(2) + " x % EXP " + "<br> Cost: " + player.bonusRPTalentNineCost + "</span></p>"
  );
  
  $("#talentFourOne").html(
    "<p class='talentTitle'>ThunderSerpent Dam+ <br><span>" + player.bonusRPTalentTen + " / " + player.bonusRPTalentTenMax + "</span><br><span>+ " + ThunderSerpent.addDam + "<br> Cost: " + player.bonusRPTalentTenCost + "</span></p>"
  ); 
  
  $("#talentFourTwo").html(
    "<p class='talentTitle'>ThunderSerpent Spd+ <br><span>" + player.bonusRPTalentEleven + " / " + player.bonusRPTalentElevenMax + "</span><br><span>- " + (ThunderSerpent.addSpeed / 1000).toFixed(2) + " SPD" + "<br> Cost: " + player.bonusRPTalentElevenCost + "</span></p>"
  ); 
 
  $("#talentFourThree").html(
    "<p class='talentTitle'>Decrease Kills Needed : <br>" + player.bonusRPTalentTwelve + " / " + player.bonusRPTalentTwelveMax + "<br><span>" + enemy.toNextLevelMax + " Kills needed." + "<br> Cost: " + player.bonusRPTalentTwelveCost +"</span></p>"
  );
  
}

talentTreeInitialDescriptions();

/*
*
*   Talent Tree Section - Exciting! -update : kinda tedious actually, better way to do this?
*
*/

let talentOneOne = function(){
  for(let x = 0; x < player.costMultiplier2; x++){
 
    //Check Talent for Max before adding to modifier
    if(player.bonusRPTalentOne < player.bonusRPTalentOneMax && player.bonusRPTalentOneCost <= player.reincarPoints){
      player.bonusRPTalentOne++;

    //Actual Talent Effect and subtraction of reincarnation points
      player.reincarPoints -= player.bonusRPTalentOneCost;
      Skeleton.addDam += 1;
    }

    //Section to visually show the updates
    $("#talentOneOne").html(
      "<p class='talentTitle'>Skeleton Dam+ <br><span>" + player.bonusRPTalentOne + " / " + player.bonusRPTalentOneMax + "</span><br><span>+ " + Skeleton.addDam + "<br> Cost: " + player.bonusRPTalentOneCost + "</span></p>"
    )
  }
}

let talentOneTwo = function(){
  for(let x = 0; x < player.costMultiplier2; x++){  
    //Check Talent for Max before adding to modifier
    if(player.bonusRPTalentTwo < player.bonusRPTalentTwoMax && player.bonusRPTalentTwoCost <= player.reincarPoints){
      player.bonusRPTalentTwo++;

    //Actual Talent Effect  
      player.reincarPoints -= player.bonusRPTalentTwoCost;
      Skeleton.addSpeed += 10;
    }

    //Section to visually show the updates
    $("#talentOneTwo").html(
      "<p class='talentTitle'>Skeleton Spd+ <br><span>" + player.bonusRPTalentTwo + " / " + player.bonusRPTalentTwoMax + "</span><br><span>- " + (Skeleton.addSpeed / 1000).toFixed(2) + " SPD" + "<br> Cost: " + player.bonusRPTalentTwoCost + "</span></p>"
    ); 
  }
}
  
let talentOneThree = function(){
  for(let x = 0; x < player.costMultiplier2; x++){  
    //Check Talent for Max before adding to modifier
    if(player.bonusRPTalentThree < player.bonusRPTalentThreeMax && player.bonusRPTalentThreeCost <= player.reincarPoints) {

      player.reincarPoints -= player.bonusRPTalentThreeCost;
      player.bonusRPTalentThree++;

      //Smooth leveling process a bit, is too fast when RP multiplies rapidly
      if(player.bonusRPTalentThree === 1){
        player.bonusRPTalentThreeCost = 100;
      }    
      if(player.bonusRPTalentThree === 2){
        player.bonusRPTalentThreeCost = 1000;
      }


      //Actual Talent Effect  
      player.bonusRPCount++;  
    }

  //Section to visually show the updates
  $("#talentOneThree").html(
    "<p class='talentTitle'>Increase RP Gain: <br>" + player.bonusRPTalentThree + " / " + player.bonusRPTalentThreeMax + "<br><span>" + player.bonusRPCount + " x RP " +  "<br> Cost: " + player.bonusRPTalentThreeCost + "</span></p>"
  );
  }
}

let talentOneFour = function(){
  for(let x = 0; x < player.costMultiplier2; x++){
      //Check Talent for Max before adding to modifier
    if(player.bonusRPTalentFour < player.bonusRPTalentFourMax && player.bonusRPTalentFourCost <= player.reincarPoints){
      player.bonusRPTalentFour++;

    //Actual Talent Effect 
      player.reincarPoints -= player.bonusRPTalentFourCost;
      FrostGiant.addDam += 1;
    }

    //Section to visually show the updates
    $("#talentTwoOne").html(
      "<p class='talentTitle'>FrostGiant Dam+ <br><span>" + player.bonusRPTalentFour + " / " + player.bonusRPTalentFourMax + "</span><br><span>+ " + FrostGiant.addDam + "<br> Cost: " + player.bonusRPTalentFourCost + "</span></p>"
    ); 
  }
}

let talentOneFive = function(){
  for(let x = 0; x < player.costMultiplier2; x++){  
    //Check Talent for Max before adding to modifier
    if(player.bonusRPTalentFive < player.bonusRPTalentFiveMax && player.bonusRPTalentFiveCost <= player.reincarPoints){
      player.bonusRPTalentFive++;

    //Actual Talent Effect  
      player.reincarPoints -= player.bonusRPTalentFiveCost;
      FrostGiant.addSpeed += 10;
    }

    //Section to visually show the updates
    $("#talentTwoTwo").html(
      "<p class='talentTitle'>FrostGiant Spd+ <br><span>" + player.bonusRPTalentFive + " / " + player.bonusRPTalentFiveMax + "</span><br><span>- " + (FrostGiant.addSpeed / 1000).toFixed(2) + " SPD" + "<br> Cost: " + player.bonusRPTalentFiveCost +"</span></p>"
    );
  }
} 

let talentOneSix = function(){
   for(let x = 0; x < player.costMultiplier2; x++){ 
      //Check Talent for Max before adding to modifier
      if(player.bonusRPTalentSix < player.bonusRPTalentSixMax && player.bonusRPTalentSixCost <= player.reincarPoints) {

        player.reincarPoints -= player.bonusRPTalentSixCost;
        player.bonusRPTalentSix++;


        //Increase the cost to smooth leveling process
        if(player.bonusRPTalentSix === 5){
          player.bonusRPTalentSixCost++;
        }
        if(player.bonusRPTalentSix === 10){
          player.bonusRPTalentSixCost++;
        }
        if(player.bonusRPTalentSix === 15){
          player.bonusRPTalentSixCost++;
        }
        if(player.bonusRPTalentSix === 20){
          player.bonusRPTalentSixCost++;
        }



      //Actual Talent Effect  
      player.goldBonusCount += .02;  
      }

      //Section to visually show the updates
      $("#talentTwoThree").html(
        "<p class='talentTitle'>Bonus Gold % :<br>" + player.bonusRPTalentSix + " / " + player.bonusRPTalentSixMax + "<br><span>" + player.goldBonusCount.toFixed(2) + " % Gold " + "<br> Cost: " + player.bonusRPTalentSixCost + "</span></p>"
      );
   }
}

let talentOneSeven = function(){
  for(let x = 0; x < player.costMultiplier2; x++){  
    //Check Talent for Max before adding to modifier
    if(player.bonusRPTalentSeven < player.bonusRPTalentSevenMax && player.bonusRPTalentSevenCost <= player.reincarPoints){
      player.bonusRPTalentSeven++;

    //Actual Talent Effect 
      player.reincarPoints -= player.bonusRPTalentSevenCost;
      Dragonling.addDam += 1;
    }

    //Section to visually show the updates
    $("#talentThreeOne").html(
      "<p class='talentTitle'>Dragonling Dam+ <br><span>" + player.bonusRPTalentSeven + " / " + player.bonusRPTalentSevenMax + "</span><br><span>+ " + Dragonling.addDam + "<br> Cost: " + player.bonusRPTalentSevenCost +"</span></p>"
    ); 
  }
}

let talentOneEight = function(){
  for(let x = 0; x < player.costMultiplier2; x++){ 
    //Check Talent for Max before adding to modifier
    if(player.bonusRPTalentEight < player.bonusRPTalentEightMax && player.bonusRPTalentEightCost <= player.reincarPoints){
      player.bonusRPTalentEight++;

    //Actual Talent Effect 
      player.reincarPoints -= player.bonusRPTalentEightCost;
      Dragonling.addSpeed += 10;
    }

    //Section to visually show the updates
    $("#talentThreeTwo").html(
      "<p class='talentTitle'>Dragonling Spd+ <br><span>" + player.bonusRPTalentEight + " / " + player.bonusRPTalentEightMax + "</span><br><span>- " + (Dragonling.addSpeed / 1000).toFixed(2) + " SPD" + "<br> Cost: " + player.bonusRPTalentEightCost +"</span></p>"
    ); 
  }
}

let talentOneNine = function(){
  for(let x = 0; x < player.costMultiplier2; x++){ 
    //Check Talent for Max before adding to modifier
    if(player.bonusRPTalentNine < player.bonusRPTalentNineMax && player.bonusRPTalentNineCost <= player.reincarPoints) {

      player.reincarPoints -= player.bonusRPTalentNineCost;
      player.bonusRPTalentNine++;


      //Increase the cost to smooth leveling process    
      if(player.bonusRPTalentNine === 5){
        player.bonusRPTalentNineCost++;
      }
      if(player.bonusRPTalentNine === 10){
        player.bonusRPTalentNineCost++;
      }
      if(player.bonusRPTalentNine === 15){
        player.bonusRPTalentNineCost++;
      }
      if(player.bonusRPTalentNine === 20){
        player.bonusRPTalentNineCost++;
      }

    //Actual Talent Effect
    player.expBonusCount += .02;
    }

    //Section to visually show the updates
    $("#talentThreeThree").html(
      "<p class='talentTitle'>Increase Exp Gain: <br>" + player.bonusRPTalentNine + " / " + player.bonusRPTalentNineMax + "<br><span>" + player.expBonusCount.toFixed(2) + " x % EXP " + "<br> Cost: " + player.bonusRPTalentNineCost + "</span></p>"
    );
  }
}

let talentOneTen = function(){
  for(let x = 0; x < player.costMultiplier2; x++){ 
    //Check Talent for Max before adding to modifier
    if(player.bonusRPTalentTen < player.bonusRPTalentTenMax && player.bonusRPTalentTenCost <= player.reincarPoints){
      player.bonusRPTalentTen++;

    //Actual Talent Effect  
      player.reincarPoints -= player.bonusRPTalentTenCost;
      ThunderSerpent.addDam += 1;
    }

    //Section to visually show the updates
    $("#talentFourOne").html(
      "<p class='talentTitle'>ThunderSerpent Dam+ <br><span>" + player.bonusRPTalentTen + " / " + player.bonusRPTalentTenMax + "</span><br><span>+ " + ThunderSerpent.addDam + "<br> Cost: " + player.bonusRPTalentTenCost +"</span></p>"
    ); 
  }
}

let talentOneEleven = function(){
  for(let x = 0; x < player.costMultiplier2; x++){ 
    //Check Talent for Max before adding to modifier
    if(player.bonusRPTalentEleven < player.bonusRPTalentElevenMax && player.bonusRPTalentElevenCost <= player.reincarPoints){
      player.bonusRPTalentEleven++;

    //Actual Talent Effect  
      player.reincarPoints -= player.bonusRPTalentElevenCost;
      ThunderSerpent.addSpeed += 10;
    }

    //Section to visually show the updates
    $("#talentFourTwo").html(
      "<p class='talentTitle'>ThunderSerpent Spd+ <br><span>" + player.bonusRPTalentEleven + " / " + player.bonusRPTalentElevenMax + "</span><br><span>- " + (ThunderSerpent.addSpeed / 1000).toFixed(2) + " SPD" + "<br> Cost: " + player.bonusRPTalentElevenCost +"</span></p>"
    ); 
  }
}

let talentOneTwelve = function(){
  for(let x = 0; x < player.costMultiplier2; x++){  
    //Check Talent for Max before adding to modifier
    if(player.bonusRPTalentTwelve < player.bonusRPTalentTwelveMax && player.bonusRPTalentTwelveCost <= player.reincarPoints) {

      player.reincarPoints -= player.bonusRPTalentTwelveCost;
      player.bonusRPTalentTwelveCost *= 3;
      player.bonusRPTalentTwelve++;


    //Actual Talent Effect  
    enemy.toNextLevelMax--;  
    }

    //Section to visually show the updates
    $("#talentFourThree").html(
      "<p class='talentTitle'>Decrease Kills Needed : <br>" + player.bonusRPTalentTwelve + " / " + player.bonusRPTalentTwelveMax + "<br><span>" + enemy.toNextLevelMax + " Kills needed." + "<br> Cost: " + player.bonusRPTalentTwelveCost +"</span></p>"
    );
  }
}


/*
*
* Saving and Loading (Local)
* 
*/ 

let saveGame = function(){
  
  if (typeof(Storage) !== "undefined") {
    //NOTE: Learning more about Node.js so I can work on a cloud save system

    //Player - Core
    localStorage.playerTotalPets = player.totalPets;
    localStorage.playerGold = player.gold;
    localStorage.playerLevel = player.level;
    localStorage.playerMaxXp = player.maxXp;
    localStorage.playerExp = player.exp;
    localStorage.playerNextRP = player.nextReincarPoints;
    localStorage.playerTotalOverallRP = player.totalOveralRP;
    localStorage.playerRP = player.reincarPoints;
    localStorage.damageRP = player.damageIncreaseRP;
    localStorage.goldBonusCount = player.goldBonusCount;
    localStorage.expBonusCount = player.expBonusCount;

    //Player - Talents
    localStorage.bonusRPTalentOne = player.bonusRPTalentOne;
    localStorage.bonusRPTalentOneCost = player.bonusRPTalentOneCost;
    localStorage.bonusRPTalentTwo = player.bonusRPTalentTwo;
    localStorage.bonusRPTalentTwoCost = player.bonusRPTalentTwoCost;
    localStorage.bonusRPTalentThree = player.bonusRPTalentThree;
    localStorage.bonusRPTalentThreeCost = player.bonusRPTalentThreeCost;
    localStorage.bonusRPTalentFour = player.bonusRPTalentFour;
    localStorage.bonusRPTalentFourCost = player.bonusRPTalentFourCost;
    localStorage.bonusRPTalentFive = player.bonusRPTalentFive;
    localStorage.bonusRPTalentFiveCost = player.bonusRPTalentFiveCost;
    localStorage.bonusRPTalentSix = player.bonusRPTalentSix;
    localStorage.bonusRPTalentSixCost = player.bonusRPTalentSixCost;
    localStorage.bonusRPTalentSeven = player.bonusRPTalentSeven;
    localStorage.bonusRPTalentSevenCost = player.bonusRPTalentSevenCost;
    localStorage.bonusRPTalentEight = player.bonusRPTalentEight;
    localStorage.bonusRPTalentEightCost = player.bonusRPTalentEightCost;
    localStorage.bonusRPTalentNine = player.bonusRPTalentNine;
    localStorage.bonusRPTalentNineCost = player.bonusRPTalentNineCost;
    localStorage.bonusRPTalentTen = player.bonusRPTalentTen;
    localStorage.bonusRPTalentTenCost = player.bonusRPTalentTenCost;
    localStorage.bonusRPTalentEleven = player.bonusRPTalentEleven;
    localStorage.bonusRPTalentElevenCost = player.bonusRPTalentElevenCost;
    localStorage.bonusRPTalentTwelve = player.bonusRPTalentTwelve;
    localStorage.bonusRPTalentTwelveCost = player.bonusRPTalentTwelveCost;
    localStorage.bonusRPTalentThirteen = player.bonusRPTalentThirteen;
    localStorage.bonusRPTalentThirteenCost = player.bonusRPTalentThirteenCost;
    localStorage.bonusRPTalentFourteen = player.bonusRPTalentFourteen;
    localStorage.bonusRPTalentFourteenCost = player.bonusRPTalentFourteenCost;
    localStorage.bonusRPTalentFifteen = player.bonusRPTalentFifteen;
    localStorage.bonusRPTalentFifteenCost = player.bonusRPTalentFifteenCost;

    //Enemy
    localStorage.currentEnemyHealth = enemy.currentEnemyHealth;
    localStorage.maxEnemyHealth = enemy.maxEnemyHealth;
    localStorage.monsterExp = enemy.exp;
    localStorage.enemyToNextLevel = enemy.toNextLevel;
    localStorage.enemyToNextLevelMax = enemy.toNextLevelMax;
    localStorage.enemyLevel = enemy.level;
    localStorage.enemyGold = enemy.monsterGold;

    //Skeleton
    localStorage.skeletonCount = Skeleton.count;
    localStorage.skeletonDamage = Skeleton.damage;
    localStorage.skeletonCost = Skeleton.cost;
    localStorage.skeletonLevel = Skeleton.level;
    localStorage.skeletonSkillOne = Skeleton.skill1;
    localStorage.skeletonSkillTwo = Skeleton.skill2;
    localStorage.skeletonSkillThree = Skeleton.skill3;
    localStorage.skeletonSkillFour = Skeleton.skill4;
    localStorage.skeletonSkillFive = Skeleton.skill5;
    localStorage.skeletonSkillSix = Skeleton.skill6;

    //Frost Giant
    localStorage.frostGiantCount = FrostGiant.count;
    localStorage.frostGiantDamage = FrostGiant.damage;
    localStorage.frostGiantCost = FrostGiant.cost;
    localStorage.frostGiantLevel = FrostGiant.level;
    localStorage.frostGiantSkillOne = FrostGiant.skill1;
    localStorage.frostGiantSkillTwo = FrostGiant.skill2;
    localStorage.frostGiantSkillThree = FrostGiant.skill3;
    localStorage.frostGiantSkillFour = FrostGiant.skill4;
    localStorage.frostGiantSkillFive = FrostGiant.skill5;
    localStorage.frostGiantSkillSix = FrostGiant.skill6;

    //Dragonling
    localStorage.dragonlingCount = Dragonling.count;
    localStorage.dragonlingDamage = Dragonling.damage;
    localStorage.dragonlingCost = Dragonling.cost;
    localStorage.dragonlingLevel = Dragonling.level;
    localStorage.dragonlingSkillOne = Dragonling.skill1;
    localStorage.dragonlingSkillTwo = Dragonling.skill2;
    localStorage.dragonlingSkillThree = Dragonling.skill3;
    localStorage.dragonlingSkillFour = Dragonling.skill4;
    localStorage.dragonlingSkillFive = Dragonling.skill5;
    localStorage.dragonlingSkillSix = Dragonling.skill6;

    //ThunderSerpent
    localStorage.thunderSerpentCount = ThunderSerpent.count;
    localStorage.thunderSerpentDamage = ThunderSerpent.damage;
    localStorage.thunderSerpentCost = ThunderSerpent.cost;
    localStorage.thunderSerpentLevel = ThunderSerpent.level;
    localStorage.thunderSerpentSkillOne = ThunderSerpent.skill1;
    localStorage.thunderSerpentSkillTwo = ThunderSerpent.skill2;
    localStorage.thunderSerpentSkillThree = ThunderSerpent.skill3;
    localStorage.thunderSerpentSkillFour = ThunderSerpent.skill4;
    localStorage.thunderSerpentSkillFive = ThunderSerpent.skill5;
    localStorage.thunderSerpentSkillSix = ThunderSerpent.skill6;
  }

    else{
    // If Storage === undefined then we know it isn't possible
    // on this browser (via this technique)
    console.log("No local storage.");
  }
}


//This function will do the exact same thing as save, but automatically
//It will check to see if autoSaveSelection is on first so we do not overwrite
//the save game on accident!
let autoSaveGame = function(){
  
  if (player.autoSaveSelection === 1){
    
    if (typeof(Storage) !== "undefined") {
      //NOTE: Learning more about Node.js so I can work on a cloud save system

      //Player - Core
      localStorage.playerTotalPets = player.totalPets;
      localStorage.playerGold = player.gold;
      localStorage.playerLevel = player.level;
      localStorage.playerMaxXp = player.maxXp;
      localStorage.playerExp = player.exp;
      localStorage.playerNextRP = player.nextReincarPoints;
      localStorage.playerTotalOverallRP = player.totalOveralRP;
      localStorage.playerRP = player.reincarPoints;
      localStorage.damageRP = player.damageIncreaseRP;
      localStorage.goldBonusCount = player.goldBonusCount;
      localStorage.expBonusCount = player.expBonusCount;

      //Player - Talents
      localStorage.bonusRPTalentOne = player.bonusRPTalentOne;
      localStorage.bonusRPTalentOneCost = player.bonusRPTalentOneCost;
      localStorage.bonusRPTalentTwo = player.bonusRPTalentTwo;
      localStorage.bonusRPTalentTwoCost = player.bonusRPTalentTwoCost;
      localStorage.bonusRPTalentThree = player.bonusRPTalentThree;
      localStorage.bonusRPTalentThreeCost = player.bonusRPTalentThreeCost;
      localStorage.bonusRPTalentFour = player.bonusRPTalentFour;
      localStorage.bonusRPTalentFourCost = player.bonusRPTalentFourCost;
      localStorage.bonusRPTalentFive = player.bonusRPTalentFive;
      localStorage.bonusRPTalentFiveCost = player.bonusRPTalentFiveCost;
      localStorage.bonusRPTalentSix = player.bonusRPTalentSix;
      localStorage.bonusRPTalentSixCost = player.bonusRPTalentSixCost;
      localStorage.bonusRPTalentSeven = player.bonusRPTalentSeven;
      localStorage.bonusRPTalentSevenCost = player.bonusRPTalentSevenCost;
      localStorage.bonusRPTalentEight = player.bonusRPTalentEight;
      localStorage.bonusRPTalentEightCost = player.bonusRPTalentEightCost;
      localStorage.bonusRPTalentNine = player.bonusRPTalentNine;
      localStorage.bonusRPTalentNineCost = player.bonusRPTalentNineCost;
      localStorage.bonusRPTalentTen = player.bonusRPTalentTen;
      localStorage.bonusRPTalentTenCost = player.bonusRPTalentTenCost;
      localStorage.bonusRPTalentEleven = player.bonusRPTalentEleven;
      localStorage.bonusRPTalentElevenCost = player.bonusRPTalentElevenCost;
      localStorage.bonusRPTalentTwelve = player.bonusRPTalentTwelve;
      localStorage.bonusRPTalentTwelveCost = player.bonusRPTalentTwelveCost;
      localStorage.bonusRPTalentThirteen = player.bonusRPTalentThirteen;
      localStorage.bonusRPTalentThirteenCost = player.bonusRPTalentThirteenCost;
      localStorage.bonusRPTalentFourteen = player.bonusRPTalentFourteen;
      localStorage.bonusRPTalentFourteenCost = player.bonusRPTalentFourteenCost;
      localStorage.bonusRPTalentFifteen = player.bonusRPTalentFifteen;
      localStorage.bonusRPTalentFifteenCost = player.bonusRPTalentFifteenCost;

      //Enemy
      localStorage.currentEnemyHealth = enemy.currentEnemyHealth;
      localStorage.maxEnemyHealth = enemy.maxEnemyHealth;
      localStorage.monsterExp = enemy.exp;
      localStorage.enemyToNextLevel = enemy.toNextLevel;
      localStorage.enemyToNextLevelMax = enemy.toNextLevelMax;
      localStorage.enemyLevel = enemy.level;
      localStorage.enemyGold = enemy.monsterGold;

      //Skeleton
      localStorage.skeletonCount = Skeleton.count;
      localStorage.skeletonDamage = Skeleton.damage;
      localStorage.skeletonCost = Skeleton.cost;
      localStorage.skeletonLevel = Skeleton.level;
      localStorage.skeletonSkillOne = Skeleton.skill1;
      localStorage.skeletonSkillTwo = Skeleton.skill2;
      localStorage.skeletonSkillThree = Skeleton.skill3;
      localStorage.skeletonSkillFour = Skeleton.skill4;
      localStorage.skeletonSkillFive = Skeleton.skill5;
      localStorage.skeletonSkillSix = Skeleton.skill6;

      //Frost Giant
      localStorage.frostGiantCount = FrostGiant.count;
      localStorage.frostGiantDamage = FrostGiant.damage;
      localStorage.frostGiantCost = FrostGiant.cost;
      localStorage.frostGiantLevel = FrostGiant.level;
      localStorage.frostGiantSkillOne = FrostGiant.skill1;
      localStorage.frostGiantSkillTwo = FrostGiant.skill2;
      localStorage.frostGiantSkillThree = FrostGiant.skill3;
      localStorage.frostGiantSkillFour = FrostGiant.skill4;
      localStorage.frostGiantSkillFive = FrostGiant.skill5;
      localStorage.frostGiantSkillSix = FrostGiant.skill6;

      //Dragonling
      localStorage.dragonlingCount = Dragonling.count;
      localStorage.dragonlingDamage = Dragonling.damage;
      localStorage.dragonlingCost = Dragonling.cost;
      localStorage.dragonlingLevel = Dragonling.level;
      localStorage.dragonlingSkillOne = Dragonling.skill1;
      localStorage.dragonlingSkillTwo = Dragonling.skill2;
      localStorage.dragonlingSkillThree = Dragonling.skill3;
      localStorage.dragonlingSkillFour = Dragonling.skill4;
      localStorage.dragonlingSkillFive = Dragonling.skill5;
      localStorage.dragonlingSkillSix = Dragonling.skill6;

      //ThunderSerpent
      localStorage.thunderSerpentCount = ThunderSerpent.count;
      localStorage.thunderSerpentDamage = ThunderSerpent.damage;
      localStorage.thunderSerpentCost = ThunderSerpent.cost;
      localStorage.thunderSerpentLevel = ThunderSerpent.level;
      localStorage.thunderSerpentSkillOne = ThunderSerpent.skill1;
      localStorage.thunderSerpentSkillTwo = ThunderSerpent.skill2;
      localStorage.thunderSerpentSkillThree = ThunderSerpent.skill3;
      localStorage.thunderSerpentSkillFour = ThunderSerpent.skill4;
      localStorage.thunderSerpentSkillFive = ThunderSerpent.skill5;
      localStorage.thunderSerpentSkillSix = ThunderSerpent.skill6;
      
      let date = new Date();
      let a = date.getFullYear();
      let b = date.getMonth() + 1;
      let c = date.getDate();
      let d = date.getHours();
      let e = date.getMinutes();
      let f = date.getSeconds();
          
      
      document.getElementById('saveNoticeTwo').innerHTML = "Last Autosave: " + b + "/" + c + "/" + a + ": at " + d + ":" + e + ":" + f + " ";
    }

      else{
      // If Storage === undefined then we know it isn't possible
      // on this browser (via this technique)
      console.log("No local storage.");
    }
  }
}

setInterval(autoSaveGame, 30000);

let setAutoSave = function(){
  if (player.autoSaveSelection === 0){
    player.autoSaveSelection = 1;
  }
  
  else {
    player.autoSaveSelection = 0;
  }
}

let checkAutoSave = function(){
  if (player.autoSaveSelection === 1){
    document.getElementById('saveNotice').innerHTML = "<p id='autoSaveOn'>Autosave: ON</p>";
  }
  if (player.autoSaveSelection === 0){
    document.getElementById('saveNotice').innerHTML = "<p id='autoSaveOff'>Autosave: OFF</p>";
  }
}

setInterval(checkAutoSave, 1000);

let loadGame = function(){
  if(typeof(Storage) !== "undefined" && localStorage.playerTotalPets != null) { 

    //Player
    let plTotalPets = localStorage.getItem('playerTotalPets');
      player.totalPets = parseFloat(plTotalPets); 
    let plGold = localStorage.getItem('playerGold');
      player.gold = parseFloat(plGold); 
    let plLevel = localStorage.getItem('playerLevel');
      player.level = parseFloat(plLevel); 
    let plMaxXp = localStorage.getItem('playerMaxXp');
      player.maxXp = parseFloat(plMaxXp); 
    let plXp = localStorage.getItem('playerExp');
      player.exp = parseFloat(plXp);
    let plNextRP = localStorage.getItem('playerNextRP');
      player.nextReincarPoints = parseFloat(plNextRP)
    let plRP = localStorage.getItem('playerRP');
      player.reincarPoints = parseFloat(plRP);
    let plTotalOveralRP = localStorage.getItem('playerTotalOverallRP');
      player.totalOveralRP = parseFloat(plTotalOveralRP);  
    let pldamageRP = localStorage.getItem('damageRP');
    //console.log('pldamageRP Before:' + pldamageRP);
    player.damageIncreaseRP = parseFloat(pldamageRP);
    //console.log('RP After:' + player.damageIncreaseRP);
		let goldBonusCount = localStorage.getItem('goldBonusCount');
			player.goldBonusCount = parseFloat(goldBonusCount);
		let expBonusCount = localStorage.getItem('expBonusCount');
			player.expBonusCount = parseFloat(expBonusCount);
		
    
		//Player Talents
		let bonusRPTalentOne = localStorage.getItem('bonusRPTalentOne');
		player.bonusRPTalentOne = parseFloat(bonusRPTalentOne);
		let bonusRPTalentOneCost = localStorage.getItem('bonusRPTalentOneCost');
		player.bonusRPTalentOneCost = parseFloat(bonusRPTalentOneCost);
		let bonusRPTalentTwo = localStorage.getItem('bonusRPTalentTwo');
		player.bonusRPTalentTwo = parseFloat(bonusRPTalentTwo);
		let bonusRPTalentTwoCost = localStorage.getItem('bonusRPTalentTwoCost');
		player.bonusRPTalentTwoCost = parseFloat(bonusRPTalentTwoCost);
		let bonusRPTalentThree = localStorage.getItem('bonusRPTalentThree');
		player.bonusRPTalentThree = parseFloat(bonusRPTalentThree);
		let bonusRPTalentThreeCost = localStorage.getItem('bonusRPTalentThreeCost');
		player.bonusRPTalentThreeCost = parseFloat(bonusRPTalentThreeCost);
		let bonusRPTalentFour = localStorage.getItem('bonusRPTalentFour');
		player.bonusRPTalentFour = parseFloat(bonusRPTalentFour);
		let bonusRPTalentFourCost = localStorage.getItem('bonusRPTalentFourCost');
		player.bonusRPTalentFourCost = parseFloat(bonusRPTalentFourCost);
		let bonusRPTalentFive = localStorage.getItem('bonusRPTalentFive');
		player.bonusRPTalentFive = parseFloat(bonusRPTalentFive);
		let bonusRPTalentFiveCost = localStorage.getItem('bonusRPTalentFiveCost');
		player.bonusRPTalentFiveCost = parseFloat(bonusRPTalentFiveCost);
		let bonusRPTalentSix = localStorage.getItem('bonusRPTalentSix');
		player.bonusRPTalentSix = parseFloat(bonusRPTalentSix);
		let bonusRPTalentSixCost = localStorage.getItem('bonusRPTalentSixCost');
		player.bonusRPTalentSixCost = parseFloat(bonusRPTalentSixCost);
		let bonusRPTalentSeven = localStorage.getItem('bonusRPTalentSeven');
		player.bonusRPTalentSeven = parseFloat(bonusRPTalentSeven);
		let bonusRPTalentSevenCost = localStorage.getItem('bonusRPTalentSevenCost');
		player.bonusRPTalentSevenCost = parseFloat(bonusRPTalentSevenCost );
		let bonusRPTalentEight = localStorage.getItem('bonusRPTalentEight');
		player.bonusRPTalentEight = parseFloat(bonusRPTalentEight);
		let bonusRPTalentEightCost = localStorage.getItem('bonusRPTalentEightCost');
		player.bonusRPTalentEightCost = parseFloat(bonusRPTalentEightCost);
		let bonusRPTalentNine = localStorage.getItem('bonusRPTalentNine');
		player.bonusRPTalentNine = parseFloat(bonusRPTalentNine);
		let bonusRPTalentNineCost = localStorage.getItem('bonusRPTalentNineCost');
		player.bonusRPTalentNineCost = parseFloat(bonusRPTalentNineCost);
		let bonusRPTalentTen = localStorage.getItem('bonusRPTalentTen');
		player.bonusRPTalentTen = parseFloat(bonusRPTalentTen);
		let bonusRPTalentTenCost = localStorage.getItem('bonusRPTalentTenCost');
		player.bonusRPTalentTenCost = parseFloat(bonusRPTalentTenCost);
		let bonusRPTalentEleven = localStorage.getItem('bonusRPTalentEleven');
		player.bonusRPTalentEleven = parseFloat(bonusRPTalentEleven);
		let bonusRPTalentElevenCost = localStorage.getItem('bonusRPTalentElevenCost');
		player.bonusRPTalentElevenCost = parseFloat(bonusRPTalentElevenCost);
		let bonusRPTalentTwelve = localStorage.getItem('bonusRPTalentTwelve');
		player.bonusRPTalentTwelve = parseFloat(bonusRPTalentTwelve);
		let bonusRPTalentTwelveCost = localStorage.getItem('bonusRPTalentTwelveCost');
		player.bonusRPTalentTwelveCost = parseFloat(bonusRPTalentTwelveCost);
		let bonusRPTalentThirteen = localStorage.getItem('bonusRPTalentThirteen');
		player.bonusRPTalentThirteen = parseFloat(bonusRPTalentThirteen);
		let bonusRPTalentThirteenCost = localStorage.getItem('bonusRPTalentThirteenCost');
		player.bonusRPTalentThirteenCost = parseFloat(bonusRPTalentThirteenCost);
		let bonusRPTalentFourteen = localStorage.getItem('bonusRPTalentFourteen');
		player.bonusRPTalentFourteen = parseFloat(bonusRPTalentFourteen);
		let bonusRPTalentFourteenCost = localStorage.getItem('bonusRPTalentFourteenCost');
		player.bonusRPTalentFourteenCost = parseFloat(bonusRPTalentFourteenCost);
		let bonusRPTalentFifteen = localStorage.getItem('bonusRPTalentFifteen');
		player.bonusRPTalentFifteen = parseFloat(bonusRPTalentFifteen);
		let bonusRPTalentFifteenCost = localStorage.getItem('bonusRPTalentFifteenCost');
		player.bonusRPTalentFifteenCost= parseFloat(bonusRPTalentFifteenCost);
		
    //Enemy
    let enCurrentHealth = localStorage.getItem('currentEnemyHealth');
      enemy.currentEnemyHealth = parseFloat(enCurrentHealth); 
    let enMaxHealth = localStorage.getItem('maxEnemyHealth');
      enemy.maxEnemyHealth = parseFloat(enMaxHealth); 
    let enToNextLevel = localStorage.getItem('enemyToNextLevel');
      enemy.toNextLevel = parseFloat(enToNextLevel); 
    let enToNextLevelMax = localStorage.getItem('enemyToNextLevelMax');
      enemy.enToNextLevelMax = parseFloat(enToNextLevelMax); 
    let enLevel = localStorage.getItem('enemyLevel');
      enemy.level = parseFloat(enLevel); 
    let enGold = localStorage.getItem('enemyGold');
      enemy.monsterGold = parseFloat(enGold); 
    let enExp = localStorage.getItem('monsterExp');
      enemy.exp = parseFloat(enExp);
    
    //Skeleton
    let skCount = localStorage.getItem('skeletonCount');
      Skeleton.count = parseFloat(skCount);
    let skDamage = localStorage.getItem('skeletonDamage');
      Skeleton.damage = parseFloat(skDamage);
    let skCost = localStorage.getItem('skeletonCost');
      Skeleton.cost = parseFloat(skCost);
    let skLevel = localStorage.getItem('skeletonLevel');
      Skeleton.level = parseFloat(skLevel);
    
    //Skeleton 
    let skS1 = localStorage.getItem('skeletonSkillOne');
      Skeleton.skill1 = parseFloat(skS1);
    let skS2 = localStorage.getItem('skeletonSkillTwo');
      Skeleton.skill2 = parseFloat(skS2);
    let skS3 = localStorage.getItem('skeletonSkillThree');
      Skeleton.skill3 = parseFloat(skS3);
    let skS4 = localStorage.getItem('skeletonSkillFour');
      Skeleton.skill4 = parseFloat(skS4);
    let skS5 = localStorage.getItem('skeletonSkillFive');
      Skeleton.skill5 = parseFloat(skS5);
    let skS6 = localStorage.getItem('skeletonSkillSix');
      Skeleton.skill6 = parseFloat(skS6);
    
    //FrostGiant
    let frCount = localStorage.getItem('frostGiantCount');
      FrostGiant.count = parseFloat(frCount);
    let frDamage = localStorage.getItem('frostGiantDamage');
      FrostGiant.damage = parseFloat(frDamage);
    let frCost = localStorage.getItem('frostGiantCost');
      FrostGiant.cost = parseFloat(frCost);
    let frLevel = localStorage.getItem('frostGiantLevel');
      FrostGiant.level = parseFloat(frLevel);
    
    //FrostGiant
    let frS1 = localStorage.getItem('frostGiantSkillOne');
      FrostGiant.skill1 = parseFloat(frS1);
    let frS2 = localStorage.getItem('frostGiantSkillTwo');
      FrostGiant.skill2 = parseFloat(frS2); 
    let frS3 = localStorage.getItem('frostGiantSkillThree');
      FrostGiant.skill3 = parseFloat(frS3);
    let frS4 = localStorage.getItem('frostGiantSkillFour');
      FrostGiant.skill4 = parseFloat(frS4);
    let frS5 = localStorage.getItem('frostGiantSkillFive');
      FrostGiant.skill5 = parseFloat(frS5);
    let frS6 = localStorage.getItem('frostGiantSkillSix');
      FrostGiant.skill6 = parseFloat(frS6);
    
    //Dragonling
    let dkCount = localStorage.getItem('dragonlingCount');
      Dragonling.count = parseFloat(dkCount);
    let dkDamage = localStorage.getItem('dragonlingDamage');
      Dragonling.damage = parseFloat(dkDamage);
    let dkCost = localStorage.getItem('dragonlingCost');
      Dragonling.cost = parseFloat(dkCost);
    let dkLevel = localStorage.getItem('dragonlingLevel');
      Dragonling.level = parseFloat(dkLevel);

    //Dragonling
    let dkS1 = localStorage.getItem('dragonlingSkillOne');
      Dragonling.skill1 = parseFloat(dkS1);
    let dkS2 = localStorage.getItem('dragonlingSkillTwo');
      Dragonling.skill2 = parseFloat(dkS2);
    let dkS3 = localStorage.getItem('dragonlingSkillThree');
      Dragonling.skill3 = parseFloat(dkS3);
    let dkS4 = localStorage.getItem('dragonlingSkillFour');
      Dragonling.skill4 = parseFloat(dkS4);
    let dkS5 = localStorage.getItem('dragonlingSkillFive');
      Dragonling.skill5 = parseFloat(dkS5);
    let dkS6 = localStorage.getItem('dragonlingSkillSix');
      Dragonling.skill6 = parseFloat(dkS6);
    
    //ThunderSerpent
    let tsCount = localStorage.getItem('thunderSerpentCount');
      ThunderSerpent.count = parseFloat(tsCount);
    let tsDamage = localStorage.getItem('thunderSerpentDamage');
      ThunderSerpent.damage = parseFloat(tsDamage);
    let tsCost = localStorage.getItem('thunderSerpentCost');
      ThunderSerpent.cost = parseFloat(tsCost);
    let tsLevel = localStorage.getItem('thunderSerpentLevel');
      ThunderSerpent.level = parseFloat(tsLevel);

    //ThunderSerpent
    let tsS1 = localStorage.getItem('thunderSerpentSkillOne');
      ThunderSerpent.skill1 = parseFloat(tsS1);
    let tsS2 = localStorage.getItem('thunderSerpentSkillTwo');
      ThunderSerpent.skill2 = parseFloat(tsS2);
    let tsS3 = localStorage.getItem('thunderSerpentSkillThree');
      ThunderSerpent.skill3 = parseFloat(tsS3);
    let tsS4 = localStorage.getItem('thunderSerpentSkillFour');
      ThunderSerpent.skill4 = parseFloat(tsS4);
    let tsS5 = localStorage.getItem('thunderSerpentSkillFive');
      ThunderSerpent.skill5 = parseFloat(tsS5);
    let tsS6 = localStorage.getItem('thunderSerpentSkillSix');
      ThunderSerpent.skill6 = parseFloat(tsS6);
    
    //Run some visuals to set items to their correct amount visually
    setInitialBackgrounds();
		talentTreeInitialDescriptions();
  } 
  else{
      // If Storage === undefined then we know it isn't possible
      // on this browser (via this technique)
    console.log("No local storage.");
  }
}
/*
*
* Easy-read Number Conversion
* Ex. 1000000 will read 1.00m or 1.0m
*
*/
function nFormatter(num) {
    if (num >= 1e51) {
            return (num / 1e51).toFixed(2).replace(/\.0$/, '') + 'SD';
    } 
    if (num >= 1e48) {
            return (num / 1e48).toFixed(2).replace(/\.0$/, '') + 'Q3';
      } 
    if (num >= 1e45) {
            return (num / 1e45).toFixed(2).replace(/\.0$/, '') + 'Q2';
      } 
    if (num >= 1e42) {
            return (num / 1e42).toFixed(2).replace(/\.0$/, '') + 'T';
      } 
    if (num >= 1e39) {
          return (num / 1e39).toFixed(2).replace(/\.0$/, '') + 'D';
    } 
    if (num >= 1e36) {
            return (num / 1e36).toFixed(2).replace(/\.0$/, '') + 'u';
      } 
    if (num >= 1e33) {
            return (num / 1e33).toFixed(2).replace(/\.0$/, '') + 'd';
      } 
    if (num >= 1e30) {
            return (num / 1e30).toFixed(2).replace(/\.0$/, '') + 'n';
      } 
    if (num >= 1e27) {
            return (num / 1e27).toFixed(2).replace(/\.0$/, '') + 'o';
      } 
    if (num >= 1e24) {
            return (num / 1e24).toFixed(2).replace(/\.0$/, '') + 'S';
      } 
    if (num >= 1e21) {
        return (num / 1e21).toFixed(2).replace(/\.0$/, '') + 's';
      } 
    if (num >= 1e18) {
        return (num / 1e18).toFixed(2).replace(/\.0$/, '') + 'Q';
      } 
    if (num >= 1e15) {
        return (num / 1e15).toFixed(2).replace(/\.0$/, '') + 'q';
      } 
    if(num >= 1e12) {
        return (num / 1e12).toFixed(2).replace(/\.0$/, '') + 't';
      }  
    if(num >= 1e9) {
        return (num / 1e9).toFixed(2).replace(/\.0$/, '') + 'b';
      }
    if(num >= 1e6) {
        return (num / 1e6).toFixed(2).replace(/\.0$/, '') + 'm';
     }
    if(num >= 1e3) {
        return (num / 1e3).toFixed(2).replace(/\.0$/, '') + 'k';
     }
  
     return num;
}


/*
*
* Graphics for Pet
*
*/

let showSkeletonGraphic = function(){
  if (Skeleton.count >= 1 && Skeleton.count < 10){
    $("#skeletonGraphic").html('<img id="skeletonImageDirect" src="images/8-bit-original-skeleton.png" />')
  }
  if (Skeleton.count >= 10 && Skeleton.count < 25){
    $("#skeletonGraphic").html('<img id="skeletonImageDirect" src="images/skeleton-upgrade_1.png" />')
  }
  if (Skeleton.count >= 25 && Skeleton.count < 50){
    $("#skeletonGraphic").html('<img id="skeletonImageDirect" src="images/skeleton-upgrade_2.png" />')
  }
  if (Skeleton.count >= 50 && Skeleton.count < 100){
    $("#skeletonGraphic").html('<img id="skeletonImageDirect" src="images/skeleton-upgrade_3.png" />')
  }
  if (Skeleton.count >= 100 && Skeleton.count < 250){
    $("#skeletonGraphic").html('<img id="skeletonImageDirect" src="images/skeleton-upgrade_4.png" />')
  }
  if (Skeleton.count >= 250 && Skeleton.count < 500){
    $("#skeletonGraphic").html('<img id="skeletonImageDirect" src="images/skeleton-upgrade_5.png" />')
  }
  if (Skeleton.count > 500){
    $("#skeletonGraphic").html('<img id="skeletonImageDirect" src="images/skeleton-upgrade_6.png" />')
  }
}



let showFrostGiantGraphic = function(){
  if (FrostGiant.count >= 1 && FrostGiant.count < 10){
    $("#frostGiantGraphic").html('<img id="frostGiantImageDirect" src="images/8-bit-original-frostGiant.png" />')
  }
  if (FrostGiant.count >= 10 && FrostGiant.count < 25){
    $("#frostGiantGraphic").html('<img id="frostGiantImageDirect" src="images/frostGiant-upgrade_1.png" />')
  }
  if (FrostGiant.count >= 25 && FrostGiant.count < 50){
    $("#frostGiantGraphic").html('<img id="frostGiantImageDirect" src="images/frostGiant-upgrade_2.png" />')
  }
  if (FrostGiant.count >= 50 && FrostGiant.count < 100){
    $("#frostGiantGraphic").html('<img id="frostGiantImageDirect" src="images/frostGiant-upgrade_3.png" />')
  }
  if (FrostGiant.count >= 100 && FrostGiant.count < 250){
    $("#frostGiantGraphic").html('<img id="frostGiantImageDirect" src="images/frostGiant-upgrade_4.png" />')
  }
  if (FrostGiant.count >= 250 && FrostGiant.count < 500){
    $("#frostGiantGraphic").html('<img id="frostGiantImageDirect" src="images/frostGiant-upgrade_5.png" />')
  }
  if (FrostGiant.count > 500){
    $("#frostGiantGraphic").html('<img id="frostGiantImageDirect" src="images/frostGiant-upgrade_6.png" />')
  }
}



let showDragonlingGraphic = function(){
  if (Dragonling.count >= 1 && Dragonling.count < 10){
    $("#dragonlingGraphic").html('<img id="dragonlingImageDirect" src="images/8-bit-original-dragonling_actual_seriously.png" />')
  }
  if (Dragonling.count >= 10 && Dragonling.count < 25){
    $("#dragonlingGraphic").html('<img id="dragonlingImageDirect" src="images/8-bit-original-dragonling_actual.png" />')
  }
  if (Dragonling.count >= 25 && Dragonling.count < 50){
    $("#dragonlingGraphic").html('<img id="dragonlingImageDirect" src="images/8-bit-original-dragonling.png" />')
  }
  if (Dragonling.count >= 50 && Dragonling.count < 100){
    $("#dragonlingGraphic").html('<img id="dragonlingImageDirect" src="images/dragonling-upgrade_1.png" />')
  }
  if (Dragonling.count >= 100 && Dragonling.count < 250){
    $("#dragonlingGraphic").html('<img id="dragonlingImageDirect" src="images/dragonling-upgrade_2.png" />')
  }
  if (Dragonling.count >= 250 && Dragonling.count < 500){
    $("#dragonlingGraphic").html('<img id="dragonlingImageDirect" src="images/dragonling-upgrade_3.png" />')
  }
  if (Dragonling.count > 500){
    $("#dragonlingGraphic").html('<img id="dragonlingImageDirect" src="images/dragonling-upgrade_4.png" />')
  }
}




let showThunderSerpentGraphic = function(){
  if (ThunderSerpent.count >= 1 && ThunderSerpent.count < 10){
    $("#thunderSerpentGraphic").html('<img id="thunderSerpentImageDirect" src="images/8-bit-original-thunderSerpent.png" />')
  }
  if (ThunderSerpent.count >= 10 && ThunderSerpent.count < 25){
    $("#thunderSerpentGraphic").html('<img id="thunderSerpentImageDirect" src="images/thunderSerpent-upgrade_1.png" />')
  }
  if (ThunderSerpent.count >= 25 && ThunderSerpent.count < 50){
    $("#thunderSerpentGraphic").html('<img id="thunderSerpentImageDirect" src="images/thunderSerpent-upgrade_2.png" />')
  }
  if (ThunderSerpent.count >= 50 && ThunderSerpent.count < 100){
    $("#thunderSerpentGraphic").html('<img id="thunderSerpentImageDirect" src="images/thunderSerpent-upgrade_3.png" />')
  }
  if (ThunderSerpent.count >= 100 && ThunderSerpent.count < 250){
    $("#thunderSerpentGraphic").html('<img id="thunderSerpentImageDirect" src="images/thunderSerpent-upgrade_4.png" />')
  }
  if (ThunderSerpent.count >= 250 && ThunderSerpent.count < 500){
    $("#thunderSerpentGraphic").html('<img id="thunderSerpentImageDirect" src="images/thunderSerpent-upgrade_5.png" />')
  }
  if (ThunderSerpent.count > 500){
    $("#thunderSerpentGraphic").html('<img id="thunderSerpentImageDirect" src="images/thunderSerpent-upgrade_6.png" />')
  }
}


/*
*
* TODO: Death animations?
*
*/

/*
*
*
*  Floating Gold Text
*
*/

let floatingGoldText = function(){

  if (player.totalPets > 0){
    document.getElementById('floatingGoldText').innerHTML = "+" + nFormatter(((enemy.monsterGold) * player.goldBonusCount).toFixed(1));  

    $("#floatingGoldText").animate({
      opacity: 1,
        }, 250, function() {
          // Animation complete.
        }).animate({ 
            opacity: 0,
              }, 450, function() {
                // Animation complete.
              })};
}

/*
*
* Reincarnation System
*
*/

//Reincarnation - Set it all back to original!!!! (minus the earned bonuses of course!)

let reincarnation = function() {
  player.damageIncreaseRP = player.damageIncreaseRP + (player.nextReincarPoints * .02);
  player.reincarPoints += player.nextReincarPoints;
  player.totalOveralRP += player.nextReincarPoints;
  
  setInitialBackgrounds();
  
  //Certain player stats that need to be reset 
  player.totalPets = 0;     
  player.gold = 28;          
  player.level = 1;         
  player.exp = 1;           
  player.maxXp = 5;
  player.nextReincarPoints = 0;
  
  //Enemy stats that need to be reset
  enemy.currentEnemyHealth = 10;
  enemy.maxEnemyHealth = 10;
  enemy.monsterGold = 1;
  enemy.exp = 1;
  enemy.toNextLevel = 1;
  enemy.level = 1;

  //Skeleton
  Skeleton.damage = 1.5;
  Skeleton.speed = 1750;
  Skeleton.count = 0;
  Skeleton.cost = 5;
  Skeleton.skill1 = 0;   
  Skeleton.skill2 = 0;  
  Skeleton.skill3 = 0;  
  Skeleton.skill4 = 0;
  Skeleton.skill5 = 0;
  Skeleton.skill6 = 0; 
  
  //FrostGiant
  FrostGiant.damage = 9;
  FrostGiant.speed = 2800;
  FrostGiant.count = 0;
  FrostGiant.cost = 200;
  FrostGiant.skill1 = 0;   
  FrostGiant.skill2 = 0;  
  FrostGiant.skill3 = 0;  
  FrostGiant.skill4 = 0;
  FrostGiant.skill5 = 0;
  FrostGiant.skill6 = 0; 
  
  //Dragonling
  Dragonling.damage = 22;
  Dragonling.speed = 2800;
  Dragonling.count = 0;
  Dragonling.cost = 900;
  Dragonling.skill1 = 0;   
  Dragonling.skill2 = 0;  
  Dragonling.skill3 = 0;  
  Dragonling.skill4 = 0;
  Dragonling.skill5 = 0;
  Dragonling.skill6 = 0; 
  
  //ThunderSerpent
  ThunderSerpent.damage = 19;
  ThunderSerpent.speed = 1700;
  ThunderSerpent.count = 0;
  ThunderSerpent.cost = 2500;
  ThunderSerpent.skill1 = 0;   
  ThunderSerpent.skill2 = 0;  
  ThunderSerpent.skill3 = 0;  
  ThunderSerpent.skill4 = 0;
  ThunderSerpent.skill5 = 0;
  ThunderSerpent.skill6 = 0;
  
  //Reset Floating Text in case of Attack Speed Overload
  document.getElementById('floatingSkeletonDamage').innerHTML = "";
  document.getElementById('floatingFrostGiantDamage').innerHTML = "";
  document.getElementById('floatingDragonlingDamage').innerHTML = "";
  document.getElementById('floatingThunderSerpentDamage').innerHTML = "";
  
  //Set some graphics back to normal
  
  setSkeletonInitialCost();
  setFrostGiantInitialCost();
  setDragonlingInitialCost();
  setThunderSerpentInitialCost();
  
  $("#skeletonGraphic").html('');
  $("#frostGiantGraphic").html('');
  $("#dragonlingGraphic").html('');
  $("#thunderSerpentGraphic").html('');
}

/* Reincarnation Sets */
let setSkeletonInitialCost = function(){
    document.getElementById('skeletonCost').innerHTML = "Cost: " + nFormatter(Math.ceil(Skeleton.cost).toFixed(0));
}

let setFrostGiantInitialCost = function(){
    document.getElementById('frostGiantCost').innerHTML = "Cost: " + nFormatter(Math.ceil(FrostGiant.cost).toFixed(0));
}

let setDragonlingInitialCost = function(){
    document.getElementById('dragonlingCost').innerHTML = "Cost: " + nFormatter(Math.ceil(Dragonling.cost).toFixed(0));
}

let setThunderSerpentInitialCost = function(){
    document.getElementById('thunderSerpentCost').innerHTML = "Cost: " + nFormatter(Math.ceil(ThunderSerpent.cost).toFixed(0));
}

/*
*
* RP Section  
*
*/

//Every 5 levels the player gets a RP point. Checks when player levels. More points for higher level breakpoints
let checkForNextRP = function(){
  let checkForLevel = player.level % 5;
  
  if (checkForLevel === 0 && player.level > 1 && player.level < 39	){
    player.nextReincarPoints = player.nextReincarPoints + (1 * player.bonusRPCount);
  }
  
  if (checkForLevel === 0 && player.level > 39 && player.level < 100){
    player.nextReincarPoints = player.nextReincarPoints + (2 * player.bonusRPCount);
  }

  if (checkForLevel === 0 && player.level > 99 && player.level < 250){
    player.nextReincarPoints = player.nextReincarPoints + (3 * player.bonusRPCount);
  }
  
  if (checkForLevel === 0 && player.level > 249 && player.level < 500){
    player.nextReincarPoints = player.nextReincarPoints + (4 * player.bonusRPCount);
  }
  
  if (checkForLevel === 0 && player.level > 499 && player.level < 1000){
    player.nextReincarPoints = player.nextReincarPoints + (5 * player.bonusRPCount);
  }
  
  if (checkForLevel === 0 && player.level > 999){
    player.nextReincarPoints = player.nextReincarPoints + (6 * player.bonusRPCount);
  }
}

//Reset RP Points 

let resetRP = function(){
  player.reincarPoints = player.totalOveralRP;
  
  player.bonusRPTalentOne = 0;		
  Skeleton.addDam = 0;
  player.bonusRPTalentOneCost = 1;				
  player.bonusRPTalentTwo = 0;
  Skeleton.addSpeed = 0;
  player.bonusRPTalentTwoCost = 1;
  player.bonusRPTalentThree = 0;
  player.bonusRPCount = 1;  
  player.bonusRPTalentThreeCost = 10;
  player.bonusRPTalentFour= 0;
  FrostGiant.addDam = 0;
  player.bonusRPTalentFourCost= 1;
  player.bonusRPTalentFive= 0;
  FrostGiant.addSpeed = 0;
  player.bonusRPTalentFiveCost= 1;
  player.bonusRPTalentSix = 0;
  player.goldBonusCount = 1.00;
  player.bonusRPTalentSixCost = 1;
  player.bonusRPTalentSeven = 0;
  Dragonling.addDam = 0;
  player.bonusRPTalentSevenCost = 1;
  player.bonusRPTalentEight = 0;
  Dragonling.addSpeed = 0;
  player.bonusRPTalentEightCost = 1;
  player.bonusRPTalentNine= 0;
  player.expBonusCount = 1.00;
  player.bonusRPTalentNineCost= 1;
  player.bonusRPTalentTen = 0;
  ThunderSerpent.addDam = 0;
  player.bonusRPTalentTenCost = 1;
  player.bonusRPTalentEleven= 0;
  ThunderSerpent.addSpeed= 0;
  player.bonusRPTalentElevenCost= 1;
  player.bonusRPTalentTwelve= 0;
  enemy.toNextLevelMax = 10;
  player.bonusRPTalentTwelveCost= 10;
  
  talentTreeInitialDescriptions();
}


/* Display Next RP Points */
let checkNextRP = function(){
  document.getElementById("reincarnation").innerHTML = player.nextReincarPoints + " RP Gain";
}


/*
*
* Cost and Level Multiplier - Purchasing Multiple Minions
*
*/

let costMultiplyOne = function(){
  player.costMultiplier = 1;
  document.getElementById("costMultiplierOne").style.borderColor = "red";
  document.getElementById("costMultiplierOne").style.color = "red";
  document.getElementById("costMultiplierTwo").style.borderColor = "#000";
  document.getElementById("costMultiplierTwo").style.color = "#000";
  document.getElementById("costMultiplierThree").style.borderColor = "#000";
  document.getElementById("costMultiplierThree").style.color = "#000";
  document.getElementById("costMultiplierFour").style.borderColor = "#000";
  document.getElementById("costMultiplierFour").style.color = "#000";
  document.getElementById("costMultiplierFive").style.borderColor = "#000";
  document.getElementById("costMultiplierFive").style.color = "#000";
}

let costMultiplyTwo = function(){
  player.costMultiplier = 10;  
  document.getElementById("costMultiplierOne").style.borderColor = "#000";
  document.getElementById("costMultiplierOne").style.color = "#000";
  document.getElementById("costMultiplierTwo").style.borderColor = "red";
  document.getElementById("costMultiplierTwo").style.color = "red";
  document.getElementById("costMultiplierThree").style.borderColor = "#000";
  document.getElementById("costMultiplierThree").style.color = "#000";
  document.getElementById("costMultiplierFour").style.borderColor = "#000";
  document.getElementById("costMultiplierFour").style.color = "#000";
  document.getElementById("costMultiplierFive").style.borderColor = "#000";
  document.getElementById("costMultiplierFive").style.color = "#000";
}

let costMultiplyThree = function(){
  player.costMultiplier = 25;
  document.getElementById("costMultiplierOne").style.borderColor = "#000";
  document.getElementById("costMultiplierOne").style.color = "#000";
  document.getElementById("costMultiplierTwo").style.borderColor = "#000";
  document.getElementById("costMultiplierTwo").style.color = "#000";
  document.getElementById("costMultiplierThree").style.borderColor = "red";
  document.getElementById("costMultiplierThree").style.color = "red";
  document.getElementById("costMultiplierFour").style.borderColor = "#000";
  document.getElementById("costMultiplierFour").style.color = "#000";
  document.getElementById("costMultiplierFive").style.borderColor = "#000";
  document.getElementById("costMultiplierFive").style.color = "#000";
}

let costMultiplyFour = function(){
  player.costMultiplier = 100; 
  document.getElementById("costMultiplierOne").style.borderColor = "#000";
  document.getElementById("costMultiplierOne").style.color = "#000";
  document.getElementById("costMultiplierTwo").style.borderColor = "#000";
  document.getElementById("costMultiplierTwo").style.color = "#000";
  document.getElementById("costMultiplierThree").style.borderColor = "#000";
  document.getElementById("costMultiplierThree").style.color = "#000";
  document.getElementById("costMultiplierFour").style.borderColor = "red";
  document.getElementById("costMultiplierFour").style.color = "red";
  document.getElementById("costMultiplierFive").style.borderColor = "#000";
  document.getElementById("costMultiplierFive").style.color = "#000";
}

let costMultiplyFive = function(){
  player.costMultiplier = 1000;  
  document.getElementById("costMultiplierOne").style.borderColor = "#000";
  document.getElementById("costMultiplierOne").style.color = "#000";
  document.getElementById("costMultiplierTwo").style.borderColor = "#000";
  document.getElementById("costMultiplierTwo").style.color = "#000";
  document.getElementById("costMultiplierThree").style.borderColor = "#000";
  document.getElementById("costMultiplierThree").style.color = "#000";
  document.getElementById("costMultiplierFour").style.borderColor = "#000";
  document.getElementById("costMultiplierFour").style.color = "#000";
  document.getElementById("costMultiplierFive").style.borderColor = "red";
  document.getElementById("costMultiplierFive").style.color = "red";
}

/*
*
* Cost and Level Multiplier - Purchasing Multiple Minions
* This section is for the inside of the talent menus
*
*/

let costMultiplyOne2 = function(){
  player.costMultiplier2 = 1;
  document.getElementById("costMultiplierOne2").style.borderColor = "red";
  document.getElementById("costMultiplierOne2").style.color = "red";
  document.getElementById("costMultiplierTwo2").style.borderColor = "#fff";
  document.getElementById("costMultiplierTwo2").style.color = "#fff";
  document.getElementById("costMultiplierThree2").style.borderColor = "#fff";
  document.getElementById("costMultiplierThree2").style.color = "#fff";
  document.getElementById("costMultiplierFour2").style.borderColor = "#fff";
  document.getElementById("costMultiplierFour2").style.color = "#fff";
  document.getElementById("costMultiplierFive2").style.borderColor = "#fff";
  document.getElementById("costMultiplierFive2").style.color = "#fff";
}

let costMultiplyTwo2 = function(){
  player.costMultiplier2 = 10;  
  document.getElementById("costMultiplierOne2").style.borderColor = "#fff";
  document.getElementById("costMultiplierOne2").style.color = "#fff";
  document.getElementById("costMultiplierTwo2").style.borderColor = "red";
  document.getElementById("costMultiplierTwo2").style.color = "red";
  document.getElementById("costMultiplierThree2").style.borderColor = "#fff";
  document.getElementById("costMultiplierThree2").style.color = "#fff";
  document.getElementById("costMultiplierFour2").style.borderColor = "#fff";
  document.getElementById("costMultiplierFour2").style.color = "#fff";
  document.getElementById("costMultiplierFive2").style.borderColor = "#fff";
  document.getElementById("costMultiplierFive2").style.color = "#fff";
}
let costMultiplyThree2 = function(){
  player.costMultiplier2 = 25;
  document.getElementById("costMultiplierOne2").style.borderColor = "#fff";
  document.getElementById("costMultiplierOne2").style.color = "#fff";
  document.getElementById("costMultiplierTwo2").style.borderColor = "#fff";
  document.getElementById("costMultiplierTwo2").style.color = "#fff";
  document.getElementById("costMultiplierThree2").style.borderColor = "red";
  document.getElementById("costMultiplierThree2").style.color = "red";
  document.getElementById("costMultiplierFour2").style.borderColor = "#fff";
  document.getElementById("costMultiplierFour2").style.color = "#fff";
  document.getElementById("costMultiplierFive2").style.borderColor = "#fff";
  document.getElementById("costMultiplierFive2").style.color = "#fff";
}

let costMultiplyFour2 = function(){
  player.costMultiplier2 = 100; 
  document.getElementById("costMultiplierOne2").style.borderColor = "#fff";
  document.getElementById("costMultiplierOne2").style.color = "#fff";
  document.getElementById("costMultiplierTwo2").style.borderColor = "#fff";
  document.getElementById("costMultiplierTwo2").style.color = "#fff";
  document.getElementById("costMultiplierThree2").style.borderColor = "#fff";
  document.getElementById("costMultiplierThree2").style.color = "#fff";
  document.getElementById("costMultiplierFour2").style.borderColor = "red";
  document.getElementById("costMultiplierFour2").style.color = "red";
  document.getElementById("costMultiplierFive2").style.borderColor = "#fff";
  document.getElementById("costMultiplierFive2").style.color = "#fff";
}

let costMultiplyFive2 = function(){
  player.costMultiplier2 = 1000;  
  document.getElementById("costMultiplierOne2").style.borderColor = "#fff";
  document.getElementById("costMultiplierOne2").style.color = "#fff";
  document.getElementById("costMultiplierTwo2").style.borderColor = "#fff";
  document.getElementById("costMultiplierTwo2").style.color = "#fff";
  document.getElementById("costMultiplierThree2").style.borderColor = "#fff";
  document.getElementById("costMultiplierThree2").style.color = "#fff";
  document.getElementById("costMultiplierFour2").style.borderColor = "#fff";
  document.getElementById("costMultiplierFour2").style.color = "#fff";
  document.getElementById("costMultiplierFive2").style.borderColor = "red";
  document.getElementById("costMultiplierFive2").style.color = "red";
}


//TODO - Credit Section (links below)
//Backgrounds - https://opengameart.org/content/backgrounds-for-2d-platformers
//Dragon Enemies - https://opengameart.org/content/rpg-enemies-11-dragons
//Icons - https://opengameart.org/content/free-rpg-skill-icons-for-crafter-blacksmith-and-gnome
//Orcs - https://opengameart.org/content/orc-static-64x64
//Spell Icons - https://opengameart.org/content/painterly-spell-icons-part-4