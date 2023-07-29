import express, { Request, Response } from 'express';
import envVar from 'env-var';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

interface Config {
    keycloakAuthURL: string
    keycloakClientID: string
    appPort: number
}

const configs: Config = {
    keycloakAuthURL: envVar.get('KEYCLOAK_AUTH_URL').required().asString(),
    keycloakClientID: envVar.get('KEYCLOAK_CLIENT_ID').required().asString(),
    appPort: envVar.get('APP_PORT').required().asPortNumber(),
}

app.get('/login', async (request: Request, response: Response) => {
    const loginParams = new URLSearchParams({
        client_id: configs.keycloakClientID,
        redirect_uri: 'http://app:3001/callback',
        response_type: 'code',
        scope: 'openid'
    });

    response.redirect(`${configs.keycloakAuthURL}?${loginParams.toString()}`)
})

app.get('/', async (request: Request, response: Response) => {
    response.json({
        message: 'Hello World',
    });
});

app.listen(configs.appPort);
