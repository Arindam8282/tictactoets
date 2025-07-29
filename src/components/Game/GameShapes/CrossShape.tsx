import * as React from 'react';
interface Props{
 
}
const CrossShape = ({}: Props) => {
  return (
    <React.Fragment>
      <div className="absolute w-20 h-2 bg-red-600 rotate-45"></div>
      <div className="absolute w-20 h-2 bg-red-600 -rotate-45"></div>
    </React.Fragment>
  );
};

export default CrossShape;
