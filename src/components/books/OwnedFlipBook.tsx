import React, { forwardRef, memo, useImperativeHandle, useLayoutEffect, useMemo, useRef } from "react";
import type { IEventProps, IFlipSetting } from "react-pageflip/build/html-flip-book/settings";
import { createOwnedBookEngine, type NativeBookEngine } from "./ownedBookEngine";

type Props = Partial<IFlipSetting> & IEventProps & { children: React.ReactNode; className?: string; style?: React.CSSProperties };
export interface OwnedFlipBookHandle { pageFlip: () => NativeBookEngine | undefined }
const eventProps = { flip: "onFlip", changeOrientation: "onChangeOrientation", changeState: "onChangeState", init: "onInit", update: "onUpdate" } as const;

/** Stable page DOM plus a genuinely disposable, idle-sleeping native engine. */
const OwnedFlipBook = memo(forwardRef<OwnedFlipBookHandle, Props>(function OwnedFlipBook(props, ref) {
  const root = useRef<HTMLDivElement>(null);
  const elements = useRef<HTMLElement[]>([]);
  const owned = useRef<ReturnType<typeof createOwnedBookEngine>>();
  const currentProps = useRef(props);
  currentProps.current = props;
  const previousChildren = useRef(props.children);
  const children = useMemo(() => React.Children.map(props.children, (child, index) => {
    if (!React.isValidElement(child)) return child;
    return React.cloneElement(child as React.ReactElement<{ ref?: React.Ref<HTMLElement> }>, { ref: (element) => { elements.current[index] = element; } });
  }), [props.children]);
  useImperativeHandle(ref, () => ({ pageFlip: () => owned.current?.engine }), []);
  useLayoutEffect(() => {
    const { children: _children, className: _className, style: _style, ...settings } = currentProps.current;
    owned.current = createOwnedBookEngine(root.current!, settings, elements.current.filter(Boolean), (name, event) => {
      const callback = currentProps.current[eventProps[name as keyof typeof eventProps]];
      callback?.(event);
    });
    return () => { owned.current?.dispose(); owned.current = undefined; };
  }, []);
  useLayoutEffect(() => {
    if (previousChildren.current === props.children) return;
    previousChildren.current = props.children;
    owned.current?.update(elements.current.filter(Boolean));
  }, [props.children]);
  return <div ref={root} className={props.className} style={props.style}>{children}</div>;
}));
export default OwnedFlipBook;
