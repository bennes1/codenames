import axios from 'axios';

const instance = axios.create({
    baseURL: '/api',
    headers: {
        'content-type':'application/json',
    },
});

const request = (method, url, params, ifSuccessful = null, ifError = null) => {
	let init = {
		'method': method,
		'url': url
	};
	if (method === "GET") {
		init.params = params;
	} else if (method === "POST") {
		init.data = params;
	}

	instance(init)
		.then((response) => {
			let results = response.data;
	        if (results.status !== "000") {
	        	console.error(results.error);
	        	if (ifError) {
	        		ifError(results.error);
	        	}
	        } else {
	        	if (ifSuccessful) {
	        		ifSuccessful(results.data);
	        	}
	      	}
		})
		.catch((e) => {
			console.error(e);
			if (ifError) {
				ifError("Could not connect to database");
			}
	    });
};

const obj = {
	get: (url, params, ifSuccessful, ifError) => {
		request('GET', url, params, ifSuccessful, ifError)
	},
	post: (url, params, ifSuccessful, ifError) => {
		request('POST', url, params, ifSuccessful, ifError)
	}
};

export default obj;
