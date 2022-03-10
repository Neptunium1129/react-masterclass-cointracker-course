import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Route, Switch, useLocation, useParams, useRouteMatch } from "react-router";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { fetchCoinInfo, fetchCoinTickers } from "../api";
import Chart from "./Chart";
import Price from "./Price";
import {Helmet} from "react-helmet";

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
const Loader = styled.div`
    color: ${props => props.theme.accentColor};
    text-align: center;
    font-size: 30px;
    display: block;
`;
const Title = styled.h1`
    color: ${props => props.theme.accentColor};
    font-size: 20px;
`;

const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px 20px;
  border-radius: 10px;
`;
const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  span:first-child {
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`;

const Description = styled.p`
  margin: 20px 0px;
`;

const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0px;
  gap: 10px;
`;

const Tab = styled.span<{ isActive: boolean }>`
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 400;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 7px 0px;
  border-radius: 10px;
  color: ${(props) =>
    props.isActive ? props.theme.accentColor : props.theme.textColor};
  a {
    display: block;
  }
`;

const BackPageBtn = styled.div`

`;


interface RouteParams {
    coinId:string;
}

interface RouteState {
    name:string;
}

interface ICoinProps{
}

interface IinfoState {
    id: string;
    name: string;
    symbol: string;
    rank: number;
    is_new: boolean;
    is_active: boolean;
    type: string;
    //tags: ITag[];
    description: string;
    message: string;
    open_source: boolean;
    started_at: string;
    development_status: string;
    hardware_wallet: boolean;
    proof_type: string;
    org_structure: string;
    hash_algorithm: string;
    first_data_at: string;
    last_data_at: string;
}

interface IpriceInfoState {
    id: string;
    name: string;
    symbol: string;
    rank: number;
    circulating_supply: number;
    total_supply: number;
    max_supply: number;
    beta_value: number;
    first_data_at: string;
    last_updated: string;
    quotes: {
        USD: {
            ath_date: string;
            ath_price:number;
            market_cap:number;
            market_cap_change_24h:number;
            percent_change_1h:number;
            percent_change_1y:number;
            percent_change_6h:number;
            percent_change_7d:number;
            percent_change_12h:number;
            percent_change_15m:number;
            percent_change_24h:number;
            percent_change_30d:number;
            percent_change_30m:number;
            percent_from_price_ath:number;
            price:number;
            volume_24h:number;
            volume_24h_change_24h:number;
        }
    };
}

function Coin({}: ICoinProps) {
    //const [loading, setLoading] = useState(true);
    const { coinId } = useParams<RouteParams>();
    const { state } = useLocation<RouteState>();
    //const [info , setInfo] = useState<IinfoState>();
    //const [priceInfo , setPriceInfo] = useState<IpriceInfoState>();
    const priceMatch = useRouteMatch("/:coinId/price"); //내가 어느페이지에 있는 알려주는 리액트 기능
    const chartMatch = useRouteMatch("/:coinId/chart");
    //console.log("isDark", isDark);
    //console.log(priceMatch)
    // useEffect(()=>{
    //     (async() => {
    //         const infoData = await (await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)).json();
    //         //const json = await response.json();
    //         const priceData = await (
    //             await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)
    //         ).json();
    //         //setCoins(json.slice(0,100));
    //         setInfo(infoData);
    //         setPriceInfo(priceData);
    //         setLoading(false);
    //     })();
    // },[coinId])
    // [] 노디펜던시 상태 -> 마운트 시작될때 1번만 실행
    // [coinId] 가 있으면 변할때마다 실행됌

    const {isLoading: infoLoading, data: infoData} = useQuery<IinfoState>(["info",coinId], () => fetchCoinInfo(coinId));
    const {isLoading: tikersLoading , data: tickersData} = useQuery<IpriceInfoState>(["tickers",coinId], () => 
        fetchCoinTickers(coinId),
        {
            refetchInterval : 5000
        }
    );


    console.log(state);
    const loading = infoLoading || tikersLoading ;

    return (
    <Container>
    <Helmet>
        <title>{state?.name ? state.name : loading ? "Loading..." : infoData?.name}</title> 
    </Helmet>
    <Header>
        <Title><Link to="/main">{state?.name ? state.name : loading ? "Loading..." :
        infoData?.name
        }      
        </Link>
        </Title> 

    </Header>
    <BackPageBtn>
 
    </BackPageBtn>
    {loading ? (<Loader> Loading... </Loader>) 
    : (
        <>
            <Overview>
                <OverviewItem>
                    <span>Rank:</span>
                    <span>{infoData?.rank}</span>
                </OverviewItem>
                <OverviewItem>
                    <span>심볼:</span>
                    <span>{infoData?.symbol}</span>
                </OverviewItem>
                <OverviewItem>
                    <span>Price:</span>
                    <span>$ {tickersData?.quotes.USD.price}</span>
                </OverviewItem>
            </Overview>
            <Description>{infoData?.description}</Description>
            <Overview>
                    <OverviewItem>
                    <span>TotalSuply:</span>
                    <span>{tickersData?.total_supply}</span>
                    </OverviewItem>
                    <OverviewItem>
                    <span>Max Supply:</span>
                    <span>{tickersData?.max_supply}</span>
                    </OverviewItem>
            </Overview>

            <Tabs>
                <Tab isActive={ chartMatch !== null}>
                    <Link to={`/coin/${coinId}/chart`}>
                    Chart
                    </Link>
                </Tab>
                <Tab isActive={ priceMatch !== null }>
                    <Link to={`/coin/${coinId}/price`}>
                    Price
                    </Link>
                </Tab>
            </Tabs>


            <Switch>
                <Route path={`/coin/${coinId}/price`}>
                    <Price />
                </Route>
                <Route path={`/coin/${coinId}/chart`}>
                    <Chart coinId={coinId} />
                </Route>
            </Switch>
        </>
    ) 
    }
    </Container>
    );
}

export default Coin;