export interface IBaseSmsApiParams {
  login: string;
  psw: string;
  fmt?: number;
}

export interface ISmsApiMessageParams extends IBaseSmsApiParams {
  phones: string;
  mes: string;
}
