import React, { useEffect, useState } from 'react'
import Container from '@mui/material/Container';
import CardArticle from '../components/CardArticle'
import { useDispatch, useSelector } from 'react-redux';
import { startGetDataEventOfTheDay } from '../actions/ui';
import { useParams } from 'react-router-dom'
import { Box } from '@mui/system';
import { Stack } from '@mui/material';
import notImage from '../images/not_image.jpg';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {jsonDataCategory} from '../helpers/categoriesJSON/categorys'
import { getDatacategory } from '../actions/ui'

import Slider from "react-slick";

const CategoryScreen = () => {


    const {categorys} = useSelector(state => state.ui);
    const {category:categoryParam} = useParams();
    const dispatch = useDispatch();;

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        cssEase: "linear"
    };

    const getCategorys = ()=> {
        const category = jsonDataCategory.categorys.filter(category => category.category === categoryParam);
        console.log(category[0].pages)
        dispatch(getDatacategory(category[0].pages));
    }

    
    useEffect(() => {
        getCategorys()

    }, [])

    /* useEffect(() => {
        if(categorys.length > 0){
            setArticlesState()

        }

    }, [categorys]) */

    console.log(categorys)

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
                    categorys.length > 0
                    ?
                        <Slider {...settings} className="carouselWrapper">
                            {
                                categorys.map(( articles, i) => (
                                    articles.hasOwnProperty('pageid') &&
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
                    categorys.length > 0 ?
                    categorys.map((data)=> (

                            (data.hasOwnProperty('pageid')) &&
                                <CardArticle 
                                    data={{
                                        title: data.title,
                                        description: data.extract,
                                        imageSource: data.thumbnail.source,
                                        linkToWikipedia: `https://en.wikipedia.org/w/index.php?curid=${data.pageid}`,
                                        pageId: data.pageid
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

export default CategoryScreen
