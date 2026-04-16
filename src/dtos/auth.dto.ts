// ─── Auth DTOs ───────────────────────────────────────────────────────────────
// Data Transfer Objects định nghĩa shape của data đi vào service layer

export interface RegisterDto {
   full_name: string
   email: string
   password: string
   age?: number
}

export interface LoginDto {
   email: string
   password: string
}

export interface RefreshTokenDto {
   refresh_token: string
}

// ─── Auth Responses ───────────────────────────────────────────────────────────

export interface AuthUserPayload {
   id: number
   email: string
   full_name: string
}

export interface TokenPair {
   accessToken: string
   refreshToken: string
}

export interface AuthResult {
   user: {
      id: number
      full_name: string
      email: string
      avatar: string | null
      age: number | null
      created_at: Date
   }
   accessToken: string
   refreshToken: string
}
