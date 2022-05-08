import Editor from './editor/Editor';
import {RecoilRoot} from 'recoil';
import {useCallback, useState} from 'react';

import CertificateAddEditPopup from './CertificateAddEditPopup';
export default function Home() {
  const [isAddEditPopupOpen, setisAddEditPopupOpen] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);
  const closeAddEditModal = useCallback(() => {
    setisAddEditPopupOpen(false);
    setSelectedItemId(null);
  }, []);

  const openAddEditModal = useCallback(
    (selectedItemId: number | null = null) => {
      setisAddEditPopupOpen(true);
      setSelectedItemId(selectedItemId);
    },
    [],
  );

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
        <Editor onClick={openAddEditModal} />
      </RecoilRoot>

      {isAddEditPopupOpen && (
        <CertificateAddEditPopup
          key={1}
          onClose={closeAddEditModal}
          itemId={selectedItemId}
        />
      )}
    </div>
  );
}
