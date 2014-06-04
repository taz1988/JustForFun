function PeonController(config) {
	this.peons = config.peons;
	this.base = config.base;
	this.gems = config.gems;
	this.goldCoins = config.goldCoins;
	this.coins = config.coins;
	this.peonsTargets = this.base.peonsTargets || [];
	
	


this.run = function() {
	this.removeTargetedItems();
	this.coordinatePeons();
};

this.removeTargetedItems = function() {
	for (var i = 0; i < this.peons.length; i++) {
        var peonTarget = this.getPeonTargets(this.peons[i]);
		if (peonTarget !== null && typeof peonTarget.items !== "undefined") {
			for (var j = 0; j < peonTarget.items.length; j++) {
                var item = peonTarget.items[j];
				if (item.type === "gem") {
                    this.removeListOrTarget(this.gems, item, peonTarget.items);
				} else if  (item.type === "gold-coin") {
                    this.removeListOrTarget(this.goldCoins, item, peonTarget.items);
				} else {
                    this.removeListOrTarget(this.coins, item, peonTarget.items);
				}
			}
		}
	}	
};

this.removeListOrTarget = function(items, item, targets) {
    var index = items.indexOf(item);
    if (index < 0) {
        targets.splice(targets.indexOf(item), 1);
    } else {
        items.splice(index, 1);
    }
};

this.coordinatePeons = function() {
	for (var i = 0; i < this.peons.length; i++) {
        var peonTargets = this.getPeonTargets(this.peons[i]);
		if (peonTargets !== null && typeof peonTargets.items !== "undefined" && peonTargets.items.length > 0) {
			this.movePeonForwardTarget(this.peons[i], peonTargets);
		} else {
			peonTargets = this.findBestTargetForPeon(this.peons[i]);
			this.movePeonForwardTarget(this.peons[i], peonTargets);
		} 
	}	
};

this.getPeonTargets = function(peon) {
    for (var i = 0; i < this.peonsTargets.length; i++) {
        if (this.peonsTargets[i].id === peon.id) {
            return this.peonsTargets;
        }
    }
    return null;
};

this.movePeonForwardTarget = function(peon, peonTargets) {
	if (typeof peonTargets.items.length > 0) {
		this.command(peon, 'move', peon.getNearest(peonTargets.items));
        this.say(peon.getNearest(peonTargets.items).pos);
	}
};

this.findBestTargetForPeon = function(peon) {
	var biggestElement = this.getNearestBiggestElement(peon);
	if (biggestElement !== null) {
		var biggestElementDistance = peon.distance(biggestElement);
		var choosenElements = [biggestElement];
		var elementsBetweenPeonAndBiggestElement = null;
		if (biggestElement.type === "gem") {
			elementsBetweenPeonAndBiggestElement = this.getElementsInDistance(peon, this.goldCoins, biggestElementDistance);
			if (elementsBetweenPeonAndBiggestElement.length > 2) {
				choosenElements = elementsBetweenPeonAndBiggestElement;
			} else {
				elementsBetweenPeonAndBiggestElement = this.getElementsInDistance(peon, this.coins, biggestElementDistance);
				if (this.getElementsPrice(elementsBetweenPeonAndBiggestElement) > 5) {
					choosenElements = elementsBetweenPeonAndBiggestElement;
				}
			}
		} else if (biggestElement.type === "gold-coin") {
			elementsBetweenPeonAndBiggestElement = this.getElementsInDistance(peon, this.coins, biggestElementDistance);
			if (this.getElementsPrice(elementsBetweenPeonAndBiggestElement) > 5) {
					choosenElements = elementsBetweenPeonAndBiggestElement;
				}
			}
        var peonTarget = {
            id : peon.id,
            items : choosenElements     
        };
		this.peonsTargets.push(peonTarget);
		for (var j = 0; j < peonTarget.items.length; j++) {
                var item = peonTarget.items[j];
				if (item.type === "gem") {
                    this.removeListOrTarget(this.gems, item, peonTarget.items);
				} else if  (item.type === "gold-coin") {
                    this.removeListOrTarget(this.goldCoins, item, peonTarget.items);
				} else {
                    this.removeListOrTarget(this.coins, item, peonTarget.items);
				}
			}
		this.base.say(peonTarget.items.length);
        return peonTarget;
	}
};

this.getElementsPrice = function(items) {
	var price = 0;
	for (var i = 0; i < items.length; i++) {
		price += items[i].bountyGold;
	}
	return price;
};

this.getNearestBiggestElement = function(peon) {
	var biggest = peon.getNearest(this.gems);
	if (biggest === null) {
		biggest = peon.getNearest(this.goldCoins);
	}
	if (biggest === null) {
		biggest = peon.getNearest(this.coins);
	}
	return biggest;
};

this.getElementsInDistance = function(peon, items, distance) {
	var result = [];
	for (var i = 0; i < items.length; i++) {
		if (peon.distance(items[i]) <= distance) {
			result.push(items[i]);
		}  
	}
	return result;
};

	return this;
}

/////// 2. Decide which unit to build this frame. ///////
// Peons can gather gold; other units auto-attack the enemy base.
// You can only build one unit per frame, if you have enough gold.
var base = this;
var peons = base.getByType('peon');
var type;
if (peons.length < 3)
    type = 'peon';
else
    type = 'ogre';
if (base.gold >= base.buildables[type].goldCost)
    base.build(type);

/////// 1. Command peons to grab coins and gems. ///////
// You can only command peons, not fighting units.
// You win by gathering gold more efficiently to make a larger army.
// Click on a unit to see its API.
var items = base.getItems();
peons = base.getByType('peon');
var gems = base.getByType('gem');
var goldCoins = base.getByType('gold-coin');
var coins = base.getByType('coin');
base.peonsTargets = typeof base.peonsTargets == "undefined" ? [] : base.peonsTargets;


var config = {
	base : base,
  	peons : peons,
  	gems: gems,
  	goldCoins : goldCoins,
  	coins : coins,
  	peonsTargets : peonsTargets
}

var peonController = new PeonController(config);
peonController.run();
