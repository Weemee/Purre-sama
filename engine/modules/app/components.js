import React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';

export const OffButton = styled(Button)({
	boxShadow: 'none',
	textTransform: 'none',
	fontSize: 14,
	padding: '6px 12px',
	border: '1px solid',
	lineHeight: 1.5,
	textTransform: 'uppercase',
	color: '#bf4885',
	backgroundColor: '#fff',
	borderColor: '#bf4885',
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
		backgroundColor: '#fff',
		borderColor: '#8c3562',
		color: '#8c3562',
		boxShadow: 'none',
	},
	'&:active': {
		//
	},
	'&:focus': {
		//
	},
});

export const MainButton = styled(Button)({
	boxShadow: 'none',
	textTransform: 'none',
	fontSize: 16,
	padding: '6px 12px',
	lineHeight: 1.5,
	backgroundColor: '#bf4885',
	borderRadius: 7,
	color: '#fff',
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
		backgroundColor: '#8c3562',
		boxShadow: 'none',
	},
	'&:active': {
		//
	},
	'&:focus': {
		//
	},
});
