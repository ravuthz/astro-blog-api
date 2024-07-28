import Elysia from "elysia";
import swagger from "@elysiajs/swagger";

import postRoutes from "./posts";

const statusCodes = {
    OK: {
        status: 200,
        message: 'OK'
    },
    NOT_FOUND: {
        status: 404,
        message: 'Not found'
    },
    INTERNAL_SERVER_ERROR:
    {
        status: 500,
        message: 'Internal server error'
    },
    VALIDATION: {
        status: 400,
        message: 'Validation error'
    },
    PARSE: {
        status: 400,
        message: 'Parse error'
    },
    UNKNOWN: {
        status: 500,
        message: 'Unknown error'
    }
};

export type ErrorType = keyof typeof statusCodes;

const app = new Elysia({ prefix: '/api' })
    .onAfterResponse((res: any) => {
        if (import.meta.env.DEBUG_REQUEST) {
            console.log('\n\n', res.request.method, res.url, performance.now(), res.set.status)
        }
    })
    .mapResponse((res: any) => {
        const { response, set } = res;
        const isJson = typeof response === 'object'

        let text: string
        let contentType: string

        if (isJson) {
            let json: any = {}

            if (set.status >= 200 && set.status <= 299) {
                json['data'] = response
                json['status'] = set.status || 200
                json['message'] = response.message || statusCodes.OK.message
            } else {
                json['error'] = res.error
                json['status'] = set.status || 500
                json['message'] = response.message || statusCodes.INTERNAL_SERVER_ERROR.message
            }

            text = JSON.stringify(json)
            contentType = 'application/json'
        } else {
            text = response?.toString() ?? ''
            contentType = 'text/plain'
        }

        return new Response(
            text,
            {
                headers: { 'Content-Type': `${contentType}; charset=utf-8` }
            }
        )
    })
    .get('/', () => 'Hello, Elysia!')
    .use(swagger({
        path: '/api-docs',
        documentation: {
            info: {
                title: 'Elysia Documentation',
                version: '1.0.0'
            }
        }
    }))
    .onError(({ code, error }: any) => {
        if (code === 'VALIDATION') {
            return {
                ...statusCodes.VALIDATION,
                errors: error.validator.schema
            };
        }

        const res = statusCodes[code as ErrorType] || statusCodes.INTERNAL_SERVER_ERROR;

        return {
            ...res,
            message: error.message || res.message
        }
    });

app.group('/posts', app => app.use(postRoutes));

export default app;