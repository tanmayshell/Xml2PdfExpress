import { parseString } from 'xml2js';

// Function to convert XML into JavaScript Object
export const parseXml = async (xmlData) => {
  return new Promise((resolve, reject) => {
    parseString(xmlData, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
};
