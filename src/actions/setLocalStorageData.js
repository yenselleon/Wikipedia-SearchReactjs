import types from "../types/types"


const startSaveLastView = (articleData)=> {
    
    return(dispatch)=> {
        
        let localStorageStateLastview = JSON.parse(localStorage.getItem('lastViewAndBookmarks'))?.localStoragedata?.lastview
        
        if(localStorageStateLastview.length < 1){

            dispatch(saveLastView([articleData]))
        }else{
            let sliceArrLastView = localStorageStateLastview.splice(0,9);
            const isRepeat = sliceArrLastView.find(articleOnlocalStorage => articleOnlocalStorage.title === articleData.title)
            
            if(isRepeat){
                dispatch(saveLastView([...sliceArrLastView ]))

            }else{
                dispatch(saveLastView([articleData, ...sliceArrLastView ]))

            }
        }
    }

}


const saveLastView = (data)=> ({
    type: types.saveLastview,
    payload: {
        data
    }
})

const startSaveBookmark = (articleData)=> {

    return(dispatch)=> {
        articleData.isSaveBookmark = true;
        let localStorageStateBookmarks= JSON.parse(localStorage.getItem('lastViewAndBookmarks'))?.localStoragedata?.bookmarks
        
        if(localStorageStateBookmarks.length < 1){
            dispatch(saveBookmark([articleData]))
        }else{
     
            const isRepeat = localStorageStateBookmarks.find(articleOnlocalStorage => articleOnlocalStorage.title === articleData.title)
            
            if(isRepeat){
                dispatch(saveBookmark([...localStorageStateBookmarks ]))

            }else{
                dispatch(saveBookmark([articleData, ...localStorageStateBookmarks ]))

            }
        }
    }

}


const saveBookmark = (data)=> ({
    type: types.saveBookmarks,
    payload: {
        data
    }
})

const deleteBookmark = (article) => ({
    type: types.deleteBookmark,
    payload: {
        article
    }
})


export {
    startSaveLastView,
    startSaveBookmark,
    deleteBookmark
}