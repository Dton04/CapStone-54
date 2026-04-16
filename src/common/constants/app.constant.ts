import "dotenv/config";

export const DATABASE_URL = process.env.DATABASE_URL;
export const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET;
export const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;
export const JWT_ACCESS_EXPIRES = process.env.JWT_ACCESS_EXPIRES;
export const JWT_REFRESH_EXPIRES = process.env.JWT_REFRESH_EXPIRES;

console.log(
   "\n",
   {
      DATABASE_URL: DATABASE_URL,
      JWT_ACCESS_SECRET: JWT_ACCESS_SECRET,
      JWT_REFRESH_SECRET: JWT_REFRESH_SECRET,
      JWT_ACCESS_EXPIRES: JWT_ACCESS_EXPIRES,
      JWT_REFRESH_EXPIRES: JWT_REFRESH_EXPIRES,
   },
   "\n",
);
