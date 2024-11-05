import { useState } from "react";

export default function SingleMeme(props){

    const {meme, handleDelete, editMeme} = props

    const [formData, setFormData] = useState({
        topText: meme.topText,
        bottomText: meme.bottomText,
        randomImage: meme.randomImage,
        id: meme.id
    })

    function handleChange(e){
        const {name, value} = e.target 
        setFormData(prev => {
            return {
                ...prev,
                [name]: value
            }
        })
    }

    const [isEditing, setIsEditing] = useState(false)

    function handleToggle() {
        setIsEditing(prev => !prev)
    }

    function handleSubmit(e){
        e.preventDefault()
        editMeme(meme.id, formData)
        handleToggle()
    }

    return(
        <li>
            <div className="new-meme">
                <img src={meme.randomImage} className="meme-image"/>
                <h2 className="meme-text top">{meme.topText}</h2>
                <h2 className="meme-text bottom">{meme.bottomText}</h2>
                <button className="delete-meme-button" onClick={() => handleDelete(meme.id)}>X</button>
                <button className="edit-meme-button" onClick={handleToggle}>Edit</button>
                {
                isEditing &&
                <form onSubmit={handleSubmit} className="edit-form">
                    <input
                        name="topText"
                        value={formData.topText}
                        onChange={handleChange}
                        placeholder="Edit Top Text"
                    />
                    <input
                        name="bottomText"
                        value={formData.bottomText}
                        onChange={handleChange}
                        placeholder="Edit Bottom Text"
                    />
                    <button>Save Change</button>
                    <button onClick={handleToggle}>Cancel Change</button>
                </form>
            }
            </div>
            </li>
    )
}