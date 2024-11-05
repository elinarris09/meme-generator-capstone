import React from "react";
import { v4 as uuidv4 } from 'uuid';
import SingleMeme from "./SingleMeme";

export default function Meme() {
    const [meme, setMeme] = React.useState({
        topText: "",
        bottomText: "",
        randomImage: "http://i.imgflip.com/1bij.jpg",
        id: uuidv4()
    })

    const [allMemes, setAllMemes] = React.useState([])
    const [savedMemes, setSavedMemes] = React.useState([])
    
    
    React.useEffect(() => {
        fetch("https://api.imgflip.com/get_memes")
            .then(res => res.json())
            .then(memeArr => setAllMemes(memeArr.data.memes))
    }, [])


    
    function getMemeImage() {
        const randomNumber = Math.floor(Math.random() * allMemes.length)
        const url = allMemes[randomNumber].url
        setMeme(prevMeme => ({
            ...prevMeme,
            randomImage: url
        }))
    }
    
    function handleChange(event) {
        const {name, value} = event.target
        setMeme(prevMeme => ({
            ...prevMeme,
            [name]: value
        }))
    }

    function handleSubmit(e) {
            e.preventDefault();
            setSavedMemes(prevMemes => {
                return [
                  ...prevMemes,
                  meme
                ]
              })
            setMeme( {
                ...meme,
                topText: "",
                bottomText: "",
                id: uuidv4()
            } )
    }


    function handleDelete(id) {
        setSavedMemes(prevMeme => prevMeme.filter(obj => obj.id !== id))
    }

    function editMeme(id, update){
        setSavedMemes(prevMeme => prevMeme.map(meme => meme.id !== id ? meme : update))
    }

    const display = savedMemes.map(meme => {
        return (
            <SingleMeme 
                meme= {meme}
                handleDelete = {handleDelete}
                editMeme = {editMeme}
            />
     )})

return(
    <main>
    <form className="form" onSubmit={handleSubmit}>
        <input 
            type="text"
            placeholder="Top Text"
            name="topText"
            value={meme.topText}
            onChange={handleChange}
        />
        <input 
            type="text"
            placeholder="Bottom Text"
            name="bottomText"
            value={meme.bottomText}
            onChange={handleChange}
        />
        <button>Submit to List</button>
    </form>
    <button className="new-meme-button" onClick={getMemeImage}>Get New Meme Image</button>
    <div className="meme">
        <img src={meme.randomImage} className="meme-image"/>
        <h2 className="meme-text top">{meme.topText}</h2>
        <h2 className="meme-text bottom">{meme.bottomText}</h2>
    </div>
    <div className="meme-list">
          <ol>
            { display } 
          </ol>
          
    </div>
</main>
)
}