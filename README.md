# pixel-backend

This projects requires a .env to run locally.
Please provide:
MYSQL_URI, PORT and SECRET.


# Create a user:
```bash
curl -d '{"username": "pato52", "email": "pato52@gmail.com", "pass": "test123"}'  -H 'Content-Type: application/json' http://localhost:5000/user
```
```json
{"user":"3pato52","token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OSwiaWF0IjoxNjQ4MjU5MjQ4fQ.KdDhHjJCjRP7Yrf-2ELbCSS6k1PY2JBpbKPZtBhm2NQ"}
```

# Getting public images:
```bash
curl -X GET http://localhost:5000/pato52/2/1
```

the url is formatted as follow:
"/gallery/$userName/$amountOfPicturesOnAPage/$pageNumber"
OR
"/gallery/all/$amountOfPicturesOnAPage/$pageNumber"
**"all" returns all public images**

# Getting public and private images for logged in user
```bash
curl -X GET  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OCwiaWF0IjoxNjQ4MjU2MTI2fQ.-Mw8HX3Yj-clm7yXLhTubAnmHkU0N9SjPieNUpyogPk" -H 'Content-Type: application/json' http://localhost:5000/mygallery/2/1
```

the url is formatted as follow:
"/mygallery/$amountOfPicturesOnAPage/$pageNumber"

# create image
```bash
curl -d '{"img": "this would be the dataURL for that image", "public": "true", "title": "A clever title"}' -H 'Content-Type: application/json' -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywiaWF0IjoxNjQ4MTY1ODIwfQ.7Ziwfcv5pM4_VFT8tq4f8d0zzygvXCh8VS7XbJ5pcb0" http://localhost:5000/image
```


