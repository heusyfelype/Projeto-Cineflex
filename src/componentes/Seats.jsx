import { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Link, useParams, useLocation } from 'react-router-dom';

import Inputs from './Inputs';
import Footer from './Footer';

const Main = styled.main`
    width: 100vw;
    padding: 100px 25px 150px 25px;

`
const Allseats = styled.section`
    display: grid;
    grid-template-columns: repeat(10, 1fr);
    align-items: center;
    justify-content: center;
    gap: 8px;
    
    
`
const Canclick = styled.div`
    border: 1px solid ${props => props.selected.clicked == false ? "#808F9D" : "#1AAE9E" };
    background-color: ${props => props.selected.clicked == false ? "#C3CFD9" : "#8DD7CF" };
    border-radius: 50%;
    width: 26px;
    height: 26px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 11px;
    cursor: pointer;
`

const Cannotclick = styled.div`
    border: 1px solid #F7C52B;
    background-color: #FBE192;
    border-radius: 50%;
    width: 26px;
    height: 26px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 11px;
`



export default function Seats() {
    const { idHora } = useParams();
    const location = useLocation();
    let infoToFooter = {};


    const [infoSeats, setInfoSeats] = useState({})
    const [inputsSeats, setInputsSeats] = useState([])
    const [placesToSelect, setplacesToSelect] = useState([])

    useEffect(() => {
        const request = axios.get(`https://mock-api.driven.com.br/api/v5/cineflex/showtimes/${idHora}/seats`)
        request.then((request) => {

            setInfoSeats(request.data);
            let allPlaces = [];

            for (let i = 0; i < request.data.seats.length; i++) {
                allPlaces.push({
                    number: request.data.seats[i].name,
                    clicked: false
                })
            }
            setplacesToSelect([...allPlaces])
        })

        request.catch(() =>{alert("Algo deu errado, por favor, recarregue a página!")})
    }, [])

    const string = JSON.stringify(infoSeats)
    return string == "{}" ? "carregando" : (
        <>
            <Main>
                <Allseats>
                    <EachSeat seats={infoSeats.seats} inputsSeats={inputsSeats} setInputsSeats={setInputsSeats} placesToSelect={placesToSelect} setplacesToSelect={setplacesToSelect}/>
                </Allseats>
                <Inputs StyleInput inputsSeats={inputsSeats} infoSeats={infoSeats} />
            </Main>
            <Footer location={location.pathname} infoToFooter={infoSeats} />
        </>
    )
}

function EachSeat(props) {
    const { seats, inputsSeats, setInputsSeats, placesToSelect, setplacesToSelect} = props;

    function selecionarLugar(seat) {
        if (inputsSeats.includes(seat.name)) {
            let allSeatsSelected = inputsSeats.filter((value) => {
                return value != seat.name;
            })
            setInputsSeats([...allSeatsSelected])

            placesToSelect[seat.name-1].clicked = false
            setplacesToSelect([...placesToSelect])

        } else {
            setInputsSeats([...inputsSeats, seat.name])
            placesToSelect[seat.name-1].clicked = true
            setplacesToSelect([...placesToSelect])

        }
    }


    return placesToSelect.length === 0 ? "" : (
        seats.map((seat) => {
            let selected = placesToSelect[seat.name-1]

            function numberseat(value){
                return value < 10 ? "0" + value : value;
            }

            return seat.isAvailable == true ? (
                <Canclick selected={selected} key={seat.name + seat.id} onClick={() => selecionarLugar(seat)}> { numberseat(seat.name)  }  </Canclick>
            ) : (
                <Cannotclick key={seat.name + seat.id} onClick={() => alert("Esse assento não está disponível")}> {numberseat(seat.name)}</Cannotclick>
            )
        })
    )

}


