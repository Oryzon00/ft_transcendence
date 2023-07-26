const api42Address = `https://api.intra.42.fr/oauth/authorize?client_id=${
	import.meta.env.VITE_API42_UID
}&redirect_uri=http://${window.location.hostname}:8000/auth&response_type=code`;

export default api42Address;
