# Fetchup

Level up your requests using the native Fetch API.

![NPM](https://img.shields.io/npm/l/ftchup)
![npm](https://img.shields.io/npm/v/ftchup)

🚨 This library uses TypeScript without compilation.

<img 
  src='https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/typescript/typescript.png'
  width='20' height='20' /> 🖤

Fetchup is a TypeScript library that provides a simplified and type-safe way to handle API
calls using the native JavaScript Fetch API. It offers a convenient interface for making single
or multiple requests, with the ability to cancel ongoing requests.

With proper TypeScript typings, it ensures a reliable and predictable workflow when interacting
with APIs.


## Table of Contents

- [Fetchup](#fetchup)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Contributing](#contributing)
  - [License](#license)

## Features

- Simplified API calls using the native JavaScript Fetch API.
- Support for single or multiple requests (in parallel).
- Promise-based approach for handling asynchronous operations.
- Ability to cancel ongoing requests using an `AbortController`.
- Proper TypeScript typings for a type-safe development experience.

## Installation

***Package manager***

Make sure you have [Node.js](https://nodejs.org) installed on your system.

Using pnpm:

```shell
pnpm install fetchup
```

Using npm:

```shell
npm install fetchup
```

Using yarn:

```shell
yarn add fetchup
```

## Usage

Note that this lib uses the JavaScript Fetch API internally to fetch data, and de `request`
method takes as parameter a `Request` object for a single fetch or an Array of `Request` objects
for a multiple and parallel requests. Read the [MDN documentation](https://developer.mozilla.org/en-US/docs/Web/API/Request)
form more info.

If you pass an Array with multiple requests, the library will automatically use the `Promise.allSettled()`
method.

Simple request:

```ts
import { abort, request } from 'fetchup'

interface Pokemon {
  ...
}

const API_URL = 'https://pokeapi.co/api/v2/'

const config: RequestConfig = {
  url: API_URL + 'pokemon/charizard',
  options: {
    method: 'GET',
  },
}

request<Pokemon>(config)
  .then(response => console.log(response))
  .catch(error => console.error(error))
```

Multiple requests:

```ts
...
const config: RequestConfig[] = [
  {
    url: API_URL + 'pokemon/dittoo',
    options: {
      method: 'GET',
    },
  },
  {
    url: API_URL + 'pokemon/bulbasaur',
    options: {
      method: 'GET',
    },
  },
  {
    url: API_URL + 'pokemon/charizard',
    options: {
      method: 'GET',
    },
  },
]

request<Pokemon[]>(config)
  .then(responses => {
    responses.forEach(response => console.log(response))
  })
  .catch(error => console.error(error))
```

To cancel requests:

```ts
abort()
```

You can also use it with `async`/`await`

```ts
...
const response = await request(config)
console.log(response)
```

## Contributing

Contributions are welcome. To contribute to this project, read the [Contributing Guide](./CONTRIBUTING.md)

## License
[MIT License](./LICENSE)
