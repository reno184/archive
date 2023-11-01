import { Track } from '@arpege/models';

export interface TrackModel extends Track {
  onScene?: boolean;
  posX?: number;
  posY?: number;
}
