export function tokenToUUID(token: string): string {
  return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString('utf8'))
    .sub
}
