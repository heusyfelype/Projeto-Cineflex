import { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Link, useParams } from 'react-router-dom';

const main = styled.main`
    padding: 100px;
`

export default function SectionsMovie() {

    const { idFilme } = useParams();
    const [infoSection, setInfoSection] = useState({})

    useEffect(() => {
        const request = axios.get(`https://mock-api.driven.com.br/api/v5/cineflex/movies/${idFilme}/showtimes`)
        request.then(request => { setInfoSection(request.data) })

    }, [])
    let string = JSON.stringify(infoSection)

    return string == "{}" ? "carregando" : (
        <>
            <main>
                <h2>Selecione o horário</h2>
                <Days infoSection={infoSection} />
            </main>
            <Footer />
        </>
    );
}

function Footer(props) {
    return ("")
}

function Days(props) {
    const { infoSection } = props
    return (
        infoSection.days.map(day => {
            return (
                <>
                    <h2> {day.weekday} - {day.date} </h2>
                    <p>
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
                <Link key={showtimes.name + showtimes.id} to={`/sessao/${showtimes.id}`}   > {showtimes.name} </Link>
            )
        })
    )
}