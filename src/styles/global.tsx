import { createGlobalStyle } from 'styled-components';
import 'antd/dist/antd.css';
import { variables } from './settings';
import fontFaces from './fonts.style';

export const GlobalStyle = createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }
  :root {
    font-size: 10px;
  }

  body {
    ${fontFaces};
		font-size: 1.6rem;
    font-family: 'Open Sans';
    background-color: ${({ theme }) => theme.body.background};
    color: ${({ theme }) => theme.body.color};
	}
	a {
  color: inherit;
  text-decoration: none;
    &:hover {
      color: ${variables.color.mainBrand};  
    }
	}
	ul {
		list-style: none;
		padding-left: 0;
    margin: 0;
	}
`;
