// AnimeJS should be imported before this.


// ANIMATION TYPE MAP
const IMTA_ANIMATION = {
    LETTER_SCALE: 'letter_scale',
    WORD_SCALE: 'word_scale',
    WORD_WIGGLE: 'word_wiggle',
    LETTER_ROTATE: 'letter_rotate'
}

// PREPRATION FUNCTION MAP acc to animation type
// keys should be same as the values for IMTA_ANIMATION
const prepare = {
    'letter_scale': prepare_letter,
    'word_scale': prepare_word,
    'word_wiggle': prepare_word,
    'letter_rotate': prepare_letter
}


// ANIMATION FUNCTION MAP acc to animation type
// keys should be same as the values for IMTA_ANIMATION
const animate = {
    'letter_scale': animate_letterScale,
    'word_scale': animate_wordScale,
    'word_wiggle': animate_wordWiggle,
    'letter_rotate': animate_letterRotate
}


// SOME DEFAULTS
const DEFAULT_LETTER_SCALE = 1.5;
const DEFAULT_WORD_SCALE = 1.75;
const DEFAULR_WORD_WIGGLE_ROTATION = 15;

const DEFAULT_DURATION = 500;

const IMTA_DEFAULT_EXTRAS = {
    scale: null,
    color: null,
    rotate: null
}


// IMTA function
function imta({ htmlId, words, animation, duration, extras }) {

    if (!htmlId) return;

    // the default parameter thing wasn't working - i don't know why
    if (!animation) animation = IMTA_ANIMATION.LETTER_SCALE;
    if (!duration) duration = DEFAULT_DURATION;
    if (!words) words = [];
    if (!extras) extras = IMTA_DEFAULT_EXTRAS;

    const element = document.getElementById(htmlId);

    if (!element) return;

    // preprationSuccess true is prepration Successful.
    const preprationSuccess = prepare[animation]({ htmlElement: element, words: words, className: animation }) || false;

    // animate the things now - if prep was success
    if (preprationSuccess) return {
        animate: () => animate[animation]({
            htmlElement: element,
            scale: extras.scale || null,
            color: extras.color || null,
            rotate: extras.rotate || null
        })
    };

    // IMTA end
}






/** PREPARING FUNCTIONS
 * All preparing functions should --
 *      * start with "prepare_"
 *      * return true when successful else false
 *      * should be present in prepare constant with key name as the animation const value
 */
