import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Box, ButtonGroup, Icon, IconButton } from '@chakra-ui/react';
import { ImPhoneHangUp } from 'react-icons/im';
import {
  FaMicrophone,
  FaMicrophoneSlash,
  FaVideo,
  FaVideoSlash,
} from 'react-icons/fa';
import { MdChat } from 'react-icons/md';

const Controls = ({ tracks, setStart, useClient, onOpen }) => {
  const client = useClient();
  const [trackState, setTrackState] = useState({ video: true, audio: true });
  const history = useHistory();

  const { teamId, meetId } = useParams();

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
    history.push(`/chat/${teamId}/meet/${meetId}`);
  };

  return (
    <Box
      position="fixed"
      bottom={10}
      right={10}
      m="auto"
      textAlign="center"
      alignItems="center"
      justifyItems="center"
      w="100%"
    >
      <ButtonGroup variant="solid">
        <IconButton
          className={trackState.audio ? 'on' : ''}
          onClick={() => mute('video')}
          colorScheme="blackAlpha"
          aria-label="Toggle Video Camera"
          icon={trackState.video ? <FaVideo /> : <FaVideoSlash />}
          padding={4}
        />
        <IconButton
          className={trackState.audio ? 'on' : ''}
          onClick={() => mute('audio')}
          colorScheme="blackAlpha"
          aria-label="Toggle microphone"
          icon={trackState.audio ? <FaMicrophone /> : <FaMicrophoneSlash />}
          padding={4}
        />
        <IconButton
          onClick={onOpen}
          colorScheme="blackAlpha"
          aria-label="Chat Modal"
          icon={<Icon as={MdChat} boxSize={5} />}
          padding={4}
        />
        <IconButton
          onClick={() => leaveChannel()}
          colorScheme="red"
          aria-label="hangup call"
          icon={<ImPhoneHangUp />}
          padding={4}
        />
      </ButtonGroup>
    </Box>
  );
};

export default Controls;
