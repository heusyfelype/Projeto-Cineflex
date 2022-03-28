import { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const SelectPlace = styled.p`
    padding-top: 30px;
`

const StyleInputs = styled.div`
    margin-top: 40px;

    h2{
        font-weight: 700;
        font-size: 24px;
        padding-bottom: 10px;
        color: #293845;
    }

    p{
        font-size: 18px;
        color: #293845;
        padding: 10px 0px 5px 0px;
    }

    input{
        width: 100%;
        height: 50px;
        background: #FFFFFF;
        border: 1px solid #D5D5D5;
        box-sizing: border-box;
        border-radius: 3px;
        font-size: 18px;
        color: #AFAFAF;
    }

    button{
        margin: 50px auto;
        display: block;
        width: 225px;
        height: 42px;
        left: 72px;
        top: 688px;
        background: #E8833A;
        border-radius: 3px;
        border: none;
        font-size: 18px;
        color: #FFFFFF;
        cursor: pointer;
    }

`

export default function Inputs(props) {
    const { inputsSeats, infoSeats } = props

    let infosMovie = infoSeats
    let [infosTopost, setinfosTopost] = useState({ ids: [], compradores: [] });

    return inputsSeats.length == 0 ? <SelectPlace>Selecione um lugar</SelectPlace> :
        inputsSeats.map((number) => {
            return (
                <StyleInputs key={getRandom()}>
                    <h2>Assento {number}</h2>
                    <div>
                        <EachInput infosMovie={infosMovie} number={number} inputsSeats={inputsSeats} infosTopost={infosTopost} setinfosTopost={setinfosTopost} />
                    </div>
                </StyleInputs>
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
            <button type='submit'> Reservar assento </button>
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
        () => { navigate("/sucesso", { state: {infosMovie: infosMovie, infosCustomer:infosTopost.compradores} })}
    )
    request.catch(() =>{alert("Algo deu errado, por favor, recarregue a página!")})
}