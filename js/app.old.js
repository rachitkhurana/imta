// Anime JS should be imported befire this.

// ANIMATION TYPE
const IMTA_INSTANCE = {
    REGULAR: 'reguler',
    EDITABLE: 'editable'
}

//ANIMATION TRIGGER
const IMTA_TRIGGER = {
    CLICK: 'click',
    HOVER: 'mouseover'
}

const SCALE_REGULAT_IMTA = 1.5;
const DURATION_REGULAT_IMTA = 800;

function imtanimate({
    htmlId = null,
    animationType = IMTA_INSTANCE.REGULAR,
    animationTrigger = null,
    words = [],
    animateLoop = false,
    animationDuration = null,
    color = null,
    scale = null,
    onComplete = null
}) {

    if (!htmlId) {
        console.log('imtanimate function | no htmlId provided');
        return;
    }

    let hoverDisabled = false;

    function localAnimate(onCompleteUser = onComplete, onCompleteLocal = null) {
        regular_animate({
            htmlId: htmlId,
            animationDuration: animationDuration,
            animateLoop: animateLoop,
            color: color,
            scale: scale,
            onComplete: () => {
                if (onCompleteLocal && typeof (onCompleteLocal) == 'function') onCompleteLocal();
                if (onCompleteUser && typeof (onCompleteUser) == 'function') onCompleteUser();
            }
        });
    }

    // console.log(arguments);
    const element = document.getElementById(htmlId);

    prepareWordsImtaRegular(element, words);

    generateTrigger(element, animationTrigger, localAnimate, onComplete);

    return {
        animate: localAnimate
    };
}



// IMTA Regular prepare words to animate
function prepareWordsImtaRegular(element, words) {
    element.innerHTML = wordsToSpan(element.textContent);

    let wordsToFocus = [];

    let wordSpans = document.getElementsByClassName('imta-word');

    if (isEmpty(words)) {
        for (let i = 0; i < wordSpans.length; i++) {
            wordsToFocus.push(wordSpans[i]);
        }
    } else {
        for (let i = 0; i < wordSpans.length; i++) {
            if (words.includes(wordSpans[i].textContent.toString().toLowerCase())) {
                wordsToFocus.push(wordSpans[i]);
            }
        }
    }

    for (let i = 0; i < wordsToFocus.length; i++) {
        wordsToFocus[i].style['display'] = 'inline-block';
        wordsToFocus[i].innerHTML = charToSpan(wordsToFocus[i].textContent);
    }
}
// IMTA Regular prepare words to animate end


// Trigger Generation
function generateTrigger(element, trigger) {
    if (isEmpty(arguments)) return;

    element.addEventListener(trigger, () => {
        for (let i = 2; i < arguments.length; i++) {
            if (arguments[i] && typeof (arguments[i] == 'function')) arguments[i]();
        }
    });
}
// Trigger Generation end


// Splitting functions
function wordsToSpan(data) {
    if (!data || typeof (data) != 'string') return;
    // data = data.trimStart().trimEnd();
    data = data.replace(/ /g, '</span> <span class="imta-word">');
    data = `<span class="imta-word">${data}</span>`;
    return data;
}

function charToSpan(data) {
    return data.replace(/\S/g, "<span class='imta-letter' style='display: inline-block; transition: all ease-in-out 0.05s'>$&</span>");
}
// Splitting functions end





// animejs function
function regular_animate({
    htmlId = null,
    animationDuration = DURATION_REGULAT_IMTA,
    loop = false,
    color = null,
    scale = SCALE_REGULAT_IMTA,
    onComplete = null
}) {
    if (!htmlId) {
        console.log('animate function | no htmlId provided');
        return;
    }
    if (!scale) scale = SCALE_REGULAT_IMTA;
    if (animationDuration > 1000) animationDuration = 1000;

    console.log(scale);

    anime.timeline({ loop: loop || false })
        .add({
            targets: `#${htmlId} .imta-word .imta-letter`,
            scale: [1, scale, (1 - (scale - 1) / 2), 1],
            color: color,
            duration: animationDuration || 800,
            elasticity: 600,
            translateX: [0, '25%', 0],
            translateY: [0, -20, 0],
            delay: (el, i) => 45 * (i + 1),
            complete: () => { if (onComplete && typeof (onComplete == 'function')) onComplete() }
        });
}






// utility functionsw
function isEmpty(data) {
    if (!data) return true;
    return data.length == 0;
}

