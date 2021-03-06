import styled from 'styled-components';

export const NavBar = styled.nav`
	position: fixed;
	top: 0;
	width: 100vw;
	box-shadow: 1px 1px 5px 4px rgba(130, 130, 130, 0.5);
	background-color: ${({ theme }) => theme.body.background };
	color: ${({ theme }) => theme.body.color };
	padding: 1rem;
	z-index: 3;
	display: flex;
	justify-content: flex-end;
	align-items: center;
	& > * {
		margin-left: 1rem;
	}
`;
