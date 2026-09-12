import { UsptoApiCatalogEntityBase } from '../UsptoApiCatalogEntityBase';
import type { UsptoApiCatalogSDK } from '../UsptoApiCatalogSDK';
import type { Control } from '../types';
import type { Patent, PatentLoadMatch, PatentListMatch } from '../UsptoApiCatalogTypes';
declare class PatentEntity extends UsptoApiCatalogEntityBase<Patent> {
    constructor(client: UsptoApiCatalogSDK, entopts: any);
    make(this: PatentEntity): PatentEntity;
    load(this: any, reqmatch?: PatentLoadMatch, ctrl?: Control): Promise<PatentEntity>;
    list(this: any, reqmatch?: PatentListMatch, ctrl?: Control): Promise<PatentEntity[]>;
}
export { PatentEntity };
