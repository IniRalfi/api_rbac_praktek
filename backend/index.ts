import { createApp } from "./src/app";
import { env } from "./src/config/env";

const app = createApp();

app.listen(env.PORT, () => {
  console.log(`🚀 Server running on http://localhost:${env.PORT}`);
});
