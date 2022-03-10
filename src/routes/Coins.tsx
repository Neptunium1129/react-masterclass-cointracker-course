import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { fetchCoins } from "../api";
import { isDarkAtom } from "../atom";

const Container = styled.div`
    padding: 0px 20px;
    max-width: 450px;
    margin: 0px auto;
`;

const Header = styled.header`
    height: 10vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const CoinList = styled.ul`

`;

const Coin = styled.li`
    background-color: white;
    color: ${props => props.theme.textColor};
    margin-bottom: 10px;
    border-radius: 15px;
    a {
        padding: 20px;    
        transition: color 0.2s ease-in ;
        display: flex;
        align-items: center;
    }
    &:hover{
        a{
            color:  ${props => props.theme.accentColor};
        }
    }
`;

const Title = styled.h1`
    color: ${props => props.theme.accentColor};
    font-size:25px;
    line-height: 1.7rem;
`;

const ThemeBtn = styled.div`
   position: absolute;
    right: 120px;
    top: 55px;
    cursor: pointer;
    font-size: 25px;
    color: rgb(252, 246, 245);
    transition: all 0.5s ease-in-out 0s;
`;

const Loader = styled.div`
    color: ${props => props.theme.accentColor};
    text-align: center;
    font-size: 30px;
    display: block;
`;

const IMG = styled.img`
    width: 35px;
    height: 35px;
    margin-right: 10px;
`;

interface ICoin{
    id: string,
    name: string,
    symbol: string,
    rank: number,
    is_new: boolean,
    is_active: boolean,
    type: string,
};

interface ICoinsProps{
}

function Coins({}:ICoinsProps) {
    // const [coins, setCoins] = useState<CoinInterface[]>([]);
    // const [loading, setLoading] = useState(true);
    // useEffect(() => {
    //     (async() => {
    //         const response = await fetch("https://api.coinpaprika.com/v1/coins");
    //         const json = await response.json();
    //         setCoins(json.slice(0,100));
    //         setLoading(false);
    //     })();
    // }, [])
    const themeName = "";
    const {isLoading, data} = useQuery<ICoin[]>("allCoins", fetchCoins);
    console.log(data);

    const fnThemeChage = (event :React.MouseEvent<HTMLButtonElement>) => {
        alert("@@");
    };

    const setDarkAtom = useSetRecoilState(isDarkAtom);
    const toggleDarkAtom = () => setDarkAtom(((prev) => !prev));

    console.log("setterFn", toggleDarkAtom);
    return (
        <Container>
            <Helmet>
                <title>코인 트래커</title> 
            </Helmet>
            <Header>
                <Title>코인 트래커</Title> 
                <button onClick={toggleDarkAtom}> Toggle Dark Mode</button>
            </Header>
            <ThemeBtn>
                <button onClick={fnThemeChage}> TEST </button>
            </ThemeBtn>
 
            {isLoading ? <Loader> Load... </Loader> : ( <CoinList>
                {data?.slice(0,100).map((coin) => 
                    <Coin key={coin.id}>
                        <Link to={{
                            pathname:`/coin/${coin.id}`,
                            state: {name : coin.name}
                        }}>
                     
                        <IMG src={`https://cryptoicon-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`} />
                        {coin.name} &rarr;            
                        </Link>
                       
                    </Coin>)
                }
            </CoinList>)}
        </Container>
    );

}

export default Coins;