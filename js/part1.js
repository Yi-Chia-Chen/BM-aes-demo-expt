// Yi-Chia Chen


// ######## ##     ## ########  ########
// ##        ##   ##  ##     ##    ##
// ##         ## ##   ##     ##    ##
// ######      ###    ########     ##
// ##         ## ##   ##           ##
// ##        ##   ##  ##           ##
// ######## ##     ## ##           ##

const TYPE = 'aes';
const SUBJ_NUM_FILE = 'subjNum_' + EXPERIMENT_NAME + '.txt';
const TRIAL_FILE = TYPE + 'Trial_' + EXPERIMENT_NAME + '.txt';
const SUBJ_FILE = TYPE + 'Subj_' + EXPERIMENT_NAME + '.txt';
const VISIT_FILE = TYPE + 'Visit_' + EXPERIMENT_NAME + '.txt';
const ATTRITION_FILE = TYPE + 'Attrition_' + EXPERIMENT_NAME + '.txt';

const SUBJ_NUM_SCRIPT = '../subjNum.php';
const SAVING_SCRIPT = '../save.php';
const GET_RECORD_SCRIPT = '../getRecord.php';
const UPDATE_RECORD_SCRIPT = '../updateRecord.php';

const BLOCK_N = 1;
const TRIAL_LIST = CREATE_RANDOM_REPEAT_BEGINNING_LIST(SHUFFLE_ARRAY(stim_list), REPEAT_TRIAL_N);

var instr, subj, trial;
var instr_options, trial_options;


// ########  ########    ###    ########  ##    ##
// ##     ## ##         ## ##   ##     ##  ##  ##
// ##     ## ##        ##   ##  ##     ##   ####
// ########  ######   ##     ## ##     ##    ##
// ##   ##   ##       ######### ##     ##    ##
// ##    ##  ##       ##     ## ##     ##    ##
// ##     ## ######## ##     ## ########     ##

$(document).ready(function() {
    subj = new subjObject(subj_options); // getting subject number
    subj.id = 'demo';
    if (subj.phone) { // asking for subj.phone will detect phone
        $('#instrText').html('It seems that you are using a touchscreen device or a phone. Please use a laptop or desktop instead.<br /><br />If you believe you have received this message in error, please contact the experimenter at yichiachen@ucla.edu<br /><br />Otherwise, please switch to a laptop or a desktop computer for this experiment.');
        $('#nextButton').hide();
        $('#instrBox').show();
    } else {
        instr = new instrObject(instr_options);
        instr.start();
        trial_options['subj'] = subj;
        trial = new trialObject(trial_options);
    }
});

//  ######  ##     ## ########        ## ########  ######  ########
// ##    ## ##     ## ##     ##       ## ##       ##    ##    ##
// ##       ##     ## ##     ##       ## ##       ##          ##
//  ######  ##     ## ########        ## ######   ##          ##
//       ## ##     ## ##     ## ##    ## ##       ##          ##
// ##    ## ##     ## ##     ## ##    ## ##       ##    ##    ##
//  ######   #######  ########   ######  ########  ######     ##

const SUBJ_TITLES = ['num',
                     'date',
                     'startTime',
                     'id',
                     'userAgent',
                     'endTime',
                     'duration',
                     'instrQAttemptN',
                     'instrReadingTimes',
                     'quickReadingPageN',
                     'hiddenCount',
                     'hiddenDurations',
                     'serious',
                     'problems',
                     'inView',
                     'viewportW',
                     'viewportH'
                    ];

function HANDLE_VISIBILITY_CHANGE() {
    if (document.hidden) {
        subj.hiddenCount += 1;
        subj.hiddenStartTime = Date.now();
    } else  {
        subj.hiddenDurations.push((Date.now() - subj.hiddenStartTime)/1000);
    }
}

function SUBMIT_DEBRIEFING_Q() {
    subj.serious = $('input[name=serious]:checked').val();
    subj.problems = $('#problems').val();
    var open_ended_list = [subj.problems];
    var all_responded = CHECK_IF_RESPONDED(open_ended_list, [subj.serious]);
    if (all_responded) {
        for (var i = 0; i < open_ended_list.length; i++) {
            open_ended_list[i] = open_ended_list[i].replace(/(?:\r\n|\r|\n)/g, '<br />');
        }
        subj.instrQAttemptN = instr.qAttemptN['only'];
        subj.instrReadingTimes = instr.readingTimes;
        subj.quickReadingPageN = subj.instrReadingTimes.filter(d => d < INSTR_READING_TIME_MIN).length;
        $('#questionsBox').hide();
        $('#part2Link').attr('href', '../part2/');
        $('#debriefingBox').show();
        $('html')[0].scrollIntoView();
    } else {
        $('#Qwarning').text('Please answer all questions to complete the experiment. Thank you!');
    }
}

