import React, { useEffect, useState } from 'react';
import { ChakraProvider, Box, Flex, Text, Icon, Link, SimpleGrid, HStack } from '@chakra-ui/react';
import { FaGithub, FaCloudSun } from 'react-icons/fa';
import NewsCard from './components/news-card';
import { PaginationItems, PaginationNextTrigger, PaginationPrevTrigger, PaginationRoot } from './components/ui/pagination';

// we are using nytimes api sharing link below
// https://developer.nytimes.com/

const App = () => {
  const [news, setNews] = useState([]);
  const [pageRecord, setPageRecord] = useState({
    data: [], 
    cureentPagination: 1, 
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
    async function newsMap() {

    }

     await fetch(url, options).then(
      async (response) => {
        if (response.ok) {
          return await response.text();
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
        setPageRecord((prev)=> {
          var currentPageRecord = {...prev};
          currentPageRecord.data = [...result.results.slice((currentPageRecord.cureentPagination - 1) * currentPageRecord.limit, currentPageRecord.cureentPagination * currentPageRecord.limit)];
          return currentPageRecord;
        })

      })
      .catch(err => {
        console.error(err);
      }).finally();
  }

  const changePage = (pageDetail) => {
    console.log(pageDetail);
    setPageRecord((prev)=> {
      var currentPageRecord = {...prev};
      currentPageRecord.data = news.slice((pageDetail.page - 1) * currentPageRecord.limit, pageDetail.page * currentPageRecord.limit);
      return currentPageRecord;
    })
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
          {pageRecord.data.length > 0 && (
            pageRecord.data.map((x, index) => {
              return (
                <NewsCard title={x.title} description={x.abstract} imagePayload={x.multimedia} key={index} />
              )
            })
          )}
        </SimpleGrid>
        
        <PaginationRoot count={500} pageSize={pageRecord.limit} defaultPage={1} type='button' onPageChange={(PageChangeDetails)=>{ changePage(PageChangeDetails) }} variant="solid" >
          <HStack>
            <PaginationPrevTrigger h={10} value={"Prev"} text="Prev"/>
            <PaginationItems />
            <PaginationNextTrigger value={"Next"}/>
          </HStack>
        </PaginationRoot>

        {/* Footer */}
        <Box as="footer" mt={4} p={4} textAlign="center" borderTopWidth="1px">
          <Text>Made with love @ahmydev</Text>
        </Box>
      </Flex>
  );
};

export default App;