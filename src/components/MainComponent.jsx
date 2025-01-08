import { useState, useEffect } from "react";
import axios from "axios";
import style from './Card.module.css';

function MainComponent() {
    const [posts, setPosts] = useState([]);
    const [newPost, setNewPost] = useState({
        titolo: '',
        contenuto: '',
        immagine: '',
        tags: ''
    });

    useEffect(() => {
        axios.get("http://localhost:3000/posts")
            .then((res) => {
                setPosts(res.data.data);
            })
            .catch((error) => {
                console.error("Errore durante il recupero dei dati", error);
            });
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;

        //crea una copia dell'oggetto newPost
        const updatedPost = { ...newPost };

        // Aggiorna direttamente la proprietà
        updatedPost[name] = value;

        // Imposta il nuovo statoa
        setNewPost(updatedPost);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Prepara i dati per l'invio
        const postToSend = {
            titolo: newPost.titolo,
            contenuto: newPost.contenuto,
            immagine: newPost.immagine,
            tags: newPost.tags.split(',') 
        };

        // Chiamata POST per inviare il nuovo post al backend
        axios.post("http://localhost:3000/posts", postToSend)
            .then((res) => {                
                setPosts((prevPosts) => [...prevPosts, res.data]);
                // Reset del form
                setNewPost({
                    titolo: '',
                    contenuto: '',
                    immagine: '',
                    tags: ''
                });
            })
            .catch((error) => {
                console.error("Errore durante il salvataggio del post", error);
            });
    };

    const card = posts.map((cityImage) => {
        return (
            <div className="col-12 col-sm-6 col-md-4" key={cityImage.id}>
                <div className={`card ${style.cardCustom}`}>
                    <img className={`card-img-top ${style.cardFotoCustom}`} src={cityImage.immagine} alt="Card image" />
                    <div className="card-body" id="card-tot">
                        <h5 className="card-title">{cityImage.titolo}</h5>
                        <p className="card-text">{cityImage.contenuto}</p>
                        <div>
                            {cityImage.tags.map((tag, index) => (
                                <a href="#" key={index} className="btn btn-primary me-2">{tag}</a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    });

    return (
        <main>
            <div className="container">
                <div className="row">
                    {card}
                </div>
            </div>

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="titolo"
                    value={newPost.titolo}
                    onChange={handleChange}
                    placeholder="Titolo"
                    className="form-control"
                    required
                />
                <textarea
                    name="contenuto"
                    value={newPost.contenuto}
                    onChange={handleChange}
                    placeholder="Contenuto"
                    className="form-control mt-2"
                    required
                />
                <input
                    type="text"
                    name="immagine"
                    value={newPost.immagine}
                    onChange={handleChange}
                    placeholder="URL Immagine"
                    className="form-control mt-2"
                    required
                />
                <input
                    type="text"
                    name="tags"
                    value={newPost.tags}
                    onChange={handleChange}
                    placeholder="Tags"
                    className="form-control mt-2"
                />
                <button type="submit" className="btn btn-primary mt-3">Aggiungi Articolo</button>
            </form>
        </main>
    );
}

export default MainComponent;
