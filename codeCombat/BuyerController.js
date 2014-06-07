var buyerController = {
    
    init : function (map) {
        this.map = map;
    },

    buy : function () {
        if (this.map.peons.length < 3) {
            type = 'peon';
        } else {
            type = 'ogre';
        }
        if (this.map.base.gold >= this.map.base.buildables[type].goldCost) {
         this.map.base.build(type);
        }
    }
};
