import { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useParams, useNavigate } from 'react-router-dom';

export default function Inputs(props) {
    const { inputsSeats, infoSeats } = props
    console.log(infoSeats)
    let infosMovie = infoSeats
    let [infosTopost, setinfosTopost] = useState({ ids: [], compradores: [] });

    return inputsSeats.length == 0 ? <p>Selecione um lugar</p> :
        inputsSeats.map((number) => {
            return (
                <div key={getRandom()}>
                    <h2>Assento {number}</h2>
                    <div>
                        <EachInput infosMovie={infosMovie} number={number} inputsSeats={inputsSeats} infosTopost={infosTopost} setinfosTopost={setinfosTopost} />
                    </div>
                </div>
            )
        })
}

function EachInput(props) {

    const { number, inputsSeats, infosMovie, infosTopost, setinfosTopost } = props

    const [nameInput, setnameInput] = useState("")
    const [cpfInput, setCpfInput] = useState("")

    function validarinputs(event) {
        event.preventDefault();
        if (nameInput.length < 2) {
            alert("Digite um nome válido")
        } else if (/[a-z]/ig.test(cpfInput) || cpfInput.length < 8) {
            alert("Digite um CPF válido")
        } else (
            refreshInfosToPost()
        )
    }

    function refreshInfosToPost() {
        const ids = number;
        const idAssento = number;
        const nome = nameInput;
        const cpf = cpfInput;
        const compradores = { idAssento, nome, cpf }
        setinfosTopost({ ...infosTopost, ids: [...infosTopost.ids, ids], compradores: [...infosTopost.compradores, compradores] })

    }
    if (infosTopost.ids.length === inputsSeats.length) {
        RequestPost(infosTopost, infosMovie)
    }


    return infosTopost.ids.includes(number) ? "" : (
        <form onSubmit={validarinputs}>
            <p>Nome do comprador:</p>
            <input type="text" placeholder='Digite o seu nome...' value={nameInput} onChange={(e) => { setnameInput(e.target.value) }} />
            <p>CPF do comprador:</p>
            <input type="text" placeholder='Digite o seu CPF...' value={cpfInput} onChange={(e) => { setCpfInput(e.target.value) }} />
            <button type='submit'> Reservar </button>
        </form>
    )
}

function getRandom() {
    return Math.random();
}

function RequestPost(infosTopost, infosMovie) {
    let navigate = useNavigate();
    
    const request = axios.post("https://mock-api.driven.com.br/api/v5/cineflex/seats/book-many", infosTopost)
    request.then(
        () => { alert("Deu tudo certo"); navigate("/sucesso", { state: {infosMovie: infosMovie, infosCustomer:infosTopost.compradores} })}
    )
}