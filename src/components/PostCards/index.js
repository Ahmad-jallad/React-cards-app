import './PostCards.css';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AlbumsCards from '../AlbumCards';
// import CommentsPage from './CommentsPage';
import axios from 'axios';

import { ChakraProvider, Grid } from '@chakra-ui/react'
import { Box, Button, Text } from "@chakra-ui/react";

const PostCards = () => {

  const [posts, setPosts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchPostsAndUsers = async () => {
      try {
        const postsResponse = await axios.get('https://jsonplaceholder.typicode.com/posts');
        const usersResponse = await axios.get('https://jsonplaceholder.typicode.com/users');

        const postsData = postsResponse.data;
        const usersData = usersResponse.data;

        const combinedPosts = postsData.map(post => {
          const user = usersData.find(user => user.id === post.userId);
          return { ...post, user };
        });

        setPosts(combinedPosts);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchPostsAndUsers();
  }, []);

  const createPostCard = (post) => {
    return (
      <>
        <Box
          borderWidth="1px"
          borderColor="#00234e"
          backgroundColor="rgba(234, 234, 234, 0.916)"
          borderRadius="10px"
          m={10}
          p="10px"
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


          <Link to={`/comments/${post.id}`} key={post.id} >

            <Text fontWeight='bold' m={2}>Name : {post.user.name}</Text>

            <Text fontSize={"xl"} m={2}>Title : {post.title}</Text>

            <Text m={2}>Body : {post.body}</Text>
          </Link>
        </Box>
      </>
    );
  };


  return (

    <Box background="linear-gradient(90deg, rgba(0,0,0,0.9962578781512605) 0%, rgba(99,43,187,1) 1%, rgba(0,212,255,1) 100%)">
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
        <Text fontWeight='bold' fontSize={20}>PostCards</Text>

      </Box>

      <Text justifyContent='center' textAlign='center'>
        Click on the card to see the comments
      </Text>

      <Grid templateColumns="repeat(3, 1fr)"
        gap='8'
        autoRows="minmax(100px, auto)"
        justifyItems="center"
        background="linear-gradient(90deg, rgba(0,0,0,0.9962578781512605) 0%, rgba(99,43,187,1) 1%, rgba(0,212,255,1) 100%)"
      >
        {posts.slice(0, currentIndex + 6).map(post => createPostCard(post))}

        <Button onClick={() => setCurrentIndex(currentIndex + 3)}
          justifyContent="center"
          alignItems="center"
          marginBottom="10"
          borderRadius="10"
          p={5}
          ml="215%"
          backgroundColor="#ffffff6b"

          _hover={{ backgroundColor: '#ffffffde' }}
        >
          Load More
        </Button>

      </Grid>

      <AlbumsCards />
    </Box>

  );
};

export default PostCards;
