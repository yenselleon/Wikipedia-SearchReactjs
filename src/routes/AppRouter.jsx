import React from 'react'
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import App from '../App';
import Navbar from '../components/Navbar';
import NotFoundPageScreen from '../pages/404Screen';
import BookmarksScreen from '../pages/BookmarksScreen';
import CategoryScreen from '../pages/CategoryScreen';
import EventsOfTheDayPerYearScreen from '../pages/EventsOfTheDayPerYearScreen';
import HomeScreen from '../pages/HomeScreen';
import SearchScreen from '../pages/SearchScreen';
// import your route components too


const AppRouter = () => {
    return (
        <BrowserRouter>
            <Navbar/>
            <Routes>
                <Route path="/"  element={<HomeScreen />} />
                <Route path="/bookmarks"  element={<BookmarksScreen />} />
                <Route path="/eventOfTheDayPerYear/:year" element={<EventsOfTheDayPerYearScreen />} />
                <Route path="/category/:category" element={<CategoryScreen />} />
                <Route path="/search/:searchInput" element={<SearchScreen />} />
                <Route path="*" element={<NotFoundPageScreen />} />
            </Routes>
        </BrowserRouter>
    )
}

export default AppRouter;


