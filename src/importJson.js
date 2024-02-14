import { readFileSync } from 'fs';
import JSON5 from 'json5';

/** @param {string} path */
function importJson(path) {
  const urlPathToRawJson = new URL(path, import.meta.url);

  const rawJsonWithComments = readFileSync(urlPathToRawJson);

  // @ts-ignore
  return JSON5.parse(rawJsonWithComments);
}

export { importJson };
