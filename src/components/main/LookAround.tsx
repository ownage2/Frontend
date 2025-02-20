import { useNavigate } from 'react-router-dom'
import { styled } from 'styled-components'
import { ReactComponent as Place } from '../../assets/images/place.svg'
import { RootState } from '../../redux/config/configStore';
import { useSelector } from 'react-redux';

const LookAround = () => {
    const userInfo = useSelector((state: RootState) => state.user);
    const navigate = useNavigate();
    return (
        <Container>
            <InnerContainer>
                <Wrapper>
                    <LeftSection>
                        {(userInfo.userId) ? (
                            <>
                                <H3>
                                    {userInfo.nickname}님,
                                    <br />
                                    오늘은 어디서 피플할까요?
                                </H3>
                                <P>
                                    나만의 장소에서 음악을 탐색해 보세요!
                                </P>
                            </>
                        ) : (
                            <>
                                <H3>
                                    오늘 피플러들은
                                    <br />
                                    어디서 피플하고 있을까요?
                                </H3>
                                <P>
                                    다양한 장소에서 음악을 탐색해 보세요!
                                </P>
                            </>
                        )
                        }
                    </LeftSection>
                    <RightSection>
                        <MapButton onClick={() => navigate(`/map`)}>
                            <MapImage src="https://map.daumcdn.net/map_k3f_prod/bakery/image_map_png/PNG01/v20_ppxmp/5/500/222.png" alt="map" />
                            <IconContainer>
                                <StPlace />
                            </IconContainer>
                        </MapButton>
                    </RightSection>
                </Wrapper>
            </InnerContainer>
        </Container>
    )
}

export default LookAround

const Container = styled.div`
    display: flex;    
    width: 100%;
    box-sizing: border-box;
    padding: 0px 20px;
`

const InnerContainer = styled.div`
    display: flex;
    width: 100%;
    background: linear-gradient(135deg, #8084F4, #C48FED);
    border-radius: 10px;
    box-sizing: border-box;
    padding: 25px 15px;
`

const Wrapper = styled.div`
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-between;
`

const LeftSection = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`

const RightSection = styled.div`
    display: block;
`

const H3 = styled.h3`
    font-size: 18px;
    line-height: 24px;
    font-weight: 600;
`

const P = styled.p`
    font-size: 14px;
    line-height: calc(100% + 2px);
    font-weight: 500;
`

const MapButton = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    
    width: 62px;
    height: 62px;
    border-radius: 6px;
    
    cursor: pointer;
`

const MapImage = styled.img`
    width: 100%;
    height: 100%;
    border-radius: 6px;
`

const IconContainer = styled.div`
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;

    width: 32px;
    height: 32px;
    border-radius: 50%;
    background-color: rgba(213, 188, 242, 0.58);
`

const StPlace = styled(Place)`
    width: 20px;
    height: 20px;
    path {
        fill: #5C4A83;
    }
`