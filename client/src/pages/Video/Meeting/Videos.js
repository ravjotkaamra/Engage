import React from 'react';
import { AgoraVideoPlayer } from 'agora-rtc-react';
import { Box } from '@chakra-ui/layout';

const Videos = ({ remoteUsers, tracks }) => {
  return (
    <Box>
      <Box id="videos">
        <AgoraVideoPlayer className="vid" videoTrack={tracks[1]} />
        {remoteUsers?.map((user) =>
          user.videoTrack ? (
            <AgoraVideoPlayer
              className="vid"
              videoTrack={user.videoTrack}
              key={user.uid}
            />
          ) : null
        )}
      </Box>
    </Box>
  );
};

export default Videos;
