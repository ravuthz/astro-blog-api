import app from '@/app';

const handle = ({ request }: { request: Request }) => app.handle(request)

export const GET = handle
export const POST = handle
export const PATCH = handle
export const DELETE = handle