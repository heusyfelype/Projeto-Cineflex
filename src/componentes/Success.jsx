import styled from 'styled-components';
import { Link, useParams, useLocation } from 'react-router-dom';


const Main = styled.main`
    padding: 100px 30px;
    display: flex;
    flex-direction: column;
    justify-content: center;

    h2{
        font-weight: 700;
        font-size: 24px;
        color: #247A6B;
        text-align: center;
        padding: 30px;
    }

    h3{
        font-weight: 700;
        font-size: 24px;
        color: #293845;
        padding: 30px 0px 10px 0px;
    }
    
    p{
        font-size: 22px;
        color: #293845;
    }

    ul{
        padding-top: 10px;
    }

    li{
        font-size: 22px;
        color: #293845;
    }

    a{
        margin: 80px auto 0px auto;
    }
    button{
        width: 225px;
        height: 42px;
        background-color: #E8833A;
        border-radius: 3px;
        border: none;
        color: white;
        font-size: 18px;
    }

`

export default function Success(props) {
    const navigate = useLocation()

    let infosMovie = navigate.state.infosMovie;
    let infosCustomer = navigate.state.infosCustomer;

    console.log(props, navigate)
    return (
        <Main>
            <h2>Pedido feito <br /> com sucesso! </h2>
            <section>
                <h3>Filme e sessão:</h3>
                <p>{infosMovie.movie.title}</p>
                <p><span> {infosMovie.day.date}</span> <span>{infosMovie.name}</span></p>
                <div>
                    <h3>Ingressos</h3>
                    <Assentos infosCustomer={infosCustomer} />
                </div>
                <div>
                    <h3>Comprador(es)</h3>
                    <Compradores infosCustomer={infosCustomer} />
                </div>
            </section>
            <Link to={"/"}>
                <button> Voltar para Home </button>
            </Link>
        </Main>
    )
}

function Assentos(props) {
    const { infosCustomer } = props;
    console.log(infosCustomer)

    return (infosCustomer.map((Customer) => {
        console.log(Customer)
        return (
            <p> Assento {Customer.idAssento}</p>
        )
    }))


}

function Compradores(props) {
    const { infosCustomer } = props;
    console.log(infosCustomer)

    return (infosCustomer.map((Customer) => {
        console.log(Customer)
        return (<ul>
            <li> Nome: {Customer.nome}</li>
            <li> CPF: {Customer.cpf}</li>
        </ul>
        )
    }))
}