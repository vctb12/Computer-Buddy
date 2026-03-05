export const parseWatts = (v: string | number) => Number(String(v).replace(/[^0-9.]/g, ''));
export const parseMm = (v: string | number) => Number(String(v).replace(/[^0-9.]/g, ''));
export const parseConnectorCount = (v: string) => Number((v.match(/[0-9]+/) ?? ['0'])[0]);
