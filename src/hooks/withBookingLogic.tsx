/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';

export interface WithBookingLogic {
	activateBookingPreview: (id: string) => void;
	previewId: string | null;
	previewReadOnly: boolean;
	editExisting: boolean;
	editBooking: (id: string) => Promise<void>;
	closeEditMode: () => void;
	cancelBooking: () => void;
}
// eslint-disable-next-line react/display-name
const withBookingLogic = (Comp: React.FunctionComponent<any>) => (props: any) => {
  const [previewId, setPreviewId] = useState<string | null>(null);
  // const [previewData, setPreviewData] = useState<Bookings.SingleData<number> | null>();
  const [previewReadOnly, toggleReadOnly] = useState(false);
  const [editExisting, toggleEditExisting] = useState(false);

  const activateBookingPreview = (id: string): void => {
    toggleReadOnly(true);
    setPreviewId(id);
  };
  const editBooking = (id: string): void => {
    setPreviewId(id);
    toggleEditExisting(true);
    toggleReadOnly(false);
  };
  const closeEditMode = (): void => {
    toggleEditExisting(false);
    toggleReadOnly(true);
  };
  const cancelBooking = (): void => {
    setPreviewId(null);
  };
  return <Comp
    {...props}
    previewId={previewId}
    previewReadOnly={previewReadOnly}
    editExisting={editExisting}
    activateBookingPreview={activateBookingPreview}
    editBooking={editBooking}
    closeEditMode={closeEditMode}
    cancelBooking={cancelBooking}
  />;
};
export default withBookingLogic;