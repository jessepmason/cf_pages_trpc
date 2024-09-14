(() => {
  // src/worker.js
  var worker_default = {
    async fetch(request, env) {
      const url = new URL(request.url);
      return new Response("Hello From Dist");
    }
  };
})();
