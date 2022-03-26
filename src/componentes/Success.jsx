import styled from 'styled-components';
import { Link, useParams, useLocation } from 'react-router-dom';


const Main = styled.main`
    padding: 100px;

    section {
        color: black;
    }

`

export default function Success(props) {
    const navigate = useLocation()

    let infosMovie = navigate.state.infosMovie;
    let infosCustomer = navigate.state.infosCustomer;

    console.log(props, navigate)
    return (
        <Main>
            <h2>Pedido feito com sucesso! </h2>
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
        return (<>
            <p> Nome: {Customer.nome}</p>
            <p> CPF: {Customer.cpf}</p>
        </>
        )
    }))
}