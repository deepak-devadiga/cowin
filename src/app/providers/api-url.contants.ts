import { URLTYPE } from "../enums/url.enum";

export const API_CONSTANTS = {
  GEO: {
    TYPE: URLTYPE.VACCINE,
    URL: {
      STATES: 'v2/admin/location/states',
      DISTRICT: 'v2/admin/location/districts/'
    }

  },
  VACCINE: {
    TYPE: URLTYPE.VACCINE,
    URL: {
      FINDBY: {
        PIN: `v2/appointment/sessions/public/findByPin`,
        DISTRICT: `v2/appointment/sessions/public/findByDistrict`
      },
      CALENDARBY: {
        PIN: '/v2/appointment/sessions/public/calendarByPin',
        DISTRICT: '/v2/appointment/sessions/public/calendarByDistrict'
      }
    }
  },
  ANALYTICS: {
    TYPE: URLTYPE.ANALYTICS,
    URL: {
      COUNT: '/v4/min/data.min.json',
      LOGS: '/updatelog/log.json'
    }
  }
}


export const LoaderExcludes = [
  'log.json'
]
