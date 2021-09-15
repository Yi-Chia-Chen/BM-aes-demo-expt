// Yi-Chia Chen


// ######## ##     ## ########  ########
// ##        ##   ##  ##     ##    ##
// ##         ## ##   ##     ##    ##
// ######      ###    ########     ##
// ##         ## ##   ##           ##
// ##        ##   ##  ##           ##
// ######## ##     ## ##           ##

const TYPE = 'ani';
const TRIAL_FILE = TYPE + 'Trial_' + EXPERIMENT_NAME + '.txt';
const SUBJ_FILE = TYPE + 'Subj_' + EXPERIMENT_NAME + '.txt';
const VISIT_FILE = TYPE + 'Visit_' + EXPERIMENT_NAME + '.txt';
const ATTRITION_FILE = TYPE + 'Attrition_' + EXPERIMENT_NAME + '.txt';

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
    subj = new subjObject(subj_options);
    subj.id = subj.getID('sonacode');
    subj.saveVisit();
    if (subj.phone) {
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
                     'gender',
                     'age',
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
    subj.gender = $('input[name=gender]:checked').val();
    subj.age = $('#age').val();
    var open_ended_list = [subj.problems, subj.age];
    var all_responded = CHECK_IF_RESPONDED(open_ended_list, [subj.serious, subj.gender]);
    if (all_responded) {
        for (var i = 0; i < open_ended_list.length; i++) {
            open_ended_list[i] = open_ended_list[i].replace(/(?:\r\n|\r|\n)/g, '<br />');
        }
        subj.instrQAttemptN = instr.qAttemptN['only'];
        subj.instrReadingTimes = instr.readingTimes;
        subj.quickReadingPageN = subj.instrReadingTimes.filter(d => d < INSTR_READING_TIME_MIN).length;
        $('#questionsBox').hide();
        $('#debriefingBox').show();
        $('html')[0].scrollIntoView();
    } else {
        $('#Qwarning').text('Please answer all questions to complete the experiment. Thank you!');
    }
}

var subj_options = {
    num: false,
    titles: SUBJ_TITLES,
    invalidIDFunc: INVALID_ID_FUNC,
    viewportMinW: VIEWPORT_MIN_W,
    viewportMinH: VIEWPORT_MIN_H,
    savingScript: SAVING_SCRIPT,
    visitFile: VISIT_FILE,
    attritionFile: ATTRITION_FILE,
    subjFile: SUBJ_FILE,
    savingDir: SAVING_DIR,
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
instr_text[0] = "Welcome back!<br /><br />This is the second part of the 40-min study, which tank about 20 minutes.";
instr_text[1] = 'Again, please help us by reading the instructions in the next few pages carefully, and avoid using the refresh or back buttons.';
instr_text[2] = 'Now, please maximize your browser window.';
instr_text[3] = "In this second part, you will be shown similar movies just like those in the first part. This time, we are interested in how <strong>lifelike</strong> you find each creature's movement to be.<br /><br />In other words, how strongly the movements give you an impression of something alive?";
instr_text[4] = 'As a reminder, the "creature" in each movie is only illustrated with some moving dots: Those dots were on the body of the creature, and thus moved as the creature would move.';
instr_text[5] = "Sometimes, it might feel awkward to explicitly rate the movements.<br /><br />Don't worry about it too much: we're really just interested in your initial gut reaction.";
instr_text[6] = "The next page is a quick instruction quiz. (It's very simple!)";
instr_text[7] = ''; // instruction question 1
instr_text[8] = "Great! You can press SPACE to start. Please stay focus after you start (Don't switch to other windows or tabs!)";

const INSTR_FUNC_DICT = {
    2: SHOW_MAXIMIZE_WINDOW,
    3: HIDE_INSTR_IMG,
    7: SHOW_INSTR_QUESTION,
    8: READY_BLOCK
};

function SHOW_INSTR_IMG(file_name) {
    $('#instrImg').attr('src', STIM_PATH + file_name);
    $('#instrImg').css('display', 'block');
}

function HIDE_INSTR_IMG() {
    $('#instrImg').css('display', 'none');
}

function SHOW_MAXIMIZE_WINDOW() {
    SHOW_INSTR_IMG('maximize_window.png');
}

function SHOW_INSTR_QUESTION() {
    $('#instrBox').hide();
    $('#instrQBox').show();
}

function SUBMIT_INSTR_Q() {
    var instrChoice = $('input[name="instrQ"]:checked').val();
    if (typeof instrChoice === 'undefined') {
        $('#instrQWarning').text('Please answer the question. Thank you!');
    } else if (instrChoice != 'Lifelike') {
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

function READY_BLOCK() {
    $('#nextButton').hide();
    $(document).keyup(function(e) {
        if (e.which == 32) { // the 'space' key
            $(document).off('keyup');
            $('#instrBox').hide();
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

function END_TO_SONA() {
    const COMPLETION_URL = 'https://ycc.vision/Demo/ani-aes/';
    window.location.href = COMPLETION_URL;
}

trial_options = {
    subj: 'pre-define', // assign after subj is created
    pracTrialN: PRACTICE_TRIAL_N,
    trialN: TRIAL_N,
    titles: TRIAL_TITLES,
    stimPath: STIM_PATH,
    dataFile: TRIAL_FILE,
    savingScript: SAVING_SCRIPT,
    savingDir: SAVING_DIR,
    trialList: false,
    pracList: false,
    intertrialInterval: INTERTRIAL_INTERVAL,
    updateFunc: TRIAL_UPDATE,
    trialFunc: TRIAL,
    endExptFunc: END_BLOCK,
    progressInfo: true
}