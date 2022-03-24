import { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Link, useParams } from 'react-router-dom';

const Main = styled.main`
    padding: 100px;

`

const Allseats = styled.section`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    div{
        width: 20px;
        height: 20px;
        border: 2px solid black;
    }
`


export default function Seats() {
    const { idHora } = useParams();
    const [infoSeats, setInfoSeats] = useState({})

    useEffect(() => {
        const request = axios.get(`https://mock-api.driven.com.br/api/v5/cineflex/showtimes/${idHora}/seats`)
        request.then((request) => { setInfoSeats(request.data) })


    }, [])

    const string = JSON.stringify(infoSeats)
    console.log(infoSeats)

    return string == "{}" ? "carregando" : (
        <Main>
            <Allseats>
                <EachSeat seats={infoSeats.seats} />
            </Allseats>
        </Main>
    )
}

function EachSeat(props) {
    const { seats } = props;

    return (
        seats.map((seat) => {
            return (
                <div> {seat.name}</div>
            )
        })
    )

}