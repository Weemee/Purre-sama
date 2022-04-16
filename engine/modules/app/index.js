/* Core */
import React, { useState, useEffect, useMemo, forwardRef } from 'react';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import clsx from 'clsx';

/* Actions */
import { setNotes, clearNotes, getStopLookup, getRealtimeData } from './actions';

/* Components */
import { Colour } from './colours';
import { MainButton, OffButton } from './components';
import Notes from './notes';

/* Material UI */
import { makeStyles, styled } from '@mui/styles';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Slide from '@mui/material/Slide';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';

/* Icons */
import SearchIcon from '@mui/icons-material/Search';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction='up' ref={ref} {...props} />;
});

const Searchbar = ({ value, onChange, onSearch }) => {
	return (
		<Paper component='form' sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 277 }}>
			<IconButton sx={{ p: '10px' }}>
				<SearchIcon />
			</IconButton>
			<InputBase sx={{ ml: 1, flex: 1 }} placeholder='Search' value={value} onChange={onChange} />
			<IconButton sx={{ p: '10px' }} onClick={() => onSearch()}>
				<ArrowForwardIcon />
			</IconButton>
		</Paper>
	);
};

const NOTIFICATION_WIDTH = '30%';

const useStyles = makeStyles(() => ({
	root: {
		background: '#fff',
		display: 'flex',
		justifyContent: 'center',
		flexDirection: 'column',
		alignItems: 'center',
	},
	notificationsRoot: {
		position: 'absolute',
		width: '100vw',
		height: '100vh',
		backgroundColor: 'transparent',
	},
	notifications: {
		zIndex: 1300,
		width: NOTIFICATION_WIDTH,
		position: 'fixed',
		left: `calc(50vw - ${NOTIFICATION_WIDTH}/2)`,
		top: '0.75vh',
	},
	content: {
		width: '80vw',
		minHeight: 'calc(90vh - 40px)',
		paddingTop: 20,
	},
	mainContent: {
		width: '80vw',
		paddingTop: 20,
	},
	header: {
		height: 102,
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	footer: {
		minHeight: '10vh',
		width: '100vw',
		background: Colour.black,
		color: Colour.white,
		display: 'flex',
		justifyContent: 'center',
		marginTop: 20,
		alignItems: 'center',
	},
}));

const theme = createTheme({
	props: {
		MuiButtonBase: {
			disableRipple: true,
		},
	},
});

const App = (props) => {
	const classes = useStyles();

	const [stopSearch, setStopSearch] = useState('Campus Roslagen');

	useEffect(() => {
		props.setNotes({
			message: 'Testing notifications',
			type: 'info',
		});

		props.getRealtimeData();
	}, []);

	const handleStopSearch = () => {
		props.getStopLookup(stopSearch);
	};

	return (
		<ThemeProvider theme={theme}>
			<div className={classes.root}>
				<div className={classes.notificationsRoot}>
					<div className={classes.notifications}>
						<Notes />
					</div>
				</div>
				<div className={classes.content}>
					<div className={classes.header}>
						<div style={{ display: 'flex', flexDirection: 'column', padding: '6px 12px' }}>
							<span style={{ paddingBottom: 7 }}>Stop lookup</span>
							<Searchbar
								value={stopSearch}
								onChange={(e) => setStopSearch(e.target.value)}
								onSearch={handleStopSearch}
							/>
						</div>
					</div>

					<div className={classes.mainContent}>Content</div>
				</div>

				<div className={classes.footer}>Footer stuff</div>
			</div>
		</ThemeProvider>
	);
};

function mapDispatchToProps(dispatch) {
	return bindActionCreators(
		{
			setNotes,
			clearNotes,
			getStopLookup,
			getRealtimeData,
		},
		dispatch,
	);
}

function mapStateToProps(state) {
	return {
		/* App */
		notes: state.app.notes,
		lookupData: state.app.lookupData,
		realtimeData: state.app.realtimeData,
	};
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
