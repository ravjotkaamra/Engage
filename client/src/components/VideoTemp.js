import { Heading, Box, Center, useColorModeValue } from '@chakra-ui/react';
import React, { useEffect } from 'react';

const Video = (props) => {
  useEffect(() => {
    if (props.videoTrack && props.videoTrack.play) {
      props.videoTrack.play(props.id);
    }
  }, [props.id, props.videoTrack]);

  return (
    <Center py={6}>
      <Box
        minW={'xl'}
        w={'full'}
        bg={useColorModeValue('white', 'gray.900')}
        boxShadow={'2xl'}
        rounded={'lg'}
        p={6}
        textAlign={'center'}
      >
        <Box id={props.id} w="100%" h="300" bg="grey" />
        <Heading fontSize={'2xl'} fontFamily={'body'}>
          {props.name}
        </Heading>
      </Box>
    </Center>
  );
};

export default Video;
