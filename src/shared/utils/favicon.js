import { useEffect } from 'react';
import { useSelector } from 'react-redux';

const themes = {
	light: './public/light.png',
	dark: './public/dark.png',
	violet: './public/violet.png',
};

const ThemeHandler = () => {
	const theme = useSelector((state) => state.user.theme);

	useEffect(() => {
		// Update the body class
		document.body.className = theme;

		// Update the favicon
		const favicon = document.getElementById('favicon');
		favicon.setAttribute('href', themes[theme]);
	}, [theme]);

	return null;
};

export default ThemeHandler;
