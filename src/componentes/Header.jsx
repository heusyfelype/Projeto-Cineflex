import styled from 'styled-components';

const Nav = styled.nav`
    height: 70px;
    width: 100vw;
    background-color: #C3CFD9;
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 0px;
    left:0px;

    h1 {
        font-family: 'Roboto';
        font-size: 34px;
        color: #E8833A;
    }

`

export default function Header() {
    return (
        <Nav>
            <h1> CINEFLEX </h1>
        </Nav>
    )

}