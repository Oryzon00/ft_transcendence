const api42Address = `https://api.intra.42.fr/oauth/authorize?client_id=u-s4t2ud-6df58ea5af6397af7e840febffebf3d4bddf67673df569097d3ac72fb76a919f&redirect_uri=http://${window.location.hostname}:8000/auth&response_type=code`;

// @ts-nocheck
// console.log("check");
// console.log(process.env);
// const api42Address = `https://api.intra.42.fr/oauth/authorize?client_id=${process.env.API42_UID!}&redirect_uri=http://${window.location.hostname}:8000/auth&response_type=code`;

export default api42Address;
