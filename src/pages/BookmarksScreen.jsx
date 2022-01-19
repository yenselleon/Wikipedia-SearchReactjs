import { Box, Card, Container, Skeleton, Stack, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css";

import Slider from "react-slick";
import CardArticle from '../components/CardArticle';
import SearchInput from '../components/SearchInput';

const BookmarksScreen = () => {
    
    const {bookmarks} = useSelector(state => state.localStoragedata)

    /* pagination parameters */
    const [pageNumber, setPageNumber] = useState(1);

    const itemsPerPage = 9;
    const lastPagesVisited = pageNumber * itemsPerPage;
    const newPagesVisited = lastPagesVisited - itemsPerPage;

    const displayItems = bookmarks?.slice(newPagesVisited, lastPagesVisited);
    
    const UpdatePage = (page) => {
        setPageNumber(page);
      };
    
    /* pagination parameters */


    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        cssEase: "linear"
    };
    return (
        <Container
            sx={{
                paddingBottom: "30px",
                maxWidth: {xs: 'xs', md: 'md', lg: 'lg'}, 
                marginTop: '0px',
                /* border:'1px solid red', */
                background: '#EAEEF3'
            }}
        >

            {/* Header section */}
            <Box 
                px="3px" 
                py="5px" 
                display="flex" 
                justifyContent="center"
                alignItems="start"
                sx={{
                    background: '#20232B',
                    height: '330px',
                    width: '100%',
                    marginBottom: '100px',
                    position: 'relative'
                }}
            >
                <Box
                    sx={{
                        marginTop: '20px'
                    }}
                >
                    <SearchInput/>
                    <Typography 
                        gutterBottom 
                        
                        component="div"
                        sx={{
                            textAlign: 'center',
                            color: '#FF9100',
                            marginTop: '10px',
                            fontFamily: 'var(--barlow)',
                            fontSize: {sx: '1.2rem', md: '1.3rem'}
                        }}
                    >
                        Search everything you want on Wikipedia
                    </Typography>
                    <Typography 
                        gutterBottom 
                        variant="overline" 
                        component="div"
                        sx={{
                            textAlign: 'center',
                            color: 'white',
                            marginTop: '5px',
                            fontFamily: 'var(--poppins)',
                            fontW: '400'
                        }}
                    >
                        Designed By Yensel Leon
                    </Typography>
                </Box>

                {/* Slider Images */}
                <Card
                    raised={true}
                    direction="row"
                    sx={{
                        position: 'absolute',
                        bottom: '-80px',
                        zIndex: '9',
                        width: {xs: '250px' , md: '450px'},
                        height: '250px',
                        borderRadius: '10px',
                        background: '#FFFF',
                        display: 'flex',
                        justifyContent: "center"
                    }}
                >
                    {
                        bookmarks.length > 0
                        ?
                            <Slider {...settings} className="carouselWrapper">
                                {
                                    displayItems.map(( articles, i) => (
                                        articles.hasOwnProperty('imageSource') &&
                                            <img src={ articles.imageSource} alt="imagePost" key={i} className="imageCarousel"/>
                                    ))
                                }
                            </Slider>
                        : 
                        <Skeleton  
                            variant="rectangular" 
                            sx={{
                                width: '100%',
                                height: '250px'
                            }} 
                        />
                    }
                

                </Card>
            </Box>
            

            <Typography 
                gutterBottom 
                component="div"
                sx={{
                    textAlign: 'center',
                    marginTop: '10px',
                    fontFamily: 'var(--barlow)',
                    fontSize: {sx: '1.2rem', md: '1.3rem'}
                }}
            >
                Bookmarks
            </Typography>

            {/* seccion de articulos */}
            <Stack
                direction={{ xs: 'column', sm: 'row' }}
                justifyContent="center"
                alignItems={{xs: 'center', md: 'normal'}}
                sx={{
                    flexWrap: 'wrap',
                    /* border:'1px solid red' */
                }}
            >
                {
                    bookmarks.length > 0 ?
                        displayItems.map((data)=> (

                                (data.hasOwnProperty('pageId')) &&
                                    <CardArticle
                                        data={data} 
                                        key={data.pageId}
                                    />
                                
                            ))
                    :
                        <Skeleton  
                            variant="rectangular" 
                            sx={{
                                width: '100%',
                                height: '350px'
                            }} 
                        />
                }
            </Stack>

            <Box
                width={"100%"}
                display={"flex"}
                justifyContent={"center"}
            >

                <Pagination
            
                    defaultCurrent={0}
                    onChange={UpdatePage}
                    current={pageNumber}
                    total={bookmarks?.length}
                    pageSize={itemsPerPage}
                    style={{margin: "25px 0px"}}
                />

            </Box>
        </Container>
    )
}

export default BookmarksScreen;
