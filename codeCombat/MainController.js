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
    },

    loadMoneyItems : function() {
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
            }
        }
        return filteredItems;
    }
};
