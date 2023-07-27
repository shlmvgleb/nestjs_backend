import { BaseService, IServiceContext } from '../types/base.service';

export function Context() {
  return function (target: BaseService, propertyKey: string, descriptor: any) {
    let currDescriptor = descriptor;
    if (!currDescriptor) {
      currDescriptor = Object.getOwnPropertyDescriptor(target, propertyKey);
    }
    const originalMethod = currDescriptor.value;

    currDescriptor.value = async function (...args: any[]) {
      const currContext = this.getContext();

      const date = new Date().toISOString();

      const newServiceContext: any = currContext || {
        date,
        eventBuffer: [],
        spanTraceStack: [],
      };

      const callWithEmitContext = async (context: IServiceContext) => {
        this.setupContext(context);
        return originalMethod.apply(this, args);
      };
      return callWithEmitContext(newServiceContext);
    };

    return currDescriptor;
  };
}
