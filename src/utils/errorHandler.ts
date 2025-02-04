export const errorHandler = (...value: any) => {
    const VITE_ENV_TYPE = import.meta.env.VITE_ENV_TYPE;

    if(VITE_ENV_TYPE == "development") {
        console.log(value);
    }
}
