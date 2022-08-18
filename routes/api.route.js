const router = require('express').Router();
const {google} = require('googleapis');
const { safebrowsing } = require('googleapis/build/src/apis/safebrowsing');
const GOOGLE_CLIENT_ID=''
const GOOGLE_CLIENT_SECRET=''
const REFRESH_TOKEN =''

const oauth2Client = new google.auth.OAuth2(
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  'http://localhost:3000'
)

router.get('/', async (req, res, next) => {
  res.send({ message: 'Ok api is working 🚀' });
});
router.post('/create-tokens',async(req,res,next)=>{
  try {
    const {code} =req.body
    const {tokens} = await oauth2Client.getToken(code)
    res.send(tokens)
    
    // res.send(code)
    
  } catch (error) {
    next(error);
  
  }
});
router.post('/create-event',async(req,res,next)=>{
  try {
    const{
      DateDebut,
					DateFin,
					
          Email,
    
    } = req.body
    oauth2Client.setCredentials({refresh_token:REFRESH_TOKEN})
    const calendar = google.calendar('v3');
    const response = await calendar.events.insert({
      auth: oauth2Client,
      calendarId: 'primary',
      requestBody:{
        start:{
          dateTime: new Date(DateDebut),

        },
        end:{
          dateTime: new Date(DateFin),
        },
        summary:,
        Type:,
        description:,
        location:,
        
  
        colorId:'7',
        attendees:[{'email':Email}],
       
     
       

      }
    });
    res.send(response)
  } catch (error) {
    next(error);
  
    
  }

})
module.exports = router;
