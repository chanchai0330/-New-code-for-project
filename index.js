Tamotsu.initialize();
const Enubudata = Tamotsu.Table.define({ sheetName: 'ENUbuDatas' });
export default Enubudata;

const responseJSON = jsonObject => {
  return ContentService.createTextOutput(JSON.stringify(jsonObject)).setMimeType(
    ContentService.MimeType.JSON
  );
};

const doPost = e => {
  const data = JSON.parse(e.postData.contents);

  const { parameters, intent } = data.queryResult;
  if (intent.displayName === 'Ask for answer') {
    const enubudataQuestion = parameters.enubudata;

    const enubudata = Enubudata.where({ question: enubudataQuestion }).first();

    const response = {
      fulfillmentText: ` ${enubudata.answer} `,
      fulfillmentMessages: [
        {
          platform: 'line',
          type: 4,
          payload: {
            line: {
              type: 'text',
              text: ` ${enubudata.answer} `
            }
          }
        }
      ]
    };

    return responseJSON(response);
  }

  return responseJSON({ fulfillmentText: 'ไม่เข้าใจครับ ลองใหม่อีกทีนะครับ' });
};

global.doPost = doPost;
