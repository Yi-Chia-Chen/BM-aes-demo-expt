// Yi-Chia Chen


// ######## ##     ## ########  ########
// ##        ##   ##  ##     ##    ##
// ##         ## ##   ##     ##    ##
// ######      ###    ########     ##
// ##         ## ##   ##           ##
// ##        ##   ##  ##           ##
// ######## ##     ## ##           ##

const VISIT_FILE = 'visitMain_' + EXPERIMENT_NAME + '.txt';

const SAVING_SCRIPT = 'save.php';
const GET_RECORD_SCRIPT = 'getRecord.php';
const UPDATE_RECORD_SCRIPT = 'updateRecord.php';

var subj;

// ########  ########    ###    ########  ##    ##
// ##     ## ##         ## ##   ##     ##  ##  ##
// ##     ## ##        ##   ##  ##     ##   ####
// ########  ######   ##     ## ##     ##    ##
// ##   ##   ##       ######### ##     ##    ##
// ##    ##  ##       ##     ## ##     ##    ##
// ##     ## ######## ##     ## ########     ##

$(document).ready(function() {
    subj = new subjObject(subj_options);
    subj.id = 'demo1234';
    if (subj.phone) { // asking for subj.phone will detect phone
        $('#instrTextTop').html('It seems that you are using a touchscreen device or a phone. Please use a laptop or desktop instead.<br /><br />If you believe you have received this message in error, please contact the experimenter at yichiachen@ucla.edu<br /><br />Otherwise, please switch to a laptop or a desktop computer for this experiment.');
        $('#instrTextBottom').hide();
        $('#infoPoints').hide();
        $('#instrBox').show();
    } else {
        $('#part1Button').mouseup(GO_TO_PART1);
        $('#part2Button').mouseup(GO_TO_PART2);
        $('.partButton').show();
        $('#instrBox').show();
    }
});

function GO_TO_PART1() {
    window.location.href = 'part1/';
}

function GO_TO_PART2() {
    window.location.href = 'part2/';
}

var subj_options = {
    num: false,
    invalidIDFunc: INVALID_ID_FUNC,
    viewportMinW: VIEWPORT_MIN_W,
    viewportMinH: VIEWPORT_MIN_H,
    savingScript: SAVING_SCRIPT,
    visitFile: VISIT_FILE,
    savingDir: SAVING_DIR
};