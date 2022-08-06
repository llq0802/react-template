import { Moment } from 'moment';

export interface BussReleaseType {
  pubId: number;
  pubName: string;
  pubType: string;
  pubTypeName: string;
  pubDesc: string;
  pubIcon: string;
  pubContent: string;
  enableTime: string;
  disableTime: string;
  time: [Moment | null, Moment | null];
  state: number;
  sortId: number;
}

export type BussReleaseTypePartial = Partial<BussReleaseType>;
