import * as jose from "jose";
const secret = new TextEncoder().encode(process.env.JWT_SECRET);

const signToken = async (data: any) => {
  const alg = "HS256";
  const jwt = await new jose.SignJWT(data)
    .setProtectedHeader({ alg })
    .setIssuedAt()
    .setIssuer("urn:example:issuer")
    .setAudience("urn:example:audience")
    .setExpirationTime("2h")
    .sign(secret);

  return jwt;
};

const verifyToken = async (jwt: string) => {
  try {
    const data = await jose.jwtVerify(jwt, secret);
    return data.payload.userId as number;
  } catch (error) {
    console.log("JWT verification error");
    throw error;
  }
};
export { signToken, verifyToken };
