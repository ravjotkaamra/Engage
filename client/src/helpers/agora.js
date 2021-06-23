import AgoraRTC from 'agora-rtc-sdk-ng';
import agoraServices from '../services/agora';

// for storing client and remote users info
export const rtc = {
  localAudioTrack: null,
  localVideoTrack: null,
  remoteAudioTrack: null,
  remoteVideoTrack: null,
  client: null,
};

// agora options for authentication
export const options = {
  // Set the app id
  appId: process.env.REACT_APP_AGORA_APP_ID,
  // Set the channel name.
  channel: 'test',
  // token for authentication
  token: null,
  // the user ID.
  uid: null,
};

// for fetching the token from backend api
// 'http://localhost:3001/api/rtctoken'
const setAgoraToken = async () => {
  try {
    // fetch the token from api-endpoint
    const { uid, token } = await agoraServices.fetchAgoraToken(
      options.channel,
      true
    );
    // set the token for joining the channel
    options.uid = uid;
    options.token = token;

    console.log('channel-name :>> ', options.channel);
    console.log('user-id :>> ', options.uid);
    console.log('token :>> ', token);
  } catch (error) {
    console.log('error getting token from Agora :>> ', error);
  }
};

// when the user joins a meeting either through
// 'create-meeting-button' or 'url', this function
// needs to be called
const startVideoCall = async (setOptions) => {
  // Create an AgoraRTCClient object.
  rtc.client = AgoraRTC.createClient({ mode: 'rtc', codec: 'vp8' });
  // set AgoraToken to join the channel
  await setAgoraToken();
  // set the options state
  setOptions(options);
  // Listen for the "user-published" event, from which you can get an AgoraRTCRemoteUser object.
  rtc.client.on('user-published', async (remoteUser, mediaType) => {
    // Subscribe to the remote user when the SDK triggers the "user-published" event
    await rtc.client.subscribe(remoteUser, mediaType);
    console.log('subscribe success');

    // If the remote user publishes a video track.
    if (mediaType === 'video') {
      // Get the RemoteVideoTrack object in the AgoraRTCRemoteUser object.
      rtc.remoteVideoTrack = remoteUser.videoTrack;
      // Dynamically create a container in the form of a DIV element for playing the remote video track.
      const remotePlayerContainer = document.createElement('div');
      // Specify the ID of the DIV container. You can use the uid of the remote user.
      remotePlayerContainer.id = remoteUser.uid.toString();
      remotePlayerContainer.textContent = 'Remote user ' + remoteUser.uid;
      remotePlayerContainer.style.width = '640px';
      remotePlayerContainer.style.height = '480px';
      document.body.append(remotePlayerContainer);

      // Play the remote video track.
      // Pass the DIV container and the SDK dynamically creates a player in the container for playing the remote video track.
      rtc.remoteVideoTrack.play(remotePlayerContainer);

      // Or just pass the ID of the DIV container.
      // remoteVideoTrack.play(playerContainer.id);
    }

    // If the remote user publishes an audio track.
    if (mediaType === 'audio') {
      // Get the RemoteAudioTrack object in the AgoraRTCRemoteUser object.
      rtc.remoteAudioTrack = remoteUser.audioTrack;
      // Play the remote audio track. No need to pass any DOM element.
      rtc.remoteAudioTrack.play();
    }

    // Listen for the "user-unpublished" event
    rtc.client.on('user-unpublished', (user) => {
      // Get the dynamically created DIV container.
      console.log('user :>> ', user);
      const remotePlayerContainer = document.getElementById(
        user.uid.toString()
      );
      // Destroy the container.
      console.log(`remoteplayercontainer`, remotePlayerContainer);
      remotePlayerContainer && remotePlayerContainer.remove();
    });
  });
};

const handleJoin = async (setRtc) => {
  // Join an RTC channel.
  await rtc.client.join(
    options.appId,
    options.channel,
    options.token,
    options.uid
  );
  // Create a local audio track from the audio sampled by a microphone.
  rtc.localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack();
  // Create a local video track from the video captured by a camera.
  rtc.localVideoTrack = await AgoraRTC.createCameraVideoTrack();
  // Publish the local audio and video tracks to the RTC channel.
  await rtc.client.publish([rtc.localAudioTrack, rtc.localVideoTrack]);
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
  setRtc(rtc);
  console.log('publish success!');
};
const handleLeave = async () => {
  // Destroy the local audio and video tracks.
  rtc.localAudioTrack.close();
  rtc.localVideoTrack.close();

  // Traverse all remote users.
  rtc.client.remoteUsers.forEach((user) => {
    // Destroy the dynamically created DIV containers.
    const playerContainer = document.getElementById(user.uid.toString());
    console.log(`playerContainer`, playerContainer);
    playerContainer && playerContainer.remove();
  });

  // Leave the channel.
  await rtc.client.leave();
};

const helpers = { startVideoCall, handleJoin, handleLeave };
export default helpers;
