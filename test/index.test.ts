import { describe, expect, it } from 'bun:test'

import app from '@/app'

describe('Api Root', () => {
    it('return a response text', async () => {
        const res = await app
            .handle(new Request('http://localhost:4321/api'))
            .then((res: any) => res.text())

        expect(res).toBe('Hello, Elysia!')
    })
})