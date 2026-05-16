package core

type UsptoApiCatalogError struct {
	IsUsptoApiCatalogError bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewUsptoApiCatalogError(code string, msg string, ctx *Context) *UsptoApiCatalogError {
	return &UsptoApiCatalogError{
		IsUsptoApiCatalogError: true,
		Sdk:              "UsptoApiCatalog",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *UsptoApiCatalogError) Error() string {
	return e.Msg
}
