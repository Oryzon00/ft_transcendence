const api42Address = `https://api.intra.42.fr/oauth/authorize?client_id=u-s4t2ud-cffa8a7def1804e4f9b3265068605197c756e7a8beff3450a17722f02f1d15e0&redirect_uri=http://${window.location.hostname}:8000/auth&response_type=code`;

// @ts-nocheck
// console.log("check");
// console.log(process.env);
// const api42Address = `https://api.intra.42.fr/oauth/authorize?client_id=${process.env.API42_UID!}&redirect_uri=http://${window.location.hostname}:8000/auth&response_type=code`;

export default api42Address;
