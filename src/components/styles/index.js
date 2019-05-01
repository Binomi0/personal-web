import styled from 'styled-components';

export const StyledContent = styled.div`
  margin: 1rem;
  position: absolute;
  top: 0;
  left: 0;

  font-size: 0.9rem;

  p,
  a {
    color: #ccc;
    font-size: 0.8rem;
    font-weight: bold;
    margin-right: 1rem;
    text-decoration: none;
    letter-spacing: 0.25rem;
    text-shadow: 0.5px 0.5px #255968;
    text-transform: uppercase;

    &:hover {
      color: #61dafb;
      text-decoration: underline;
    }
  }
`;

export const Box = styled.div`
  margin-right: 1rem;
  div {
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    border: 0.1rem solid #282c33;
    box-shadow: 0px 0px 5px 0.1px #282c33;
  }
`;

export const Box1 = styled.div`
  width: 45px;
  height: 45px;
  border-radius: 50%;
  border: 0.03rem solid #282c33;
`;
export const Box2 = styled.div`
  width: 30px;
  height: 30px;
  transform: rotate(45deg);
  border: 0.03rem solid #282c33;
`;
export const Box3 = styled.div`
  width: 20px;
  height: 20px;
  transform: rotate(30deg);
  border: 0.03rem solid #282c33;
`;
export const Box4 = styled.div`
  transform: rotate(15deg);
  width: 10px;
  height: 10px;
  border: 0.03rem solid #282c33;
`;
