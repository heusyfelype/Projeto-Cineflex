import { useState, useEffect} from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Main = styled.main`
    padding: 100px;

`


export default function FirstScreen(){
    

    const [moviesList, setMoviesList] = useState([])
    useEffect(() =>{
        const request = axios.get("https://mock-api.driven.com.br/api/v5/cineflex/movies");
        request.then(response =>{
            setMoviesList(response.data)
        })
    },[])
    

    return(
        <Main>
            <h2>Selecione o Filem</h2>
            <section>
                <Movie moviesList={moviesList}/>
            </section>
        </Main>
    )
}

function Movie(props){
    const {moviesList} = props;
    return(
        moviesList.map( (movie) =>{
            return ( <Link key={movie.id} to={`/filme/${movie.id}`}>
                <img  src={movie.posterURL} alt={"filme" + movie.title} />
            </Link>

            )
            
            
        })
        
    )
}