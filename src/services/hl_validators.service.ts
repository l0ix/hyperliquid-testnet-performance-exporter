import axios from 'axios';

interface ValidatorStats {
    uptimeFraction: string;
    predictedApr: string;
    nSamples: number;
}

interface Validator {
    validator: string;
    signer: string;
    name: string;
    description: string;
    nRecentBlocks: number;
    stake: number;
    isJailed: boolean;
    unjailableAfter: number | null;
    isActive: boolean;
    commission: string;
    stats: [string, ValidatorStats][];
}

export class HLValidatorsService {
    private readonly apiUrl = 'https://api-ui.hyperliquid-testnet.xyz/info';

    async getValidators(): Promise<Validator[]> {
        const response = await axios.post(this.apiUrl, {
            type: "validatorSummaries"
        });
        return response.data;
    }

    async getValidatorByIdentifier(identifier: string): Promise<Validator | null> {
        const validators = await this.getValidators();
        return validators.find(v => 
            v.name.toLowerCase() === identifier.toLowerCase() || 
            v.validator.toLowerCase() === identifier.toLowerCase()
        ) || null;
    }
}
