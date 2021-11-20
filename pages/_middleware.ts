export function middleware(req: any, ev: any) {
  console.log('middleware');
  return new Response('Hello, world!');
}
