import { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Link, useParams, useLocation } from 'react-router-dom';

import Footer from './Footer';

const Main = styled.main`
    padding: 100px 25px 150px 25px;

    h2{
        font-weight: 400;
        font-size: 24px;
        padding: 30px;
        margin: 0 auto;
        text-align: center;
    }

    h3{
        font-size: 20px;
        padding: 20px 0;
    }

    button{
        width: 83px;
        height: 43px;
        background-color: #E8833A;
        border: none;
        margin: 0px 10px 0px 0px;
        color: #FFF;
        font-size: 18px;
        border-radius: 3px;
        cursor: pointer;
    }
    a{
        text-decoration: none;
    }
`

export default function SectionsMovie() {
    const location = useLocation()

    const { idFilme } = useParams();
    const [infoSection, setInfoSection] = useState({})
    let infoToFooter = {};

    useEffect(() => {
        const request = axios.get(`https://mock-api.driven.com.br/api/v5/cineflex/movies/${idFilme}/showtimes`)
        request.then(request => { setInfoSection(request.data) })

    }, [])
    let string = JSON.stringify(infoSection)

    return string == "{}" ? "carregando..." : (
        <>
            <Main>
                <h2>Selecione o horário</h2>
                <Days infoSection={infoSection} />
            </Main>
            <Footer location={location.pathname} infoToFooter={infoSection} />
        </>
    );
}


function Days(props) {
    const { infoSection } = props
    return (
        infoSection.days.map(day => {
            return (
                <>
                    <h3 key={day.id + day.weekday} > {day.weekday} - {day.date} </h3>
                    <p key={"par" + day.id + day.weekday}>
                        <Showtimes showtimes={day.showtimes} />
                    </p>

                </>
            )
        })
    )
}
function Showtimes(props) {
    const { showtimes } = props
    return (
        showtimes.map(showtimes => {
            return (

                <Link key={showtimes.name + showtimes.id} to={`/sessao/${showtimes.id}`}   >
                    <button>
                        {showtimes.name}
                    </button>
                </Link>

            )
        })
    )
}