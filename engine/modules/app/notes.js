/* Core */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

/* Actions */
import { clearNotes } from './actions';

/* Material UI */
import { makeStyles } from '@mui/styles';
import Alert from '@mui/material/Alert';
import Fade from '@mui/material/Fade';

const useStyles = makeStyles(() => ({
	root: {
		position: 'absolute',
		width: '100%',
		textAlign: 'center',
		fontSize: 14,
		backgroundColor: '#5178a9',
		boxShadow: '#0007 0px 0px 7px 1px',
	},
	icon: {
		marginTop: 'auto',
		marginBottom: 'auto',
		padding: 0,
	},
}));

const TIMEOUT_MS = 5000;

const Notes = (props) => {
	const classes = useStyles();

	const [open, toggleOpen] = useState(false);
	const [type, setType] = useState('info');
	const [message, setMessage] = useState('');

	let timer;

	useEffect(() => {
		return () => clearTimeout(timer);
	}, []);

	const onShow = () => {
		timer = setTimeout(() => {
			toggleOpen(false);
			props.clearNotes();
			clearTimeout(timer);
		}, TIMEOUT_MS);
	};

	useEffect(() => {
		if (props.notes && props.notes.type) {
			toggleOpen(true);
			setType(props.notes.type);

			if (message !== props.notes.message) {
				clearTimeout(timer);

				timer = setTimeout(() => {
					toggleOpen(false);
					props.clearNotes();
					clearTimeout(timer);
				}, TIMEOUT_MS);
			}
			setMessage(props.notes.message);
		}

		return () => clearTimeout(timer);
	}, [props.notes]);

	useEffect(() => {
		if (open) {
			clearTimeout(timer);

			onShow();
		}

		return () => clearTimeout(timer);
	}, [open]);

	return (
		<Fade in={open} timeout={{ enter: 400, exit: 270 }} className={classes.root}>
			<Alert
				classes={{
					root: classes.root,
					icon: classes.icon,
				}}
				variant='outlined'
				severity={type}>
				{message}
			</Alert>
		</Fade>
	);
};

function mapDispatchToProps(dispatch) {
	return bindActionCreators(
		{
			clearNotes,
		},
		dispatch,
	);
}

function mapStateToProps(state) {
	return {
		notes: state.app.notes,
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Notes);
