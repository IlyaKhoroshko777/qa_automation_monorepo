export interface UserProfile {
    id:number;
    email:string;
    isActive: boolean;
    phoneNumber?: string
}

export interface RecipeFixture {
    title: string;
    category:string;
    cookingTime?: number;
}