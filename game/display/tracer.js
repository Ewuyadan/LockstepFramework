function Tracer(){
    this.id = id;

    var _dead = false;
    //var _position = new Vector3(0,0,0);
    var _entity = EntityManager.Create(this);

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
        _entity.Destroy();
    }
}

var TracerManager = {
    var _tracers = [];
    
    function CreateTracer(unit){
        var tracer = new Tracer(unit.id);
        _tracers.push(tracer);

        return tracer;
    }
    function RemoveTracer(id){
        for (var i = 0; i < _units.length; i++) {
            var uid = _units[i].uid;
            if(id == uid){
                _units.splice(i,1);
            }
        }
    }

    function UpdateTracers(){
        var deadList = [];
        for (var i = 0; i < _tracers.length; i++) {
            var tarcer = _tracers[i];
            if(tracer.isDead()){
                deadList.push(tracer.id);
            }else{
                tracer.Update();
            }
        }
        for (var i = 0; i < deadList.length; i++) {
            RemoveTracer(deadList[i]);
        }
    }
    this.Update = function(){
        var asmqueue = UnitManager.asmqueue;
        for (var i = 0; i < asmqueue.length; i++) {
            var unit = asmqueue[i];
            CreateTracer(unit);
        }
        UnitManager.asmqueue = [];

        UpdateTracers();
    }
    this.Reset = function(){
        for (var i = 0; i < _tracers.length; i++) {
            _tracers[i].DoDead();
        }
        UpdateTracers();
        alert(_tracers.length == 0)
        //_tracers = [];
    }
}
