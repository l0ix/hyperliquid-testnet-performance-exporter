import { Router, Request, Response } from 'express';
import { register } from 'prom-client';
import { HLValidatorsService } from '../services/hl_validators.service';
import * as metrics from '../metrics/hl_validators.metrics';

const router = Router();
const validatorsService = new HLValidatorsService();

async function updateMetrics(validators: any[]) {
    // Reset all metrics before updating
    metrics.validatorStake.reset();
    metrics.validatorStatus.reset();
    metrics.validatorCommission.reset();
    metrics.validatorUptimeFraction.reset();
    metrics.validatorPredictedApr.reset();
    metrics.validatorSamples.reset();

    validators.forEach(validator => {
        const labels = {
            validator: validator.validator,
            name: validator.name,
            signer: validator.signer
        };

        metrics.validatorStake.set(labels, validator.stake);
        metrics.validatorStatus.set({
            validator: validator.validator,
            name: validator.name,
            is_jailed: validator.isJailed.toString()
        }, validator.isActive ? 1 : 0);
        
        metrics.validatorCommission.set({
            validator: validator.validator,
            name: validator.name
        }, parseFloat(validator.commission));

        validator.stats.forEach(([period, stats]: [string, any]) => {
            metrics.validatorUptimeFraction.set({
                validator: validator.validator,
                name: validator.name,
                period
            }, parseFloat(stats.uptimeFraction));

            metrics.validatorPredictedApr.set({
                validator: validator.validator,
                name: validator.name,
                period
            }, parseFloat(stats.predictedApr));

            metrics.validatorSamples.set({
                validator: validator.validator,
                name: validator.name,
                period
            }, stats.nSamples);
        });
    });
}

// @ts-ignore
router.get('/metrics/:identifier', async (req: Request, res: Response) => {
    try {
        const validator = await validatorsService.getValidatorByIdentifier(req.params.identifier);
        if (!validator) {
            return res.status(404).send('Validator not found');
        }
        await updateMetrics([validator]);
        res.set('Content-Type', register.contentType);
        res.send(await register.metrics());
    } catch (error) {
        console.error('Error fetching metrics:', error);
        res.status(500).send('Internal server error while fetching metrics');
    }
});

router.get('/metrics', async (req: Request, res: Response) => {
    try {
        const validators = await validatorsService.getValidators();
        await updateMetrics(validators);
        res.set('Content-Type', register.contentType);
        res.send(await register.metrics());
    } catch (error) {
        res.status(500).send(error);
    }
});


export default router;
