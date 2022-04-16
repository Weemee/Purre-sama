/* Core */
import React, { useState, useEffect, useMemo, forwardRef } from 'react';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import clsx from 'clsx';

/* Actions */
import { setLoggedIn } from './app/actions';

/* Components */
import { MainButton } from './app/components';

/* Material UI */
import { makeStyles, styled } from '@mui/styles';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import TextField from '@mui/material/TextField';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ArticleIcon from '@mui/icons-material/Article';
import Logout from '@mui/icons-material/Logout';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import SendIcon from '@mui/icons-material/Send';
import ImageIcon from '@mui/icons-material/Image';
import AttachFileIcon from '@mui/icons-material/AttachFile';

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction='up' ref={ref} {...props} />;
});

const Searchbar = () => {
	return (
		<Paper component='form' sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 277 }}>
			<IconButton sx={{ p: '10px' }}>
				<SearchIcon />
			</IconButton>
			<InputBase sx={{ ml: 1, flex: 1 }} placeholder='Sök ...' />
		</Paper>
	);
};

const Blocker = (props) => {
	const [a, setA] = useState('');
	const [b, setB] = useState('');

	const x = 'iclaimthisname';
	const y = 'Ghjanki6!Xixebi6!';

	const checkLogin = () => {
		if (a === x && b === y) {
			props.setLoggedIn();
		}
	};

	return (
		<div style={{ width: '100vw', height: '100vh', position: 'absolute' }}>
			<Dialog
				open={true}
				TransitionComponent={Transition}
				keepMounted
				onClose={() => null}
				aria-describedby='alert-dialog-slide-description'>
				<DialogTitle style={{ textAlign: 'center', textTransform: 'uppercase', fontSize: 28 }}></DialogTitle>
				<DialogContent style={{ paddingLeft: 60, paddingRight: 60 }}>
					<div style={{ marginBottom: 20, marginTop: 20, display: 'flex', flexDirection: 'column' }}>
						<TextField
							id='outlined-basic'
							variant='outlined'
							value={a}
							onChange={(e) => setA(e.target.value)}
							type='password'
							style={{ marginBottom: 17, width: '100%' }}
						/>
						<TextField
							id='outlined-basic'
							variant='outlined'
							value={b}
							onChange={(e) => setB(e.target.value)}
							type='password'
							style={{ width: '100%' }}
						/>
					</div>
					<div style={{ display: 'flex', flexDirection: 'column' }}>
						<MainButton
							variant='contained'
							disableRipple
							onClick={checkLogin}
							sx={{
								width: '100%',
								height: 45,
								fontSize: 20,
								backgroundColor: '#8ab4e7',
							}}></MainButton>
					</div>
				</DialogContent>
			</Dialog>
		</div>
	);
};

function mapDispatchToProps(dispatch) {
	return bindActionCreators(
		{
			setLoggedIn,
		},
		dispatch,
	);
}

function mapStateToProps(state) {
	return {
		/* Account */
		loggedIn: state.account.loggedIn,
	};
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Blocker));
