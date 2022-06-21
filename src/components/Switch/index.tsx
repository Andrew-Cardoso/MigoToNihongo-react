import {styled} from '@stitches/react';
import {CSSProperties} from 'react';
import ReactSwitch from 'react-switch';

const StyledLabel = styled('label', {
	display: 'flex',
	gap: '.5rem',
	alignItems: 'center',
	justifyContent: 'flex-start',
});

interface Props {
	label?: string;
	onChange: (checked: boolean) => any;
	value: boolean;
	style?: CSSProperties;
}

export const Switch = ({value, onChange, label, style}: Props) => (
	<div style={style ?? {}}>
		<StyledLabel>
			<ReactSwitch
				onChange={(checked) => onChange(checked)}
				checked={value}
				height={22}
				width={48}
				onColor='#57b0fb'
				offColor='#ff709b'
				onHandleColor='#fff'
				offHandleColor='#fff'
				handleDiameter={22}
			/>
			<span>{label}</span>
		</StyledLabel>
	</div>
);
