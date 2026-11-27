import { GeneratedTestUser } from '../types/fixtures';
export function generateTestUser({
    prefix = 'user',
    domain = 'test.com',
}: {
    prefix?: string;
    domain?: string;
} = {}): GeneratedTestUser {
  const random = Math.floor(Math.random() * 10000);  
  const username = `${prefix}_${random}`;  
  return {    
    username,    
    email: `${username}@${domain}`,    
    password: 'Test1234!',  
  };}