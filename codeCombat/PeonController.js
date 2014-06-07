var peonController = {
    init : function(map) {
        this.map = map;
    },

    movePeons : function() {
        for(var i = 0; i < this.map.peons.length; i++) {
            var peonTarget = this.searchPeonTarget(this.map.peons[i].id);
            if(peonTarget !== null && peonTarget.positions.length > 0) {
                this.map.base.command(this.map.peons[i], 'move', this.map.peons[i].getNearest(peonTarget.positions));
            }
        }
    },

    searchPeonTarget : function(peonId) {
        for(var i = 0; i < this.map.peonsTargetList.length; i++) {
            if (peonId === this.map.peonsTargetList[i].id) {
                return this.map.peonsTargetList[i];
            }
        }
        return null;
    }
};
