import { buildSeries } from './helpers';
export const keyboardProducts = buildSeries(11000, 6, 'keyboard', 'Razer', 'Click Keyboard', 199, { Switch: 'Linear' });
export const mouseProducts = buildSeries(12000, 6, 'mouse', 'Logitech', 'Aim Mouse', 149, { DPI: '26000' });
export const headsetProducts = buildSeries(13000, 6, 'headset', 'HyperX', 'Echo Headset', 249, { Type: 'Wireless' });
export const chairProducts = buildSeries(14000, 4, 'chair', 'Secretlab', 'Throne Chair', 899, { Material: 'Fabric' });
