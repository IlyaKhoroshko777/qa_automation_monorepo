export interface LoginResponseBody{
data:{
    accessToken:string;
};
}
export interface NewRecipePayload {
  title: string;
  description: string;
  category: string;
  area: string;
  time: string;
  calories: number;
  instructions: string;
  ingredients: { id: string; measure: string }[];
}

export interface CreatedRecipeData extends NewRecipePayload {
    id: string;
}
export interface CreateRecipeResponseBody {
  data: CreatedRecipeData;
}
export interface ErrorResponseBody {
  message: string;
}