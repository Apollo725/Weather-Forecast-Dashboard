import {
  getProfileApi,
  updateProfileApi,
  getKnowledgeApi,
  getStructuredApi,
  getRegulationApi,
  getRawApi,
  getGroupApi,
  getDatasetApi,
  getCycleDetailsApi,
  getSpecificCycleDetailApi,
  getSpecificGroupApi,
  getContentApi,
  getCyclesApi,
  contactSubmitApi,
  getKnowledgeDetailsApi,
} from '../api/dashboardApi';
import {
  PROFILE,
  GET_PROFILE_REQUEST,
  GET_PROFILE_SUCCESS,
  GET_PROFILE_ERROR,
  PROFILE_UPDATE,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_ERROR,
  KNOWLEDGE,
  GET_KNOWLEDGE_REQUEST,
  GET_KNOWLEDGE_SUCCESS,
  GET_KNOWLEDGE_ERROR,
  STRUCTURED,
  GET_STRUCTURED_REQUEST,
  GET_STRUCTURED_SUCCESS,
  GET_STRUCTURED_ERROR,
  REGULATION,
  GET_REGULATION_REQUEST,
  GET_REGULATION_SUCCESS,
  GET_REGULATION_ERROR,
  RAW,
  GET_RAW_REQUEST,
  GET_RAW_SUCCESS,
  GET_RAW_ERROR,
  GROUP,
  GET_GROUP_REQUEST,
  GET_GROUP_SUCCESS,
  GET_GROUP_ERROR,
  DATASET,
  GET_DATASET_REQUEST,
  GET_DATASET_SUCCESS,
  GET_DATASET_ERROR,
  CYCLEDETAILS,
  GET_CYCLEDETAILS_REQUEST,
  GET_CYCLEDETAILS_SUCCESS,
  GET_CYCLEDETAILS_ERROR,
  SPECIFIC_CYCLEDETAIL,
  GET_SPECIFIC_CYCLEDETAIL_REQUEST,
  GET_SPECIFIC_CYCLEDETAIL_SUCCESS,
  GET_SPECIFIC_CYCLEDETAIL_ERROR,
  SPECIFIC_GROUP,
  GET_SPECIFIC_GROUP_REQUEST,
  GET_SPECIFIC_GROUP_SUCCESS,
  GET_SPECIFIC_GROUP_ERROR,
  CONTENT,
  GET_CONTENT_REQUEST,
  GET_CONTENT_SUCCESS,
  GET_CONTENT_ERROR,
  CYCLES,
  GET_CYCLES_REQUEST,
  GET_CYCLES_SUCCESS,
  GET_CYCLES_ERROR,
  CONTACT,
  GET_CONTACT_REQUEST,
  GET_CONTACT_SUCCESS,
  GET_CONTACT_ERROR,
  KNOWLEDGE_DETAILS,
  GET_KNOWLEDGE_DETAILS_REQUEST,
  GET_KNOWLEDGE_DETAILS_SUCCESS,
  GET_KNOWLEDGE_DETAILS_ERROR,
} from '../constants/authActionType';

/* Get User Profile Section */

// action to save request to get profile in store
function requestGetProfile(item) {
  return {
    item,
    type: GET_PROFILE_REQUEST,
  };
}

// action to save get profile success in store
function receiveGetProfile(item, data) {
  return {
    item,
    type: GET_PROFILE_SUCCESS,
    payload: data,
  };
}

// action to save error when getting profile in store
function getProfileError(item, errorMessage) {
  return {
    item,
    type: GET_PROFILE_ERROR,
    payload: errorMessage,
  };
}

// action creator to get user profile
export function getProfileAction() {
  return async dispatch => {
    try {
      dispatch(requestGetProfile(PROFILE));
      const response = await getProfileApi();
      // console.log('profile data response', response);
      dispatch(receiveGetProfile(PROFILE, response.data));
    } catch (error) {
      dispatch(getProfileError(PROFILE, error));
      // console.log('profile data error', error);
    }
  };
}

