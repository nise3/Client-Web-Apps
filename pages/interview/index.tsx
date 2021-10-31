import {apiPost} from '../../@softbd/common/api';
import PageMeta from '../../@crema/core/PageMeta';
import React from 'react';

const Interview = () => {
  const url =
    'https://todn22mvx9.execute-api.ap-south-1.amazonaws.com/dev/access';
  const email = 'animesh.pust@gmail.com';
  const ApiKey = 'JU9eKYSwUW6lVlvGKrUkF71P1aybSR9y73jZ00y0';
  const data = {header: {'x-api-key': ApiKey}, email: email};

  let response: any = apiPost(url, data);
  console.log(response);

  return (
    <>
      <PageMeta title={'Course Details'} />
    </>
  );
};

export default Interview;
