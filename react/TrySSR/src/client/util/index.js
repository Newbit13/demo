export const envInitialData = (props) => {
    let initialData;
    // console.log(props);
    // console.log(__isServer);
    if (__isServer) {
      initialData = props.staticContext && props.staticContext.initialData;
    } else {
      initialData = props.initialData;
    };
  
    return initialData || "sss";
  };