/* Update User Profile Section */

// action to save request to update profile in store
function requestUpdateProfile(item) {
  return {
    item,
    type: UPDATE_PROFILE_REQUEST,
  };
}
// action to save update profile success in store
function receiveUpdateProfile(item, data) {
  return {
    item,
    type: UPDATE_PROFILE_SUCCESS,
    payload: data,
  };
}

// action to save error when updating profile in store
function updateProfileError(item, errorMessage) {
  return {
    item,
    type: UPDATE_PROFILE_ERROR,
    payload: errorMessage,
  };
}

// action creator to update user profile
export function updateProfileAction(params) {
  return async dispatch => {
    try {
      dispatch(requestUpdateProfile(PROFILE_UPDATE));
      const response = await updateProfileApi(params);
      console.log('UPDATE profile data response', response);
      dispatch(receiveUpdateProfile(PROFILE_UPDATE, response.data));
    } catch (error) {
      dispatch(updateProfileError(PROFILE_UPDATE, error));
      // console.log('profile data error', error);
    }
  };
}

/* Get Knowledge Data Section */

// action to save request to get knowledge in store
function requestGetknowledge(item) {
  return {
    item,
    type: GET_KNOWLEDGE_REQUEST,
  };
}

// action to save success after getting knowledge in sotre
function receiveGetKnowledge(item, data) {
  return {
    item,
    type: GET_KNOWLEDGE_SUCCESS,
    payload: data,
  };
}

// action to save error in store when getting knowledge
function getKnowledgeError(item, errorMessage) {
  return {
    item,
    type: GET_KNOWLEDGE_ERROR,
    payload: errorMessage,
  };
}

// action creator to get knowledge data
export function getKnowledge() {
  return async dispatch => {
    try {
      dispatch(requestGetknowledge(KNOWLEDGE));
      const response = await getKnowledgeApi();
      // console.log('knowledgebase data in action: ', response);
      dispatch(receiveGetKnowledge(KNOWLEDGE, response.data));
    } catch (error) {
      // console.log('get knowledgebaseData catch error', error);
      dispatch(getKnowledgeError(KNOWLEDGE, error));
    }
  };
}

/* Structured Datasets Section */

// action to save request to get structured datasets in store
export function requestGetStructured(item) {
  return {
    item,
    type: GET_STRUCTURED_REQUEST,
  };
}

// action to save success after getting knowledge in sotre
export function receiveGetStructured(item, data) {
  return {
    item,
    type: GET_STRUCTURED_SUCCESS,
    payload: data,
  };
}

// action to save error in store when getting knowledge
export function getStructuredError(item, errorMessage) {
  return {
    item,
    type: GET_STRUCTURED_ERROR,
    payload: errorMessage,
  };
}
// action creator to get structured datasets
export function getStructured() {
  return async dispatch => {
    try {
      dispatch(requestGetStructured(STRUCTURED));
      const response = await getStructuredApi();
      // console.log('structured datasets in action', response);
      dispatch(receiveGetStructured(STRUCTURED, response.data));
    } catch (error) {
      // console.log('structured dataset action creator error:', error);
      dispatch(getStructuredError(STRUCTURED, error));
    }
  };
}

/* Regulation Datasets Section */
// action to save request to get regulation datasets in store
export function requestGetRegulation(item) {
  return {
    item,
    type: GET_REGULATION_REQUEST,
  };
}

// action to save error in store when getting knowledge
export function getRegulationError(item, errorMessage) {
  return {
    item,
    type: GET_REGULATION_ERROR,
    payload: errorMessage,
  };
}

// action to save success after getting knowledge in sotre
export function receiveGetRegulation(item, data) {
  return {
    item,
    type: GET_REGULATION_SUCCESS,
    payload: data,
  };
}

