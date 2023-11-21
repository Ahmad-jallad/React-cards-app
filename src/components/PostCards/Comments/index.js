import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Center, ChakraProvider, Box, CSSReset, Button, Text, UnorderedList, ListItem } from '@chakra-ui/react'
import { Spinner } from '@chakra-ui/react'
// import './PostCards.css';
import axios from 'axios';




const CommentsPage = () => {

  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPostAndComments = async () => {
      try {

        const postResponse = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`);
        const postData = await postResponse.data;


        const commentsResponse = await axios.get(`https://jsonplaceholder.typicode.com/comments?postId=${id}`);
        const commentsData = await commentsResponse.data;
        debugger
        setPost(postData);
        setComments(commentsData);
      } catch (error) {
        console.error('Error fetching post and comments:', error);
      }
    };
    fetchPostAndComments();
  }, [id]);


  const handleBackClick = () => {
    navigate(-1); // Navigate back to the previous page
  };

  return (

    <Box>
      <CSSReset />
      <Center h="90vh" background="linear-gradient(90deg, rgba(0,0,0,0.9962578781512605) 0%, rgba(99,43,187,1) 1%, rgba(0,212,255,1) 100%)">
        <Box
          position="absolute"
          // top="50%"
          // left="50%"
          // transform="translate(-50%, -50%)"

          p="20px"
          boxShadow="0 0 10px rgba(0, 0, 0, 0.7)"
          m="40px"
          background="white"

          // maxW="90%"
          // maxH="90%"

          overflow="auto"
          borderRadius="20px"
        >
          <Text>{post ? post.title : <Spinner />}</Text>
          <Text>{post ? post.body : null}</Text>

          <Text fontWeight="bold">Comments:</Text>
          <UnorderedList>
            {comments.map(comment => (
              <ListItem key={comment.id} m='3' p='1' backgroundColor='#adcaeaa4'>
                <ListItem fontWeight="bold">name : {comment.name}</ListItem>
                <ListItem>comment :{comment.body}</ListItem>
              </ListItem>
            ))}
            <Button onClick={handleBackClick}>Back</Button>
          </UnorderedList>
        </Box>
      </Center>

    </Box>


  );
};

export default CommentsPage;
