import {styled} from '@stitches/react';
import {memo} from 'react';
import {ReactProps} from '../../types/helper.types';

const StyledContainer = styled('div', {
	width: '100%',
	height: 'auto',
	display: 'grid',
	gap: '2rem 1rem',
});

const StyledHeader = styled('section', {
	width: '100%',
});

const StyledTitle = styled('h1', {
	fontSize: '1rem',
	'&:first-letter': {
		textTransform: 'uppercase',
	},
});

interface Props extends ReactProps<'section'> {
	titles: string[];
}
const TableComponent = ({titles, children}: Props) => {
	return (
		<StyledContainer
			style={{
				gridTemplateColumns: `repeat(${titles.length}, minmax(min-content, auto))`,
			}}
		>
			{titles.map((title) => (
				<StyledHeader key={title}>
					<StyledTitle>{title}</StyledTitle>
				</StyledHeader>
			))}
			{children}
		</StyledContainer>
	);
};

export const Table = memo(TableComponent);

export const TableCell = styled('section', {
	display: 'grid',
	alignItems: 'center',
	alignContent: 'center',
	justifyContent: 'flex-start',
});
