import React, { useEffect, useState } from 'react'
import Container from '@mui/material/Container';

import CardArticle from '../components/CardArticle';
import { useDispatch, useSelector } from 'react-redux';
import { startSearchInputParams } from '../actions/ui';
import { useParams } from 'react-router-dom'
import { Box } from '@mui/system';
import { Stack } from '@mui/material';
import notImage from '../images/not_image.jpg';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


import Slider from "react-slick";

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
            <Stack
                justifyContent="center"
                direction="row"
                marginBottom="30px"
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
                    : <h1>Cargando</h1>
                }

            </Stack>


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
                                        linkToWikipedia: `https://en.wikipedia.org/w/index.php?curid=${data.pageid}` 
                                    }} 
                                    key={data.pageid}
                                />
                            
                        ))
                    :
                        <h1>notData</h1>
                }
            </Stack>
        </Container>
    )
}

export default SearchScreen;

