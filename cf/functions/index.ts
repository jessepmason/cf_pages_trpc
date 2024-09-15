
export const onRequest: PagesFunction<Env> = async (context) => {
    return new Response("Hello from home function");
}