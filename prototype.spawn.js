module.exports = function() {
    // create a new function for StructureSpawn
    StructureSpawn.prototype.createCustomCreep =
        function(energy, roleName, CreepName , target) {
            // create a balanced body as big as possible with the given energy
            if (energy > 650) {energy = 650;}
            var numberOfParts = Math.floor(energy / 200 );
            var body = [];
            var numberOfWorkParts = numberOfParts;
            var numberOfMoveParts = numberOfParts;
            var numberOfCarryParts = numberOfParts;
            var numberOfClaimParts = 0;
            var numberOfHealParts = 0;
            var numberOfToughParts = 0;
            //console.log(numberOfParts + " " + energy);
            
                if (roleName == 'harvester') {            
                  numberOfMoveParts = 1;
                  numberOfCarryParts = 1;
                  numberOfWorkParts = 1;
                  if (numberOfWorkParts > 3) {numberOfWorkParts = 3}
                }

                if (roleName == 'warlord') {            
                  numberOfMoveParts = 2;
                  numberOfClaimParts = 1;
                  numberOfCarryParts = 0;
                  numberOfWorkParts = 0;
                }

                if (roleName == 'miner') {           
                    numberOfMoveParts = 1;
                    numberOfCarryParts = 0;
                    numberOfWorkParts = Math.floor((energy- 50) / 100 );
                    if (energy == 650) {
                        numberOfWorkParts = 5;
                        numberOfMoveParts = 3;
                    }
                } 
                
                if (roleName == 'logist') {
                    numberOfMoveParts = Math.floor(energy / 150 );
                    numberOfCarryParts = numberOfMoveParts*2; 
                    numberOfWorkParts = 0;
                    
                    if (energy == 650) {
                        numberOfCarryParts = 8;
                        numberOfMoveParts = 4;
                    }
                    
                } 
                
                if (roleName == 'upgrader') {           
                    numberOfMoveParts = 1; 
                    numberOfCarryParts = 1;
                    numberOfWorkParts = numberOfParts*2;

                } 
                
                if (roleName == 'builder') { 
                   
                    if (numberOfParts > 3 ){
                    numberOfMoveParts = 3; 
                    numberOfWorkParts = 3;
                    numberOfCarryParts = 3;
                    }
                   
                } 
                
                for (let i = 0; i < numberOfToughParts; i++) {
                    body.push(TOUGH);
                }
                    
                for (let i = 0; i < numberOfWorkParts; i++) {
                    body.push(WORK);
                }
                for (let i = 0; i < numberOfCarryParts; i++) {
                    body.push(CARRY);
                }

                for (let i = 0; i < numberOfMoveParts; i++) {
                    body.push(MOVE);
                }
                 for (let i = 0; i < numberOfClaimParts; i++) {
                    body.push(CLAIM);
                }
                
                for (let i = 0; i < numberOfHealParts; i++) {
                    body.push(HEAL);
                }
            

            // create creep with the created body and the given role
            
            if (!Game.creeps[CreepName]) { CreepName = CreepName + Math.floor(Math.random()*100); } else { CreepName = roleName;}
            //console.log("try to create " + CreepName +" "+ body);
            const result = this.createCreep(body, CreepName, { role: roleName, working: false, target: target });
                if(_.isString(result)) {
                    console.log('The name is: ' +this.name+" " +result +" "+ body);
                }
                else {
                    
                    console.log('Spawn error: '  +this.name+" "+result + " try to create " + CreepName +" "+ body);
                }
            return result;
        };

    // create a new function for StructureSpawn
    StructureSpawn.prototype.createLongDistanceHarvester =
        function (energy, numberOfWorkParts, home, target, sourceIndex) {
            // create a body with the specified number of WORK parts and one MOVE part per non-MOVE part
            var body = [];
            for (let i = 0; i < numberOfWorkParts; i++) {
                body.push(WORK);
            }

            // 150 = 100 (cost of WORK) + 50 (cost of MOVE)
            energy -= 150 * numberOfWorkParts;

            var numberOfParts = 8;
            for (let i = 0; i < numberOfParts; i++) {
                body.push(CARRY);
            }
            for (let i = 0; i < numberOfParts; i++) {
                body.push(MOVE);
            }

            // create creep with the created body
            console.log("Try to Build Long");
            return this.createCreep(body, undefined, {
                role: 'longDistanceHarvester',
                home: home,
                target: target,
                sourceIndex: sourceIndex,
                working: false
            });
        };
        
        // create a new function Damager for StructureSpawn
    StructureSpawn.prototype.createDamager =
        function (energy, numberOfAttackParts, numberOfMoveParts, numberOfToughParts,  target) {
            // create a body with the specified number of WORK parts and one MOVE part per non-MOVE part
            var body = [];
            for (let i = 0; i < numberOfToughParts; i++) {
                body.push(TOUGH);
            }


            for (let i = 0; i < numberOfMoveParts; i++) {
                body.push(MOVE);
            }
            for (let i = 0; i < numberOfAttackParts; i++) {
                body.push(ATTACK);
            }

            // create creep with the created body
            return this.createCreep(body, undefined, {
                role: 'damager',
                target: target,
            });
        };
};