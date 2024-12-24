import { Gauge } from 'prom-client';

export const validatorStake = new Gauge({
    name: 'hyperliquid_validator_stake',
    help: 'The stake amount of the validator',
    labelNames: ['validator', 'name', 'signer']
});

export const validatorStatus = new Gauge({
    name: 'hyperliquid_validator_status',
    help: 'The status of the validator (1 for active, 0 for inactive)',
    labelNames: ['validator', 'name', 'is_jailed']
});

export const validatorCommission = new Gauge({
    name: 'hyperliquid_validator_commission',
    help: 'The commission rate of the validator',
    labelNames: ['validator', 'name']
});

export const validatorUptimeFraction = new Gauge({
    name: 'hyperliquid_validator_uptime_fraction',
    help: 'The uptime fraction of the validator',
    labelNames: ['validator', 'name', 'period']
});

export const validatorPredictedApr = new Gauge({
    name: 'hyperliquid_validator_predicted_apr',
    help: 'The predicted APR of the validator',
    labelNames: ['validator', 'name', 'period']
});

export const validatorSamples = new Gauge({
    name: 'hyperliquid_validator_samples',
    help: 'Number of samples for the validator metrics',
    labelNames: ['validator', 'name', 'period']
});
