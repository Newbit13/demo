import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
  useRef,
} from "react";

let tempFnForMemo;
function useMemoizedFn(fn) {
  const fnRef = useRef(fn);
  // why not write `fnRef.current = fn`?
  // https://github.com/alibaba/hooks/issues/728
  fnRef.current = useMemo(() => fn, [fn]);
  console.log("tempFnForMemo == fnRef.current");
  console.log(tempFnForMemo == fnRef.current);
  tempFnForMemo = fnRef.current;

  const memoizedFn = useRef();
  // console.log(memoizedFn);
  if (!memoizedFn.current) {
    memoizedFn.current = function (...args) {
      return fnRef.current.apply(this, args);
    };
  }

  return memoizedFn.current;
}

let tempFnForPage;
function Page(props) {
  const [count, setCount] = useState(10);

//   const fn = useCallback(() => {
//     setCount(count + 1)
//   }, []);

  const fn = useMemoizedFn(() => {
    setCount(count + 1);
  });

//   const fn = () => {
//     setCount(count + 1)
//   };

  console.log("tempFnForPage === fn");
  console.log(tempFnForPage === fn);
  tempFnForPage = fn;

  return (
    <div>
      <button onClick={fn}>click</button>
      <div>{count}</div>
    </div>
  );
}

export default Page;

/**
    const fn = useMemoizedFn(() => {
        setCount(count + 1);
    });
    和
    const fn = () => {
        setCount(count + 1)
    };
    最大的区别只是变量是不是同一个引用（指针），本质不变

 */
