// Anime JS should be imported befire this.

// ANIMATION TYPE
const IMTA_INSTANCE = {
    REGULAR: 'reguler',
    EDITABLE: 'editable'
}

//ANIMATION TRIGGER
const IMTA_TRIGGER = {
    CLICK: 'click',
    HOVER: 'hover'
}

// htmlId: null,
//     animationType: IMTA_INSTANCE.REGULAR,
//     animationTrigger: '',
//     words: []

async function imtanimate({
    htmlId = null,
    animationType = IMTA_INSTANCE.REGULAR,
    animationTrigger = null,
    words = [],
    animateLoop = false,
    animationDuration = null,
    color = null,
    scale = 1.2,
    onComplete = null
}) {

    console.log(arguments);

    if (!htmlId) {
        console.log('imtanimate function | no htmlId provided');
        return;
    }

    function localAnimate(onCompleteUser = onComplete, onCompleteLocal = null) {
        animate({
            htmlId: htmlId,
            animationDuration: animationDuration,
            animateLoop: animateLoop,
            color: color,
            onComplete: () => {
                if (onCompleteLocal && typeof (onCompleteLocal) == 'function') onCompleteLocal();
                if (onCompleteUser && typeof (onCompleteUser) == 'function') onCompleteUser();
            }
        });
    }

    // console.log(arguments);
    const element = document.getElementById(htmlId);

    element.innerHTML = wordsToSpan(element.textContent);

    let wordsToFocus = [];

    let wordSpans = document.getElementsByClassName('imta-word');

    let hoverDisabled = false;

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


    if (animationTrigger == IMTA_TRIGGER.CLICK) {
        element.addEventListener('click', () => { localAnimate() });
    } else if (animationTrigger == IMTA_TRIGGER.HOVER) {
        element.addEventListener('mouseover', () => {
            if (!hoverDisabled) {
                hoverDisabled = true;
                localAnimate(onComplete, () => { hoverDisabled = false })
            }
        });
    }


    // localAnimate();

    return {
        animate: localAnimate
    };
}

function wordsToSpan(data) {
    if (!data || typeof (data) != 'string') return;
    // data = data.trimStart().trimEnd();
    data = data.replace(/ /g, '</span> <span class="imta-word">');
    data = `<span class="imta-word">${data}</span>`;
    return data;
}

function charToSpan(data) {
    return data.replace(/\S/g, "<span class='imta-letter' style='display: inline-block'>$&</span>");
}


// animejs function
function animate({
    htmlId = null,
    animationDuration = 800,
    loop = false,
    color = null,
    onComplete = null
}) {
    if (!htmlId) {
        console.log('animate function | no htmlId provided');
        return;
    }

    if (animationDuration > 1000) animationDuration = 1000;

    anime.timeline({ loop: loop || false })
        .add({
            targets: `#${htmlId} .imta-word .imta-letter`,
            scale: [1, 1.4, 1],
            color: color,
            duration: animationDuration || 800,
            elasticity: 600,
            delay: (el, i) => 45 * (i + 1),
            complete: () => { if (onComplete && typeof (onComplete == 'function')) onComplete() }
        });
}


// utility functions
function isEmpty(data) {
    if (!data) return true;
    return data.length == 0;
}

