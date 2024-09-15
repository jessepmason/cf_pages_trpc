import * as Test from "./file_1"

export default {
  async fetch(request, env) {
      const url = new URL(request.url);
      return new Response(Test.test());
      //  Otherwise, serve the static assets.
      // Without this, the Worker will error andno assets will be served.
      // return env.ASSETS.fetch(request);
  },
}