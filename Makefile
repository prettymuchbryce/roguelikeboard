task rundemo:
		ENVIRONMENT=development gulp build && cd demo && node ./server/app.js