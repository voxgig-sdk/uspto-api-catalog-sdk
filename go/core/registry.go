package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewPatentEntityFunc func(client *UsptoApiCatalogSDK, entopts map[string]any) UsptoApiCatalogEntity

var NewTrademarkEntityFunc func(client *UsptoApiCatalogSDK, entopts map[string]any) UsptoApiCatalogEntity

