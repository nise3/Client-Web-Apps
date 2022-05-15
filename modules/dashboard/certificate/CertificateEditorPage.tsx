// import Editor from './editor/Editor';
// import dynamic from 'next/dynamic';
import {RecoilRoot} from 'recoil';
import {useCallback, useState} from 'react';
import CertificateAddEditPopup from './CertificateAddEditPopup';
import Editor from './editor/Editor';
// const Editor = dynamic(() => import('./editor/Editor'), {ssr: false});

export default function Home() {
  const [isAddEditPopupOpen, setisAddEditPopupOpen] = useState(false);

  const closeAddEditModal = useCallback(() => {
    setisAddEditPopupOpen(false);
  }, []);

  const openAddEditModal = useCallback(() => {
    setisAddEditPopupOpen(true);
  }, []);

  return (
    <div
      style={{
        height: '100vh',
        width: '100vw',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}>
      <RecoilRoot>
        <Editor onClick={openAddEditModal} />

        {isAddEditPopupOpen && (
          <CertificateAddEditPopup key={1} onClose={closeAddEditModal} />
        )}
      </RecoilRoot>
    </div>
  );
}
