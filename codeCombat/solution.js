

this.removeTargetedItems = function(peons, gems, goldCoins, coins) {
	for (var i = 0; i < peons.length; i++) {
		if (typeof peons[i].targets != "undefined") {
			for (var j = 0; j < peons[i].targets.length; i++) {
				if (peons[i].targets[j].type == "gem") {
					gems.splice(gems.indexOf(peons[i].targets[j]), 1);
				} else if  (peons[i].targets[j].type == "gem") {
					goldCoins.splice(goldCoins.indexOf(peons[i].targets[j]), 1);
				} else {
					coins.splice(goldCoins.indexOf(coins[i].targets[j]), 1);
				}
			}
		}
	}	
};

this.coordinatePeons = function(peons, gems, goldCoins, coins) {
	for (var i = 0; i < peons.length; i++) {
		if (typeof peons[i].targets !== "undefined" && peons[i].targets.length > 0) {
			this.movePeonForwardTarget(peons[i]);
		} else {
			this.findBestTargetForPeon(peons[i], gems, goldCoins, coins);
			this.movePeonForwardTarget(peons[i]);
		} 
	}	
};

this.movePeonForwardTarget = function(peon) {
	if (typeof peon.targets !== "undefined") {
		this.command(peon, 'move', peon.getNearest(peon.targets));
	}
};

this.findBestTargetForPeon = function(peon, gems, goldCoins, coins) {
	var biggestElement = this.getNearestBiggestElement(peon, gems, goldCoins, coins);
	if (biggestElement !== null) {
		var biggestElementDistance = peon.distance(biggestElement);
		var choosenElements = [biggestElement];
		var elementsBetweenPeonAndBiggestElement = null;
		if (biggestElement.type === "gem") {
			elementsBetweenPeonAndBiggestElement = this.getElementsInDistance(peon, goldCoins, biggestElementDistance);
			if (elementsBetweenPeonAndBiggestElement.length < 2) {
				elementsBetweenPeonAndBiggestElement = this.getElementsInDistance(peon, coins, biggestElementDistance);
				if (this.getElementsPrice(elementsBetweenPeonAndBiggestElement) > 5) {
					choosenElements = elementsBetweenPeonAndBiggestElement;
				}
			} else {
				choosenElements = elementsBetweenPeonAndBiggestElement;
			}
		} else if (biggestElement.type === "gold-coin") {
			elementsBetweenPeonAndBiggestElement = this.getElementsInDistance(peon, coins, biggestElementDistance);
			if (this.getElementsPrice(elementsBetweenPeonAndBiggestElement) > 5) {
					choosenElements = elementsBetweenPeonAndBiggestElement;
				}
			}
		peon.targets = choosenElements;
	}
};

this.getElementsPrice = function(items) {
	var price = 0;
	for (var i = 0; i < items.length; i++) {
		price += items[i].bountyGold;
	}
	return price;
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

this.getNearestBiggestElement = function(peon, gems, goldCoins, coins) {
	var biggest = this.getNearest(peon, gems);
	if (biggest === null) {
		biggest = this.getNearest(peon, goldCoins);
	}
	if (biggest === null) {
		biggest = this.getNearest(peon, coins);
	}
	return biggest;
};

this.getNearest = function(peon, items) {
	return peon.getNearest(items);
};

var base = this;

/////// 1. Command peons to grab coins and gems. ///////
// You can only command peons, not fighting units.
// You win by gathering gold more efficiently to make a larger army.
// Click on a unit to see its API.
var items = base.getItems();
var peons = base.getByType('peon');
var gems = base.getByType('gems');
var goldCoins = base.getByType('gold-coin');
var coins = base.getByType('coin');

this.removeTargetedItems(peons, gems, goldCoins, coins);
this.coordinatePeons(peons, gems, goldCoins, coins);

/////// 2. Decide which unit to build this frame. ///////
// Peons can gather gold; other units auto-attack the enemy base.
// You can only build one unit per frame, if you have enough gold.
var type;
if (peons.length < 3)
    type = 'peon';
else
    type = 'ogre';
if (base.gold >= base.buildables[type].goldCost)
    base.build(type);



