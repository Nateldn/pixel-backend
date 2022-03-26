# pixel-backend

This projects requires a .env to run locally.
Please provide:
MYSQL_URI, PORT and SECRET.


You can import the `curl` commands in Insomnia (or Amnesia if that's more your style). Simply pasting the whole command in the url bar should work and import everything!


## Create a user:

Requires:
    `username`, `pass` and `email`.
    `username` and `email` should be unique.
    `username` is validated using the following regular expression to make it very url friendly:
    `[A-Za-z0-9\-]{6,20}`

Returns an object:
    created username `user`
    login `token`

```bash
curl -d '{"username": "pato52", "email": "pato52@gmail.com", "pass": "test123"}'  -H 'Content-Type: application/json' http://localhost:5000/user
```

```json
{"user":"pato52","token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OSwiaWF0IjoxNjQ4MjU5MjQ4fQ.KdDhHjJCjRP7Yrf-2ELbCSS6k1PY2JBpbKPZtBhm2NQ"}
```

## Create an image

Requires:
    `img` the dataURL representation of the image
    `Authorization` with the `token` in the header

Options:
    `title` defaults to untitled
    `public` , a boolean that defaults to false

Returns:
    `imgID`
    `imgTitle`
    boolean `imgPublic`

```bash
curl -d '{"img": "this would be the dataURL for that image", "public": "true", "title": "A clever title"}' -H 'Content-Type: application/json' -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywiaWF0IjoxNjQ4MTY1ODIwfQ.7Ziwfcv5pM4_VFT8tq4f8d0zzygvXCh8VS7XbJ5pcb0" http://localhost:5000/image
```
```json
{"imgID":21,"imgTitle":"A clever title","imgPublic":true}
```


## Getting public images:

Requires:
    just a working url
    the url is formatted as follow:
    `/gallery/$userName/$amountOfPicturesOnAPage/$pageNumber`
    OR
    **use `all` to return all public images**
    `/gallery/all/$amountOfPicturesOnAPage/$pageNumber`


Returns:
    an array of public images: `imagePack.rows` so the dataURL for the first image would be accessed using `imagePack.rows[0].img`
    the amount of available images: `imagePack.count` (can be used to calculate the number of pages the user can click on)

```bash
curl -X GET http://localhost:5000/gallery/pato52/2/1
```

```json
{"imagePack":
    {"count":14,
    "rows":
        [{"id":2,"title":"titled","public":true,"img":"this would be the dataURL for that image","createdAt":"2022-03-24T23:50:44.000Z","updatedAt":"2022-03-24T23:50:44.000Z","UserId":7},
        {"id":6,"title":"titled","public":true,"img":"this would be the dataURL for that image","createdAt":"2022-03-25T23:43:02.000Z","updatedAt":"2022-03-25T23:43:02.000Z","UserId":7}
    ]}}
```


## Getting public and private images for logged in user

Requires:
    `Authorization` with the `token` in the header
    and a working url
    the url is formatted as follow:
    `/mygallery/$amountOfPicturesOnAPage/$pageNumber`

Returns:
    an array of images: `imagePack.rows` so the dataURL for the first image would be accessed using `imagePack.rows[0].img`
    the amount of available images: `imagePack.count` (can be used to calculate the number of pages the user can click on)

```bash
curl -X GET  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OCwiaWF0IjoxNjQ4MjU2MTI2fQ.-Mw8HX3Yj-clm7yXLhTubAnmHkU0N9SjPieNUpyogPk" -H 'Content-Type: application/json' http://localhost:5000/mygallery/2/1
```

## Getting public and private images for logged in user

Requires:
    `Authorization` with the `token` in the header
    and a working url
    the url is formatted as follow:
    `/mygallery/$amountOfPicturesOnAPage/$pageNumber`

Returns:
    an array of images: `imagePack.rows` so the dataURL for the first image would be accessed using `imagePack.rows[0].img`
    the amount of available images: `imagePack.count` (can be used to calculate the number of pages the user can click on)

```bash
curl -X GET  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OCwiaWF0IjoxNjQ4MjU2MTI2fQ.-Mw8HX3Yj-clm7yXLhTubAnmHkU0N9SjPieNUpyogPk" -H 'Content-Type: application/json' http://localhost:5000/mygallery/2/1
```

## Updating an image

Requires:
    `Authorization` with the `token` in the header
    the image`id` in the `body` object

Options:
    in the `body` object, any of the following keys with its new value `img`, `public` and `title`

Returns:
```json
{"msg":"successfully updated image"}
```

```bash
curl -X PATCH -d '{"id": 1,"img": "updated dataURL", "public": "true", "title": "A silly title"}' -H 'Content-Type: application/json' -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMsImlhdCI6MTY0ODMwNjE0MH0.ZXNRJmd7p3bpoY4nTY5m_lYWKDJmACiQGuW-J622o2Y" http://localhost:5000/image

