# Fetchup

Level up your requests using the native Fetch API.

Fetchup is a TypeScript library that provides a simplified and type-safe way to handle API
calls using the Fetch API in JavaScript. It offers a convenient interface for making single
or multiple requests, with the ability to cancel ongoing requests.

With proper TypeScript typings, it ensures a reliable and predictable workflow when interacting
with APIs.


## Table of Contents

- [Fetchup](#fetchup)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Installation](#installation)
    - [Package manager](#package-manager)
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

### Package manager

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

Simple request:

```ts
import { abort, get } from 'fetchup'

interface User {
  id: number
  name: string
}

const API_URL = 'https://your-api-aurl.com/'

get<User[]>(API_URL)
  .then(response => console.log(response))
  .catch(error => console.error(error))
```

Multiple requests:

```ts
...
const requestConfig: RequestConfig[] = [
  API_URL + '/1',
  API_URL + '/2',
  API_URL + '/3'
]

get<User[]>(requestConfig)
  .then(response => {
    responses.forEach(response => {
      console.log(response.data)
    })
  })
  .catch(error => console.error(error))
```

To cancel requests:

```ts
abort()
```

## Contributing

Contributions are welcome. To contribute to this project, follow these steps:

Fork the repository.
Create a new branch in your fork.
Make the changes or improvements in your branch.
Submit a pull request from your branch to the original repository.

## License
[MIT License](./LICENSE)
