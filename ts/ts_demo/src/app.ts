interface Props {
    foo: string;
    la: number;
    [key: string]: Props[keyof Props];
  }
  
  const props: Props = {
    foo: "bar",
    la: 12
  };
  
  props["foo"] = "baz"; // ok
  props["bar"] = 123; // error