import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const nextConfig = {
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://api:3001/:path*", // Proxy requests to your API service
        // destination: "http://localhost:3001/:path*", // for dev
      },
    ];
  },
};

export default nextConfig;
