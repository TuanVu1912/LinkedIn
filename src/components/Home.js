import styled from "styled-components";
import LeftSide from "./LeftSide";
import Main from "./Main";
import RightSide from "./RightSide";

const Home = (props) => {
  return (
    <Container>
      <Section>
        <h5>
          <a href="/home">Hiring in a hurry?</a>
          <p>
            Find talented pros in record time with UpWork and keep bussines
            moving
          </p>
        </h5>
      </Section>
      <Layout>
        <LeftSide />
        <Main />
        <RightSide />
      </Layout>
    </Container>
  );
};
const Container = styled.div`
  padding-top: 52px;
  width: 100vw;
`;
const Content = styled.div`
  max-width: 1128px;
  margin: auto;
  /* margin-right: auto; */
`;
const Section = styled.section`
  min-height: 50px;
  padding: 16px 0;
  box-sizing: content-box;
  text-align: center;
  text-decoration: underline;
  display: flex;
  justify-content: center;
  h5 {
    color: #0a66c2;
    font-size: 14px;
    a {
      font-weight: 700;
    }
  }
  p {
    font-size: 14px;
    color: #434649;
    font-weight: 600;
  }
  @media (max-width: 768px) {
    flex-direction: column;
    padding: 0 5px;
  }
`;
const Layout = styled.div`
  display: grid;
  grid-template-areas: "a leftside main rightside b";
  grid-template-columns:
    minmax(0, 5fr) minmax(0, 3fr) minmax(0, 7fr) minmax(0, 4fr)
    minmax(0, 5fr);
  column-gap: 25px;
  row-gap: 25px;
  /* grid-template-rows: auto; */
  margin: 25px 0;
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    padding: 0 5px;
  } ;
`;
export default Home;
