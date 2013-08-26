var spawn = require('child_process').spawn
var ps = null;

var start = function() {
    if(ps != null) {
        ps = spawn('arecord', ['-D', 'plughw:1,0', '-f', 'dat']);
    }
};

var stop = function() {
    if(ps) {
        ps.kill();
    }
};

var getAudioStream = function() {
    if(ps) {
        return ps.stdout;
    }
};

var getInformationStream = function() {
    if(ps) {
        return ps.stdout;
    }
};

exports.getAudioStream = getAudioStream;
exports.getInfoStream = getInformationStream;
exports.start = start;
exports.stop = stop;

