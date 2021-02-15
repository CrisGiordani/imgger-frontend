import styled from "styled-components";

export const Container = styled.div`
  background: #e1e1e1;
  padding: 0 30px;
  border-bottom: solid 1px #BBBBBB;
  margin-bottom:60px;
`;

export const Content = styled.div`
  height: 84px;
  max-width: 900px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;

  nav {
    display: flex;
    align-items: center;

    img {
      margin-right: 20px;
      max-height: 40px;
      padding-right: 20px;
    }

    a {
      font-weight: bold;
      color: #4A90E2;
    }
  }

  aside {
    display: flex;
    align-items: center;
  }
`;

export const Profile = styled.div`
  display: flex;
  margin-left: 20px;
  padding-left: 20px;

  div {
    text-align: right;
    margin-right: 10px;

    strong {
      display: block;
      color: #333;
    }

    a {
      display: block;
      margin-top: 2px;
      font-size: 12px;
      color: #999;
    }
  }
  img {
    height: 32px;
    border-radius: 50%;
  }
`;
