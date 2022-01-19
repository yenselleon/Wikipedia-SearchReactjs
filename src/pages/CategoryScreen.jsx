import React, { useEffect } from 'react'
import Container from '@mui/material/Container';
import CardArticle from '../components/CardArticle'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { Box } from '@mui/system';
import { Card, Stack, Typography } from '@mui/material';
import notImage from '../images/not_image.jpg';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {jsonDataCategory} from '../helpers/categoriesJSON/categorys'
import { getDatacategory } from '../actions/getData'
import SearchInput from '../components/SearchInput';

import Slider from "react-slick";

const CategoryScreen = () => {


    const {categorys} = useSelector(state => state.getData);
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

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

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
            {/* header Section */}
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
                {categoryParam}
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
