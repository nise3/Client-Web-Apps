import Editor from './editor/Editor';
import {RecoilRoot} from 'recoil';
export default function Home() {
  return (
    <div
      style={{
        height: '100vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}>
      <RecoilRoot>
        <Editor />
      </RecoilRoot>
    </div>
  );
}
