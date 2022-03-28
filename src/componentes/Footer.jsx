import styled from 'styled-components';


const StyledFooter = styled.footer`
    width: 100vw;
    min-height: 120px;
    background-color: #DFE6ED;
    position: fixed;
    left: 0px;
    bottom: 0px;
    display: flex;
    align-items: center;
    gap: 20px;
    padding: 20px;

    img{
        width: 60px;
        max-height: 90px;
        overflow: hidden;
        padding: 5px;
        background: #FFFFFF;
        box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
        border-radius: 2px;
    }

    p{
        font-family: 'Roboto';
        font-size: 26px;
        color: #293845;
    }
`



export default function Footer(props) {
    const { location, infoToFooter } = props;

    return (location.includes("sessao")) ? (
        <StyledFooter>
            <img src={infoToFooter.movie.posterURL} alt="" />
            <div>
                <p>{infoToFooter.movie.title}</p>
                <p>{infoToFooter.day.weekday} - {infoToFooter.name}</p>
            </div>
        </StyledFooter>
    ) : (
        <StyledFooter>
            <img src={infoToFooter.posterURL} alt="" />
            <div>
                <p>{infoToFooter.title}</p>
            </div>
        </StyledFooter>
    )
}