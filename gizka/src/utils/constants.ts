export const BFF_PREFIX_URL = process.env.NEXT_PUBLIC_BFF_PREFIX_URL;
export const API_PREFIX_URL = process.env.API_PREFIX_URL;

export enum TextColor {
  GameMaster = '#b15d3b',

  Red = '#e33232',
  Blue = '#007be6',
  Orange = '#e36432',
  Green = '#5cb959',
  Grey = '#7fafc8',
  Purple = '#8c3cdb',
  PaleYellow = '#ffffbe',
  BlueAlt = '#4b5887',
  Jade = '#00b5a1',
  Rose = '#f2a3b8',
  Yellow = '#ffd800',
  Flashy = 'var(--flashy)',
  FlashyAlt = 'var(--flashy-alt)',
  Default = '#11b6f7',
}

export const colorOptions: Array<{ value: TextColor }> = [
  {
    value: TextColor.Red,
  },
  {
    value: TextColor.Blue,
  },
  {
    value: TextColor.Orange,
  },
  {
    value: TextColor.Green,
  },
  {
    value: TextColor.Grey,
  },
  {
    value: TextColor.Purple,
  },
  { value: TextColor.PaleYellow },
  {
    value: TextColor.BlueAlt,
  },
  { value: TextColor.Jade },
  { value: TextColor.Rose },
  { value: TextColor.Yellow },
];

export enum Media {
  sm = '600px',
  md = '960px',
  lg = '1280px',
  xl = '1920px',
}
