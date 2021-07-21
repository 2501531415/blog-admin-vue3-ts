declare type Nullable<T> = T | null;

declare interface ComponentElRef<T extends HTMLElement = HTMLDivElement> {
    $el: T;
}
  
declare type ComponentRef<T extends HTMLElement = HTMLDivElement> = ComponentElRef<T> | null;