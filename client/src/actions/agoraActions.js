import AgoraRTC from 'agora-rtc-sdk-ng';
import agoraServices from '../services/agora';

// Create Redux action types
export const GET_POSTS = 'GET_POSTS';
export const GET_POSTS_SUCCESS = 'GET_POSTS_SUCCESS';
export const GET_POSTS_FAILURE = 'GET_POSTS_FAILURE';
export const NEW_LOCAL_CLIENT = 'NEW_LOCAL_CLIENT';
export const NEW_REMOTE_CLIENT = 'NEW_REMOTE_CLIENT';
export const REMOVE_REMOTE_CLIENT = 'REMOVE_REMOTE_CLIENT';
export const SET_OPTIONS = 'SET_OPTIONS';
export const SET_AGORA_LOADING = 'SET_AGORA_LOADING';
export const SET_AGORA_FAILURE = 'SET_AGORA_FAILURE';
export const SET_LOCAL_VIDEO = 'SET_LOCAL_VIDEO';
export const SET_LOCAL_AUDIO = 'SET_LOCAL_AUDIO';
export const SET_REMOTE_VIDEO = 'SET_REMOTE_VIDEO';
export const SET_REMOTE_AUDIO = 'SET_REMOTE_AUDIO';
// Create Redux action creators that return an action
export const getPosts = () => ({
  type: GET_POSTS,
});

export const getPostsSuccess = (posts) => ({
  type: GET_POSTS_SUCCESS,
  payload: posts,
});

export const newLocalClient = (localClient, uid) => ({
  type: NEW_LOCAL_CLIENT,
  payload: { localClient, uid },
});

export const newRemoteClient = (remoteClient, uid) => ({
  type: NEW_REMOTE_CLIENT,
  payload: { remoteClient, uid },
});

export const removeRemoteClient = (uid) => ({
  type: REMOVE_REMOTE_CLIENT,
  payload: uid,
});

export const setOptions = (uid, token, channelName) => ({
  type: SET_OPTIONS,
  payload: {
    uid,
    token,
    channelName,
  },
});

export const setLocalVideoTrack = (localVideoTrack) => ({
  type: SET_LOCAL_VIDEO,
  payload: localVideoTrack,
});

export const setLocalAudioTrack = (localAudioTrack) => ({
  type: SET_LOCAL_AUDIO,
  payload: localAudioTrack,
});

export const setRemoteVideoTrack = (remoteVideoTrack, uid) => ({
  type: SET_LOCAL_VIDEO,
  payload: { remoteVideoTrack, uid },
});

export const setRemoteAudioTrack = (remoteAudioTrack, uid) => ({
  type: SET_LOCAL_AUDIO,
  payload: { remoteAudioTrack, uid },
});

export const setAgoraLoading = () => ({
  type: SET_AGORA_LOADING,
});

export const setAgoraFailure = () => ({
  type: SET_AGORA_FAILURE,
});

export const getPostsFailure = () => ({
  type: GET_POSTS_FAILURE,
});

export function startVideoCall(channelName) {
  return async (dispatch) => {
    // Create an AgoraRTCClient object and update the store
    const localClient = AgoraRTC.createClient({ mode: 'rtc', codec: 'vp8' });
    dispatch(newLocalClient(localClient));

    try {
      // provide channel name and username to get the token
      // for fetching the token from backend api
      // 'http://localhost:3001/api/rtctoken'
      dispatch(setAgoraLoading());
      const { uid, token } = await agoraServices.fetchAgoraToken(channelName);
      dispatch(setOptions(uid.toString(), token, channelName));
      console.log('channel-name :>> ', channelName);
      console.log('user-id :>> ', uid);
      console.log('token :>> ', token);

      // Listen for the "user-published" event, from which you can get an AgoraRTCRemoteUser object.
      localClient.on('user-published', async (remoteClient, mediaType) => {
        dispatch(newRemoteClient(remoteClient));

        // Subscribe to the remote user when the SDK triggers the "user-published" event
        await localClient.subscribe(remoteClient, mediaType);
        console.log('subscribe success');

        // If the remote user publishes a video track.
        if (mediaType === 'video') {
          // Dynamically create a container in the form of a DIV element for playing the remote video track.
          // const remotePlayerContainer = document.createElement('div');
          // // Specify the ID of the DIV container. You can use the uid of the remote user.
          // remotePlayerContainer.id = remoteClient.uid.toString();
          // remotePlayerContainer.textContent = 'Remote user ' + remoteClient.uid;
          // remotePlayerContainer.style.width = '640px';
          // remotePlayerContainer.style.height = '480px';
          // document.body.append(remotePlayerContainer);

          // Get the RemoteVideoTrack object in the AgoraRTCRemoteUser object.
          dispatch(setRemoteVideoTrack(remoteClient.videoTrack));

          // Play the remote video track.
          // Pass the DIV container and the SDK dynamically creates a player in the container for playing the remote video track.
          // rtc.remoteVideoTrack.play(remotePlayerContainer);

          // Or just pass the ID of the DIV container.
          // remoteVideoTrack.play(playerContainer.id);
        }

        // If the remote user publishes an audio track.
        if (mediaType === 'audio') {
          // Get the RemoteAudioTrack object in the AgoraRTCRemoteUser object.
          dispatch(setRemoteAudioTrack(remoteClient.audioTrack));
          // rtc.remoteAudioTrack = remoteClient.audioTrack;
          // Play the remote audio track. No need to pass any DOM element.
          // rtc.remoteAudioTrack.play();
        }

        // Listen for the "user-unpublished" event
        localClient.on('user-unpublished', (user) => {
          // Get the dynamically created DIV container.
          console.log('user :>> ', user);

          dispatch(removeRemoteClient(user.uid));

          // const remotePlayerContainer = document.getElementById(
          //   user.uid.toString()
          // );
          // // Destroy the container.
          // console.log(`remoteplayercontainer`, remotePlayerContainer);
          // remotePlayerContainer && remotePlayerContainer.remove();
        });
      });
    } catch (error) {
      console.log('error getting token from Agora :>> ', error);
    }
  };
}

// Combine them all in an asynchronous thunk
export function fetchPosts() {
  return async (dispatch) => {
    dispatch(getPosts());

    try {
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/posts'
      );
      const data = await response.json();

      dispatch(getPostsSuccess(data));
    } catch (error) {
      dispatch(getPostsFailure());
    }
  };
}
