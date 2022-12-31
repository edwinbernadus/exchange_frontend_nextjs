import { getAccessToken, withApiAuthRequired } from '@auth0/nextjs-auth0';

// export default withApiAuthRequired(async function shows(req, res) {
export default async function shows(req, res) {
  try {
    const { accessToken } = await getAccessToken(req, res, {
      // scopes: ['read:shows']
    });
    console.log("accessToken",accessToken)

    var shows = {
      output : 123,
      token : accessToken
    }
    res.status(200).json(shows);
  } catch (error) {
    res.status(error.status || 500).json({error: error.message});
  }
}
// );
