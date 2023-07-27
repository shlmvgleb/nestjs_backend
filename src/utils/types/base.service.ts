import { Inject, Injectable, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { JwtPayload } from '../../services/auth/types/jwt-payload';

export interface IServiceContext {
  date: string;
  trx: any;
  user: JwtPayload;
  eventBuffer: Event[];
}

export interface IBaseService {
  setupContext(context?: IServiceContext): IServiceContext;

  getContext(): IServiceContext;
}

@Injectable({ scope: Scope.REQUEST })
export abstract class BaseService implements IBaseService {
  protected ctx: IServiceContext;

  @Inject(REQUEST) private readonly request: any;

  public setupContext(context?: IServiceContext): IServiceContext {
    if (this.ctx) {
      return this.ctx;
    }

    const intContext = context;
    intContext.user = context.user || this.request?.user;
    this.ctx = intContext;

    Object.keys(this)
      .filter((property) => this[property] instanceof BaseService)
      .forEach((property) => this[property].setupContext(intContext));

    return intContext;
  }

  public getContext(): IServiceContext {
    return this.ctx;
  }
}
