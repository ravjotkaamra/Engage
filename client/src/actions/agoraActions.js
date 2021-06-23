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

export const newLocalClient = (localClient) => ({
  type: NEW_LOCAL_CLIENT,
  payload: localClient,
});

export const newRemoteClient = (remoteClient, uid) => ({
  type: NEW_REMOTE_CLIENT,
  payload: { remoteClient, uid },
});

export const removeRemoteClient = (uid) => ({
  type: REMOVE_REMOTE_CLIENT,
  payload: uid,
});

export const setOptions = (uid, token, channel) => ({
  type: SET_OPTIONS,
  payload: {
    uid,
    token,
    channel,
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

export function handleJoin() {
  return async (dispatch, getState) => {
    // Join an RTC channel.
    const localClient = getState().agora.localClient.client;
    const options = getState().agora.options;
    await localClient.join(
      options.appId,
      options.channel,
      options.token,
      options.uid
    );
    // Create a local audio track from the audio sampled by a microphone.
    const localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack();
    dispatch(setLocalAudioTrack(localAudioTrack));
    // Create a local video track from the video captured by a camera.
    const localVideoTrack = await AgoraRTC.createCameraVideoTrack();
    dispatch(setLocalVideoTrack(localVideoTrack));
    // Publish the local audio and video tracks to the RTC channel.
    await localClient.publish([localAudioTrack, localVideoTrack]);
    // Dynamically create a container in the form of a DIV element for playing the local video track.
    // const localPlayerContainer = document.createElement('div');
    // // Specify the ID of the DIV container. You can use the uid of the local user.
    // localPlayerContainer.id = options.uid.toString();
    // localPlayerContainer.textContent = 'Local user ' + options.uid;
    // localPlayerContainer.style.width = '640px';
    // localPlayerContainer.style.height = '480px';
    // document.body.append(localPlayerContainer);

    // Play the local video track.
    // Pass the DIV container and the SDK dynamically creates a player in the container for playing the local video track.
    // rtc.localVideoTrack.play(localPlayerContainer);
    // rtc.localVideoTrack.play('123');
    console.log('publish success! >>> ', localAudioTrack, localVideoTrack);
  };
}

export function handleLeave() {
  return async (dispatch, getState) => {
    // Destroy the local audio and video tracks.
    console.log('getState().agora :>> ', getState().agora);
    const localClient = getState().agora.localClient;
    console.log('localClient :>> ', localClient);
    localClient.audio.close();
    localClient.video.close();
    dispatch(setLocalAudioTrack(null));
    dispatch(setLocalVideoTrack(null));

    // Leave the channel.
    await localClient.client.leave();
  };
}
// Combine them all in an asynchronous thunk
export function startVideoCall(channel) {
  return async (dispatch) => {
    // Create an AgoraRTCClient object and update the store
    const localClient = AgoraRTC.createClient({ mode: 'rtc', codec: 'vp8' });
    dispatch(newLocalClient(localClient));

    try {
      // provide channel name and username to get the token
      // for fetching the token from backend api
      // 'http://localhost:3001/api/rtctoken'
      dispatch(setAgoraLoading());
      const { uid, token } = await agoraServices.fetchAgoraToken(channel);
      dispatch(setOptions(uid, token, channel));
      console.log('channel-name :>> ', channel);
      console.log('user-id :>> ', uid);
      console.log('token :>> ', token);

      // Listen for the "user-published" event, from which you can get an AgoraRTCRemoteUser object.
      localClient.on('user-published', async (remoteClient, mediaType) => {
        dispatch(newRemoteClient(remoteClient, remoteClient.uid));

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
          dispatch(
            setRemoteVideoTrack(remoteClient.videoTrack, remoteClient.uid)
          );

          // Play the remote video track.
          // Pass the DIV container and the SDK dynamically creates a player in the container for playing the remote video track.
          // rtc.remoteVideoTrack.play(remotePlayerContainer);

          // Or just pass the ID of the DIV container.
          // remoteVideoTrack.play(playerContainer.id);
        }

        // If the remote user publishes an audio track.
        if (mediaType === 'audio') {
          // Get the RemoteAudioTrack object in the AgoraRTCRemoteUser object.
          dispatch(
            setRemoteAudioTrack(remoteClient.audioTrack, remoteClient.uid)
          );
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
