import * as t from "io-ts";


export type EmailAddress = string;

export type ViewId = number;
type FacetId = string;

export enum ViewVisibility {
  Hidden = "hidden",
  Visible = "visible"
}
export enum Language {
  FI = "fi",
  SV = "sv",
  EN = "en-gb"
}
export interface Facet {
  id: FacetId;
}
export enum ViewStatus {
  BETA = "1",
  TEST = "2",
  PRODUCTION = "3",
  REMOVED_FROM_USE = "4"
}
export interface ViewGeneral {
  id: ViewId;
  title: string;
  email: EmailAddress;
  description?: string;
  status: ViewStatus;
  visibility: ViewVisibility;
  lastPublished?: string;
  languages: Language[];
  defaultLanguage: Language;
  commentsEnabled: boolean;
  parentView?: number;
}

export interface View {
  general: ViewGeneral | undefined;
  facets: Facet[] | undefined;
}

export interface ViewSummary {
  id: ViewId;
  title: string;
  status: ViewStatus;
}

// decoders
const OptionalNumber = t.union([t.number, t.undefined]);

const viewStatus = t.keyof({
  [ViewStatus.BETA]: null,
  [ViewStatus.TEST]: null,
  [ViewStatus.PRODUCTION]: null,
  [ViewStatus.REMOVED_FROM_USE]: null
});

const viewVisibility = t.keyof({
  [ViewVisibility.Hidden]: null,
  [ViewVisibility.Visible]: null,
});

const language = t.keyof({
  [Language.EN]: null,
  [Language.FI]: null,
  [Language.SV]: null
});

export const viewGeneral = t.type({
  id: t.number,
  title: t.string,
  email: t.string,
  description: t.string,
  status: viewStatus,
  visibility: viewVisibility,
  lastPublished: t.string,
  languages: t.array(language),
  defaultLanguage: language,
  commentsEnabled: t.boolean,
  parentView: OptionalNumber
});
