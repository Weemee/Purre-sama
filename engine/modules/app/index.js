/* Core */
import React, { useState, useEffect, useMemo, forwardRef } from 'react';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import clsx from 'clsx';

/* Actions */
import { initDone } from './actions';

/* Components */
import { Colour } from './colours';
import { MainButton, OffButton } from './components';

/* Material UI */
import { makeStyles, styled } from '@mui/styles';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import Button from '@mui/material/Button';
import Slide from '@mui/material/Slide';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';

/* Icons */
import SearchIcon from '@mui/icons-material/Search';

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction='up' ref={ref} {...props} />;
});

const Searchbar = () => {
	return (
		<Paper component='form' sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 277 }}>
			<IconButton sx={{ p: '10px' }}>
				<SearchIcon />
			</IconButton>
			<InputBase sx={{ ml: 1, flex: 1 }} placeholder='Search' />
		</Paper>
	);
};

const MenuButton = styled(Button)({
	boxShadow: 'none',
	textTransform: 'none',
	fontSize: 16,
	padding: '6px 12px',
	border: '1px solid',
	lineHeight: 1.5,
	backgroundColor: Colour.alpha,
	borderColor: Colour.alpha,
	color: `${Colour.black} !important`,
	fontFamily: [
		'-apple-system',
		'BlinkMacSystemFont',
		'"Segoe UI"',
		'Roboto',
		'"Helvetica Neue"',
		'Arial',
		'sans-serif',
		'"Apple Color Emoji"',
		'"Segoe UI Emoji"',
		'"Segoe UI Symbol"',
	].join(','),
	'&:hover': {
		//backgroundColor: '#0069d9',
		//borderColor: '#0062cc',
		//boxShadow: 'none',
		//textDecoration: 'underline',
	},
	'&:active': {
		//boxShadow: 'none',
	},
	'&:focus': {
		//boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
	},
});

const useStyles = makeStyles(() => ({
	root: {
		background: '#fff',
		display: 'flex',
		justifyContent: 'center',
		flexDirection: 'column',
		alignItems: 'center',
	},
	mainContent: {
		width: '80vw',
		//background: 'repeating-linear-gradient(-90deg, #fff5f5 0px 60px, transparent 60px 70px)',
		paddingTop: 20,
	},
	header: {
		height: 102,
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingBottom: 50,
	},
	logo: {
		position: 'relative',
		minWidth: 250,
		maxWidth: 250,
		minHeight: 102,
		maxHeight: 102,
	},
	square: {
		width: 17,
		height: 17,
		float: 'right',
		display: 'block',
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
	headerMenu: {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
		width: '40vw',
	},
	menuItem: {
		textTransform: 'uppercase !important',
		paddingBottom: '5px !important',
	},
	menuActive: {
		color: `${Colour.pink} !important`,
		borderBottom: `2px solid ${Colour.pink} !important`,
		paddingBottom: '3px !important',
	},
	chatArea: {
		height: '100vh',
		position: 'absolute',
		top: 0,
		right: 0,
		width: 800,
		display: 'flex',
		alignItems: 'center',
		marginRight: -765,
		transition: 'margin-right 777ms ease-in-out',
		zIndex: 7,
	},
	chatOpen: {
		marginRight: 0,
	},
	loginPaper: {
		width: '27vw',
		height: '54vh',
		borderRadius: '14px !important',
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

	return (
		<ThemeProvider theme={theme}>
			<div className={classes.root}>A default React boilerplate with Webpack & React Redux</div>
		</ThemeProvider>
	);
};

function mapDispatchToProps(dispatch) {
	return bindActionCreators(
		{
			initDone,
		},
		dispatch,
	);
}

function mapStateToProps(state) {
	return {
		/* App */
		x: state.app.x,
	};
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
