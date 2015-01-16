## Information

<table>
<tr> 
<td>Package</td><td>microphone</td>
</tr>
<tr>
<td>Description</td>
<td>microphone is a simple module that use `arecord` ALSA tools on Linux or SoX on OSX & Windows method to capture sound from a USB Microphone</td>
</tr>
</table>

## Dependencies

This library need

* ALSA tools installed on the machine (`sudo apt-get install alsa-utils`) **for Linux**
* SoX Tools installed on the machine **for Windows or OSX**

## Usage

#### Simple example

A simple example which capture sound and redirect it to stdout.

    var mic = require('microphone');
    
    mic.startCapture();
    
    mic.audioStream.on('data', function(data) {
        process.stdout.write(data);
    });

## API

#### startCapture(options)

Start the process and pipe the stdout of ALSA `arecord` tool to audioStream

By default, the outputing sound are PCM WAVE format, if you want a MP3 format 
pass `true` as `mp3Output` in the options passed in arguments. 

(Example : `mic.startCapture({'mp3output' : true});`)

#### stopCapture();

Stop the process 

#### audioStream

Give the audio stream where sound captured will be pushed

#### infoStream

Give an information stream which display informations printed on `stderr` by the process

## CONTRIBUTORS

* @JiaJian *(for Windows support)*
* @guileen *(for OSX support)*
* @jrf0110


## LICENSE

(MIT License)

Copyright (c) 2012 Vincent Saluzzo <vincentsaluzzo@me.com>

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.