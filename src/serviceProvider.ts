export interface ServiceProvider {
    id: number,
    name: string,
    adress: string,
    cover_image: string,
    description: string,
    phone: number,
    email: string,
    userServiceProvider: Array<object>
}