// action creator to get regulation datasets
export function getRegulation() {
  return async dispatch => {
    try {
      dispatch(requestGetRegulation(REGULATION));
      const response = await getRegulationApi();
      // console.log('structured datasets in action', response);
      dispatch(receiveGetRegulation(REGULATION, response.data));
    } catch (error) {
      // console.log('structured dataset action creator error:', error);
      dispatch(getStructuredError(REGULATION, error));
    }
  };
}

/* Get Raw contents data Section */

// save store to get raw content data
function requestRaw(item) {
  return {
    item,
    type: GET_RAW_REQUEST,
  };
}
// action to save success after getting raw in sotre
function receiveRaw(item, data) {
  return {
    item,
    type: GET_RAW_SUCCESS,
    payload: data,
  };
}
// action to save error in store when getting raw
function getRawError(item, errorMessage) {
  return {
    item,
    type: GET_RAW_ERROR,
    payload: errorMessage,
  };
}

// action creator to get raw content sets
export function getRaw() {
  return async dispatch => {
    try {
      dispatch(requestRaw(RAW));
      const response = await getRawApi();
      dispatch(receiveRaw(RAW, response.data));
      // console.log('Raw content sets in action', response);
    } catch (error) {
      // console.log('raw action creator error:', error);
      dispatch(getRawError(RAW, error));
    }
  };
}

/* Get Group contents data Section */

// save store to get Group content data
function requestGroup(item) {
  return {
    item,
    type: GET_GROUP_REQUEST,
  };
}
// action to save success after getting group in sotre
export function receiveGroup(item, data) {
  return {
    item,
    type: GET_GROUP_SUCCESS,
    payload: data,
  };
}
// action to save error in store when getting group
function getGroupError(item, errorMessage) {
  return {
    item,
    type: GET_GROUP_ERROR,
    payload: errorMessage,
  };
}

// action creator to get group
export function getGroup() {
  return async dispatch => {
    try {
      dispatch(requestGroup(GROUP));
      const response = await getGroupApi();
      // console.log('Group content sets in action', response);
      dispatch(receiveGroup(GROUP, response.data));
    } catch (error) {
      // console.log('Group content sets action creator error:', error);
      dispatch(getGroupError(GROUP, error));
    }
  };
}

/* Get Specific Group contents data Section */

// save store to get Group content data
function requestSpecificGroup(item) {
  return {
    item,
    type: GET_SPECIFIC_GROUP_REQUEST,
  };
}
// action to save success after getting group in sotre
function receiveSpecificGroup(item, data) {
  return {
    item,
    type: GET_SPECIFIC_GROUP_SUCCESS,
    payload: data,
  };
}
// action to save error in store when getting group
function getSpecificGroupError(item, errorMessage) {
  return {
    item,
    type: GET_SPECIFIC_GROUP_ERROR,
    payload: errorMessage,
  };
}

// action creator to get specific group
export function getSpecificGroup(jobGroupid) {
  return async dispatch => {
    try {
      dispatch(requestSpecificGroup(SPECIFIC_GROUP));
      const response = await getSpecificGroupApi(jobGroupid);
      // console.log('Specific Group content sets in action', response);
      dispatch(receiveSpecificGroup(SPECIFIC_GROUP, response.data));
    } catch (error) {
      // console.log('Group content sets action creator error:', error);
      dispatch(getSpecificGroupError(SPECIFIC_GROUP, error));
    }
  };
}

/* Get dataset Section (when click view in structured table) */

// save store to get dataset detail data
function requestDataset(item) {
  return {
    item,
    type: GET_DATASET_REQUEST,
  };
}
// action to save success after getting dataset in sotre
function receiveDataset(item, data) {
  return {
    item,
    type: GET_DATASET_SUCCESS,
    payload: data,
  };
}
// action to save error in store when getting dataset
function getDatasetError(item, errorMessage) {
  return {
    item,
    type: GET_DATASET_ERROR,
    payload: errorMessage,
  };
}

