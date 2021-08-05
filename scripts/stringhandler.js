// JavaScript source code

const iter = 1000;

let numHits = 0;
let numHitsThresh = 15;
const numHitsThresh_Continue = 30;

let textBlockSection = 0;

function ScrambleText(stringArray, creationNode) {
    // re-orders array, places on screen and attaches visual/audio triggers

    let arraylength = stringArray.length - 1;
    let index = getRandomInt(0, arraylength);

    let newSpan = document.createElement("span");
    newSpan.className = "hidden introWords";
    newSpan.innerHTML = stringArray[index] + " ";
    newSpan.style.color = "rgb(" + getRandomInt(100, 255) + ", " + getRandomInt(100, 255) + ", " + getRandomInt(100, 255) + ")";

    MakeAudioTrigger(newSpan, 'marimb', 15, 0.01);

    newSpan.addEventListener("mouseenter", function () {
        newSpan.className = "hidden-hover introWords";
        TriggerNumHit();
    });

    newSpan.addEventListener("click", function () {
        let index = getRandomInt(0, arraylength);
        newSpan.innerHTML = stringArray[index] + " ";
        TriggerNumHit();
    });

    newSpan.addEventListener("mouseout", function () {
        newSpan.className = "hidden-remains introWords";
        
        //
        // if (numHits < numHitsThresh_Continue) {
        //     newSpan.className = "hidden-past introWords";
        // }
        // else {
        //     newSpan.className = "hidden-remains introWords";
        // }
    });
    creationNode.appendChild(newSpan);

}


function TriggerNumHit() {

    if (numHits >= numHitsThresh-1) {
        textBlockSection = (textBlockSection + 1) % textblocks.length;
        LoadStrings(textBlockSection); 

        numHitsThresh += 5; // number of numHits needed to go to next para increases each time it moves on
        numHits = 0;
    }
    numHits++;
}


function MakeAudioTrigger(el, audioclip, numsamps, startingVol) {

    el.addEventListener("mouseenter", function () {
        PlayAudioClip(audioclip, numsamps, startingVol);
    });

    el.addEventListener("click", function () {
        PlayAudioClip(audioclip, numsamps, startingVol);
    });


}

function LoadStrings(section) {

    let textNode = document.getElementById('textNode');
    textNode.remove();
    textNode = document.createElement('div');

    textNode.id = 'textNode';
    const introNode = document.getElementById('intro');
    introNode.appendChild(textNode);

    // puts new text in
    let strings = textblocks[section].split('/');

    for (var i = 0; i < iter; ++i) {
        ScrambleText(strings, textNode);
    }

}

