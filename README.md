# Image processing API

### Sidenote

This project is taken from an idea of the Udacity Full Stack JavaScript Nanodegree but done outside of it due to hearing about it from a friend

In general this is my first project with TypeScript and should serve as an API to take images and create resized thumbnail versions of them, simple and dirty. Just take advantage if my code is of any help to you.

## Functionality

-  API will create a thumbnail version of an already existing full size image
-  If the thumbnail already exist - for example from a previous try - it simply puts out the already existing thumbnail -> no new resizing
-  height and width can be given with the query as parameters
-  the resized thumbnail can also be given to the client for additional usecases
-  also an endpoint is given to show the available full images

## API reference

| Parameter  | Type     | Description                                             |
| :--------- | :------- | :------------------------------------------------------ |
| `filename` | `string` | **Required** - filename of the full image to be resized |
| `width`    | `number` | **Required** - final width                              |
| `height`   | `number` | **Required** - final height                             |

### List available full images which can be accessed through the endpoint (GET)

```
/api/listImages
```

### Create thumbnail version of requested full image (GET)

```
/api/image?filename={filename}&width={width}&height={height}
```

## Scripts

#### Build the project

```
npm run build
```

#### Start dev server

```
npm run dev
```

#### Run ESLint

```
npm run eslint
```

#### Run Prettier

```
npm run prettier
```

#### Start the application

```
npm run start
```

#### Run tests with Jasmine

```
npm run test
```

## Social

-  [GitHub](https://github.com/MartinSchuhmacher)
-  [LinkedIn](https://www.linkedin.com/in/martinschuhmacher/)
