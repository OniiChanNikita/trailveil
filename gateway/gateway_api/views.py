	from django.shortcuts import render
	from django.http import JsonResponse
	import requests

	class Gateway:
		@staticmethod
		def forward(req, service_url):

			headers = {key: value for key, value in req.headers.items() if key.lower() in ['authorization', 'content-type']}
			print('='*50, headers)
			response = requests.request(
				method = req.method,
				url = service_url,
				headers = headers,
				data = req.body,
			)
			print(response)
			return JsonResponse(response.json(), status=response.status_code, safe=False)
			