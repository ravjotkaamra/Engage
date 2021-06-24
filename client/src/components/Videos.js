import React from 'react';
import { AgoraVideoPlayer } from 'agora-rtc-react';
import { Box } from '@chakra-ui/layout';

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

export default Videos;
