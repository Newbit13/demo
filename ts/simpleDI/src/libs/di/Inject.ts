import Container from './Container';

// 使用 id 定义模块后，需要使用 id 来注入模块
export function Inject(id?: string): PropertyDecorator {
  return (target: Object, propertyKey: string | symbol) => {
    const Dependency = Reflect.getMetadata("design:type", target, propertyKey);

    const _id = id || Reflect.getMetadata("cus:id", Dependency);
    const _dependency = Container.get(_id);

    // 给属性注入依赖
    Reflect.defineProperty(target, propertyKey, {
      value: _dependency,
    });
  };
}