import { Avatar, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { DiGithubBadge } from "react-icons/di";
import { AiFillLinkedin, AiFillTwitterCircle } from "react-icons/ai";

const Footer = () => {
    return (
        <Box 
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            sx={{ 
                flexGrow: 1,
                background: "#FF9100"
            }}
            className="footer__wrapper"
        >
        
            <Box
                padding={"25px"}
                width={"200px"}
                
            >

                <Typography 
                    gutterBottom 
                    textAlign="center"
                    component="div"
                    sx={{
                        fontFamily: 'var(--barlow)',
                        fontSize: '1.2rem',
                        color: "white"
                    }}
                >
                    By Yensel Leon
                </Typography>
                
                <Box
                    display="flex"
                    justifyContent={"space-around"}
                >
                    <Avatar 
                        sx={{ 
                            bgcolor: "#EAEEF3",
                            fontSize: "40px",
                            color: "black",
                            cursor: "pointer"
                        }}
                    >
                        <DiGithubBadge   />
                    </Avatar>
                    <Avatar 
                        sx={{ 
                            bgcolor: "#EAEEF3",
                            fontSize: "30px",
                            color: "black",
                            cursor: "pointer"
                        }}
                    >
                        <AiFillLinkedin />
                    </Avatar>
                    <Avatar 
                        sx={{ 
                            bgcolor: "#EAEEF3",
                            fontSize: "35px",
                            color: "black",
                            cursor: "pointer"
                        }}
                    >
                        <AiFillTwitterCircle />
                    </Avatar>

                </Box>
            </Box>
        </Box>
    )
}

export default Footer
