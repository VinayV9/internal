const googleClient = require('google-auth-library')

function verifyGoogleAuthToken(req, res, next){
    googleClient.verifyIdToken(
        {
            idToken: req.body.token,
            audience: process.env.GOOGLE_CLIENT_ID
        }
    ).then(
        login => {
            let payload = login.getPayload()
            let audience = payload.aud

            if(audience !== process.env.GOOGLE_CLIENT_ID){
                next(null, new Error('token is invalid'))
            }
            next({
                username: payload['name'],
                picture: payload['picture'],
                email: payload['email']
            }, null)
        }
        
    )

}