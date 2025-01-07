import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import style from './Card.module.css';


function MainComponent() {
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        axios.get("http://localhost:3000/posts").then((res) => {
            setPosts(res.data.data);

        }, []);
    });

    const card = posts.map((cityImage) => {
        return (
            <div className="containar-custom" key={cityImage.id}>
                <div className="row">   
                    <div className="col-2 col-sm-6 col-md-4 contenitore">
                        <div className={`card ${style.cardCustom}`}>
                            <img className={`card-foto ${style.cardFotoCustom}`} src={cityImage.immagine} alt="Card image" />
                            <div className="card-body" id="card-tot">
                                <h5>{cityImage.titolo}</h5>
                                <p>{cityImage.contenuto}</p>
                                <a href="#" className="btn btn-primary me-2">{cityImage.tags}</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    })
    return (
        <main>
            {card}
        </main>
    )
}


export default MainComponent;

