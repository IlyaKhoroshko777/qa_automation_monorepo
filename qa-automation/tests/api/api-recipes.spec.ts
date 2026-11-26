import {test, expect} from '@playwright/test';
import { DEFAULT_USER } from '../../data/test-user';
import { LoginResponseBody,ErrorResponseBody } from '../../types/api';
import { NewRecipePayload,CreateRecipeResponseBody } from '../../types/api';

test.use({baseURL:'http://localhost:4040/api/'})

let accessToken: string;

test.beforeAll(async ({ request }) => {
  const response = await request.post('auth/login', {
    data: DEFAULT_USER,
  });
  expect(response.ok()).toBeTruthy();

  const loginBody: LoginResponseBody = await response.json();
    accessToken = loginBody.data.accessToken;
    expect(accessToken).toBeTruthy();
});

test('POST /auth/login with wrong password fails', async ({ request }) => {
  const response = await request.post('auth/login', {
    data: { ...DEFAULT_USER, password: 'wrong-password' },
  });

  expect(response.status()).toBe(401);
  const body: ErrorResponseBody = await response.json();
  expect(body.message).toBeDefined();
});

const newRecipe: NewRecipePayload = {
  title: `Борщ${Date.now()}`,
  description: 'Класичний український суп на основі буряка з овочами та мʼясом.',
  category: 'Dinner',
  area: 'Ukraine',
  time: '60 minutes',
  calories: 320,
  instructions: '1. Наріжте овочі. 2. Обсмажте буряк і моркву. 3. Варіть у бульйоні 40 хвилин.',
  ingredients: [{ id: '640c2dd963a319ea671e383b', measure: '300 g' }],
};
test('POST /recipes creates a recipe and it is retrievable', async ({ request }) => {
    const createResponse = await request.post('recipes', {
    data: newRecipe,
    headers: { Authorization: `Bearer ${accessToken}` },
  });
    expect(createResponse.status()).toBe(201);

    const createBody: CreateRecipeResponseBody = await createResponse.json();
    expect(createBody.data).toMatchObject({
    title: newRecipe.title,
    description: newRecipe.description,
    category: newRecipe.category,
  });

    const getResponse = await request.get(`recipes/${createBody.data.id}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
    expect(getResponse.status()).toBe(200);
});

test('POST /recipes without token fails', async ({ request }) => {
    const response = await request.post('recipes', { data: newRecipe });
    expect(response.status()).toBe(401);
});