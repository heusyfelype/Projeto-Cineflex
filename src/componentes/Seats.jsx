import { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Link, useParams } from 'react-router-dom';

import Inputs from './Inputs';

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
    }
`

const Canclick = styled.div`
    border: 1px solid palegreen;
`

const Cannotclick = styled.div`
    border: 1px solid palevioletred;
`


export default function Seats() {
    const { idHora } = useParams();
    const [infoSeats, setInfoSeats] = useState({})
    const [inputsSeats, setInputsSeats] = useState([])

    useEffect(() => {
        const request = axios.get(`https://mock-api.driven.com.br/api/v5/cineflex/showtimes/${idHora}/seats`)
        request.then((request) => { setInfoSeats(request.data) })
    }, [])

    const string = JSON.stringify(infoSeats)
    return string == "{}" ? "carregando" : (
        <Main>
            <Allseats>
                <EachSeat seats={infoSeats.seats} inputsSeats={inputsSeats} setInputsSeats={setInputsSeats} />
            </Allseats>
            <Inputs inputsSeats={inputsSeats} infoSeats={infoSeats} />
        </Main>
    )
}

function EachSeat(props) {
    const { seats, inputsSeats, setInputsSeats } = props;

    function selecionarLugar(seat) {
        if (inputsSeats.includes(seat.name)) {
            let allSeatsSelected = inputsSeats.filter((value) => {
                return value != seat.name;
            })
            setInputsSeats([...allSeatsSelected])

        } else {
            setInputsSeats([...inputsSeats, seat.name])
        }
    }

    return (
        seats.map((seat) => {
            return seat.isAvailable == true ? (
                <Canclick key={seat.name + seat.id} onClick={() => selecionarLugar(seat)}> {seat.name}</Canclick>
            ) : (
                <Cannotclick key={seat.name + seat.id}> {seat.name}</Cannotclick>
            )
        })
    )

}


