import { Elysia, t } from 'elysia';

import posts from '@/db/posts';

const params = t.Object({
    id: t.Number()
});

const body = t.Object({
    title: t.String({
        minLength: 3,
        maxLength: 50,
    }),
    content: t.String({
        minLength: 3,
        maxLength: 50,
    }),
})

const postRoutes = new Elysia()
    .get('/', () => posts.list())
    .post('/', ({ body }) => posts.create(body), { body })
    .get('/:id', ({ params }) => posts.show(params.id), { params })
    .patch('/:id', ({ body, params }) => posts.update(params.id, body), { body, params })
    .delete('/:id', ({ params }) => posts.destroy(params.id), { params });

export default postRoutes;