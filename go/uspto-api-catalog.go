package voxgigusptoapicatalogsdk

import (
	"github.com/voxgig-sdk/uspto-api-catalog-sdk/go/core"
	"github.com/voxgig-sdk/uspto-api-catalog-sdk/go/entity"
	"github.com/voxgig-sdk/uspto-api-catalog-sdk/go/feature"
	_ "github.com/voxgig-sdk/uspto-api-catalog-sdk/go/utility"
)

// Type aliases preserve external API.
type UsptoApiCatalogSDK = core.UsptoApiCatalogSDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type UsptoApiCatalogEntity = core.UsptoApiCatalogEntity
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type UsptoApiCatalogError = core.UsptoApiCatalogError

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewPatentEntityFunc = func(client *core.UsptoApiCatalogSDK, entopts map[string]any) core.UsptoApiCatalogEntity {
		return entity.NewPatentEntity(client, entopts)
	}
	core.NewTrademarkEntityFunc = func(client *core.UsptoApiCatalogSDK, entopts map[string]any) core.UsptoApiCatalogEntity {
		return entity.NewTrademarkEntity(client, entopts)
	}
}

// Constructor re-exports.
var NewUsptoApiCatalogSDK = core.NewUsptoApiCatalogSDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig

// No-arg convenience constructors. Go has no default-argument syntax,
// so these aliases let callers write `sdk.New()` / `sdk.Test()`
// instead of `sdk.NewUsptoApiCatalogSDK(nil)` / `sdk.TestSDK(nil, nil)`
// for the common no-options case.
func New() *UsptoApiCatalogSDK  { return NewUsptoApiCatalogSDK(nil) }
func Test() *UsptoApiCatalogSDK { return TestSDK(nil, nil) }
var NewBaseFeature = feature.NewBaseFeature
var NewTestFeature = feature.NewTestFeature