// action creator to get dataset
export function getDataset(jobId, cycleId, cutId) {
  return async dispatch => {
    try {
      dispatch(requestDataset(DATASET));
      const response = await getDatasetApi(jobId, cycleId, cutId);
      // console.log('dataset in action', response);
      dispatch(receiveDataset(DATASET, response.data));
    } catch (error) {
      // console.log('dataset action creator error:', error);
      dispatch(getDatasetError(DATASET, error));
    }
  };
}

/* Get cycle details Section (when click strategy name in raw table) */

// save store to get cycle details data
function requestCycleDetails(item) {
  return {
    item,
    type: GET_CYCLEDETAILS_REQUEST,
  };
}
// action to save success after getting cycle details in sotre
function receiveCycleDetails(item, data) {
  return {
    item,
    type: GET_CYCLEDETAILS_SUCCESS,
    payload: data,
  };
}
// action to save error in store when getting cycle details
function getCycleDetailsError(item, errorMessage) {
  return {
    item,
    type: GET_CYCLEDETAILS_ERROR,
    payload: errorMessage,
  };
}

// action creator to get cycle details
export function getCycleDetails(jobGroupId, cycleId) {
  // console.log('______action jobGroupid and cycleId', jobGroupId, cycleId);
  return async dispatch => {
    try {
      dispatch(requestCycleDetails(CYCLEDETAILS));
      const response = await getCycleDetailsApi(jobGroupId, cycleId);
      // console.log('cycleDetails in action', response);
      dispatch(receiveCycleDetails(CYCLEDETAILS, response.data));
    } catch (error) {
      // console.log('dataset action creator error:', error);
      dispatch(getCycleDetailsError(CYCLEDETAILS, error));
    }
  };
}

/* Get specific cycle detail Section (when click view in raw table) */

// save store to get cycle detail data
function requestSpecificCycleDetail(item) {
  return {
    item,
    type: GET_SPECIFIC_CYCLEDETAIL_REQUEST,
  };
}
// action to save success after getting cycle detail in sotre
function receiveSpecificCycleDetail(item, data) {
  return {
    item,
    type: GET_SPECIFIC_CYCLEDETAIL_SUCCESS,
    payload: data,
  };
}
// action to save error in store when getting cycle detail
function getSpecificCycleDetailError(item, errorMessage) {
  return {
    item,
    type: GET_SPECIFIC_CYCLEDETAIL_ERROR,
    payload: errorMessage,
  };
}

// action creator to get cycle detail
export function getSpecificCycleDetail(jobGroupId, cycleId, step) {
  // console.log('--------action stepNumber', jobId, jobGroupId, cycleId, stepNumber);
  return async dispatch => {
    try {
      dispatch(requestSpecificCycleDetail(SPECIFIC_CYCLEDETAIL));
      const response = await getSpecificCycleDetailApi(jobGroupId, cycleId, step);
      // console.log('cycleDetails in action', response);
      dispatch(receiveSpecificCycleDetail(SPECIFIC_CYCLEDETAIL, response.data));
    } catch (error) {
      // console.log('dataset action creator error:', error);
      dispatch(getSpecificCycleDetailError(SPECIFIC_CYCLEDETAIL, error));
    }
  };
}

/* Get specific cycle detail Section (when click view in raw table) */

// save store to get cycle detail data
function requestContent(item) {
  return {
    item,
    type: GET_CONTENT_REQUEST,
  };
}
// action to save success after getting cycle detail in sotre
function receiveContent(item, data) {
  return {
    item,
    type: GET_CONTENT_SUCCESS,
    payload: data,
  };
}
// action to save error in store when getting cycle detail
function getContentError(item, errorMessage) {
  return {
    item,
    type: GET_CONTENT_ERROR,
    payload: errorMessage,
  };
}

