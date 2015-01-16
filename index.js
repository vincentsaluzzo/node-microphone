var isMacOrWin = require('os').type() == 'Darwin' || require('os').type().indexOf('Windows') > -1;
var spawn = require('child_process').spawn
var PassThrough = require('stream').PassThrough;
var lame = require('lame');

var ps = null;

var audio = new PassThrough;
var info = new PassThrough;

var start = function(options) {
    options = options || {};
    
    if(ps == null) {
        ps = isMacOrWin
        ? spawn('sox', ['-d', '-t', 'dat', '-p'])
        : spawn('arecord', ['-D', 'plughw:1,0', '-f', 'dat']);

        if(options.mp3output === true) {
            var encoder = new lame.Encoder( {
                channels: 2,
                bitDepth: 16,
                sampleRate: 44100
            });

            ps.stdout.pipe(encoder);
            encoder.pipe(audio);
            ps.stderr.pipe(info);

        } else {
            ps.stdout.pipe(audio);
            ps.stderr.pipe(info);

        }
    }
};

var stop = function() {
    if(ps) {
        ps.kill();
        ps = null;
    }
};

exports.audioStream = audio;
exports.infoStream = info;
exports.startCapture = start;
exports.stopCapture = stop;
