import { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Main = styled.main`
    padding-top: 100px;

    h2{
        font-weight: 400;
        font-size: 24px;
        padding: 30px;
        margin: 0 auto;
        text-align: center;
    }

    section {
        max-width: 320px;
        margin: 0 auto;
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 10px;
    }


    img{
        width: 100%;
        padding: 8px;
        background: #FFFFFF;
        box-shadow: 0px 2px 4px 2px rgba(0, 0, 0, 0.1);
        border-radius: 3px;
    }
`


export default function FirstScreen() {


    const [moviesList, setMoviesList] = useState([])
    useEffect(() => {
        const request = axios.get("https://mock-api.driven.com.br/api/v5/cineflex/movies");
        request.then(response => {
            setMoviesList(response.data)
        })
    }, [])


    return (
        <Main>
            <h2>Selecione o Filme</h2>
            <section>
                <Movie moviesList={moviesList} />
            </section>
        </Main>
    )
}

function Movie(props) {
    const { moviesList } = props;
    return (
        moviesList.map((movie) => {
            return (<Link key={movie.id} to={`/filme/${movie.id}`}>
                <img src={movie.posterURL} alt={"filme" + movie.title} />
            </Link>

            )


        })

    )
}