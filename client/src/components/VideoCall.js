import React, { useState, useEffect } from 'react';
import agoraServices from '../services/agora';
import { Box } from '@chakra-ui/layout';
import { createClient, createMicrophoneAndCameraTracks } from 'agora-rtc-react';
import Controls from './Controls';
import Videos from './Videos';
// constants for configuring AgoraRTC
const agoraConfig = {
  mode: 'rtc',
  codec: 'vp8',
};
const agoraAppId = process.env.REACT_APP_AGORA_APP_ID; //ENTER APP ID HERE
const useClient = createClient(agoraConfig);
const useMicrophoneAndCameraTracks = createMicrophoneAndCameraTracks();

const VideoCall = ({ setInCall, channelName }) => {
  const client = useClient();
  const { ready, tracks } = useMicrophoneAndCameraTracks();
  console.log('client :>> ', client);
  const [remoteUsers, setRemoteUsers] = useState([]);
  const [start, setStart] = useState(false);

  console.log('start :>> ', start);
  console.log('remoteUsers :>> ', remoteUsers);
  console.log('ready :>> ', ready);
  console.log('tracks :>> ', tracks);
  useEffect(() => {
    // function to initialise the SDK
    const init = async (channelName) => {
      client.on('user-published', async (remoteUser, mediaType) => {
        await client.subscribe(remoteUser, mediaType);
        console.log('subscribe success');
        if (mediaType === 'video') {
          setRemoteUsers((prevUsers) => {
            return [...prevUsers, remoteUser];
          });
        }
        if (mediaType === 'audio') {
          remoteUser.audioTrack?.play();
        }
      });

      client.on('user-unpublished', (remoteUser, type) => {
        console.log('unpublished', remoteUser, type);
        if (type === 'audio') {
          remoteUser.audioTrack?.stop();
        }
        if (type === 'video') {
          setRemoteUsers((prevUsers) => {
            return prevUsers.filter((u) => u.uid !== remoteUser.uid);
          });
        }
      });

      client.on('user-left', (remoteUser) => {
        console.log('leaving', remoteUser);
        setRemoteUsers((prevUsers) => {
          return prevUsers.filter((u) => u.uid !== remoteUser.uid);
        });
      });

      const { uid, token } = await agoraServices.fetchAgoraToken(channelName);
      await client.join(agoraAppId, channelName, token, uid);
      if (tracks) {
        await client.publish([tracks[0], tracks[1]]);
      }
      setStart(true);
    };

    if (ready && tracks) {
      console.log('init ready');
      init(channelName);
    }
  }, [channelName, client, ready, tracks]);

  return (
    <Box className="App">
      {ready && tracks && (
        <Controls
          useClient={useClient}
          tracks={tracks}
          setStart={setStart}
          setInCall={setInCall}
        />
      )}
      {start && tracks && <Videos remoteUsers={remoteUsers} tracks={tracks} />}
    </Box>
  );
};
export default VideoCall;
