export interface MailDetails {
  from?: string;
  to: string | string[];
  accessToken?: string;
  subject?: string;
  text?: string;
  html?: string;
};

export type FromInput = {
  mail: string;
  password: string;
};

export interface IMailService {
  send(input: MailDetails): Promise<void>;
}

export type OptsType = {
  fileName?: string;
  template?: string;
  data?: Record<string, unknown>;
  text?: string;
};