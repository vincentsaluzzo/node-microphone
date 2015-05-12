var isMacOrWin = require('os').type() == 'Darwin' || require('os').type().indexOf('Windows') > -1;
var spawn = require('child_process').spawn
var PassThrough = require('stream').PassThrough;
var lame = require('lame');

var ps = null;

var audio = new PassThrough;
var info = new PassThrough;

var start = function(options) {
    options = options || {};
    var alsa_format = options.alsa_format || 'dat',
        alsa_device = options.alsa_device || 'plughw:1,0',
        alsa_addn_args = options.alsa_addn_args || [],
        sox_format = options.sox_format || 'dat',
        sox_addn_args = options.sox_addn_args || [],
        mp3_channels = options.mp3_channels || 2,
        mp3_bitDepth = options.mp3_bitDepth || 16,
        mp3_sampleRate = options.mp3_sampleRate || 44100;

    if(ps == null) {
        ps = isMacOrWin
        ? spawn('sox', ['-d', '-t', sox_format, '-p'].concat(sox_addn_args))
        : spawn('arecord', ['-D', alsa_device, '-f', alsa_format].concat(alsa_addn_args));

        if(options.mp3output === true) {
            var encoder = new lame.Encoder( {
                channels: mp3_channels,
                bitDepth: mp3_bitDepth,
                sampleRate: mp3_sampleRate
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
