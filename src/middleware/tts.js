const fs = require('fs');
const request = require('request');
const { Router } = require('express');

const router = Router();

async function getSpeech(req, res, next) {
  console.info('Request received, generating speech...');
  const url = 'https://texttospeech.googleapis.com/v1beta1/text:synthesize?key=AIzaSyCGNPwkrjEqEJwGdo8T0oQAhihhOCfqDic';

  const { body } = req;
  console.log(body);

  const headers = {
    'Content-Type': "application/json",
    'Authentication': "ya29.c.Kmq6BxOjtxVSMa04lRr_SgO_Sv8a19ka2WmyThNeonRMHZZuPs15kg1Sg1nV-jp9xJlUZ68UUrP9nnEDAOJNYMcPeXpSvKKLZ19p1GsU9YHCZFFTeeUO1auFolxUak9MYpBeesjNHQ1eUrKP"
  };
  
  const body_legacy = {
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
    const { body: { audioContent: base64Data } } = await makeRequest(options);
    const TTSResult = base64Data ? "SUCCESS": "FAILURE";
    fs.writeFileSync('file.mp3', Buffer.from(base64Data.replace('data:audio/mp3; codecs=opus;base64,', ''), 'base64'));

    console.info('Completed...')
    res.status(200).json({ TTSResult });

  } catch (error) {
    console.log(error);
    res.status(500).json({ err: "error in tts"});
  }
}

function makeRequest (options) {
  return new Promise((resolve, reject) => {
    request(options, (error, response) => {
      if (error)
        reject(error);
      else
        resolve(response);
    })
  })
}

router.route('/')
  .get(getSpeech);

module.exports = { ttsRouter: router };
