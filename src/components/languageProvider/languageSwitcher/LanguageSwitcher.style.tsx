import styled from 'styled-components';
import { variables } from '../../../styles/settings';

export const Switcher = styled.ul`
display: flex;
	li {
		.ant-btn-text span {
			color: ${({ theme }) => theme.body.color };

		}
		.ant-btn-text:hover span {
			color: ${variables.color.mainBrand};
		}
		.ant-btn-text.active span {
			font-weight: 700;
		}
	}
`;