// Paragraphs
const textblocks = [
    // Part 1: thank you (so many great applications!)
    "hi xavier / hi xavier, / dear xavier / hi xavier! / dear xavier, / dear applicant, / dear xavier, / dear xavier, / dear xavier, / hello, / hello xavier, / hello xavier / hello, / hi,",
    "thanks a lot / thanks so much / thank you / thank you /  thank you / very much / many thanks /  thank you again / thank you / very much / thank you / many thanks /  so much / ",
    "for the / for your / and your  / for your / for our / for your / for applying to / for your recent application to / for this position / for your recent proposal /  for applying /  for your application / for taking the time / for your time / for sharing your work with us / the time / for your / recent application to /",
    "sound designer / role / application / patience! / recent proposal / radio arts / catalyst / residency / opportunity / application / create artwork / the lowry's / live now / commission programme / to hcmf shorts / immersive audio  / r&d / open call / barbican theatre / open lab / jerwood arts / live work fund / covid-19 commission / open call / to be part of / unshut 2020 / the 1927 bursary / residency / the bac-rcssd / aural-oral dramaturgies project / the reach showcase /",
    "it took a long time / to get / through everything, / since / it has taken longer than / some difficult / decisions / had to be made / some / difficult decisions / had to be made. / a difficult process / rather hard, / selecting just one /  much more difficult / than anticipated / highly competitive /extremely tough / humbling / very hard /" ,
    "a wealth of / a huge number of / a high number of / the volume and quality / a lot of applications / a very high standard / highest ever / number of applications / very high standard so / excellent standard. / over 25 proposals / huge number /  large number / unprecedented / unprecedented number / 1283 in total / over 200 / over 100 / over 400 / just 6 / 82 /" ,
    "a lot of great music. /  high quality applications / very high / great piece of work. / have been incredibly high /  standard of the proposals / astounded / really impressed  / incredibly high standard / blown away ",

    // Part 2: unfortunately, unfortunately
    " unfortunately / on this occasion / we regret to inform you / unfortunately / after careful consideration / i'm sorry / we have decided / on this occasion / unfortunately / decided not to / this time / unfortunately / we decided / unfortunately / unfortunately / i'm afraid to say / unfortunately / on this occasion / i'm sorry to say /  this year /",
    "not successful / haven't been selected / unsuccessful / not be taking it further / has been unsuccessful / have not / been selected / on this occasion / not to award / the bursary / take your / application further / did not make / the final selection / another candidate  / the next stage / we won't / be able to / invite you to / chat with natalie further / not successful /",
    "we do not / we are unable to / we are unable to / we are not / offering / offer / provide / individual feedback /  personal feedback / meaningful feedback / any feedback / on the applications / more detailed feedback / detailed feedback /",
    "unfortunately / due to the amount of applications / very large number / many good ones / limited number of slots / weren't responsible / very hard / limited resources / however / level of competition / extremely strong / capacity constraints / volume of submissions / staffing resource /",
    "we hope / you manage / another project / thank you so much / we understand / hugely frustrating / we thank you / please / down-heartened / know how important feedback is / however / disappointing! / we appreciated / the thought and effort /  we hope / a little insight / all the best / future endeavors / please / re-apply / in the future / ",

    // Part 3: disclaimer
    "confidential information / this email / and / any files / are confidential /contain privileged /  copyright information / the information / contained / in it / with it / notify us / disclaimer / disclaimer / this email / this message / transmitted /    than to / e-mail / e-mail / by mistake / this e-mail / solely for / the addressee / strictly confidential / legally privileged / or any attachments / freedom of information / fascimile / ",
    "if / you are not / for any purpose / you must not copy, distribute or use / you must not present  / this / from / the sender. / the intended / recipient  / other / message / to / another party / without / gaining permission / delete this / e-mail / from / your system / if / you are not / the addressee / do not print / re-transmit / store / act in reliance / e-mail back / immediately and / permanently delete / it / strictly prohibited / otherwise / nor make use of its contents / you may not / unless /",    
]


// old para: "Hi Xavier, Thanks a lot for your application, and your patience! It took a long time to get through everything, especially since we received a huge number of applications for this position with a lot of great music. Dear Applicant, Thank you for applying to create artwork for the We regret to inform you that you were not successful in your application. We received a wealth of high quality applications and the standard of the proposals was very high. Many apologies for the delay in replying - it has taken longer than we hoped as the volume and quality of proposal have been incredibly high and we really could have put forward almost any submissions and put on a great piece of work. Dear Xavier, Thank you very much for your recent application to The Lowry's Live Now commission programme."



const para_unfortunately = "Unfortunately we have decided to go with another candidate. We hope you manage to find another project to join! Hi Xavier, Thank you so much for your patience and application. We understand that is hugely frustrating and we thank you so much for your time and effort in putting together an application. Please don't be down-heartened, we want to keep hearing from you and about you. Unfortunately, due to limited resources, we are unable to provide any feedback on the applications. Unfortunately we are only able to select one piece of work, and I'm afraid to say yours hasn't been chosen this time, I'm sorry I know this will be disappointing! We appreciated the thought and effort that went into all the applications we received but unfortunately on this occasion we weren't able to take your project through to the next stage. Your previous experience is interesting. However, the level of competition across the proposals was extremely strong; we ultimately felt that other applications were a better fit for this particular opportunity. Due to capacity constraints we won't be able to give more detailed feedback on your application but we hope this gives you a little insight into our decision making. We'd like to thank you again for your interest and wish you all the best for your future endeavors. ";

const para_disclaimer = "Disclaimer - This email and any files transmitted with it are confidential and contain privileged or copyright information. You must not present this message to another party without gaining permission from the sender.If you are not the intended recipient you must not copy, distribute or use this email or the information contained in it for any purpose other than to notify us. Disclaimer This message contains confidential information and is intended only for the individual named. If you are not the named addressee you should not disseminate, distribute or copy this e-mail. Please notify the sender immediately by e-mail if you have received this e-mail by mistake and delete this e-mail from your system.";


