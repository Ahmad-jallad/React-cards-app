
import './AlbumCards.css';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Text, Box, Grid } from '@chakra-ui/react';


const AlbumsCards = () => {
  const [albums, setAlbums] = useState([]);
  const [currentAlbum, setCurrentAlbum] = useState(null);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [albumPhotos, setAlbumPhotos] = useState([]);
  const [albumsToDisplay, setAlbumsToDisplay] = useState(2); // Initial display
  const albumsToLoad = 2; // Number of albums to load when clicking "Load More"

  useEffect(() => {
    fetchAlbums();
  }, []);

  const fetchAlbums = () => {
    axios
      .get('https://jsonplaceholder.typicode.com/albums')
      .then((response) => {
        setAlbums(response.data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const openAlbumPopup = (album) => {
    setCurrentAlbum(album);
    setCurrentPhotoIndex(0);

    axios
      .get(`https://jsonplaceholder.typicode.com/photos?albumId=${album.id}`)
      .then((response) => {
        setAlbumPhotos(response.data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const loadMoreAlbums = () => {
    setAlbumsToDisplay(albumsToDisplay + albumsToLoad);
  };

  return (
    <>
      <Box
        backgroundColor="rgba(255, 255, 255, 0.353)"
        display="flex"
        textAlign="center"
        alignItems="center"
        justifyContent="center"
        padding="1rem 1.5rem"
        marginBottom="10px"
        marginTop="-20px"
        _hover={{ backgroundColor: 'rgba(255, 255, 255, 0.67)' }}
      >
        <Text>AlbumCards</Text>

      </Box>
      <Text justifyContent='center' textAlign='center' fontWeight='bold'>
        Click on the album to see the posts
      </Text>
      <Grid
        templateColumns="repeat(2, 1fr)"
        gap="20px"
        justifyContent="center" // Centers items horizontally
        autoRows="minmax(100px, auto)"
        justifyItems="center"
        textAlign="center"
      >
        {albums.slice(0, albumsToDisplay).map((album) => (
          <Link key={album.id} to={`/albums/${album.id}`} >
            <Box
              borderWidth="1px"
              borderColor="#00234e"
              backgroundColor="rgba(234, 234, 234, 0.916)"
              borderRadius="10px"
              m={10}
              p="20px"
              w="300px"
              display="inline-block"
              verticalAlign="top"
              cursor="pointer"
              boxShadow="5px 5px 10px rgba(0, 0, 0, 0.5)"
              transition="0.2s"
              _hover={{
                transform: "scale(1.1)",
                boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
                borderColor: "rgb(255, 0, 0)",
                transition: "0.3s",
              }}
            >
              {album.title}
            </Box>

          </Link>
        ))}
      </Grid >
      {
        albumsToDisplay < albums.length && (
          <Button onClick={loadMoreAlbums}
            justifyContent='center'
            alignItems='center'
            backgroundColor='#ffffff6b'
            marginLeft="45%"
            mb='30px'
          >
            Load More albums
          </Button>
        )
      }
    </>
  );
};

export default AlbumsCards;
