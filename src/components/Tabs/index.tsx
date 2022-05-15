import {styled} from '@stitches/react';
import {useEffect, useRef, useState} from 'react';
import {Card} from '../Card';

const StyledContainer = styled('div', {
	display: 'grid',
	justifyContent: 'left',
	placeItems: 'left',
	gridTemplateRows: 'max-content 1fr',
	gridTemplateColumns: '1fr',
	backgroundColor: 'var(--main-brand)',
	color: 'var(--text-light)',
});

const StyledTabsContainer = styled('section', {
	display: 'flex',
	width: '100%',
	height: '100%',
});

const StyledTab = styled('article', {
	flex: 1,
	position: 'relative',
	padding: '1rem 2rem',
	transition: 'color 300ms ease, font-size 300ms ease',
	marginBottom: '1rem',

	// '&:not(:first-child):before': {
	// 	content: '""',
	// 	width: '80%',
	// 	height: '1px',
	// 	background: 'linear-gradient(to left, #fff0, var(--text-light), #fff0)',
	// 	position: 'absolute',
	// 	top: '0',
	// 	left: '10%',
	// },

	variants: {
		active: {
			true: {
				color: 'var(--text-light-secondary)',
				fontSize: '1.1rem'
			},
		},
	},
});

const StyledTabContent = styled('div', {
	width: '100%',
	height: '100%',
	display: 'flex',
	gap: '.5rem',
	placeContent: 'center',
	placeItems: 'center',
});

const StyledTabOutlet = styled('article', {
	width: '100%',
	display: 'grid',
	placeItems: 'center',
	padding: '2rem',
});

const Pointer = styled('div', {
	background: 'linear-gradient(to right, #FFF0, var(--text-light-secondary), #FFF0)',
	position: 'fixed',
	height: '.125rem',
	transition: 'all 150ms ease',
});

export type Tab = [string, JSX.Element];
interface Props {
	tabs: Tab[];
}
export const Tabs = ({tabs}: Props) => {
	if (!tabs.length) return null;

	const [activeTab, setActiveTab] = useState<Tab>(tabs[0]);
	const pointerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		select(activeTab);

		const fn = (_: Event) => select(activeTab);
		const app = document.getElementById('App')!;

		window.addEventListener('resize', fn);
		app.addEventListener('scroll', fn);

		return () => {
			window.removeEventListener('resize', fn);
			app.removeEventListener('scroll', fn);
		};
	}, [activeTab]);

	const select = (tab: Tab) => {
		const pointer = pointerRef.current;
		if (!pointer || !tab) return;

		const elTab = document.getElementById(tab[0]);

		if (!elTab) return;

		const {top, height, left, width} = elTab.getBoundingClientRect();

		pointer.style.top = `calc(${top + height}px + 1rem)`;
		pointer.style.left = left + 'px';
		pointer.style.width = width + 'px';

		activeTab !== tab && setActiveTab(tab);
	};

	return (
		<Card>
			<StyledContainer>
				<StyledTabsContainer>
					{tabs.map((tab) => (
						<StyledTab
							onClick={() => select(tab)}
							active={activeTab === tab}
							id={tab[0]}
							key={tab[0]}
						>
							<StyledTabContent>{tab[0]}</StyledTabContent>
						</StyledTab>
					))}
				</StyledTabsContainer>
				<StyledTabOutlet>{activeTab[1]}</StyledTabOutlet>
			</StyledContainer>
			<Pointer ref={pointerRef} />
		</Card>
	);
};
