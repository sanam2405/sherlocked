# sherlocked

_A race against time to observe, decipher and unveil a mysterious case_

[Sherlocked - _Start Hacking Now_](https://sherlocked.manaspratimbiswas.com/)

![](prelims/public/sherlocked_poster.jpeg)

## Sherlocking locally with Docker

- Starting all the services

```bash
    docker compose up
```

- Connecting with the _Moriarty_ TCP server

```bash
    nc localhost 3003
```

Start getting _Sherlocked_ at _**`localhost:5173`**_

## Setting up locally

The codebase is organized as :

1. _Irene Adler_ - The frontend
2. _Sherlock Holmes_ - The backend
3. _Watson_ - The deprecated backend
4. _Moriarty_ - TCP server for reverse shell
5. _git-automation_ - Scripts for generating _git logs_

- Clone the Sherlocked repository

```bash
    git clone git@github.com:sanam2405/sherlocked.git
    cd sherlocked
```

- Run the frontend

```bash
    cd ireneadler
    npm install
    npm run dev
```

- Run the backend

```bash
    cd sherlockholmes
    npm install
    npm run dev
```

For a clean build

```bash
   cd sherlockholmes
   npm install
   npm run build
   npm start
```

## Built with ♥️ by

- [Anurag Jha](https://www.linkedin.com/in/anurag-jha-600967225/)
- [Tanmay Roy](https://www.linkedin.com/in/roytanmay/)
- [Manas Pratim Biswas](https://www.linkedin.com/in/manas-pratim-biswas)
