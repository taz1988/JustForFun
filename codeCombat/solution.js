

this.removeTargetedItems = function(peons, gems, goldCoins, coins) {
	for (var i = 0; i < peons.length; i++) {
        var peonTarget = this.getPeonTargets(peons[i]);
		if (peonTarget !== null) {
			for (var j = 0; j < peonTarget.items.length; j++) {
                var item = peonTarget.items[j];
				if (item.type === "gem") {
                    this.removeListOrTarget(gems, item, peonTarget.items);
				} else if  (item.type === "gold-coin") {
                    this.removeListOrTarget(goldCoins, item, peonTarget.items);
				} else {
                    this.removeListOrTarget(coins, item, peonTarget.items);
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

this.coordinatePeons = function(peons, gems, goldCoins, coins) {
	for (var i = 0; i < peons.length; i++) {
        var peonTargets = this.getPeonTargets(peons[i]);
		if (peonTargets != null && peonTargets.items.length > 0) {
			this.movePeonForwardTarget(peons[i], peonTargets);
		} else {
			peonTargets = this.findBestTargetForPeon(peons[i], gems, goldCoins, coins);
			this.movePeonForwardTarget(peons[i], peonTargets);
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
        var peonTarget = {
            id : peon.id,
            items : choosenElements     
        };
		this.peonsTargets.push(peonTarget);
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
	var biggest = this.getNearestForPeon(peon, gems);
	if (biggest === null) {
		biggest = this.getNearestForPeon(peon, goldCoins);
	}
	if (biggest === null) {
		biggest = this.getNearestForPeon(peon, coins);
	}
	return biggest;
};

this.getNearestForPeon = function(peon, items) {
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
this.peonsTargets = typeof this.peonsTargets == "undefined" ? [] : this.peonsTargets;

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



