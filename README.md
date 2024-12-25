# Hyperliquid Validators Prometheus Exporter

[![NPM](https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white)](https://www.npmjs.com/) 
[![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/) 
[![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/) 
[![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/) 
[![Docker Compose](https://img.shields.io/badge/docker--compose-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)](https://docs.docker.com/compose/) 
[![Grafana](https://img.shields.io/badge/grafana-%23F46800.svg?style=for-the-badge&logo=grafana&logoColor=white)](https://grafana.com/) 
[![Prometheus](https://img.shields.io/badge/Prometheus-E6522C?style=for-the-badge&logo=Prometheus&logoColor=white)](https://prometheus.io/)


A Prometheus exporter that collects performance metrics for Hyperliquid testnet validators. This exporter allows you to monitor both individual validators and the entire validator set, exposing key metrics such as stake, status, commission rates, and performance statistics.

This exporter not only provides real-time metrics but also enables historical tracking of validator performance over time. By storing time-series data in Prometheus, you can:
- Analyze trends in validator uptime, APR, and stake amounts
- Track commission rate changes and validator status transitions
- Generate historical performance reports and alerts based on metric thresholds
- Monitor validator jailing history and identify patterns in validator behavior


## Deploy on Akash Network [![Akash](https://img.shields.io/badge/Akash-F6444F?style=flat-square&logo=data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMTIgMkw0LjkyODkzIDYuNUw0LjkyODkzIDE1LjVMMTIgMjBMMTkuMDcxMSAxNS41TDE5LjA3MTEgNi41TDEyIDJaIiBmaWxsPSJ3aGl0ZSIvPjwvc3ZnPg==&logoColor=white)](https://akash.network)

The complete monitoring stack can be deployed on the Akash Network with a single click using the provided `akash.sdl` file.

 To deploy:

1. Copy the `akash.sdl` file
2. Deploy through the [Akash Console](https://console.akash.network/new-deployment?step=edit-deployment) or CLI
3. Access your monitoring stack through the provided endpoints
4. Configure Prometheus data source in Grafana:
   - Navigate to Configuration > Data Sources
   - Click "Add data source" and select Prometheus
   - Set URL to `http://<akash url>:<akash port>`
   - Click "Save & Test" to verify the connection

5. Import the pre-configured Grafana dashboard:
   - Log into Grafana (default credentials: admin/admin)
   - Navigate to Dashboards > Import
   - Upload the provided `grafana/dashboards/hyperliquid.json` file
   - Select your Prometheus data source
   - Click Import to finalize


The deployment is optimized for cost-effectiveness while maintaining performance, with resource allocations suitable for monitoring multiple validators.




## Preview

![Hyperliquid Validators Prometheus Exporter Dashboard](./assets/grafana.gif)

## Features

- Collect metrics for all Hyperliquid validators
- Query metrics for specific validators by name or address
- Built-in Prometheus and Grafana integration

## Exposed Metrics

| Metric Name | Description | Labels |
|-------------|-------------|---------|
| `hyperliquid_validator_stake` | The stake amount of the validator | validator, name, signer |
| `hyperliquid_validator_status` | The status of the validator (1 for active, 0 for inactive) | validator, name, is_jailed |
| `hyperliquid_validator_commission` | The commission rate of the validator | validator, name |
| `hyperliquid_validator_uptime_fraction` | The uptime fraction of the validator | validator, name, period |
| `hyperliquid_validator_predicted_apr` | The predicted APR of the validator | validator, name, period |
| `hyperliquid_validator_samples` | Number of samples for the validator metrics | validator, name, period |

## Installation & Usage

### Local Development

1. Install dependencies:
```bash
npm install
```

2. Build the project:
```bash
npm run build
```

3. Start the server:
```bash
npm start
```

The exporter will be available at `http://localhost:3333/metrics`

### Docker Compose Setup

The project includes a complete monitoring stack with Prometheus and Grafana:

1. Start the stack:
```bash
docker-compose up -d
```

This will start:
- Prometheus (accessible at `http://localhost:9090`)
- Grafana (accessible at `http://localhost:3000`)
- Hyperliquid Exporter (accessible at `http://localhost:3333`)

Default Grafana credentials:
- Username: `admin`
- Password: `admin`

## API Endpoints

- `/metrics`: Returns metrics for all validators
- `/metrics/:identifier`: Returns metrics for a specific validator (by name or address)


## Grafana & Prometheus Usage with Docker Compose

### Prometheus

Once the docker-compose stack is running, you can verify metrics are being collected in Prometheus by:

1. Navigate to `http://localhost:9090` (automatically configured in docker-compose)
2. Go to the "Graph" tab
3. Enter any metric name (e.g. `hyperliquid_validator_commission`) in the query box
4. Click "Execute" to see the data

### Grafana

To visualize the metrics in Grafana using the docker-compose setup:

1. Navigate to `http://localhost:3000` and login with the default credentials:
   - Username: `admin`
   - Password: `admin`
2. Prometheus is automatically configured as a data source in the docker-compose setup
3. Create a new dashboard:
   - Click "+" > "Create New Dashboard"
   - Add panels using metrics like:
     - `hyperliquid_validator_commission`
     - `hyperliquid_validator_uptime_fraction`
     - `hyperliquid_validator_predicted_apr`
4. Save your dashboard

Example PromQL queries:
- Show all validator commissions: `hyperliquid_validator_commission`
- Filter by validator name: `hyperliquid_validator_uptime_fraction{name="validator_name"}`
- Show top 5 APRs: `topk(5, hyperliquid_validator_predicted_apr)`



## Prometheus Configuration

To scrape metrics from this exporter, add the following to your `prometheus.yml`:

```yaml
scrape_configs:
  - job_name: 'hyperliquid'
    metrics_path: '/metrics'
    static_configs:
      - targets: ['localhost:3333']
```

If you're using the provided Docker Compose setup, this configuration is already included.

## Development

### Prerequisites

- Node.js 18 or higher
- npm
- Docker and Docker Compose (for containerized setup)

### Building

```bash
npm run build
```

### Running in Development Mode

```bash
npm run dev
```

### Environment Variables

You can customize the exporter's configuration using environment variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | The port number on which the exporter will listen | `3333` |



## Project Structure

```
.
├── Dockerfile
├── docker-compose.yml
├── package.json
├── src
│   ├── metrics
│   └── hl_validators.metrics.ts
│   ├── routes
│   │   └── metrics.routes.ts
│   ├── services
│   │   └── hl_validators.service.ts
│   └── server.ts
├── prometheus
│   └── prometheus.yml
└── grafana
    └── provisioning
        └── datasources
            └── datasources.yml
```


## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
