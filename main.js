// import modules Game.market.createOrder(ORDER_SELL, RESOURCE_LEMERGIUM, 0.5, 1000, "W38N28");
var startCpu = Game.cpu.getUsed();
//console.log("Start = " + startCpu + " Bucket " + Game.cpu.bucket );
//console.log( Game.cpu.getUsed() - startCpu );
require('prototype.spawn')(); 
//var _ = require('lodash');
var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleDamager = require('role.damager');
var roleTower = require('role.tower');
var roleWarlord = require('role.warlord');
var roleMiner = require('role.miner');
var roleLogist = require('role.logist');
// setup some minimum numbers for different roles
var minimumNumberOfHarvesters = 0;
var minimumNumberOfMiners = 2;
var minimumNumberOfLogists = 2;

var minimumNumberOfUpgraders = 2;
var minimumNumberOfBuilders = 3;
var minimumNumberOfRepairers = 0;
var minimumNumberOfWallRepairers = 0;
var minimumNumberOfDamagers = 0;

var minimumNumberOfHealers = 0;
var minimumNumberOfWarlords = 1;

var HOME = 'E49N47';
var TargetIndex = 'E48N48';

//console.log(" Var = " + (Game.cpu.getUsed() - startCpu) );




module.exports.loop = function () {
    // check for memory entries of died creeps by iterating over Memory.creeps
   // console.log( Game.cpu.getUsed() - startCpu );
    for (let name in Memory.creeps) {
        // and checking if the creep is still alive
        if (Game.creeps[name] == undefined) {
            // if not, delete the memory entry
            delete Memory.creeps[name];
        }
    }
    //console.log( Game.cpu.getUsed() - startCpu );
    
    // for every creep name in Game.creeps
    for (let name in Game.creeps) {
        // get the creep object
        var creep = Game.creeps[name];

        // if creep is harvester, call harvester script
        if (creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }

        // if warlminer call miner
        else if (creep.memory.role == 'miner') {
            roleMiner.run(creep);
        }
        // if warlminer call miner
        else if (creep.memory.role == 'logist') {
            roleLogist.run(creep);
        }

        // if creep is builder, call builder script
        else if (creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }

        else if (creep.memory.role == 'damager') {
//            creep.say('hi');
            roleDamager.run(creep);
        }
        // if warlord
        else if (creep.memory.role == 'warlord') {
            roleWarlord.run(creep);
        }
        
         // if creep is upgrader, call upgrader script
        else if (creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        
    }
    
   
//console.log( Game.cpu.getUsed() - startCpu );  
  
    // find all towers
    

    //console.log(Game.spawns);  
    
        
        for (const spawnName in Game.spawns ) {
            
            var spawnRoomName = Game.spawns[spawnName].room.name
            //console.log(spawnName);
            //console.log(Game.spawns[spawnName]);
            
            var towers = Game.rooms[spawnRoomName].find(FIND_STRUCTURES, {
            filter: (s) => s.structureType == STRUCTURE_TOWER
            });
            // for each tower
            for (let tower of towers) { roleTower.run(tower);}
           
            if (Game.time % 20 == 0) {   
    
            // count the number of creeps alive for each role
            // _.sum will count the number of properties in Game.creeps filtered by the
            //  arrow function, which checks for the creep being a specific role
            var numberOfHarvesters = _.sum(Game.creeps, (c) => c.memory.role == 'harvester' && c.room.name == spawnRoomName);
            var numberOfUpgraders = _.sum(Game.creeps, (c) => c.memory.role == 'upgrader' && c.room.name == spawnRoomName);
            var numberOfBuilders = _.sum(Game.creeps, (c) => c.memory.role == 'builder' && c.room.name == spawnRoomName);
            var numberOfDamagers = _.sum(Game.creeps, (c) => c.memory.role == 'damager' && c.room.name == spawnRoomName);
            var numberOfMiners = _.sum(Game.creeps, (c) => c.memory.role == 'miner' && c.room.name == spawnRoomName);
            var numberOfLogists = _.sum(Game.creeps, (c) => c.memory.role == 'logist' && c.room.name == spawnRoomName);
            var numberOfWarlords = _.sum(Game.creeps, (c) => c.memory.role == 'warlord' && c.memory.target == TargetIndex);
        
        
            var energy = Game.spawns[spawnName].room.energyCapacityAvailable;
            var energyAvailable = Game.spawns[spawnName].room.energyAvailable;
            
            var name = undefined;
        
        
        // name = Game.spawns.Spawn2.createCustomCreep(300, 'builder', 'BU ' + (numberOfBuilders +1));
        
            // if not enough harvesters
            if (numberOfHarvesters < minimumNumberOfHarvesters) {
                //console.log( "try to spawn one");
                name = Game.spawns[spawnName].createCustomCreep(energy, 'harvester', 'HR ' + (numberOfHarvesters +1));
        
                // if spawning failed and we have no harvesters left
                if (name == ERR_NOT_ENOUGH_ENERGY && numberOfHarvesters == 0) {
                    // spawn one with what is available
                    name = Game.spawns[spawnName].createCustomCreep(
                        energyAvailable, 'harvester', 'HR ' + (numberOfHarvesters +1));
                }
            }
    
            else if (numberOfLogists < minimumNumberOfLogists) {
                // try to spawn one
                name = Game.spawns[spawnName].createCustomCreep(energy, 'logist', 'Lo ' + (numberOfLogists +1));
                
                   // if spawning failed and we have no Lo left
                if (name == ERR_NOT_ENOUGH_ENERGY && numberOfLogists == 0) {
                    // spawn one with what is available
                    name = Game.spawns[spawnName].createCustomCreep(
                        energyAvailable, 'logist', 'Lo ' + (numberOfLogists +1));
                }
            }
    
            else if (numberOfMiners < minimumNumberOfMiners) {
                // try to spawn one
                name = Game.spawns[spawnName].createCustomCreep(energy, 'miner', 'Mi ' + (numberOfMiners +1));
            }
    
    
            // if not enough builders
            else if (numberOfBuilders < minimumNumberOfBuilders) {
                // try to spawn one
                name = Game.spawns[spawnName].createCustomCreep(energy, 'builder', 'Bu ' + (numberOfBuilders +1));
            }
    
            // if not enough upgraders
            else if (numberOfUpgraders < minimumNumberOfUpgraders) {
                // try to spawn one
                name = Game.spawns[spawnName].createCustomCreep(energy, 'upgrader', 'Up ' + (numberOfUpgraders +1));
            }
        
    
            // if not enough Damagers 
            else if (numberOfDamagers < minimumNumberOfDamagers) {
                // try to spawn one
                name = Game.spawns[spawnName].createDamager(energy, 4, 4, 4, TargetIndex);
            }
            
        
            
            // if not enough Warlords 
            else if (numberOfWarlords < minimumNumberOfWarlords) {
                // try to spawn one
                name = Game.spawns[spawnName].createCustomCreep(energy, 'warlord', 'Wr' + TargetIndex, TargetIndex);
            }
            
        
            
            else {
                // else try to spawn a builder
              //  name = Game.spawns[spawnName].createCustomCreep(energy, 'builder');
            }
        
            // print name to console if spawning was a success
            // name > 0 would not work since string > 0 returns false
            if (!(name < 0)) {
               // console.log("Spawned new creep: " + name);
            }
            
            if (Game.time % 20 == 0) {console.log(spawnName + " E = " + energyAvailable + "/"  + energy  +" Lo = " + numberOfLogists + "/" + minimumNumberOfLogists +  " HR = " + numberOfHarvesters + " UP = " + numberOfUpgraders + " BU = " + numberOfBuilders  + " DD = " + numberOfDamagers);
        }
    }
    }
  
};
