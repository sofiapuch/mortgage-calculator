# Morgage Calculator
By Sofia Puch (sofiapuch.frontend@gmail.com)

- The repository was created using [Vue-CLI](https://cli.vuejs.org/)

- This repository uses [Foundation Grid](https://get.foundation/sites/docs/xy-grid.html). Ideally instead of including the CDN tag for just the CSS features, I would install the npm package and configure it with webpack to have access to more features (which would allow me to simplify the media queries).

- There's no need to include normalize separately as it comes within Foundation

## How to use this repo

1. Clone repository
2. Run `npm install` to download all the dependencies needed
3. 
    Run `npm run serve` to start the server
    or
    Run `npm run test:unit` to run the unit tests

## Development notes

### Fetching the endpoint

- When attempting to fetch the endpoint I faced a CORS issues even though I was using the exact example provided.
- In order to be able to display the rates table, I copied the response obtained via Postman and included it as a json file under the `public` folder

### Unit testing coverage

- In the interest of time, there is only one unit test on the repository.
- The component that should be tested thoroughly as it's the one that has more functionality involved, is the `Mortgage Calculator`. Though before adding the tests, would be good to try to simplify the template by splitting it into more components (where it makes sense).

### UI Responsiveness

Tested on Chrome:
- Imac
- Ipad (5th generation) 13.5.1
- Android - Pixel 3

Tested on Safari:
- Imac

** Might not work on legacy browsers or old versions of IOS in which case a polyfill would be needed