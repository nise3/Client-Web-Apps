import Head from 'next/head';
import {MessageFormatElement} from '@formatjs/icu-messageformat-parser';

interface PageMetaProps {
  title?: string | MessageFormatElement[];
  desc?: string;
  canonical?: any;
  css?: any;
  image?: any;
}

const PageMeta: React.FC<PageMetaProps> = ({
  title,
  desc = 'National Intelligence for Skills, Education, Employment and Entrepreneurship',
  css,
  image,
  canonical,
}) => (
  <Head>
    <title>{title ? 'NISE | ' + title : 'NISE'}</title>
    <meta name='description' content={desc} />
    <meta property='og:type' content='website' />
    <meta name='og:title' property='og:title' content={title as string} />
    <meta name='og:description' property='og:description' content={desc} />
    <meta property='og:site_name' content='Proper Noun' />
    <meta name='twitter:card' content='summary' />
    <meta name='twitter:title' content={title as string} />
    <meta name='twitter:description' content={desc} />
    <meta name='twitter:site' content='@propernounco' />
    <meta name='twitter:creator' content='@propernounco' />
    <link rel='icon' type='image/png' href='/nise-favicon.png' />
    <link rel='apple-touch-icon' href='/nise-favicon.png' />

    {canonical && <meta property='og:url' content={`${canonical}`} />}
    {css && <link rel='stylesheet' href={`${css}`} />}
    {image ? (
      <meta property='og:image' content={`${image}`} />
    ) : (
      <meta
        property='og:image'
        content='https://firebasestorage.googleapis.com/v0/b/git-access.appspot.com/o/logo512.png?alt=media'
      />
    )}
    {image && <meta name='twitter:image' content={`${image}`} />}
  </Head>
);
export default PageMeta;
