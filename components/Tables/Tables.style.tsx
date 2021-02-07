import styled from 'styled-components';

export const Room = styled.div`
	display: flex;
`;
interface TableProps {
	occupied: boolean;
	selected: boolean;
}
export const Table = styled.div<TableProps>`
	border-radius: 3px;
	border: 1px solid black;
	height: 40px;
	width: 40px;
	margin: 10px;
	padding: 4px;
	&:hover {
    background-color: ${props => props.occupied ? 'grey' : 'lightyellow' };
	}
	${({ occupied }) => occupied && `
    background-color: grey;
    opacity: 0.8;
    pointer-events: none;
		cursor: not-allowed;
		border-color: darkgray;
  `};
		${({ selected }) => selected && `
    background-color: lightblue;
		border-color: darkgray;
		&:hover {
    	background-color: lightblue;
		}
  `};
`;
