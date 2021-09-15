// Yi-Chia Chen

const FORMAL = true;
const EXPERIMENT_NAME = 'aesAni';
const SUBJ_NUM_RECORD_PREFIX = 'subjNumRecord_';

const SAVING_DIR = FORMAL ? 'data/formal':'data/testing';
const PROGRESS_DIRECTORY = SAVING_DIR + '/progress';
const PROGRESS_FILE_PREFIX = 'progress_';
const SUBJ_NUM_RECORD_DIRECTORY = SAVING_DIR + '/subjNumRecord';

const VIEWPORT_MIN_W = 800;
const VIEWPORT_MIN_H = 600;
const INSTR_READING_TIME_MIN = 0.5;
const INTERTRIAL_INTERVAL = 0.5;

const PRACTICE_LIST = ['104_19_21_upright_incongruent.mp4','104_19_21_inverted_congruent.mp4'];
const PRACTICE_TRIAL_N = PRACTICE_LIST.length;
const STIM_N = 8;
const REPEAT_TRIAL_N = STIM_N;
const TRIAL_N = STIM_N + REPEAT_TRIAL_N;
const REST_TRIAL_N = TRIAL_N/2;
const INSTR_TRIAL_N = PRACTICE_TRIAL_N + TRIAL_N;
const STIM_PATH = '../Stimuli/';
const STIM_FILE_PREFIX = '104_19_';
const CONDITIONS = ['upright_congruent', 'upright_incongruent', 'inverted_congruent', 'inverted_incongruent'];
const CONDITION_N = CONDITIONS.length;
const STIM_NUM_LIST = RANGE(1, 1+STIM_N/CONDITION_N);
var stim_list = [];
for (var i=0; i<CONDITION_N; i++) {
    stim_list = stim_list.concat(STIM_NUM_LIST.map(x => STIM_FILE_PREFIX+x+'_'+CONDITIONS[i]+'.mp4'))
}