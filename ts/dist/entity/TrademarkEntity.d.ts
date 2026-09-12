import { UsptoApiCatalogEntityBase } from '../UsptoApiCatalogEntityBase';
import type { UsptoApiCatalogSDK } from '../UsptoApiCatalogSDK';
import type { Control } from '../types';
import type { Trademark, TrademarkLoadMatch, TrademarkListMatch } from '../UsptoApiCatalogTypes';
declare class TrademarkEntity extends UsptoApiCatalogEntityBase<Trademark> {
    constructor(client: UsptoApiCatalogSDK, entopts: any);
    make(this: TrademarkEntity): TrademarkEntity;
    load(this: any, reqmatch?: TrademarkLoadMatch, ctrl?: Control): Promise<TrademarkEntity>;
    list(this: any, reqmatch?: TrademarkListMatch, ctrl?: Control): Promise<TrademarkEntity[]>;
}
export { TrademarkEntity };
