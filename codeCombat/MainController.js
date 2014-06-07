var mainController = {

    init : function(base) {
        var map = {
            base : base,
            peons : base.getByType('peon')
        };
        map.peonsTargetList = base.peonsTargetList;
        if (typeof map.peonsTargetList === "undefined") {
            map.peonsTargetList = [];
        }
        map.choosedElements = base.choosedElements;
        if (typeof map.choosedElements === "undefined") {
            map.choosedElements = [];
        }
        this.map = map;
        this.loadMoneyItems();
        this.removeNonExistElements();
    },

    run : function() {
        this.peonTargetFinder.find();
        this.peonController.movePeons();
        this.buyerController.buy();
    },

    setBuyerController : function(buyerController) {
        this.buyerController = buyerController;
        this.buyerController.init(this.map);
    },

    setPeonTargetFinder : function(peonTargetFinder) {
        this.peonTargetFinder = peonTargetFinder;
        this.peonTargetFinder.init(this.map);
    },

    setPeonController : function(peonController) {
        this.peonController = peonController;
        this.peonController.init(this.map);
    },

    loadMoneyItems : function() {
        this.nonExistelements = this.map.choosedElements.slice(0);
        var moneyItems = {
            gems : this.removeChoosedElements(this.map.base.getByType('gem')),
            goldCoins : this.removeChoosedElements(this.map.base.getByType('gold-coin')),
            coins :  this.removeChoosedElements(this.map.base.getByType('coin')),
        };
        this.map.moneyItems = moneyItems;
    },

    removeChoosedElements : function(items) {
        var filteredItems = [];
        for (var i = 0; i < items.length; i++) {
            if (this.map.choosedElements.indexOf(items[i].id) == -1) {
                filteredItems.push(items[i]);
            } else {
                this.nonExistelements.splice(this.nonExistelements.indexOf(items[i].id), 1);
            }
        }
        return filteredItems;
    },

    removeNonExistElements : function() {
        for (var i = 0; i < this.nonExistelements.length; i++) {
            this.removeFromPeonTargetList(this.nonExistelements[i]);
            this.map.choosedElements.splice(this.map.choosedElements.indexOf(this.nonExistelements[i]), 1);
        }
    },

    removeFromPeonTargetList : function(itemId) {
        for (var i = 0; i < this.map.peonsTargetList.length; i++) {
            for (var j = 0; j < this.map.peonsTargetList[i].positions.length; j++) {
                if (this.map.peonsTargetList[i].positions[j].id === itemId) {
                    this.map.peonsTargetList[i].positions.splice(j, 1);
                    return;
                }
            }   
        }
    }
};
