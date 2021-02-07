import { createGlobalStyle } from 'styled-components';
import 'antd/dist/antd.css';

export const theme = {
  colors: {
  },
};

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
		font-size: 1.6rem;
	}
	a {
  color: inherit;
  text-decoration: none;
	}
	ul {
		list-style: none;
		padding-left: 0;
	}
`;
