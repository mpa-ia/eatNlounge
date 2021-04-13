import styled from 'styled-components';
import { variables } from './settings';

type CardType = keyof typeof variables.color;

interface CardProps {
	type: CardType;
	[key: string]: unknown;
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const Card = styled(({ type, ...rest }: CardProps) => <div {...rest} />)`
	border-radius: 8px;
	background-color: ${({ type }) => variables.color[type]};
	color: ${({ type }) => type === 'darkShade' ? variables.color.lightShades : variables.color.darkShade};
	padding: 1.8rem;
	box-shadow: 3px 1px 10px 3px ${ variables.color.default };
	h3 {
		text-transform: uppercase;
		/* color:  */
		font-size: 2rem;
		border-bottom: 1px solid ${variables.color.lightShades};
		padding: 0.8rem 0;
		margin-bottom: 2rem;
	}
`;