// action creator to get cycle detail
export function getContent(params) {
  // console.log('--------get Content Action', params);
  return async dispatch => {
    try {
      dispatch(requestContent(CONTENT));
      const response = await getContentApi(params);
      // console.log('content in get content action', response);
      dispatch(receiveContent(CONTENT, response.data));
    } catch (error) {
      // console.log('dataset action creator error:', error);
      dispatch(getContentError(CONTENT, error));
    }
  };
}

/* Get specific cycle detail Section (when click view in raw table) */

// save store to get cycle detail data
function requestCycles(item) {
  return {
    item,
    type: GET_CYCLES_REQUEST,
  };
}
// action to save success after getting Cycles detail in sotre
function receiveCycles(item, data) {
  return {
    item,
    type: GET_CYCLES_SUCCESS,
    payload: data,
  };
}
// action to save error in store when getting Cycles detail
function getCyclesError(item, errorMessage) {
  return {
    item,
    type: GET_CYCLES_ERROR,
    payload: errorMessage,
  };
}

// action creator to get Cycles detail
export function getCycles(params) {
  // console.log('--------get Cycles Action', params);
  return async dispatch => {
    try {
      dispatch(requestCycles(CYCLES));
      const response = await getCyclesApi(params);
      // console.log('Cycles in get Cycles action', response);
      dispatch(receiveCycles(CYCLES, response.data));
    } catch (error) {
      // console.log('dataset action creator error:', error);
      dispatch(getCyclesError(CYCLES, error));
    }
  };
}

/* Submit contact us content */

// save request of status of submit contact in store
export function requestContact(item) {
  return {
    item,
    type: GET_CONTACT_REQUEST,
  };
}
// save success status of contact submit in store
export function receiveContact(item, data) {
  return {
    item,
    type: GET_CONTACT_SUCCESS,
    payload: data,
  };
}
// save error of contact submit in store
export function getContactError(item, errorMessage) {
  return {
    item,
    type: GET_CONTACT_ERROR,
    payload: errorMessage,
  };
}

// action creator to sumbit contact info
export function contactSubmit(params) {
  return async dispatch => {
    try {
      dispatch(requestContact(CONTACT));
      const response = await contactSubmitApi(params);
      console.log('contact us action ', response);
      dispatch(receiveContact(CONTACT, response.data));
    } catch (error) {
      // console.log('dataset action creator error:', error);
      dispatch(getContactError(CONTACT, error));
    }
  };
}

/* Get KnowledgeDetails Data Section */

// action to save request to get KnowledgeDetails in store
export function requestGetKnowledgeDetails(item) {
  return {
    item,
    type: GET_KNOWLEDGE_DETAILS_REQUEST,
  };
}

// action to save success after getting KnowledgeDetails in sotre
export function receiveGetKnowledgeDetails(item, data) {
  return {
    item,
    type: GET_KNOWLEDGE_DETAILS_SUCCESS,
    payload: data,
  };
}

// action to save error in store when getting KnowledgeDetails
export function getKnowledgeDetailsError(item, errorMessage) {
  return {
    item,
    type: GET_KNOWLEDGE_DETAILS_ERROR,
    payload: errorMessage,
  };
}

// action creator to get KnowledgeDetails data
export function getKnowledgeDetails(knowledgeId) {
  return async dispatch => {
    try {
      dispatch(requestGetKnowledgeDetails(KNOWLEDGE_DETAILS));
      const response = await getKnowledgeDetailsApi(knowledgeId);
      // console.log('KnowledgeDetailsbase data in action: ', response);
      dispatch(receiveGetKnowledgeDetails(KNOWLEDGE_DETAILS, response.data));
    } catch (error) {
      // console.log('get KnowledgeDetailsbaseData catch error', error);
      dispatch(getKnowledgeDetailsError(KNOWLEDGE_DETAILS, error));
    }
  };
}
