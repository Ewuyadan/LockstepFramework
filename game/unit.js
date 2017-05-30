function Unit(id){
    this.id = id;
    var _dead = false;
    var _position = new Vector3(0,0,0);

    

    this.SetPosition(pos){
        _position = pos;
    }
    this.GetPosition(){
        return new Vector3(_position.array);
    }
    this.DoDead = function(){
        _dead = true;
    }
    this.isDead = function(){
        return _dead;
    }
    this.Update = function(dt){

    }
    this.OnDestroy = function(){
        if (this.tracer != null){
            this.tracer.DoDead();    
        }
    }
}

var UnitManager = {
    var _uniqueID = 0;
    var _units = [];
    this.asmqueue = [];

    function GenID(){
        _uniqueID ++;
        return _uniqueID;
    }
    this.Reset = function(){
        _uniqueID = 0;
        for (var i = 0; i < _units.length; i++) {
            var unit = _units[i];
            unit.DoDead();
        }
        this.Update();
        _units = [];

        this.asmqueue = [];
    }
    this.Create = function(){
        var unit = new Unit(GenID());
        _units.push(unit);

        this.asmqueue.push(unit);

        return unit;
    }
    this.Remove = function(id){
        for (var i = 0; i < _units.length; i++) {
            var uid = _units[i].uid;
            if(id == uid){
                _units.splice(i,1);
            }
        }
    }
    this.Update = function(dt){
        var deadList = [];
        for (var i = 0; i < _units.length; i++) {
            var unit = _units[i];
            if(unit.isDead()){
                deadList.push(unit.uid);
            }else{
                unit.Update(dt);
            }
        }
        for (var i = 0; i < deadList.length; i++) {
            var id = deadList[i];
            this.Remove(id);
        }
   }
}

