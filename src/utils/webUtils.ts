import Cookies from 'js-cookie';
const defaultKey = 'beluga_ts';
export type TrackingObject = {
  trafficSource?: string;
  medium?: string;
  campaign?: string;
  content?: string;
  term?: string;
  gclid?: string;
  ttclid?: string;
  fbclid?: string;
  clickId?: string;
  lineUid?: string;
  fbBusinessId?: string;
  fbAssetId?: string;
  fbSelectedId?: string;
  fbMailBoxId?: string;
};

export function parseJSON(jsonString) {
  try {
    return JSON.parse(jsonString);
  } catch (error) {
    // Log the error to the console if needed
    // console.log("Failed to parse JSON:", error);
    return {};
  }
}

let cookieDomain;
function generateDomainForCookie() {
  const hostname = window.location.hostname;
  // Check if the hostname is an IP address
  if (/^[0-9]+(\.[0-9]+){3}$/.test(hostname)) {
      // It's an IP address, so don't set the domain attribute
      return '';
  } else {
      // It's a named domain, extract the domain in a format for cookies
      return `.${hostname.substring(hostname.lastIndexOf(".", hostname.lastIndexOf(".") - 1) + 1)}`;
  }
}
export function storeIfExists(key, value) {

    if(!cookieDomain){
      cookieDomain = generateDomainForCookie();
    }
    console.log({cookieDomain});
    if (value !== '' && !!value) {
      const cookies = parseJSON(Cookies.get(defaultKey)) as TrackingObject;
      const ls = parseJSON(localStorage.getItem(defaultKey)) as TrackingObject;
      Cookies.set(defaultKey, JSON.stringify({...cookies, [key]: value}), {expires:365, domain: cookieDomain});
      localStorage.setItem(defaultKey, JSON.stringify({...ls, [key]: value}));
    }
}
export const getFromStore = (key:string): string =>{
  const cookies:TrackingObject = parseJSON(Cookies.get(defaultKey)) || {};
  const ls:TrackingObject = parseJSON(localStorage.getItem(defaultKey)) || {}; 
  // console.log(cookies, ls)
  return cookies[key] || ls[key];
};
// Function to get all query parameters as an object
export function getQueryParamsWithLastValue(): Record<string, string> {
  const params = new URLSearchParams(window.location.search);
  const queryParams: Record<string, string> = {};

  // Directly assign the value to the key, allowing it to be overwritten if the key appears again
  params.forEach((value, key) => {
    queryParams[key] = value;
  });

  return queryParams;
}

export function getTrackingObject() {
  const ls = parseJSON(localStorage.getItem(defaultKey)) || {};
  const cookies = parseJSON(Cookies.get(defaultKey)) || {};
  return {...ls,...cookies};
}
