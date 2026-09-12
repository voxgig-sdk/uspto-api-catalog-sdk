import { PatentEntity } from './entity/PatentEntity';
import { TrademarkEntity } from './entity/TrademarkEntity';
export type * from './UsptoApiCatalogTypes';
import { inspect } from 'node:util';
import type { Context, Feature } from './types';
import { config } from './Config';
import { UsptoApiCatalogEntityBase } from './UsptoApiCatalogEntityBase';
import { Utility } from './utility/Utility';
import { BaseFeature } from './feature/base/BaseFeature';
declare const stdutil: Utility;
declare class UsptoApiCatalogSDK {
    _mode: string;
    _options: any;
    _utility: Utility;
    _features: Feature[];
    _rootctx: Context;
    constructor(options?: any);
    options(): any;
    utility(): any;
    prepare(fetchargs?: any): Promise<any>;
    direct(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    _rawRequest(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    graphql(query: string, variables?: any, ctrl?: any): Promise<any>;
    Patent(entopts?: Record<string, any>): PatentEntity;
    Trademark(entopts?: Record<string, any>): TrademarkEntity;
    static test(testoptsarg?: any, sdkoptsarg?: any): UsptoApiCatalogSDK;
    tester(testopts?: any, sdkopts?: any): UsptoApiCatalogSDK;
    toJSON(): {
        name: string;
    };
    toString(): string;
    [inspect.custom](): string;
}
declare const SDK: typeof UsptoApiCatalogSDK;
export { stdutil, config, BaseFeature, UsptoApiCatalogEntityBase, UsptoApiCatalogSDK, SDK, };