var subj_options = {
    titles: SUBJ_TITLES,
    viewportMinW: VIEWPORT_MIN_W,
    viewportMinH: VIEWPORT_MIN_H,
    handleVisibilityChange: HANDLE_VISIBILITY_CHANGE
};


// #### ##    ##  ######  ######## ########
//  ##  ###   ## ##    ##    ##    ##     ##
//  ##  ####  ## ##          ##    ##     ##
//  ##  ## ## ##  ######     ##    ########
//  ##  ##  ####       ##    ##    ##   ##
//  ##  ##   ### ##    ##    ##    ##    ##
// #### ##    ##  ######     ##    ##     ##

var instr_text = new Array;
instr_text[0] = "Welcome!<br /><br />We all often notice things differ in how beautiful they look. This study is about that!<br /><br />We are a bunch of scientists fascinated by the human aesthetic experience, and we want to learn about people's visual aesthetics on movements.";
instr_text[1] = "Your contributions may help in analyzing art, improving AI, and designing things around us in everyday life!<br /><br />And, most importantly, we hope this is fun for you, too!";
instr_text[2] = 'Please help us by reading the instructions in the next few pages carefully, and avoid using the refresh or back buttons.';
instr_text[3] = 'Now, please maximize your browser window.';
instr_text[4] = 'This is the first part of the 40-min study, which takes about 20 minutes.';
instr_text[5] = "Here's what your job is in the first part: you will be shown " + INSTR_TRIAL_N + ' movies of a "creature", one at a time. Here is an example:';
instr_text[6] = 'As you have seen, the "creature" is only illustrated with some moving dots: Those dots were on the body of the creature, and thus moved as the creature would move.';
instr_text[7] = "We are interested in how <strong>visually pleasing</strong> you find each creature's movement to be.<br /><br />In other words, how good/beautiful do you think the movements look?";
instr_text[8] = 'Six options will be available below the movie as six buttons (as in below). Just click one of the options based on your preference.';
instr_text[9] = "Sometimes, it might feel awkward to explicitly rate the movements.<br /><br />Don't worry about it too much: we're really just interested in your initial gut reaction.";
instr_text[10] = 'To give you a sense of what you will be seeing, see 4 example movies below.<br /><br />Based on these examples, please try to use the full range of the 6 options in your ratings.';
instr_text[11] = "The next page is a quick instruction quiz. (It's very simple!)";
instr_text[12] = ''; // instruction question 1
instr_text[13] = "Great! You can press SPACE to start. Please stay focus after you start (Don't switch to other windows or tabs!)";

const INSTR_FUNC_DICT = {
    0: SHOW_TASTE_IMG,
    1: HIDE_INSTR_IMG,
    3: SHOW_MAXIMIZE_WINDOW,
    4: HIDE_INSTR_IMG,
    5: SHOW_PRACTICE_MOVIE,
    6: HIDE_PRACTICE_MOVIE,
    8: SHOW_RATING_BUTTONS,
    9: HIDE_RATING_BUTTONS,
    10: SHOW_EXAMPLE_MOVIES,
    11: HIDE_EXAMPLE_MOVIES,
    12: SHOW_INSTR_QUESTION,
    13: SHOW_CONSENT,
};

function SHOW_INSTR_IMG(file_name) {
    $('#instrImg').attr('src', STIM_PATH + file_name);
    $('#instrImg').css('display', 'block');
}

function HIDE_INSTR_IMG() {
    $('#instrImg').css('display', 'none');
}

function SHOW_TASTE_IMG() {
    SHOW_INSTR_IMG('instr_taste.jpg');
}

function SHOW_MAXIMIZE_WINDOW() {
    SHOW_INSTR_IMG('maximize_window.png');
}

function SHOW_PRACTICE_MOVIE() {
    $('#instrVid').css('display', 'block');
    $('#instrVid')[0].play();
}

function HIDE_PRACTICE_MOVIE() {
    $('#instrVid')[0].pause();
    $('#instrVid').hide();
}

function SHOW_RATING_BUTTONS() {
    $('#ratingExample').show();
}

function HIDE_RATING_BUTTONS() {
    $('#ratingExample').hide();
}

function SHOW_EXAMPLE_MOVIES() {
    $('.instrVidContainer').show();
    $( ".instrExamples" ).each(function() {
        $(this).get(0).play();
    });
}

function HIDE_EXAMPLE_MOVIES() {
    $( ".instrExamples" ).each(function() {
        $(this).get(0).pause();
    });
    $('.instrVidContainer').hide();
}

function SHOW_INSTR_QUESTION() {
    $('#instrBox').hide();
    $('#instrQBox').show();
}

