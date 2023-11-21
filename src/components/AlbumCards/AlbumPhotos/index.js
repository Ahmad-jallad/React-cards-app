import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Button, Flex, Image, Text, Box } from '@chakra-ui/react';
import { Spinner } from '@chakra-ui/react'


const AlbumPhotos = () => {
  const { id } = useParams();
  const [album, setAlbum] = useState(null);
  const [albumPhotos, setAlbumPhotos] = useState([]);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  useEffect(() => {
    const fetchAlbumDetails = async () => {
      try {
        const albumResponse = await axios.get(`https://jsonplaceholder.typicode.com/albums/${id}`);
        const photosResponse = await axios.get(`https://jsonplaceholder.typicode.com/photos?albumId=${id}`);

        setAlbum(albumResponse.data);
        setAlbumPhotos(photosResponse.data);
      } catch (error) {
        console.error('Error fetching album details:', error);
      }
    };

    fetchAlbumDetails();
  }, [id]);

  const showPreviousPhoto = () => {
    setCurrentPhotoIndex((prevIndex) => Math.max(0, prevIndex - 1));
  };

  const showNextPhoto = () => {
    setCurrentPhotoIndex((prevIndex) => Math.min(albumPhotos.length - 1, prevIndex + 1));
  };

  if (!album) {
    return (<Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <Spinner />
    </Box>);
  }

  const currentPhoto = albumPhotos[currentPhotoIndex];

  return (
    <Box background="linear-gradient(90deg, rgba(0,0,0,0.9962578781512605) 0%, rgba(99,43,187,1) 1%, rgba(0,212,255,1) 100%)">

      <Flex direction="column" align="center">
        <Text fontSize="2xl" fontWeight="bold" mb="4">
          {album.title}
        </Text>
        <Image src={currentPhoto ? currentPhoto.url : ''} alt={currentPhoto ? currentPhoto.title : ''} mb="4" />

        <Flex>
          <Button onClick={showPreviousPhoto} mr="2" isDisabled={currentPhotoIndex === 0}>
            Previous
          </Button>
          <Button onClick={showNextPhoto} isDisabled={currentPhotoIndex === albumPhotos.length - 1}>
            Next
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
};

export default AlbumPhotos;
