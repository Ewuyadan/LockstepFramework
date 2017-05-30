function Entity(id,deriving){
    this.id = id
    var _deriving = deriving;
    this.dead = false;
    this.Destroy = function(){
        EntityManager.Remove(this.id);
    }
}

var EntityManager = {
    var _uniqueID = 0;
    var _entities = [];

    
    function GenID(){
        _uniqueID ++;
        return _uniqueID;
    }
    // this.Update = function(){
    //     var deadList = [];
    //     for (var i = 0; i < _entities.length; i++) {
    //         var entity = _entities[i];
    //         if(entity.dead){
    //             deadList.push(entity.id);
    //         }
    //     }
    //     for (var i = 0; i < deadList.length; i++) {
    //         var id = deadList[i];
    //         this.Remove(id);
    //     }
    // }
    this.Create = function(deriving){
        _deriving = deriving;
        var entity = new Entity(GenID(),deriving);
        _entities.push(entity);

        return entity;
    }
    this.Remove = function(id){
        for (var i = 0; i < _entities.length; i++) {
            var uid = _entities[i].uid;
            if(id == uid){
                _entities.splice(i,1);
            }
        }
    }
}