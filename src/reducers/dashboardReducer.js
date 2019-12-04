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

const initialState = {
  isFetching: false,
  profileData: {},
  updateProfileResult: '',
  errorMessage: '',
  knowledgeData: [],
  structured: [],
  regulation: [],
  raw: [],
  group: [],
  specificGroup: [],
  dataset: [],
  cycleDetails: [],
  specificCycleDetail: [],
  content: [],
  cycles: [],
  contact: '',
  knowledgeDetails: {},
};
export default function dashboardReducer(state = initialState, action) {
  if (action.item === PROFILE) {
    switch (action.type) {
      case GET_PROFILE_REQUEST:
        return { ...state, isFetching: true };
      case GET_PROFILE_SUCCESS:
        return { ...state, isFetching: false, profileData: action.payload };
      case GET_PROFILE_ERROR:
        return { ...state, isFetching: false, errorMessage: action.payload };
      default:
        return state;
    }
  } else if (action.item === PROFILE_UPDATE) {
    switch (action.type) {
      case UPDATE_PROFILE_REQUEST:
        return { ...state, isFetching: true };
      case UPDATE_PROFILE_SUCCESS:
        return { ...state, isFetching: false, updateProfileResult: action.payload };
      case UPDATE_PROFILE_ERROR:
        return { ...state, isFetching: false, errorMessage: action.payload };
      default:
        return state;
    }
  } else if (action.item === KNOWLEDGE) {
    switch (action.type) {
      case GET_KNOWLEDGE_REQUEST:
        return { ...state, isFetching: true };
      case GET_KNOWLEDGE_SUCCESS:
        return { ...state, isFetching: false, knowledgeData: action.payload };
      case GET_KNOWLEDGE_ERROR:
        return { ...state, isFetching: false, errorMessage: action.payload };
      default:
        return state;
    }
  } else if (action.item === STRUCTURED) {
    switch (action.type) {
      case GET_STRUCTURED_REQUEST:
        return { ...state, isFetching: true };
      case GET_STRUCTURED_SUCCESS:
        return { ...state, isFetching: false, structured: action.payload };
      case GET_STRUCTURED_ERROR:
        return { ...state, isFetching: false, errorMessage: action.payload };
      default:
        return state;
    }
  } else if (action.item === REGULATION) {
    switch (action.type) {
      case GET_REGULATION_REQUEST:
        return { ...state, isFetching: true };
      case GET_REGULATION_SUCCESS:
        return { ...state, isFetching: false, regulation: action.payload };
      case GET_REGULATION_ERROR:
        return { ...state, isFetching: false, errorMessage: action.payload };
      default:
        return state;
    }
  } else if (action.item === RAW) {
    switch (action.type) {
      case GET_RAW_REQUEST:
        return { ...state, isFetching: true };
      case GET_RAW_SUCCESS:
        return { ...state, isFetching: false, raw: action.payload };
      case GET_RAW_ERROR:
        return { ...state, isFetching: false, errorMessage: action.payload };
      default:
        return state;
    }
  } else if (action.item === GROUP) {
    switch (action.type) {
      case GET_GROUP_REQUEST:
        return { ...state, isFetching: true };
      case GET_GROUP_SUCCESS:
        return { ...state, isFetching: false, group: action.payload };
      case GET_GROUP_ERROR:
        return { ...state, isFetching: false, errorMessage: action.payload };
      default:
        return state;
    }
  } else if (action.item === SPECIFIC_GROUP) {
    switch (action.type) {
      case GET_SPECIFIC_GROUP_REQUEST:
        return { ...state, isFetching: true };
      case GET_SPECIFIC_GROUP_SUCCESS:
        return { ...state, isFetching: false, specificGroup: action.payload };
      case GET_SPECIFIC_GROUP_ERROR:
        return { ...state, isFetching: false, errorMessage: action.payload };
      default:
        return state;
    }
  } else if (action.item === DATASET) {
    switch (action.type) {
      case GET_DATASET_REQUEST:
        return { ...state, isFetching: true };
      case GET_DATASET_SUCCESS:
        return { ...state, isFetching: false, dataset: action.payload };
      case GET_DATASET_ERROR:
        return { ...state, isFetching: false, errorMessage: action.payload };
      default:
        return state;
    }
  } else if (action.item === CYCLEDETAILS) {
    switch (action.type) {
      case GET_CYCLEDETAILS_REQUEST:
        return { ...state, isFetching: true };
      case GET_CYCLEDETAILS_SUCCESS:
        return { ...state, isFetching: false, cycleDetails: action.payload };
      case GET_CYCLEDETAILS_ERROR:
        return { ...state, isFetching: false, errorMessage: action.payload };
      default:
        return state;
    }
  } else if (action.item === SPECIFIC_CYCLEDETAIL) {
    switch (action.type) {
      case GET_SPECIFIC_CYCLEDETAIL_REQUEST:
        return { ...state, isFetching: true };
      case GET_SPECIFIC_CYCLEDETAIL_SUCCESS:
        return { ...state, isFetching: false, specificCycleDetail: action.payload };
      case GET_SPECIFIC_CYCLEDETAIL_ERROR:
        return { ...state, isFetching: false, errorMessage: action.payload };
      default:
        return state;
    }
  } else if (action.item === CONTENT) {
    switch (action.type) {
      case GET_CONTENT_REQUEST:
        return { ...state, isFetching: true };
      case GET_CONTENT_SUCCESS:
        return { ...state, isFetching: false, content: action.payload };
      case GET_CONTENT_ERROR:
        return { ...state, isFetching: false, errorMessage: action.payload };
      default:
        return state;
    }
  } else if (action.item === CYCLES) {
    switch (action.type) {
      case GET_CYCLES_REQUEST:
        return { ...state, isFetching: true };
      case GET_CYCLES_SUCCESS:
        return { ...state, isFetching: false, cycles: action.payload };
      case GET_CYCLES_ERROR:
        return { ...state, isFetching: false, errorMessage: action.payload };
      default:
        return state;
    }
  } else if (action.item === CONTACT) {
    switch (action.type) {
      case GET_CONTACT_REQUEST:
        return { ...state, isFetching: true };
      case GET_CONTACT_SUCCESS:
        return { ...state, isFetching: false, contactResult: action.payload };
      case GET_CONTACT_ERROR:
        return { ...state, isFetching: false, errorMessage: action.payload };
      default:
        return state;
    }
  } else if (action.item === KNOWLEDGE_DETAILS) {
    switch (action.type) {
      case GET_KNOWLEDGE_DETAILS_REQUEST:
        return { ...state, isFetching: true };
      case GET_KNOWLEDGE_DETAILS_SUCCESS:
        return { ...state, isFetching: false, knowledgeDetails: action.payload };
      case GET_KNOWLEDGE_DETAILS_ERROR:
        return { ...state, isFetching: false, errorMessage: action.payload };
      default:
        return state;
    }
  } else {
    return state;
  }
}
