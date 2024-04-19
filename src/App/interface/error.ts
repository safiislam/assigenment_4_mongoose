export type TGenericErrorRespose = {
    success: boolean,
    message: string,
    errorMessage: string
}
export type TErrorSources = {
    path: string | number,
    message: string
}