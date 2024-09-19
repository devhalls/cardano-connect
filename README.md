# Cardano Connect - WordPress Plugin

A WordPress plugin providing Cardano Web3 wallet connections and wallet detection features via short codes and 
Gutenberg blocks, supporting all [CIP-30](https://cips.cardano.org/cip/CIP-30) compliant wallets.

---

## Built with

[![Cardano][Cardano-shield]][Cardano-url]
[![PHP][PHP-shield]][PHP-url]
[![JS][JS-shield]][JS-url]
[![TS][TS-shield]][TS-url]
[![NodeJS][Node-shield]][Node-url]
[![React][React-shield]][React-url]
[![Composer][Composer-shield]][Composer-url]
[![Wordpress][Wordpress-shield]][Wordpress-url]

---

## Development - WordPress Plugin

The root folder contains a .wp-env.json configuration for the development environment and the plugin folder.

We assume you have already installed wp-env using your preferred method or using a global install such as `npm -g install @wordpress/env`.

* [node](https://nodejs.org/en) v20.13.1
* [wp-env](https://developer.wordpress.org/block-editor/getting-started/devenv/) v10.2.0
* [wp-scripts](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-scripts/) v27.9.0

You can zip the plugin from the root directory using creating cardano-connect.zip

```
npm run package
```

### Start the dev server

We use wp-env for the WordPress environment when working locally.  

```
# Start your wp-env environment.
wp-env start
```

### WordPress blocks

We use wp-scripts for the WordPress block development. Use these commands to work on the blocks. 

```
# Enter the blocks directory.
cd cardano-connect/blocks

# Install dependencies.
npm install

# Start the wp-scripts enviromnent.
npm run start-connector
npm run start-assets
npm run start-balance
npm run start-pools

# Build blocks. 
npm run build-connector
npm run build-assets
npm run build-balance
npm run build-pools
```

---

## Development - React

React is used for the frontend Web3 components and development environment. React scripts and css is then included in the plugin using wp_register_scrtips and wp_register_styles as necessary.

* [typescript](https://www.typescriptlang.org/) v5.5.3
* [react](https://react.dev/) v18.2.0
* [react-app-rewired](https://github.com/timarney/react-app-rewired) v2.2.1
* [mesh.js](https://meshjs.dev) v1.5.2

React nodes target block and shortcode HTML outputs defined in WordPress allowing us to bind various React nodes to user defined locations across their WordPress website.

```
# Enter react env
cd cardano-connect/react

# Install dependencies
npm install

# Build output for WordPress to consume
npm run build

# Start the react dev server (no WordPress using mockData).
npm run start
```

---

## Deployment

Deployments are handled via the WordPress plugin repository. PRs acccepted in thie repository will be submitted to the WordPress repo by the contributor team.

```
# Zip files ready for a WordPress instalation
npm run package
```

---

## License

Distributed under the GPL-3.0 License. See `LICENSE.txt` for more information.

---

## Contributors

* Upstream SPO - [@upstream_ada](https://twitter.com/upstream_ada)
* Devhalls - [@devhalls](https://twitter.com/devhalls)
* Pendulum - [@pendulumlondon](https://twitter.com/pendulumlondon)

---

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this plugin better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement". Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

[Cardano-shield]: https://img.shields.io/badge/cardano-000000?style=for-the-badge&logo=cardano&logoColor=white
[Cardano-url]: https://developers.cardano.org/docs/integrate-cardano/user-wallet-authentication/
[PHP-shield]: https://img.shields.io/badge/php-000000?style=for-the-badge&logo=php&logoColor=white
[PHP-url]: https://www.php.net/
[JS-shield]: https://img.shields.io/badge/javascript-000000?style=for-the-badge&logo=javascript&logoColor=white
[JS-url]: https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/JavaScript_basics
[TS-shield]: https://img.shields.io/badge/typescript-000000?style=for-the-badge&logo=typescript&logoColor=white
[TS-url]: https://www.typescriptlang.org/
[React-shield]: https://img.shields.io/badge/react-000000?style=for-the-badge&logo=react&logoColor=white
[React-url]: https://react.dev/
[Node-shield]: https://img.shields.io/badge/node.js-000000?style=for-the-badge&logo=nodedotjs&logoColor=white
[Node-url]: https://nodejs.org/
[Composer-shield]: https://img.shields.io/badge/composer-000000?style=for-the-badge&logo=composer&logoColor=white
[Composer-url]: https://getcomposer.org/
[Wordpress-shield]: https://img.shields.io/badge/wordpress-000000?style=for-the-badge&logo=wordpress&logoColor=white
[Wordpress-url]: https://wordpress.org/
