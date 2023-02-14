import { api } from "api";

const port = process.env.PORT || 3000;

api.listen(port, () =>
  console.log(`🚀 Server ready at: http://localhost:${port}`)
);
