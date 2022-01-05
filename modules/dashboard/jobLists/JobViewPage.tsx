import {useRouter} from 'next/router';

const JobViewPage = () => {
  const router = useRouter();
  const {jobId} = router.query;

  console.log(': ', jobId);

  return <div>Hii</div>;
};

export default JobViewPage;
