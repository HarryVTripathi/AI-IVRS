const request = require('request');
const { Router } = require('express');

const router = Router();

async function getSpeech(req, res, next) {
  const url = 'https://texttospeech.googleapis.com/v1beta1/text:synthesize?key=AIzaSyCGNPwkrjEqEJwGdo8T0oQAhihhOCfqDic';

  const headers = {
    'Content-Type': "application/json",
    'Authentication': "ya29.c.Kmq6BxOjtxVSMa04lRr_SgO_Sv8a19ka2WmyThNeonRMHZZuPs15kg1Sg1nV-jp9xJlUZ68UUrP9nnEDAOJNYMcPeXpSvKKLZ19p1GsU9YHCZFFTeeUO1auFolxUak9MYpBeesjNHQ1eUrKP"
  };
  
  const body = {
    input: {
      text:"Android is a mobile operating system developed by Google, based on the Linux kernel and designed primarily for touchscreen mobile devices such as smartphones and tablets."
    },
    voice: {
      languageCode:"en-gb",
      name:"en-GB-Standard-A",
      ssmlGender:"FEMALE"
    },
    audioConfig:{
      audioEncoding:"MP3"
    }
  };
  
  const options = {
    url,
    body,
    json: true,
    method: 'post',
  };

  try {
    const { body: { audioContent } } = await fun(options);
    res.status(200).json({ base64Audio: audioContent});
  } catch (error) {
    res.status(error.status).json({ err: "error"});
  }
}

function fun (options) {
  return new Promise((resolve, reject) => {
    request(options, (error, response) => {
      if (error)
        reject(error);
      else
        resolve(response);
    })
  })
}

router.get('/', getSpeech);
// fun(options)
//   .then((res) => {
//     console.log(res);
//   })
//   .catch((error) => {
//     console.log(error);
//   });

module.exports = { ttsRouter: router };
