var base = this;
var items = base.getItems();
var peons = base.getByType("peon");
var gems = base.getByType("gem");
var goldCoins = base.getByType("gold-coin");
var coins = base.getByType("coin");
var usedItems = typeof base.usedItems === "undefined" ? [] : base.usedItems;
var targets = typeof base.targets === "undefined" ? [] : base.targets;

this.removeUsedItems = function() {
    var i;
    var index;
    for (i = 0; i < items.length; i++) {
        index = usedItems.indexOf(items[i].id); 
        if (index != -1) {
            items.splice(index, 1);
        }
    }
    for (i = 0; i < gems.length; i++) {
        index = usedItems.indexOf(gems[i].id); 
        if (index != -1) {
            gems.splice(index, 1);
        }
    }
    for (i = 0; i < goldCoins.length; i++) {
        index = usedItems.indexOf(goldCoins[i].id); 
        if (index != -1) {
            goldCoins.splice(index, 1);
        }
    }
    for (i = 0; i < coins.length; i++) {
        index = usedItems.indexOf(coins[i].id); 
        if (index != -1) {
            coins.splice(index, 1);
        }
    }
};

this.getItem = function(peon) {
    var biggest = peon.getNearest(gems);
    if (biggest === null) {
	    biggest = peon.getNearest(goldCoins);
    }
    if (biggest === null) {
    	biggest = peon.getNearest(coins);
   }
   return biggest;
};

this.getItem2 = function(peon) {
    var result = peon.getNearest(items);
    items.splice(items.indexOf(result), 1);
    return result;
}

this.getItem3 = function(peon) {
    var result = peon.getNearest(items);
    var a = items.length;
    items.splice(items.indexOf(result), 1);
    var i = 6;
    var item = peon.getNearest(items);
    while (i > 0 && item != null) {
        item = peon.getNearest(items);
        items.splice(items.indexOf(item), 1);
        i--;
    }
    return result;
}

this.getItem4 = function(peon) {
    var i;
    var target = {
        id : peon.id,
        positions : []
    };    
    for(i = 0; i < targets.length; i++) {
        if (peon.id === targets[i].id) {
            target = targets[i];
        }
    }
    if(target == null) {
        target = {
            id : peon.id,
            positions : []
        };
        
    }
    if (target.positions.length > 0) {
        for (i = 0; i < target.positions.length; i++) {
            if(target.positions[i] == peon.pos) {
                target.positions[i].splice(i, 1);
                break;
            }
        }
    }
    if (target.positions.length == 0) {
        var i = 6;
        var item = peon.getNearest(items);
        while (i > 0 && item != null) {
            target.positions.push(item);
            usedItems.push(item.id);
            item = peon.getNearest(items);
            items.splice(items.indexOf(item), 1);
            i--;
        }
    }
    return peon.getNearest(target.positions);
}

this.movePeons = function() {
    for (var i = 0; i < peons.length; i++) {
        var peon = peons[i];
        if(peon.targetPos === null || (peon.pos.x === peon.targetPos.x && peon.pos.y === peon.targetPos.y)) {
            var item = this.getItem4(peon);
            if (item !== null) {
                base.command(peon, "move", item.pos);
            }
        }
    }
};

this.buy = function() {
    if (peons.length < 3) {
            type = 'peon';
        } else {
            type = 'ogre';
        }
        if (base.gold >= base.buildables[type].goldCost) {
         base.build(type);
        }
};

this.removeUsedItems();
this.buy();
this.movePeons();
base.usedItems = usedItems;
base.targets = targets;
