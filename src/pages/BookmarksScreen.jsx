import { Container, Stack } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import notImage from '../images/not_image.jpg';

import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css";

import Slider from "react-slick";
import CardArticle from '../components/CardArticle';


const BookmarksScreen = () => {
    
    const {bookmarks} = useSelector(state => state.localStoragedata)
    const dispatch = useDispatch()

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
    console.log({lastPagesVisited, newPagesVisited, displayItems})

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
                    bookmarks.length > 0 ?
                        displayItems.map((data)=> (

                                (data.hasOwnProperty('pageId')) &&
                                    <CardArticle
                                        data={data} 
                                        key={data.pageId}
                                    />
                                
                            ))
                    :
                        <h1>notData</h1>
                }
            </Stack>

            <Pagination
          
                defaultCurrent={0}
                onChange={UpdatePage}
                current={pageNumber}
                total={bookmarks?.length}
                pageSize={itemsPerPage}
                style={{margin: "25px 0px"}}
            />
        </Container>
    )
}

export default BookmarksScreen;
