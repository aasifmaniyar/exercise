import { test, expect } from '@playwright/test';
import {gittoken, url} from './constants';
test.describe(' API test for QA Assignment: Success & cases', ()=> {

  test('Get user with valid token', async ({ request }) => {
    const res = await request.get(url, {
      headers: {
        'Authorization': `Bearer ${gittoken}`,
      },
    });
    expect(res.status()).toEqual(200);
  });

  test('Update User Bio With Valid Token', async ({ request }) => {
    const res = await request.patch(url, {
      data :{
        "bio": "This is new bio I am adding using automating API"
      },
      headers: {
        'Authorization': `Bearer ${gittoken}`,
      },
    });
    expect(res.status()).toEqual(200);
    const text = await res.text();
    console.log(text);
    expect(text).toContain("This is new bio I am adding using automating API")
  });

  test('Get user with no token', async ({ request }) => {
    const res = await request.get(url);
    expect(res.status()).toEqual(401);
  });

  test('Get user with Invalid token', async ({ request }) => {
    const res = await request.get(url, {
      headers: {
        'Authorization': 'Bearer Invalid_token',
      },
    });
    expect(res.status()).toEqual(401);
  });

  test('Get user with Forbidden Access ', async ({ request }) => {
    const res = await request.get(url, {
      headers: {
        'Authorization': `Bearer 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`,
      },
    });
    expect(res.status()).toEqual(401);
  });
});
