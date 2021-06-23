import React from 'react';
import { useSelector } from 'react-redux';
import Video from './Video';

const VideoConference = () => {
  //   const remoteClients = useSelector((agora) => agora.remoteClients);

  //   if (!remoteClients) {
  //     return null;
  //   }

  //   const id = remoteClients[0].uid.toString();
  //   const videoTrack = remoteClients[0].video;
  //   return <Video videoTrack={videoTrack} id={id} name="Lindsey James" />;

  const localClient = useSelector(({ agora }) => agora.localClient);
  const options = useSelector(({agora}) => agora.options);
  if (!localClient.video || !options.uid) {
    return null;
  }
  return (
    <Video
      videoTrack={localClient.video}
      id={options.uid.toString()}
      name="Ravjot Singh"
    />
  );
};

export default VideoConference;
