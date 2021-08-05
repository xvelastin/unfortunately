import * as Tone from 'tone'

///// *** TONE GEN ***** ///

// ** Mixer ** //
const outputVol = new Tone.Volume().toDestination();

// ** FX ** //
const tremolo = new Tone.Tremolo(7, 0.9).start();
const chorus = new Tone.Chorus(4, 2.5, 0.3).start();
const reverb = new Tone.Reverb(3);

// ** Instruments ** //
const membrane = new Tone.PolySynth(Tone.MembraneSynth)
const sine = new Tone.PolySynth(Tone.Synth)


function init() {
    Tone.start();
    sine.triggerAttackRelease("C3", 2);
    sine.chain(reverb, outputVol);
}

