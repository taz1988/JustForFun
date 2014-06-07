var peonTargetFinder = {
    
    init : function(map) {
        this.map = map;
    },
    
    find : function() {
        for (var i = 0; i < this.map.peons.length; i++) {
            var peonTarget = this.getTarget(this.map.peons[i]);
            if (peonTarget === null) {
                  peonTarget = {
                    id : this.map.peons[i].id,
                    positions : []
                  };
                 this.map.peonsTargetList.push(peonTarget);
            }
            if (peonTarget.positions.length == 0) {
                var item = this.getBiggestItem(this.map.peons[i]);
                this.removeItem(item);
                peonTarget.positions.push(item);
            }
        }
    },
    
    removeItem : function(item) {
        if (item.type === "gem") {
            this.map.moneyItems.gems.splice(this.map.moneyItems.gems.indexOf(item), 1);
		} else if  (item.type === "gold-coin") {
		    this.map.moneyItems.goldCoins.splice(this.map.moneyItems.goldCoins.indexOf(item), 1);
		} else {
            this.map.moneyItems.coins.splice(this.map.moneyItems.coins.indexOf(item), 1);
		}
    },
    
    getTarget : function(peon) {
        for (var i = 0; i < this.map.peonsTargetList.length; i++) {
            if (peon.id == this.map.peonsTargetList[i].id) {
                return this.map.peonsTargetList[i];
            }
        }
        return null;
    },
    
    findTarget : function(peon) {
        
    },
    
    getElementsPrice : function(items) {
	    var price = 0;
	    for (var i = 0; i < items.length; i++) {
		    price += items[i].bountyGold;
	    }
	    return price;
    },
    
    getBiggestItem : function(peon) {
	    var biggest = peon.getNearest(this.map.moneyItems.gems);
	    if (biggest === null) {
		    biggest = peon.getNearest(this.map.moneyItems.goldCoins);
	    }
	    if (biggest === null) {
	    	biggest = peon.getNearest(this.map.moneyItems.coins);
	    }
	    return biggest;
    }
};
