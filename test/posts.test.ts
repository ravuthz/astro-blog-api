import { describe, expect, it } from 'bun:test'

import app from '@/app'

const apiCall = async (url: string, method = 'GET', body: any = null) => {
    return app
        .handle(new Request(`http://localhost:4321/${url}`, {
            headers: { 'Content-Type': 'application/json' },
            method,
            body: body ? JSON.stringify(body) : undefined
        }))
        .then((res: any) => res.json())
}

const dataTest = { title: 'test', content: 'test' };

const newPostId = async () => {
    const res = await apiCall('api/posts', 'POST', dataTest);
    return res.id;
};

describe('Api Posts', () => {
    it('GET /api/posts return data', async () => {
        const res = await apiCall('api/posts')
        expect(res).toBeTruthy();
    })

    it('GET /api/posts/1 return item', async () => {
        const res = await apiCall('api/posts/1')
        expect(res).toBeTruthy();
    })

    it('GET /api/posts/9999 return 404', async () => {
        const res = await apiCall('api/posts/9999')
        expect(res).toMatchObject({
            status: 404,
            message: "Post not found."
        });
    })

    it('POST /api/posts/ return item', async () => {
        const res = await apiCall('api/posts', 'POST', dataTest)
        expect(res).toMatchObject(dataTest);
    })

    it('PATCH /api/posts/1 return item', async () => {
        const res = await apiCall('api/posts/1', 'PATCH', dataTest)
        expect(res).toMatchObject(dataTest);
    })

    it(`DELETE /api/posts/ return null`, async () => {
        const dataId = await newPostId();
        const res = await apiCall(`api/posts/${dataId}`, 'DELETE')
        expect(res).toEqual({});
    })

    it('DELETE /api/posts/9999 return 404', async () => {
        const res = await apiCall('api/posts/9999', 'DELETE')
        expect(res).toEqual({
            status: 404,
            message: "Post not found."
        });
    })
})