function SUBMIT_INSTR_Q() {
    var instrChoice = $('input[name="instrQ"]:checked').val();
    if (typeof instrChoice === 'undefined') {
        $('#instrQWarning').text('Please answer the question. Thank you!');
    } else if (instrChoice != 'Pleasing') {
        instr.qAttemptN['only'] += 1;
        $('#instrText').html('You have given an incorrect answer. Please read the instructions again carefully.');
        $('#instrBox').show();
        $('#instrQBox').hide();
        $('input[name="instrQ"]:checked').prop('checked', false);
        instr.index = 0;
    } else {
        instr.next();
        $('#instrQBox').hide();
        $('#instrBox').show();
    }
}

function SHOW_CONSENT() {
    $('#nextButton').hide();
    $('#consentBox').show();
    $('#instrBox').attr('id', 'instrBoxScroll');
    $('#instrBoxScroll').show();
    $(document).keyup(function(e) {
        if (e.which == 32) { // the 'space' key
            $(document).off('keyup');
            $('#instrBoxScroll').attr('id', 'instrBox');
            $('#instrBox').hide();
            $('#consentBox').hide();
            SHOW_BLOCK();
        }
    });
}

instr_options = {
    text: instr_text,
    funcDict: INSTR_FUNC_DICT,
    qConditions: ['only']
};


// ######## ########  ####    ###    ##
//    ##    ##     ##  ##    ## ##   ##
//    ##    ##     ##  ##   ##   ##  ##
//    ##    ########   ##  ##     ## ##
//    ##    ##   ##    ##  ######### ##
//    ##    ##    ##   ##  ##     ## ##
//    ##    ##     ## #### ##     ## ########

const TRIAL_TITLES = [
    'num',
    'date',
    'subjStartTime',
    'trialNum',
    'ratingType',
    'stimName',
    'inView',
    'response',
    'rt'];

function SHOW_BLOCK() {
    trial.ratingType = TYPE;
    trial.trialNum = -trial.pracTrialN;
    trial.pracList = PRACTICE_LIST.slice();
    trial.trialList = TRIAL_LIST.slice();
    $('#instrBox').hide();
    $('.ratingButton').hide();
    $('#trialBox').show();
    subj.detectVisibilityStart();
    trial.run();
}

function TRIAL_UPDATE(formal_trial, last, this_trial, next_trial, path) {
    trial.stimName = this_trial;
    $('#progress').text(trial.progress);
    $('#testVid source').attr('src', path + this_trial);
    $('#testVid')[0].load();
    $('#testVid').on('ended', RESPONSE_START);
    if (!last) {
        BUFFER_VIDEO($('#bufferVid')[0], path+next_trial);
    }
}

function RESPONSE_START() {
    $('#testVid').off('ended');
    $('.ratingButton').show();
    $('#testVid').hide();
    trial.startTime = Date.now(); // overwrite the start time
    $('.ratingButton').mouseup(function(event) {
        $('.ratingButton').unbind('mouseup');
        $('.ratingButton').hide();
        var target = $(event.target).closest('.ratingButton');
        RECORD_TRIAL(target.attr('id'));
    });
}

function TRIAL() {
    $('#testVid').show();
    $('#testVid')[0].play();
    trial.inView = CHECK_FULLY_IN_VIEW($('#testVid'));
}

function RECORD_TRIAL(resp) {
    trial.rt = (Date.now() - trial.startTime) / 1000;
    trial.response = resp;
    if (trial.trialNum > 0) {
        const DATA = LIST_FROM_ATTRIBUTE_NAMES(trial, trial.titles);
        trial.allData += LIST_TO_FORMATTED_STRING(DATA);
    }
    NEXT_ACTION();
}

function NEXT_ACTION() {
    if (trial.trialNum < trial.trialN) {
        if (trial.trialNum % REST_TRIAL_N == 0 && trial.trialNum > 0) {
            REST();
        } else {
            trial.run();
        }
    } else {
        trial.complete = true;
        trial.endExptFunc();
    }
}

function REST() {
    $('#trialBox').hide();
    $('#restBox').show();
    $(document).keyup(function(e) {
        if (e.which == 32) {
            $(document).off('keyup');
            $('#restBox').hide();
            $('#trialBox').show();
            trial.run();
        }
    });
}

function END_BLOCK() {
    $('#trialBox').hide();
    $('#questionsBox').show();
}

trial_options = {
    subj: 'pre-define', // assign after subj is created
    pracTrialN: PRACTICE_TRIAL_N,
    trialN: TRIAL_N,
    titles: TRIAL_TITLES,
    stimPath: STIM_PATH,
    trialList: false,
    pracList: false,
    intertrialInterval: INTERTRIAL_INTERVAL,
    updateFunc: TRIAL_UPDATE,
    trialFunc: TRIAL,
    endExptFunc: END_BLOCK,
    progressInfo: true
}