import { NotFoundError } from 'elysia';
import db from '.';

export type PostCreateReq = { title: string; content: string };
export type PostUpdateReq = { title?: string; content?: string };

async function list() {
    return await db.post.findMany({ orderBy: { createdAt: 'desc' } });
}

async function show(id: number) {
    const post = await db.post.findUnique({
        where: { id },
    });

    if (!post) {
        throw new NotFoundError('Post not found.');
    }

    return post;
}

async function create(options: PostCreateReq) {
    const { title, content } = options;
    return await db.post.create({ data: { title, content } });
}

async function update(id: number, options: PostUpdateReq) {
    const { title, content } = options;
    try {
        return await db.post.update({
            where: { id },
            data: {
                ...(title ? { title } : {}),
                ...(content ? { content } : {}),
            },
        });
    } catch (e: any) {
        console.log(e);
        throw new NotFoundError('Post not found.');
    }
}

async function destroy(id: number) {    
    try {
        await db.post.delete({
            where: { id },
        });
        return {}
    } catch (e: any) {
        if (e.code == 'P2025') {
            throw new NotFoundError('Post not found.');
        }
        throw e;
    }
}

export default {
    list,
    show,
    create,
    update,
    destroy,
};