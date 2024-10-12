import React, { useEffect, useState } from 'react';
import { ChakraProvider, Box, Flex, Text, Icon, Link, SimpleGrid } from '@chakra-ui/react';
import { FaGithub, FaCloudSun } from 'react-icons/fa';
import NewsCard from './components/news-card';

const App = () => {
  const [news, setNews] = useState([]);
  const [pageRecord, setPageRecord] = useState({
    data: [], 
    cureentPagination: 1, 
    nextPage: 2, 
    prevPage:null, 
    limit: 10
  });
  const [offset, setOffset] = useState(0);



  const loadNews = async (offset = 0) => {
    const url = "https://api.nytimes.com/svc/news/v3/content/all/%22all%22.json?limit=500&api-key=2YHEjOSwVMcJVd3zumH2fe9m5Mmh9zF0";
    const options = {
      method: "GET",
      headers: {
        "Accept": "application/json"
      },
    };

    // axios example saved
    // axios({
    //   // Endpoint to send files
    //   url: url,
    //   method: 'GET',
    //   headers: {
    //     "Accept": "application/json"
    //   },
    // })
    //   // Handle the response from backend here
    //   .then((res) => {
    //     debugger;
    //     // const result = JSON.parse(data);
    //     // setOffset(result.results.length)
    //     // setNews((prev)=> {
    //     //   var updateRecords = [...prev, ...result.results];
    //     //   return updateRecords;
    //     // })
    //   })

    //   // Catch errors if any
    //   .catch((err) => {});

    fetch(url, options).then(
      response => {
        if (response.ok) {
          return response.text();
        }
        return response.text().then(err => {
          return Promise.reject({
            status: response.status,
            statusText: response.statusText,
            errorMessage: err,
          });
        });
      })
      .then(data => {
        const result = JSON.parse(data);
        setOffset(result.results.length)
        setNews((prev)=> {
          var updateRecords = [...prev, ...result.results];
          return updateRecords;
        })
      })
      .catch(err => {
        console.error(err);
      });
  }

  useEffect(() => {
    loadNews(offset)
  },[])

  return (
      <Flex direction="column" minH="100vh">
        {/* Header */}
        <Flex as="header" p={4} align="center" justify="space-between" bg="teal.500" color="white">
          <Text fontSize="2xl" fontWeight="bold">Weather App</Text>
          <Flex>
            <Link href="https://github.com" isExternal mx={2}>
              <Icon as={FaGithub} boxSize={6} />
            </Link>
            <Link href="https://weatherplatform.com" isExternal mx={2}>
              <Icon as={FaCloudSun} boxSize={6} />
            </Link>
          </Flex>
        </Flex>

        {/* Main Content */}
        <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} spacing={4} p={4} flex="1">
          {news.length > 0 && (
            news.map((x, index) => {
              return (
                <NewsCard title={x.title} description={x.abstract} imagePayload={x.multimedia} key={index} />
              )
            })
          )}
        </SimpleGrid>

        {/* Footer */}
        <Box as="footer" mt={4} p={4} textAlign="center" borderTopWidth="1px">
          <Text>Made with love @ahmydev</Text>
        </Box>
      </Flex>
  );
};

export default App;