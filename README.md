## Run Locally

1. Clone the repository
```bash
git clone <repository-url>
cd nextjs-docker
```

2. Install dependencies
```bash
npm install
```

3. Create a `.env` file in the root directory
```bash
echo "NEXT_PUBLIC_GEMINI=<your gemini key>" > .env
```

4. Start development server
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## Run with Docker

1. Create a `.env` file in the root directory
```bash
echo "NEXT_PUBLIC_GEMINI=<your gemini key>" > .env
```

2. Build the Docker image
```bash
docker build -t nextjs-docker .
```

3. Run the container
```bash
docker run -p 3000:3000 --env-file .env nextjs-docker
```

The application will be available at `http://localhost:3000`