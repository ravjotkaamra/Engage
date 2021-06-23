import * as actions from '../actions/agoraActions';

const initialState = {
  // agora authorization options to join a channel
  options: {
    appId: process.env.REACT_APP_AGORA_APP_ID,
    channelName: '',
    token: null,
    uid: '',
  },

  // AgoraRTCClient object for joining a channel,
  // publishing localMedia, subscribing remoteMedia
  // and media objects for storing audio and video
  // of local user and remote users
  localClient: { uid: '', client: null, video: null, audio: null },
  remoteClients: [],

  // for handling ui/ux of app
  loading: false,
  hasErrors: false,
};

const agoraReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.NEW_LOCAL_CLIENT:
      return {
        ...state,
        localClient: {
          ...state.localClient,
          client: action.payload.client,
          uid: action.payload,
        },
        hasErrors: false,
        loading: false,
      };
    case actions.NEW_REMOTE_CLIENT:
      return {
        ...state,
        remoteClients: [
          ...state.remoteClients,
          { client: action.payload.client, uid: action.payload.uid },
        ],
        hasErrors: false,
        loading: false,
      };
    case actions.REMOVE_REMOTE_CLIENT: {
      const filteredClients = state.remoteClients.filter(
        (client) => client.uid !== action.payload.uid
      );
      return { ...state, remoteClients: filteredClients };
    }
    case actions.SET_OPTIONS: {
      const { uid, token, channelName } = action.payload;
      return {
        ...state,
        options: { ...state.options, uid, token, channelName },
        hasErrors: false,
        loading: false,
      };
    }
    case actions.SET_LOCAL_VIDEO:
      return {
        ...state,
        localClient: { ...state.localClient, video: action.payload },
        hasErrors: false,
        loading: false,
      };
    case actions.SET_LOCAL_AUDIO:
      return {
        ...state,
        localClient: { ...state.localClient, audio: action.payload },
        hasErrors: false,
        loading: false,
      };
    case actions.SET_REMOTE_VIDEO: {
      const { remoteVideoTrack, uid } = action.payload;
      return {
        ...state,
        remoteClients: state.remoteClients.map((client) =>
          client.uid !== uid ? client : { ...client, video: remoteVideoTrack }
        ),
        hasErrors: false,
        loading: false,
      };
    }
    case actions.SET_REMOTE_AUDIO:
      const { remoteAudioTrack, uid } = action.payload;
      return {
        ...state,
        remoteClients: state.remoteClients.map((client) =>
          client.uid !== uid ? client : { ...client, audio: remoteAudioTrack }
        ),
        hasErrors: false,
        loading: false,
      };
    case actions.SET_AGORA_LOADING:
      return { ...state, loading: true, hasErrors: false };
    case actions.SET_AGORA_FAILURE:
      return { ...state, loading: false, hasErrors: true };
    default:
      return state;
  }
};

export default agoraReducer;
