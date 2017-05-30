

function UserCmd(id){
    this.id = id;
    this.angle = 0;
    this.skill = 0;
}

function FrameInfo(id){
    this.id = id;
    this.cmds = [];
    this.AddCmd = function(cmd){
        //alert(cmd.id)
        this.cmds.push(cmd);
    }
}
function Player(id){
    var _id = id;
    var _unit = UnitManager.Create();

    this.OnCmd = function(cmd){

    }
}

var GameLogic = {
    var _fps = 10;
    var _deltaTime = 1/this.fps;

    var _preTime = 0;

    var _frames = [];
    var _tail_frame_id = 0;
    var _current_frame_id = 0;
    var _players = [];


    function WaitNextFrame(){
        var frame = _frames[_current_frame_id];
        if ( frame == null){
            return null;
        }
        _current_frame_id++;
        return frame;
    }
    
    function CreatePlayer(id){
        var player = new Player(id)
        _players.push(player);
        return player;
    }
    function DispatchCmd(cmds){
        for (var i = 0; i < cmds.length; i++) {
            var cmd = cmds[i];
            var player = _players[i];
            alert(player != null);

            if(cmd != null){
                player.OnCmd(cmd);
            }
        }
    }

    this.ProcessFrame = function(frame){
        alert(frame.id == _tail_frame_id + 1)
        _tail_frame_id++;
        _frames.push(frame);
    }
    this.Loop = function(){
        var frame = WaitNextFrame();
        if(frame == null){
            return;
        }
        DispatchCmd(frame.cmds);

        UnitManager.Update(_deltaTime);
    }
}