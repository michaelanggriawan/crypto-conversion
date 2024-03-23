# Back End
1. [NestJS](https://nestjs.com/)
2. [Winston logger](https://github.com/winstonjs/winston)

# Front End
1. [NextJS](https://nextjs.org/)
2. [RTK Query](https://redux-toolkit.js.org/rtk-query/overview)
3. [Tailwind](https://tailwindcss.com/)

# Developer tools
1. [Jest](https://jestjs.io)
2. [ESLint](https://eslint.org/)
3. [Prettier](https://prettier.io/)
4. Pre-commit & pre-push git hooks powered by[husky](https://typicode.github.io/husky/#/)
5. [Commitlint](https://commitlint.js.org/#/)
6. [Turborepo](https://turbo.build/)


## Getting Started 

1. Install depedencies

```bash
pnpm install . -w
```

2. Run development app

```bash
npm run dev
```

3. Run unit test

```bash
npm run test
```

4. Run integration test

```bash
npm run test:e2e --prefix apps/server
```

5. Access swagger
http://localhost:3001/v1/crypto-exchanges/docs

## Run the app via docker

```bash
# Create a network, which allows containers to communicate
# with each other, by using their container name as a hostname
docker network create app_network


# Build prod using new BuildKit engine
COMPOSE_DOCKER_CLI_BUILD=1 DOCKER_BUILDKIT=1 docker-compose -f docker-compose.yml build

# Start prod in detached mode
docker-compose -f docker-compose.yml up -d
```


