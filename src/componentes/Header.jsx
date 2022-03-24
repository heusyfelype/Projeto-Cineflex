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

    p {
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 400;
        font-size: 34px;
    }

`

export default function Header() {
    return (
        <Nav>
            <p> CINEFLEX </p>
        </Nav>
    )

}