import React, { useEffect, useState } from 'react'
import Container from '@mui/material/Container';

import CardArticle from '../components/CardArticle';
import { useDispatch, useSelector } from 'react-redux';
import { startSearchInputParams } from '../actions/ui';
import { useParams } from 'react-router-dom'
import { Box } from '@mui/system';
import { Card, Skeleton, Stack, Typography } from '@mui/material';
import notImage from '../images/not_image.jpg';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


import Slider from "react-slick";
import SearchInput from '../components/SearchInput';

const SearchScreen = () => {


    const {searchedResults} = useSelector(state => state.ui);
    const {searchInput} = useParams();
    const dispatch = useDispatch();

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        cssEase: "linear"
    };

    const getDataFromInputSearh = ()=> {
        dispatch(startSearchInputParams(searchInput));
    }

    
    useEffect(() => {
        getDataFromInputSearh()

    }, [searchInput])

    /* useEffect(() => {
        if(categorys.length > 0){
            setArticlesState()

        }

    }, [categorys]) */

    console.log(searchedResults)

    return (
        <Container
            sx={{
                maxWidth: {xs: 'xs', md: 'md', lg: 'lg'}, 
                marginTop: '0px',
                /* border:'1px solid red', */
                background: '#EAEEF3'
            }}
        >

            {/* Header Section */}
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
                        searchedResults.length > 0
                        ?
                            <Slider {...settings} className="carouselWrapper">
                                {
                                    searchedResults.map(( articles, i) => (
                                        articles.hasOwnProperty('thumbnail') &&
                                            <img src={ articles?.thumbnail.source ? articles.thumbnail.source : notImage} alt="not_image" key={i} className="imageCarousel"/>
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
                    searchedResults.length > 0 ?
                    searchedResults.map((data)=> (

                            (data.hasOwnProperty('pageid')) &&
                                <CardArticle
                                    data={{
                                        title: data.title,
                                        description: data.extract,
                                        imageSource: data.hasOwnProperty('thumbnail') ? data.thumbnail.source : undefined,
                                        linkToWikipedia: `https://en.wikipedia.org/w/index.php?curid=${data.pageid}`,
                                        pageId: data.pageid
                                    }} 
                                    key={data.pageid}
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
        </Container>
    )
}

export default SearchScreen;

