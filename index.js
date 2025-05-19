const { verifyToken } = require('@clerk/backend');

exports.handler = async (event) => {
  try {
    let token = event.authorizationToken || event.headers?.Authorization;

    if (!token) throw new Error("No token provided");

    if (token.startsWith("Bearer ")) {
      token = token.substring(7);
    }

    const claims = await verifyToken(token, {
      secretKey: process.env.CLERK_SECRET_KEY || "",
    });

    // Flatten claims and ensure all values are strings
    const flatClaims = {};
    for (const key in claims) {
      flatClaims[key] = String(claims[key]);
    }

    return generatePolicy('Allow', claims.sub, event.methodArn, flatClaims);

  } catch (error) {
    console.error("Token verification error:", error);
    return generatePolicy('Deny', 'Unauthorized', event.methodArn, {});
  }
};

const generatePolicy = (effect, principalId, resource, context) => ({
  principalId,
  policyDocument: {
    Version: '2012-10-17',
    Statement: [
      {
        Action: 'execute-api:Invoke',
        Effect: effect,
        Resource: resource,
      }
    ],
  },
  context, // must contain only flat string values
});
