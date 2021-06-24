import React, { useEffect, useState } from 'react';
import { Box, Heading } from '@chakra-ui/layout';
import { Input } from '@chakra-ui/input';
import agoraServices from './services/agora';
import {
  AgoraVideoPlayer,
  createClient,
  createMicrophoneAndCameraTracks,
} from 'agora-rtc-react';

const agoraConfig = {
  mode: 'rtc',
  codec: 'vp8',
};

const agoraAppId = process.env.REACT_APP_AGORA_APP_ID; //ENTER APP ID HERE

const App = () => {
  const [inCall, setInCall] = useState(false);
  const [channelName, setChannelName] = useState('');
  return (
    <Box>
      <Heading className="heading">Video Chat App</Heading>
      {inCall ? (
        <VideoCall setInCall={setInCall} channelName={channelName} />
      ) : (
        <ChannelForm setInCall={setInCall} setChannelName={setChannelName} />
      )}
    </Box>
  );
};

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
        <Controls tracks={tracks} setStart={setStart} setInCall={setInCall} />
      )}
      {start && tracks && <Videos remoteUsers={remoteUsers} tracks={tracks} />}
    </Box>
  );
};

const Videos = ({ remoteUsers, tracks }) => {
  return (
    <Box>
      <Box id="videos">
        <AgoraVideoPlayer className="vid" videoTrack={tracks[1]} />
        {remoteUsers.length > 0 &&
          remoteUsers.map((user) => {
            if (user.videoTrack) {
              return (
                <AgoraVideoPlayer
                  className="vid"
                  videoTrack={user.videoTrack}
                  key={user.uid}
                />
              );
            } else return null;
          })}
      </Box>
    </Box>
  );
};

export const Controls = ({ tracks, setStart, setInCall }) => {
  const client = useClient();
  const [trackState, setTrackState] = useState({ video: true, audio: true });

  const mute = async (type) => {
    if (type === 'audio') {
      await tracks[0].setEnabled(!trackState.audio);
      setTrackState((ps) => {
        return { ...ps, audio: !ps.audio };
      });
    } else if (type === 'video') {
      await tracks[1].setEnabled(!trackState.video);
      setTrackState((ps) => {
        return { ...ps, video: !ps.video };
      });
    }
  };

  const leaveChannel = async () => {
    await client.leave();
    client.removeAllListeners();
    tracks[0].close();
    tracks[1].close();
    setStart(false);
    setInCall(false);
  };

  return (
    <Box className="controls">
      <p className={trackState.audio ? 'on' : ''} onClick={() => mute('audio')}>
        {trackState.audio ? 'MuteAudio' : 'UnmuteAudio'}
      </p>
      <p className={trackState.video ? 'on' : ''} onClick={() => mute('video')}>
        {trackState.video ? 'MuteVideo' : 'UnmuteVideo'}
      </p>
      {<p onClick={() => leaveChannel()}>Leave</p>}
    </Box>
  );
};

const ChannelForm = ({ setInCall, setChannelName }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    setInCall(true);
  };

  return (
    <form className="join" onSubmit={handleSubmit}>
      <Input
        type="text"
        placeholder="Enter Channel Name"
        onChange={(e) => setChannelName(e.target.value)}
      />
      <button type="submit">Join</button>
    </form>
  );
};

export default App;
