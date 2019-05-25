import styled from 'styled-components';

export default () => ({
  grow: {
    flexGrow: 1,
  },
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
  footerItem: {
    // width: '33%',
    padding: '1rem',
    border: '1px solid red',
  },
  h5: {},
  menuButton: {
    padding: 0,
  },
});

export const SeparatorStyled = styled.div`
  width: 100%;
  height: 1px;
  margin: 1rem 0;
  border-bottom: 1px solid #8ee7ff;
  padding: 1rem;
  @media (max-width: 768px) {
    padding: 0.5rem;
  }
`;

export const StyledContent = styled.div`
  margin: 1rem;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  @media (max-width: 768px) {
    flex-direction: column;
  }

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
    box-shadow: 0px 0px 5px 0.1px #8ee7ff;
  }
`;

const sizes = {
  xl: '45px',
  lg: '30px',
  md: '20px',
  sm: '10px',
};

export const Box1 = styled.div`
  /* width: ${sizes.xl};
  height: ${sizes.xl}; */
  border-radius: 50%;
  border: 0.03rem solid #282c33;
`;
export const Box2 = styled.div`
  /* width: ${sizes.lg};
  height: ${sizes.lg}; */
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

export const SubtitleStyled = styled.span`
  text-transform: uppercase;
  font-weight: 100;
  font-size: 0.8rem;
  display: block;
  line-height: 0.4rem;
`;

export const FooterColumns = styled.div`
  /* background: #8ee7ff; */
  display: flex;
  margin: 1rem;

  ul {
    list-style: none;
  }

  display: flex;
  justify-content: space-between;
`;

export const FooterContainer = styled.div`
  min-height: 100px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const FooterHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.9rem;
  color: #8ee7ff;
  margin: 1rem;
`;
export const FooterSocials = styled.div`
  margin: 1rem;
  display: flex;
  justify-content: space-around;
`;

export const FooterStyled = styled.footer`
  /* height: 0; */
  a {
    color: #ccc;
    font-size: 0.9rem;
    font-weight: 500;

    &:hover {
      color: #8ee7ff;
    }
  }
`;

export const CircularProgressStyled = styled.div`
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
