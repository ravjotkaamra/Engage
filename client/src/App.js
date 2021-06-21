import React, { useEffect } from 'react';
import AgoraRTC from 'agora-rtc-sdk-ng';
import agoraServices from './services/agora';

const rtc = {
  localAudioTrack: null,
  localVideoTrack: null,
  client: null,
};

const options = {
  // app id
  appId: process.env.REACT_APP_AGORA_APP_ID,
  // Set the channel name.
  channel: Math.random().toString(36).substr(2, 5),
  // token for authentication
  token: null,
  // the user ID.
  uid: null,
};

async function startBasicCall() {
  // Create an AgoraRTCClient object.
  rtc.client = AgoraRTC.createClient({ mode: 'rtc', codec: 'vp8' });

  // Listen for the "user-published" event, from which you can get an AgoraRTCRemoteUser object.
  rtc.client.on('user-published', async (user, mediaType) => {
    // Subscribe to the remote user when the SDK triggers the "user-published" event
    await rtc.client.subscribe(user, mediaType);
    console.log('subscribe success');

    // If the remote user publishes a video track.
    if (mediaType === 'video') {
      // Get the RemoteVideoTrack object in the AgoraRTCRemoteUser object.
      const remoteVideoTrack = user.videoTrack;
      // Dynamically create a container in the form of a DIV element for playing the remote video track.
      const remotePlayerContainer = document.createElement('div');
      // Specify the ID of the DIV container. You can use the uid of the remote user.
      remotePlayerContainer.id = user.uid.toString();
      remotePlayerContainer.textContent = 'Remote user ' + user.uid.toString();
      remotePlayerContainer.style.width = '640px';
      remotePlayerContainer.style.height = '480px';
      document.body.append(remotePlayerContainer);

      // Play the remote video track.
      // Pass the DIV container and the SDK dynamically creates a player in the container for playing the remote video track.
      remoteVideoTrack.play(remotePlayerContainer);

      // Or just pass the ID of the DIV container.
      // remoteVideoTrack.play(playerContainer.id);
    }

    // If the remote user publishes an audio track.
    if (mediaType === 'audio') {
      // Get the RemoteAudioTrack object in the AgoraRTCRemoteUser object.
      const remoteAudioTrack = user.audioTrack;
      // Play the remote audio track. No need to pass any DOM element.
      remoteAudioTrack.play();
    }

    // Listen for the "user-unpublished" event
    rtc.client.on('user-unpublished', (user) => {
      // Get the dynamically created DIV container.
      console.log('user :>> ', user);
      const remotePlayerContainer = document.getElementById(
        user.uid.toString()
      );
      // Destroy the container.
      remotePlayerContainer.remove();
    });
  });
}

const App = () => {
  useEffect(() => {
    startBasicCall();
  }, []);

  useEffect(() => {
    agoraServices
      .createToken(options.channel, true)
      .then((response) => {
        const { uid, token } = response;
        options.uid = uid;
        options.token = token;
        console.log(`response`, response);
        console.log('options.channel :>> ', options.channel);
      })
      .catch((error) => {
        console.log(`error`, error);
      });
  }, []);

  const handleJoin = async () => {
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
    const localPlayerContainer = document.createElement('div');
    // Specify the ID of the DIV container. You can use the uid of the local user.
    localPlayerContainer.id = options.uid;
    localPlayerContainer.textContent = 'Local user ' + options.uid;
    localPlayerContainer.style.width = '640px';
    localPlayerContainer.style.height = '480px';
    document.body.append(localPlayerContainer);

    // Play the local video track.
    // Pass the DIV container and the SDK dynamically creates a player in the container for playing the local video track.
    rtc.localVideoTrack.play(localPlayerContainer);
    console.log('publish success!');
  };

  const handleLeave = async () => {
    // Destroy the local audio and video tracks.
    rtc.localAudioTrack.close();
    rtc.localVideoTrack.close();

    // Traverse all remote users.
    rtc.client.remoteUsers.forEach((user) => {
      // Destroy the dynamically created DIV containers.
      const playerContainer = document.getElementById(user.uid);
      playerContainer && playerContainer.remove();
    });

    // Leave the channel.
    await rtc.client.leave();
  };

  return (
    <div>
      <h2 className="left-align">Agora Video Web SDK Quickstart</h2>
      <div className="row">
        <div>
          <button type="button" id="join" onClick={handleJoin}>
            JOIN
          </button>
          <button type="button" id="leave" onClick={handleLeave}>
            LEAVE
          </button>
        </div>
      </div>
    </div>
  );
};
export default App;
