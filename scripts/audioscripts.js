
// JavaScript source code



const maxVoices = 32;
var currentVoice = 0;
var voices = [];
var isMuted = false;


function voiceinit() {
    // Initialises channels (voices) based on max voices number - this keeps processing down.

    for (var i = 0; i < maxVoices; ++i) {
        let newVoice = new Audio();
        audioContainer.appendChild(newVoice);
        newVoice.id = 'audio_channel-' + i;
        newVoice.className = 'audio_channel';
        voices.push(newVoice);

    }
    
}

function StartAudio(filename, startingVolume, looping) {
    let newAudioObj = new Audio();
    audioContainer.appendChild(newAudioObj);

    newAudioObj.src = 'audio/' + filename + '.mp3';
    newAudioObj.id = 'audio.' + filename;
    newAudioObj.className = 'new_audio_channel';
    newAudioObj.volume = startingVolume;
    newAudioObj.loop = looping; 

    newAudioObj.play();

    
}




function PlayAudioClip(base_filename, numberofsamples, startingVolume) {

    let i = getRandomInt(1, numberofsamples);
    let clipFileName = base_filename + "_" + i + ".mp3";

    let selectedVoice = voices[currentVoice];      // assigns the next open voice to the selected clip
    selectedVoice.src = 'audio/' + clipFileName;
    selectedVoice.id = 'audio.' + clipFileName;
    selectedVoice.volume = startingVolume;
    selectedVoice.play();

    currentVoice = (currentVoice + 1) % maxVoices;      // continues the count %maxvoices
    
}

function ChooseAndStartAudio(basename, numberofsamples, startingVolume) {
    // Choose an audio clip from a sample bank with the syntax [samplename] + "_" + [sample#] + .mp3.
    
    PlayAudioClip(clipFileName, startingVolume);
}


function MakeAudioTrigger(el, audioclip, numsamps, startingVol) {

    el.addEventListener("mouseenter", function () {
        PlayAudioClip(audioclip, numsamps, startingVol);
        if (textBlockSection > 8) PlayAudioClip(audioclip, numsamps, startingVol);
        if (textBlockSection > 13) PlayAudioClip(audioclip, numsamps, startingVol);
    });

    el.addEventListener("click", function () {
        PlayAudioClip(audioclip, numsamps, startingVol);
    });


}





function FadeAudio(audioID, targetVol, duration) {

    // TODO: can't get a fade cancel to work
    clearInterval(TriggerSegmentFader);
    clearTimeout(StopSegmentFader);
    

    audioID = 'audio.' + audioID;                           // passes by ID so it can be put through via buttons etc
    let audioToFade = document.getElementById(audioID);

    const grain = 10;                                       // resolution of fade (saves processing when > 1)
    duration = duration * 1000;                             // to ms

    let startingVol = audioToFade.volume;
    let distanceToFade = targetVol - startingVol;
    let volsegment = distanceToFade / (duration / grain);   // splits fade into segments, for setInterval to proceed with per every [grain] ms.

    //if (startingVol == targetVol) return;

    console.log("FadeAudio triggered on " + audioID + ". Fading from " + startingVol + " to " + targetVol + " over " + duration / 1000 + " seconds.");

    // Start Fade Process //

    var fadeVol = 0; // relative volume from start of fade to end of fade
    var newTotalVol; // final volume adjusted for minimum

    var TriggerSegmentFader = setInterval(function () {
        segmentFader();
    }, grain);

    var StopSegmentFader = setTimeout(function () {
        clearInterval(TriggerSegmentFader);
    }, duration);


    function segmentFader() {
        fadeVol += volsegment;
        newTotalVol = Math.min(Math.max(0, fadeVol + startingVol), 1);
        audioToFade.volume = newTotalVol;
    }

                                                


}






function MuteAudioOutput() {
    isMuted = !isMuted;

    let newVol = isMuted ? 0 : 1;
    console.log('ismuted = ' + isMuted + ' || newVol = ' + newVol);

    for (var i = 0; i < voices.length; ++i) {
        FadeAudio(voices[i].id, newVol, 0.1);
    }

    let newAudioObjects = document.getElementsByClassName('new_audio_channel');
    for (var i = 0; i < newAudioObjects.length; ++i) {
        FadeAudio(newAudioObjects[i].id, newVol, 0.1);
    }

}



// Static funcs

function ConvertAtoDb(amp) {
    var db;
    if (amp > ConvertDbtoA(-70)) {
        db = 20 * Math.log(amp) / Math.log(10);
    }
    else db = -70;
    return db;
}

function ConvertDbtoA(db) {
    let amp = Math.pow(10, db / 20);
    return amp;
}





