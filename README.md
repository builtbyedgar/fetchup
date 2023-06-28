# Ftchup

Level up your requests using the native Fetch API.

![NPM](https://img.shields.io/npm/l/ftchup)
![npm](https://img.shields.io/npm/v/ftchup)
<img 
  src='https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/typescript/typescript.png'
  width='20' height='20' />

🚨 This library uses TypeScript without compilation.



Ftchup provides a simplified and type-safe way to handle API calls using the native JavaScript
[Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API). It offers a convenient
interface for making single or multiple requests, with the ability to cancel ongoing requests.
## Table of Contents

- [Ftchup](#ftchup)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Contributing](#contributing)
  - [License](#license)

## Features

Nothing magical or extravagant to say here, just what it does:

- Simplified API calls using the native JavaScript Fetch API.
- Support for single or multiple requests (in parallel).
- Promise-based approach for handling asynchronous operations.
- Ability to cancel ongoing requests using an `AbortController`.
- Proper TypeScript typings for a type-safe development experience.

## Installation

The installation is the same as any of the billions of libraries you install every day in 
your JavaScript/TypeScript projects...

Using pnpm:

```shell
pnpm install ftchup
```

Using npm:

```shell
npm install ftchup
```

Using yarn:

```shell
yarn add ftchup
```

## Usage

This lib uses the JavaScript Fetch API internally to fetch data, and de `request`
method takes as parameter a `Request` like object for a single fetch or an Array of `Request` like objects
for a multiple and parallel requests. Read the [MDN documentation](https://developer.mozilla.org/en-US/docs/Web/API/Request)
form more info.

Note that the library uses the `Promise.allSettled()` for all requests, even if the request 
is a single request. This is not because I'm lazy, but because I think it's a good idea to 
keep things simple and requests normalized.

[MDN Reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/allSettled#return_value)

Simple request:

```ts
import { abort, request } from 'fetchup'

interface Pokemon {
  // Is very large and I feel lazy to write it.
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
const responses = await request<Pokemon[]>(config)
console.log(responses)
```

## Contributing

If you feel like contributing, I'm sorry for not having prepared a Contributing Guide,
but you know, the usual... fork, pull request, and let's talk 😜

## License
[MIT License](./LICENSE)