function prepare_letter({ htmlElement, words }) {
    if (!htmlElement) return false;
    try {
        htmlElement.innerHTML = splitIntoWords(htmlElement.textContent);

        let wordElements = htmlElement.getElementsByClassName('imta-word');

        if (isEmpty(words)) {
            for (let i = 0; i < wordElements.length; i++) {
                wordElements[i].innerHTML = splitIntoLetters(wordElements[i].textContent);
            }
        } else {
            for (let i = 0; i < wordElements.length; i++) {
                if (words.includes(wordElements[i].textContent.toString().toLowerCase())) {
                    wordElements[i].innerHTML = splitIntoLetters(wordElements[i].textContent);
                }
            }
        }
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
    return false;
}

function prepare_word({ htmlElement, words, className }) {
    if (!htmlElement) return; false
    try {
        htmlElement.innerHTML = splitIntoWords(htmlElement.textContent);

        let wordElements = htmlElement.getElementsByClassName('imta-word');

        if (isEmpty(words)) {
            for (let i = 0; i < wordElements.length; i++) {
                wordElements[i].style.display = 'inline-block';
                wordElements[i].style.transition = 'all 0.05s ease-in-out';
                wordElements[i].classList.add(className);
            }
        } else {
            for (let i = 0; i < wordElements.length; i++) {
                if (words.includes(wordElements[i].textContent.toString().toLowerCase())) {
                    wordElements[i].style.display = 'inline-block';
                    wordElements[i].style.transition = 'all 0.05s ease-in-out';
                    wordElements[i].classList.add(className);
                }
            }
        }
        // console.log(htmlElement.innerHTML);
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
    return false;
}






/** ANIMATING FUNCTIONS
 * All animating functions should --
 *      * start with "animate_"
 *      * should be present in animate constant with key name as the animation const value
 */
function animate_letterScale({ htmlElement, scale, duration, color }) {
    if (!htmlElement) return;
    if (!scale) scale = DEFAULT_LETTER_SCALE;
    anime.timeline({ loop: false })
        .add({
            targets: `#${htmlElement.id} .imta-word .imta-letter`,
            // scale: [1, 1.5, 0.7, 1.05, 0.9, 1],
            scale: [1, scale, (1 - (scale - 1) / 2), (1 + (scale - 1) / 4), 1],
            color: color || null,
            duration: duration || 800,
            elasticity: 800,
            translateX: [0, '10%', 0],
            delay: (el, i) => 45 * (i + 1),
        });
}

function animate_wordScale({ htmlElement, scale, duration, color }) {
    if (!htmlElement) return;
    if (!scale) scale = DEFAULT_WORD_SCALE;
    anime.timeline({ loop: false })
        .add({
            targets: `#${htmlElement.id} .imta-word.${IMTA_ANIMATION.WORD_SCALE}`,
            // scale: [1, scale, (1 - (scale - 1) / 2), (1 + (scale - 1) / 4), 1],
            scale: [1, scale, (1 - (scale - 1) / 2), (1 + (scale - 1) / 8), 1],
            color: color || null,
            duration: duration || 800,
            elasticity: 800,
            delay: (el, i) => 45 * (i + 1),
        });
}

function animate_wordWiggle({ htmlElement, rotate, duration, color }) {
    if (!htmlElement) return;
    anime.timeline({ loop: false })
        .add({
            targets: `#${htmlElement.id} .imta-word.${IMTA_ANIMATION.WORD_WIGGLE}`,
            // scale: [1, scale, (1 - (scale - 1) / 2), (1 + (scale - 1) / 4), 1],
            rotate: [0,
                DEFAULR_WORD_WIGGLE_ROTATION,
                0,
                -DEFAULR_WORD_WIGGLE_ROTATION,
                0,
                DEFAULR_WORD_WIGGLE_ROTATION,
                0,
                -DEFAULR_WORD_WIGGLE_ROTATION,
                0],
            color: color || null,
            duration: duration || 800,
            elasticity: 800,
            delay: (el, i) => 45 * (i + 1),
        });
}

function animate_letterRotate({ htmlElement, scale, duration, color }) {
    if (!htmlElement) return;
    if (!scale) scale = DEFAULT_LETTER_SCALE;
    anime.timeline({ loop: false })
        .add({
            targets: `#${htmlElement.id} .imta-word .imta-letter`,
            // scale: [1, 1.5, 0.7, 1.05, 0.9, 1],
            rotate: [0, 360],
            color: color || null,
            duration: duration || 800,
            elasticity: 800,
            delay: (el, i) => 45 * (i + 1),
        });
}







// SPLITTING FUNCTIONS
// split sentences to words, words to letters, in spans
function splitIntoWords(input, className = null) {
    // will split into words - span with each span having classname as "imta-word"
    if (!input || typeof (input) != 'string') return;
    input = input.trim();
    input = input.replace(/ /g, `</span> <span class="imta-word ${className || ''}">`);
    input = `<span class="imta-word ${className || ''}">${input}</span>`

    return input;
}

function splitIntoLetters(input, className = null) {
    // will split into letters - span with each span having classname as "imta-letter"
    return input.replace(/\S/g, `<span class="imta-letter ${className || ''}" style='display: inline-block; transition: all ease-in-out 0.05s'>$&</span>`);
}


// UTILITY FUNCTIONS
function isEmpty(input) {
    if (!input) return true;
    if (typeof (input) == 'string' || Array.isArray(input)) return input?.length <= 0;
    else if (typeof (input) == 'object') return Object.keys(input).length <= 0;
}